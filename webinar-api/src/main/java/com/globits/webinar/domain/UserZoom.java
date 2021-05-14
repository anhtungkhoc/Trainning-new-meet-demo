package com.globits.webinar.domain;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
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
@Table(name = "tbl_user_zoom")
@XmlRootElement
public class UserZoom extends BaseObject {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String meetingId;
	private String meetingPassw;
	private String webinarId;
	private String webinarPassw;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private User user;


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getMeetingId() {
		return meetingId;
	}

	public void setMeetingId(String meetingId) {
		this.meetingId = meetingId;
	}

	public String getMeetingPassw() {
		return meetingPassw;
	}

	public void setMeetingPassw(String meetingPassw) {
		this.meetingPassw = meetingPassw;
	}

	public String getWebinarId() {
		return webinarId;
	}

	public void setWebinarId(String webinarId) {
		this.webinarId = webinarId;
	}

	public String getWebinarPassw() {
		return webinarPassw;
	}

	public void setWebinarPassw(String webinarPassw) {
		this.webinarPassw = webinarPassw;
	}

	public UserZoom() {
	}
}
