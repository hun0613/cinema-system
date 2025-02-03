import { getFetchBookQuery } from "@/actions/books/useFetchBookAction";
import ModalAtom from "@/atomics/modal/ModalAtom";
import { useSuspenseQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type TicketCompProps = {
  bookId: number;
  onCloseModal: () => void;
} & JSX.IntrinsicElements["div"];

const TicketComp: React.FC<TicketCompProps> = (props) => {
  const { bookId, onCloseModal } = props;

  const router = useRouter();

  const [{ data: book }] = useSuspenseQueries({
    queries: [getFetchBookQuery(bookId)],
  });

  const handleClickConfirm = () => {
    router.push(`/`);
  };

  const printingSeat = (seatEl: string[]) => {
    let result = "";

    for (let i = 0; i < seatEl.length; i++) {
      if (i === seatEl.length - 1) {
        result = result + seatEl[i];
      } else {
        result = result + seatEl[i] + ", ";
      }
    }

    return result;
  };

  return (
    <ModalAtom onCloseModal={onCloseModal}>
      <div className="flex h-full w-full flex-col items-center justify-start p-5 tablet:p-10">
        {/* Ticket Title */}
        <div className="flex h-fit w-full flex-col items-center justify-center font-NMSNeo5 text-2xl text-borderColor/70 shadow-bgColor drop-shadow-md">
          Ticket
        </div>
        <div className="mt-1 flex h-fit w-full flex-col items-center justify-center font-NMSNeo3 text-sm text-borderColor/70 shadow-bgColor drop-shadow-md">
          예매가 완료되었습니다
        </div>
        {/* content Area */}
        <div className="my-10 flex h-fit w-full flex-col items-center justify-center tablet:flex-row">
          {/* poster */}
          <div className="mr-0 flex aspect-[3/4.3] h-[calc(100vh/3.5)] flex-col items-center justify-center rounded-sm bg-borderColor drop-shadow-lg tablet:mr-8">
            <Image
              alt="movie img"
              src={book.poster_img}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              className=" rounded-sm"
            />
          </div>
          {/* ticket info */}
          <div className="flex h-full w-full flex-col items-center justify-start">
            {/* 1 row */}
            <div className="flex h-1/3 w-full flex-row items-center justify-start border-b border-borderColor/15 p-5">
              {/* movie title */}
              <div className="flex w-fit flex-col items-center justify-center">
                {/* movie info title */}
                <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">Movie</div>
                {/* movie title */}
                <div className="mt-2 h-fit w-full text-left font-NMSNeo3 text-2xl text-borderColor/70">{book.title}</div>
              </div>
            </div>

            {/* 2row */}
            <div className="flex h-1/3 w-full flex-row items-start justify-between border-b border-borderColor/15 p-5">
              {/* theater */}
              <div className="flex w-fit flex-col items-center justify-center">
                {/* theater info title */}
                <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">Theater</div>
                {/* theater title */}
                <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">{book.name}</div>
              </div>

              {/* Date */}
              <div className="flex w-fit flex-col items-center justify-center">
                {/* Date info title */}
                <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">Date</div>
                {/* Date title */}
                <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">
                  {`${book.date.slice(4, 6)}/${book.date.slice(6, 8)}`}
                </div>
              </div>

              {/* Time */}
              <div className="flex w-fit flex-col items-center justify-center">
                {/* Time info title */}
                <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">Time</div>
                {/* Time title */}
                <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">{book.time}</div>
              </div>
            </div>

            {/* 3row */}
            <div className="flex h-1/3 w-full flex-row items-start justify-start p-5">
              {/* Screen */}
              <div className="mr-20 flex w-fit flex-col items-center justify-center">
                {/* Screen info title */}
                <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">Screen</div>
                {/* Screen title */}
                <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">{book.room_nm}관</div>
              </div>

              {/* Seat */}
              <div className="flex w-fit flex-col items-center justify-center">
                {/* Seat info title */}
                <div className="h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/40">Seat</div>
                {/* Seat title */}
                <div className="mt-2 h-fit w-full text-left font-NMSNeo4 text-sm text-borderColor/70">{printingSeat(book.seat)}</div>
              </div>
            </div>
          </div>
        </div>
        {/* confirm btn */}
        <button
          onClick={handleClickConfirm}
          type="button"
          className="mx-0 mb-3 flex h-fit  flex-col items-center justify-center rounded-xl bg-pointColor/80 p-3 px-10 font-NMSNeo3 text-sm text-fontColor hover:bg-pointColor/60 mobile:mx-3 mobile:mb-0 mobile:text-base"
        >
          홈으로 돌아가기
        </button>
      </div>
    </ModalAtom>
  );
};

export default TicketComp;
