import { THeaderActions } from './Header.action'

export interface IHeaderInitialState  {
    degree: string
}
const initialState:IHeaderInitialState = {
  degree: 'metric',
}

const HeaderReducer = (state = initialState, action: THeaderActions):IHeaderInitialState => {
  switch (action.type) {
  case '@@Header/SET_DEGREE':
    return {
      ...state,
      degree: action.payload,
    }
  default:
    return state
  }
}
export default HeaderReducer