import Webpage from './src/webpage';
import Post from './src/post'
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F03: Crear y gestionar Publicaciones (posts) ', () => {
	
    const wp = new Webpage();
    const post = new Post();

    beforeEach(() => {
      //Given
      wp.visit(config.UrlLogin);
      wp.login(config.UserName, config.UserPass);
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
      post.verifyStatus('Draft', title);

    });
    
    it('F03E02: Publicar un post', () => {
      //Given
      wp.visit(config.UrlPost);
      
      post.selectFirst('Draft').then(title => {
        //When
        post.publish();

        //Then
        post.verifyStatus('Published', title);
        wp.visit(config.UrlPublic);
        wp.shouldContain(title);

      });

    });
    
    it('F03E03: Modificar un post publicado', () => {
      const newTitle = faker.hacker.phrase();
      //Given
      wp.visit(config.UrlPost);

      post.selectFirst('Published').then(title => {
        //When
        post.setTitle(newTitle);
        post.update();

        //Then
        post.verifyStatus('Published', newTitle);
        wp.visit(config.UrlPublic);
        wp.shouldContain(newTitle);
        wp.shouldNotContain(title);
        
      });
	
    });

    it('F03E04: Eliminar un post publicado', () => {
      //Given
      wp.visit(config.UrlPost);

      post.selectFirst('Published').then(title => {
        
        //When
        post.delete();

        //Then
        wp.visit(config.UrlPublic);
        wp.shouldNotContain(title);
        
      });
    });

});
