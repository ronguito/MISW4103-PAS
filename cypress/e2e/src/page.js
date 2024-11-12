class Page {

    //Title = '';

    create (){
        cy.get('a[href="#/editor/page/"]').first().click();
        cy.url().should('include', '/ghost/#/editor/page');
        
    }

    save(){
        cy.wait(5000);
        cy.get('a[data-test-link="pages"]').click();
        cy.url().should('include', '/ghost/#/pages');
    }

    update(){
        cy.get('button[data-test-button="publish-save"').first().click();
        cy.wait(1000);
        this.saveDraff();
    }

    setTitle(title){
        cy.get('textarea[placeholder="Page title"]').clear().type(title);
    }

    selectFirst(status){
        return cy.get('a.gh-post-list-title', { timeout: 3000 }).then($links => {
            const page = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(status); 
            }).first();
            var title = page.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            page.click();
            return title; 
        });
    }

    getUrl() {
        cy.get('button[title="Settings"]').click(); 
        cy.wait(1000);
    
        return cy.get('input[name="post-setting-slug"]').invoke('val').then((url) => {
            cy.get('button[title="Settings"]').click(); // Cierra el menú
            return cy.wrap(url); // Devuelve el valor de forma segura dentro de la cadena de Cypress
        });
    }

    setUrl(url) {
        cy.get('button[title="Settings"]').click(); 
        cy.wait(1000);
        cy.get('input[name="post-setting-slug"]').clear({ force: true }).type(url, { force: true });
        cy.get('button[title="Settings"]').click(); 
        cy.wait(1000);
    }
    

    publish(){
        cy.get('button[data-test-button="publish-flow"').first().click();
        cy.get('button[data-test-button="continue"]').click();
        cy.get('button[data-test-button="confirm-publish"]').click();
        cy.url().should('include', '/ghost/#/pages');
        cy.get('button[data-test-button="close-publish-flow"]').click();
    }

    delete(){
        cy.url().should('match', /\/ghost\/#\/editor\/page\/.+/);
        cy.get('button[title="Settings"]').click();// Abrir el menú de opciones del post
        cy.get('button[data-test-button="delete-post"]').click();// clic boton en eliminar
        cy.get('button[data-test-button="delete-post-confirm"]').click(); // Confirmar la eliminación
        cy.url().should('include', '/ghost/#/pages');
    }

    verifyStatus(status, title){

        cy.get('a.gh-post-list-title', { timeout: 3000 }).then($links => {
            const page = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(status); 
            }).first();
            const read = page.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            expect(read).to.equal(title); 
        });
    }

}

export default Page;