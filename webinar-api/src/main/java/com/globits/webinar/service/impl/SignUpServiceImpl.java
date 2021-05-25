package com.globits.webinar.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.mail.internet.MimeMessage;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.globits.core.domain.Person;
import com.globits.core.service.PersonService;
import com.globits.core.utils.SecurityUtils;
import com.globits.security.domain.Role;
import com.globits.security.domain.User;
import com.globits.security.dto.UserDto;
import com.globits.security.repository.RoleRepository;
import com.globits.security.repository.UserRepository;
import com.globits.security.service.UserService;
import com.globits.webinar.WebinarConst;
import com.globits.webinar.dto.OTPDto;
import com.globits.webinar.dto.SignUpDto;
import com.globits.webinar.repository.SampleRepository;
import com.globits.webinar.service.OTPService;
import com.globits.webinar.service.SignUpService;
import com.globits.webinar.utilities.EmailConstants;

@Service
public class SignUpServiceImpl implements SignUpService {

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;

	@Autowired
	PersonService personService;

	@Autowired
	SampleRepository sampleRepository;
	
	@Autowired
	OTPService otpService;

	@Autowired
	JavaMailSender emailSender;

	EmailConstants myct;
	@Value("${spring.mail.username}")
	// Replace with your email here:
	private String emailAddress;

	@Override
	public UserDto createUser(SignUpDto dto) {
		// TODO Auto-generated method stub
		User user = null;
		Set<Role> roles = null;
		if (dto != null) {
			// 1. Tạo tài khoản
			user = new User();
			user.setEmail(dto.getEmail());
			user.setUsername(dto.getUsername());
			user.setPassword(SecurityUtils.getHashPassword(dto.getPassword()));

			Person person = new Person();
			person.setDisplayName(dto.getDisplayName());
			person.setGender(dto.getGender());
			user.setPerson(person);
			person.setUser(user);
			user.setActive(false);

			Role role = roleRepository.findByName(WebinarConst.ROLE_ATTENDEE);
			if (role != null) {
				roles = new HashSet<>();
				roles.add(role);
				user.setRoles(roles);
			}
			user = userRepository.save(user);
			personService.save(person);

		}
		return new UserDto(user);
	}
	@Override
	public UserDto createUserFb(SignUpDto dto) {
		// TODO Auto-generated method stub
		User user = null;
		Set<Role> roles = null;
		if (dto != null) {
			// 1. Tạo tài khoản
			user = new User();
			user.setEmail(dto.getEmail());
			user.setUsername(dto.getUsername());
			user.setPassword(SecurityUtils.getHashPassword(dto.getPassword()));

			Person person = new Person();
			person.setDisplayName(dto.getDisplayName());
			person.setGender(dto.getGender());
			user.setPerson(person);
			person.setUser(user);
			user.setActive(true);

			Role role = roleRepository.findByName(WebinarConst.ROLE_ATTENDEE);
			if (role != null) {
				roles = new HashSet<>();
				roles.add(role);
				user.setRoles(roles);
			}
			user = userRepository.save(user);
			personService.save(person);

		}
		return new UserDto(user);
	}

	@Override
	public boolean checkEmail(SignUpDto dto) {
		// TODO Auto-generated method stub
		List<UserDto> list = sampleRepository.findByEmail(dto.getEmail());
		if (list != null && list.size() > 0 && list.get(0) != null && list.get(0).getId() != null) {
			if (dto.getId() != null && StringUtils.hasText(dto.getId().toString()))
				if (list.get(0).getId().equals(dto.getId()))
					return false;
			return true;
		}
		return false;
	}
	
	

	@Override
	public boolean checkUsername(SignUpDto dto) {
		List<UserDto> list = sampleRepository.findByUsername(dto.getUsername());
		if (list != null && list.size() > 0 && list.get(0) != null && list.get(0).getId() != null) {
			if (dto.getId() != null && StringUtils.hasText(dto.getId().toString()))
				if (list.get(0).getId().equals(dto.getId()))
					return false;
			return true;
		}
		return false;
	}

	@Override
	public void sendMailRegister(String emailTo, String token, String hostSite) {
		// TODO Auto-generated method stub
		ExecutorService emailExecutor = Executors.newSingleThreadExecutor();
		emailExecutor.execute(() -> {
			try {
				String url = hostSite + "confirmRegistration?token=" + token;

				String bodyEmail = EmailConstants.getEmailBody(url);

				try {
					// Tạo mail
					MimeMessage mail = emailSender.createMimeMessage();
					// Sử dụng lớp trợ giúp
					MimeMessageHelper helper = new MimeMessageHelper(mail);
					helper.setFrom(emailAddress);
					helper.setTo(emailTo);
					helper.setSubject("Webinar - Account Verification");
					helper.setText(bodyEmail, true);
					// Gửi mail
					emailSender.send(mail);
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		});
		emailExecutor.shutdown();
	}

	@Override
	public int confirmRegistration(String token) {
		// TODO Auto-generated method stub
		OTPDto dto = otpService.findByToken(token);
		if (dto == null)
			return 1;

		if (dto.getTokenType() != 1)
			return 1;
		
		int result;
		LocalDateTime now = new LocalDateTime();
		LocalDateTime expired = LocalDateTime.fromDateFields(dto.getExpired());
		
		result = now.compareTo(expired);
		if (result > 0)
			return 2;
		
		User user = userService.findById(dto.getUserId());
		user.setActive(true);
		UserDto entity = userService.save(new UserDto(user));
		
		return 3;
	}

}
