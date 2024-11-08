class Post {

    PostTitle = '';

    create (){
        cy.get('a[href="#/editor/post/"]').first().click();
        cy.url().should('include', '/ghost/#/editor/post');
        
    }

    saveDraff(){
        cy.get('a[data-test-link="posts"]').click();
        cy.url().should('include', '/ghost/#/posts');
    }

    setTitle(title){
        cy.get('textarea[placeholder="Post title"]').type(title);
        this.PostTitle = title;
    }

    selectDraft(){
        cy.get('a.gh-post-list-title', { timeout: 3000 }).then($links => {
            
            const post = $links.filter((index, element) => {
                return Cypress.$(element).text().includes('Draft'); 
            }).first();
            const title = post.find('h3').text().trim().replace(/\n+/g, ' ').trim();
            this.PostTitle = title;
            post.click();
        });
    }

    publish(){
        cy.get('button[data-test-button="publish-flow"').first().click();
        cy.get('button[data-test-button="continue"]').click();
        cy.get('button[data-test-button="confirm-publish"]').click();
        cy.url().should('include', '/ghost/#/posts');
        cy.get('button[ data-test-button="close-publish-flow"]').click();
    }


    validateStatus(status){

        cy.get('a.gh-post-list-title', { timeout: 3000 }).then($links => {
            const post = $links.filter((index, element) => {
                return Cypress.$(element).text().includes(status); 
            }).first();
            const postElement = post.get(0);
            expect(postElement.innerHTML).to.include(this.PostTitle); 
        });
    }

    validatePublished(host){
        cy.visit(host);
        cy.url().should('include', host);
        console.log("validatePublished: " + this.PostTitle)
        cy.get('div.gh-container-inner').should('contain.text', this.PostTitle);
    }

}

export default Post;