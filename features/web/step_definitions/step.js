const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require("@faker-js/faker");


//////////////////// F01 configuracion general ///////////////////////////////
var pageTitle = '';
When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

When('I click on signin', async function() {
	let element = await this.driver.$('[data-test-button="sign-in"]');
    return await element.click();
})

When('I open setting site', async function () {
    let element = await this.driver.$('a[data-test-nav="settings"]');
    return await element.click();
});

When('I close setting site', async function () {
    let element = await this.driver.$('button[data-testid="exit-settings"]');
    return await element.click();
});

When('I click on button edit title', async function () {
    let element = await this.driver.$('div[data-testid="title-and-description"]');
    let button = await element.$('button');
    return await button.click();
});

When("I click on button save", async function() {
    const buttons = await this.driver.$$('button');
    let matched = null;

    for (const button of buttons) {
        const text = await button.getText();
        if (text.includes('Save')) {
            matched = button;
            break; // Salir del bucle
        }
    }

    if (!matched) {
        throw new Error(`No se encontró un para guardar`);
    }

    return await matched.click(); 
});

When('I enter title site {string}', async function (text) {
    if(text=='random'){
        text = faker.company.name();
    }
    pageTitle = text;
    let element = await this.driver.$('input[placeholder="Site title"]');
    return await element.setValue(text);
});

Then('The page title should be {string}', async function (title) {
    const actualTitle = await this.driver.getTitle();
    if(title=="current"){ title = pageTitle;  }
    if (!actualTitle.includes(title)) {
        throw new Error(`El título de la página es incorrecto. Se esperaba: "${title}", pero se obtuvo: "${actualTitle}"`);
    }
});


//////////////////// F03 Crear y gestionar Publicaciones (posts) ///////////////////////////////
var currentPostTitle = '';

When('I enter title post {string}', async function (text) {
    if(text=='random'){
        text = faker.hacker.phrase();
    }
    currentPostTitle = text;
    let element = await this.driver.$('textarea[placeholder="Post title"]');
    return await element.setValue(text);
});

When('I click on new post', async function () {
    let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
});

When('I click on save post', async function () {
    let element = await this.driver.$('a[data-test-link="posts"]');
    return await element.click();
});

When('I click on button publish', async function () {
    let element = await this.driver.$('button[data-test-button="publish-flow"');
    return await element.click();
});

When('I click on button continue', async function () {
    let element = await this.driver.$('button[data-test-button="continue"');
    return  await element.click();
});

When('I click on button confirm', async function () {
    let element = await this.driver.$('button[data-test-button="confirm-publish"');
    return await element.click();
});

When('I click on button update', async function () {
    let element = await this.driver.$('button[data-test-button="publish-save"');
    return await element.click();
});

When('I click on close publish', async function () {
    let element = await this.driver.$('button[data-test-button="close-publish-flow"');
    return await element.click();
});

When('I open setting post', async function () {
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

When('I select first post {string}', async function (status) {
    
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
    currentPostTitle = trimmedText;
    console.log(trimmedText);
    
    return await matchedPost.click(); 

});

When("I click on button delete post", async function () {
    let element = await this.driver.$('button[data-test-button="delete-post"');
    return await element.click();
});

When("I click on button delete post confirm", async function () {
    let element = await this.driver.$('button[data-test-button="delete-post-confirm"');
    return await element.click();
});

Then('The status for post {string} should be {string}', async function (title, status) {
    
    if(title=="current"){
        title = currentPostTitle;
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

Then('The post {string} should be published', async function (title) {
    if(title=="current"){ title = currentPostTitle;  }
    const container = await this.driver.$('div.gh-container-inner');
    const containerText = await container.getText();
    return await containerText.includes(title);
});

Then('The post {string} should not be published', async function (title) {
    if(title=="current"){ title = currentPostTitle;  }
    const container = await this.driver.$('div.gh-container-inner');
    const containerText = await container.getText();
    return await !containerText.includes(title);
});
  
 
