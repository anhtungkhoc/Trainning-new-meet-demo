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
@Table(name = "tbl_webinar_qna")
@XmlRootElement
public class WebinarQnA extends BaseObject {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "webinar_id")
  @NotFound(action = NotFoundAction.IGNORE)
  private Webinar webinar;


}