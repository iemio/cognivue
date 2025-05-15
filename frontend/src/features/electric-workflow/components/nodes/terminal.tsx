import { Handle, HandleProps } from "@xyflow/react";
import React from "react";

export default function Terminal(props: HandleProps) {
    return <Handle className="w-1.5 h-1.5 border border-black" {...props} />;
}
