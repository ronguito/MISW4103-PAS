const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require("@faker-js/faker");

function generarColorAleatorio() {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `${r}${g}${b}`;
}

//visita la url publica de la pagina
Port = 2368;
Host = 'localhost'

Given('I navigate to page {kraken-string} {kraken-string} {kraken-string}',async function (host, port, url) {
    if(url=="old") { url = oldUrl;}
    if(url=="new") { url = newUrl;}
    if(url=="tag") { url = currenttagUrl;}
    urlPage = host + ":" + port +  url
    Port = port;
    Host = host;
    await this.driver.executeScript('window.location.href = arguments[0];', [urlPage]);
});


//////////////////// F01 configuracion general ///////////////////////////////
var pageTitle = '';
var pageDescription = '';
var pageColor = '';
var existsMember = false;

//esribe el correo en la caja de texto de login
When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('input[name="identification"]');
    return await element.setValue(email);
});

//escribe la contraseña en la caja de texto
When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('input[name="password"]');
    return await element.setValue(password);
});

// da clic en el boton iniciar sesion
When('I click on signin', async function() {
	let element = await this.driver.$('[type="submit"]');
    return await element.click();
})

//abre la pagina de configuracion
When('I open setting site', async function () {
    let element = await this.driver.$('a[href="#/settings/"]');
    return await element.click();
});

//cierra la ventana de configuracion
When('I close setting site', async function () {
    if(Port!=2345){
        let element = await this.driver.$('button[data-testid="exit-settings"]');
        return await element.click();
    }
});

When('I click on category {string}', async function (category) {
    if(Port==2345){
        let element = await this.driver.$(`a[href="#/settings/${category}/"]`);
        return await element.click();
    }
});

//da clic sobre el boton edit de una seccion de la configuracion
When('I click on button edit section {string}', async function (title) {

    const eName = Port == '2345' ? 'div.gh-expandable-block' : 'div.is-not-editing';
    // Obtener todos los bloques que coinciden con el selector
    const blocks = await this.driver.$$(eName);
    for (let block of blocks) {
        const text = await block.getText();
        if (text.includes(title)) {
            // Buscar el botón dentro del bloque
            const button = await block.$('button');
            if (button) {
                return await button.click(); // Hacer clic en el botón y salir
            } else {
                throw new Error(`No se encontró un botón en el bloque con el título: ${title}`);
            }
        }
    }
    // Si ningún bloque coincide, lanzar un error
    throw new Error(`No se encontró ninguna sección con el título: ${title}`);
});

//escribe un titulo para el sitio
When('I enter title site {string}', async function (text) {
    if(text=='random'){
        text = faker.company.name();
    }
    pageTitle = text;
    if(Port==2345){
        let inputs = await this.driver.$$('input'); // Seleccionar todos los inputs
        for (const input of inputs) {
        if (await input.isDisplayed()) { // Verificar si el input es visible
            await input.clearValue(); // Limpiar el contenido
            return await input.setValue(text); // Escribir el texto deseado
        }
}
    }else{
        let element = await this.driver.$('input[placeholder="Site title"]');
        return await element.setValue(text);
    }
});

//escribe una descripcion para el sitio
When('I enter description site {string}', async function (text) {
    if(text=='random'){
        text = faker.company.buzzPhrase();
    }
    pageDescription = text;
    if(Port==2345){

        let inputs = await this.driver.$$('input'); // Seleccionar todos los inputs
        let visibleCount = 0;
        
        for (const input of inputs) {
            if (await input.isDisplayed()) { // Verificar si el input es visible
                visibleCount++; // Incrementar el contador de inputs visibles
                if (visibleCount === 2) { // Si es el segundo input visible
                    await input.clearValue(); // Limpiar el contenido
                    return await input.setValue(text); // Escribir el texto deseado
                }
            }
        }

    }else{
        let element = await this.driver.$('input[placeholder="Site description"]');
        return await element.setValue(text);
    }
});

