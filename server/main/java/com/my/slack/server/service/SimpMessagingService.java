package com.my.slack.server.service;

import com.my.slack.server.dto.ChannelWrapperDto;
import com.my.slack.server.dto.MessageWrapperDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class SimpMessagingService {

  private final SimpMessagingTemplate template;

  @Autowired
  public SimpMessagingService(SimpMessagingTemplate template) {
    this.template = template;
  }

  public void sendNewChannel(ChannelWrapperDto dto) {
    template.convertAndSend("/topic/channels/new", dto);
  }


  public void sendRenameChannel(ChannelWrapperDto dto) {
    template.convertAndSend("/topic/channels/rename", dto);
  }

  public void sendDeleteChannel(ChannelWrapperDto dto) {
    template.convertAndSend("/topic/channels/delete", dto);
  }

  public void sendNewMessage(MessageWrapperDto dto) {
    template.convertAndSend("/topic/messages/new", dto);
  }
}
