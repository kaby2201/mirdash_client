/// <reference types="cypress" />

const baseurl = 'https://localhost:5001/';
const user = {};

class Robot {
    constructor() {
        this.port = 10001 + Math.floor(Math.random() * 10000);
        this.name = Math.random().toString(36).substring(2);
    }

    getAddr() {
        return `127.0.0.1:${this.port}`;
    }

    getURL() {
        return `http://${this.getAddr()}/api/v2.0.0`;
    }
}

context('Mirdash', () => {
    beforeEach(() => {
        cy.visit(baseurl);
        // load in some users from fixture/users.json
        cy.fixture('users.json').as('users');
    });

    let login = function loginUser(username, password) {
        cy.visit(`${baseurl}login`)
            .location('pathname').should('eq', '/login');

        cy.get('#Username').type(username);
        cy.get('#Password').type(password);
        cy.get('#Submit').click();
    };

    let logout = function logoutUser() {
        cy.get('#test-userdropdown').click();
        cy.get('#test-logout').click()
            .location('pathname').should('eq', '/login');
    };

    let loginAdmin = login.bind(this, 'admin', 'Password1.');

    // Try to login with invalid username and password
    it('Submit invalid username and password', () => {
        cy.visit(`${baseurl}login`);

        cy.location('pathname').should('eq', '/login');

        // login invalid user
        login('null', 'null');

        cy.location('pathname').should('eq', '/login');
        cy.get('.modal-body')
            .should('be.visible')
            .should('contain.text', ' Username or password is incorrect ');
    });

    // Try to login as administrator then logout
    it('Login as admin', () => {
        loginAdmin();

        cy.location('pathname').should('eq', '/');

        logout()
    });

    // Try to Register a user using admin account
    it('Register new user', () => {

        loginAdmin();

        cy.get('#test-add-user').click();
        cy.location('pathname').should('eq', '/register');

        user.username = Math.random().toString(36).substring(2);

        cy.get('#Firstname').type('John');
        cy.get('#Lastname').type('Smith');
        cy.get('#Username').type(user.username);
        cy.get('#Password').type('Password1.');
        cy.get('#Email').type(`${user.username}@gmail.com`);
        cy.get('#Input-3').select('User');
        cy.get('#Submit').click();

        // Will redirect to users page if successful
        cy.get('#test_btn_ok').click()
            .location('pathname').should('eq', '/usermanager');
        //
        // cy.get('#test-all-users').click()
        //     .location('pathname').should('eq', '/usermanager');

        cy.get('#test-users-list')
            .should('contain', user.username);

        logout();
    });

    // Login the registerd user from above
    it('Login new user', () => {
        login(user.username, 'Password1.')

        logout()
    });

    // Login as admin and delete the registed user from above
    it('Delete new user', () => {
        loginAdmin();

        cy.get('#test-all-users').click();
        cy.location('pathname').should('eq', '/usermanager');

        cy.get(`#test-delete-user${user.username}`).click();

        logout()
    });

    // Try to login with the delete account
    it('User was deleted', () => {

        login(user.username, 'Password1.')

        cy.get('.modal-body')
            .should('be.visible')
            .should('contain.text', ' Username or password is incorrect ');
    });

    it('Add new robot', () => {
        const robot = new Robot();
        loginAdmin();

        cy.get('a[href="/robots"]').click();
        cy.location('pathname').should('eq', '/robots');

        cy.get('a[href="/robots/add"]').click();
        cy.location('pathname').should('eq', '/robots/add');

        cy.get('#Robotname').type(robot.name);
        cy.get('#Address').type(robot.getAddr());

        cy.get('#RUsername').type('admin');
        cy.get('#RPassword').type('Password1.');

        cy.get('#Add-robot-submit').click();

        cy.get('body').then(b => {
            cy.wrap(b).find(`#Robotname-${robot.name}`).its('length').then(l => {
                expect(l).greaterThan(0);
            });
            cy.wrap(b).find(`#Robotaddress-${robot.name}`).its('length').then(l => {
                expect(l).greaterThan(0);
            });
        });

        cy.get('#test_btn_ok').click();

        logout();
    });
});
