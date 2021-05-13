package com.globits.webinar.dto;

import java.util.Date;

import com.globits.core.dto.BaseObjectDto;

public class SignUpDto extends BaseObjectDto {
	private String displayName;
	private String code;
	private String gender;
	private String username;
	private String password;
	private String email;
	private String rePassWord;
	private String hostSite;
	
	public SignUpDto() {
		// TODO Auto-generated constructor stub
		super();
	}

	

	public String getHostSite() {
		return hostSite;
	}



	public void setHostSite(String hostSite) {
		this.hostSite = hostSite;
	}



	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getRePassWord() {
		return rePassWord;
	}

	public void setRePassWord(String rePassWord) {
		this.rePassWord = rePassWord;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getUsername() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRePassword() {
		return rePassWord;
	}

	public void setRePassword(String rePassword) {
		this.rePassWord = rePassword;
	} 
	
	
	
}
