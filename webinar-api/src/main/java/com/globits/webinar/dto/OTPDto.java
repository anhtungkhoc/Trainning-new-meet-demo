package com.globits.webinar.dto;

 

import java.util.Date;

import org.joda.time.LocalDateTime;

import com.globits.core.dto.BaseObjectDto;
import com.globits.webinar.domain.OTP; 

public class OTPDto extends BaseObjectDto {

	private static final long serialVersionUID = 1L;
 
	private Long userId;
	private String token;
	private Date expired;
	private Integer tokenType; // Confirm account = 1, Forgot Account =2, 
	
	
	public Integer getTokenType() {
		return tokenType;
	}
	public void setTokenType(Integer tokenType) {
		this.tokenType = tokenType;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	 
	
	
	
	public Date getExpired() {
		return expired;
	}
	public void setExpired(Date expired) {
		this.expired = expired;
	}
	public OTPDto(OTP opt) {
		super();
		this.tokenType=opt.getTokenType();
		this.userId = opt.getUserID();
		this.token = opt.getToken();
		this.expired = opt.getExpired();
	}
	 
 
}
