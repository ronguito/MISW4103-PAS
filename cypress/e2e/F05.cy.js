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
    
    it('F05E01: Crear un nuevo tag', () => {
		  
      const nameTag = faker.hacker.phrase();

      //Give:
      wps.visit(config.UrlTag);
      
      //When

      tag.selectTag();
      tag.setNameTag(nameTag);
      tag.saveTag();
      
      
      //then
      wps.visit(config.UrlTag);
      tag.verifyTag(nameTag);

    });   
    
    it('F05E03: Editar un tag', () => {
      const nameTag2 = faker.hacker.phrase();
      //Given
      wps.visit(config.UrlPost);

      //When
      tag.selectTag();
      tag.editFirstTag();
      tag.setNameTag(nameTag2);
      tag.saveTag();

      //then
      wps.visit(config.UrlTag);
      tag.verifyTag(nameTag2);
    });

    it('F05E04: Eliminar un tag', () => {
      const nameTag3 = faker.hacker.phrase();
      //Given
      wps.visit(config.UrlPost);

      //When
      tag.selectTag();
      tag.setNameTag(nameTag3);
      tag.saveTag();
      wps.visit(config.UrlPost);
      tag.editFirstTag();
      tag.deleteTag();
      tag.confirmDeleteTag();
      //then

      tag.verifyTagDelete(nameTag3);
    });

});
    