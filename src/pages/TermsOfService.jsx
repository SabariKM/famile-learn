import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { Link } from "react-router-dom";

export const TermsOfService = (props) => {
	const propData = useLocation()["state"];
	let navigate = useNavigate();
	const access = propData?.authID;
	const phone = propData?.phone;
	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="">
						<div className="row">
							<h2 className="text-center mt-5">Privacy Policy</h2>
							<div className="col d-flex justify-content-center">
								<div className="col-12 col-md-10 px-5 tos-content">
									<p>
										<b>PRIVACY POLICY</b>
									</p>
									<p>
										Famile.org, solely owned and operated by 1D1S Entercon Pvt
										Ltd, Chennai, India, places a strong emphasis on good
										ethics, and an unwavering commitment to integrity, ensuring
										a foundation built on trust and respect in every interaction
										with our customers. As a responsible organization, we place
										great importance on safeguarding user privacy.
										<br></br>
										The policy below categorically details how we use any data
										collected on service operated by Famile.org.
									</p>
									<p>
										<b>THE INFORMATION WE COLLECT:</b>
									</p>
									<p>
										Our Website collects information from members and visitors
										who apply for the matrimonial or match-making service. This
										includes, but may not be limited to, the user's photo,
										profile videos, email address, name, date of birth,
										educational qualifications, and identity proof documents
										submitted voluntarily for verification. Additionally, a
										user-specified password, mailing address, zip/pin code, and
										telephone/mobile number are gathered.
										<br></br>
										For financial transactions, we use a secure server with
										encryption to protect user-information. Cookies are employed
										to store login information, which are small files on your
										hard drive aiding in service provision.
										<br></br>
										The collected user information depends on interactions,
										choices, and product features used. It's used for
										authentication, account access. When accessing our websites
										or apps, data on device ID, log files, geographic location,
										and device information/specifications are collected
										automatically.
									</p>
									<p>
										<b>HOW WE USE DATA:</b>
									</p>
									<p>
										Personal information is used for verification, data
										analysis, usage trends, improving our site/apps, marketing
										research, and fraud prevention. Demographic and profile data
										is analyzed for continual product and service improvement.
										IP addresses help diagnose server problems, administer the
										website/apps, identify users, and gather broad demographic
										information.
									</p>
									<p>
										<b>COMPLIANCE WITH LAW:</b>
									</p>
									<p>
										When required or permitted by law, we may provide
										information to regulators, law enforcement agencies, or to
										protect the rights, property, or personal safety of other
										members or the general public. If a transaction seems
										suspicious, we may voluntarily share your information with
										law enforcement agencies, gateway service providers, or
										anti-fraud solution providers.
									</p>
									<p>
										<b>DATA RETENTION PERIOD:</b>
									</p>
									<p>
										In accordance with the Privacy Policy, we will retain the
										information collected from users under the following
										circumstances:
										<br></br>
										For the duration of users' subscription to our services,
										serving their intended purpose(s) for which it was
										collected. To enforce agreements, perform audits, resolve
										disputes, establish legal defenses, pursue legitimate
										business activities, and comply with relevant regulations.
									</p>
									<p>
										<b>SECURITY PRECAUTIONS:</b>
									</p>
									<p>
										Our goal is to safeguard your personal information using a
										combination of organizational and technical security
										measures. We have established strong security services on
										our server and related technology stack, as well as internal
										control measures have been specifically designed to ensure
										the security of any personal information. It is important to
										note, however, that we cannot guarantee the internet's
										absolute security. However, once your information is in our
										possession, we strictly adhere to security guidelines to
										protect it against unauthorized access.
									</p>
									<p>
										<b>POLICY CHANGES:</b>
									</p>
									<p>
										We reserve the right to change this Privacy Policy
										periodically without prior notice. Any changes will be
										reflected and updated on the Privacy Policy page.
									</p>
									<div className="d-grid gap-2 col-6 col-md-3 mx-auto my-5 ">
										{access && (
											<button
												type="submit"
												className="btn btn-primary bg-dark p-2"
												onClick={() =>
													navigate("/subscriptionrate", { state: propData })
												}
											>
												AGREE & ACCEPT
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="d-none d-md-block">
							<div className="row ">
								<div className="col">
									<div className=" d-flex justify-content-start">
										<img
											className="img-fluid btm-flower-left"
											src={require("../assets/img/signup/btmflower2.png")}
											alt="profileimg"
										/>
									</div>
								</div>
								<div className="col">
									<div className=" d-flex justify-content-end">
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
			</div>
			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
