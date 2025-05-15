import { Node, useReactFlow } from "@xyflow/react";
import React, { useState } from "react";
import { ElectricalComponentData, ElectricalComponentType } from "../../types";
import { getUnit } from "../../utils";
import { Input } from "@/components/ui/input";

export default function ComponentDetail({
    node,
}: {
    node: Node<ElectricalComponentData>;
}) {
    const nodeType = node?.data?.type || node?.type;
    const [value, setValue] = useState(`${node?.data?.value || 0}`);

    const { updateNodeData } = useReactFlow();
    const unit = getUnit(nodeType as ElectricalComponentType);

    return (
        <div>
            <h1 className="xs">{nodeType?.toUpperCase()}</h1>
            {node?.data?.value && (
                <div className="mt-2">
                    <Input
                        value={value}
                        //eslint-disable-next-line @typescript-eslint/no-unused-vars
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => {
                            const newValue = e.target.value
                                ? parseFloat(e.target.value)
                                : 0;
                            setValue(newValue.toString());
                            updateNodeData(node.id, { value: newValue });
                        }}
                    />
                    {unit}
                </div>
            )}
        </div>
    );
}
