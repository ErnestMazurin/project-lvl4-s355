package com.my.slack.server.controller;

import static com.my.slack.server.Routes.CHANNELS_PATH;
import com.my.slack.server.dto.ChannelWrapperDto;
import com.my.slack.server.service.ChannelService;
import com.my.slack.server.service.SimpMessagingService;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(CHANNELS_PATH)
public class ChannelController {

  private final ChannelService channelService;

  private final SimpMessagingService simpMessagingService;

  @Autowired
  public ChannelController(ChannelService channelService, SimpMessagingService simpMessagingService) {
    this.channelService = channelService;
    this.simpMessagingService = simpMessagingService;
  }

  @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
  public ChannelWrapperDto createNewChannel(@RequestBody ChannelWrapperDto dto) {
    var name = dto.getChannel().getName();
    var newChannelDto = channelService.createNewChannel(name);
    simpMessagingService.sendNewChannel(newChannelDto);
    return newChannelDto;
  }

  @PatchMapping(path = "/{channel_id}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
  public ChannelWrapperDto renameChannel(@RequestBody ChannelWrapperDto dto,
                            @PathVariable("channel_id") Integer channelId) {
    var name = dto.getChannel().getName();
    var renamedChannelDto = channelService.renameChannel(channelId, name);
    simpMessagingService.sendRenameChannel(renamedChannelDto);
    return renamedChannelDto;
  }

  @DeleteMapping(path = "/{channel_id}", produces = APPLICATION_JSON_VALUE)
  public ChannelWrapperDto deleteChannel(@PathVariable("channel_id") Integer channelId) {
    var deletedChannelDto = channelService.deleteChannel(channelId);
    simpMessagingService.sendDeleteChannel(deletedChannelDto);
    return deletedChannelDto;
  }
}
