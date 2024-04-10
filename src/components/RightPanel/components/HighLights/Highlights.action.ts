export interface IHighlightSetData{
    readonly type: "@@highlight/SET_DATA"
    payload: {
        [key:string]: any
    }

}
export type THighlightAction = IHighlightSetData