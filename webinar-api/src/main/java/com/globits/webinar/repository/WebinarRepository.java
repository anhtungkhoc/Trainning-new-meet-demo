package com.globits.webinar.repository;

import com.globits.webinar.domain.Webinar;
import com.globits.webinar.dto.WebinarDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WebinarRepository extends JpaRepository<Webinar, UUID>{
	@Query("select entity FROM Webinar entity where entity.code =?1 ")
	List<Webinar> getByCode(String code);
	
	@Query("select count(entity.id) FROM Webinar entity where entity.code =?1 and (entity.id <> ?2 or ?2 is null) ")
	Long checkCode(String code, UUID id);
	
	@Query("select count(entity.id) FROM Webinar entity where entity.code =?1 ")
	Long checkCode(String code);

}
