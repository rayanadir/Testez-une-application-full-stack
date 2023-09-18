package com.openclassrooms.starterjwt.controller;

import com.openclassrooms.starterjwt.controllers.SessionController;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SessionControllerTest {

    @InjectMocks
    SessionController sessionController;

    @Mock
    private SessionMapper sessionMapper;

    @Mock
    private SessionService sessionService;

    @BeforeEach
    void setUp(){
        sessionController = new SessionController(sessionService,sessionMapper);
    }
}
