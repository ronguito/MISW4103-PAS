const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require("@faker-js/faker");

function generarColorAleatorio() {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `${r}${g}${b}`;
}


//////////////////// F01 configuracion general ///////////////////////////////
var pageTitle = '';
var pageDescription = '';
var pageColor = '';

//esribe el correo en la caja de texto de login
When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});

//escribe la contraseña en la caja de texto
When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

// da clic en el boton iniciar sesion
When('I click on signin', async function() {
	let element = await this.driver.$('[data-test-button="sign-in"]');
    return await element.click();
})

//abre la pagina de configuracion
When('I open setting site', async function () {
    let element = await this.driver.$('a[data-test-nav="settings"]');
    return await element.click();
});

//cierra la ventana de configuracion
When('I close setting site', async function () {
    let element = await this.driver.$('button[data-testid="exit-settings"]');
    return await element.click();
});

//da clic sobre el boton edit de una seccion de la configuracion
When('I click on button edit in {string}', async function (seccion) {
    let element = await this.driver.$('div[data-testid="'+seccion+'"]');
    let button = await element.$('button');
    return await button.click();
});

//dar clic sobre una ficha del diseño Brand o Page wide
When('I click on button design {string}', async function (seccion) {
    let element = await this.driver.$('button[title="'+seccion+'"]');
    return await element.click();
});

//da clic sobe pick del color para el fondo
When('I click on button pick color', async function () {
    let element = await this.driver.$('button[aria-label="Pick color"]');
    return await element.click();
});

//agrega un color aletorio en la caja de color
When('I enter color', async function () {
    let element = await this.driver.$('input[aria-label="Color value"]');
    pageColor = generarColorAleatorio();
    return await element.setValue(pageColor);
});

//da clic sobre un boton para guardar, que contenga la palabra save
When('I click on button save', async function() {
    const buttons = await this.driver.$$('button');
    let matched = null;
    for (const button of buttons) {
        const text = await button.getText();
        if (text.includes('Save')) {
            matched = button;
            break;
        }
    }
    if (!matched) { throw new Error(`No se encontró un para guardar`);  }
    return await matched.click(); 
});

//da clic sobre un boton para cerrar que contenga el texto Close
When('I click on button close', async function () {
    const buttons = await this.driver.$$('button');
    let matched = null;
    for (const button of buttons) {
        const text = await button.getText();
        if (text.includes('Close')) {
            matched = button;
            break;
        }
    }
    if (!matched) { throw new Error(`No se encontró un para cerrar`);  }
    return await matched.click(); 
});

//escribe un titulo para el sitio
When('I enter title site {string}', async function (text) {
    if(text=='random'){
        text = faker.company.name();
    }
    pageTitle = text;
    let element = await this.driver.$('input[placeholder="Site title"]');
    return await element.setValue(text);
});

//escribe una descripcion para el sitio
When('I enter description site {string}', async function (text) {
    if(text=='random'){
        text = faker.company.buzzPhrase();
    }
    pageDescription = text;
    let element = await this.driver.$('input[placeholder="Site description"]');
    return await element.setValue(text);
});

// la pagina deberia contener el texto pasado como parametro
Then('The main page should contain {string}', async function (text) {
    if(text=="postTitle"){ text = postTitle;  }
    else if(text=="pageDescription"){ text = pageDescription;  }
    else if(text=="pageTitle"){ text = pageTitle;  }
    const container = await this.driver.$('body');
    const containerText = await container.getText();
    return await containerText.includes(text);
});

// la pagina no deberia contener el texto pasado como parametro
Then('The main page should not contain {string}', async function (text) {
    if(text=="postTitle"){ text = postTitle;  }
    else if(text=="pageDescription"){ text = pageDescription;  }
    else if(text=="pageTitle"){ text = pageTitle;  }
    const container = await this.driver.$('body');
    const containerText = await container.getText();
    return await !containerText.includes(text);
});

// deberia contener el color suministrado
Then('The head should contain color', async function () {
    const headContent = await this.driver.getPageSource();
    color = "#" + pageColor;
    if (!headContent.includes(color)) {
        throw new Error(`El head no contiene el color ${color}`);
    }
});


//////////////////// F02 Crear y gestionar Suscripciones y miembros  ///////////////////////////////
currentMemberName = '';

// entra el nombre completo del suscriptor
When('I enter member full name {string}', async function (name) {
    if(name=='random'){
        name = faker.name.findName();
    }
    currentMemberName = name;
    let element = await this.driver.$('input[id="member-name"]',{ timeout: 5000 });
    return await element.setValue(name);
});

// entra el correo del suscriptor
When('I enter member email {string}', async function (email) {
    if(email=='random'){
        email = faker.internet.email();
    } else if (email === 'current') {
        email = currentMemberEmail;
    }
    currentMemberEmail = email;
    let element = await this.driver.$('input[id="member-email"]');
    return await element.setValue(email);
});

// clic en el boton nuevo miembro
When('I click on new member', async function () {
    let element = await this.driver.$('a[href="#/members/new/"]');
    return await element.click();
});

// da clic en el boton guardar miembro
When('I click on save member', async function () {
    let element = await this.driver.$('button[data-test-button="save"]');
    return await element.click();
});

// da clic en el primer elemento de miembros
When('I click on first member', async function () {
    const memberLinks = await this.driver.$$('a.gh-list-data',{ timeout: 5000 });
    const memberfirstLink = memberLinks[0]
    return await memberfirstLink.click();
});

