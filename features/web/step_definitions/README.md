# Definicion de funcionalidades

## F01 - configuracion general

* When 'I enter email {kraken-string}'
* When 'I enter password {kraken-string}'
* When 'I click on signin'
* When 'I open setting site'
* When 'I close setting site'
* When 'I click on button edit in {string}'  : titulo del seccion en la fonfiguracion
* When 'I click on button design {string}' : titulo de la ficha en el diseño
* When 'I click on button pick color'
* When 'I click on button save'
* When 'I click on button close'
* When 'I enter title site {string}'
* When 'I enter color'
* When 'I enter description site {string}'

* Then 'The main page should contain {string}'
* Then 'The main page should not contain {string}'
* Then 'The head should contain color'

## F02 - suscriptores
* When 'I enter member full name {string}'
* When 'I enter member email {string}'
* When 'I click on new member'
* When 'I click on save member'
* Then 'I verify new member on list for email {string}'
* Then 'I verify it exists an error message'

## F03 Gestion de Post
* When 'I enter title post {string}'
* When 'I click on new post'
* When 'I click on save post'
* When 'I click on button publish'
* When 'I click on button continue'
* When 'I click on button confirm'
* When 'I click on button update'
* When 'I click on close publish
* When 'I open setting post'
* When 'I select first post {string}' : Draft | Published
* When 'I click on button delete post'
* When 'I click on button delete post confirm'
* Then 'The status for post {string} should be {string}' : titulo | postTitle : Draft | Published 












