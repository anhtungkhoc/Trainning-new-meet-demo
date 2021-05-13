package com.globits.webinar.service.impl;
 
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.webinar.domain.OTP;
import com.globits.webinar.dto.OTPDto;
import com.globits.webinar.repository.OTPRepository;
import com.globits.webinar.service.OTPService;

@Service
public class OTPServiceImpl extends GenericServiceImpl<OTP, Long> implements OTPService {

	@Autowired
	OTPRepository otpRespository;

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public OTPDto findByToken(String token) {
		OTPDto dto = otpRespository.findByToken(token);
		return dto;
	}

	@Override
	public OTPDto saveOne(Long userId,Integer typeToken) {

		OTP entity = new OTP();

		entity.setUserID(userId);
		entity.setToken(createOneTimeToken());
		entity.setExpired(new LocalDateTime().plusDays(1).toDate());
		entity.setTokenType(typeToken);
		entity = otpRespository.save(entity);
		if (entity != null) {
			return new OTPDto(entity);
		}
		return null;
	}

	 

	@Override
	public String createOneTimeToken() { 
		byte[] bytesEncoded = Base64.encodeBase64(UUID.randomUUID().toString().getBytes()); 
		return new String(bytesEncoded);
	}

}
