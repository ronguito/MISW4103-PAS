import Webpage from './src/webpage';
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');

describe('F01: Configurar opciones generales del sitio ', () => {
    
    const wp = new Webpage();

    beforeEach(() => {
        //Given
        wp.setHost(config.Host, config.Port)
        wp.visit(config.UrlLogin);
        wp.login(config.UserName, config.UserPass);
    });
    
    it('F01E01: Configurar el título del sitio', () => {
		
        const title = faker.company.name();
        //Given
        wp.openSiteSetting();
        
        //When
        wp.clickCategory("general")
        wp.clickEditSection("Title & description");
        wp.setPageTitle(title);
        wp.clickOnButton("Save");
        
        //Then
        wp.visit(config.UrlPublic);
        wp.shouldContain(title);
        
    });
    
    it('F01E02: Configurar la descripción del sitio', () => {
        const text = faker.company.buzzPhrase();
        //Given
        wp.openSiteSetting();
        
        //When
        wp.clickCategory("general")
        wp.clickEditSection("Title & description");
        wp.setPageDescription(text);
        wp.clickOnButton("Save");
   
        //Then
        wp.visit(config.UrlPublic);
        wp.shouldContain(text);		
	
    });
    
    it('F01E03: Cambiar el color de los botones', () => {
		const color = wp.randomColor();
        //Given
        wp.openSiteSetting();
        
        //When
        if(config.Port==2368){
            wp.clickEditSection("Design & branding");
            wp.clickOnPanel("Brand");
        }else{
            wp.clickOnButton("Branding");
        }
        wp.setColor(color);
        wp.clickOnButton("Save");
        if(config.Port==2368){
            wp.clickOnButton("Close")
        }
        
        //Then
        wp.visit(config.UrlPublic);
        wp.shouldContainColor(color);	
	
    });
    
    it('F01E04: Cambiar el color de fondo de la pagina', () => {
		const color = wp.randomColor();
        //Given
        wp.openSiteSetting();
        
        //When
        if(config.Port==2368){
            wp.clickEditSection("Design & branding");
            wp.clickOnPanel("Site wide");
            wp.clickOnPickColor();
            wp.setColor(color);
        }else{
            wp.clickOnButton("Branding");
        }
       
        wp.clickOnButton("Save");
        if(config.Port==2368){
            wp.clickOnButton("Close")
        }

        //Then
        wp.visit(config.UrlPublic);
        if(config.Port==2368){
            wp.shouldContainColor(color);
        }	
	
    });
    
});
