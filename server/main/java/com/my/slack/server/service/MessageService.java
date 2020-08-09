package com.my.slack.server.service;

import com.my.slack.server.dao.MessageDao;
import com.my.slack.server.dto.MessageDto;
import com.my.slack.server.dto.MessageWrapperDto;
import com.my.slack.server.entity.Message;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

  private final MessageDao messageDao;

  @Autowired
  public MessageService(MessageDao messageDao) {
    this.messageDao = messageDao;
  }

  public MessageWrapperDto createMessage(int channelId, String username, long dateTimeMilli, String content) {
    var mesage = messageDao.createMessage(
      channelId, username, toLocalDateTime(dateTimeMilli), content
    );
    return convert(mesage);
  }

  public List<MessageDto> getAllMessages() {
    return messageDao.getAllMessages()
      .map(this::convert)
      .map(MessageWrapperDto::getMessage)
      .collect(Collectors.toList());
  }

  private MessageWrapperDto convert(Message message) {
    var messageDto = new MessageDto();
    messageDto.setId(message.id);
    messageDto.setChannelId(message.channelId);
    messageDto.setUsername(message.username);
    messageDto.setDate(toEpochMilli(message.dateTime));
    messageDto.setContent(message.content);

    var wrapperDto = new MessageWrapperDto();
    wrapperDto.setMessage(messageDto);
    return wrapperDto;
  }

  private LocalDateTime toLocalDateTime(long milli) {
    return Instant.ofEpochMilli(milli).atZone(ZoneId.systemDefault()).toLocalDateTime();
  }

  private long toEpochMilli(LocalDateTime localDateTime) {
    return localDateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
  }
}
