import HeaderReducer, { IHeaderInitialState } from '@components/RightPanel/components/Header/Header.reducer'
import browseAppReducer, { IBrowseAppState } from '../app/browse-app/browse-app.reducer'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import LeftPanelReducer, { ILeftPanelInitialState } from '@components/LeftPanel/LeftPanel.reducer'
import HighlightReducer from '@components/RightPanel/components/HighLights/Highlights.reducer'

export interface IRootState {
  browseApp: IBrowseAppState;
  header: IHeaderInitialState
  leftPanel : ILeftPanelInitialState
  highlight : IHeaderInitialState
}


const rootReducer = combineReducers(
  {
    browseApp: browseAppReducer,
    header: HeaderReducer,
    leftPanel: LeftPanelReducer,
    highlights: HighlightReducer,
  },
)
export type AppState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

export default rootReducer