import React from "react";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";


const Cours = () => {
    return (
        <div>
            <DayPilotScheduler
                {...config}
                ref={component => {
                    this.scheduler = component && component.control;
                }}
            />
        </div>
    );

};

export default Cours;