import { MarkerType } from "@xyflow/react";
import { CustomEdge, CustomNode } from "../types";

export const initialNodes: CustomNode[] = [
    {
        id: "1",
        type: "core",
        position: { x: 400, y: 50 },
        data: { label: "Machine Learning" },
    },
    {
        id: "2",
        type: "concept",
        position: { x: 200, y: 200 },
        data: { label: "Supervised Learning" },
    },
    {
        id: "3",
        type: "concept",
        position: { x: 600, y: 200 },
        data: { label: "Unsupervised Learning" },
    },
    {
        id: "4",
        type: "definition",
        position: { x: 400, y: 350 },
        data: {
            label: "Overfitting: Model performs well on training data but poorly on new data",
        },
    },
    {
        id: "5",
        type: "example",
        position: { x: 100, y: 350 },
        data: { label: "Spam Detection in Gmail" },
    },
    {
        id: "6",
        type: "question",
        position: { x: 700, y: 350 },
        data: { label: "Why is overfitting bad?" },
    },
    {
        id: "7",
        type: "citation",
        position: { x: 300, y: 500 },
        data: { label: "(Bishop, Pattern Recognition, 2006)" },
    },
    {
        id: "8",
        type: "note",
        position: { x: 500, y: 500 },
        data: { label: "Need to study regularization" },
    },
    {
        id: "9",
        type: "fact",
        position: { x: 600, y: 500 },
        data: { label: "Gradient descent updates weights" },
    },
    {
        id: "10",
        type: "topic_group",
        position: { x: 50, y: 50 },
        data: { label: "Types of Learning", childCount: 3 },
    },
];

export const initialEdges: CustomEdge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "smoothstep",
        label: "includes",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e1-3",
        source: "1",
        target: "3",
        type: "smoothstep",
        label: "includes",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e2-4",
        source: "2",
        target: "4",
        type: "smoothstep",
        label: "explains",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e2-5",
        source: "2",
        target: "5",
        type: "smoothstep",
        label: "example of",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e4-6",
        source: "4",
        target: "6",
        type: "smoothstep",
        label: "answers",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e4-7",
        source: "4",
        target: "7",
        type: "smoothstep",
        label: "source",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e10-2",
        source: "10",
        target: "2",
        type: "smoothstep",
        label: "contains",
        labelStyle: { fontSize: 12, fontWeight: "bold" },
        markerEnd: { type: MarkerType.ArrowClosed },
    },
];
