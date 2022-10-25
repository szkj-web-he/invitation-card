/**
 * @file form入口文件
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import Birth from "./birth";
import Gender from "./gender";
import Name from "./name";
import "./style.scss";
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
    /**
     *是否是小屏
     */
    isSmall: boolean;
}

interface SetNameData {
    type: "name";
    payload?: string;
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
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ submit, eventId, isSmall }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const formData = useRef<{
        name: null | string;
        gender: null | "X" | "Y";
        birthYear: null | number;
        birthMonth: null | number;
    }>({
        name: null,
        gender: null,
        birthYear: null,
        birthMonth: null,
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const setFormData = (action: Action) => {
        switch (action.type) {
            case "name":
                formData.current.name = action.payload ?? null;
                break;
            case "gender":
                formData.current.gender = action.payload;
                break;
            case "birth":
                formData.current.birthMonth = action.payload.month;
                formData.current.birthYear = action.payload.year;
                break;
        }

        let status = true;
        for (const key in formData.current) {
            if (!formData.current[key]) {
                status = false;
            }
        }
        submit(status);

        const event = new CustomEvent(eventId, {
            detail: {
                ...formData.current,
            },
        });
        document.dispatchEvent(event);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`form_wrap${isSmall ? " form_smallWrap" : ""}`}>
            <Name
                handleChange={(res) => {
                    setFormData({
                        type: "name",
                        payload: res,
                    });
                }}
            />
            <Gender
                handleChange={(res: "X" | "Y") => {
                    setFormData({
                        type: "gender",
                        payload: res,
                    });
                }}
            />
            <Birth
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
