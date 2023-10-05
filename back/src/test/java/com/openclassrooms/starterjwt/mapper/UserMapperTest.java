package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    private User userEntity;

    @BeforeEach
    public void setUp(){
        userEntity = new User();
        userEntity.setId(6L);
        userEntity.setEmail("email@test.com");
        userEntity.setPassword("password");
        userEntity.setFirstName("firstname");
        userEntity.setLastName("lastname");
        userEntity.setAdmin(false);
    }

    @Test
    void userDtoToEntity(){
        UserDto userDto = new UserDto();
        userDto.setEmail("email@email.com");
        userDto.setId(7L);
        userDto.setAdmin(false);
        userDto.setFirstName("firstname");
        userDto.setLastName("lastname");
        userDto.setPassword("password");

        User user = userMapper.toEntity(userDto);

        assertNotNull(user);
        assertEquals(userDto.getId(),user.getId());
    }
}
