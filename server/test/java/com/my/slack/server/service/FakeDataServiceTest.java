package com.my.slack.server.service;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FakeDataServiceTest {

  @Autowired
  private FakeDataService fakeDataService;

  @Test
  void findName() {
    String[] names = fakeDataService.findUserName();
    assertEquals(2, names.length);
    assertFalse(names[0].isBlank(), "First name is empty");
    assertFalse(names[1].isBlank(), "Last name is empty");
  }
}