// veerifica que el nuevo suscriptor existe por el correo
Then('I verify new member on list for email {string}', async function (email) {
    
    if(email=="current"){
        email = currentMemberEmail;
    }
    
    const memberNames = await this.driver.$$('h3.gh-members-list-name');
    const memberEmails = await this.driver.$$('p.gh-members-list-email', { timeout: 5000 });
    if (memberEmails.length === 0) {
        throw new Error('No se encontraron elementos con el selector p.gh-members-list-email');
    }
    
    let matchedMember = null;
    for (const memberEmail of memberEmails) {
        const text = await memberEmail.getText(); // Obtener texto del memberEmail
        if (text.includes(email)) {
            matchedMember = memberEmail; // Si coincide, guardar el elemento
            break; // Salir del bucle
        }
    }

    // Validar que se encontró un member que coincida
    if (!matchedMember) {
        throw new Error(`No se encontró un miembro con el correo "${email}".`);
    }

    // Corregido: Obtener texto directamente del elemento matchedMember
    const read = await matchedMember.getText();
    const trimmedText = read.trim().replace(/\n+/g, ' ').trim();

    // Validar si el texto incluye el email
    if (!trimmedText.includes(email)) {
        throw new Error(`El texto encontrado no incluye el correo: "${email}".`);
    }

    return true;

});

// verifica que existe un error al crear el suscriptor
Then('I verify it exists an error message', async function () {
    const container = await this.driver.$('p.response');
    const containerText = await container.getText();
    const msg = "Member already exists. Attempting to add member with existing email address"
    return await containerText.includes(msg);
});

Then('I verify edited member {string}', async function (name) {
    if (name="current") {
        name = currentMemberName;
    }
    let element = await this.driver.$$('h3.gh-members-list-name');
    // console.log("Imprimiendo elementos con clase gh-members-list-name: ", element)
    return await element.includes(name);
  });



//////////////////// F03 Crear y gestionar Publicaciones (posts) //////////////////////////////
var postTitle = '';

//ingresa el titulo del post
When('I enter title post {string}', async function (text) {
    if(text=='random'){
        text = faker.hacker.phrase();
    }
    postTitle = text;
    let element = await this.driver.$('textarea[placeholder="Post title"]');
    return await element.setValue(text);
});

//da clic en el boton nuevo post
When('I click on new post', async function () {
    let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
});

//da click en el boton regresar de la pagina de edicion de post
When('I click on save post', async function () {
    let element = await this.driver.$('a[data-test-link="posts"]');
    return await element.click();
});

// da clic en el boton publicar
When('I click on button publish', async function () {
    let element = await this.driver.$('button[data-test-button="publish-flow"');
    return await element.click();
});

// da clic en el boton continuar de la ventana publicar
When('I click on button continue', async function () {
    let element = await this.driver.$('button[data-test-button="continue"');
    return  await element.click();
});

// da clic en el boton confirmar de la ventana publicar
When('I click on button confirm', async function () {
    let element = await this.driver.$('button[data-test-button="confirm-publish"');
    return await element.click();
});

// da clic en el boton actualiar de la pagina de edicion de post
When('I click on button update', async function () {
    let element = await this.driver.$('button[data-test-button="publish-save"');
    return await element.click();
});

//cierra la ventana de publicacion
When('I click on close publish', async function () {
    let element = await this.driver.$('button[data-test-button="close-publish-flow"');
    return await element.click();
});

// abre la ventana de configuracion para los post
When('I open setting post', async function () {
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

// da clic sobre el primer post que coincida con estado suministrado
When('I select first post {string}', async function (status) {
    
    const posts = await this.driver.$$('a.gh-post-list-title');
    let matchedPost = null;

    for (const post of posts) {
        const text = await post.getText(); // Obtener texto del post
        if (text.includes(status)) {
            matchedPost = post; // Si coincide, guardar el elemento
            break; 
        }
    }

    // Validar que se encontró un post que coincide
    if (!matchedPost) {
        throw new Error(`No se encontró un post con el estado "${status}".`);
    }

    const read = await matchedPost.$('h3').getText();
    const trimmedText = read.trim().replace(/\n+/g, ' ').trim();
    postTitle = trimmedText;
    return await matchedPost.click(); 

});

//da clic sobre el boton eliminar post
When('I click on button delete post', async function () {
    let element = await this.driver.$('button[data-test-button="delete-post"');
    return await element.click();
});

// da clic sobre el boton confirmar eliminacion
When('I click on button delete post confirm', async function () {
    let element = await this.driver.$('button[data-test-button="delete-post-confirm"');
    return await element.click();
});

// Verifica que el primer post coincidente con el estado tiene el titulo pasado
Then('The status for post {string} should be {string}', async function (title, status) {
    
    if(title=="postTitle"){
        title = postTitle;
    }
    
    const posts = await this.driver.$$('a.gh-post-list-title');
    
    let matchedPost = null;
    for (const post of posts) {
        const text = await post.getText(); // Obtener texto del post
        if (text.includes(status)) {
            matchedPost = post; // Si coincide, guardar el elemento
            break; // Salir del bucle
        }
    }

    // Validar que se encontró un post que coincide
    if (!matchedPost) {
        throw new Error(`No se encontró un post con el estado "${status}".`);
    }

    const read = await matchedPost.$('h3').getText();
    const trimmedText = read.trim().replace(/\n+/g, ' ').trim();
    return await trimmedText.includes(title); 

});
