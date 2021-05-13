package com.globits.webinar.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.globits.security.dto.UserDto;
import com.globits.webinar.domain.OTP;
import com.globits.webinar.dto.OTPDto;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long>{
	@Query("SELECT new com.globits.webinar.dto.OTPDto(entity) FROM OTP AS entity WHERE entity.token = ?1")
	public OTPDto findByToken(String token);
}
