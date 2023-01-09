import react from 'react'
import styles from './app.module.css'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import data from '../../utils/data'
import BurgerConstructor from '../burger-constructor/burger-constructor'

const App = () => {
    return (
        <div className='app'>
            <AppHeader/>
            <div className={styles.mainContent}>
                <h1 className={`${styles.mainHeader} mt-10 mb-5`}>Соберите бургер</h1>
                <div className={styles.sectionsWrap}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </div>
            </div>
        </div>
    )
}

export default App