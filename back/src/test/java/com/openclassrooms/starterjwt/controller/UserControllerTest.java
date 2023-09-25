package com.openclassrooms.starterjwt.controller;

import com.openclassrooms.starterjwt.controllers.UserController;
import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserMapper userMapper;

    @Mock
    private UserService userService;

    @BeforeEach
    public void setUp(){
        userController = new UserController(userService,userMapper);
    }

    @Test
    @DisplayName("findById method, return response entity ok")
    void whenUserId_thenReturnResponseEntityOK(){
        String id = "4";
        User user = new User();
        UserDto userDto = new UserDto();

        when(userService.findById(Long.valueOf(id))).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(userDto);

        ResponseEntity<?> findById = userController.findById(id);
        ResponseEntity<?> responseEntityOK = ResponseEntity.ok().body(userDto);

        assertEquals(findById, responseEntityOK);
        verify(userService, times(1)).findById(Long.parseLong(id));
        verify(userMapper, times(1)).toDto(user);
    }
}
