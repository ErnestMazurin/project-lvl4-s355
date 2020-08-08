package com.my.slack.server.service;

import com.my.slack.server.dao.ChannelDao;
import com.my.slack.server.dao.MessageDao;
import com.my.slack.server.dto.ChannelDto;
import com.my.slack.server.dto.ChannelWrapperDto;
import com.my.slack.server.entity.Channel;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChannelService {

  private final ChannelDao channelDao;
  private final MessageDao messageDao;

  @Autowired
  public ChannelService(ChannelDao channelDao, MessageDao messageDao) {
    this.channelDao = channelDao;
    this.messageDao = messageDao;
  }

  public ChannelWrapperDto createNewChannel(String name) {
    return convert(
      channelDao.createChannel(name),
      List.of()
    );
  }

  public ChannelWrapperDto renameChannel(int id, String name) {
    var renamedChannel = channelDao.renameChannel(id, name);
    var messagesIds = messageDao.getMessagesIdsByChannelId(id);
    return convert(renamedChannel, messagesIds);
  }

  public ChannelWrapperDto deleteChannel(int channelId) {
    var channel = channelDao.deleteChannel(channelId);
    return convert(channel, List.of());
  }

  public List<ChannelDto> getAllChannels() {
    List<ChannelDto> result = new ArrayList<>();
    channelDao.getAllChannels().forEach(channel -> {
      var messageIds = messageDao.getMessagesIdsByChannelId(channel.id);
      result.add(convert(channel, messageIds).getChannel());
    });
    return result;
  }

  private ChannelWrapperDto convert(Channel entity, List<Integer> messageIds) {
    var channelDto = new ChannelDto();
    channelDto.setId(entity.id);
    channelDto.setName(entity.name);
    channelDto.setRemovable(entity.removable);
    channelDto.setMessages(messageIds);

    var channelWrapperDto = new ChannelWrapperDto();
    channelWrapperDto.setChannel(channelDto);
    return channelWrapperDto;
  }
}
