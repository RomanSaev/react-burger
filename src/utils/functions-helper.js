export const getTotalBurgerPrice = (bun, fillingIngredients) => {
    let resultPrice = 0;
    if (bun) {
        resultPrice += bun.price * 2;
        resultPrice += fillingIngredients.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price
        }, 0)
    }
    return resultPrice;
}