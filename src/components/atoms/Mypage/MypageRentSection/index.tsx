export type MypageRentSectionProps = {
  rentInfo: TRentInfo;
  isProfile: boolean;
  isRecent: boolean;
};
export type TRentInfo = {
  umbrellaUuid: number;
  rentedAt: string;
  rentedStore: string;
  returnedDue: string;
  returnAt: string;
  returned: boolean;
  refunded: boolean;
};

const MypageRentSection = ({ rentInfo, isProfile, isRecent }: MypageRentSectionProps) => {
  const { umbrellaUuid, rentedAt, rentedStore, returnAt, returned, refunded } = rentInfo;
  const rentInfoContent = [
    ["우산 번호", String(umbrellaUuid)],
    ["대여 일자", rentedAt],
    ["대여 지점", rentedStore],
    ["반납 기한", returnAt],
    ["반납 일자", returnAt],
    ["반납 여부", returned],
    ["환급 여부", refunded],
  ];
  const color =
    isRecent && !returned ? `bg-primary-100 border-primary-300` : `bg-white border-gray-200`;
  const padding = isProfile ? `p-20` : `xl:p-24 lg:p-20`;

  return (
    <div className={`flex ${padding} ${color} border text-gray-700 border-solid rounded-12 w-full`}>
      <div className="flex flex-col text-15">
        {rentInfoContent.map((info, index) => {
          if (index === 0) {
            if (typeof info[1] === "string" && info[1].length === 1) {
              info[1] = "0" + info[1];
            }
            info[1] += "번";
          }
          if (index === 5) {
            info[1] = info[1] ? "반납 완료" : "반납 전";
          }
          if (index === 6) {
            //환급여부
            if (!info[1]) {
              //환급 전
              if (returned) {
                // 반납완료 & 환급전
                info[1] = "환급 중";
              } else {
                // 반납 전 & 환급전
                info[1] = "환급 전";
              }
            } else {
              //환급 완료
              if (returned) {
                // 반납완료 & 환급완료
                info[1] = "환급 완료";
              }
            }
          }
          if (index === rentInfoContent.length - 1) {
            return (
              <div key={index} className="flex">
                <p className="mr-16 font-semibold">{info[0]}</p>
                <p className="font-normal">{info[1]}</p>
              </div>
            );
          }
          return (
            <div key={index} className="flex mb-8">
              <p className="mr-16 font-semibold">{info[0]}</p>
              <p className="font-normal">{info[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MypageRentSection;
