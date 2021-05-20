package com.globits.webinar.domain;

import com.globits.core.domain.BaseObject;
import com.globits.security.domain.User;
import com.globits.webinar.dto.WebinarDto;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.*;

/**
 * Webinar entity
 *
 * @author linhtt
 * @since 2021/03/11
 */
@Entity
@Table(name = "tbl_webinar")
@XmlRootElement
public class Webinar extends BaseObject {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  @Column(name = "name")
  private String name;

  @Column(name = "code", nullable = false, unique = true)
  private String code;

  @Column(name = "start_time")
  private Date startTime;

  @Column(name = "end_time")
  private Date endTime;

  @Column(name = "description")
  private String description;

  @OneToMany(mappedBy = "webinar", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  private Set<UserWebinar> userWebinars = new LinkedHashSet<UserWebinar>();

  @Column(name = "meeting_Id")
  private String meetingId;
  @Column(name = "meeting_passw")
  private String meetingPassw;

  @Column(name = "image_url")
  private String imageUrl;

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


  public Date getStartTime() {
    return startTime;
  }

  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }

  public Date getEndTime() {
    return endTime;
  }

  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Set<UserWebinar> getUserWebinars() {
    return userWebinars;
  }

  public void setUserWebinars(Set<UserWebinar> userWebinars) {
    this.userWebinars = userWebinars;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
  public Webinar() {}
  public Webinar(WebinarDto dto) {
    this.name = dto.getName();
    this.code = dto.getCode();
    this.startTime = dto.getStartTime();
    this.endTime = dto.getEndTime();
    this.description = dto.getDescription();
    this.meetingId = dto.getMeetingId();
    this.meetingPassw = dto.getMeetingPassw();
    this.imageUrl = dto.getImageUrl();
  }
}