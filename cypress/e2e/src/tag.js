class Tag {

    //Title = '';

    createTag (){
         
        cy.get('a[href*="#/tags/new/"]').click();
        cy.url().should('include', '/ghost/#/tags/new');
    }  
    
    setForm (titulo){
        console.log("entro a llenar el formulario");
        cy.url().should('include', '/ghost/#/tags/new');
        //cy.scrollTo('top');

        var inpu =cy.get('input[name="name"]', { timeout: 10000 }) // espera hasta 10 segundos
        //console.log(inpu);
        if(inpu.should('exist')){
            inpu.type("jsadjfasklfjñklasjfklñjafkljkldfasjkl");
            console.log("llego");
        }
        //cy.get('#tag-name').should('exist').click();
        //cy.get('input[name="name"]').type('Texto a escribir').should('have.value', 'Texto a escribir');
        
        cy.get('input[data-test-input="tag-slug"]').should('exist');
        
    }  

    

}

export default Tag;