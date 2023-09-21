package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setUp(){
        sessionService = new SessionService(sessionRepository,userRepository);
    }

    @Test
    @DisplayName("create method")
    void create(){
        Teacher teacher = new Teacher();
        teacher.setId(12346789L);
        teacher.setLastName("Lastname");
        teacher.setFirstName("Firstname");
        teacher.setCreatedAt(LocalDateTime.now());
        teacher.setUpdatedAt(LocalDateTime.now());

        List<User> users = new ArrayList<>();

        Session session = new Session();
        session.setId(123456789L);
        session.setName("Session");
        session.setDate(Date.from(Instant.now()));
        session.setDescription("Description");
        session.setTeacher(teacher);
        session.setUsers(users);
        session.setCreatedAt(LocalDateTime.now());
        session.setUpdatedAt(LocalDateTime.now());

        when(sessionRepository.save(session)).thenReturn(session);
        Session sessionMock = sessionService.create(session);
        verify(sessionRepository, times(1)).save(session);
        assertEquals(session,sessionMock);
    }
}
