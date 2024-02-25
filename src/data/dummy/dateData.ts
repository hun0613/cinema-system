// export interface DateType {
//   date: string; // 날짜 (YYYYMMDD);
//   week: string; // 요일 (월 ~ 일);
//   holiday_yn: string; // 공휴일 여부 (Y/N);
// }

// export const dateData: DateType[] = [
//   {
//     date: "20240222",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240223",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240224",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240225",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240226",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240227",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240228",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240229",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240301",
//     week: "금",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240302",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240303",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "202400304",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240305",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240306",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240307",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240308",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240309",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240310",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240311",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240312",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240313",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240314",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240315",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240316",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240317",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240318",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240319",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240320",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240321",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240322",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240323",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240324",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240325",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240326",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240327",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240328",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240329",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240330",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240331",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240401",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240402",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240403",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240404",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240405",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240406",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240407",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240408",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240409",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240410",
//     week: "수",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240411",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240412",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240413",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240414",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240415",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240416",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240417",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240418",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240419",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240420",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240421",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240422",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240423",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240424",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240425",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240426",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240427",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240428",
//     week: "일",
//     holiday_yn: "Y",
//   },
//   {
//     date: "20240429",
//     week: "월",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240430",
//     week: "화",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240501",
//     week: "수",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240502",
//     week: "목",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240503",
//     week: "금",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240504",
//     week: "토",
//     holiday_yn: "N",
//   },
//   {
//     date: "20240505",
//     week: "일",
//     holiday_yn: "Y",
//   },
// ];
