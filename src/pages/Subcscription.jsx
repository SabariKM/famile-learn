import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { AccessContext } from "../constant/AccessContext";
import { getSubscription } from "../constant/url";

export const Subcscription = (props) => {
	const access = React.useContext(AccessContext).authID;
	const [subDetail, setSubDetail] = React.useState({
		subDate: "",
		regDate: "",
		validTill: 0,
	});
	let navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(null);

  const isValidUser = sessionStorage.getItem('access_detals');

	function daysRemaining(enddate) {
		var eventdate = moment(enddate);
		var todaysdate = moment();
		return eventdate.diff(todaysdate, "days");
	}

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
					navigate("/login");
				} else if (res_data.status_code === 200) {
					setSubDetail({
						subDate: moment(res_data.data.sub_date).format("MMM Do YYYY"),
						regDate: moment(res_data.data.reg_date).format("MMM Do YYYY"),
						validTill: daysRemaining(res_data.data.valid_till),
					});
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
	};

	React.useEffect(() => {
		handleGetSubDetails(isValidUser);
	}, [isValidUser]);

  useEffect(() => {
    if (isValidUser !== undefined && isValidUser !== "" && isValidUser !== null) {
      setLoginStatus("LOGGINSUCCESS");
    }
  }, []);

	return (
		<>
			<Header loginStatus={loginStatus} />
      <div className="bg-container">
        <div className="commonContainer container">
          <div className="main-div subscriptionBox" style={{ justifyContent: 'space-between' }}>
            <div className="row">
              <h2 className="text-center fs-21 mx-auto">Subscription</h2>
              <div className="paymentDivider mt-4"></div>
              <div className="d-flex justify-content-center">
                <div className="col-lg-5 col-md-7 col-sm-9 col-11 mt-40">
                  <div
                    className="col-12 mb-3 d-flex rounded bg-white"
                    style={{boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.05)"}}
                  >
                    <div
                      className="h-48 col-6 border-end d-flex justify-content-center align-items-center"
                      style={{color: '#9A9A9A'}}
                    >
                      Profile Registered
                    </div>
                    <div className="h-48 col-6 d-flex justify-content-center align-items-center">{subDetail.regDate}</div>
                  </div>
                  <div
                    className="col-12 mb-3 d-flex rounded bg-white"
                    style={{boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.05)"}}
                  >
                    <div
                      className="h-48 col-6 border-end d-flex justify-content-center align-items-center"
                      style={{color: '#9A9A9A'}}
                    >
                      Subscription From
                    </div>
                    <div className="h-48 col-6 d-flex justify-content-center align-items-center">{subDetail.subDate}</div>
                  </div>
                  <div
                    className="col-12 mb-3 d-flex rounded bg-white"
                    style={{boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.05)"}}
                  >
                    <div
                      className="h-48 col-6 border-end d-flex justify-content-center align-items-center"
                      style={{color: '#9A9A9A'}}
                    >
                      Remaining Days
                    </div>
                    <div className="h-48 col-6 d-flex justify-content-center align-items-center">{subDetail.validTill}</div>
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
			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
