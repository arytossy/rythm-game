import { BeatInfo } from "../types/BeatInfo";

let bpm = 60;
let beatCursor = 0;
let noteCursor = 0;

function getDuration() {
    return 60 * 1000 / bpm;
}

function setBpm(val: number) {
    bpm = val;
    return true;
}

function getTime(reset: boolean = false) {
    if (reset) beatCursor = 0;
    const returnVal = beatCursor;
    beatCursor += getDuration();
    noteCursor = 0;
    return returnVal;
}

function getOffset(quality: 1|2|3|4, tie: number = 1) {
    const returnVal = noteCursor;
    noteCursor += getDuration() / quality * tie;
    return returnVal;
}

export const testShowingBeats = 4;

export const testBeats: BeatInfo[][] = [
    [
        {
            isFirst: true,
            time: getTime(setBpm(60)),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2)},
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2)},
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(3) },
                { offset: getOffset(3) },
                { offset: getOffset(3) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(3) },
                { offset: getOffset(3) },
                { offset: getOffset(3) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
    ],
    [
        {
            isFirst: true,
            time: getTime(setBpm(120)),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: []
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4, 3) },
                { offset: getOffset(4, 1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(3, 1) },
                { offset: getOffset(3, 2) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
    ],
    [
        {
            isFirst: true,
            time: getTime(setBpm(120)),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: true,
            time: setBpm(80) ? getTime() : 0,
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: true,
            time: setBpm(200) ? getTime() : 0,
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(2) },
                { offset: getOffset(2) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
    ],
    [
        {
            isFirst: true,
            time: getTime(setBpm(200)),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: false,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
                { offset: getOffset(4) },
            ]
        },
        {
            isFirst: true,
            time: getTime(),
            duration: getDuration(),
            notes: [
                { offset: getOffset(1) },
            ]
        },
    ],
]