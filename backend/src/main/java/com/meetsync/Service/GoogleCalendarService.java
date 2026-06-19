package com.meetsync.Service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GoogleCalendarService {

    public List<Map<String, Object>> getUpcomingEvents(String accessToken) {
        try {
            GoogleCredentials credentials = GoogleCredentials.create(
                new AccessToken(accessToken, Date.from(
                    java.time.Instant.now().plusSeconds(3600)))
            );

            Calendar service = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials)
            )
            .setApplicationName("MeetSync")
            .build();

            DateTime now = new DateTime(System.currentTimeMillis());
            DateTime weekLater = new DateTime(
                System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000);

            Events events = service.events().list("primary")
                .setTimeMin(now)
                .setTimeMax(weekLater)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();

            List<Map<String, Object>> result = new ArrayList<>();
            for (Event event : events.getItems()) {
                Map<String, Object> e = new HashMap<>();
                e.put("id", event.getId());
                e.put("title", event.getSummary() != null ? event.getSummary() : "Busy");
                e.put("start", event.getStart().getDateTime() != null
                    ? event.getStart().getDateTime().toString()
                    : event.getStart().getDate().toString());
                e.put("end", event.getEnd().getDateTime() != null
                    ? event.getEnd().getDateTime().toString()
                    : event.getEnd().getDate().toString());
                result.add(e);
            }
            return result;

        } catch (Exception e) {
            throw new RuntimeException("Calendar fetch failed: " + e.getMessage());
        }
    }
}