package com.my.slack.server.controller;

import com.my.slack.server.service.ChannelService;
import com.my.slack.server.service.FakeDataService;
import com.my.slack.server.service.MessageService;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/*")
public class RootController {

  private final ChannelService channelService;

  private final MessageService messageService;

  private final FakeDataService fakeDataService;

  @Autowired
  public RootController(ChannelService channelService, MessageService messageService, FakeDataService fakeDataService) {
    this.channelService = channelService;
    this.messageService = messageService;
    this.fakeDataService = fakeDataService;
  }

  @GetMapping
  public String getRoot(
    Model model,
    @CookieValue(name = "firstname", required = false) String firstName,
    @CookieValue(name = "lastname", required = false) String lastName,
    HttpServletResponse response
  ) {
    if (firstName == null && lastName == null) {
      String[] names = fakeDataService.findUserName();
      response.addCookie(new Cookie("firstname", names[0]));
      response.addCookie(new Cookie("lastname", names[1]));
    }

    model.addAttribute("channels", channelService.getAllChannels());
    model.addAttribute("messages", messageService.getAllMessages());
    return "index";
  }
}
