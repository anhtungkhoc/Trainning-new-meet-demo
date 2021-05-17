package com.globits.webinar.dto;

import com.globits.core.dto.BaseObjectDto;
import com.globits.webinar.domain.Category;

public class CategoryDto extends BaseObjectDto {
	private String name;
	private String code;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	public CategoryDto() {
		super();
	}
	
	public CategoryDto(Category entity) {
		if(entity != null) {
			this.setId(entity.getId());
			this.name = entity.getName();
			this.code = entity.getCode();
		}
	}
}
