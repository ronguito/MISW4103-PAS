import Webpage from './src/webpage';
import { beforeEach } from 'mocha';
import Tag from './src/tag';
import Post from './src/post';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F05: Gestionar Etiquetas (tags) de contenido ', () => {
	
    const wps = new Webpage();
    const tag = new Tag();
    const post = new Post();

    beforeEach(() => {
      wps.setHost(config.Host, config.Port)
      tag.Port = config.Port;
      post.Port = config.Port;
      //Give:
      wps.visit(config.UrlLogin);
      wps.login(config.UserName, config.UserPass);
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
    
    it('F05E02: Editar un tag', () => {
      const nameTag2 = faker.hacker.verb();
      
      //Given
      wps.visit(config.UrlTag);

      //When
      tag.editFirstTag();
      tag.setName(nameTag2);
      wps.clickOnButton("Save");

      //then
      wps.visit(config.UrlTag);
      tag.verifyTag(nameTag2);

    });
    

    it('F05E03: Asignar un tag a un post', () => {
      //Given 
      wps.visit(config.UrlTag);
      tag.editFirstTag();
      
      tag.getName().then(name => {
        tag.getUrl().then(url => {
          
          wps.visit(config.UrlPost);
          post.selectFirst('Published').then(title => {
          
            //When
            post.setTag(name);
            post.update();
            
            //Then
            const urlPage = `${config.UrlPublic}/tag/${url}/`
            wps.visit(urlPage);
            wps.shouldContain(title);
            
          });
        });
      });
    });
   
    
    it('F05E04: Eliminar un tag', () => {
      const nameTag3 = faker.hacker.verb();
      //Given
      wps.visit(config.UrlTag);

      //When
      wps.visit(config.UrlTag);
      tag.editFirstTag();
      tag.deleteTag();
      tag.confirmDeleteTag();
      //then
      wps.visit(config.UrlTag);
      tag.verifyTagDelete(nameTag3);

    });
    

});
    