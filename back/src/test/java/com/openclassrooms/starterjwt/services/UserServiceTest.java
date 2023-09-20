package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setUp(){
        userService = new UserService(userRepository);
    }

    @Test
    @DisplayName("delete method")
    void whenUserId_thenDeleteById(){
        Long id = 123456789L;

        // Call methods
        userRepository.deleteById(id);
        userService.delete(id);
    }
}
