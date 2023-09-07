import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { expect, jest } from '@jest/globals';

import { MeComponent } from './me.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { of } from 'rxjs';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Me", () => {
    // Add me component constructor parameters (mocks), object keys are service methods
    let mockRouter : any;
    let mockMatSnackBar! : MatSnackBar;
    let mockUserService : any = {
      getById: jest.fn().mockReturnValue({subscribe: jest.fn()}),
      //getById: jest.fn().mockImplementation(() => mockUserID),
    };

    let mockComponent : MeComponent =  new MeComponent(
      mockRouter as Router,
      mockSessionService as SessionService,
      mockMatSnackBar as MatSnackBar,
      mockUserService as UserService
    )

    it("Displays user data" , () => {
      let user: User | undefined;

      // Expected user information data
      user = {
        id: 1,
        email: "email@email.com",
        lastName: "firstName",
        firstName: "lastName",
        admin: true,
        password: "password",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockComponent.ngOnInit();
      
      expect(mockUserService.getById).toHaveBeenCalledTimes(1);
      expect(mockUserService.getById).toHaveBeenCalledWith(mockSessionService.sessionInformation.id.toString());
      
      mockUserService.getById.mockReturnValue(of(user));
      
    })
  })
});
