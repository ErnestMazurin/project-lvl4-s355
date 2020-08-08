package com.my.slack.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageWrapperDto {

  private MessageDto message;

  public MessageWrapperDto() {
  }

  public MessageDto getMessage() {
    return message;
  }

  public void setMessage(MessageDto message) {
    this.message = message;
  }
}
