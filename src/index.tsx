import { ConfigYML, PluginComms } from "@possie-engine/dr-plugin-sdk";
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
    renderOnReady: (res: React.ReactNode) => void;
};
import Form from "./Form";

import "./font.scss";
import "./style.scss";
import Canvas from "./bg";
import { useSmall } from "./Hooks/useSmall";

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const isSmall = useSmall();
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
                <Canvas />
                <Form />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
