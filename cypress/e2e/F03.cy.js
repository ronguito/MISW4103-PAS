import Webpage from './src/webpage';
import Post from './src/post'
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F03: Crear y gestionar Publicaciones (posts) ', () => {
	
    const wp = new Webpage();
    const post = new Post();

    beforeEach(() => {
      //Give:
      wp.visit(config.UrlLogin);
      wp.login(config.UserName, config.UserPass);
    });
    
    it('F03E01: Crear un nuevo post en estado de borrador', () => {
		  
      const title = faker.hacker.phrase();

      //Give:
      wp.visit(config.UrlPost);
      
      //When
      post.create();
      post.setTitle(title);
      post.saveDraff();
      
      //then
      post.validateStatus('Draft', title);

    });
    
    it('F03E02: Publicar un post', () => {
      //Give
      wp.visit(config.UrlPost);
      
      post.selectFirst('Draft').then(title => {
        // When
        post.publish();

        // Then
        post.validateStatus('Published', title);
        post.validatePublished(config.UrlPublic, title);
      });

    });
    
    it('F03E03: Modificar un post publicado', () => {
      const newTitle = faker.hacker.phrase();
      //Give
      wp.visit(config.UrlPost);

      post.selectFirst('Published').then(title => {
        // When
        post.setTitle(newTitle);
        post.savePublish();

        // Then
        post.validateStatus('Published', newTitle);
        post.validatePublished(config.UrlPublic, newTitle);
      });
	
    });
    

    it('F03E04: Eliminar un post publicado', () => {
      //Give
      wp.visit(config.UrlPost);

      post.selectFirst('Published').then(title => {
        
        // When
        post.delete();

        // Then
        post.validateList(title);
        post.validatePublished(config.UrlPublic, title, false);
      });

    });

});
