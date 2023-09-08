import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { Session } from '../../interfaces/session.interface';
import { of } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  } 

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        SessionApiService
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Form session", () => {
    // Add form component constructor parameters (mocks), object keys are service methods
    let mockComponent: FormComponent;

    let mockRoute: any = { snapshot: { paramMap: { get: jest.fn() } } };
    let mockFormBuilder: FormBuilder = new FormBuilder();
    let mockMatSnackBar: any = { open: jest.fn()};
    let mockSessionService: any;
    let mockSessionApiService: any = {
      create: jest.fn().mockReturnValue({subscribe: jest.fn()}),
      update: jest.fn().mockReturnValue({subscribe: jest.fn()}),
    };
    //let mockSessionService: any;
    let mockTeacherService: any = {all : jest.fn()};
    let mockRouter: any = {
      navigate: jest.fn(),
    };

    mockComponent = new FormComponent(
      mockRoute as ActivatedRoute,
      mockFormBuilder,
      mockMatSnackBar as MatSnackBar,
      mockSessionApiService as SessionApiService,
      mockSessionService as SessionService,
      mockTeacherService as TeacherService,
      mockRouter as Router
    )

    it("Creates session", () => {
      // Session request data
      const sessionReq : Session = {
        id:1,
        name: 'Name',
        description: 'Description',
        date: new Date(),
        teacher_id: 1,
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Input & submit form
      const form = mockComponent.sessionForm?.setValue(sessionReq);
      mockComponent.onUpdate = false;
      mockComponent.submit();

      // Call sessionApiService with session request data
      expect(mockSessionApiService.create).toHaveBeenCalledTimes(1);
      expect(mockSessionApiService.create).toHaveBeenCalledWith(form);

      // Mock subscribe
      mockSessionApiService.create.mockReturnValue(of(
        mockMatSnackBar.open("Session created !"),
        mockRouter.navigate(['sessions'])
      ));

      // Call open
      expect(mockMatSnackBar.open).toHaveBeenCalledTimes(1);
      expect(mockMatSnackBar.open).toHaveBeenCalledWith("Session created !");

      // Call navigation
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
    });

  })
});
