/**
 * @file 出生年月
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { Dropdown } from "../Components/Dropdown/Dropdown";
import { DropdownBtn } from "../Components/Dropdown/DropdownBtn";
import { DropdownContent } from "../Components/Dropdown/DropdownContent";
import { Icon } from "../Components/Icon";
import { ScrollComponent } from "../Components/Scroll";
import { monthList } from "../defualtData";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    handleChange: (year: number, month: number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleChange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [yearList, setYearList] = useState(() => {
        const currentYear = new Date().getFullYear() - 12;
        const arr: number[] = [];
        for (let i = currentYear; i >= currentYear - 20; i--) {
            arr.push(i);
        }
        return arr;
    });

    const [openYear, setOpenYear] = useState(false);

    const [openMonth, setOpenMonth] = useState(false);

    const [year, setYear] = useState<number>();
    const [month, setMonth] = useState<number>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="birth">
            <div className="name">出生年月</div>
            <div className="birthDropdown_container">
                <Dropdown trigger={"click"} placement="lb">
                    <DropdownBtn className="birthDropdownBtn_year">
                        {year ? (
                            <div className="ipt_value">{year}</div>
                        ) : (
                            <div className="ipt_placeholder">请选择年</div>
                        )}
                        <Icon
                            type="dropdown"
                            className={`dropdown_iptIcon${openYear ? " active" : ""}`}
                        />
                    </DropdownBtn>
                    <DropdownContent
                        bodyClassName="dropdown_yearContainer"
                        handleVisibleChange={setOpenYear}
                    >
                        <ScrollComponent
                            bodyClassName="dropdown_yearScrollBody"
                            handleBarChange={(res) => {
                                if (res.clientHeight + res.top >= res.scrollHeight - 34) {
                                    setYearList((pre) => {
                                        const last = pre[pre.length - 1] - 1;
                                        const arr: number[] = [];
                                        for (let i = last; i > last - 10; i--) {
                                            arr.push(i);
                                        }
                                        return [...pre, ...arr];
                                    });
                                }
                            }}
                        >
                            {yearList.map((item) => {
                                return (
                                    <div
                                        className={`dropDownItem${item === year ? " active" : ""}`}
                                        key={item}
                                        onClick={() => {
                                            setYear(item);
                                            if (month) {
                                                handleChange(item, month);
                                            }
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </ScrollComponent>
                    </DropdownContent>
                </Dropdown>
                <span className="unit">年</span>
                <Dropdown trigger={"click"} placement="lb">
                    <DropdownBtn className="birthDropdownBtn_month">
                        {month ? (
                            <div className="ipt_value">{month}</div>
                        ) : (
                            <div className="ipt_placeholder">请选择月</div>
                        )}

                        <Icon
                            type="dropdown"
                            className={`dropdown_iptIcon${openMonth ? " active" : ""}`}
                        />
                    </DropdownBtn>
                    <DropdownContent
                        bodyClassName="dropdown_monthContainer"
                        handleVisibleChange={setOpenMonth}
                    >
                        <ScrollComponent bodyClassName="dropdown_monthScrollBody">
                            {monthList.map((item) => {
                                return (
                                    <div
                                        className={`dropDownItem${item === month ? " active" : ""}`}
                                        key={item}
                                        onClick={() => {
                                            setMonth(item);
                                            if (year) {
                                                handleChange(year, item);
                                            }
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </ScrollComponent>
                    </DropdownContent>
                </Dropdown>
                <span className="unit">月</span>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
