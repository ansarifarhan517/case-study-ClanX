import { TLeftPanelActions } from './LeftPanel.action'

export interface ILeftPanelInitialState {
 city : string
}

const initialState:ILeftPanelInitialState = {
  city : '',
}

const LeftPanelReducer = (state = initialState, action:TLeftPanelActions):ILeftPanelInitialState => {
  switch (action.type) {
  case '@@LeftPanel/SET_CITY':
    return {
      ...state,
      city: action.payload,
    }

  default:
    return state
  }
}


export default LeftPanelReducer