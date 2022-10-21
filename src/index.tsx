import { ConfigYML, PluginComms } from "@possie-engine/dr-plugin-sdk";
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

import { useState } from "react";
import Canvas from "./bg";
import Card from "./card";
import "./font.scss";
import { useId } from "./Hooks/useId";
import { useSmall } from "./Hooks/useSmall";
import "./style.scss";

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const isSmall = useSmall();

    const [show, setShow] = useState(true);

    const id = useId();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div className="wrapper">
            <div className={"main" + (isSmall ? " mobile" : " desk")}>
                <Canvas isSmall={isSmall} isHalf={!show} />
                <Form
                    submit={(res) => {
                        setShow(res);
                    }}
                    eventId={`form${id}`}
                />
                {show && <div className="line" />}
                <Card eventId={`form${id}`} show={show} />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
