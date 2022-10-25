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
    handleChange: (res?: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleChange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const valueRef = useRef<string>();

    const [visible, setVisible] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        valueRef.current = e.target.value.trim();
    };

    const handleBlur = () => {
        const englishReg = /^[a-z]+[.' ]*[a-z]*$/i;
        if (
            valueRef.current &&
            (chineseReg.test(valueRef.current) || englishReg.test(valueRef.current))
        ) {
            handleChange(valueRef.current);
            setVisible(false);
        } else {
            handleChange();
            setVisible(true);
        }
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
                <DropdownBtn>
                    <input
                        type="text"
                        placeholder="请输入姓名..."
                        className="ipt"
                        onInput={handleInput}
                        onBlur={handleBlur}
                        onFocus={() => {
                            setVisible(false);
                        }}
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
