import React, { useEffect, useState } from "react";
import useAudio from "../hooks/useAudio";
import useFlowManager from "../hooks/useFlowManager";
import useHitKey from "../hooks/useHitKey";

import { BeatInfo } from "../types/BeatInfo";
import Bar from "./Bar";
import HitEffect from "./HitEffect";
import Note from "./Note";

import "./Score.css";

type Props = {
    beats: BeatInfo[],
    playing: boolean,
    onLoaded: () => void,
}

export default function Score(props: Props) {

    const flow = useFlowManager(props.beats);

    const music = useAudio();

    const [beatCursor, setBeatCursor] = useState(-1);

    const [effects, setEffects] = useState<boolean[]>([]);

    useHitKey("KeyA", handleHit);

    // notice loaded.
    useEffect(() => {
        if (flow.loaded) props.onLoaded();
    }, [flow.loaded])

    // control playing music.
    useEffect(() => {

        if (!flow.loaded) return;

        if (!props.playing) {
            music.stop();
            return;
        }

        if (music.playing) return;

        const preCount = flow.getPreCount();

        if (preCount > 0) {
            setTimeout(() => {
                music.play();
            }, preCount);

        } else {
            music.play();
        }

    }, [props.playing, flow.loaded, music.playing]);

    // control flowing items.
    useEffect(() => {

        if (!flow.loaded) return;

        if (!props.playing) {
            flow.reset();
            return;
        }

        if (!flow.hasNext()) return;

        if (flow.beginning()) {
            flow.flowNext();
        } else {
            const nextTime = flow.getNextTime();
            const currentTime = music.playing
                ? music.currentTime()
                : flow.getPreviousTime();
            const timeout = nextTime - currentTime;
            setTimeout(() => {
                flow.flowNext();
            }, timeout);
        }

    }, [props.playing, flow.loaded, flow.cursor]);

    // put forward the beat cursor for judging.
    useEffect(() => {

        if (!flow.loaded) return;

        if (!props.playing) {
            setBeatCursor(0);
            return;
        }

        let timeout = 0;
        if (beatCursor == -1) {
            timeout = flow.getFirstFlowDuration();
        } else {
            const nextTime = props.beats[beatCursor + 1]?.time;
            if (!nextTime) return;
            const currentTime = music.playing
                ? music.currentTime()
                : props.beats[beatCursor]?.time ?? 0;
            timeout = nextTime - currentTime;
        }

        setTimeout(() => {
            setBeatCursor(beatCursor + 1);
        }, timeout);

    }, [props.playing, flow.loaded, beatCursor])

    // judge on hitting the key.
    function handleHit() {

        if (!props.playing || !music.playing) return;

        const targetBeats = [beatCursor - 1, beatCursor, beatCursor + 1];

        targetBeats.some(beatIndex => {
            const beat = props.beats[beatIndex];
            const notes = beat?.notes;
            if (!notes) return false;
            return notes.some((note, noteIndex) => {
                const hitTime = music.currentTime();
                const noteTime = beat.time + note.offset;
                if (noteTime - 50 <= hitTime && hitTime <= noteTime + 50) {
                    console.log(`hit! gap: ${hitTime - noteTime}`);
                    const id = flow.getNoteId(beatIndex, noteIndex);
                    flow.hit(id);
                    setEffects([...effects, true]);
                }
            });
        });
    }

    return (
        <div id="score">
            <div id="score-body">

                <div id="frame"></div>
                {effects.map((_,i) => <HitEffect key={i}/>)}

                {flow.getBarsInReverseOrder().map(bar =>
                    <Bar
                        key={bar.id}
                        id={bar.id}
                        status={flow.getStatus(bar.id)}
                        duration={flow.getDuration(bar.id)}
                    />
                )}

                {flow.getNotesInReverseOrder().map(note =>
                    <Note
                        key={note.id}
                        id={note.id}
                        status={flow.getStatus(note.id)}
                        duration={flow.getDuration(note.id)}
                    />
                )}
            </div>
        </div>
    );
}