package com.globits.webinar.service.impl;

import com.globits.webinar.domain.UserWebinar;
import com.globits.webinar.domain.Webinar;
import com.globits.webinar.dto.UserWebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.repository.UserWebinarRepository;
import com.globits.webinar.service.UserWebinarService;
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
public class UserWebinarServiceImpl implements UserWebinarService {
  @Autowired
  UserWebinarRepository repos;

  @Autowired
  private EntityManager manager;

  @Override
  public Page<UserWebinarDto> searchByDto(SearchDto searchDto) {
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
//    String orderBy = "ORDER BY startTime desc ";
    String sqlCount = "select count(wbn.id) from UserWebinar as wbn ";
    String sql = "select new com.globits.webinar.dto.UserWebinarDto(wbn) from UserWebinar as wbn";
//    String sql = "select from UserWebinar as wbn";
    if (searchDto.getText() != null && StringUtils.hasText(searchDto.getText())) {
      whereClause += " inner join Webinar as w on wbn.webinar.id = w.id AND (w.name LIKE :text " + "OR w.code LIKE :text )";
    }

    sql += whereClause;
    sqlCount += whereClause;
    Query q = manager.createQuery(sql, UserWebinarDto.class);
    Query qCount = manager.createQuery(sqlCount);

    if (searchDto.getText() != null && StringUtils.hasText(searchDto.getText())) {
      q.setParameter("text", '%' + searchDto.getText().trim() + '%');
      qCount.setParameter("text", '%' + searchDto.getText().trim() + '%');
    }

    int startPosition = pageIndex * pageSize;
    q.setFirstResult(startPosition);
    q.setMaxResults(pageSize);
    List<UserWebinarDto> entities = q.getResultList();
    long count = (long) qCount.getSingleResult();

    Pageable pageable = PageRequest.of(pageIndex, pageSize);
    Page<UserWebinarDto> result = new PageImpl<UserWebinarDto>(entities, pageable, count);

    return result;
  }

  @Override
  public UserWebinarDto saveOrUpdate(UUID id, UserWebinarDto dto) {
    if (dto == null) {
      return null;
    }
    UserWebinar entity = null;
    if (dto.getId() != null) {
      if (dto.getId() != null && !dto.getId().equals(id)) {
        return null;
      }
      entity = repos.getOne(dto.getId());
    }
    if (entity == null) {
      entity = new UserWebinar();
    }
//    entity.setUser(dto.getUser());
    entity.setWebinar(new Webinar(dto.getWebinarDto()));

    entity.setIsHost(dto.getIsHost());
    entity.setIsAttendee(dto.getIsAttendee());
    entity.setIsPanelist(dto.getIsPanelist());
    entity.setIsFavourite(dto.getIsFavourite());
    entity.setIsJoin(dto.getIsJoin());

    entity = repos.save(entity);
    if (entity != null) {
      return new UserWebinarDto(entity);
    }
    return null;
  }
}
