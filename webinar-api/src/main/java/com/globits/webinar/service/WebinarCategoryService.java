package com.globits.webinar.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.webinar.domain.WebinarCategory;
import com.globits.webinar.dto.WebinarCategoryDto;
import com.globits.webinar.functiondto.SearchDto;

@Service
public interface WebinarCategoryService extends GenericService<WebinarCategory, UUID> {

	WebinarCategoryDto saveOrUpdate(WebinarCategoryDto dto, UUID id);

	WebinarCategoryDto getById(UUID id);

    Boolean deleteById(UUID id);

	Page<WebinarCategoryDto> searchByPage(SearchDto searchDto);
}
