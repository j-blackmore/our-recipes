describe('basic user flow on our-recipes', () => {
    it('loads main site', () => {
        cy.visit('/');
        cy.contains('Our Recipes');
    });

    it('create a new recipe', () => {
        cy.findByText('+').click();
        cy.contains(/Create New Recipe/);
        cy.contains(/Enter your recipe below, add an image and save\./);

        cy.findByRole('textbox', { name: 'title *' }).type('Cypress Title');
        cy.findByRole('textbox', { name: 'subtitle *' }).type(
            'Cypress subtitle'
        );
        cy.findByRole('textbox', { name: 'Preparation Time (mins) *' }).type(1);
        cy.findByRole('textbox', { name: 'Cooking Time (mins) *' }).type(45);
        cy.findByRole('textbox', { name: 'method *' }).type(
            'Cypress recipe method'
        );
        cy.findByRole('textbox', { name: 'ingredients *' }).type(
            'cypress{enter}test runner{enter}end to end tests'
        );

        // upload image
        // TODO: Improve when Cypress adds feature for uploading files easily
        cy.get('input[type=file]')
            .then(input => {
                cy.fixture('images/test-recipe.jpg')
                    .then(content =>
                        Cypress.Blob.base64StringToBlob(content, 'image/jpeg')
                    )
                    .then(blob => {
                        const testFile = new File([blob], 'test-recipe.jpg');
                        const dataTransfer = new DataTransfer();

                        dataTransfer.items.add(testFile);
                        input[0].files = dataTransfer.files;
                        return input;
                    });
            })
            .trigger('change', { force: true });
        cy.findByRole('button', { name: /save/i }).click();
    });

    it('new recipe appears in recipes feed', () => {
        cy.contains('Cypress Title');
        cy.contains('Cypress subtitle');
        cy.findByTitle('Cypress Title').should('exist'); // the image
    });

    it('open & close detailed view of a recipe', () => {
        cy.findByText('Cypress Title').click();

        cy.contains('Cypress recipe method');
        cy.contains('test runner');

        cy.findByRole('button', { name: /close/i }).click();
    });

    it('open & close edit view of a recipe', () => {
        cy.findByText('Cypress Title').click();

        cy.findByRole('button', { name: /edit/i }).click();
        cy.contains('Edit Recipe');
        cy.contains('Update contents and save');
        cy.findByRole('button', { name: /close/i }).click();
    });

    it('edit a recipe', () => {
        cy.findByRole('button', { name: /edit/i }).click();

        cy.findByRole('textbox', { name: 'title *' }).clear();
        cy.findByRole('textbox', { name: 'title *' }).type(
            'New Cypress Recipe'
        );
        cy.findByRole('textbox', { name: 'method *' }).clear();
        cy.findByRole('textbox', { name: 'method *' }).type(
            'lorem ipsum lorem ipsum'
        );
        cy.findByRole('button', { name: /save/i }).click();

        cy.findByRole('button', { name: /close/i }).click();

        cy.contains('New Cypress Recipe');
        cy.contains('Cypress subtitle');
        cy.findByTitle('New Cypress Recipe').should('exist'); // the image
    });

    it('delete a recipe', () => {
        cy.findByText('New Cypress Recipe').click();
        cy.contains('lorem ipsum lorem ipsum');

        cy.findByRole('button', { name: /delete/i }).click();
        cy.findByText('New Cypress Recipe').should('not.exist');
        cy.findByText('lorem ipsum lorem ipsum').should('not.exist');
        cy.findByTitle('New Cypress Recipe').should('not.exist'); // the image
    });
});
