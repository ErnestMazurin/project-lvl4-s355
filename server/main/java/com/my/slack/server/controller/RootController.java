package com.my.slack.server.controller;

import com.my.slack.server.service.ChannelService;
import com.my.slack.server.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/*")
public class RootController {

  private final ChannelService channelService;

  private final MessageService messageService;

  @Autowired
  public RootController(ChannelService channelService, MessageService messageService) {
    this.channelService = channelService;
    this.messageService = messageService;
  }

  @GetMapping
  public String getRoot(Model model) {
    model.addAttribute("channels", channelService.getAllChannels());
    model.addAttribute("messages", messageService.getAllMessages());
    return "index";
  }
}
