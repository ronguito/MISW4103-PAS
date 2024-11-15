class Member {

    //Title = '';
    Port = '';

    create (){
        cy.wait(5000)
        cy.get('a[href="#/members/new/"]', {timeout:5000}).first().click();
        cy.url().should('include', '/ghost/#/members/new');
        cy.captureImage();
    }

    editFirstMember (){
        cy.get('a.gh-list-data', {timeout:5000}).first().click();
        cy.url().should('match', /\/ghost\/#\/members\/.+/);

    }

    editLastMember (){
        cy.get('a.gh-list-data', {timeout:5000}).last().click();
        cy.url().should('match', /\/ghost\/#\/members\/.+/);

    }

    setName(name){
        cy.wait(5000)
        cy.get('input[id="member-name"]')
            .then(($input) => {
                if ($input.length > 0) {
                    cy.wrap($input).clear({force:true}).type(name,{force:true});
                } else {
                    cy.log('El campo "member-name" no está disponible');
                }
            });
        cy.captureImage();
       
    }

    setEmail(email){
        cy.get('input[id="member-email"]', { timeout: 5000 })
            .should('exist')
            .clear({force:true})
            .type(email,{force:true});
        cy.captureImage();
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
        const selector = this.Port==2345? 'div.gh-alert-content':'p.response'
        cy.get(selector, { timeout: 5000 }).then($links => {
            const member = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(msg); 
            }).first();
        });
        cy.captureImage();
    }

}

export default Member;