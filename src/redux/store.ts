import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducers'
import rootSaga from './rootSaga'
import { useSelector as primitiveSelector } from 'react-redux'

const sagaMiddleware = createSagaMiddleware()
// @ts-expect-error will fix later
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export const useSelector = primitiveSelector
export default store
