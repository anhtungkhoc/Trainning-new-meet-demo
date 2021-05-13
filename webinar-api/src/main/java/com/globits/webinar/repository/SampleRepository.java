package com.globits.webinar.repository;

import java.util.List;
import java.util.UUID;

import com.globits.security.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.security.dto.UserDto;

@Repository
public interface SampleRepository extends JpaRepository<User, UUID> {
	@Query("select p FROM User p where p.email = ?1 " )
	List<UserDto> findByEmail(String email);
	@Query("select p FROM User p where p.username = ?1 " )
	List<UserDto> findByUsername(String username);

}
