export interface RoomType {
  roomId: number;
  row: string[];
  col: string[];
  sp: number[];
  ep: number[];
}

export const RoomData: RoomType[] = [
  {
    roomId: 1,
    row: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    col: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    sp: [0, 3, 12],
    ep: [2, 11, 14],
  },
  {
    roomId: 2,
    row: ["A", "B", "C", "D", "E", "F", "G", "H"],
    col: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
    sp: [0],
    ep: [9],
  },
  {
    roomId: 3,
    row: ["A", "B", "C", "D", "E", "F", "G", "H"],
    col: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    sp: [0, 2, 13],
    ep: [1, 12, 14],
  },
  {
    roomId: 4,
    row: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    col: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    sp: [0, 2, 13],
    ep: [1, 12, 14],
  },
  {
    roomId: 5,
    row: ["A", "B", "C", "D", "E", "F"],
    col: ["01", "02", "03", "04", "05", "06"],
    sp: [0, 2, 4],
    ep: [1, 3, 5],
  },
  {
    roomId: 6,
    row: ["A", "B", "C", "D", "E", "F", "G", "H"],
    col: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ],
    sp: [0, 2, 10],
    ep: [1, 9, 11],
  },
  {
    roomId: 7,
    row: ["A", "B", "C", "D", "E", "F", "G", "H"],
    col: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
    sp: [0],
    ep: [9],
  },
  {
    roomId: 8,
    row: ["A", "B", "C", "D", "E", "F", "G", "H"],
    col: ["01", "02", "03", "04", "05", "06", "07", "08"],
    sp: [0, 2, 6],
    ep: [1, 5, 7],
  },
  {
    roomId: 9,
    row: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    col: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
    ],
    sp: [0, 2, 13],
    ep: [1, 12, 14],
  },
];