import React, { useEffect } from "react";
import useAudio from "../hooks/useAudio";
import useFlowManager from "../hooks/useFlowManager";

import { BeatInfo } from "../types/BeatInfo";
import Bar from "./Bar";
import Note from "./Note";

import "./Score.css";

type Props = {
    beats: BeatInfo[],
    playing: boolean,
    onLoaded: () => void,
}

export default function Score(props: Props) {

    const manager = useFlowManager(props.beats);

    const music = useAudio();

    // notice loaded.
    useEffect(() => {
        if (manager.loaded) props.onLoaded();
    }, [manager.loaded])

    // control playing music.
    useEffect(() => {

        if (!manager.loaded) return;

        if (!props.playing) {
            music.stop();
            return;
        }

        if (music.playing) return;

        const preCount = manager.getPreCount();

        if (preCount > 0) {
            setTimeout(() => {
                music.play();
            }, preCount);

        } else {
            music.play();
        }

    }, [props.playing, manager.loaded, music.playing]);

    // control flowing items.
    useEffect(() => {

        if (!manager.loaded) return;

        if (!props.playing) {
            manager.reset();
            return;
        }

        if (!manager.hasNext()) return;

        if (manager.beginning()) {
            manager.flowNext();
        } else {
            const nextTime = manager.getNextTime();
            const currentTime = music.playing
                ? music.currentTime()
                : manager.getPreviousTime();
            const timeout = nextTime - currentTime;
            setTimeout(() => {
                manager.flowNext();
            }, timeout);
        }

    }, [props.playing, manager.loaded, manager.cursor]);

    return (
        <div id="score">
            <div id="score-body">

                <div id="frame"></div>

                {manager.getBarsInReverseOrder().map(bar =>
                    <Bar
                        key={bar.id}
                        id={bar.id}
                        status={manager.getStatus(bar.id)}
                        duration={manager.getDuration(bar.id)}
                    />
                )}

                {manager.getNotesInReverseOrder().map(note =>
                    <Note
                        key={note.id}
                        id={note.id}
                        status={manager.getStatus(note.id)}
                        duration={manager.getDuration(note.id)}
                    />
                )}
            </div>
        </div>
    );
}