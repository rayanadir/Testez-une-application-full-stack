package com.openclassrooms.starterjwt.controller;

import com.openclassrooms.starterjwt.controllers.SessionController;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SessionControllerTest {

    @InjectMocks
    private SessionController sessionController;

    @Mock
    private SessionMapper sessionMapper;

    @Mock
    private SessionService sessionService;

    @BeforeEach
    public void setUp(){
        sessionController = new SessionController(sessionService,sessionMapper);
    }

    @Test
    @DisplayName("findById method, return response entity OK")
    void whenUserId_thenReturnResponseEntityOK(){
        String id = "4";
        Session session = new Session();
        SessionDto sessionDto = new SessionDto();

        when(sessionService.getById(Long.valueOf(id))).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        ResponseEntity<?> responseEntityOK = ResponseEntity.ok().body(sessionDto);
        ResponseEntity<?> findById = sessionController.findById(id);

        assertEquals(findById.getStatusCode(), HttpStatus.OK);
        assertEquals(findById, responseEntityOK);
    }

    @Test
    @DisplayName("findById method, return not found response entity")
    void whenSessionNull_thenResponseEntityNotFound(){
        String id = "0";
        Session session = null;

        when(sessionService.getById(Long.valueOf(id))).thenReturn(session);
        ResponseEntity<?> findById = sessionController.findById(id);
        assertEquals(findById.getStatusCode(),  HttpStatus.NOT_FOUND);
    }

    @Test
    @DisplayName("findById method, return response entity bad request")
    void whenNumberFormatException_thenReturnResponseEntityBadRequest(){
        String id = "invalid_id";

        assertThrows(NumberFormatException.class, () -> { Long.valueOf(id); });
        ResponseEntity<?> findById = sessionController.findById(id);
        ResponseEntity<?> badRequestResponse = ResponseEntity.badRequest().build();
        assertEquals(findById, badRequestResponse);
    }

    @Test
    @DisplayName("findAll method, return response entity OK")
    void whenSessionList_thenReturnResponseEntityOK(){
        List<Session> sessions = new ArrayList<>();
        when(sessionService.findAll()).thenReturn(sessions);
        List<SessionDto> sessionDto = sessionMapper.toDto(sessions);

        ResponseEntity<?> responseEntityOK = ResponseEntity.ok(sessionDto);
        ResponseEntity<?> findAll = sessionController.findAll();

        assertEquals(findAll, responseEntityOK);
    }

    @Test
    @DisplayName("create method, return response entity OK")
    void whenSessionDTO_thenReturnResponseEntityOK(){
        Session session = new Session();
        SessionDto sessionDto = new SessionDto();

        when(sessionMapper.toEntity(sessionDto)).thenReturn(session);
        when(sessionService.create(session)).thenReturn(session);

        ResponseEntity<?> responseEntityOK = ResponseEntity.ok().body(sessionMapper.toDto(session));
        ResponseEntity<?> create = sessionController.create(sessionDto);

        assertEquals(create, responseEntityOK);
    }
}
