package com.my.slack.server.entity;

public class Channel {
  public final Integer id;
  public final String name;
  public final boolean removable;

  public Channel(Integer id, String name, boolean removable) {
    this.id = id;
    this.name = name;
    this.removable = removable;
  }
}
