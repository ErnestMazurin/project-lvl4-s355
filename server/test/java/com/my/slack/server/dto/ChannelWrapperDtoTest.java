package com.my.slack.server.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class ChannelWrapperDtoTest {

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void souldDeserialize() throws JsonProcessingException {

    var json = "{" +
      "    \"channel\": {" +
      "        \"name\": \"test\"" +
      "    }" +
      "}";

    var wrapper = objectMapper.readValue(json, ChannelWrapperDto.class);
    assertNotNull(wrapper);

    var channel = wrapper.getChannel();
    assertNotNull(channel);
    assertEquals(channel.getName(), "test");
  }
}
