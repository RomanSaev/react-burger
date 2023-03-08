import { Dispatch, FC, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAuth } from '../../store/actions/auth'
import { ingredientsSelector } from '../../store/selectors'
import { fetchIngredients } from '../../store/actions/ingredients'
import { Loader } from '../loader/loader'
import { ServiceFailInfo } from '../service-fail-info/service-fail-info'
import { AppRouter } from '../app-router/app-router'

const App: FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const { ingredientsRequest, ingredientsFailed } = useSelector(ingredientsSelector);

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