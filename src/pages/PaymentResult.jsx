import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
	resendVerificationNumber,
	verifyVerificationNumber,
	updateGeneric,
	getSubscription,
} from "../constant/url";

import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { SubscriptionProgress } from "../component/SubscriptionProgress";

export const PaymentResult = (props) => {
	const propData = useLocation()["state"];
	const access = sessionStorage.getItem('access_detals');
	const phone = propData?.phone;
  const key =
  propData?.key === 'phone-verify'
    ? 1
    : propData?.key === 'email-verfiy'
    ? 2
    : 1;

	let navigate = useNavigate();
	const [vState, setvState] = useState(key);
	const [componentDisp, setComponentDisp] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [resultMessage, setResultMessage] = useState("");
	const [validTill, setValidTill] = React.useState();
  const [isClickHereClicked, setIsClickHereClicked] = useState(false);
  const [isEmailVerifyClicked, setIsEmailVerifyClicked] = useState(false);
  const [isNumChanged, setIsNumChanged] = useState(false);
  const [vphone, setvPhone] = useState(phone);
  const [isPhoneUpdated, setIsPhoneUpdated] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [vemail, setvemail] = useState("");

	const handleGetSubDetails = async (access) => {
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);

		await axios({
			method: "post",
			url: getSubscription,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					// navigate("/login");
				} else if (res_data.status_code === 200) {
					setValidTill(moment(res_data.data.valid_till).format("MMM Do YYYY"));
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
	};

	// React.useEffect(() => {
	// 	handleGetSubDetails(access);
	// }, [access]);

  const handleChangeFormData_verify = (e) => {
    const { name, value } = e.target;
    setvPhone(value);
  };

	function VerifyPhoneBox() {
		const [vCode, setvCode] = useState();

		return (
			<>
				<h3 className="text-center mt-3 semiFont">Verify Phone</h3>
				<p className={`cp text-center pmt-a fw-bold}`}>
					+91 {phone}
				</p>
				<div className="d-flex justify-content-center">
					<div className="col-xl-8 col-md-8 col-sm-9 col-9">
						<input
							placeholder="Enter OTP"
							className="form-control mt-2 custom-input-bg"
							type="number"
							onChange={(e) => setvCode(e.target.value)}
							value={vCode}
						/>
            <p className={`error text-start m-0 mt-1 text-wrap text-capitalize ${error ? 'visible' : 'invisible'}
            ${resultMessage === 'Your Phone Has Updated, Please Click Here To Get OTP' ? 'successMsg' : ''}`}>
              {resultMessage}
              {!error && !resultMessage && 'Error'}
            </p>
            <div className="d-grid mt-2">
							<button
								className={`btn btn-lg otpBtn ${isClickHereClicked ? 'disabledBtn': ''}`}
                disabled={isClickHereClicked}
								onClick={() => handleResendOtp("phone")}
							>
								Get OTP
							</button>
						</div>
						<div className="d-grid mt-2">
							<button
								className="btn btn-dark btn-lg"
								onClick={() => handleVerifyOTP(2, vCode, "phone")}
							>
								PROCEED
							</button>
						</div>
						<div className="d-flex justify-content-between mt-2 pb-5">
							<a
								href="javascript:void(0)"
								className="pmt-a text-start text-dark"
								onClick={() => setIsNumChanged(true)}
							>
								Change Number
							</a>
							{/*<p className="text-center text-dark ">(50 sec)&nbsp;&nbsp;</p>*/}
							{isClickHereClicked && (
                <a
                  href="javascript:void(0)"
                  className=" pmt-a text-end text-muted"
                  onClick={() => handleResendOtp("phone")}
                >
                  Resend
                </a>
              )}
						</div>
					</div>
				</div>
			</>
		);
	}

	const VerifyEmailBox = () => {
		const [vCode, setvCode] = useState();

		return (
			<>
				<h3 className="text-center mt-3 semiFont">Verify Email</h3>
				<p className={`cp text-center pmt-a pmt-b fw-bold}`}>
					sample@gmail.com
				</p>
				<div className="d-flex justify-content-center mt-2 pb-5">
					<div className="col-xl-8 col-md-8 col-sm-9 col-9">
						<input
							placeholder="Enter OTP"
							className="form-control mt-2 custom-input-bg"
							type="number"
							onChange={(e) => setvCode(e.target.value)}
							value={vCode}
						/>
            <p className={`error text-start m-0 mt-1 text-wrap text-capitalize ${error ? 'visible' : 'invisible'}
            ${resultMessage === 'Your Email Has Updated, Please Click Here To Get OTP' ? 'successMsg' : ''}`}>
              {resultMessage}
              {!error && !resultMessage && 'Error'}
            </p>
            <div className="d-grid mt-2">
							<button
								className={`btn btn-lg otpBtn ${isEmailVerifyClicked ? 'disabledBtn': ''}`}
                disabled={isEmailVerifyClicked}
								onClick={() => handleResendOtp("email")}
							>
								Get OTP
							</button>
						</div>
						<div className="d-grid mt-2">
							<button
								className="btn btn-dark btn-lg"
								onClick={() => handleVerifyOTP(3, vCode, "email")}
							>
								PROCEED
							</button>
						</div>
						<div className="d-flex justify-content-between mt-2">
							<a
								href="javascript:void(0)"
								className="pmt-a text-start text-dark"
								onClick={() => setIsEmailChange(true)}
							>
								Change Email
							</a>
							{/*<p className="text-center text-dark ">(50 sec)&nbsp;&nbsp;</p>*/}
							{isEmailVerifyClicked && (
                <a
                  href="javascript:void(0)"
                  className=" pmt-a text-end text-muted "
                  onClick={() => handleResendOtp("email")}
                >
                  Resend
                </a>
              )}
						</div>
					</div>
				</div>
			</>
		);
	};

	const VerifyPreferanceBox = () => {
		return (
			<>
				<div className="d-flex justify-content-center mt-33 mb-3">
					<img
						src={require("../assets/img/signup/wedding_2.png")}
						alt="wedding"
					/>
				</div>
				<h2 className="text-center fs-22 mx-auto">Your Partner Preferences</h2>
				<p className="text-center fs-14 col-9 col-sm-8 col-md-8 mx-auto mb-0 mt-1">
					Set your partner preferences by clicking the button below. Keep your
					preferences reasonably broad to attract a wide range of partner
					profiles.
				</p>
				<div className="d-flex justify-content-center pb-5">
					<div className="col-xl-8 col-md-8 col-sm-9 col-9">
						<div className="d-grid gap-2">
							<button
								className="btn btn-dark btn-lg mt-3"
                style={{fontSize: 18}}
								onClick={() => {
									navigate("/preference", { state: {
                    ...propData,
                    key: 'preference'
                  } });
								}}
							>
								SET PREFERENCES
							</button>
						</div>
					</div>
				</div>
			</>
		);
	};

	const handleVerifyOTP = async (statusLevel, vCode, type) => {
		setLoading(true);
    setIsNumChanged(false);
    setIsEmailChange(false);
		var bodyFormData = new FormData();
		bodyFormData.append("access_code", access);
		bodyFormData.append("verification_code", vCode);
		bodyFormData.append("type", type);
		await axios({
			method: "post",
			url: verifyVerificationNumber,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					toast("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					setvState(statusLevel);
					setSuccess(true);
					setError(false);
					setResultMessage(res_data.status_msg);
				} else {
					setError(true);
					setSuccess(false);
					setResultMessage(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleUpdate = async (e) => {
		setLoading(true);
		const { name, value } = e;
    if (name === 'phone') {
      setIsNumChanged(false);
      setIsPhoneUpdated(true);
    }
    if (name === 'email') {
      setIsEmailChange(false);
      setIsEmailUpdated(true);
    }
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append(name, value);
		await axios({
			method: "post",
			url: updateGeneric,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 200) {
					setError(false);
					setSuccess(true);
					setResultMessage(res_data.status_msg);
				} else {
					setError(true);
					setSuccess(false);
					setResultMessage(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleResendOtp = async (type) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("access_code", access);
		bodyFormData.append("type", type);
		await axios({
			method: "post",
			url: resendVerificationNumber,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 200) {
					setError(false);
					setSuccess(true);
					setResultMessage(res_data.status_msg);
				} else {
					setError(true);
					setSuccess(false);
					setResultMessage(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
    type === "phone" && setIsClickHereClicked(true);
    type === "email" && setIsEmailVerifyClicked(true);
		setLoading(false);
	};

	useEffect(() => {
		if (vState === 1) {
			setComponentDisp(
        <VerifyPhoneBox error={error} resultMessage={resultMessage} />
      );
		} else if (vState === 2) {
			setComponentDisp(
        <VerifyEmailBox error={error} resultMessage={resultMessage} />
      );
		} else if (vState === 3) {
			setComponentDisp(
        <VerifyPreferanceBox error={error} resultMessage={resultMessage} />
      );
		}
	}, [vState, access, phone, error, isClickHereClicked, isEmailVerifyClicked]);

	useEffect(() => {
		if (!access && !phone) {
			navigate("/");
		}
	}, [access, phone]);

  useEffect(() => {
    if (isPhoneUpdated) {
      setIsClickHereClicked(false);
      setResultMessage('Your Phone Has Updated, Please Click Here To Get OTP')
    }
  }, [isPhoneUpdated]);

  useEffect(() => {
    if (isEmailUpdated) {
      setIsEmailVerifyClicked(false);
      setResultMessage('Your Email Has Updated, Please Click Here To Get OTP')
    }
  }, [isEmailUpdated]);

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
			<Header loginStatus={props.loginStatus} showLogout='showLogout' />
      <div className="bg-container">
        <div className="container d-flex justify-content-center commonContainer">
          <div className="main-div">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <div className="col-12">
                  <div className="d-flex justify-content-center gap-4 mb-26">
                    <div class="profile">
                      <div class="outer">
                        <div class="inner">
                          <div id="number">
                            85%
                          </div>
                        </div>
                      </div>
                      <svg width="70px" height="70px">
                        <circle
                          className="profile85"
                          cx="35"
                          cy="35"
                          r="30"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <div className="subscriptionHead">
                      <h3 className="">Subscription Confirmed!</h3>
                      <p className="cp">
                        Your subscription is valid till {validTill}
                      </p>
                    </div>
                  </div>
                  <div className="paymentDivider"></div>
                  <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-7 col-md-8 col-sm-12 col-12">
                      <div className="col d-flex justify-content-center mt-40">
                        <img
                          className="img-fulid"
                          src={require("../assets/img/signup/tickCircle.png")}
                          alt="tick circle"
                        />
                      </div>
                      <h3 className="text-center mt-4">Welcome To Famile!</h3>
                      <p className="cp  text-center mt-4">
                        Matching profiles will be emailed to you every Saturday
                        based on availability of profiles.
                      </p>
                      <div className="d-flex justify-content-center zIndex-1">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body pt-5">
                              <SubscriptionProgress status={vState} />
                              {componentDisp}
                              {success && (
                                <p className="success mt-1 text-wrap text-center text-capitalize ">
                                  {resultMessage}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`d-flex justify-content-center card p-4 p-md-5 position-relative change-num ${
                          isNumChanged ? 'change-num-active' : ''
                        }`}
                      >
                        <div className="col-8 mx-auto">
                          <div className="input-group mb-3">
                            <input
                              type="numeric"
                              maxLength="10"
                              minLength="10"
                              className="form-control custom-input-bg p-2"
                              placeholder="Enter New Phone Number"
                              name="phone"
                              value={vphone}
                              onChange={(e) => handleChangeFormData_verify(e)}
                            />
                          </div>
                          <div className="input-group-append d-flex justify-content-end">
                            <button
                              className="btn closeBtn btn-dark"
                              type="button"
                              onClick={() => setIsNumChanged(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn updateBtn btn-dark"
                              type="button"
                              onClick={() =>
                                handleUpdate({ name: "phone", value: vphone })
                              }
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={`d-flex justify-content-center card p-4 p-md-5 position-relative change-email ${
                        isEmailChange ? 'change-email-active' : ''
                      }`}>
                        <div className="col-9 mx-auto">
                          <div className="input-group mb-3">
                            <input
                              type="numeric"
                              className="form-control custom-input-bg p-2"
                              placeholder="Email"
                              name="email"
                              value={vemail}
                              onChange={(e) => setvemail(e.target.value)}
                            />
                          </div>
                          <div className="input-group-append d-flex justify-content-end">
                            <button
                              className="btn closeBtn btn-dark"
                              type="button"
                              onClick={() => setIsEmailChange(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn updateBtn btn-dark"
                              type="button"
                              onClick={() =>
                                handleUpdate({ name: "email", value: vemail })
                              }
                            >
                             Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
			<div className="ft-footer-block paymentResultFooter">
				<Footer />
			</div>
		</>
	);
};
