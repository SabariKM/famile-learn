import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { paymentInitiate } from "../constant/url";

import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const PaymentFailed = (props) => {
	const propData = useLocation()["state"];
	const access = propData?.authID;
	const phone = propData?.phone;
	let navigate = useNavigate();
	console.log("pmtfailedpage", propData, access, phone);
	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("phoneNumber", phone);
		await axios({
			method: "post",
			url: paymentInitiate,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					console.log("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					window.location.href =
						res_data.pg_response.data.instrumentResponse.redirectInfo.url;
				} else {
					console.log(res_data.status_msg);
				}
				console.log(res_data);
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	useEffect(() => {
		if (!access && !phone) {
			navigate("/");
		}
	}, [access, phone]);

  useEffect(() => {
    const disableBackButton = (e) => {
      window.history.pushState(null, document.title, window.location.href);
      window.onpopstate = function(event) {
        window.scrollTo(-100, 0);
        window.history.pushState(null, document.title, window.location.href);
      };
    };

    disableBackButton();

    return () => {
      window.onpopstate = null;
    };
  }, []);

	return (
		<>
			<Header showLogout='showLogout' />
      <div className="bg-container">
        <div className="container d-flex justify-content-center commonContainer">
          <div className="main-div">
            <div className="d-flex justify-content-center gap-4 mb-26">
              <div class="profile">
                <div class="outer">
                  <div class="inner">
                    <div id="number">
                      75%
                    </div>
                  </div>
                </div>
                <svg width="70px" height="70px">
                  <circle
                    className="profile75"
                    cx="35"
                    cy="35"
                    r="30"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div className="subscriptionHead">
                <h3 className="text-center">Payment Failed!</h3>
                <p className="cp">
                  Please try again
                </p>
              </div>
            </div>
            <div className="paymentDivider"></div>
            <div className="row mt-40">
              <div className="col d-flex justify-content-center">
                <div className="col-8 ">
                  <div className="col d-flex justify-content-center">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M70.2025 34L34 69.5443" stroke="#D71B1B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M34.0006 34L70.2031 69.5443" stroke="#D71B1B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="52" cy="52" r="49.5" stroke="#D71B1B" stroke-width="5"/>
                    </svg>
                  </div>
                  <h3 className="text-center mt-4">
                    To attempt payment again, click below
                  </h3>
                  <p className="cp col-xl-6 col-lg-8 col-md-9 mx-auto text-center mt-4">
                    All your other details are saved with us safely in an
                    encrypted format, you don’t have to re-enter anything. Once
                    your subscription payment is completed, we will start
                    sending you matching profiles.
                  </p>
                  <p className="cp col-xl-6 col-lg-8 col-md-9 mx-auto text-center">
                    If you want other payment options, give us a call at +91
                    99628 48057
                  </p>
                  <div className="d-grid gap-2 col-6 mx-auto my-4 ">
                    <button
                      type="submit"
                      className="btn btn-primary bg-dark p-2"
                      onClick={() => handlePayment()}
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 mb-3">
              <div className="col">
                <div className="col d-flex justify-content-start">
                  <img
                    className="img-fluid btm-flower-left"
                    src={require("../assets/img/signup/btmflower2.png")}
                    alt="profileimg"
                  />
                </div>
              </div>
              <div className="col">
                <div className="col d-flex justify-content-end">
                  <img
                    className="img-fluid btm-flower-right"
                    src={require("../assets/img/signup/btmflower2.png")}
                    alt="profileimg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
			<div className="ft-footer-block subscription-failed-footer">
				<Footer />
			</div>
		</>
	);
};