//dar clic sobre una ficha del diseño Brand o Page wide
When('I click on button edit design', async function () {
    // Obtener todos los bloques que coinciden con el selector
    if(Port==2345){
        const buttons = await this.driver.$$('button');
        let matched = null;
        for (const button of buttons) {
            const text = await button.getText();
            if (text.includes('Branding')) {
                matched = button;
                break;
            }
        }
        if (!matched) { throw new Error(`No se encontró boton ${name}`);  }
        return await matched.click(); 
    }else{
        const blocks = await this.driver.$$('div.is-not-editing');
        for (let block of blocks) {
            const text = await block.getText();
            if (text.includes('Design & branding')) {
                // Buscar el botón dentro del bloque
                const button = await block.$('button');
                if (button) {
                    return await button.click(); // Hacer clic en el botón y salir
                } else {
                    throw new Error(`No se encontró un botón en el bloque con el título: ${title}`);
                }
            }
        }
    }
    // Si ningún bloque coincide, lanzar un error
    throw new Error(`No se encontró ninguna sección con el título: ${title}`);
});


//da clic sobe pick del color para el fondo
When('I click on panel site wide', async function () {
    if(Port!=2345){
        let element = await this.driver.$('button[title="Site wide"]');
        return await element.click();
    }
});

//da clic sobe pick del color para el fondo
When('I click on pick color', async function () {
    if(Port!=2345){
        let element = await this.driver.$('button[aria-label="Pick color"]');
        return await element.click();
    }
});

//agrega un color aletorio en la caja de color
When('I enter color', async function () {
    const selector = (Port == 2345) ? 'input[name="accent-color"].gh-input' : 'input[aria-label="Color value"';
    let element = await this.driver.$(selector);
    pageColor = generarColorAleatorio();
    return await element.setValue(pageColor);
});

//da clic sobre un boton para guardar, que contenga la palabra save
When('I click on button {string}', async function(name) {
    const buttons = await this.driver.$$('button');
    let matched = null;
    for (const button of buttons) {
        const text = await button.getText();
        if (text.includes(name)) {
            matched = button;
            break;
        }
    }
    if (!matched) { throw new Error(`No se encontró boton ${name}`);  }
    return await matched.click(); 
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
        name = faker.person.fullName();
    }
    currentMemberName = name;
    let element = await this.driver.$('input[id="member-name"]',{ timeout: 8000 });
    return await element.setValue(name);
});

// entra el correo del suscriptor
When('I enter member email {string}', async function (email) {
    if(email=='random'){
        email = faker.internet.email();
    } else if (email === 'current') {
        email = currentMemberEmail;
    } else if (email === 'existent') {
        email = existentMemberEmail;
    }
    currentMemberEmail = email;
    // Definición de correo existente
    if (existsMember == false) {
        existentMemberEmail=email;
        existsMember=true;
    }
    let element = await this.driver.$('input[id="member-email"]');
    return await element.setValue(email);
});

