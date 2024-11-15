import Webpage from './src/webpage';
import Page from './src/page'
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F04: Crear y gestionar Paginas', () => {
	
    const wp = new Webpage();
    const page = new Page();

    beforeEach(() => {
      page.Port = config.Port;
      wp.setHost(config.Host, config.Port)
      //Given
      wp.visit(config.UrlLogin);
      wp.login(config.UserName, config.UserPass);
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
    
    it('F04E02: Publicar una pagina', () => {
      //Given
      wp.visit(config.UrlPage);
      
      page.selectFirst('Draft').then(title => {
        //When
        page.getUrl().then(url => {
          page.publish();
          
          //Then
          wp.visit(config.UrlPage);
          page.verifyStatus('Published', title);
          const urlPage = `${config.UrlPublic}/${url}`;
          wp.visit(urlPage);
          wp.shouldContain(title);

        });
      });

    });
    
    it('F04E03: Modificar url de una pagina publicada', () => {
      //Given 
      wp.visit(config.UrlPage);
      
      page.selectFirst('Published').then(title => {
        //When
        page.getUrl().then(url => {
          const oldUrlPage = `${config.UrlPublic}/${url}`;
          url = faker.word.adjective();
          page.setUrl(url);
          const newUrlPage =  `${config.UrlPublic}/${url}`; 
          page.save();
          
          //Then
          wp.visit(config.UrlPage);
          page.verifyStatus('Published', title);
          
          wp.visit(oldUrlPage);
          wp.shouldContain("Page not found");
          wp.visit(newUrlPage);
          wp.shouldContain(title);

        });
      });
	
    });
    
    it('F04E04: Eliminar una pagina publicada', () => {
      //Given
      wp.visit(config.UrlPage);

      page.selectFirst('Published').then(title => {
        //When
        page.getUrl().then(url => {
          page.delete();
          
          //Then
          const urlPage = `${config.UrlPublic}/${url}`;
          wp.visit(urlPage);
          wp.shouldContain('Page not found');

        });
      });
    });
    
});
