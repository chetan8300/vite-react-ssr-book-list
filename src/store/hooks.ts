import { useDispatch as useReduxDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// export const useRootDispatch: () => AppDispatch = useDispatch
export const useRootDispatch = () => useReduxDispatch<AppDispatch>()
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector