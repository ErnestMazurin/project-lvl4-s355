package com.my.slack.server.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class MessageWrapperDtoTest {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void shouldDeserialize() throws JsonProcessingException {
    var json = "{" +
      "    \"message\": {" +
      "        \"channelId\": 1, " +
      "        \"content\": \"test content\", " +
      "        \"username\": \"test username\", " +
      "        \"date\": 21216513 " +
      "    }" +
      "}";

    var wrapper = objectMapper.readValue(json, MessageWrapperDto.class);
    assertNotNull(wrapper);

    var message = wrapper.getMessage();
    assertNotNull(message);

    assertEquals(message.getChannelId(), 1);
    assertEquals(message.getContent(), "test content");
    assertEquals(message.getUsername(), "test username");
    assertEquals(message.getDate(), 21216513);
  }
}

