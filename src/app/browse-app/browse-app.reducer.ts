import { TBrowseAppAction } from './browse-app.action'

export interface IBrowseAppState {
    // eslint-disable-next-line
    weatherData: Record<string, any >
}

const initialState:IBrowseAppState = {
  weatherData: {},
}

const browseAppReducer = (state = initialState, action: TBrowseAppAction):IBrowseAppState => {
  switch (action.type) {
  case '@@browseApp/SET_WEATHER':
    return {
      ...state,
      weatherData: action.payload,
    }

  default:
    return state
  }

}

export default browseAppReducer