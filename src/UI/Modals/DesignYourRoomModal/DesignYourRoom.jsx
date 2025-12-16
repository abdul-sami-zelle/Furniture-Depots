import React from "react";
import "./style.css"
import { AiFillCloseSquare } from "react-icons/ai";
import CanvasApp from "../Canvas/canvas";

function DesignRoomMain({closeFn,product, data, }) {
    
  return(
    <div className="design_room_popup">
        <CanvasApp 
          data={data} closeFn={closeFn}
        />
        <div onClick={()=>{closeFn()}} className="close_btn_design_room_popup">
            <AiFillCloseSquare size={30} />
        </div>
    </div>
  )
}

export default DesignRoomMain;
