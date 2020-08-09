package com.my.slack.server.controller;

import static com.my.slack.server.Routes.CHANNELS_PATH;
import com.my.slack.server.dto.MessageWrapperDto;
import com.my.slack.server.service.MessageService;
import com.my.slack.server.service.SimpMessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(CHANNELS_PATH)
public class MessageController {

  private final MessageService messageService;
  private final SimpMessagingService simpMessagingService;

  @Autowired
  public MessageController(SimpMessagingService simpMessagingService, MessageService messageService) {
    this.simpMessagingService = simpMessagingService;
    this.messageService = messageService;
  }

  @PostMapping(path = "/{channel_id}/messages", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
  public MessageWrapperDto newMessage(@RequestBody MessageWrapperDto dto, @PathVariable("channel_id") int channelId) {
    var messageDto = dto.getMessage();
    var newMessageDto = messageService.createMessage(
      messageDto.getChannelId(), messageDto.getUsername(), messageDto.getDate(), messageDto.getContent()
    );
    simpMessagingService.sendNewMessage(newMessageDto);
    return newMessageDto;
  }
}
