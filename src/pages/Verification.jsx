import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import { verifyVerificationNumber, updatePhoneSignup } from "../constant/url";

import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const Verification = (props) => {
	const propData = useLocation().state;
	let navigate = useNavigate();
	const access = propData?.authID;
	props.accessId(access);
	const [formData, setFormData] = useState({
		box1: "0",
		box2: "0",
		box3: "0",
		box4: "0",
		phone: propData?.phone,
	});
	const [enablePhoneUpdate, setEnablePhoneUpdate] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleVerifyOTP = async (e) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("access_code", access);
		bodyFormData.append(
			"verification_code",
			formData.box1 + formData.box2 + formData.box3 + formData.box4
		);

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
					toast(res_data.status_msg);
					navigate("/personalinfo", { state: { phone: propData.phone } });
				} else {
					toast(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handlePhoneUpdate = async (e) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("phone", formData.phone);
		await axios({
			method: "post",
			url: updatePhoneSignup,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					toast("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					toast(res_data.status_msg);
					setEnablePhoneUpdate(false);
				} else {
					toast(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<ToastContainer />
				<div className="main-div">
					<div className="content-div">
						<div className="row">
							<div className="col d-flex justify-item-center">
								<div className="col ">
									<h2 className="text-center">
										Verification Code Sent To Your Phone
									</h2>
									<p className="text-center">Enter Phone Verification Code</p>
									<div className="row">
										<div className="d-flex justify-content-center">
											<div className="col-md-1 col-sx-4 m-2">
												<input
													className="form-control"
													type="numeric"
													maxLength="1"
													minLength="1"
													placeholder="0"
													name="box1"
													onChange={(e) => handleChangeFormData(e)}
												/>
											</div>
											<div className="col-md-1 col-sx-4 m-2">
												<input
													className="form-control"
													type="numeric"
													maxLength="1"
													minLength="1"
													placeholder="0"
													name="box2"
													onChange={(e) => handleChangeFormData(e)}
												/>
											</div>
											<div className="col-md-1 col-sx-4 m-2">
												<input
													className="form-control"
													type="numeric"
													maxLength="1"
													minLength="1"
													placeholder="0"
													name="box3"
													onChange={(e) => handleChangeFormData(e)}
												/>
											</div>
											<div className="col-md-1 col-sx-4 m-2">
												<input
													className="form-control"
													type="numeric"
													maxLength="1"
													minLength="1"
													placeholder="0"
													name="box4"
													onChange={(e) => handleChangeFormData(e)}
												/>
											</div>
										</div>
									</div>
									<div className="d-flex justify-content-center">
										<button
											className="btn btn-dark btn-lg mt-5"
											disabled={loading}
											onClick={() => handleVerifyOTP()}
										>
											VERIFY &amp; PROCEED
										</button>
									</div>
									{enablePhoneUpdate && (
										<div className="d-flex justify-content-center">
											<div className="col-6 mt-5">
												<div className="input-group mb-3">
													<input
														type="numeric"
														maxLength="10"
														minLength="10"
														className="form-control"
														placeholder="Update Phone"
														value={formData.phone}
														name="phone"
														onChange={(e) => handleChangeFormData(e)}
													/>
													<div className="input-group-append">
														<button
															className="btn btn-dark"
															type="button"
															onClick={() => handlePhoneUpdate()}
															disabled={loading}
														>
															Update Phone
														</button>
														<button
															className="btn btn-dark"
															type="button"
															onClick={() => setEnablePhoneUpdate(false)}
														>
															Cancel
														</button>
													</div>
												</div>
											</div>
										</div>
									)}
									<div className="d-flex justify-content-center mt-3">
										<a
											href="javascript:void(0)"
											className="text-center text-dark "
											onClick={() => setEnablePhoneUpdate(true)}
										>
											Change Number&nbsp;&nbsp;
										</a>
										{/*<p className="text-center text-dark ">(50 sec)&nbsp;&nbsp;</p>*/}
										<a
											href="javascript:void(0)"
											className="text-center text-muted "
										>
											Resend
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
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
			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
