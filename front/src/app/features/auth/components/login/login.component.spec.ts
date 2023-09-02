import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // add login component constructor parameters (mocks)
  let mockAuthService = jest.fn().mockReturnValue(jest.fn());
  let mockFormBuilder: FormBuilder = new FormBuilder();
  let mockRouter = jest.fn();
  let mockSessionService = jest.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [SessionService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Login successful", () => {
    // Login request data
    const loginReq = {
      email:"yoga@studio.com",
      password:"test!12345"
    }
    
    // Expected login response data
    const loginRes = {
      token:"token",
      type:"Bearer",
      id:1,
      username:"username",
      firstName:"firstName",
      lastName:"lastName",
      admin:true,
    }

    // Input & submit form
    component.form.setValue(loginReq);
    component.submit();

    // Call authService with login request data
    expect(mockAuthService).toHaveBeenCalledTimes(1);
    expect(mockAuthService).toHaveBeenCalledWith(loginReq);

    // Get authService response
    mockAuthService.mockReturnValue(loginRes);

    // Call sessionService with login response data
    expect(mockSessionService).toHaveBeenCalledTimes(1);
    expect(mockSessionService).toHaveBeenCalledWith(loginRes);

    // Call navigation
    expect(mockRouter).toHaveBeenCalledTimes(1);
    expect(mockRouter).toHaveBeenCalledWith(['/sessions']);
  })
});
