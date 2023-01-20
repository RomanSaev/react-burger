import react, { useEffect, useState } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { getIngredients } from '../../utils/react-burger-api'
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context'

const App = () => {
    const [ingredietnsRequest, setIngredietnsRequest] = useState({
        data: [],
        isLoading: false,
        error: false,
    })

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedCounts, setSelectedCounts] = useState({ //объект с количествами выбранных ингредиентов (для вывода каунтеров в BurgerIngredients)
        id60d3b41abdacab0026a733c6: 2,
    });

    const [orderRequest, setOrderRequest] = useState({
        data: null,
        isLoading: false,
        error: false,
    })

    useEffect(() => {
        loadIngredientsData()
    }, [])

    async function loadIngredientsData() {
        try {
            setIngredietnsRequest({ data: [], isLoading: true, error: false })
            const fetchData = await getIngredients();
            if (fetchData?.success && fetchData.data.length > 0) {
                setIngredietnsRequest({ data: fetchData.data, isLoading: false, error: false })

                setSelectedIngredients([...fetchData.data.slice(0,4)]); //тут временно добавляем ингредиенты в бургер конструктор
            } else {
                setIngredietnsRequest({ data: [], isLoading: false, error: true })
            }
        }
        catch(err) {
            setIngredietnsRequest({ data: [], isLoading: false, error: true })
        }
    }

    return (
        <div className='app'>
            <AppHeader/>

            {ingredietnsRequest.isLoading && (
                <div className={styles.serviceInfoWrap}>
                    <div className={styles.serviceInfo}>
                        <span>Загружаем данные...</span>
                    </div>
                </div>
            )}

            {ingredietnsRequest.error && (
                <div className={styles.serviceInfoWrap}>
                    <div className={styles.serviceInfo}>
                        <span>Сервис в данный момент недоступен :(</span>
                        <span>Попробуйте позже</span>
                    </div>
                </div>
            )}

            {ingredietnsRequest.data.length > 0 && (
                <main className={styles.mainContent}>
                    <h1 className={`${styles.mainHeader} mt-10 mb-5`}>Соберите бургер</h1>
                    <div className={styles.sectionsWrap}>
                        <BurgerIngredients 
                            data={ingredietnsRequest.data}
                            selectedCounts={selectedCounts}
                        />
                        <BurgerConstructorContext.Provider
                            value={{
                                selectedIngredients, 
                                setSelectedIngredients,
                                selectedCounts,
                                setSelectedCounts,
                                orderRequest,
                                setOrderRequest,
                            }}
                        >
                            <BurgerConstructor data={ingredietnsRequest.data}/>
                        </BurgerConstructorContext.Provider>
                    </div>
                </main>   
            )}
        </div>
    )
}

export default App