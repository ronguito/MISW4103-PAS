import Webpage from './src/webpage';
import { beforeEach } from 'mocha';
import Tag from './src/tag';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F05: Gestionar Etiquetas (tags) de contenido ', () => {
	
    const wps = new Webpage();
    const tag = new Tag();

    beforeEach(() => {
      //Give:
      wps.visit(config.UrlLogin);
      wps.login(config.UserName, config.UserPass);
    });
    
    it('F05E01: Crear un nuevo tag en estado de borrador', () => {
		  
      const titleTag = faker.hacker.phrase();

      //Give:
      wps.visit(config.UrlTag);
      
      //When

      tag.createTag();
      tag.setForm(titleTag);
      
      //then
      //tag.validateStatus('Draft', title);

    });   
    

});


/*describe('Pruebas de tag en la aplicacion Ghost', () => {
	
  beforeEach(() => {
      // Visitar la página de inicio de sesión de Ghost
      cy.visit('http://localhost:2368/ghost/#/signin');

      // Give: Iniciar sesión (reemplaza 'tu_correo' y 'tu_contraseña' con credenciales válidas)
      cy.get('input[name="identification"]').type('s.gelvezg@uniandes.edu.co');
      
      //when:
      cy.get('input[name="password"]').type('Seangego.01');
      cy.get('button[type="submit"]').click();
      

      // Esperar a que la página principal de Ghost se cargue
      cy.url().should('include', '/ghost/#/dashboard');
  });   
  
  it('01-Debería crear un nuevo tag', () => {
      // Navegar al editor de publicaciones
      cy.get('a[href="#/tags/"]').click();

      cy.url().should('include', '/ghost/#/tags');

      cy.get('a[href="#/tags/new/"]').click();  

      cy.url().should('include', '/ghost/#/tags/new');

      cy.get('input[name="name"]').type('nombre de tag prueba');
      
  });   
});
*/