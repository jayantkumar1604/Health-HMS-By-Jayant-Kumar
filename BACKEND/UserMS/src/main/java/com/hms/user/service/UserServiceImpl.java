package com.hms.user.service;

import com.hms.user.clients.ProfileClient;
import com.hms.user.dto.Roles;
import com.hms.user.dto.UserDTO;
import com.hms.user.entity.User;
import com.hms.user.exception.HmsException;
import com.hms.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ApiService apiService;

    @Autowired
    private ProfileClient profileClient;

    @Override
    public void registerUser(UserDTO userDTO) throws HmsException{
        Optional<User> opt=userRepository.findByEmail(userDTO.getEmail());
        if(opt.isPresent()){
            throw new HmsException("USER_ALREADY_EXISTS");
        }
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        Long profileId=null;
        if(userDTO.getRole().equals(Roles.DOCTOR)) {
            profileId=profileClient.addDoctor(userDTO);
        } else if (userDTO.getRole().equals(Roles.PATIENT)) {
            profileId=profileClient.addPatient(userDTO);
        }
        userDTO.setProfileId(profileId);
        userRepository.save(userDTO.toEntity());
    }

    @Override
    public UserDTO loginUser(UserDTO userDTO) throws HmsException{
        User user= (User) userRepository.findAllByEmail(userDTO.getEmail()).orElseThrow(()->new HmsException("USER_NOT_FOUND"));
        if(!passwordEncoder.matches(userDTO.getPassword(),user.getPassword())){
            throw new HmsException("INVALID_CREDENTIALS");
        }
        user.setPassword(null);
        return  user.toDTO();
    }

    @Override
    public UserDTO getUserById(Long id) throws HmsException{
        return userRepository.findById(id).orElseThrow(()->new HmsException("USER_NOT_FOUND")).toDTO();
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");

    }

    @Override
    public UserDTO getUser(String email) throws HmsException{
        return  userRepository.findByEmail(email).orElseThrow(()->new HmsException("USER_NOT_FOUND")).toDTO();
    }
}
