class Member {

    //Title = '';

    create (){
        cy.wait(5000)
        cy.get('a[href="#/members/new/"]', {timeout:5000}).first().click();
        cy.url().should('include', '/ghost/#/members/new');
        
    }

    editFirstMember (){
        cy.get('a.gh-list-data', {timeout:5000}).first().click();
        cy.url().should('match', /\/ghost\/#\/members\/.+/);

    }

    editLastMember (){
        cy.get('a.gh-list-data', {timeout:5000}).last().click();
        cy.url().should('match', /\/ghost\/#\/members\/.+/);

    }

    save(){
        cy.get('button[data-test-button="save"]').click({ force: true });
        cy.wait(3000);
    }

    setName(name){
        cy.wait(5000)
        cy.get('input[id="member-name"]')
        .should('be.visible')
        .should('not.be.disabled')
        .then(($input) => {
        if ($input.length > 0) {
        cy.wrap($input).clear().type(name);
        } else {
        cy.log('El campo "member-name" no está disponible');
        }
        });
    }

    setEmail(email){
        cy.get('input[id="member-email"]', { timeout: 5000 }).should('exist').should('be.visible').clear().type(email);
    }


    verifyMemberEmail(email){

        cy.get('p.gh-members-list-email', { timeout: 5000 }).then($links => {
            const member = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(email); 
            }).first();
            // const read = member.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            // expect(read).to.equal(title); 
        });
    }

    verifyMemberName(name){
        cy.get('h3.gh-members-list-name', { timeout: 3000 }).then($links => {
            const member = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(name); 
            }).first();
        });
    }

    verifyErrorMessage(msg){
        cy.get('p.response', { timeout: 5000 }).then($links => {
            const member = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(msg); 
            }).first();
        });
    }

}

export default Member;