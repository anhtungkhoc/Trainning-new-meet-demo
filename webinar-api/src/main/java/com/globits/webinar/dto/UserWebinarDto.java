package com.globits.webinar.dto;

import com.globits.core.dto.BaseObjectDto;
import com.globits.security.domain.User;
import com.globits.webinar.domain.UserWebinar;

public class UserWebinarDto extends BaseObjectDto {
  private UserDto userDto;
  private WebinarDto webinarDto;
  private Integer isHost;
  private Integer isAttendee;
  private Integer isPanelist;
  private Integer isFavourite;
  private Integer isJoin;

  public UserWebinarDto(){}

  public UserDto getUser() {
    return userDto;
  }
  public void setUser(UserDto userDto) {
    this.userDto = userDto;
  }

  public WebinarDto getWebinarDto() {
    return webinarDto;
  }

  public void setWebinarDto(WebinarDto webinarDto) {
    this.webinarDto = webinarDto;
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

  public UserWebinarDto(UserWebinar entity) {
    if(entity != null) {
      this.setId(entity.getId());
      this.userDto = new UserDto(entity.getUser());

      this.webinarDto = new WebinarDto(entity.getWebinar());

      if(entity.getIsHost() == 1) {
        this.isHost = entity.getIsHost();
      } else if(entity.getIsFavourite() == 1) {
        this.isFavourite = entity.getIsFavourite();
      } else if(entity.getIsAttendee() == 1) {
        this.isAttendee = entity.getIsAttendee();
      } else if(entity.getIsJoin() == 1) {
        this.isJoin = entity.getIsJoin();
      } else if(entity.getIsPanelist() == 1) {
        this.isPanelist = entity.getIsPanelist();
      }
//      this.isHost = entity.getIsHost();
//      this.isFavourite = entity.getIsFavourite();
//      this.isAttendee = entity.getIsAttendee();
//      this.isJoin = entity.getIsJoin();
//      this.isPanelist = entity.getIsPanelist();
    }
  }
}