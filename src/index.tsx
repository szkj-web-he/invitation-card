import { ConfigYML, PluginComms } from "@datareachable/dr-plugin-sdk";
import Form from "./Form";
export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
}) as {
    config: {
        question?: string;
        instruction?: string;
        options?: Array<{ code: string; content: string }>;
        totalScore?: number;
    };
    state: unknown;
    getRuntimeInfoNode: (res: string) => null | string;
    renderOnReady: (res: React.ReactNode) => void;
};

import React, { useState } from "react";
import Canvas from "./bg";
import Card from "./Card/index";
import "./font.scss";
import { useId } from "./Hooks/useId";
import { useSmall } from "./Hooks/useSmall";
import "./style.scss";
import { ScrollComponent } from "./Components/Scroll";

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const isSmall = useSmall();

    const [show, setShow] = useState(false);

    const id = useId();

    const [imgLoading, setImgLoading] = useState(true);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div className="wrapper">
            <div className="before" />
            <ScrollComponent className={`scrollWrap`}>
                <div className={"main"}>
                    <Canvas
                        isSmall={isSmall}
                        isHalf={!show}
                        setImgLoading={setImgLoading}
                        imgLoading={imgLoading}
                    />
                    <Form
                        submit={(res) => {
                            setShow(res);
                        }}
                        eventId={`form${id}`}
                    />
                    {show && <div className="line" />}

                    <Card
                        eventId={`form${id}`}
                        isSmall={isSmall}
                        show={show}
                        imgLoading={imgLoading}
                    />
                </div>
            </ScrollComponent>
            <div className="after" />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
