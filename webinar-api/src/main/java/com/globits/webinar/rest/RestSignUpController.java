package com.globits.webinar.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.globits.security.dto.UserDto;
import com.globits.webinar.WebinarConst;
import com.globits.webinar.dto.OTPDto;
import com.globits.webinar.dto.SignUpDto;
import com.globits.webinar.dto.WebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.service.OTPService;
import com.globits.webinar.service.SignUpService;
import com.globits.webinar.service.WebinarService;

import org.springframework.util.StringUtils;

@RestController
@RequestMapping("/public/user")
public class RestSignUpController {

	@Autowired
	private SignUpService signUpservice;

	@Autowired
	private WebinarService webinarService;
	
	@Autowired
	OTPService otpService;
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<UserDto> createUser(@RequestBody SignUpDto dto){
		UserDto userDto = signUpservice.createUser(dto);
		ResponseEntity<UserDto> resUser = new ResponseEntity<>(userDto,
				userDto != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
		OTPDto otpDto = otpService.saveOne(resUser.getBody().getId(), WebinarConst.TOKEN_SIGNUP);
		signUpservice.sendMailRegister(resUser.getBody().getEmail(), otpDto.getToken(),dto.getHostSite());
		
		return resUser;		
	}
	@RequestMapping(value = "/registerfb", method = RequestMethod.POST)
	public ResponseEntity<UserDto> createUserFb(@RequestBody SignUpDto dto){
		UserDto userDto = signUpservice.createUserFb(dto);
		ResponseEntity<UserDto> resUser = new ResponseEntity<>(userDto,
				userDto != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
		return resUser;		
	}
	
	@RequestMapping(value = "/confirmRegistration", method = RequestMethod.GET)
	public ResponseEntity<Integer> confirmRegistration(@RequestParam("token") String token) {
		int result = signUpservice.confirmRegistration(token);
		ResponseEntity<Integer> res = new ResponseEntity<>(result, HttpStatus.OK);

		return res;
	}
	
	@RequestMapping(value = "/checkEmail", method = RequestMethod.POST)
	public Boolean checkEmail(@RequestBody SignUpDto dto) {
		boolean result = true;
		if (dto.getEmail() != null && StringUtils.hasText(dto.getEmail()))
			result = signUpservice.checkEmail(dto);
		return result;
	}

	@RequestMapping(value = "/checkUsername", method = RequestMethod.POST)
	public Boolean checkUsername(@RequestBody SignUpDto dto) {
		boolean result = true;
		if (dto.getUsername() != null && StringUtils.hasText(dto.getUsername()))
			result = signUpservice.checkUsername(dto);
		return result;
	}
	
	@RequestMapping(value = "/listWebinar", method = RequestMethod.POST)
	public ResponseEntity<Page<WebinarDto>> searchByDto(@RequestBody SearchDto dto) {
		Page<WebinarDto> result = webinarService.searchByDto(dto);
		return new ResponseEntity<Page<WebinarDto>>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}

}
