describe('test for confirm charge', () => {
	it('user adds one charge', () => {

		cy.visit('/');

		cy.findByRole('button', { name: /login/i }).click();

		cy.findByPlaceholderText('email').type('root@company.com')

		cy.findByPlaceholderText('password').type('root1234');

		cy.findByRole('button', { name: /log\-in/i }).click();

		cy.get('[data-testid=charge-1]', { timeout: 10000 }).click();

		cy.findByText('home').click();

		let btn;

		btn = cy.findByTestId(`charge-input-1-1`).click();

		btn.type('8').type('{enter}');

		for (let i = 1; i < 4; i++) {

			btn = cy.get(`[data-testid=charge-input-1-${i + 1}]`);

			btn.type('8').type('{enter}');

		}

		cy.findByRole('button', { name: /save charges/i }).click();

		cy.findByRole('button', { name: /Locations/i }).click();

		for (let i = 0; i < 4; i++) {

			btn = cy.get(`[data-testid=location-input-1-${i + 1}]`, { timeout: 10000 });

			btn.click();

		}

		cy.findByRole('button', { name: /Save Locations/i }).click();

		cy.findByRole('button', { name: /Charges/i }).click();

		cy.get('[data-testid=calculateH]', { timeout: 10000 }).click();

		cy.findByRole('button', { name: /Delete hours/i }).click();

	})
})