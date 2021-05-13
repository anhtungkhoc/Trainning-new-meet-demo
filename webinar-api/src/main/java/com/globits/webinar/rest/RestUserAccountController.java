package com.globits.webinar.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.globits.security.dto.UserDto;
import com.globits.webinar.service.UserAccountService;

@RestController
@RequestMapping("/api/userAccount")
public class RestUserAccountController {
	
	@Autowired
	UserAccountService service;
	
	@RequestMapping(value = "/{id}/{username}", method = RequestMethod.POST)
	public ResponseEntity<UserDto> save(@PathVariable Long id, @PathVariable String username) {
		UserDto result = service.updateAccount(id, username);
		return new ResponseEntity<UserDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
}
