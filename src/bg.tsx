/**
 * @file
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import bg from "./Images/bg.png";
import { drawHalf } from "./Unit/draw";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    isHalf?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ isHalf }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLCanvasElement | null>(null);

    const imgRef = useRef<HTMLImageElement | null>(null);

    const [loading, setLoading] = useState(true);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (loading) {
            return;
        }
        const imgEl = imgRef.current;
        if (!imgEl) {
            return;
        }
        const el = ref.current;
        if (!el) {
            return;
        }
        const parent = el?.parentElement;
        if (!parent) {
            return;
        }

        const { width, height } = parent.getBoundingClientRect();

        el.width = width;
        el.height = height;

        const ctx = el.getContext("2d");
        if (!ctx) {
            return;
        }
        // ctx.drawImage(imgEl, 0, 0);

        drawHalf(ctx, 356, height);
        ctx.drawImage(imgEl, 0, 0);
    }, [loading, isHalf]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <img
                alt=""
                src={bg}
                onLoad={(e) => {
                    console.log(e);
                    setLoading(false);
                }}
                ref={imgRef}
                style={{
                    width: "0",
                    height: "0",
                    position: "absolute",
                    visibility: "hidden",
                }}
            />
            <canvas ref={ref} className="bg" />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
