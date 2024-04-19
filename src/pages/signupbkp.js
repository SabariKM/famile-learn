import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../constant/url";

import "../css/signup.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export default function SignUp(props) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ name: "", phone: "" });
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");

	props.onLogOut(true);

	const validateInput = () => {
		if (formData.name?.length >= 30 || formData.name?.length <= 3) {
			setErrorText("Please Enter Valid Name.");
			return false;
		}

		if (
			formData.phone.trim()?.length < 10 ||
			formData.phone.trim()?.length > 10 ||
			isNaN(formData.phone)
		) {
			setErrorText("Please Enter Valid Phone.");
			return false;
		}
		return true;
	};

	const handleSignUp = async (e) => {
		e.preventDefault();
		if (!validateInput()) {
			return false;
		}
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("name", formData.name);
		bodyFormData.append("phone", formData.phone);
		await axios({
			method: "post",
			url: signup,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					console.log("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
					console.log("Signup accepted, Proceeding to verification.");
					navigate("/sgpersonalinfo", {
						state: {
							authID: res_data.authId,
							phone: formData.phone,
							fname: formData.name,
							acctype: "signup",
						},
					});
				} else {
					setErrorText(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};
	const handleLoginRegister = (e) => {
		if (e === "login") {
			navigate("/login");
		}
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		if (name === "phone" && /\D/.test(value) && isNaN(value) && value === " ") {
			setErrorText("Please Enter Valid Phone Number.");
			return false;
		} else {
			setErrorText("");
		}
		if (name === "name" && !/^[A-Z a-z]+$/.test(value) && name.length > 2) {
			setErrorText("Please Enter Valid Name not number.");
			return false;
		} else {
			setErrorText("");
		}

		setFormData({
			...formData, // copy the current properties of "json"
			[name]: value, // update the "name" property
		});
	};
	return (
		<>
			<Header acc_type="login" ret_type={(e) => handleLoginRegister(e)} />
			<div className="SIGNUP px-4 ">
				<div className="container container-width ">
					<div className="row mt-5">
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-flex justify-content-sm-center ">
							<div className="first-block-left">
								<p className="title" style={{ color: "#141414" }}>
									Famile
								</p>
								<p>
									Famile is a community, a matrimonial network for people who do
									not believe in caste.
								</p>
								<p>
									With a vision to foster meaningful connections based on
									positive values and journeys, our network sincerely cares for
									the genuinely good people.
								</p>
								<div className="vector-box">
									<img
										src={require("../assets/img/signup/signuptop.png")}
										srcSet={require("../assets/img/signup/signuptop.png")}
										alt="heart"
									/>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-0">
							<div className="first-block-right">
								<img
									className="bg-dots d-none d-sm-none d-md-none d-lg-block d-xl-block"
									alt="Famile mm"
									src={require("../assets/img/group-1088.png")}
								/>
								<img
									className="vec-heart img-fluid"
									alt="Famile mm"
									src={require("../assets/img/signup/Vector.png")}
								/>
								<div className="col">
									<div className="">
										<div className="d-flex justify-content-center">
											<div className="col-5 d-flex justify-content-center ">
												<img
													className="img1 img-w-h-full img-fluid p-2 pb-3"
													alt="Famile mm"
													src={require("../assets/img/signup/img1.png")}
												/>
											</div>
											<div className="col-7 d-flex justify-content-center ">
												<img
													className="img4 img-w-h-full img-fluid p-2 pb-3"
													alt="Famile mm"
													src={require("../assets/img/signup/img2.png")}
												/>
											</div>
										</div>
									</div>
									<div className="">
										<div className="d-flex justify-content-center">
											<div className="col-7 d-flex justify-content-center">
												<img
													className="img2 img-w-h-full img-fluid p-2 pt-0"
													alt="Famile mm"
													src={require("../assets/img/signup/img3.png")}
												/>
											</div>
											<div className="col-5">
												<img
													className="img3 img-fluid img-w-h-full p-2 pt-0"
													alt="Hands indian bride"
													src={require("../assets/img/signup/img4.png")}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row second-block mt-5">
						<div className="col d-flex justify-content-center">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon "
											alt="Famile mm"
											src={require("../assets/img/signup/rate-2.png")}
										/>
									</div>
									<h2>Community</h2>
									<p className="mt-4">
										Our community is peaceful and rational. People joining our
										community are fostering life-time bonds.
									</p>
								</div>
							</div>
						</div>
						<div className="col d-flex justify-content-center">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-right ">
										<img
											className="box-icon"
											alt="Famile mm"
											src={require("../assets/img/signup/privacy-1.png")}
										/>
									</div>
									<h2>Privacy</h2>
									<p className="mt-4">
										Your profile will not be listed publicly. Famile is built as
										a unique network where member profiles are shared with each
										other purely based on mutual interest only.
									</p>
								</div>
							</div>
						</div>

						<div className="col d-flex justify-content-center">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon"
											alt="Famile mm"
											src={require("../assets/img/signup/handshake-1.png")}
										/>
									</div>
									<h2>Verified</h2>
									<p className="mt-4">
										Each profile is individually verified for genuineness and
										intent to marry.
									</p>
								</div>
							</div>
						</div>
						<div className="col d-flex justify-content-center">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
										<img
											className="box-icon"
											alt="Famile mm"
											src={require("../assets/img/signup/checked-1.png")}
										/>
									</div>
									<h2>Trust</h2>
									<p className="mt-4">
										We do not sell your data or any information regarding you to
										third party services.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-5 position-relative">
						<img
							className="img-fulid"
							alt="Famile mm"
							src={require("../assets/img/signup/Join-Background.png")}
						/>
					</div>
					<div className="row third-box d-flex justify-content-between position-relative">
						<div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12 position-relative">
							<div className="left-img-box-main">
								<h2>Join Our Network</h2>
								<p>
									Get profiles of like-minded matches, and be invited to our
									events.
								</p>
								<div className="left-img-box position-relative">
									<img
										alt="Famile mm"
										src={require("../assets/img/signup/group-1088.png")}
										style={{
											position: "absolute",
											left: "40%",
											top: "5%",
											zIndex: "-1",
										}}
										height="176px"
										width="204px"
									/>
									<img
										alt="Famile mm"
										src={require("../assets/img/signup/frame-1210.png")}
										className="img-fluid"
									/>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 position-relative d-flex justify-content-end">
							<img
								className="vec-heart"
								alt="Famile mm"
								src={require("../assets/img/signup/Vector.png")}
							/>
							<div className="inp-box">
								<div className="rectangle rectangle4" />
								<div className="rectangle rectangle3" />
								<div className="rectangle rectangle2" />
								<div className="rectangle rectangle1 pt-5">
									<div className="d-flex justify-content-center">
										<form
											method="post"
											className="signup-form mx-4"
											onSubmit={(e) => handleSignUp(e)}
										>
											<h2 className="text-center">Join</h2>
											<p className="text-center mb-3">
												Enter your details below
											</p>
											<div
												className="position-relative"
												style={{ height: "40px" }}
											>
												{errorText?.length > 3 && (
													<p className="error text-center text-capitalize m-0">
														{errorText}
													</p>
												)}
											</div>
											<input
												required
												type="text"
												value={formData.name}
												className="form-control p-2 mt-1"
												placeholder="Name"
												name="name"
												onChange={(e) => handleChangeFormData(e)}
											/>

											<div className="input-group mt-3">
												<div className="col-2 me-2">
													<select className="form-select p-2">
														<option>IN</option>
													</select>
												</div>
												<div className="col-2 me-2">
													<input
														type="numeric"
														maxLength="10"
														minLength="10"
														value="+91"
														className="form-control p-2 me-2"
														placeholder="Phone"
														name="phone_code"
														disabled
													/>
												</div>
												<input
													type="numeric"
													maxLength="10"
													minLength="10"
													value={formData.phone}
													className="form-control p-2"
													placeholder="Phone"
													name="phone"
													onChange={(e) => handleChangeFormData(e)}
												/>
											</div>
											<div className="d-grid gap-2 col-10 mx-auto mt-4 ">
												<button
													type="submit"
													className="btn btn-primary bg-dark p-2"
													disabled={loading}
												>
													JOIN
												</button>
											</div>
										</form>
									</div>
									<div className="d-flex justify-content-center">
										<img
											className="btm-flower"
											alt="Mask group"
											src={require("../assets/img/signup/mask-group.png")}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row fourth-box mt-5 d-flex justify-content-between">
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative">
							<div>
								<div className="fourth-text">
									<h2>Themed Weddings</h2>
									<br />
									<p>
										With over 100+ wedding events conducted, our team is able to
										expertly design, plan and conduct your wedding event with
										ease and panache, whether you want a minimalist elite
										wedding or a themed wedding.
									</p>
								</div>
								<div className="inp-box4left">
									<div className="rectangle rectangle3" />
									<div className="rectangle rectangle2" />
									<div className="rectangle rectangle0" />
									<img
										className="rectangle rectangle-imgleft"
										alt="Mask group"
										src={require("../assets/img/signup/fourthleft.png")}
									/>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative">
							<div className="inp-box4right">
								<div className="rectangle rectangle3" />
								<div className="rectangle rectangle2" />
								<div className="rectangle rectangle0" />
								<img
									className="rectangle rectangle-imgright"
									alt="Mask group"
									src={require("../assets/img/signup/fourthright.png")}
								/>
								<img
									className="vec-heart"
									alt="Famile mm"
									src={require("../assets/img/signup/Vector.png")}
								/>
							</div>
						</div>
					</div>
					<div className="row fifth-box mt-5 d-flex justify-content-between">
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-none d-sm-none d-md-block d-lg-block d-xl-block mt-5">
							<div>
								<img
									className="vec-heart"
									alt="Famile mm"
									src={require("../assets/img/signup/Vector-invert.png")}
								/>
								<div className="inp-box5left">
									<div className="rectangle rectangle3" />
									<div className="rectangle rectangle2" />
									<div className="rectangle rectangle0" />
									<img
										className="rectangle rectangle-imgleft"
										alt="Mask group"
										src={require("../assets/img/signup/fifthleft.png")}
									/>
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12 position-relative mt-5 pt-4">
							<div className="box5right ">
								<div>
									<h2>Optmizing your wedding Expenses</h2>
									<br />
									<p>
										Our expert team of financial advisors have assisted over
										250+ clients in ensuring that their finances are spent
										judiciously towards their wedding.
									</p>
									<p>
										We assist you in converting your wedding expenses into EMI's
										and ensure that your savings start producing returns which
										contribute towards each EMI.
									</p>
									<p>Our Wedding EMI's optimize your expenses by 30% - 60%</p>
									<div
										className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-absolute"
										style={{ left: "-10%", zIndex: "-1" }}
									>
										<img
											className="d-none d-sm-none d-md-block d-lg-block d-xl-block"
											alt="Famile mm"
											src={require("../assets/img/signup/group-1088.png")}
											height={"200px"}
										/>
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative  d-sm-block d-md-none d-lg-none d-xl-none mt-5">
								<div>
									<img
										className="vec-heart"
										alt="Famile mm"
										src={require("../assets/img/signup/Vector-invert.png")}
									/>
									<div className="inp-box5left">
										<div className="rectangle rectangle3" />
										<div className="rectangle rectangle2" />
										<div className="rectangle rectangle0" />
										<img
											className="rectangle rectangle-imgleft"
											alt="Mask group"
											src={require("../assets/img/signup/fifthleft.png")}
										/>
									</div>
								</div>
							</div>
							<div className="inp-box5right d-none d-md-block">
								<div className="rectangle rectangle3" />
								<div className="rectangle rectangle2" />
								<div className="rectangle rectangle1" />
								<div className="rectangle rectangle0" />
								<div className="rectangle rectangle-imgblock">
									<div className="col">
										<img
											className="img-fluid pe-1"
											alt="Famile mm"
											src={require("../assets/img/signup/fifthright3.png")}
										/>
									</div>
									<div className="col">
										<img
											className="img-fluid pe-1"
											alt="Famile mm"
											src={require("../assets/img/signup/fifthright1.png")}
										/>
									</div>
									<div className="col">
										<img
											className="img-fluid"
											alt="Famile mm"
											src={require("../assets/img/signup/fifthright2.png")}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row sixth-box d-flex justify-content-between mt-5">
				<div className="mt-3">
					<h2 className="text-center">Senior Citizen Outreach</h2>
					<p className="text-center">
						Famile Network takes care of Senior Citizens through our outreach
						programs.
					</p>
				</div>
				<div className="slider">
					<div className="slide-track">
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-4.jpeg")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-2.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-1.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-3.jpeg")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-4.jpeg")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-2.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-1.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-3.jpeg")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-4.jpeg")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-2.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1.png")}
							/>
						</div>
						<div className="slide">
							<img
								className="img-fluid rounded img-w-h-full"
								alt="Famile mm"
								src={require("../assets/img/signup/Famile 1-1.png")}
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
}
