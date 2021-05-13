package com.globits.webinar.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.globits.core.service.GenericService;
import com.globits.webinar.domain.OTP;
import com.globits.webinar.dto.OTPDto;

public interface OTPService extends GenericService<OTP, Long> {
	
	public void deleteById(Long id);
  
	public OTPDto findByToken(String token);
	
	OTPDto saveOne(Long userId,Integer typeToken);

	String createOneTimeToken();
}
