import Webpage from './src/webpage';
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');
const f01e01 = require('./data/f01e01.json');

describe('F01: Configurar opciones generales del sitio ', () => {
    
    const wp = new Webpage();

    beforeEach(() => {
        //Given
        wp.setHost(config.Host, config.Port)
        wp.visit(config.UrlLogin);
        wp.login(config.UserName, config.UserPass);
    });
    
    it('Suit F01E01: Configurar el título del sitio', () => {
		

        f01e01.forEach((scenario) => {

            cy.log(`Escenario: ${scenario.description}; Estrategia: ${scenario.strategy}, Datos - ${scenario.data}`);

            let title = scenario.data;
            if(scenario.strategy=="random"){
                const partes = scenario.data.split('.'); // Dividir en ['string', 'alphanumeric']
                title = faker[partes[0]][partes[1]](); 
            }else if(scenario.strategy=="pool"){
                const indice = Math.floor(Math.random() * scenario.data.length);
                title = scenario.data[indice];
            }

            //Given
            wp.visit("/ghost/#/dashboard");
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
        
    });
    /*
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
    
    it('F02E01: Crear un nuevo member', () => {
		  
        const name = faker.person.fullName();
        const email = faker.internet.email();
  
        //Given
        wp.visit(config.UrlMember);
        
        //When
        member.create();
        member.setName(name);
        member.setEmail(email);
        wp.clickOnButton("Save");
        wp.visit(config.UrlMember);
        
        //Then
        member.verifyMemberEmail(email);
  
      });  
      
      it('F03E01: Crear un nuevo post en estado de borrador', () => {
		  
        const title = faker.hacker.phrase();
  
        //Given
        wp.visit(config.UrlPost);
        
        //When
        post.create();
        post.setTitle(title);
        post.save();
        
        //Then
        wp.visit(config.UrlPost);
        post.verifyStatus('Draft', title);
  
      });

      it('F04E01: Crear un nueva pagina en estado de borrador', () => {
		  
        const title = faker.hacker.phrase();
  
        //Given
        wp.visit(config.UrlPage);
        
        //When
        page.create();
        page.setTitle(title);
        page.save();
        
        //then
        page.verifyStatus('Draft', title);
  
      });


      it('F05E01: Crear un nuevo tag', () => {
		  
        const nameTag = faker.hacker.verb();
  
        //Give:
        wps.visit(config.UrlTag);
        
        //When
        tag.create();
        tag.setName(nameTag);
        wps.clickOnButton("Save");
        
        //then
        wps.visit(config.UrlTag);
        tag.verifyTag(nameTag);
  
      });
      */
    
});
