import { INGREDIENT_POPUP_COMMON_TEXT, INGREDIENT_NAME_1, INGREDIENT_NAME_2, INGREDIENT_NAME_3, CREATED_ORDER_POPUP_COMMON_TEXT } from '../../../src/constants'

describe('main page works correctly', function() {

    const burgerConstructorSelector = '[data-testid="burger-constructor"]';
    const modalOverlaySelector = '[data-testid="modal-overlay"]';

    beforeEach(() => {
        cy.viewport(1700,1100)
        cy.visit('/')
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
      cy.contains(INGREDIENT_NAME_1).click();
      cy.contains(INGREDIENT_POPUP_COMMON_TEXT);
      cy.contains(INGREDIENT_NAME_1);
      cy.get(modalOverlaySelector).click({force: true});
      cy.contains(INGREDIENT_POPUP_COMMON_TEXT).should('not.exist');

      cy.contains(INGREDIENT_NAME_2).click();
      cy.contains(INGREDIENT_POPUP_COMMON_TEXT);
      cy.contains(INGREDIENT_NAME_2);
      cy.get('[data-testid="close-icon-wrap"] svg').click();
      cy.contains(INGREDIENT_POPUP_COMMON_TEXT).should('not.exist');

      cy.contains(INGREDIENT_NAME_3).click();
      cy.contains(INGREDIENT_POPUP_COMMON_TEXT);
      cy.contains(INGREDIENT_NAME_3);
      cy.get('body').type('{esc}');
      cy.contains(INGREDIENT_POPUP_COMMON_TEXT).should('not.exist');
    });

    it('should make order', function() {
      cy.visit('/')
      cy.contains(INGREDIENT_NAME_1).trigger('dragstart');
      cy.get(burgerConstructorSelector).trigger('drop');
      cy.contains('Ингредиент 7').trigger('dragstart');
      cy.get(burgerConstructorSelector).trigger('drop');
      cy.contains(INGREDIENT_NAME_3).trigger('dragstart');
      cy.get(burgerConstructorSelector).trigger('drop');

      cy.contains('Оформить заказ').click();
      cy.contains(CREATED_ORDER_POPUP_COMMON_TEXT);
      cy.get(modalOverlaySelector).click({force: true});
      cy.contains(CREATED_ORDER_POPUP_COMMON_TEXT).should('not.exist');
    });

  });