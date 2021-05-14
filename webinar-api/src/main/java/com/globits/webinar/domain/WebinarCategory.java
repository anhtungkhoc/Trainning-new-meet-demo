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
 * WebinarCategory entity
 * 
 * @author linhtt
 * @since 2021/03/11
 */
@Entity
@Table(name = "tbl_webinar_category")
@XmlRootElement
public class WebinarCategory extends BaseObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private Category category;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "webinar_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private Webinar webinar;

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Webinar getWebinar() {
		return webinar;
	}

	public void setWebinar(Webinar webinar) {
		this.webinar = webinar;
	}
	
}
