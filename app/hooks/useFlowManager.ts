import { useEffect, useState } from "react";
import { testShowingBeats } from "../consts/TestBeats";
import { BeatInfo } from "../types/BeatInfo";

export default function useFlowManager(beats: BeatInfo[]) {

    type FlowingList = Array<{
        id: string
    }>;

    type StatusMap = {
        [id: string]: "standby" | "flowing"
    };

    type DurationMap = {
        [id: string]: number;
    }

    type FlowingQueue = Array<{
        time: number,
        items: QueueItem[],
    }>;

    type QueueItem = {
        id: string,
        time: number,
        doneAt: null | number,
    }

    // items to be drawn.
    const [bars, setBars] = useState<FlowingList>([]);
    const [notes, setNotes] = useState<FlowingList>([]);

    // attributes of items to flow.
    const [statuses, setStatuses] = useState<StatusMap>({});
    const [durations, setDurations] = useState<DurationMap>({});

    // a queue to control flowing.
    const [queue, setQueue] = useState<FlowingQueue>([]);
    const [cursor, setCursor] = useState(0);

    const [loaded, setLoaded] = useState(false);

    // initialize when beats updated.
    useEffect(() => {
        setLoaded(false);
    }, [beats])

    // parse beats.
    useEffect(() => {

        if (loaded) return;

        const bars: FlowingList = [];
        const notes: FlowingList = [];
        const statuses: StatusMap = {};
        const durations: DurationMap = {};
        const queueItems: QueueItem[] = [];

        beats.map((beat, i) => {

            const flowDuration = beat.duration * testShowingBeats;
            const beatFlowTime = beat.time - flowDuration;

            if (beat.isFirst) {
                const barId = getBarId(i);
                bars.push({ id: barId });
                statuses[barId] = "standby";
                durations[barId] = flowDuration;
                queueItems.push({ id: barId, time: beatFlowTime, doneAt: null });
            }
            
            beat.notes.map((note, j) => {
                const noteId = getNoteId(i, j);
                notes.push({ id: noteId });
                statuses[noteId] = "standby";
                durations[noteId] = flowDuration;
                queueItems.push({ id: noteId, time: beatFlowTime + note.offset, doneAt: null });
            });
        });

        // merge the same time items.
        const queue = queueItems.reduce((result: FlowingQueue, item) => {
            const last = result[result.length - 1];
            if (last && last.time == item.time) {
                last.items.push(item);
            } else {
                result.push({ time: item.time, items: [item] });
            }
            return result;
        }, []);

        queue.sort((a, b) => a.time - b.time);

        setBars(bars);
        setNotes(notes);
        setStatuses(statuses);
        setDurations(durations);
        setQueue(queue);

        setLoaded(true);

    }, [loaded]);

    function getPreCount() {
        const firstFlowTime = queue[0]?.time ?? 0;
        return firstFlowTime < 0 ? -firstFlowTime : 0;
    }

    function getPreviousTime() {
        return queue[cursor - 1]?.time ?? 0;
    }

    function getNextTime() {
        return queue[cursor]?.time ?? 0;
    }

    function flowNext() {
        const target = queue[cursor];
        if (!target) return 0;
        const changed = target.items.reduce((result: StatusMap, item) => {
            result[item.id] = "flowing";
            return result;
        }, {});
        setStatuses({ ...statuses, ...changed });
        setCursor(cursor + 1);
        return target.time;
    }

    function getStatus(id: string) {
        return statuses[id] ?? "standby";
    }

    function getDuration(id: string) {
        return durations[id] ?? 0;
    }

    function reset() {
        const copied = {...statuses};
        for (const id in copied) {
            copied[id] = "standby";
        }
        setCursor(0);
        setStatuses(copied);
    }

    function hasNext() {
        return queue[cursor] ? true : false;
    }

    function beginning() {
        return cursor == 0;
    }

    function getBarId(beatIndex: number) {
        return `bar_${beatIndex}`;
    }

    function getNoteId(beatIndex: number, noteIndex: number) {
        return `note_${beatIndex}_${noteIndex}`;
    }

    function getBarsInReverseOrder() {
        return bars.slice().reverse();
    }

    function getNotesInReverseOrder() {
        return notes.slice().reverse();
    }

    return {
        loaded: loaded,
        cursor: cursor,
        getBarsInReverseOrder: getBarsInReverseOrder,
        getNotesInReverseOrder: getNotesInReverseOrder,
        getPreCount: getPreCount,
        getStatus: getStatus,
        getDuration: getDuration,
        getPreviousTime: getPreviousTime,
        getNextTime: getNextTime,
        beginning: beginning,
        hasNext: hasNext,
        flowNext: flowNext,
        reset: reset,
    }
}