package com.my.slack.server.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import static java.nio.charset.StandardCharsets.UTF_8;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FakeDataService {

  private final ObjectMapper objectMapper;

  private final Map<Boolean, List<String>> firstNames;
  private final Map<Boolean, List<String>> lastNames;

  private final Random random = new Random();

  @Autowired
  public FakeDataService(ObjectMapper objectMapper) throws IOException {
    this.objectMapper = objectMapper;
    this.firstNames = Map.of(
      true, readData("male_first_name.json"),
      false, readData("female_first_name.json")
    );
    this.lastNames = Map.of(
      true, readData("male_last_name.json"),
      false, readData("female_last_name.json")
    );
  }

  public String[] findUserName() {
    boolean gender = random.nextBoolean();
    String firstName = getRandomElement(firstNames.get(gender));
    String lastName = getRandomElement(lastNames.get(gender));
    return new String[] { firstName, lastName };
  }

  private <T> T getRandomElement(List<T> list) {
    return list.get(random.nextInt(list.size()));
  }

  private List<String> readData(String fileName) throws IOException {
    String filePath = "fake-data/" + fileName;
    try(BufferedReader reader = new BufferedReader(new InputStreamReader(
      Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream(filePath), "can't find '" + filePath + "' file"), UTF_8
    ))) {
      return List.of(objectMapper.readValue(reader, String[].class));
    }
  }
}
