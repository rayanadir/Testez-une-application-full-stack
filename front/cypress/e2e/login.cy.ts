/// <reference types="cypress" />

describe('Login spec', () => {
  
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

    cy.get('.mat-raised-button').should("be.enabled");
    cy.url().should('include', '/sessions');
    
  })

  it('Login failed, email field not filled', () => {
    cy.visit('/login');

    cy.intercept('POST', '/api/auth/login', {
      body: "Bad request",
      statusCode: 400
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
      body: "Bad request",
      statusCode: 400
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

  it("Login failed, bad credentials", () => {
    cy.visit("/login");

    cy.intercept('POST', '/api/auth/login', {
      body: "An error occurred",
      statusCode: 400
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session');
      
      cy.get('input[formControlName=email]').type("error@email.com");
      cy.get('input[formControlName=password]').type(`${"error_password"}{enter}{enter}`);
      
      cy.get('.mat-raised-button').should("be.enabled");
    
      cy.url().should("not.include", "/sessions");

      cy.contains("An error occurred").should("be.visible");
  })

});