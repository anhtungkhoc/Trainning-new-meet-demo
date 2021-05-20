package com.globits.webinar.dto;

import com.globits.core.dto.BaseObjectDto;
import com.globits.security.domain.User;

public class UserDto extends BaseObjectDto {
  private String email;
  private String password;
  private String username;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public UserDto(User entity) {
    this.email = entity.getEmail();
    this.password = entity.getPassword();
    this.username = entity.getUsername();
  }
}
