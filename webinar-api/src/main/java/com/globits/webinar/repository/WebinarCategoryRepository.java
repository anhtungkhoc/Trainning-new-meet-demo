package com.globits.webinar.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.globits.webinar.domain.WebinarCategory;

@Repository
public interface WebinarCategoryRepository extends JpaRepository<WebinarCategory, UUID> {
	
}
