import React, { useState } from "react";

export default function HitEffect() {

    const [end, setEnd] = useState(false);

    return end ? null : (
        <div className="hit-effect" onAnimationEnd={() => setEnd(true)}>
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
            <div className="spark"></div>
        </div>
    );
}