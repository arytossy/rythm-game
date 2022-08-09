import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import Score from "./components/Score";

import "./App.css";
import { testBeats } from "./consts/TestBeats";
import { BeatInfo } from "./types/BeatInfo";

function App() {

    // the beats master of this music.
    const [beats] = useState<BeatInfo[]>(testBeats[3] ?? []);

    const [ready, setReady] = useState(false);
    const [playing, setPlaying] = useState(false);

    function handleLoaded() {
        setReady(true);
    }

    function handleStart() {
        setPlaying(true);
    }

    function handleReset() {
        setPlaying(false);
    }

    return (
        <div id="app">
            <Score
                beats={beats}
                onLoaded={handleLoaded}
                playing={playing}
            />
            <button onClick={handleStart} disabled={!ready || playing}>START!</button>
            <button onClick={handleReset} disabled={!playing}>RESET...</button>
        </div>
    );
};

export default hot(App);