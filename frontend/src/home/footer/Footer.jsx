import React from "react";
import "./Footer.css"
function Footer(){
    return(<div>
    <div className="foot">
        <div className="foot-img1">
            <img src="https://cdn-icons-png.flaticon.com/512/8753/8753366.png" alt="" width={"70px"} height={"70px"}/>
            <p>24/7 CUSTOMER CARE</p>
        </div>
        <div className="foot-img2">
        <img src="https://www.freeiconspng.com/thumbs/hd-tickets/black-and-white-blank-ticket-17.png" alt="" width={"70px"} height={"70px"}/>
            <p>RESEND BOOKING CONFIRMATION </p>
            

        </div>
        <div className="foot-img3">
        <img src="https://cdn-icons-png.flaticon.com/512/88/88255.png" alt="" width={"70px"} height={"70px"}/>
            <p>SUBSCRIBE TO THE NEWSLETTER</p>
        </div>
    </div>
    </div>)
}
export default Footer;