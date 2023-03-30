/**
 * @file form入口文件
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import Birth from "./birth";
import Gender from "./gender";
import Name, { NameProps } from "./name";
import "./style.scss";
import { useEffect } from "react";
import { getStateData } from "../Unit/encode";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 提交状态
     */
    submit: (res: boolean) => void;
    /**
     * 通讯密钥
     */
    eventId: string;
}

interface SetNameData {
    type: "name";
    payload?: {
        first: string;
        last: string;
    };
}

interface SetGender {
    type: "gender";
    payload: "X" | "Y";
}

interface SetBirth {
    type: "birth";
    payload: {
        month: number;
        year: number;
    };
}

type Action = SetNameData | SetGender | SetBirth;

export interface FormProps {
    name: null | NameProps;
    gender: null | "X" | "Y";
    birthYear: null | number;
    birthMonth: null | number;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ submit, eventId }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [name, setName] = useState<NameProps | null>(() => {
        return null;
    });
    /**
     * X是男
     * Y是女
     */
    const [gender, setGender] = useState<"X" | "Y" | null>(() => {
        return null;
    });

    const [year, setYear] = useState<number | null>(() => {
        return null;
    });
    const [month, setMonth] = useState<number | null>(() => {
        return null;
    });

    const submitRef = useRef(submit);

    const eventIdRef = useRef(eventId);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    submitRef.current = submit;
    eventIdRef.current = eventId;

    useEffect(() => {
        const data = getStateData();

        setName(
            data
                ? {
                      first: data?.firName,
                      last: data?.lastName,
                  }
                : null,
        );
        setGender(data?.gender ? (data?.gender as "X" | "Y") : null);
        setYear(data?.year ? Number(data.year) : null);
        setMonth(data?.month ? Number(data.month) : null);
    }, []);

    useEffect(() => {
        submitRef.current(name?.first && name.last && gender && year && month ? true : false);

        const event = new CustomEvent(eventIdRef.current, {
            detail: {
                name: { ...name },
                gender,
                birthYear: year,
                birthMonth: month,
            },
        });
        document.dispatchEvent(event);
    }, [name, gender, year, month]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const setFormData = (action: Action) => {
        switch (action.type) {
            case "name":
                setName(
                    action.payload
                        ? {
                              first: action.payload.first,
                              last: action.payload.last,
                          }
                        : null,
                );
                break;
            case "gender":
                setGender(action.payload);
                break;
            case "birth":
                setYear(action.payload.year);
                setMonth(action.payload.month);
                break;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`form_wrap`}>
            <Name
                value={name ?? undefined}
                handleChange={(res) => {
                    setFormData({
                        type: "name",
                        payload: res,
                    });
                }}
            />
            <Gender
                value={gender ?? undefined}
                handleChange={(res: "X" | "Y") => {
                    setFormData({
                        type: "gender",
                        payload: res,
                    });
                }}
            />
            <Birth
                year={year ?? undefined}
                month={month ?? undefined}
                handleChange={(year: number, month: number) => {
                    setFormData({
                        type: "birth",
                        payload: {
                            month,
                            year,
                        },
                    });
                }}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
