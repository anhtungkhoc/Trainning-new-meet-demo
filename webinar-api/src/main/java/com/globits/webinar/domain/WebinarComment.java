package com.globits.webinar.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.joda.time.LocalDateTime;

import com.globits.core.domain.BaseObject;

/**
 * Webinar entity
 * @author linhtt
 * @since 2021/03/11
 */
@Entity
@Table(name = "tbl_webinar_comment")
@XmlRootElement
public class WebinarComment extends BaseObject {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "webinar_id")
  @NotFound(action = NotFoundAction.IGNORE)
  private Webinar webinar;

  private String comment;

  public Webinar getWebinar() {
    return webinar;
  }

  public void setWebinar(Webinar webinar) {
    this.webinar = webinar;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }



}