package com.my.slack.server.entity;

import java.time.LocalDateTime;

public class Message {

  public final Integer id;
  public final int channelId;
  public final String username;
  public final LocalDateTime dateTime;
  public final String content;

  public Message(Integer id, int channelId, String username, LocalDateTime dateTime, String content) {
    this.id = id;
    this.channelId = channelId;
    this.username = username;
    this.dateTime = dateTime;
    this.content = content;
  }
}
