export interface ILeftPanelSetCity {
    readonly type : "@@LeftPanel/SET_CITY"
    payload : string
}

export type TLeftPanelActions =  | ILeftPanelSetCity 