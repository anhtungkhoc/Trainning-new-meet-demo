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
 * UserWebinar entity
 * 
 * @author linhtt
 * @since 2021/03/11
 */
@Entity
@Table(name = "tbl_user_webinar")
@XmlRootElement
public class UserWebinar extends BaseObject {
	private static final long serialVersionUID = 1L;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private User user;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "webinar_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private Webinar webinar;
	 
	@Column(name="is_host")
	private Integer isHost;
	
	@Column(name="is_attendee")
	private Integer isAttendee;
	
	@Column(name="is_panelist")
	private Integer isPanelist;
 
	@Column(name="is_favourite")
	private Integer isFavourite;
	
	@Column(name="is_join")
	private Integer isJoin;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Webinar getWebinar() {
		return webinar;
	}

	public void setWebinar(Webinar webinar) {
		this.webinar = webinar;
	}

	public Integer getIsJoin() {
		return isJoin;
	}

	public void setIsJoin(Integer isJoin) {
		this.isJoin = isJoin;
	}

	public Integer getIsHost() {
		return isHost;
	}

	public void setIsHost(Integer isHost) {
		this.isHost = isHost;
	}

	public Integer getIsAttendee() {
		return isAttendee;
	}

	public void setIsAttendee(Integer isAttendee) {
		this.isAttendee = isAttendee;
	}

	public Integer getIsPanelist() {
		return isPanelist;
	}

	public void setIsPanelist(Integer isPanelist) {
		this.isPanelist = isPanelist;
	}

	public Integer getIsFavourite() {
		return isFavourite;
	}

	public void setIsFavourite(Integer isFavourite) {
		this.isFavourite = isFavourite;
	}
}
