import react, { useEffect, useState } from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {ingredientsApiUrl} from '../../constants'

const App = () => {
    const [fetchState, setFetchState] = useState({
        data: [],
        isLoading: false,
        error: false,
    })

    useEffect(() => {
        loadIngredientsData()
    }, [])

    async function loadIngredientsData() {
        try {
            setFetchState({ data: [], isLoading: true, error: false })
            const fetchPromise = await fetch(ingredientsApiUrl)
            const fetchData = await fetchPromise.json()
            if (fetchData?.success && fetchData.data.length > 0) {
                setFetchState({ data: fetchData.data, isLoading: false, error: false })
            } else {
                setFetchState({ data: [], isLoading: false, error: true })
            }
        }
        catch(err) {
            setFetchState({ data: [], isLoading: false, error: true })
        }
    }

    return (
        <div className='app'>
            <AppHeader/>

            {fetchState.isLoading && (
                <div className={styles.serviceInfoWrap}>
                    <div className={styles.serviceInfo}>
                        <span>Загружаем данные...</span>
                    </div>
                </div>
            )}

            {fetchState.error && (
                <div className={styles.serviceInfoWrap}>
                    <div className={styles.serviceInfo}>
                        <span>Сервис в данный момент недоступен :(</span>
                        <span>Попробуйте позже</span>
                    </div>
                </div>
            )}

            {fetchState.data.length > 0 && (
                <main className={styles.mainContent}>
                    <h1 className={`${styles.mainHeader} mt-10 mb-5`}>Соберите бургер</h1>
                    <div className={styles.sectionsWrap}>
                        <BurgerIngredients data={fetchState.data}/>
                        <BurgerConstructor data={fetchState.data}/>
                    </div>
                </main>   
            )}
        </div>
    )
}

export default App