import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const Logout = (props) => {
	props.onLogOut(true);
	let navigate = useNavigate();
	const handleLoginRegister = (e) => {
		if (e === "login") {
			navigate("/login");
		}
	};
	return (
		<>
			<Header acc_type="login" ret_type={(e) => handleLoginRegister(e)} />
			<div className="container ">
				<div className="main-div" style={{ height: "750px" }}>
					<div className=" col m-5">
						<h1 className="text-center text-capitalize">
							Thank you for Visiting{" "}
						</h1>
						<br />
						<h1 className="text-center ">FAMILI</h1>
						<div className="col d-flex justify-content-center">
							<div className="col-8 p-5 bg-dark border border-light rounded shadow-lg">
								<img
									className="img-fluid"
									src={require("../assets/logo/logo_light.png")}
									srcSet={require("../assets/logo/logo_light.png")}
									alt="Famile Logo"
								/>
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
