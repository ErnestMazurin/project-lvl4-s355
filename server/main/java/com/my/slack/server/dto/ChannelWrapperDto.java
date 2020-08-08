package com.my.slack.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChannelWrapperDto {

  private ChannelDto channel;

  public ChannelWrapperDto() {
  }

  public ChannelDto getChannel() {
    return channel;
  }

  public void setChannel(ChannelDto channel) {
    this.channel = channel;
  }
}
