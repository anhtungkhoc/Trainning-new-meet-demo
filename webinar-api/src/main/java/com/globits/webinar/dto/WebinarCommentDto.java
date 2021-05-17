package com.globits.webinar.dto;

import com.globits.core.dto.BaseObjectDto;
import com.globits.webinar.domain.WebinarComment;

public class WebinarCommentDto extends BaseObjectDto {
    private WebinarDto webinar;
    private String comment;

    public WebinarCommentDto() {
        super();
    }

    public WebinarDto getWebinar() {
		return webinar;
	}

	public void setWebinar(WebinarDto webinar) {
		this.webinar = webinar;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public WebinarCommentDto(WebinarComment entity) {
        if (entity != null) {
        	this.setId(entity.getId());
        	this.setCreatedBy(entity.getCreatedBy());
        	this.setModifiedBy(entity.getModifiedBy());
        	this.setCreateDate(entity.getCreateDate());
        	this.setModifyDate(entity.getModifyDate());
        	if(entity.getWebinar() != null) {
        		this.webinar = new WebinarDto(entity.getWebinar());
        	}
            this.setComment(entity.getComment());
        }
    }

}
