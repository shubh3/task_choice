import { combineReducers } from '@reduxjs/toolkit'
import reducers, {
    SLICE_NAME,
    EducationalInfoState,
} from './educationalInfoSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: EducationalInfoState
        }
    }
> = useSelector

export * from './educationalInfoSlice'
export { useAppDispatch } from '@/store'
export default reducer
