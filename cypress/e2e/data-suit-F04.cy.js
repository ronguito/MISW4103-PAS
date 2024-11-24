import Webpage from './src/webpage';
import Page from './src/page';

import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');
const config = Cypress.env('config');
const f04e01 = require('./data/f04e01.json');

describe('Suit de Escenarios: Prueba de diferentes escenarios de inyeccion de datos ', () => {
    
    const wp = new Webpage();   
    const page = new Page();

    beforeEach(() => {
        //Given
        wp.setHost(config.Host, config.Port)
        wp.visit(config.UrlLogin);
        wp.login(config.UserName, config.UserPass);
    });
    
      it('Suit F04E01: Crear un nueva pagina en estado de borrador', () => {
		
        f04e01.forEach((scenario) => {

            cy.log(`Escenario: ${scenario.description}; Estrategia: ${scenario.strategy}, Datos - ${scenario.data}`);

            let title = scenario.data;
            if(scenario.strategy=="random"){
                const partes = scenario.data.split('.'); // Dividir en ['string', 'alphanumeric']
                title = faker[partes[0]][partes[1]]();
                title = title.toString();
            }else if(scenario.strategy=="pool"){
                const indice = Math.floor(Math.random() * scenario.data.length);
                title = scenario.data[indice];
            }
            //Given
            wp.visit(config.UrlPage);
            
            //When
            page.create();
            page.setTitle(title);
            page.save();
            
            //then
            page.verifyStatus('Draft', title);
            
            page.selectFirst('Draft').then(title => {
                //When
                page.getUrl().then(url => {
                    page.deleteLastPage();        
                });
            });
            
        });
      });

});
