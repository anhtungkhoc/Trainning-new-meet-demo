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
import com.globits.webinar.dto.CategoryDto;
import com.globits.webinar.dto.WebinarDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.repository.CategoryRepository;
import com.globits.webinar.service.CategoryService;

@Transactional
@Component
public class CategoryServiceImpl extends GenericServiceImpl<Category, UUID> implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepo;
	
	@Override
	public Page<CategoryDto> searchByPage(SearchDto searchDto) {
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
        String orderBy = "ORDER BY c.createDate DESC ";
        String sqlCount = "select count(c.id) from Category as c where (1=1) ";
        String sql = "select new com.globits.webinar.dto.CategoryDto(c) from Category as c where (1=1) ";

        if (searchDto.getKeyword() != null && StringUtils.hasText(searchDto.getKeyword())) {
            whereClause += " AND (c.name LIKE :text " + "OR c.code LIKE :text )";
        }

        sql += whereClause + orderBy;
        sqlCount += whereClause;
        Query q = manager.createQuery(sql, CategoryDto.class);
        Query qCount = manager.createQuery(sqlCount);

        if (searchDto.getKeyword() != null && StringUtils.hasText(searchDto.getKeyword())) {
            q.setParameter("text", '%' + searchDto.getKeyword() + '%');
            qCount.setParameter("text", '%' + searchDto.getKeyword() + '%');
        }

        int startPosition = pageIndex * pageSize;
        q.setFirstResult(startPosition);
        q.setMaxResults(pageSize);
        List<CategoryDto> entities = q.getResultList();
        long count = (long) qCount.getSingleResult();

        Pageable pageable = PageRequest.of(pageIndex, pageSize);
        Page<CategoryDto> result = new PageImpl<CategoryDto>(entities, pageable, count);

        return result;
	}

	@Override
	public CategoryDto saveOrUpdate(CategoryDto dto, UUID id) {
		// TODO Auto-generated method stub
		if(dto != null) {
			Category entity = null;
			if(id != null) {
				entity = categoryRepo.getOne(id);
				entity.setName(dto.getName());
				entity.setCode(dto.getCode());
				
				entity = categoryRepo.save(entity);
			}
			if(entity == null) {
				entity = new Category();
				entity.setName(dto.getName());
				entity.setCode(dto.getCode());
				
				entity = categoryRepo.save(entity);
			}
			if(entity != null) {
				return new CategoryDto(entity);
			}
 		}
		return null;
	}

	@Override
	public CategoryDto getById(UUID id) {
		if (id != null) {
			Category entity = categoryRepo.getOne(id);
            if (entity != null) {
                return new CategoryDto(entity);
            }
        }
        return null;
	}

	@Override
	public Boolean deleteById(UUID id) {
		if (id != null) {
			Category entity = categoryRepo.getOne(id);
            if (entity != null) {
            	categoryRepo.deleteById(id);
                return true;
            }
        }
        return false;
	}

	@Override
	public Boolean checkCode(String code, UUID id) {
		if (code != null && StringUtils.hasText(code)) {
            Long count = categoryRepo.checkCode(code, id);
            return count != 0l;
        }
        return null;
	}

}
