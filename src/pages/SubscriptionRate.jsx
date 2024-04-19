import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "../css/common.css";
import { paymentInitiate } from "../constant/url";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const SubscriptionRate = () => {
	const propData = useLocation()["state"];
	let navigate = useNavigate();
	let access = propData?.authID;
	let phone = propData?.phone;

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
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	useEffect(() => {
		if (!access) {
			navigate("/");
		}
	}, [access]);
	return (
		<>
			<Header />
			<div className="container sor-main-div">
				<div className="row ">
					<h2 className="text-center mt-5">Subscribe</h2>
					<div className="col d-flex justify-content-center">
						<div className="col-md-8 col-12 d-flex justify-content-center ">
							<div className="col-11 col-md-10  px-4 pt-5  py-3 sor-content">
								<ul>
									<li>
										<p>
											No Public Listing of Private Information (Photos, Details,
											etc.,)
										</p>
									</li>
									<li>
										<p>Lifetime Registration, Only One Time Fee</p>
									</li>
									<li>
										<p>Unlimited Matches</p>
									</li>
									<li>
										<p>Email Notifications of Potential & Interested Matches</p>
									</li>
									<li>
										<p>SMS Alerts</p>
									</li>
									<li>
										<p>Not Just Matrimony, A Lifelong Association</p>
									</li>
									<li>
										<p>Invitation to Our Events</p>
									</li>
								</ul>
								<h3 className="text-center mt-5">Rs. 3000 /-</h3>
								<div className="d-grid gap-2 col-md-5 col-8 mx-auto my-4 ">
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
				</div>
				<div className="row  position-relative">
					<div className="col-2 px-0">
						<div className="col d-flex justify-content-start">
							<img
								className="img-fluid btm-flower-left-2"
								src={require("../assets/img/signup/btmflower2.png")}
								alt="profileimg"
							/>
						</div>
					</div>
					<div className="col-8 mt-5  d-flex justify-content-center"></div>
					<div className="col-2 px-0">
						<div className="col d-flex justify-content-end ">
							<img
								className="img-fluid btm-flower-right-2"
								src={require("../assets/img/signup/btmflower2.png")}
								alt="profileimg"
							/>
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