// clic en el boton nuevo miembro
When('I click on new member', async function () {
    let element = await this.driver.$('a[href="#/members/new/"]',{timeout: 5000}) ;
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
    const selector = Port==2345? 'div.gh-alert-content':'p.response'
    const container = await this.driver.$(selector);
    const containerText = await container.getText();
    const msg = "Attempting to add member with existing email address"
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

//da clic en el boton nuevo post
When('I click on new post', async function () {
    let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
});

//ingresa el titulo del post
When('I enter title post {string}', async function (text) {
    if(text=='random'){
        text = faker.hacker.phrase();
    }
    postTitle = text;
    let element = await this.driver.$('textarea.gh-editor-title');
    return await element.setValue(text);
});

//da click en el boton regresar de la pagina de edicion de post
When('I click on save post', async function () {
    let element = await this.driver.$('a.gh-editor-back-button');
    return await element.click();
});

// da clic en el boton publicar
When('I click on button publish', async function () {
    if(Port==2345){
        let element = await this.driver.$('div.gh-publishmenu-trigger');
        return await element.click();
    }else{
        let element = await this.driver.$('button[data-test-button="publish-flow"]');
        return await element.click();
    }
});

// da clic en el boton continuar de la ventana publicar
When('I click on button continue', async function () {
    if(Port==2345){
        
    }else{
        let element = await this.driver.$('button[data-test-button="continue"]');
        return  await element.click();
    }
});

// da clic en el boton confirmar de la ventana publicar
When('I click on button confirm', async function () {
    if(Port==2345){
        let element = await this.driver.$('button.gh-publishmenu-button');
        return await element.click();
    }else{
        let element = await this.driver.$('button[data-test-button="confirm-publish"]');
        return await element.click();
    }
});

// da clic en el boton actualiar de la pagina de edicion de post
When('I click on button update', async function () {
    if(Port==2345){
        let element = await this.driver.$('div.gh-publishmenu-trigger');
        await element.click();
        let element2 = await this.driver.$('button.gh-publishmenu-button');
        return await element2.click();
    }else{
        let element = await this.driver.$('button[data-test-button="publish-save"]');
        return await element.click();
    }
});

//cierra la ventana de publicacion
When('I click on close publish', async function () {
    if(Port==2345){
        
    }else{
        let element = await this.driver.$('button[data-test-button="close-publish-flow"]');
        return await element.click();
    }
});

// abre la ventana de configuracion para los post
When('I open setting post', async function () {
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

// abre la ventana de configuracion para los post
When('I close setting post', async function () {
    if(Port==2345){
        let element = await this.driver.$('button[aria-label="Close"]');
        return await element.click();
    }else{
        let element = await this.driver.$('button[title="Settings"]');
        return await element.click();
    }
});

// da clic sobre el primer post que coincida con estado suministrado
When('I select first post {string}', async function (status) {
    
    const posts = await this.driver.$$('li.gh-posts-list-item');
    let matchedPost = null;

    for (const post of posts) {
        const text = await post.getText(); // Obtener texto del post
        const statusLc = status.toLowerCase();
        if (text.toLowerCase().includes(statusLc)) {
            matchedPost = post; // Si coincide, guardar el elemento
            break; 
        }
    }

    // Validar que se encontró un post que coincide
    if (!matchedPost) {
        throw new Error(`No se encontró un post con el estado "${status}".`);
    }

    const read = await matchedPost.$('h3').getText();
    const butt = await matchedPost.$$('a'); // Obtener todos los enlaces
    const firstButton = butt[0];
    const trimmedText = read.trim().replace(/\n+/g, ' ').trim();
    postTitle = trimmedText;
    return await firstButton.click(); 

});

//da clic sobre el boton eliminar post
When('I click on button delete post', async function () {
    let element = await this.driver.$('.settings-menu-delete-button');
    return await element.click();
});

// da clic sobre el boton confirmar eliminacion
When('I click on button delete post confirm', async function () {
    let element = await this.driver.$('.gh-btn-red');
    return await element.click();
});

// Verifica que el primer post coincidente con el estado tiene el titulo pasado
Then('The status for post {string} should be {string}', async function (title, status) {
    
    if(title=="postTitle"){
        title = postTitle;
    }
    
    const posts = await this.driver.$$('li.gh-list-row');
    const statusLc = status.toLowerCase();
    
    let matchedPost = null;
    for (const post of posts) {
        const text = await post.getText(); // Obtener texto del post
        if (text.toLowerCase().includes(statusLc)) {
            matchedPost = post; // Si coincide, guardar el elemento
            break; // Salir del bucle
        }
    }

    // Validar que se encontró un post que coincide
    if (!matchedPost) {
        throw new Error(`No se encontró un post con el estado "${statusLc}".`);
    }

    const read = await matchedPost.$('h3').getText();
    const trimmedText = read.trim().replace(/\n+/g, ' ').trim();
    return await trimmedText.includes(title); 

});


//////////////////// F04 Crear y gestionar paginas //////////////////////////////
var oldUrl = '';
var newUrl = '';

//da clic en el boton nueva pagina
When('I click on new page', async function () {
    let element = await this.driver.$('a[href="#/editor/page/"]');
    return await element.click();
});

//obtiene el urlActual
When('I read url page', async function () {
    let element = await this.driver.$('input[name="post-setting-slug"]');
    oldUrl = await element.getValue();
    oldUrl = "/" + oldUrl;
    return oldUrl; // Devuelve el valor leído
});

//setea una nueva url a la pagina
When('I enter url page {string}', async function (url) {
    if(url=='random') { url = faker.word.noun()}
    let element = await this.driver.$('input[name="post-setting-slug"]');
    newUrl = "/" + url;
    return await element.setValue(url);
});



//////////////////// F05: Gestionar Etiquetas (tags) de contenido //////////////////////////////
var currenttagName = '';
var currenttagUrl = '';

//ingresar a nuevo tag
When('I click on new tag', async function () {
    let element = await this.driver.$('a[href="#/tags/new/"]',{timeout: 5000}) ;
    return await element.click();
});

// entra el nombre tag
When('I enter tag full name {string}', async function (name) {
    if(name=='random'){
        name = faker.hacker.noun();
    }
    currenttagName = name;
    let element = await this.driver.$('input[id="tag-name"]',{ timeout: 8000 });
    return await element.setValue(name);
});

// veerifica que el nuevo tag
Then('I verify new tag {string}', async function (title) {
    
    if(title=="current"){
        title = currenttagName;
    }
    
    const tags = await this.driver.$$('a[title="Edit tag"]');

    let matchedTag = null;
    for (const tag of tags) {
        const text = await tag.getText(); // Obtener texto del tag
        if (text.includes(title)) {
            matchedTag = tag; // Si coincide, guardar el elemento
            break; // Salir del bucle
        }
    }

    // Validar que se encontró un post que coincide
    if (!matchedTag) {
        throw new Error(`No se encontró un tag con el titulo "${title}".`);
    }

    return true;

});

// da clic en el primer tag
When('I click on first tag', async function () {
    const memberLinks = await this.driver.$$('a[title="Edit tag"]',{ timeout: 5000 });
    const memberfirstLink = memberLinks[0]
    return await memberfirstLink.click();
});

//obtinee le nombre del tag
When('I get the tag name', async function () {
    const input = await this.driver.$('#tag-name'); // Selecciona el elemento del input
    const name = await input.getValue(); // Obtiene el valor del input
    currenttagName = name;
    return name; // Devuelve el valor obtenido
});

//obtinee le nombre del tag
When('I get the tag url', async function () {
    const input = await this.driver.$('input[name="slug"]'); // Selecciona el elemento del input
    const name = await input.getValue(); // Obtiene el valor del input
    currenttagUrl = '/tag/' + name + '/';
    return name; // Devuelve el valor obtenido
});

//setear tag a post
When('I set tag to post', async function () {
    // Seleccionar el input y hacer clic
    const input = await this.driver.$('#tag-input ul input');
    await input.click();
    tag = currenttagName;
    // Obtener la lista de elementos y filtrar
    const elements = await this.driver.$$('li');
    for (const element of elements) {
        const text = await element.getText();
        if (text.includes(tag)) {
            await element.click(); // Haz clic en el primer elemento que coincide
            break; // Sal del bucle después de hacer clic
        }
    }
});

// da clic en el boton delete tag
When('I click on delete tag', async function () {
    let element = await this.driver.$('button.gh-btn-red');
    return await element.click();
});

// da clic en el boton confirmar delete tag
When('I click on confirm delete tag', async function () {
    let element = await this.driver.$('.modal-content');
    const del = await element.$('button.gh-btn-red');
    return await del.click();
});

When('I verify that the tag {string} is deleted', async function (name) {
    if(name=="current"){
        name = currenttagName;
    }
    
    const links = await this.driver.$$('a[title="Edit tag"]'); // Encuentra todos los elementos con el selector
    let found = false;

    // Itera por los enlaces encontrados
    for (const link of links) {
        const text = await link.getText(); // Obtiene el texto de cada enlace
        if (text.includes(name)) {
            found = true; // Si encuentra coincidencia, marca como encontrado
            break;
        }
    }

    // Verifica que no se encontró ningún enlace que coincida
    if (found) {
        throw new Error(`Se encontró un enlace con el nombre: ${name}`);
    }
    return true;
});