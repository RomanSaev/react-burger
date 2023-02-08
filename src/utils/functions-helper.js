export const getTotalBurgerPrice = (selectedItems) => {
    let resultPrice = 0;
    const bunIngredient = selectedItems.find(el => el.type === 'bun');
    const selectedFillingIngredients = selectedItems.filter(el => el.type !== 'bun');
    if (bunIngredient) {
        resultPrice += bunIngredient.price * 2;
        resultPrice += selectedFillingIngredients.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price
        }, 0)
    }
    return resultPrice;
}