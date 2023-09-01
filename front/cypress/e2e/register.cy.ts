/// <reference types="cypress" />

describe('Register spec', () => {
  
    const checkEmailFormat = (email:string) => {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email);
    }
    
    it('Register successful', () => {
          cy.visit('/register')
  
          cy.intercept('POST', '/api/auth/register', {
            body: {
              firstName: 'firstName',
              lastName: 'lastName',
              email: 'email@mail.com',
              password: 'password'
            },
          })
  
          cy.intercept(
            {
              method: 'GET',
              url: '/api/session',
            },
            []).as('session')
  
          cy.get('input[formControlName=firstName]').type("firstName");
          cy.get('input[formControlName=lastName]').type("lastName");
          cy.get('input[formControlName=email]').type("yoga@studio.com");
          cy.get('input[formControlName=password]').type("password");
  
          cy.get('.register-form > .mat-focus-indicator').should("be.enabled");
          cy.url().should('include', '/sessions');
  
    })
  
    it("Register failed, firstName field not filled", () => {
      cy.visit('/register')
  
      cy.intercept('POST', '/api/auth/register', {
        body: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com',
          password: 'password'
        },
      })
  
      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        []).as('session')
  
      cy.get('input[formControlName=firstName]').should("have.value","");
      cy.get('input[formControlName=lastName]').type("lastName");
      cy.get('input[formControlName=email]').type("yoga@studio.com");
      cy.get('input[formControlName=password]').type("password");
  
  
      cy.get('.register-form > .mat-focus-indicator').should("be.disabled");
      cy.url().should('not.include', '/sessions');
      
    })
  
    it("Register failed, lastName field not filled", () => {
      cy.visit('/register')
  
      cy.intercept('POST', '/api/auth/register', {
        body: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com',
          password: 'password'
        },
      })
  
      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        []).as('session')
  
      cy.get('input[formControlName=firstName]').type("firstName");
      cy.get('input[formControlName=lastName]').should("have.value","");
      cy.get('input[formControlName=email]').type("yoga@studio.com");
      cy.get('input[formControlName=password]').type("password");
  
  
      cy.get('.register-form > .mat-focus-indicator').should("be.disabled");
      cy.url().should('not.include', '/sessions');
    })
  
    it("Register failed, email field not filled", () => {
      cy.visit('/register')
  
      cy.intercept('POST', '/api/auth/register', {
        body: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com',
          password: 'password'
        },
      })
  
      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        []).as('session')
  
      cy.get('input[formControlName=firstName]').type("firstName");
      cy.get('input[formControlName=lastName]').type("lastName");
      cy.get('input[formControlName=email]').should("have.value","");
      cy.get('input[formControlName=password]').type("password");
  
  
      cy.get('.register-form > .mat-focus-indicator').should("be.disabled");
      cy.url().should('not.include', '/sessions');
    })
  
    it("Register failed, password field not filled", () => {
      cy.visit('/register')
  
      cy.intercept('POST', '/api/auth/register', {
        body: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com',
          password: 'password'
        },
      })
  
      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        []).as('session')
  
      cy.get('input[formControlName=firstName]').type("firstName");
      cy.get('input[formControlName=lastName]').type("lastName");
      cy.get('input[formControlName=email]').type("yoga@studio.com");
      cy.get('input[formControlName=password]').should("have.value","");
  
  
      cy.get('.register-form > .mat-focus-indicator').should("be.disabled");
      cy.url().should('not.include', '/sessions');
    })
  
    it("Register failed, invalid email format", () => {
      cy.visit('/register')
  
      cy.intercept('POST', '/api/auth/register', {
        body: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email@mail.com',
          password: 'password'
        },
      })
  
      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        []).as('session')
  
      const email : string = "y@";
  
      cy.get('input[formControlName=firstName]').type("firstName");
      cy.get('input[formControlName=lastName]').type("lastName");
      cy.get('input[formControlName=email]').type(email);
      cy.get('input[formControlName=password]').type("password");
  
      if(checkEmailFormat(email)){
        cy.get('.register-form > .mat-focus-indicator').should("be.enabled");
        cy.url().should('include', '/sessions');
      }else{
        cy.get('.register-form > .mat-focus-indicator').should("be.disabled");
        cy.url().should('not.include', '/sessions');
      }
      
    })
  })