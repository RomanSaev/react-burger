describe('main page works correctly', function() {
    beforeEach(() => {
        cy.viewport(1700,1100)
        cy.visit('http://localhost:3000')
        cy.intercept('GET', '/api/ingredients', { fixture: "ingredients.json" })
        cy.intercept('GET', '/api/auth/user', { fixture: "user.json" })
        cy.intercept('POST', '/api/orders', { fixture: "order.json" })

        window.localStorage.setItem('refreshToken', JSON.stringify('testtoken'))
        cy.setCookie('accessToken', 'testToken')
    })

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('should handle ingredient popup behavior', function() {
      // cy.visit('http://localhost:3000')
      cy.contains('Ингредиент 1').click();
      cy.contains('Детали ингредиента');
      cy.contains('Ингредиент 1');
      cy.get('[data-testid="modal-overlay"]').click({force: true});
      cy.contains('Детали ингредиента').should('not.exist');

      cy.contains('Ингредиент 2').click();
      cy.contains('Детали ингредиента');
      cy.contains('Ингредиент 2');
      cy.get('[data-testid="close-icon-wrap"] svg').click();
      cy.contains('Детали ингредиента').should('not.exist');

      cy.contains('Ингредиент 3').click();
      cy.contains('Детали ингредиента');
      cy.contains('Ингредиент 3');
      cy.get('body').type('{esc}');
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should make order', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Ингредиент 1').trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.contains('Ингредиент 7').trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');
      cy.contains('Ингредиент 3').trigger('dragstart');
      cy.get('[data-testid="burger-constructor"]').trigger('drop');

      cy.contains('Оформить заказ').click();
      cy.contains('идентификатор заказа');
      cy.get('[data-testid="modal-overlay"]').click({force: true});
      cy.contains('идентификатор заказа').should('not.exist');
    });

  });