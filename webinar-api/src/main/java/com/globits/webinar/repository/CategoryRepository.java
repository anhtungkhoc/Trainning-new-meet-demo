package com.globits.webinar.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.globits.webinar.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
	
	@Query("select count(entity.id) FROM Category entity where entity.code =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);

}
