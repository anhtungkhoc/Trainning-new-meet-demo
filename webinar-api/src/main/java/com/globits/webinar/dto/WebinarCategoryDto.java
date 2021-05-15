package com.globits.webinar.dto;

import com.globits.core.dto.BaseObjectDto;
import com.globits.webinar.domain.WebinarCategory;

public class WebinarCategoryDto extends BaseObjectDto {
	private CategoryDto category;
	private WebinarDto webinar;
	
	public CategoryDto getCategory() {
		return category;
	}

	public WebinarDto getWebinar() {
		return webinar;
	}

	public void setWebinar(WebinarDto webinar) {
		this.webinar = webinar;
	}

	public void setCategory(CategoryDto category) {
		this.category = category;
	}

	public WebinarCategoryDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public WebinarCategoryDto(WebinarCategory entity) {
		if(entity != null) {
			this.setId(entity.getId());
			if(entity.getCategory() != null) {
				this.category = new CategoryDto(entity.getCategory());
			}
			if(entity.getWebinar() != null) {
				this.webinar = new WebinarDto(entity.getWebinar());
			}
		}
	}
	
	
}
