import { useState } from "react"

export default function useAudio() {

    const [playing, setPlaying] = useState(false);
    const [startAt, setStartAt] = useState(0);

    return {
        playing: playing,
        play() {
            setPlaying(true);
            setStartAt(Date.now());
        },
        stop() {
            setPlaying(false);
            setStartAt(0);
        },
        currentTime() {
            return Date.now() - startAt;
        }
    }
}