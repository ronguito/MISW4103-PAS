class Post {

    //Title = '';

    create (){
        cy.get('a[href="#/editor/post/"]').first().click();
        cy.url().should('include', '/ghost/#/editor/post');
        
    }

    saveDraff(){
        cy.get('a[data-test-link="posts"]').click();
        cy.url().should('include', '/ghost/#/posts');
    }

    savePublish(){
        cy.get('button[data-test-button="publish-save"').first().click();
        cy.wait(1000);
        this.saveDraff();
    }

    setTitle(title){
        cy.get('textarea[placeholder="Post title"]').clear().type(title);
    }

    selectFirst(status){
        return cy.get('a.gh-post-list-title', { timeout: 3000 }).then($links => {
            const post = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(status); 
            }).first();
            var title = post.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            post.click();
            return title; 
        });
    }

    publish(){
        cy.get('button[data-test-button="publish-flow"').first().click();
        cy.get('button[data-test-button="continue"]').click();
        cy.get('button[data-test-button="confirm-publish"]').click();
        cy.url().should('include', '/ghost/#/posts');
        cy.get('button[ data-test-button="close-publish-flow"]').click();
    }

    delete(){
        cy.url().should('match', /\/ghost\/#\/editor\/post\/.+/);
        cy.get('button[title="Settings"]').click();// Abrir el menú de opciones del post
        cy.get('button[data-test-button="delete-post"]').click();// clic boton en eliminar
        cy.get('button[data-test-button="delete-post-confirm"]').click(); // Confirmar la eliminación
        cy.url().should('include', '/ghost/#/posts');
    }

    validateStatus(status, title){

        cy.get('a.gh-post-list-title', { timeout: 3000 }).then($links => {
            const post = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(status); 
            }).first();
            const read = post.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            console.log("validateStatus: " + title);
            expect(read).to.equal(title); 
        });
    }

    validatePublished(host,title, shouldContain=true){
        cy.visit(host);
        if (shouldContain) {
            cy.get('div.gh-container-inner').should('contain.text', title);
        } else {
            cy.get('div.gh-container-inner').should('not.contain.text', title);
        }
    }

}

export default Post;