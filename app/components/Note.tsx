import React from "react";

import Flowing, { FlowingProps } from "./Flowing";

export default function Note(props: FlowingProps) {

    return <Flowing shape="note" {...props} />
}