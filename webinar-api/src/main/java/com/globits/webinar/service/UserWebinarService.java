package com.globits.webinar.service;

import com.globits.webinar.dto.UserWebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface UserWebinarService {
  public UserWebinarDto saveOrUpdate(UUID id, UserWebinarDto dto);
  Page<UserWebinarDto> searchByDto(SearchDto searchDto);
}
