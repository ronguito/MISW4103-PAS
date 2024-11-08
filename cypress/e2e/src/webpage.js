class Webpage {

    visit (host){
        cy.visit(host);
        cy.url().should('include', host);
    }

    login (username, password){
        cy.get('input[name="identification"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/ghost/#/dashboard');
    }
	
}

export default Webpage;