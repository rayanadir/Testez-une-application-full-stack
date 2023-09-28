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

import static org.junit.jupiter.api.Assertions.assertEquals;
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
}
