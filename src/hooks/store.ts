import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
  } from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types/store';
  
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  
// Хук не даст отправить экшен, который ему не знаком
export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>(); 
// export const useAppDispatch: () => AppDispatch = useDispatch//doc
