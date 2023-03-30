/**
 * @file 姓名
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { Dropdown } from "../Components/Dropdown";
import { DropdownBtn } from "../Components/DropdownBtn";
import { DropdownContent } from "../Components/DropdownContent";
import { Icon } from "../Components/Icon";
import { chineseReg } from "../Unit/encode";
import { useEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    handleChange: (res?: NameProps) => void;
    value?: NameProps;
}

export interface NameProps {
    first: string;
    last: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleChange, value }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    // const [firstNameVisible, setFirstNameVisible] = useState(false);
    // const firstNameVisibleRef = useRef(false);

    // const [lastNameVisible, setLastNameVisible] = useState(false);
    // const lastNameVisibleRef = useRef(false);

    const [visible, setVisible] = useState(false);

    const firstNameVal = useRef<string>();
    const lastNameVal = useRef<string>();

    const lastRef = useRef<HTMLInputElement | null>(null);
    const firstRef = useRef<HTMLInputElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        if (lastRef.current) {
            lastRef.current.value = value?.last ?? "";
        }

        if (firstRef.current) {
            firstRef.current.value = value?.first ?? "";
        }
    }, [value]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleValueChange = () => {
        const arr = [lastNameVal.current, firstNameVal.current];

        const englishReg = /^[a-z]+[.' ]*[a-z]*$/i;
        let status = true;
        for (let i = 0; i < arr.length; ) {
            const value = arr[i];
            if (value && (chineseReg.test(value) || englishReg.test(value)) && value.length < 50) {
                ++i;
            } else {
                status = false;
                i = arr.length;
            }
        }

        if (status) {
            setVisible(false);
            handleChange({
                first: firstNameVal.current ?? "",
                last: lastNameVal.current ?? "",
            });
            return;
        }
        setVisible(true);
        handleChange();
    };

    const handleLastNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        lastNameVal.current = value;

        handleValueChange();
    };

    const handleFirstNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        firstNameVal.current = value;

        handleValueChange();
    };

    const hiddenFn = () => {
        setVisible(false);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="fullName">
            <div className="name">姓名</div>
            <Dropdown
                placement="ct"
                triangle={{
                    width: "20px",
                    height: "10px",
                    color: "#fff",
                }}
            >
                <DropdownBtn className="useName_wrap">
                    <input
                        type="text"
                        placeholder="姓氏"
                        className="lastName_ipt"
                        onBlur={handleLastNameBlur}
                        onFocus={hiddenFn}
                        ref={lastRef}
                    />
                    <input
                        type="text"
                        placeholder="名字"
                        className="firstName_ipt"
                        onBlur={handleFirstNameBlur}
                        onFocus={hiddenFn}
                        ref={firstRef}
                    />
                </DropdownBtn>
                <DropdownContent bodyClassName="errorBody" show={visible}>
                    <Icon type="warning" className="errorIcon" />
                    请输入正确的姓名
                </DropdownContent>
            </Dropdown>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
