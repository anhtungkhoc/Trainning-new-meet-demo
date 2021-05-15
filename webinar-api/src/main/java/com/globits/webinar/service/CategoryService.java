package com.globits.webinar.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.globits.core.service.GenericService;
import com.globits.webinar.domain.Category;
import com.globits.webinar.dto.CategoryDto;
import com.globits.webinar.functiondto.SearchDto;

@Service
public interface CategoryService extends GenericService<Category, UUID>{
	
    CategoryDto saveOrUpdate(CategoryDto dto, UUID id);

    CategoryDto getById(UUID id);

    Boolean deleteById(UUID id);

    Boolean checkCode(String code, UUID id);

	Page<CategoryDto> searchByPage(SearchDto searchDto);
}
