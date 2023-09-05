import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { describe, expect } from '@jest/globals';
import { JestExpect } from '@jest/expect';
import { throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { describe } from '@jest/globals';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare const expect: JestExpect;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Register", () => {
    let mockAuthService: any = {
      register: jest.fn().mockReturnValue({subscribe:jest.fn()})
    }; 
    let mockFormBuilder: FormBuilder = new FormBuilder();
    let mockRouter: any = {navigate:jest.fn()};

    let mockComponent: RegisterComponent = new RegisterComponent(mockAuthService as AuthService,mockFormBuilder,mockRouter as Router)
    
    it("Register failed, invalid fields", () => {
      const registerReq= {
        email:"",
        firstName:"",
        lastName:"",
        password:""
      }
      mockComponent.form.setValue(registerReq);
      mockAuthService.register.mockReturnValue(throwError(() => {new Error("Error : invalid fields !")}));
     
      mockComponent.submit();
      
      expect(mockComponent.onError).toBeTruthy();
      expect(mockRouter.navigate).not.toHaveBeenCalledWith();
    })
  })


});
