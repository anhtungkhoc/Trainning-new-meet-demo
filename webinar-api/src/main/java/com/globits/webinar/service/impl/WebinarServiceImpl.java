package com.globits.webinar.service.impl;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.security.service.UserService;
import com.globits.webinar.domain.Webinar;
import com.globits.webinar.dto.WebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.repository.WebinarRepository;
import com.globits.webinar.service.WebinarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Transactional
@Component
public class WebinarServiceImpl extends GenericServiceImpl<Webinar, UUID> implements WebinarService {

  @Autowired
  private EntityManager manager;

  @Autowired
  public WebinarRepository webinarRepository;

  @Autowired
  UserService userService;

  @Override
  public Page<WebinarDto> searchByDto(SearchDto searchDto) {
    if (searchDto == null) {
      return null;
    }
    int pageIndex = searchDto.getPageIndex();
    int pageSize = searchDto.getPageSize();

    if (pageIndex > 0) {
      pageIndex--;
    } else {
      pageIndex = 0;
    }

    String whereClause = "";
    String orderBy = "ORDER BY startTime desc ";
    String sqlCount = "select count(wbn.id) from Webinar as wbn where (1=1) ";
    String sql = "select new com.globits.webinar.dto.WebinarDto(wbn) from Webinar as wbn where (1=1) ";

    if (searchDto.getText() != null && StringUtils.hasText(searchDto.getText())) {
      whereClause += " AND (wbn.name LIKE :text " + "OR wbn.code LIKE :text )";
    }

    sql += whereClause + orderBy;
    sqlCount += whereClause;
    Query q = manager.createQuery(sql, WebinarDto.class);
    Query qCount = manager.createQuery(sqlCount);

    if (searchDto.getText() != null && StringUtils.hasText(searchDto.getText())) {
      q.setParameter("text", '%' + searchDto.getText().trim() + '%');
      qCount.setParameter("text", '%' + searchDto.getText().trim() + '%');
    }

    int startPosition = pageIndex * pageSize;
    q.setFirstResult(startPosition);
    q.setMaxResults(pageSize);
    List<WebinarDto> entities = q.getResultList();
    long count = (long) qCount.getSingleResult();

    Pageable pageable = PageRequest.of(pageIndex, pageSize);
    Page<WebinarDto> result = new PageImpl<WebinarDto>(entities, pageable, count);

    return result;
  }

  @Override
  public WebinarDto saveOrUpdate(WebinarDto dto, UUID id) {
    if (dto != null) {
      Webinar entity = null;
      if (id != null) {
        entity = webinarRepository.getOne(id);

        entity.setName(dto.getName());
        entity.setCode(dto.getCode());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        entity.setDescription(dto.getDescription());
        entity.setMeetingId(dto.getMeetingId());
        entity.setMeetingPassw(dto.getMeetingPassw());
        entity.setImageUrl(dto.getImageUrl());
        entity = webinarRepository.save(entity);

      }
      if (entity == null) {
        entity = new Webinar();

        entity.setName(dto.getName());
        entity.setCode(dto.getCode());
        entity.setStartTime(dto.getStartTime());
        entity.setEndTime(dto.getEndTime());
        entity.setDescription(dto.getDescription());
        entity.setMeetingId(dto.getMeetingId());
        entity.setMeetingPassw(dto.getMeetingPassw());
        entity.setImageUrl(dto.getImageUrl());
        entity = webinarRepository.save(entity);
      }

      if (entity != null) {
        return new WebinarDto(entity);
      }
    }
    return null;

  }

  @Override
  public WebinarDto getById(UUID id) {
    if (id != null) {
      Webinar entity = webinarRepository.getOne(id);
      if (entity != null) {
        return new WebinarDto(entity);
      }
    }
    return null;
  }

  @Override
  public WebinarDto getWebinarByCode(String code) {
    if (code == null) return null;
      Webinar entity = webinarRepository.getWebinarByCode(code);
      if (entity != null) {
        return new WebinarDto(entity);
      }
    return null;
  }

  @Override
  public Boolean deleteById(UUID id) {
    if (id != null) {
      Webinar entity = webinarRepository.getOne(id);
      if (entity != null) {
        webinarRepository.deleteById(id);
        return true;
      }
    }
    return false;
  }

  @Override
  public Boolean checkCode(String code, UUID id) {
    if (code != null && StringUtils.hasText(code)) {
      Long count = webinarRepository.checkCode(code, id);
      return count != 0l;
    }
    return null;
  }

  @Override
  public List<WebinarDto> findAll() {
    return webinarRepository.getAllWebinar();
  }

}
