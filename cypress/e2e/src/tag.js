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

        cy.get('gh-tag-list-name', { timeout: 5000 }).then($links => {
            const member = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(name); 
            }).first();
        });
    }

    editFirstTag (){
        cy.get('gh-tag-list-name', {timeout:5000}).first().click();
        cy.url().should('match', /\/ghost\/#\/tag\/.+/);
    }

    deleteTag(){
        cy.get('button[data-test-button="delete-tag"]').click({ force: true });
        cy.wait(3000);
    }  

    confirmDeleteTag(){
        cy.get('button[data-test-button="confirm"]').click({ force: true });
        cy.wait(3000);
    }  
    
    verifyTagDelete(name){

        cy.get('gh-tag-list-name', { timeout: 5000 }).then($links => {
            const member = $links.filter((index, element) => {
                if (Cypress.$(element).text().includes(name)){
                    return false;
                }
                return true; 
            }).first();
        });
    }

}

export default Tag;