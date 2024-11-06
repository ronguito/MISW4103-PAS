describe('Pruebas a la aplicacion Ghost', () => {
	
    beforeEach(() => {
        // Visitar la página de inicio de sesión de Ghost
        cy.visit('http://localhost:2368/ghost/#/signin');

        // Give: Iniciar sesión (reemplaza 'tu_correo' y 'tu_contraseña' con credenciales válidas)
        cy.get('input[name="identification"]').type('admin@redfox.com.co');
        
        //when:
        cy.get('input[name="password"]').type('Admin123+');
        cy.get('button[type="submit"]').click();
        

        // Esperar a que la página principal de Ghost se cargue
        cy.url().should('include', '/ghost/#/dashboard');
    });
    

    it('01-Debería crear un nuevo post', () => {
        // Navegar al editor de publicaciones
        cy.get('a[href="#/editor/post/"]').click();
        cy.url().should('include', '/ghost/#/editor/post');// Esperar a que el editor de publicaciones se cargue

        // Completar el formulario del nuevo post
        cy.get('textarea[placeholder="Post title"]').type('Post Generado con Cypress');
		cy.get('a[data-test-link="posts"]').click();
		
    });
    
    it('02-Debería eliminar el primer post', () => {
        // Navegar a la lista de publicaciones
        cy.visit('http://localhost:2368/ghost/#/posts');
        cy.url().should('include', '/ghost/#/posts');// Esperar a que la lista de publicaciones se cargue
        
        cy.get('a.gh-post-list-title').first().click(); // Seleccionar el primer post
        cy.url().should('match', /\/ghost\/#\/editor\/post\/.+/);// Esperar a que se abra el post

        cy.get('button[title="Settings"]').click();// Abrir el menú de opciones del post
        cy.get('button[data-test-button="delete-post"]').click();// Confirmar la eliminación
        cy.get('button[data-test-button="delete-post-confirm"]').click(); // Confirmar la eliminación

    });
    
    
});
