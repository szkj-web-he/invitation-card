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
import { FormProps } from "../Form";
import { addZero } from "../Unit/addZero";
import { encode, getStateData } from "../Unit/encode";
import { NameProps } from "./../Form/name";
import Desk from "./desk";
import Mobile from "./mobile";
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
    const [name, setName] = useState<NameProps | null>(() => {
        const data = getStateData();
        return data
            ? {
                  first: data.firName,
                  last: data.lastName,
              }
            : null;
    });
    /**
     * X是男
     * Y是女
     */
    const [gender, setGender] = useState<"X" | "Y" | null>(() => {
        const data = getStateData();
        return data?.gender ? (data.gender as "X" | "Y") : null;
    });

    const [year, setYear] = useState<number | null>(() => {
        const data = getStateData();
        return data?.year ? Number(data.year) : null;
    });
    const [month, setMonth] = useState<number | null>(() => {
        const data = getStateData();
        return data?.month ? Number(data.month) : null;
    });

    const uuid = useMemo(() => {
        const userId = comms.getRuntimeInfoNode("user_id") ?? "";
        const str = encode(
            name?.last,
            name?.first,
            gender ?? undefined,
            year ?? undefined,
            month ?? undefined,
        );

        if (show) {
            const value = `${userId}-${str}.${Date.now()}`;
            comms.state = value;
            return value;
        }
        return "";
    }, [gender, month, name, show, year]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<FormProps>;
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
            <Mobile
                uuid={uuid}
                imgLoading={imgLoading}
                name={name?.last ?? undefined}
                gender={gender ?? undefined}
                birth={`${year ?? 2022}.${addZero(2, month ?? 1)}`}
            />
        ) : (
            <Desk
                uuid={uuid}
                imgLoading={imgLoading}
                name={name?.last ?? undefined}
                gender={gender ?? undefined}
                birth={`${year ?? 2022}.${addZero(2, month ?? 1)}`}
            />
        );
    }

    return <></>;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
