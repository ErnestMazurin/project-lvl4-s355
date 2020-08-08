package com.my.slack.server.controller;

import com.my.slack.server.dao.ChannelDao;
import com.my.slack.server.dto.ChannelDto;
import com.my.slack.server.dto.ChannelWrapperDto;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChannelControllerTest {

  @Autowired
  private ChannelController channelController;

  @Autowired
  private ChannelDao channelDao;

  @Test
  void createNewChannel() {
    var dto = new ChannelDto();
    dto.setName("test_channel_name");

    var wrappedDto = new ChannelWrapperDto();
    wrappedDto.setChannel(dto);

    var result = channelController.createNewChannel(wrappedDto);

    assertNotNull(result, "Response is null");
    var channel = result.getChannel();
    assertNotNull(channel, "Response channel is null");

    assertNotNull(channel.getId(), "Channel id is null");
    assertTrue(channel.getRemovable(), "Channel is not removable");
    assertEquals(channel.getName(), dto.getName(), "Incorrect channel name");
  }

  @Test
  void renameChannel() {
    int channelId = channelDao.createChannel("old_name").id;

    var dto = new ChannelDto();
    dto.setName("new_name");

    var wrappedDto = new ChannelWrapperDto();
    wrappedDto.setChannel(dto);

    var result = channelController.renameChannel(wrappedDto, channelId);

    assertNotNull(result, "Response is null");

    var channel = result.getChannel();
    assertNotNull(channel, "Response channel is null");

    assertEquals(channelId, channel.getId(), "Incorrect channel id");
    assertTrue(channel.getRemovable(), "Channel is not removable");
    assertEquals(dto.getName(), channel.getName(), "Incorrect channel name");
  }

  @Test
  void deleteChannel() {
    var channel = channelDao.createChannel("existing_channel");

    var channelId = channel.id;
    var channelName = channel.name;

    var result = channelController.deleteChannel(channelId);

    assertNotNull(result, "Response is null");

    var channelDto = result.getChannel();
    assertNotNull(channel, "Response channel is null");

    assertEquals(channelId, channelDto.getId(), "Incorrect channel id");
    assertTrue(channelDto.getRemovable(), "Channel is not removable");
    assertEquals(channelDto.getName(), channelName, "Incorrect channel name");
  }
}
