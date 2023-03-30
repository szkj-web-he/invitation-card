/**
 * @file 性别
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { Dropdown } from "../Components/Dropdown";
import { DropdownBtn } from "../Components/DropdownBtn";
import { DropdownContent } from "../Components/DropdownContent";
import { Icon } from "../Components/Icon";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    handleChange: (res: "X" | "Y") => void;
    value?: "X" | "Y";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleChange, value }) => {
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
        <div className="gender">
            <div className="name">性别</div>
            <Dropdown trigger={"click"}>
                <DropdownBtn className="dropdown_ipt">
                    {value ? (
                        <div className="ipt_value">{value === "X" ? "男" : "女"}</div>
                    ) : (
                        <div className="ipt_placeholder">请选择性别</div>
                    )}
                    <Icon type="dropdown" className={`dropdown_iptIcon${open ? " active" : ""}`} />
                </DropdownBtn>
                <DropdownContent bodyClassName="genderDropDownList" handleVisibleChange={setOpen}>
                    <div
                        className={`dropDownItem${value === "X" ? " active" : ""}`}
                        onClick={() => {
                            handleChange("X");
                        }}
                    >
                        男
                    </div>
                    <div
                        className={`dropDownItem${value === "Y" ? " active" : ""}`}
                        onClick={() => {
                            handleChange("Y");
                        }}
                    >
                        女
                    </div>
                </DropdownContent>
            </Dropdown>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
