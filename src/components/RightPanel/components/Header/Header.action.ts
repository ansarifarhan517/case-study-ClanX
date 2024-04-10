export interface IHeaderSetDegree {
    readonly type: "@@Header/SET_DEGREE"
    payload: string
}

export type THeaderActions = IHeaderSetDegree