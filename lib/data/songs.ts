export type SongStep = { note: string; beats: number }
export type Difficulty = "easy" | "medium" | "hard"
export type Song = { id: string; title: string; difficulty: Difficulty; notes: SongStep[] }

function notes(...pairs: [string, number?][]): SongStep[] {
  return pairs.map(([note, beats = 1]) => ({ note, beats }))
}

export const SONGS: Song[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    difficulty: "easy",
    notes: notes(
      ["C4"], ["C4"], ["G4"], ["G4"], ["A4"], ["A4"], ["G4", 2],
      ["F4"], ["F4"], ["E4"], ["E4"], ["D4"], ["D4"], ["C4", 2],
      ["G4"], ["G4"], ["F4"], ["F4"], ["E4"], ["E4"], ["D4", 2],
      ["G4"], ["G4"], ["F4"], ["F4"], ["E4"], ["E4"], ["D4", 2],
      ["C4"], ["C4"], ["G4"], ["G4"], ["A4"], ["A4"], ["G4", 2],
      ["F4"], ["F4"], ["E4"], ["E4"], ["D4"], ["D4"], ["C4", 2]
    ),
  },
  {
    id: "mary",
    title: "Mary Had a Little Lamb",
    difficulty: "easy",
    notes: notes(
      ["E4"], ["D4"], ["C4"], ["D4"], ["E4"], ["E4"], ["E4", 2],
      ["D4"], ["D4"], ["D4", 2], ["E4"], ["G4"], ["G4", 2],
      ["E4"], ["D4"], ["C4"], ["D4"], ["E4"], ["E4"], ["E4"], ["E4"],
      ["D4"], ["D4"], ["E4"], ["D4"], ["C4", 2]
    ),
  },
  {
    id: "hot-cross-buns",
    title: "Hot Cross Buns",
    difficulty: "easy",
    notes: notes(
      ["E4"], ["D4"], ["C4", 2],
      ["E4"], ["D4"], ["C4", 2],
      ["C4", 0.5], ["C4", 0.5], ["C4", 0.5], ["C4", 0.5],
      ["D4", 0.5], ["D4", 0.5], ["D4", 0.5], ["D4", 0.5],
      ["E4"], ["D4"], ["C4", 2]
    ),
  },
  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    difficulty: "easy",
    notes: notes(
      ["E4"], ["E4"], ["F4"], ["G4"],
      ["G4"], ["F4"], ["E4"], ["D4"],
      ["C4"], ["C4"], ["D4"], ["E4"],
      ["E4", 1.5], ["D4", 0.5], ["D4", 2],
      ["E4"], ["E4"], ["F4"], ["G4"],
      ["G4"], ["F4"], ["E4"], ["D4"],
      ["C4"], ["C4"], ["D4"], ["E4"],
      ["D4", 1.5], ["C4", 0.5], ["C4", 2]
    ),
  },
  {
    id: "jingle-bells",
    title: "Jingle Bells",
    difficulty: "easy",
    notes: notes(
      ["E4"], ["E4"], ["E4", 2],
      ["E4"], ["E4"], ["E4", 2],
      ["E4"], ["G4"], ["C4"], ["D4"], ["E4", 2],
      ["F4"], ["F4"], ["F4"], ["F4"],
      ["F4"], ["E4"], ["E4"], ["E4"],
      ["E4"], ["D4"], ["D4"], ["E4"], ["D4", 2], ["G4", 2]
    ),
  },
  {
    id: "row-row-row",
    title: "Row, Row, Row Your Boat",
    difficulty: "easy",
    notes: notes(
      ["C4"], ["C4"], ["C4"], ["D4"], ["E4", 2],
      ["E4"], ["D4"], ["E4"], ["F4"], ["G4", 2],
      ["C5", 0.5], ["C5", 0.5], ["C5", 0.5], ["G4", 0.5], ["G4", 0.5], ["G4", 0.5], ["E4", 0.5], ["E4", 0.5], ["E4", 0.5], ["C4", 0.5], ["C4", 0.5], ["C4", 0.5],
      ["G4"], ["F4"], ["E4"], ["D4"], ["C4", 2]
    ),
  },
  {
    id: "london-bridge",
    title: "London Bridge",
    difficulty: "easy",
    notes: notes(
      ["G4"], ["A4"], ["G4"], ["F4"], ["E4"], ["F4"], ["G4", 2],
      ["D4"], ["E4"], ["F4", 2], ["E4"], ["F4"], ["G4", 2],
      ["G4"], ["A4"], ["G4"], ["F4"], ["E4"], ["F4"], ["G4", 2],
      ["D4"], ["G4"], ["E4"], ["C4", 2]
    ),
  },
  {
    id: "frere-jacques",
    title: "Frère Jacques",
    difficulty: "easy",
    notes: notes(
      ["C4"], ["D4"], ["E4"], ["C4"],
      ["C4"], ["D4"], ["E4"], ["C4"],
      ["E4"], ["F4"], ["G4", 2],
      ["E4"], ["F4"], ["G4", 2],
      ["G4"], ["A4"], ["G4"], ["F4"], ["E4"], ["C4", 2],
      ["G4"], ["A4"], ["G4"], ["F4"], ["E4"], ["C4", 2],
      ["C4"], ["G4", 0.5], ["C4", 2],
      ["C4"], ["G4", 0.5], ["C4", 2]
    ),
  },
  {
    id: "when-the-saints",
    title: "When the Saints Go Marching In",
    difficulty: "easy",
    notes: notes(
      ["C4"], ["E4"], ["F4"], ["G4", 2],
      ["C4"], ["E4"], ["F4"], ["G4", 2],
      ["C4"], ["E4"], ["F4"], ["G4"], ["F4"], ["E4"], ["C4"],
      ["E4"], ["F4"], ["G4"], ["F4"], ["E4"], ["C4", 2]
    ),
  },
  {
    id: "this-old-man",
    title: "This Old Man",
    difficulty: "easy",
    notes: notes(
      ["G4"], ["G4"], ["G4"], ["E4", 2],
      ["A4"], ["A4"], ["G4", 2],
      ["G4"], ["E4"], ["G4", 2],
      ["G4"], ["G4"], ["G4"], ["E4", 2],
      ["A4"], ["A4"], ["G4", 2],
      ["F4"], ["D4"], ["C4", 2]
    ),
  },
  {
    id: "happy-birthday",
    title: "Happy Birthday",
    difficulty: "medium",
    notes: notes(
      ["C4", 0.5], ["C4", 0.5], ["D4"], ["C4"], ["F4"], ["D#4", 2],
      ["C4", 0.5], ["C4", 0.5], ["D4"], ["C4"], ["G4"], ["F4", 2],
      ["C4", 0.5], ["C4", 0.5], ["C5"], ["G#4"], ["F4"], ["D#4"], ["D4", 2],
      ["A#4", 0.5], ["A#4", 0.5], ["G#4"], ["F4"], ["G4"], ["F4", 2]
    ),
  },
  {
    id: "minuet-in-g",
    title: "Minuet in G (Opening)",
    difficulty: "hard",
    notes: notes(
      ["C5"], ["F4", 0.5], ["G4", 0.5], ["A4"], ["A#4"], ["C5", 0.5], ["F4", 0.5], ["F4", 2],
      ["C5", 0.5], ["F4", 0.25], ["G4", 0.25], ["A4", 0.5], ["A#4", 0.5], ["C5", 0.25], ["F4", 0.25], ["F4"]
    ),
  },
]
