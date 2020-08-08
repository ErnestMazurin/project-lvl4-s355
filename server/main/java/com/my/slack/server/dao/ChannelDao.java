package com.my.slack.server.dao;

import com.my.slack.server.entity.Channel;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChannelDao {

  private final AtomicInteger idSequence = new AtomicInteger();
  private final Map<Integer, Channel> channels = new ConcurrentHashMap<>();

  private final MessageDao messageDao;

  @Autowired
  public ChannelDao(MessageDao messageDao) {
    var generalId = idSequence.incrementAndGet();
    var randomId = idSequence.incrementAndGet();
    this.channels.putAll(Map.of(
      generalId, new Channel(generalId, "general", false),
      randomId, new Channel(randomId, "random", false)
    ));
    this.messageDao = messageDao;
  }

  public Channel createChannel(String name) {
    var id = idSequence.incrementAndGet();
    var entity = new Channel(id, name, true);
    channels.put(id, entity);
    return entity;
  }

  public Channel renameChannel(int id, String name) {
    var channel = channels.get(id);
    var renamedChannel = new Channel(channel.id, name, channel.removable);
    channels.put(id, renamedChannel);
    return renamedChannel;
  }

  public Channel deleteChannel(int id) {
    messageDao.deleteMessagesByChannelId(id);
    return channels.remove(id);
  }

  public Collection<Channel> getAllChannels() {
    return channels.values();
  }
}
