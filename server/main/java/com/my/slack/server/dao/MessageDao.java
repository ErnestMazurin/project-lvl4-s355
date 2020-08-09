package com.my.slack.server.dao;

import com.my.slack.server.entity.Message;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.stereotype.Repository;

@Repository
public class MessageDao {

  private final AtomicInteger idSequence = new AtomicInteger();
  private final Map<Integer, Message> messagesById = new ConcurrentHashMap<>();
  private final Map<Integer, List<Message>> messagesByChannelId = new ConcurrentHashMap<>();

  public Message createMessage(int channelId, String username, LocalDateTime dateTime, String content) {
    return put(
      new Message(idSequence.incrementAndGet(), channelId, username, dateTime, content)
    );
  }

  public List<Integer> getMessagesIdsByChannelId(int channelId) {
    return messagesByChannelId.getOrDefault(channelId, List.of()).stream()
      .map(msg -> msg.id)
      .collect(Collectors.toUnmodifiableList());
  }

  public Stream<Message> getAllMessages() {
    return messagesById.values().stream();
  }

  void deleteMessagesByChannelId(int channelId) {
    messagesByChannelId.remove(channelId);
    messagesById.values().stream()
      .filter(m -> m.channelId == channelId)
      .map(m -> m.id)
      .forEach(messagesById::remove);
  }

  private Message put(Message message) {
    messagesById.put(message.id, message);
    messagesByChannelId.merge(
      message.channelId,
      List.of(message),
      (messages, newMessages) -> Stream
        .concat(messages.stream(), newMessages.stream())
        .collect(Collectors.toUnmodifiableList())
    );
    return message;
  }
}
