import { useEffect } from "react";

export default function useHitKey(keyCode: string, onHit: () => void) {

    function handleKeyDownOnDocument(event: KeyboardEvent) {
        if (event.repeat) return;
        if (event.code == keyCode) {
            event.preventDefault();
            onHit();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDownOnDocument);
        return () => document.removeEventListener("keydown", handleKeyDownOnDocument);
    });
}