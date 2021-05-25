package com.globits.webinar.service;

import java.util.UUID;

import com.globits.security.dto.UserDto;
import com.globits.webinar.dto.SignUpDto;

public interface SignUpService {
	UserDto createUser(SignUpDto dto);
	UserDto createUserFb(SignUpDto dto);
	boolean checkEmail(SignUpDto dto);
	boolean checkUsername(SignUpDto dto);
	void sendMailRegister(String emailTo, String token, String url);
	int confirmRegistration(String token);
}
