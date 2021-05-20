package com.globits.webinar.service;

import com.globits.core.service.GenericService;
import com.globits.webinar.domain.Webinar;
import com.globits.webinar.dto.WebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface WebinarService extends GenericService<Webinar, UUID> {

    Page<WebinarDto> searchByDto(SearchDto searchDto);

    WebinarDto saveOrUpdate(WebinarDto dto, UUID i);

    WebinarDto getById(UUID id);

    WebinarDto getWebinarByCode(String code);

    Boolean deleteById(UUID id);

    Boolean checkCode(String code, UUID id);

    public List<WebinarDto> findAll();
}
