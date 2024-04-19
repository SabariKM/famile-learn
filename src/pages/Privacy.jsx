import React from "react";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const Privacy = (props) => {
	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="content-div">
						<div className="row">
							<div className="col d-flex justify-item-center">
								<div className="col ">
									<h2 className="text-center">
										Your Privacy & our Responsibility
									</h2>
									<ul>
										<li>
											<p>
												Famile is owned and operated by 1D1S Entercon Pvt Ltd.
											</p>
										</li>
										<li>
											<p>
												User hereby agrees that use of the services of this
												website is voluntary and all information provided by the
												user to Famile are done so on the users own volition.
											</p>
										</li>
										<li>
											<p>
												User hereby agrees to not hold Famile or any
												representatives of Family officially responsible for the
												details provided by other users seeking matrimonial
												matches.
											</p>
										</li>
										<li>
											<p>
												User agrees to participate in full honesty on this site
												and shall not provide any falsified information.
											</p>
										</li>
										<li>
											<p>
												User hereby agrees and is aware that any falsified
												information provided by the user shall result in a ban
												on the site.
											</p>
										</li>
									</ul>
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
