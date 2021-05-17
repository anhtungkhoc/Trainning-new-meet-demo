package com.globits.webinar.service.impl;

import com.globits.core.service.impl.GenericServiceImpl;
import com.globits.security.service.UserService;
import com.globits.webinar.domain.Webinar;
import com.globits.webinar.domain.WebinarComment;
import com.globits.webinar.dto.WebinarCommentDto;
import com.globits.webinar.functiondto.SearchDto;
import com.globits.webinar.repository.WebinarCommentRepository;
import com.globits.webinar.repository.WebinarRepository;
import com.globits.webinar.service.WebinarCommentService;
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
public class WebinarCommentServiceImpl extends GenericServiceImpl<WebinarComment, UUID> implements WebinarCommentService {

    @Autowired
    private EntityManager manager;

    @Autowired
    public WebinarCommentRepository webinarCommentRepository;
    
    @Autowired
    public WebinarRepository webinarRepository;

    @Autowired
    UserService userService;

    @Override
    public Page<WebinarCommentDto> searchByDto(SearchDto searchDto) {
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
        String orderBy = "ORDER BY createDate desc ";
        String sqlCount = "select count(wbnc.id) from WebinarComment as wbnc where (1=1) ";
        String sql = "select new com.globits.webinar.dto.WebinarCommentDto(wbnc) from WebinarComment as wbnc where (1=1) ";

        if (searchDto.getText() != null && StringUtils.hasText(searchDto.getText())) {
            whereClause += " AND (wbnc.comment LIKE :text " + "OR wbnc.webinar.name LIKE :text )";
        }

        sql += whereClause + orderBy;
        sqlCount += whereClause;
        Query q = manager.createQuery(sql, WebinarCommentDto.class);
        Query qCount = manager.createQuery(sqlCount);

        if (searchDto.getText() != null && StringUtils.hasText(searchDto.getText())) {
            q.setParameter("text", '%' + searchDto.getText().trim() + '%');
            qCount.setParameter("text", '%' + searchDto.getText().trim() + '%');
        }

        int startPosition = pageIndex * pageSize;
        q.setFirstResult(startPosition);
        q.setMaxResults(pageSize);
        List<WebinarCommentDto> entities = q.getResultList();
        long count = (long) qCount.getSingleResult();

        Pageable pageable = PageRequest.of(pageIndex, pageSize);
        Page<WebinarCommentDto> result = new PageImpl<WebinarCommentDto>(entities, pageable, count);

        return result;
    }
    
//    @Override
//    public List<WebinarCommentDto> getAll() {
//        return webinarCommentRepository.getAll();
//    }
//    
//    @Override
//	public Page<WebinarCommentDto> getPage(int pageIndex, int pageSize) {
//		Pageable pageable = PageRequest.of(pageIndex - 1, pageSize);
//		return webinarCommentRepository.getPage(pageable);
//	}

    @Override
    public WebinarCommentDto saveOrUpdate(WebinarCommentDto dto, UUID id) {
        if (dto != null) {
            WebinarComment entity = null;
            Webinar webinar = null;
            if (dto.getId() != null) {
            	if(dto.getId() != null && !dto.getId().equals(id)) {
            		return null;
            	}
                entity = webinarCommentRepository.getOne(dto.getId());

//                entity.setWebinar(dto.getWebinar());
//                entity.setComment(dto.getComment());
//                
//                entity = webinarCommentRepository.save(entity);
            }
            if (entity == null) {
                entity = new WebinarComment();
//                entity.setWebinar(dto.getWebinar());
//                entity.setComment(dto.getComment());
//                entity = webinarCommentRepository.save(entity);
            }
            if(dto.getWebinar() != null && dto.getWebinar().getId() != null) {
            	webinar = webinarRepository.findById(dto.getWebinar().getId()).get();
            }
            entity.setWebinar(webinar);
            entity.setComment(dto.getComment());
            entity = webinarCommentRepository.save(entity);

            if (entity != null) {
                return new WebinarCommentDto(entity);
            }
        }
        return null;

    }

    @Override
    public WebinarCommentDto getById(UUID id) {
        if (id != null) {
        	WebinarComment entity = webinarCommentRepository.getOne(id);
            if (entity != null) {
                return new WebinarCommentDto(entity);
            }
        }
        return null;
    }

    @Override
    public Boolean deleteById(UUID id) {
        if (id != null) {
        	WebinarComment entity = webinarCommentRepository.getOne(id);
            if (entity != null) {
            	webinarCommentRepository.deleteById(id);
                return true;
            }
        }
        return false;
    }

//    @Override
//    public Boolean checkCode(String code, UUID id) {
//        if (code != null && StringUtils.hasText(code)) {
//            Long count = webinarRepository.checkCode(code, id);
//            return count != 0l;
//        }
//        return null;
//    }
}
