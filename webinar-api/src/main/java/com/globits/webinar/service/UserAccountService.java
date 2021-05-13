package com.globits.webinar.service;

import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.security.domain.User;
import com.globits.security.dto.UserDto;

@Service
public interface UserAccountService {
	UserDto updateAccount(Long userId, String name);
}
