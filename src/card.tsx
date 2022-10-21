/**
 * @file 卡片
 * @date 2022-10-21
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect } from "react";
import QRCode from "qrcode";
import { useEffect } from "react";
import { useRef } from "react";
import { comms } from "./index";
import { useState } from "react";
import { encode } from "./Unit/encode";
import { useMemo } from "react";
import iconBoy from "./Images/icon_boy.png";
import iconGirl from "./Images/icon_girl.png";
import { addZero } from "./Unit/addZero";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    eventId: string;
    show: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ eventId, show }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [name, setName] = useState<string | null>(null);
    /**
     * X是男
     * Y是女
     */
    const [gender, setGender] = useState<"X" | "Y" | null>(null);

    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);

    const uuid = useMemo(() => {
        let str = comms.getRuntimeInfoNode("user_id") ?? "01GFWXVBBT553VVH1MBQRV4S9K";
        str += name ? encode(name) : "";
        str += gender ?? "";
        str += year ? `${year}` : "";
        str += month ? `${month}` : "";
        comms.state = str;
        return str;
    }, [gender, month, name, year]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{
                name: null | string;
                gender: null | "X" | "Y";
                birthYear: null | number;
                birthMonth: null | number;
            }>;
            setName(event.detail.name);
            setGender(event.detail.gender);
            setYear(event.detail.birthYear);
            setMonth(event.detail.birthMonth);
        };

        document.addEventListener(eventId, fn);
        return () => {
            document.removeEventListener(eventId, fn);
        };
    }, [eventId]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**test */
    useEffect(() => {
        if (!ref.current || !show) {
            return;
        }
        // QRCode.
        void QRCode.toCanvas(ref.current, uuid ?? "test", {
            width: 120,
            margin: 1,
        }).then((res) => {
            console.log(res);
        });
    }, [show, uuid]);
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    if (show) {
        return (
            <div className="card_wrap">
                <div className="card_uuid">
                    <span className="card_uuidName">UUID</span>
                    <span>{uuid}</span>
                </div>
                <canvas
                    ref={ref}
                    style={{
                        margin: "0 auto 8px auto",
                        display: "block",
                    }}
                    width="120"
                    height={120}
                />
                <div className="card_row">
                    <div className="card_name">{name}</div>
                    {gender && (
                        <img src={gender === "X" ? iconBoy : iconGirl} className="card_gender" />
                    )}
                    <div className="card_split" />
                    <div className="card_birth">
                        {year}.{month && addZero(2, month)}
                    </div>
                </div>

                <div className="card_btn">下载</div>
                <div
                    className="card_des"
                    dangerouslySetInnerHTML={{
                        __html: comms.config.question ?? "",
                    }}
                />
            </div>
        );
    }
    return <></>;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
