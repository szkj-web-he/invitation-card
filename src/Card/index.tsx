/**
 * @file
 * @date 2022-10-24
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useMemo, useState } from "react";
import { comms } from "..";
import { addZero } from "../Unit/addZero";
import { chineseReg, encode } from "../Unit/encode";
import Desk from "./desk";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    eventId: string;
    isSmall: boolean;
    imgLoading: boolean;
    show: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ isSmall, eventId, imgLoading, show }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [name, setName] = useState<string | null>(null);
    /**
     * X是男
     * Y是女
     */
    const [gender, setGender] = useState<"X" | "Y" | null>(null);

    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);

    const uuid = useMemo(() => {
        const userId = comms.getRuntimeInfoNode("user_id") ?? "01GFWXVBBT553VVH1MBQRV4S9K";
        let str = "";
        str += name && chineseReg.test(name) ? encode(name) : name ?? "";
        str += gender ?? "";
        str += year ? `${year}` : "";
        str += month ? `${month}` : "";
        const value = `${userId}-${str}`;
        comms.state = value;
        return value;
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
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    if (show) {
        return isSmall ? (
            <></>
        ) : (
            <Desk
                uuid={uuid}
                imgLoading={imgLoading}
                name={name ?? undefined}
                gender={gender ?? undefined}
                birth={`${year ?? 2022}.${addZero(2, month ?? 1)}`}
            />
        );
    }

    return <></>;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
