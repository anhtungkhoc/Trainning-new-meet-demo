package com.globits.webinar.service;

import com.globits.core.service.GenericService;
import com.globits.webinar.domain.WebinarComment;
import com.globits.webinar.dto.WebinarCommentDto;
import com.globits.webinar.functiondto.SearchDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface WebinarCommentService extends GenericService<WebinarComment, UUID> {

    Page<WebinarCommentDto> searchByDto(SearchDto searchDto);
	
//	List<WebinarCommentDto> getAll();
//	
//	Page<WebinarCommentDto> getPage(int pageIndex, int pageSize);

	WebinarCommentDto saveOrUpdate(WebinarCommentDto dto, UUID id);

	WebinarCommentDto getById(UUID id);

    Boolean deleteById(UUID id);

//    Boolean checkCode(String code, UUID id);
}

