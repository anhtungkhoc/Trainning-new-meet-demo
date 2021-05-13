package com.globits.webinar.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.globits.security.domain.User;
import com.globits.security.dto.UserDto;
import com.globits.security.repository.UserRepository;
import com.globits.security.service.UserService;
import com.globits.webinar.service.UserAccountService;

@Service
public class UserAccountServiceImp implements UserAccountService{
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDto updateAccount(Long userId, String name) {
		if(userId != null) {
			User user = userRepository.findById(userId).get();
			if(name != null) {
				user.getPerson().setDisplayName(name);
				user = userRepository.save(user);
				return new UserDto(user);
			}
		}
		
		return null;
	}

}
