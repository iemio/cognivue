import { Edge, Node } from "@xyflow/react";
import { Battery, Bulb, Capacitor, Inductor, Resistor, Board } from "../icons";
import { ElectricalComponentType } from "../types";
import { JSX } from "react";
export const initialEdges: Edge[] = [];
export const initialNodes: Node[] = [];

interface ComponentDefinitionWithProps {
    icon: React.ComponentType<any> | (() => JSX.Element);
    type: ElectricalComponentType;
    label: string;
    props?: any; // Or a more specific type for props
}

export const COMPONENTS: ComponentDefinitionWithProps[] = [
    {
        icon: Resistor,
        type: ElectricalComponentType.Resistor,
        label: "Resistor",
        props: { height: 16 },
    },
    {
        icon: Capacitor,
        type: ElectricalComponentType.Capacitor,
        label: "Capacitor",
        props: { height: 16 },
    },
    {
        icon: Inductor,
        type: ElectricalComponentType.Inductor,
        label: "Inductor",
        props: { height: 8 },
    },
    {
        icon: Battery,
        type: ElectricalComponentType.Battery,
        label: "Battery",
        props: { height: 24 },
    },
    {
        icon: Bulb,
        type: ElectricalComponentType.Bulb,
        label: "Bulb",
        props: { color: "black", height: 24, isOn: true },
    },
    {
        icon: Board,
        type: ElectricalComponentType.Board,
        label: "Bulb",
    },
];
