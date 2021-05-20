package com.globits.webinar.repository;

import com.globits.webinar.domain.UserWebinar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserWebinarRepository extends JpaRepository<UserWebinar, UUID> {
//	@Query("select count(entity.id) from Category entity where entity.code =?1 and (entity.id <> ?2 or ?2 is null) ")
//	Long checkCode(String code, UUID id);
//	@Query("select new com.globits.da.dto.CategoryDto(ed) from Category ed")
//	Page<CategoryDto> getListPage( Pageable pageable);
//
//	@Query("select new com.globits.da.dto.CategoryDto(ed) from Category ed")
//	List<CategoryDto> getAllCategory();
}
