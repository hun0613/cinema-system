import { Room } from "@/components/Book/Room/One";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export const getFetchRoomQuery = (
  theaterId: number,
  roomId: number,
): UseSuspenseQueryOptions<Room, unknown> => {
  return {
    queryKey: ["room", theaterId, roomId],
    queryFn: async () => {
      const res = await axios.get(
        `/book/api/room?theater_id=${theaterId}&room_id=${roomId}`,
        {
          ...header,
        },
      );
      return res.data[0];
    },
  };
};
