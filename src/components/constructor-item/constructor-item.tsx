import { FC, useRef } from 'react'
import styles from './constructor-item.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
// import { MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from '../../store/actions/burger-constructor';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { TConstructorIngredient } from '../../types';
import { Identifier } from 'typescript';
import { MOVE_CONSTRUCTOR_ITEM, REMOVE_CONSTRUCTOR_ITEM } from '../../store/actions/actionTypes';
import { useAppDispatch } from '../../hooks/store';

type ConstructorItemProps = {
    ingredientData: TConstructorIngredient;
    index: number;
};

type DragItem = {
    id: string;
    index: number;
};

const ConstructorItem: FC<ConstructorItemProps> = ({ ingredientData, index }) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null)
    const [{isDragging}, dragRef] = useDrag({
        type: 'addedIngredient',
        item: {
            id: ingredientData.uuid,
            index,
        },
        collect:(monitor: any )=> ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{handlerId}, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({ //код взят из примера в документации react-dnd (за исключением вызова dispatch)
        accept: 'addedIngredient',
        collect(monitor: any) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            dispatch({ 
                type: MOVE_CONSTRUCTOR_ITEM,
                payload: { 
                    from: dragIndex,
                    to: hoverIndex
                },
            })

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        }
    });
    dragRef(dropRef(ref));
    
    const handleClose: () => void = () => {
        dispatch({ type: REMOVE_CONSTRUCTOR_ITEM, payload: ingredientData })
    }

    return (
        <div 
            ref={ref} 
            draggable 
            className={styles.constructorItem}
            style={{ opacity: isDragging ? '0' : '1' }}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredientData.name}
                price={ingredientData.price}
                thumbnail={ingredientData.image_mobile}
                handleClose={handleClose}
            />
        </div>
    )
}

export default ConstructorItem