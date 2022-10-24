/**
 * @file
 * @date 2022-10-24
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { Dropdown } from "../Components/Dropdown/Dropdown";
import { DropdownBtn } from "../Components/Dropdown/DropdownBtn";
import { DropdownContent } from "../Components/Dropdown/DropdownContent";
import iconHidden from "../Images/icon_hidden.png";
import iconOpen from "../Images/icon_open.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    className?: string;
    children: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ className, children }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [open, setOpen] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`eye_wrap${className ? ` ${className}` : ""}`}>
            <span className="eye_name">UUID</span>
            <span>****************</span>
            <Dropdown
                triangle={{
                    width: "10px",
                    height: "5px",
                    color: "rgba(33,33,33,0.8)",
                }}
                trigger="click"
                offset={{
                    x: (left) => {
                        return left + 58;
                    },
                }}
                placement="rt"
            >
                <DropdownBtn className={`eye_btn${open ? " active" : ""}`}>
                    <img src={iconHidden} alt="" className="eye_hiddenIcon" />
                    <img src={iconOpen} className="eye_showIcon" alt="" />
                </DropdownBtn>
                <DropdownContent
                    bodyClassName="eye_content"
                    handleVisibleChange={(res) => {
                        setOpen(res);
                    }}
                >
                    {children}
                </DropdownContent>
            </Dropdown>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
