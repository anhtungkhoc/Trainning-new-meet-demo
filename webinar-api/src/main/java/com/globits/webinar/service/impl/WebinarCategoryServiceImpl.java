package com.globits.webinar.service.impl;

import java.util.List;
import java.util.UUID;

import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.webinar.domain.Category;
import com.globits.webinar.domain.Webinar;
import com.globits.webinar.domain.WebinarCategory;
import com.globits.webinar.dto.WebinarCategoryDto;
import com.globits.webinar.dto.WebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.repository.CategoryRepository;
import com.globits.webinar.repository.WebinarCategoryRepository;
import com.globits.webinar.repository.WebinarRepository;
import com.globits.webinar.service.WebinarCategoryService;

@Transactional
@Component
public class WebinarCategoryServiceImpl extends GenericServiceImpl<WebinarCategory, UUID>
		implements WebinarCategoryService {

	@Autowired
	private WebinarCategoryRepository wcRepo;

	@Autowired
	private CategoryRepository categoryRepo;

	@Autowired
	private WebinarRepository webinarRepo;

	@Override
	public Page<WebinarCategoryDto> searchByPage(SearchDto searchDto) {
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
		String orderBy = "ORDER BY wc.createDate DESC ";
		String sqlCount = "select count(wc.id) from WebinarCategory as wc where (1=1) ";
		String sql = "select new com.globits.webinar.dto.WebinarCategoryDto(wc) from WebinarCategory as wc where (1=1) ";

		sql += whereClause + orderBy;
		sqlCount += whereClause;
		Query q = manager.createQuery(sql, WebinarCategoryDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (searchDto.getKeyword() != null && StringUtils.hasText(searchDto.getKeyword())) {
			q.setParameter("text", '%' + searchDto.getKeyword() + '%');
			qCount.setParameter("text", '%' + searchDto.getKeyword() + '%');
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<WebinarCategoryDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<WebinarCategoryDto> result = new PageImpl<WebinarCategoryDto>(entities, pageable, count);

		return result;
	}

	@Override
	public WebinarCategoryDto saveOrUpdate(WebinarCategoryDto dto, UUID id) {
		// TODO Auto-generated method stub
		if (dto != null) {
			WebinarCategory entity = null;
			Category category = null;
			Webinar webinar = null;
			if (dto.getId() != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = wcRepo.getOne(dto.getId());
			}
			if (entity == null) {
				entity = new WebinarCategory();
			}
			if (dto.getCategory() != null && dto.getCategory().getId() != null) {
				category = categoryRepo.findById(dto.getCategory().getId()).get();
			}
			entity.setCategory(category);

			if (dto.getWebinar() != null && dto.getWebinar().getId() != null) {
				webinar = webinarRepo.findById(dto.getWebinar().getId()).get();
			}
			entity.setWebinar(webinar);

			entity = wcRepo.save(entity);
			if (entity != null) {
				return new WebinarCategoryDto(entity);
			}
		}
		return null;
	}

	@Override
	public WebinarCategoryDto getById(UUID id) {
		if (id != null) {
			WebinarCategory entity = wcRepo.getOne(id);
			if (entity != null) {
				return new WebinarCategoryDto(entity);
			}
		}
		return null;
	}

	@Override
	public Boolean deleteById(UUID id) {
		if (id != null) {
			WebinarCategory entity = wcRepo.getOne(id);
			if (entity != null) {
				wcRepo.deleteById(id);
				return true;
			}
		}
		return false;
	}
}
