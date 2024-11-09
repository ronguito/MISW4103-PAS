const { Given, When, Then } = require('@cucumber/cucumber');
const { faker } = require("@faker-js/faker");

var currentPostTitle = '';

//////////////////// F01 configuracion general ///////////////////////////////
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

//////////////////// F02 Crear y gestionar Suscripciones y miembros  ///////////////////////////////

When('I enter member full name {string}', async function (name) {
    if(name=='random'){
        name = faker.name.findName();
    }
    currentMemberName = name;
    let element = await this.driver.$('input[id="member-name"]');
    return await element.setValue(name);
});

When('I enter member email {string}', async function (email) {
    if(email=='random'){
        email = faker.internet.email();
    }
    currentMemberEmail = email;
    let element = await this.driver.$('input[id="member-email"]');
    return await element.setValue(email);
});

When('I click on new member', async function () {
    let element = await this.driver.$('a[href="#/members/new/"]');
    return await element.click();
});

When('I click on save member', async function () {
    let element = await this.driver.$('button[data-test-button="save"]');
    return await element.click();
});

// When('I click on button publish', async function () {
//     let element = await this.driver.$('button[data-test-button="publish-flow"');
//     return await element.click();
// });

// When('I click on button continue', async function () {
//     let element = await this.driver.$('button[data-test-button="continue"');
//     return  await element.click();
// });

// When('I click on button confirm', async function () {
//     let element = await this.driver.$('button[data-test-button="confirm-publish"');
//     return await element.click();
// });

// When('I click on button update', async function () {
//     let element = await this.driver.$('button[data-test-button="publish-save"');
//     return await element.click();
// });

// When('I click on close publish', async function () {
//     let element1 = await this.driver.$('button[data-test-button="close-publish-flow"');
//     return await element1.click();
// });

// When('I select first post {string}', async function (status) {
    
//     const posts = await this.driver.$$('a.gh-post-list-title');
//     let matchedPost = null;

//     for (const post of posts) {
//         const text = await post.getText(); // Obtener texto del post
//         if (text.includes(status)) {
//             matchedPost = post; // Si coincide, guardar el elemento
            
//             break; // Salir del bucle
//         }
//     }

//     // Validar que se encontró un post que coincide
//     if (!matchedPost) {
//         throw new Error(`No se encontró un post con el estado "${status}".`);
//     }

//     const read = await matchedPost.$('h3').getText();
//     const trimmedText = read.trim().replace(/\n+/g, ' ').trim();
//     currentPostTitle = trimmedText;
//     console.log(trimmedText);
    
//     return await matchedPost.click(); 

// });

Then('I verify new member on list for email {string}', async function (email) {
    
    if(email=="current"){
        email = currentMemberEmail;
    }
    
    const memberNames = await this.driver.$$('h3.gh-members-list-name');
    const memberEmails = await this.driver.$$('p.gh-members-list-email', { timeout: 5000 });
    console.log("member Emails:", memberEmails)
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

// Then('I verify {string} is published', async function (title) {
//     if(title=="current"){ title = currentPostTitle;  }
//     const container = await this.driver.$('div.gh-container-inner');
//     const containerText = await container.getText();
//     return await containerText.includes(title);
// });

// Then('I verify {string} is not published', async function (title) {
//     if(title=="current"){ title = currentPostTitle;  }
//     const container = await this.driver.$('div.gh-container-inner');
//     const containerText = await container.getText();
//     return await !containerText.includes(title);
// });

//////////////////// F03 Crear y gestionar Publicaciones (posts) ///////////////////////////////
When('I enter title {string}', async function (text) {
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
    let element1 = await this.driver.$('button[data-test-button="close-publish-flow"');
    return await element1.click();
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

Then('I verify status {string} for {string}', async function (status, title) {
    
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

Then('I verify {string} is published', async function (title) {
    if(title=="current"){ title = currentPostTitle;  }
    const container = await this.driver.$('div.gh-container-inner');
    const containerText = await container.getText();
    return await containerText.includes(title);
});

Then('I verify {string} is not published', async function (title) {
    if(title=="current"){ title = currentPostTitle;  }
    const container = await this.driver.$('div.gh-container-inner');
    const containerText = await container.getText();
    return await !containerText.includes(title);
});


  
 
