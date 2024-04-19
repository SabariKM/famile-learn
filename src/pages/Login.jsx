import React, { useEffect, useState } from "react";
import "../css/login.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { LoginBox } from "../component/LoginBox";
import { RegisterBox } from "../component/RegisterBox";
import { useLocation } from "react-router-dom";

export const Login = (props) => {
	const propData = useLocation()["state"];
  const location = useLocation();
  const pathname = location.pathname;

	const [dispBox, setDispBox] = useState(
		propData?.ret_type === "register" ? (
			<RegisterBox />
		) : (
			<LoginBox
				changeBox={(e) => handleChangeBox(e)}
				onLogin={(e) => handleOnLogin(e)}
			/>
		)
	);
	const [accType, setAccType] = useState("register");

	const handleChangeBox = (e) => {
		if (e === "register") {
			setDispBox(<RegisterBox />);
			setAccType("login");
		} else {
			setDispBox(
				<LoginBox
					changeBox={(e) => handleChangeBox(e)}
					onLogin={(e) => handleOnLogin(e)}
				/>
			);
			setAccType("register");
		}
	};

	const handleOnLogin = (e) => {
		props.onLogin(e);
	};

  useEffect(() => {
    if (pathname === '/join') {
      setDispBox(<RegisterBox />);
    }
  }, [pathname]);

	return (
		<>
			<Header ret_type={(e) => handleChangeBox(e)} acc_type={accType} />
			<div className="LOGIN">
				<div className="container">
					<div className="row">
						{dispBox}
						<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-0">
							<div className="login-block-right d-flex justify-content-end">
								<div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">
									<div>
										<img
											className="vec-heart img-fluid"
											alt="Famile mm"
											src={require("../assets/img/signup/Vector.png")}
										/>
										<div>
											<div className="d-flex justify-content-center">
												<div className="col-5 d-flex justify-content-center ">
													<img
														className="img1 img-w-h-full img-fluid p-2 pb-2"
														alt="Famile mm"
														src={require("../assets/img/signup/img1.png")}
													/>
												</div>
												<div className="col-7 d-flex justify-content-center ">
													<img
														className="img4 img-w-h-full img-fluid p-2 pb-2"
														alt="Famile mm"
														src={require("../assets/img/signup/img2.png")}
													/>
												</div>
											</div>
										</div>
										<div>
											<div className="d-flex justify-content-center">
												<div className="col-7 d-flex justify-content-center">
													<img
														className="img2 img-w-h-full img-fluid p-2 pt-2"
														alt="Famile mm"
														src={require("../assets/img/signup/img3.png")}
													/>
												</div>
												<div className="col-5">
													<img
														className="img3 img-fluid img-w-h-full p-2 pt-2"
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
					</div>
				</div>
			</div>
			<div className="ft-footer-block">
        <div className="d-flex d-md-none justify-content-between mx-lg-3">
          <img
            className="img-fluid"
            src={require("../assets/img/signup/left-tree.png")}
            alt="left tree"
          />
          <img
            className="img-fluid"
            src={require("../assets/img/signup/right-tree.png")}
            alt="left tree"
          />
        </div>
				<Footer />
			</div>
		</>
	);
};
