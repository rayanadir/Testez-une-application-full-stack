package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

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
        // When id
        Long id = 123456789L;

        // Then delete by id , call methods
        userService.delete(id);
        userRepository.deleteById(id);

        verify(userRepository,times(2)).deleteById(id);
    }
}
