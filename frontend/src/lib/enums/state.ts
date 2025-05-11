export enum State {
    LOADING = "Loading",
    ERROR = "Error",
    READY = "Ready",
}

export type StateType = keyof typeof State;
