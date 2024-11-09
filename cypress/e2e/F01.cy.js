import Webpage from './src/webpage';
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');

describe('F01: Configurar opciones generales del sitio ', () => {
    
    const wp = new Webpage();

    beforeEach(() => {
        //Give:
        wp.visit(config.UrlLogin);
        wp.login(config.UserName, config.UserPass);
    });
    
    it('F01E01: Configurar el título del sitio', () => {
		
        const title = faker.company.name();
        //Give:
        wp.openSiteSetting();
        
        //When
        wp.clickEditSection("title-and-description");
        wp.setPageTitle(title);
        wp.clickOnButton("Save");
        wp.closeSiteSetting();
        
        //then
        wp.visit(config.UrlPublic);
        wp.shouldContain(title);
        
    });
    /*
    it('F01E02: Configurar la descripción del sitio', () => {
        const title = faker.company.name();
        //Give:
        wp.openSiteSetting();
        
        //When
        wp.clickEditSection("title-and-description");
        wp.setPageTitle(title);
        wp.clickOnButton("Save");
        wp.closeSiteSetting();
        
        //then
        wp.visit(config.UrlPublic);
        wp.shouldContain(title);		
	
    });
    
    it('F01E03: Cambiar el color de los botones', () => {
		
	
    });
 
    it('F01E04: Cambiar el color de fondo de la pagina', () => {
		
	
    });
    */
});
