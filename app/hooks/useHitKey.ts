import { useEffect, useState } from "react";

export default function useHitKey(keyCode: string) {

    const [hit, setHit] = useState(0);

    function handleKeyDownOnDocument(event: KeyboardEvent) {
        if (event.repeat) return;
        if (event.code == keyCode) {
            event.preventDefault();
            setHit(Date.now());
        }
    }

    document.addEventListener("keydown", handleKeyDownOnDocument);

    useEffect(() => {
        return () => document.removeEventListener("keydown", handleKeyDownOnDocument);
    });

    return hit;
}