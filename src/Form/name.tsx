/**
 * @file 姓名
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { Dropdown } from "../Components/Dropdown/Dropdown";
import { DropdownBtn } from "../Components/Dropdown/DropdownBtn";
import { DropdownContent } from "../Components/Dropdown/DropdownContent";
import { Icon } from "../Components/Icon";
import { chineseReg } from "../Unit/encode";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    handleChange: (res?: NameProps) => void;
}

export interface NameProps {
    first: string;
    last: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleChange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [firstNameVisible, setFirstNameVisible] = useState(false);
    const firstNameVisibleRef = useRef(false);

    const [lastNameVisible, setLastNameVisible] = useState(false);
    const lastNameVisibleRef = useRef(false);

    const firstNameVal = useRef<string>();
    const lastNameVal = useRef<string>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleValueChange = () => {
        if (firstNameVisibleRef.current || lastNameVisibleRef.current) {
            handleChange();
            return;
        }
        handleChange({
            first: firstNameVal.current ?? "",
            last: lastNameVal.current ?? "",
        });
    };

    const handleLastNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const englishReg = /^[a-z]+[.' ]*[a-z]*$/i;
        if (value && (chineseReg.test(value) || englishReg.test(value)) && value.length < 50) {
            lastNameVal.current = value;
            lastNameVisibleRef.current = false;
            setLastNameVisible(false);
        } else {
            lastNameVisibleRef.current = true;
            lastNameVal.current = "";
            setLastNameVisible(true);
        }
        handleValueChange();
    };

    const handleFirstNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        const englishReg = /^[a-z]+[.' ]*[a-z]*$/i;
        if (value && (chineseReg.test(value) || englishReg.test(value)) && value.length < 50) {
            firstNameVal.current = value;
            firstNameVisibleRef.current = false;
            setFirstNameVisible(false);
        } else {
            firstNameVisibleRef.current = true;
            firstNameVal.current = undefined;
            setFirstNameVisible(true);
        }
        handleValueChange();
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
                        onFocus={() => {
                            lastNameVisibleRef.current = false;
                            setLastNameVisible(false);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="名字"
                        className="firstName_ipt"
                        onBlur={handleFirstNameBlur}
                        onFocus={() => {
                            firstNameVisibleRef.current = false;
                            setFirstNameVisible(false);
                        }}
                    />
                </DropdownBtn>
                <DropdownContent
                    bodyClassName="errorBody"
                    show={firstNameVisible || lastNameVisible}
                >
                    <Icon type="warning" className="errorIcon" />
                    请输入正确的姓名
                </DropdownContent>
            </Dropdown>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
