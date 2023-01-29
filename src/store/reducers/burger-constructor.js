import { ADD_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from "../actions/burger-constructor";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    selectedIngredients: [],
    selectedCounts: {}, //объект с количествами выбранных ингредиентов (для вывода каунтеров в BurgerIngredients)
    totalPrice: 0
}

const getTotalPrice = (selectedItems) => {
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

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {
            const ingredient = { ...action.payload };
            ingredient.uuid = uuidv4();

            const prevSelectedIngredients = [ ...state.selectedIngredients ];
            const newSelectedCounts = { ...state.selectedCounts };
            let newSelectedIngredients = [];
            const ingredientCount = ingredient.type === 'bun' ? 2 : 1;

            if (ingredient.type === 'bun') {
                let noBunIngredients = [];
                prevSelectedIngredients.forEach( item => { 
                    //также поддерживаю актуальность объекта state.selectedCounts.это усложняет код здесь, зато при рендере каунтеров в списке ингредиентов не надо для каждого элемента отфильтровывать массив выбранных ингредиентов
                    if (item.type !== 'bun') {
                        noBunIngredients.push(item);
                    } else {
                        newSelectedCounts[`id${item._id}`] -= ingredientCount;
                    }
                })

                newSelectedIngredients = noBunIngredients;
                newSelectedIngredients.push(ingredient)
                
            } else {
                newSelectedIngredients = prevSelectedIngredients;
                newSelectedIngredients.push(ingredient);
            }

            if (!newSelectedCounts[`id${ingredient._id}`]) {
                newSelectedCounts[`id${ingredient._id}`] = ingredientCount;
            } else {
                newSelectedCounts[`id${ingredient._id}`] += ingredientCount;
            }

            return {
                ...state,
                selectedIngredients: newSelectedIngredients,
                selectedCounts: newSelectedCounts,
                totalPrice: getTotalPrice(newSelectedIngredients)
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            const ingredient = { ...action.payload };
            const newSelectedCounts = { ...state.selectedCounts };
            const ingredientCount = ingredient.type === 'bun' ? 2 : 1;

            newSelectedCounts[`id${ingredient._id}`] -= ingredientCount;
            const newSelectedIngredients = state.selectedIngredients.filter( item => {
                return item.uuid !== ingredient.uuid
            })

            return {
                ...state,
                selectedIngredients: newSelectedIngredients,
                selectedCounts: newSelectedCounts,
                totalPrice: getTotalPrice(newSelectedIngredients)
            }
        }
        case MOVE_CONSTRUCTOR_ITEM: {
            const prevSelectedIngredients = [ ...state.selectedIngredients ].filter(el => el.type !== 'bun');
            const sortedSelectedIngredients = [ ... prevSelectedIngredients ];
            const indexFrom = action.payload.from;
            const indexTo = action.payload.to;

            //сортируем массив с переносом перетаскиваемого элемента в списке
            sortedSelectedIngredients.splice(indexFrom, 1)
            sortedSelectedIngredients.splice(indexTo, 0, prevSelectedIngredients[indexFrom])

            return {
                ...state,
                selectedCounts: { ...state.selectedCounts },
                selectedIngredients: sortedSelectedIngredients,
            }
        }
        default:
            return state;
    }
}