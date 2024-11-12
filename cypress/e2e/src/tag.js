class Tag {

    //Title = '';

    selectTag (){
         
        cy.get('a[href*="#/tags/new/"]').click();
        cy.url().should('include', '/ghost/#/tags/new');
    }  
    
    setNameTag (name){       
        cy.get('input[name="name"]', { timeout: 5000 }).should('exist').should('be.visible').clear().type(name);        
    }  

    saveTag(){
        cy.get('button[data-test-button="save"]').click({ force: true });
        cy.wait(3000);
    }

    verifyTag(name){

        cy.get('a[title="Edit tag"]', { timeout: 5000 }).then($links => {
            const member = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(name); 
            }).first();
        });
    }

    editFirstTag (){
        cy.get('a[title="Edit tag"]', {timeout:2000}).first().click();
        cy.url().should('match', /\/ghost\/#\/tags\/.+/);
    }

    deleteTag(){
        cy.get('button[data-test-button="delete-tag"]').click({ force: true });
        cy.wait(3000);
    }  

    confirmDeleteTag(){
        cy.get('button[data-test-button="confirm"]').click({ force: true });
        cy.url().should('include', '/ghost/#/tags');
    }  
    
    verifyTagDelete(name){
        cy.get('section.view-container').then((container) => {
            const containerText = container.text();
            expect(containerText).not.to.include(name);
        });
    }

}

export default Tag;