export type BeatInfo = {
    isFirst: boolean,
    time: number,
    duration: number,
    notes: NoteInfo[]
}

export type NoteInfo = {
    offset: number,
    // result: "bad" | "good" | "perfect"
}