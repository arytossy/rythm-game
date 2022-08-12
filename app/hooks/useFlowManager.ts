import { useEffect, useState } from "react";
import { testShowingBeats } from "../consts/TestBeats";
import { BeatInfo } from "../types/BeatInfo";

export default function useFlowManager(beats: BeatInfo[]) {

    type FlowingList = Array<{
        id: string
    }>;

    type StatusMap = {
        [id: string]: "standby" | "flowing" | "hit"
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

    let _tmpStatuses = { ...statuses };

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

    function getBarId(beatIndex: number) {
        return `bar_${beatIndex}`;
    }

    function getNoteId(beatIndex: number, noteIndex: number) {
        return `note_${beatIndex}_${noteIndex}`;
    }

    return {
        loaded: loaded,
        cursor: cursor,
        getBarId: getBarId,
        getNoteId: getNoteId,

        getBarsInReverseOrder() {
            return bars.slice().reverse();
        },

        getNotesInReverseOrder() {
            return notes.slice().reverse();
        },

        getPreCount() {
            const firstFlowTime = queue[0]?.time ?? 0;
            return firstFlowTime < 0 ? -firstFlowTime : 0;
        },

        getFirstFlowDuration() {
            const firstItemId = queue[0]?.items[0]?.id;
            if (firstItemId) {
                return durations[firstItemId] ?? 0;
            } else {
                return 0;
            }
        },

        getStatus(id: string) {
            return statuses[id] ?? "standby";
        },

        getDuration(id: string) {
            return durations[id] ?? 0;
        },

        getPreviousTime() {
            return queue[cursor - 1]?.time ?? 0;
        },

        getNextTime() {
            return queue[cursor]?.time ?? 0;
        },

        beginning() {
            return cursor == 0;
        },

        hasNext() {
            return queue[cursor] ? true : false;
        },

        flowNext() {
            const target = queue[cursor];
            if (!target) return 0;
            target.items.forEach(item => {
                _tmpStatuses[item.id] = "flowing";
            });
            setStatuses(_tmpStatuses);
            setCursor(cursor + 1);
            return target.time;
        },

        hit(id: string) {
            _tmpStatuses[id] = "hit";
            setStatuses(_tmpStatuses);
        },

        reset() {
            const copied = { ...statuses };
            for (const id in copied) {
                copied[id] = "standby";
            }
            setCursor(0);
            setStatuses(copied);
        },
    }
}