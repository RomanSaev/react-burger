import { FC, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import { checkUserAuth } from '../../store/actions/auth'
import { ingredientsSelector } from '../../store/selectors'
import { fetchIngredients } from '../../store/actions/ingredients'
import { Loader } from '../loader/loader'
import { ServiceFailInfo } from '../service-fail-info/service-fail-info'
import { AppRouter } from '../app-router/app-router'
import { useAppDispatch, useAppSelector } from '../../hooks/store'

const App: FC = () => {
    const dispatch = useAppDispatch();
    const { ingredientsRequest, ingredientsFailed } = useAppSelector(ingredientsSelector);

    useEffect(() => {
        dispatch(checkUserAuth());
        dispatch(fetchIngredients());
    }, [])

    return (
        <div>
            <AppHeader />

            {ingredientsRequest 
                ? <Loader /> : ingredientsFailed 
                ? <ServiceFailInfo /> : <AppRouter />
            }
        </div>
    )
}

export default App