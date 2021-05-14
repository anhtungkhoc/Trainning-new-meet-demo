package com.globits.webinar.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.engine.internal.Cascade;
import org.joda.time.LocalDateTime;

import com.globits.core.domain.BaseObject;
import com.globits.security.domain.User;

/**
 * Category entity
 * 
 * @author linhtt
 * @since 2021/03/24
 */
@Entity
@Table(name = "tbl_category")
@XmlRootElement
public class Category extends BaseObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Column(name="name")
	private String name;
	
	@Column(name="code")
	private String Code;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return Code;
	}

	public void setCode(String code) {
		Code = code;
	}

}
