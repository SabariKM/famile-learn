import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { signup } from "../constant/url";
import "../css/signup.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export default function SignUp(props) {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

	// useEffect(() => {
  //   props.onLogOut(true);
  // }, []);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const onSubmit = async (data) => {
    const { name, phone } = data;
    setLoading(true);

    var bodyFormData = new FormData();
    bodyFormData.append("name", name.trim());
    bodyFormData.append("phone", phone);

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
              phone: phone,
              fname: name.trim(),
              acctype: "signup",
            },
          });
        } else if (res_data.status_code === 416) {
          setErrorText(416);
        } else {
          setErrorText(res_data.status_msg);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    setLoading(false);
  }

	const handleLoginRegister = (e) => {
		if (e === "login") {
			navigate("/login");
		}
	};

  const handleNameInput = (event) => {
    let inputValue = event.target.value;
    const isValid = /^[a-zA-Z\s]*$/.test(inputValue);
    if (isValid) {
      inputValue = inputValue.slice(0, 30);
    } else {
      inputValue = inputValue.replace(/[^a-zA-Z\s]/g, '').slice(0, 30);
    }
    setValue('name', inputValue);
  };

  const handleNumberinput = (event) => {
    let inputValue = event.target.value;
    const isValid = /^[6789]\d{0,9}$/.test(inputValue);
    if (isValid) {
      // Ensure the length does not exceed 10 characters
      inputValue = inputValue.slice(0, 10);
    } else {
      // Remove non-numeric characters and ensure the length does not exceed 10 characters
      inputValue = inputValue.replace(/[^6789\d]/g, '').slice(0, 10);
    }
    setValue('phone', inputValue);
  }

	return (
		<>
			<Header acc_type="login" ret_type={(e) => handleLoginRegister(e)} />
			<div className="SIGNUP ">
				<div className="container container-width ">
					<div className="row mt-0 mt-sm-5">
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-flex justify-content-sm-center justify-content-lg-start">
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
								<div className="row mt-lg-5 pt-3">
									<div className="col">
										<p className="para text-start mb-0">
											<strong className="bold-title">34</strong> avg.
										</p>
										<p className="para text-start">Registrations/Week</p>
									</div>
									<div className="col">
										<p className="para mb-0">
											<strong className="bold-title">83%</strong>
										</p>
										<p className="para">Success Rate</p>
									</div>
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
					<div className=" d-flex second-block section">
						<div className="col-10 col-md-4 col-lg-3 d-flex justify-content-center p-2">
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
						<div className="col-10 col-md-4 col-lg-3 d-flex justify-content-center p-2">
							<div className="card">
								<div className="card-body p-3">
									<div className="d-flex justify-content-end ">
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

						<div className="col-10 col-md-4 col-lg-3 d-flex justify-content-center p-2">
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
						<div className="col-10 col-md-4 col-lg-3 d-flex justify-content-center p-2">
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
				</div>
				<div className="d-flex secondReel-block section">
          {/* <Carousel>
          </Carousel> */}
          <div className="col-10 col-sm-4 col-md-4 col-lg-3 px-1">
            <img
              className="reel-rounded img-fluid"
              src={require("../assets/img/signup/gifplace.png")}
              alt=""
            />
          </div>
          <div className="col-10 col-sm-4 col-md-4 col-lg-3 px-1">
            <img
              className="reel-rounded img-fluid"
              src={require("../assets/img/signup/gifplace2.png")}
              alt=""
            />
          </div>
          <div className="col-10 col-sm-4 col-md-4 col-lg-3 px-1">
            <img
              className="reel-rounded img-fluid"
              src={require("../assets/img/signup/gifplace1.png")}
              alt=""
            />
          </div>
          <div className="col-10 col-sm-4 col-md-4 col-lg-3 px-1">
            <img
              className="reel-rounded img-fluid"
              src={require("../assets/img/signup/gifplace2.png")}
              alt=""
            />
          </div>
				</div>
				<div className="section position-relative third-box ">
					<div className="position-absolute" style={{ zIndex: -1 }}>
						<img
							className="bg-image  "
							alt="Famile mm"
							src={require("../assets/img/signup/Join-Background.webp")}
						/>
					</div>
					<div className="container container-width">
						<div className="col">
							<div className="d-flex justify-content-center">
								<div className="col-12 col-md-9 col-lg-7 col-xl-12 mt-3 position-relative d-flex justify-content-center">
									<div className="inp-box">
										<div className="rectangle rectangle4" />
										<div className="rectangle rectangle3" />
										<div className="rectangle rectangle2" />
										<div className="rectangle rectangle1 pt-3">
											<div className="d-flex justify-content-center">
												<form
													method="post"
													className="signup-form mx-4"
													onSubmit={handleSubmit(onSubmit)}
												>
													<h2 className="text-center mt-3 mb-0 fs-4">Join Our Network</h2>
													<p className="text-center mt-1 mb-4">
														Enter your details below
													</p>
                          <div className={`inputField inputFieldName nameField ${errors.name ? "borderError" : ""} ${isInputFocused ? 'inputFocused' : ''}`}>
                            <input
                              {...register("name", {
                                required: "Name is required",
                                minLength: {
                                  value: 2,
                                  message: "Minimum 2 characters"
                                },
                                maxLength: {
                                  value: 30,
                                  message: "Maximum 30 characters"
                                },
                                pattern: {
                                  value: /^[A-Za-z ]+$/,
                                  message: "Enter Valid Name"
                                }
                              })}
                              className={`form-control p-2 mt-1 ${errors.name ? "border-danger" : "border border-1"}`}
                              placeholder="Name"
                              onInput={handleNameInput}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            {errors.name &&
                              <p className="errorField">
                                {errors.name.message}
                              </p>
                            }
                          </div>
													<div className="input-group mt-3">
														<div className="col-2 me-2 registerInputField">
															<select className={`form-select p-2 ${errors.phone ? "border-danger" : "border border-1"}`}>
																<option>IN</option>
															</select>
														</div>
														<div className="col-2 me-2 registerInputField">
															<input
																type="numeric"
																maxLength="10"
																minLength="10"
																value="+91"
																className={`form-control p-2 me-2 ${errors.phone ? "border-danger" : "border border-1"}`}
																placeholder="Phone"
																name="phone_code"
																disabled
															/>
														</div>
														<input
															{...register("phone", {
                                required: "Phone Number is required",
                                minLength: {
                                  value: 10,
                                  message: "Enter Valid Phone Number"
                                },
                                maxLength: {
                                  value: 10,
                                  message: "Enter Valid Phone Number"
                                },
                                pattern: {
                                  value: /^[6789]\d{9}$/,
                                  message: "Enter Valid Phone Number"
                                }
                              })}
                              onInput={handleNumberinput}
															className={`form-control p-2 ${errors.phone ? "border-danger" : "border border-1"}`}
															placeholder="Phone"
														/>
													</div>
                          {errors.phone &&
                            <p className="errorField">
                              {errors.phone.message}
                            </p>
                          }
													<div className="d-grid gap-2 col-10 mx-auto mt-4 ">
														<button
															type="submit"
															className="btn btn-primary bg-dark p-2"
															disabled={loading}
														>
															JOIN
														</button>
													</div>
                          <div
                            className="position-relative mt-2"
                            style={{ height: "25px"}}
                          >
                            {errorText === 416 && (
                              <div className="d-flex justify-content-center">
                                <p className="error errorField text-center text-capitalize m-0">
                                  Phone Number is Already Registered
                                </p>
                                <NavLink
                                  to={"/login"}
                                  exact
                                  className="text-center text-capitalize ps-1 text-decoration-underline loginLink"
                                >
                                  Login
                                </NavLink>
                              </div>
                            )}
                          </div>
												</form>
											</div>
											<div className="d-flex justify-content-center pt-1">
												<img
													className="btm-flower signup-btm-flower"
													alt="Mask group"
													src={require("../assets/img/signup/mask-group.png")}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section position-relative fourth-box">
					<div className="d-flex justify-content-center">
						<div className="col-12 col-xl-6">
							<p className="sub-title">
								Interest-Based, Location-Centric Matchmaking
							</p>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<div className="col-11 col-xl-6 col-lg-9 ">
							<p className="para">
								Set your own preferences on your match-making process and our
								algorithms will best serve you. Our team is here to help if you
								need any assistance.
							</p>
						</div>
					</div>

					<div style={{ zIndex: -1 }} className="mt-1">
						<img
							className=" img-fluid bg-image"
							alt="preferance"
							src={require("../assets/img/signup/Preferences.webp")}
						/>
					</div>
				</div>
				<div className="section position-relative fifth-box">
					<div className="container container-width">
						<p className="sub-title">Frequently Asked Questions</p>
						<div className=" d-flex justify-content-center">
							<div className="col-12 col-md-11">
								<div className="accordion mt-1" id="accordionExample">
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingOne">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseOne"
												aria-expanded="true"
												aria-controls="collapseOne"
											>
												Is it true that my profile and photo will not be
												publicly shared?
											</button>
										</h2>
										<div
											id="collapseOne"
											className="accordion-collapse collapse show"
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													True. Your profile, email, phone number, photo or any
													other details about you will not be publicly shared
													with other users. Your profile is so private that
													nobody will know you joined Famile. All matches are
													conducted on a 1-to-1 basis and if both you and the
													other person are mutually interested, then your
													contact details such as phone number will be shared
													with each other.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingTwo">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTwo"
												aria-expanded="false"
												aria-controls="collapseTwo"
											>
												After I join Famile, how will I receive matches or
												matching-profiles?
											</button>
										</h2>
										<div
											id="collapseTwo"
											className="accordion-collapse collapse"
											aria-labelledby="headingTwo"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													Every week, we scan all the profiles and select
													matches for you. Then we send the matches to you by
													email and we also notify you by sms informing you to
													check your email. The email you receive will have an
													Express Interest button under each profile. Clicking
													that button will notify that person of your interest.
													If they are also interested, your phone numbers will
													be shared with each other for your further
													consideration. If there are no new matches for you,
													then you will not receive the email and sms. But you
													will receive matches in subsequent weeks based on
													availability of matching-profiles.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingThree">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseThree"
												aria-expanded="false"
												aria-controls="collapseThree"
											>
												How many profiles can I get per week?
											</button>
										</h2>
										<div
											id="collapseThree"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													You will get up to 3 profiles per week. If there are
													no matches, you may not receive an email. Next week,
													you will receive emails based on availability of
													matching-profiles.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingfour">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapsefour"
												aria-expanded="false"
												aria-controls="collapsefour"
											>
												Does Famile verify the matching-profiles being sent to
												me?
											</button>
										</h2>
										<div
											id="collapsefour"
											className="accordion-collapse collapse"
											aria-labelledby="headingfour"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													We conduct basic level verifications about the members
													who join Famile. However, we strongly recommend you to
													conduct thorough background checks on potential
													matches before proceeding.
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item mb-3">
										<h2 className="accordion-header" id="headingfive">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapsefive"
												aria-expanded="false"
												aria-controls="collapsefive"
											>
												I received an email saying someone is interested in me.
												What do I do?
											</button>
										</h2>
										<div
											id="collapsefive"
											className="accordion-collapse collapse"
											aria-labelledby="headingfive"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p>
													This email means that your profile was sent to someone
													and they are interested in you. So our system sends
													their profile to you. This notification is sent
													immediately when someone says they are interested in
													you. You may receive interest-notification from
													multiple people in a week.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="section row sixth-box d-flex justify-content-between ">
					<div className="container container-width">
						<h2 className="text-center text-h2-seniorCitizen">Senior Citizen Care</h2>
						<p className="text-center text-p-seniorCitizen">
							Famile Network takes care of Senior Citizens through our outreach
							programs.
						</p>
						<div className="d-none d-sm-flex justify-content-center gap-3 flex-wrap">
              <div className="seniorCitizenImg">
                <img
                  className="img-fluid sr1-img"
                  src={require("../assets/img/signup/sr1.webp")}
                  alt=""
                />
              </div>
              <div className="seniorCitizenImg">
                <img
                  className="img-fluid sr2-img"
                  src={require("../assets/img/signup/sr3.webp")}
                  alt=""
                />
              </div>
              <div className="seniorCitizenImg">
                <img
                  className="img-fluid sr4-img"
                  src={require("../assets/img/signup/sr5.webp")}
                  alt=""
                />
              </div>
              <div className="seniorCitizenImg">
                <img
                  className="img-fluid sr5-img"
                  src={require("../assets/img/signup/sr2.webp")}
                  alt=""
                />
              </div>
              <div className="seniorCitizenImg">
                <img
                  className="img-fluid sr3-img"
                  src={require("../assets/img/signup/sr4.webp")}
                  alt=""
                />
              </div>
              <div className="seniorCitizenImg">
                <img
                  className="img-fluid sr1-img"
                  src={require("../assets/img/signup/senior1.png")}
                  alt=""
                />
              </div>
						</div>
            <div className="d-flex d-sm-none gap-3 flex-wrap overflow-auto">
              <div className="d-flex gap-3">
                <div className="seniorCitizenImg">
                  <img
                    className="img-fluid sr1-img"
                    src={require("../assets/img/signup/sr1.webp")}
                    alt=""
                  />
                </div>
                <div className="seniorCitizenImg">
                  <img
                    className="img-fluid sr2-img"
                    src={require("../assets/img/signup/sr3.webp")}
                    alt=""
                  />
                </div>
                <div className="seniorCitizenImg">
                  <img
                    className="img-fluid sr4-img"
                    src={require("../assets/img/signup/sr5.webp")}
                    alt=""
                  />
                </div>
              </div>
              <div className="d-flex gap-3 me-4">
                <div className="seniorCitizenImg">
                  <img
                    className="img-fluid sr5-img"
                    src={require("../assets/img/signup/sr2.webp")}
                    alt=""
                  />
                </div>
                <div className="seniorCitizenImg">
                  <img
                    className="img-fluid sr3-img"
                    src={require("../assets/img/signup/sr4.webp")}
                    alt=""
                  />
                </div>
                <div className="seniorCitizenImg">
                  <img
                    className="img-fluid sr1-img"
                    src={require("../assets/img/signup/senior1.png")}
                    alt=""
                  />
                </div>
              </div>
						</div>
					</div>
				</div>
			</div>
			<div className="ft-footer-block mt-5">
				<Footer />
			</div>
		</>
	);
}
