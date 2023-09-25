package com.openclassrooms.starterjwt.controller;

import com.openclassrooms.starterjwt.controllers.TeacherController;
import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TeacherControllerTest {

    @InjectMocks
    private TeacherController teacherController;

    @Mock
    private TeacherMapper teacherMapper;

    @Mock
    private TeacherService teacherService;

    @BeforeEach
    public void setUp(){
        teacherController = new TeacherController(teacherService, teacherMapper);
    }

    @Test
    @DisplayName("findById method, return response entity ok")
    void whenTeacherId_thenReturnResponseEntityOK(){
        String id = "1";
        Teacher teacher = new Teacher();
        TeacherDto teacherDto = new TeacherDto();
        when(teacherService.findById(Long.valueOf(id))).thenReturn(teacher);
        when(teacherMapper.toDto(teacher)).thenReturn(teacherDto);
        ResponseEntity<?> responseEntity = ResponseEntity.ok().body(teacherDto);
        ResponseEntity<?> findById = teacherController.findById(id);
        assertEquals(findById,responseEntity);
        verify(teacherMapper, times(1)).toDto(teacher);
    }
}
