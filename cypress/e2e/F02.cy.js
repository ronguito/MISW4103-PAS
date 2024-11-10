import Webpage from './src/webpage';
import Member from './src/member';
import { beforeEach } from 'mocha';

const { faker } = require('@faker-js/faker');

const config = Cypress.env('config');


describe('F02: Crear y gestionar members ', () => {
	
    const wp = new Webpage();
    const member = new Member();

    beforeEach(() => {
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
      member.save();
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
      member.save();
      wp.visit(config.UrlMember);
      member.create();
      member.setName(name2);
      member.setEmail(email);
      
      //Then
      let msg = "Member already exists. Attempting to add member with existing email address"
      member.verifyErrorMessage(msg);

    });
    
    it('F02E03: Editar un member', () => {
      const name1 = faker.person.fullName();
      const email1 = faker.internet.email();
      const name2 = faker.person.fullName();
      const email2 = faker.internet.email();

      //Given
      wp.visit(config.UrlMember);
      
      //When
      // Crear primer member
      member.create();
      member.setName(name1);
      member.setEmail(email1);
      member.save();
      wp.visit(config.UrlMember);
      // Crear segundo member
      member.create();
      member.setName(name2);
      member.setEmail(email2);
      member.save();

      // Editar segundo member
      member.editFirstMember();
      member.setEmail(email1);
      member.save();
      
      //Then
      member.verifyMemberName(name);
	
    });

    it('F02E04: Editar un member con email duplicado', () => {
      const name = faker.person.fullName();
      const email = faker.internet.email();

      //Given
      wp.visit(config.UrlMember);
      
      //When
      member.editFirstMember();
      member.setName(name);
      member.save();
      wp.visit(config.UrlMember);
      
      //Then
      let msg = "Member already exists. Attempting to add member with existing email address"
      member.verifyErrorMessage(msg);
    });

});
