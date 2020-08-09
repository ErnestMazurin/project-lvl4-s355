package com.my.slack.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChannelDto {

  private Integer id;
  private String name;
  private Boolean removable;
  private List<Integer> messages;

  public ChannelDto() {
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean getRemovable() {
    return removable;
  }

  public void setRemovable(Boolean removable) {
    this.removable = removable;
  }

  public List<Integer> getMessages() {
    return messages;
  }

  public void setMessages(List<Integer> messages) {
    this.messages = messages;
  }
}
