class Post {

    //Title = '';

    create (){
        cy.get('a[href="#/editor/post/"]').first().click();
        cy.url().should('include', '/ghost/#/editor/post');
        cy.captureImage();
    }

    save(){
        cy.wait(5000);
        cy.get('a.gh-editor-back-button').click();
        cy.url().should('include', '/ghost/#/posts');
    }

    update(){
        cy.get('button[data-test-button="publish-save"').first().click();
        cy.wait(1000);
        this.save();
    }

    setTitle(title){
        cy.get('textarea.gh-editor-title').then($textarea => {
            const text = $textarea.val();
            if (text) {
                cy.get('textarea.gh-editor-title').clear();
            }
            cy.get('textarea.gh-editor-title').type(title);
        });
        cy.captureImage();
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
        cy.captureImage();
        cy.get('button[data-test-button="confirm-publish"]').click();
        cy.url().should('include', '/ghost/#/posts');
        cy.get('button[data-test-button="close-publish-flow"]').click();
    }

    delete(){
        cy.url().should('match', /\/ghost\/#\/editor\/post\/.+/);
        cy.get('button[title="Settings"]').click();// Abrir el menú de opciones del post
        cy.captureImage();
        cy.get('button[data-test-button="delete-post"]').click();// clic boton en eliminar
        cy.captureImage();
        cy.get('button[data-test-button="delete-post-confirm"]').click(); // Confirmar la eliminación
        cy.url().should('include', '/ghost/#/posts');

    }

    verifyStatus(status, title){

        cy.get('li.gh-list-row', { timeout: 3000 }).then($links => {
            const post = $links.filter((index, element) => {
                const statusLc = status.toLowerCase();
                return Cypress.$(element).text().toLowerCase().includes(statusLc); 
            }).first();
            const read = post.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            expect(read).to.equal(title); 
        });
    }

}

export default Post;