import Webpage from './src/webpage';
import Post from './src/post';
import Member from './src/member';
import Page from './src/page';
import Tag from './src/tag';

import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');
const f05e01 = require('./data/f05e01.json');

describe('Suit de Escenarios: Prueba de diferentes escenarios de inyeccion de datos ', () => {
    
    const wp = new Webpage();
    const tag = new Tag();

    beforeEach(() => {
        //Given
        wp.setHost(config.Host, config.Port)
        wp.visit(config.UrlLogin);
        wp.login(config.UserName, config.UserPass);
    });


      it('Suit F05E01: Crear un nuevo tag', () => {
		  
        const nameTag1 = faker.hacker.verb();
        f05e01.forEach((scenario) => {

            cy.log(`Escenario: ${scenario.description}; Estrategia: ${scenario.strategy}, Datos - ${scenario.data}`);

            let nameTag = scenario.data;
            if(scenario.strategy=="random"){
                const partes = scenario.data.split('.'); // Dividir en ['string', 'alphanumeric']
                nameTag = faker[partes[0]][partes[1]](); 
            }else if(scenario.strategy=="pool"){
                const indice = Math.floor(Math.random() * scenario.data.length);
                nameTag = scenario.data[indice];
            } 

            //Give:
            wp.visit(config.UrlTag);
            
            //When
            tag.create();
            tag.setName(nameTag);
            wp.clickOnButton("Save");
            
            //then
            wp.visit(config.UrlTag);
            tag.verifyTag(nameTag);

            
        });
      });
    
});
