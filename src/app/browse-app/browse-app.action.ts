export interface IFetchWeather {
    readonly type: "@@browseApp/FETCH_WEATHER"
}
export interface ISetWeather {
    readonly type: "@@browseApp/SET_WEATHER"
    payload: {

    }
}

export type TBrowseAppAction = ISetWeather | IFetchWeather
