package com.globits.webinar.dto;

import com.globits.core.dto.BaseObjectDto;
import com.globits.webinar.domain.Webinar;

import java.util.Date;

public class WebinarDto extends BaseObjectDto {
    private String name;
    private String code;
    private Date startTime;
    private Date endTime;
    private String description;
    private String meetingId;
    private String meetingPassw;
    private String imageUrl;

    public WebinarDto() {
        super();
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public WebinarDto(Webinar entity) {
        if (entity != null) {
            this.setId(entity.getId());
            this.name = entity.getName();
            this.code = entity.getCode();
            this.startTime = entity.getStartTime();
            this.endTime = entity.getEndTime();
            this.description = entity.getDescription();
            this.meetingId = entity.getMeetingId();
            this.meetingPassw = entity.getMeetingPassw();
            this.imageUrl = entity.getImageUrl();
            this.createdBy = entity.getCreatedBy();

        }
    }

    public WebinarDto(Webinar entity,boolean simple) {
        if (entity != null) {
            this.setId(entity.getId());
            this.name = entity.getName();
            this.code = entity.getCode();
            this.startTime = entity.getStartTime();
            this.endTime = entity.getEndTime();
            this.description = entity.getDescription();
            this.meetingId = entity.getMeetingId();
            this.meetingPassw = entity.getMeetingPassw();
            this.imageUrl = entity.getImageUrl();
            this.createdBy = entity.getCreatedBy();
        }
    }
}
