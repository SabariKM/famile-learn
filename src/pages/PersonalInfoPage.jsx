import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { PersonalInfoEdit } from "../component/PersonalInfoEdit";
import { PersonalInfoView } from "../component/PersonalInfoView";

import { getpersonalinfo } from "../constant/url";

export const PersonalInfoPage = (props) => {
	let navigate = useNavigate();
	const state = useLocation()["state"];

	let propData = { ...state, login: false };

	const [loading, setLoading] = useState();
	const [formData, setFormData] = useState({
		fname: "",
		email: "",
		gender: "",
		dob: "",
		language: "",
		religion: "",
		edu_qual: "",
		profession: "",
		annual_income: "",
		food: "",
    smoke: "",
    drink: "",
		height: "",
		weight: "",
		city: "",
		state: "",
		country: "",
		photo: require("../assets/img/signup/profilesample.png"),
	});
  const [loginStatus, setLoginStatus] = useState(null);
	const [dispBox, setDispBox] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [dispBtn, setDispBtn] = useState("");

  const isValidUser = sessionStorage.getItem('access_detals');

	const handlePersonalInfo = async () => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", isValidUser);

		await axios({
			method: "post",
			url: getpersonalinfo,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					const udata = res_data.data;
					setFormData({
						fname: udata.fname,
						email: udata.email,
						gender: udata.gender,
						dob: udata.dob,
						language: udata.language,
						religion: udata.religion,
						edu_qual: udata.edu_qual,
						profession: udata.profession,
						annual_income: udata.annual_income,
						food: udata.food,
            smoke: udata.smoke,
            drink: udata.drink,
						height: udata.height,
						weight: udata.weight,
						city: udata.city,
						state: udata.state,
						country: udata.country,
						photo: udata.photo,
					});
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const handleEditView = (e) => {
		if (e === "EDIT") {
      setDispBtn("EDIT");
			setDispBox(
				<PersonalInfoEdit
					propData={propData}
					pageChange={(name) => handleEditView(name)}
          formData={formData}
				/>
			);
		} else if (e === "VIEW") {
      setDispBtn("VIEW");
			setDispBox(
				<PersonalInfoView
					propData={propData}
					pageChange={(name) => handleEditView(name)}
          formData={formData}
				/>
			);
		}
	};

	useEffect(() => {
		if (isValidUser === undefined || !isValidUser) {
			navigate("/login");
			return;
		}
    if (isValidUser !== undefined && isValidUser !== null && isValidUser !== "") {
      propData = { authID: isValidUser, login: true };
    }
		if (propData.acctype === "signup") {
			navigate("/sgpersonalinfo");
			return;
		}
		handlePersonalInfo();
	}, [isValidUser]);

  useEffect(() => {
    if (dispBtn === 'VIEW') {
      handlePersonalInfo();
    }
  }, [dispBtn]);

	useEffect(() => {
		!isInitialRender && handleEditView("VIEW");
	}, [formData]);

  useEffect(() => {
    if (isValidUser !== undefined && isValidUser !== "" && isValidUser !== null) {
      setLoginStatus("LOGGINSUCCESS");
      setIsInitialRender(false);
    }
  }, []);

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
			<Header loginStatus={loginStatus} />
      <div className="bg-container">
        <div className="commonContainer container d-flex justify-content-center">
          <div className={`main-div ${!dispBox ? 'personalMainDiv' : ''}`}>
            <h2 className="text-center m-0 fs-21 mb-2">Profile Photo</h2>
            <div className="paymentDivider mt-4"></div>
            {dispBox}
            <div className="row mt-3 mb-2">
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
			<div className="ft-footer-block mt-32">
				<Footer />
			</div>
		</>
	);
};
