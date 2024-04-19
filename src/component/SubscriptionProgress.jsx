import React from "react";

import '../css/common.css';

export const SubscriptionProgress = (props) => {
    const status = props.status;
    let progress_1 = "div-circle progressbar ";
    let progress_2 = "div-circle progressbar ";
    let progress_3 = "div-circle progressbar ";

    let progress_1_txt = "text-center ";
    let progress_2_txt = "text-center ";
    let progress_3_txt = "text-center ";

    let progress_2_bg = " position-absolute progressbar progressbar1 ";
    let progress_3_bg = " position-absolute progressbar progressbar2 ";

    if (status === 1){
        progress_1 += " progressbar-completed";
        progress_1_txt += " text-white";
    }else if(status === 2){
        progress_1 += " progressbar-completed";
        progress_2 += " progressbar-completed";
        progress_1_txt += " text-white";
        progress_2_txt += " text-white";
        progress_2_bg += "progressbar-completed";
    }else if(status === 3){
        progress_1 += " progressbar-completed";
        progress_2 += " progressbar-completed";
        progress_3 += " progressbar-completed";
        progress_1_txt += " text-white";
        progress_2_txt += " text-white";
        progress_3_txt += " text-white";
        progress_2_bg += "progressbar-completed";
        progress_3_bg += "progressbar-completed";
    }
return(
    <>
    <div className="row position-relative">
        <div className="col-4 p-0 m-0">
            <div className="d-flex justify-content-center">
                <div className={progress_1}>
                    <p className={progress_1_txt}><small>1</small></p>
                </div>
            </div>
            <p className="text-center"><small>Verify Your Phone</small></p>
        </div>
        <div  className={progress_2_bg}></div>
        <div  className="col-4 p-0 m-0">
            <div className="d-flex justify-content-center">
                <div className={progress_2}>
                    <p className={progress_2_txt}><small>2</small></p>
                </div>
            </div>
            <p className={"text-center" }><small>Verify Your Email</small></p>
        </div>
        <div  className={progress_3_bg}></div>
        <div  className="col-4 p-0 m-0">
            <div className="d-flex justify-content-center">
                <div className={progress_3}>
                    <p className={progress_3_txt}><small>3</small></p>
                </div>
            </div>
            <p className="text-center"><small>Verify Your Preferances</small></p>
        </div>
    </div>
    </>
)
}