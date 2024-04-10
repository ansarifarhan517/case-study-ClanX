import { THighlightAction } from './Highlights.action'

export interface IHighlightInitialState  {
    // eslint-disable-next-line
    data:  Record<string, any>

}
const initialState:IHighlightInitialState = {
  data: {},
}

const HighlightReducer = (state = initialState, action: THighlightAction):IHighlightInitialState => {
  switch (action.type) {
  case '@@highlight/SET_DATA':
    return {
      ...state,
      data: action.payload,
    }
  default:
    return state
  }
}
export default HighlightReducer