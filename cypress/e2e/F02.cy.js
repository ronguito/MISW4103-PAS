import Webpage from './src/webpage';
import Member from './src/member';
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F02: Crear y gestionar members ', () => {
	
    const wp = new Webpage();
    const member = new Member();

    beforeEach(() => {
      
      wp.setHost(config.Host, config.Port)
      member.Port = config.Port;
      //Given
      wp.visit(config.UrlLogin);
      wp.login(config.UserName, config.UserPass);

    });
    
    it('F03E01: Crear un nuevo member', () => {
		  
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
    
    it('F02E02: Intentar ingresar un correo existente', () => {
      const name1 = faker.person.fullName();
      const name2 = faker.person.fullName();
      const email = faker.internet.email();

      //Given
      wp.visit(config.UrlMember);
      
      //When
      member.create();
      member.setName(name1);
      member.setEmail(email);
      wp.clickOnButton("Save");
      wp.visit(config.UrlMember);
      member.create();
      member.setName(name2);
      member.setEmail(email);
      wp.clickOnButton("Save");
      
      //Then
      let msg = "Member already exists. Attempting to add member with existing email address"
      member.verifyErrorMessage(msg);

    });
    
    it('F02E03: Editar un member', () => {
      const name1 = faker.person.fullName();
      const email1 = faker.internet.email();

      //Given
      wp.visit(config.UrlMember);
      
      //When
      member.editFirstMember();
      member.setName(name1);
      member.setEmail(email1);
      wp.clickOnButton("Save");
      
      //Then
      wp.visit(config.UrlMember);
      member.verifyMemberName(name1);
	
    });
    
    it('F02E04: Editar un member con email duplicado', () => {
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
      member.editLastMember();
      member.setEmail(email);
      wp.clickOnButton("Save");

      //Then
      let msg = "Attempting to add member with existing email address"
      member.verifyErrorMessage(msg);

    });

});
