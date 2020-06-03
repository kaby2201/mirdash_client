/// <reference types="cypress" />

const baseurl = 'http://localhost:5000/';
let user = {};

context('Mirdash', () => {
    beforeEach(() => {
    });

    it('register', () => {
        user.username = Math.random().toString(36).substring(2);
        cy.request({
            url: `${baseurl}users/register`, method: 'POST', body: {
                'firstName': 'John',
                'lastName': 'Smith',
                'username': user.username,
                'password': 'Password1.'
            }
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('username', user.username);
            expect(response.body).to.have.property('password', '***');
        });
    });

    it('login', () => {
        cy.request({
            url: `${baseurl}users/authenticate`, method: 'POST', body: {
                'username': user.username,
                'password': 'Password1.'
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('username', user.username);
            expect(response.body).property('token').to.be.a('string');
            expect(response.body).property('id').to.be.a('string');
            user.token = response.body.token;
            user.id = response.body.id;
        });
    });

    it('get user', () => {
        cy.request({url: `${baseurl}users/${user.id}`, auth: {bearer: user.token}}).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('username', user.username);
        });
    });

    it('update user', () => {
        user.username = Math.random().toString(36).substring(2);
        cy.request({
            url: `${baseurl}users/${user.id}`, method: 'PUT', body: {
                'firstname': 'John',
                'lastname': 'Smith',
                'username': user.username
            }, auth: {bearer: user.token}
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('username', user.username);
        });
    });

    it('get updated user', () => {
        cy.request({url: `${baseurl}users/${user.id}`, auth: {bearer: user.token}}).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('username', user.username);
        });
    });

    it('deletes user', () => {
        cy.request({url: `${baseurl}users/${user.id}`, method: 'DELETE', auth: {bearer: user.token}}).then(response => {
            console.log(response);
        });
    });
});