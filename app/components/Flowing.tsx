import React, { useEffect, useState } from "react";

import "./Flowing.css";

export type FlowingProps = {
    id: string,
    status: null | "standby" | "flowing" | "hit",
    duration: null | number,
    // onTerminate: (id: string) => void,
}

type MetaProps = {
    shape: "note" | "bar",
}

export default function Flowing(props: MetaProps & FlowingProps) {

    const [end, setEnd] = useState(false);

    useEffect(() => {
        if (props.status == "standby") {
            setEnd(false);
        }
    }, [props.status])

    function handleMoveEnd() {
        setEnd(true);
    }

    return end ? null : (
        <div
            className={`${props.shape} ${props.status}`}
            style={{ transitionDuration: `${(props.duration ?? 0) * 2}ms` }}
            onTransitionEnd={handleMoveEnd}
            onAnimationEnd={handleMoveEnd}
        />
    );
}
