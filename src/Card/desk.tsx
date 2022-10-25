/**
 * @file 卡片
 * @date 2022-10-21
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import QRCode from "qrcode";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import iconBoy from "../Images/icon_boy.png";
import iconGirl from "../Images/icon_girl.png";
import { comms } from "../index";
import { drawRoundRect, drawSplit, insertBirth, insertDes, insertName } from "./draw";
import Eye from "./eye";
import "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    uuid: string;
    imgLoading: boolean;
    name?: string;
    gender?: "X" | "Y";
    birth?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ uuid, imgLoading, name, gender, birth }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLCanvasElement | null>(null);

    const [loading, setLoading] = useState(false);

    /**
     * 判断性别的icon是否加载完成
     */
    const [genderLoading, setGenderLoading] = useState(true);

    const genderRef = useRef<HTMLImageElement | null>(null);

    /**
     * 0=>没有加载好
     * 1=>加载成功
     * 2=>加载失败
     */

    const [QRCodeStatus, setQRCodeStatus] = useState(0);

    const nameRef = useRef(name);

    const birthRef = useRef(birth);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        nameRef.current = name;
    }, [name]);
    useEffect(() => {
        birthRef.current = birth;
    }, [birth]);

    useEffect(() => {
        let a: HTMLAnchorElement | null = null;
        let c: HTMLCanvasElement | null = null;
        if (loading && !imgLoading && !genderLoading) {
            c = document.createElement("canvas");
            document.body.append(c);

            c.setAttribute("style", "position: absolute; top: 0;left:0");

            const width = 332;
            const height = 356;
            c.width = width;
            c.height = height;
            const bg = document.getElementById("bg") as HTMLImageElement | null;
            const genderEl = genderRef.current;
            if (!bg || !genderEl) {
                return;
            }
            const ctx = c.getContext("2d");
            if (!ctx) {
                return;
            }
            //插入背景

            drawRoundRect(ctx, width, height);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(bg, 0, 0);
            ctx.globalAlpha = 1;

            if (QRCodeStatus === 1) {
                const node = ref.current;
                if (!node) {
                    return;
                }
                //插入二维码
                ctx.drawImage(node, width / 2 - node.width / 2, 45);

                //插入分割线
                drawSplit(ctx, width);

                const genderOffset = {
                    x: width / 2 - genderEl.naturalWidth - 16,
                    y: 45 + 160 + 8,
                };

                //插入性别图片
                ctx.drawImage(
                    genderEl,
                    genderOffset.x,
                    (20 - genderEl.naturalHeight) / 2 + genderOffset.y,
                );

                //插入姓名
                insertName(ctx, nameRef.current ?? "", genderOffset.x, genderOffset.y);
                //插入出生年月
                insertBirth(ctx, birthRef.current ?? "", width / 2 + 1 + 16, genderOffset.y);
                //插入描述
                insertDes(ctx, width, height, 17);

                const url = c.toDataURL("image/png");

                a = document.createElement("a");
                a.href = url;
                a.download = "card.png";
                // a.click();
                // a.remove();
                // c.remove();
                setLoading(false);
            }
        }
        return () => {
            // c?.remove();
            // a?.remove();
        };
    }, [loading, imgLoading, QRCodeStatus, genderLoading]);

    useLayoutEffect(() => {
        setGenderLoading(true);
    }, [gender]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }
        setQRCodeStatus(0);
        void QRCode.toCanvas(
            ref.current,
            uuid,
            {
                width: 120,
                margin: 1,
            },
            (error) => {
                if (error) {
                    setQRCodeStatus(2);
                    return;
                }
                setQRCodeStatus(1);
            },
        );
    }, [uuid]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = () => {
        setLoading(true);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="deskCard_wrap">
            <Eye>{uuid}</Eye>

            <canvas
                ref={ref}
                style={{
                    margin: "0 auto 8px auto",
                    display: "block",
                }}
                width="120"
                height={120}
            />

            <div className="deskCard_name">{name}</div>
            <div className="deskCard_row">
                {gender && (
                    <img
                        src={gender === "X" ? iconBoy : iconGirl}
                        className="deskCard_gender"
                        ref={genderRef}
                        onLoad={() => setGenderLoading(false)}
                    />
                )}
                <div className="deskCard_birth">{birth}</div>
            </div>

            <div className="deskCard_btn" onClick={handleClick}>
                下载
            </div>
            <div
                className="deskCard_des"
                dangerouslySetInnerHTML={{
                    __html: comms.config.question ?? "",
                }}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
