package com.hms.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {

    private static final String SECRET = "6b18440e7e0b1090ba5943c164237d90187356edb38a7cdc0a3050b0fc4cf2e36f7bd36c8d5d63b8322290b3e5d013e5a440c72823e60c19fdc29145cc3611e1";

    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {

            String path = exchange.getRequest().getPath().toString();

            if (path.equals("/user/login") || path.equals("/user/register")) {
                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key","SECRET")).build());
            }

            HttpHeaders headers = exchange.getRequest().getHeaders();

            if (!headers.containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Authorization header is missing");
            }

            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Authorization header is invalid");
            }

            String token = authHeader.substring(7);

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(SECRET)
                        .parseClaimsJws(token)
                        .getBody();
                exchange=exchange.mutate().request(r->r.header("X-Secret-Key","SECRET")).build();
            } catch (Exception e) {
                throw new RuntimeException("Token is invalid");
            }

            return chain.filter(exchange);
        };
    }

    public static class Config {
    }
}