export enum ElectricalComponentType {
    Resistor = "resistor",
    Capacitor = "capacitor",
    Bulb = "bulb",
    Inductor = "inductor",
    Battery = "battery",
    Board = "board",
    Ground = "ground",
    Ammeter = "ammeter",
    Voltmeter = "Voltmeter",
}

export enum ElectricalComponentState {
    Add = "add",
    NotAdd = "notAdd",
}

export type ElectricalComponentData = {
    value?: number;
    type?: ElectricalComponentType;
    rotation?: number;
    state?: ElectricalComponentState;
    isAttachedToGroup?: boolean;
    isDragging?: boolean;
    visible?: boolean;
    connectable?: boolean;
};

export enum HistoryAction {
    AddNode = "addNode",
    RemoveNode = "removeNode",
    AddEdge = "addEdge",
    RemoveEdge = "removeEdge",
}
