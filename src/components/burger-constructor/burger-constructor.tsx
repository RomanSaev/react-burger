import { FC, useMemo, useState } from 'react'
import styles from './burger-constructor.module.css'
import ConstructorItemFixed from '../constructor-item-fixed/constructor-item-fixed'
import ConstructorItem from '../constructor-item/constructor-item'
import TotalPanel from '../total-panel/total-panel'
import ConstructorItemEmpty from '../constructor-item-empty/constructor-item-empty'
import { addToConstructor } from '../../store/actions/burger-constructor'
import { useDrop } from 'react-dnd'
import { getTotalBurgerPrice } from '../../utils/functions-helper'
import { burgerConstructorSelector } from '../../store/selectors'
import { ConstructorItemEmptyTypes, ConstructorItemFixedTypes, TConstructorIngredient, TIngredient } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/store'

const BurgerConstructor: FC = () => {
    const { bun, fillingIngredients } = useAppSelector(burgerConstructorSelector);
    const dispatch = useAppDispatch();

    const [emptyBurgerHoverType, setEmptyBurgerHoverType] = useState<string>('');//храним подсветку блоков пустого бургера в локальном состоянии

    const [ , dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
            dispatch(addToConstructor(item))
            setEmptyBurgerHoverType('');
        },
        hover(item: TIngredient) {
            handleDragHover(item)
        },
    })

    const handleDragHover = (item: TIngredient) => {
        setEmptyBurgerHoverType(item.type)
    }

    const totalPrice = useMemo(()=> {
        return getTotalBurgerPrice(bun, fillingIngredients);
     }, [bun, fillingIngredients]);

    return (
        <section className={'pl-4'} ref={dropTarget}>
            {bun
                ? <ConstructorItemFixed ingredientData={bun} type={ConstructorItemFixedTypes.Top}/>
                : <ConstructorItemEmpty
                    type={ConstructorItemEmptyTypes.Top}
                    text='Выберите булку'
                    cute={emptyBurgerHoverType === 'bun'}
                />
            }
            
            <div className={`${styles.constructorList} mt-4 mb-4 pr-2`}>
                {fillingIngredients.length > 0
                    ? fillingIngredients.map((el: TConstructorIngredient, index: number) => {
                        return <ConstructorItem
                            key={el.uuid}
                            ingredientData={el}
                            index={index}
                        />
                    })
                    : <ConstructorItemEmpty
                        type={ConstructorItemEmptyTypes.List}
                        text='Выберите начинку'
                        cute={emptyBurgerHoverType.length > 0 && emptyBurgerHoverType !== 'bun'}
                    />
                }
            </div>

            {bun
                ? <ConstructorItemFixed ingredientData={bun} type={ConstructorItemFixedTypes.Bottom}/>
                : <ConstructorItemEmpty
                    type={ConstructorItemEmptyTypes.Bottom}
                    text='Выберите булку'
                    cute={emptyBurgerHoverType === 'bun'}
                />
            }

            <TotalPanel price={totalPrice}/>
        </section>
    )
}

export default BurgerConstructor