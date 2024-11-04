describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://cuidarlatierra.org');
        cy.wait(1000);
        randomEvent(10);
    })
})

// Función genera número aleatorio entre un mínimo y un máximo
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomElement(monkeysLeft, element) {
    console.log("Activando el elemento " + element);
   
    cy.get(element, { timeout: 3000 }).then($elements => {
        if ($elements.length === 0) {
            console.log("No se encontró el elemento " + element);
            return; 
        }

        var ElementSelected = $elements.get(getRandomInt(0, $elements.length));

        if (!Cypress.dom.isHidden(ElementSelected)) {
            if (element === 'input[type="text"]') {
                cy.wrap(ElementSelected).invoke('val', 'Texto aleatorio').trigger('change');
            } else if (element === 'select') {
                const randomIndex = getRandomInt(0, ElementSelected.options.length);
                cy.wrap(ElementSelected).select(randomIndex);
            } else {
                cy.wrap(ElementSelected).click({ force: true });
            }
        }
    });

    if (monkeysLeft > 0) {
        cy.wait(1000);
        randomElement(monkeysLeft - 1, element); // Asegúrate de pasar el elemento
    }
}

function randomEvent(eventsLeft) {

	var elements = ['a','select','input[type="text"]','button'];
	const eventType = getRandomInt(0, 4); 
	randomElement(0,elements[eventType]);
    if (eventsLeft > 0) {
		 cy.wait(1000);
        randomEvent(eventsLeft - 1);
    }
}
