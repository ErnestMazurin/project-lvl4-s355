package com.my.slack.server.controller;

import com.my.slack.server.dto.MessageDto;
import com.my.slack.server.dto.MessageWrapperDto;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MessageControllerTest {

  @Autowired
  private MessageController messageController;

  @Test
  public void newMessageTest() {

    var dto = new MessageDto();
    dto.setDate(123_456L);
    dto.setContent("test");
    dto.setUsername("test_username");
    dto.setChannelId(0);

    var wrapperDto = new MessageWrapperDto();
    wrapperDto.setMessage(dto);

    var result = messageController.newMessage(wrapperDto, dto.getChannelId());
    assertResponseMessage(wrapperDto, result);
  }

  private void assertResponseMessage(MessageWrapperDto expected, MessageWrapperDto actual) {
    var expectedMessage = expected.getMessage();

    assertNotNull(actual, "Response is null");

    var message = actual.getMessage();
    assertNotNull(message, "Response message is null");
    assertNotNull(message.getId(), "Message id is null");

    assertEquals(expectedMessage.getDate(), message.getDate(), "Incorrect date");
    assertEquals(expectedMessage.getChannelId(), message.getChannelId(), "Incorrect channel id");
    assertEquals(expectedMessage.getUsername(), message.getUsername(), "Incorrect username");
    assertEquals(expectedMessage.getContent(), message.getContent(), "Incorrect content");
  }
}
