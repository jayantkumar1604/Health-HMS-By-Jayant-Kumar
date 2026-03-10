package com.hms.user.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private static final Long JWT_TOKEN_VALIDITY =5*60*60L;

    private static final String SECRET="6b18440e7e0b1090ba5943c164237d90187356edb38a7cdc0a3050b0fc4cf2e36f7bd36c8d5d63b8322290b3e5d013e5a440c72823e60c19fdc29145cc3611e1";

    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        CustomUserDetails user=(CustomUserDetails) userDetails;
        claims.put("id",user.getId());
        claims.put("email",user.getEmail());
        claims.put("role",user.getRole());
        claims.put("name",user.getName());
        claims.put("profileId",user.getProfileId());
        return  doGenerateToken(claims, user.getUsername());
    }
    public String doGenerateToken(Map<String,Object> claims,String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*1000))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
}
