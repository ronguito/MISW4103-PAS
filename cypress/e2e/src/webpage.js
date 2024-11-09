class Webpage {

    visit (host){
        cy.visit(host);
    }

    login (username, password){
        cy.get('input[name="identification"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/ghost/#/dashboard');
    }

    openSiteSetting(){
        cy.get('a[data-test-nav="settings"]').first().click();
        cy.url().should('include', '/ghost/#/settings');     
    }

    closeSiteSetting(){
        cy.get('button[data-testid="exit-settings"]').first().click();
        cy.url().should('include', '/ghost/#/dashboard');     
    }

    clickEditSection(title){
        cy.get(`div[data-testid="${title}"]`).find('button').click();        
    }

    setPageTitle(text){
        cy.get('input[placeholder="Site title"]').clear().type(text);
    }

    setPageDescription(text){
        cy.get('input[placeholder="Site description"]').clear().type(text);
    }

    clickOnButton(accion)
    {
        cy.get('button').then((buttons) => {
            let matched = null;
        
            // Iterar sobre los botones para encontrar el que contiene "Save"
            buttons.each((index, button) => {
                if (button.innerText.includes(accion)) {
                    matched = button;
                    return false; // Rompe el ciclo each de Cypress
                }
            });
        
            // Lanzar un error si no se encuentra el botón
            if (!matched) {
                throw new Error(`No se encontró un botón para ${accion}`);
            }
        
            // Hacer clic en el botón encontrado
            cy.wrap(matched).click();
            cy.wrap(matched).should('not.exist');
            
        });
    }

    clickOnPanel(name){
        cy.get(`button[title="${name}"]`).click();
    }

    clickOnPickColor(){
        cy.get(`button[aria-label="Pick color"]`).click();
    }

    setColor(color){
        cy.get('input[aria-label="Color value"]').clear().type(text);
    }

    shouldContain(text){
        cy.get('body').then((container) => {
            const containerText = container.text();
            expect(containerText).to.include(text);
        });
    }

    shouldContainColor(color){
        cy.document().then((doc) => {
            const headContent = doc.documentElement.innerHTML;
            const colorh = `#${color}`;
            expect(headContent).to.include(color, `El head debe contener el color ${colorh}`);
        });
    }
}

export default Webpage;