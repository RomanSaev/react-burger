import react, { useMemo, useState } from 'react'
import styles from './burger-constructor.module.css'
import ConstructorItemFixed from '../constructor-item-fixed/constructor-item-fixed'
import ConstructorItem from '../constructor-item/constructor-item'
import TotalPanel from '../total-panel/total-panel'
import ConstructorItemEmpty from '../constructor-item-empty/constructor-item-empty'
import { useDispatch, useSelector } from 'react-redux'
import { addToConstructor } from '../../store/actions/burger-constructor'
import { useDrop } from 'react-dnd'
import { getTotalBurgerPrice } from '../../utils/functions-helper'
import { burgerConstructorSelector } from '../../store/selectors'

const BurgerConstructor = () => {
    const { bun, fillingIngredients } = useSelector(burgerConstructorSelector);
    const dispatch = useDispatch();

    const [emptyBurgerHoverType, setEmptyBurgerHoverType] = useState('');//храним подсветку блоков пустого бургера в локальном состоянии

    const [{}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(addToConstructor(item))
            setEmptyBurgerHoverType('');
        },
        hover(item) {
            handleDragHover(item)
        },
    })

    const handleDragHover = (item) => {
        setEmptyBurgerHoverType(item.type)
    }

    const totalPrice = useMemo(()=> {
        return getTotalBurgerPrice(bun, fillingIngredients);
     }, [bun, fillingIngredients]);

    return (
        <section className={'pl-4'} ref={dropTarget}>
            {bun
                ? <ConstructorItemFixed ingredientData={bun} type='top'/>
                : <ConstructorItemEmpty
                    type='top'
                    text='Выберите булку'
                    cute={emptyBurgerHoverType === 'bun'}
                />
            }
            
            <div className={`${styles.constructorList} mt-4 mb-4 pr-2`}>
                {fillingIngredients.length > 0
                    ? fillingIngredients.map((el, index) => {
                        return <ConstructorItem
                            key={el.uuid}
                            ingredientData={el}
                            index={index}
                        />
                    })
                    : <ConstructorItemEmpty
                        type='list'
                        text='Выберите начинку'
                        cute={emptyBurgerHoverType.length > 0 && emptyBurgerHoverType !== 'bun'}
                    />
                }
            </div>

            {bun
                ? <ConstructorItemFixed ingredientData={bun} type='bottom'/>
                : <ConstructorItemEmpty
                    type='bottom'
                    text='Выберите булку'
                    cute={emptyBurgerHoverType === 'bun'}
                />
            }

            <TotalPanel price={totalPrice}/>
        </section>
    )
}

export default BurgerConstructor