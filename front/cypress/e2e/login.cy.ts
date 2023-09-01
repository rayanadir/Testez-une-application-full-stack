/// <reference types="cypress" />

describe('Login spec', () => {
  
  const checkEmailFormat = (email:string) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }

  it('Login successful', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    const email : string = "yoga@studio.com";

    cy.get('input[formControlName=email]').type(email);
    cy.get('input[formControlName=password]').type(`${"test!12345"}{enter}{enter}`);

    if(checkEmailFormat(email)){
      cy.get('.mat-raised-button').should("be.enabled");
      cy.url().should('include', '/sessions')
    }else{
      cy.get('.mat-raised-button').should("be.disabled");
      cy.url().should('not.include', '/sessions');      
    }
    
  })

  it('Login failed, email field not filled', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').should("have.value","");
    cy.get('input[formControlName=password]').type(`${"test!12345"}{enter}{enter}`);

    cy.get('.mat-raised-button').should("be.disabled");
    
    cy.url().should("not.include", "/sessions");
  });

  it("Login failed, password field not filled", () => {
    cy.visit("/login");

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session');
    
    cy.get('input[formControlName=email]').type("yoga@studio.com");
    cy.get('input[formControlName=password]').should("have.value","");

    cy.get('.mat-raised-button').should("be.disabled");
    
    cy.url().should("not.include", "/sessions");
  })

  it("Login failed, invalid email format", () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')


    const email : string = "y@";

    cy.get('input[formControlName=email]').type(email);
    cy.get('input[formControlName=password]').type(`${"test!12345"}{enter}{enter}`);

    if(checkEmailFormat(email)){
      cy.get('.mat-raised-button').should("be.enabled");
      cy.url().should('include', '/sessions')
    }else{
      cy.get('.mat-raised-button').should("be.disabled");
      cy.url().should('not.include', '/sessions');      
    }   
  })
});