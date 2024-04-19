import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { getPreferance, getpersonalinfo } from "../constant/url";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { PreferanceEdit } from "../component/PreferanceEdit";
import { PreferanceView } from "../component/PreferanceView";
import dayjs from "dayjs";

export const Preference = (props) => {
	let navigate = useNavigate();
	const access = useContext(AccessContext)?.authID;
  const isValidUser = sessionStorage.getItem('access_detals');
  const propData = useLocation()["state"];

  const key = sessionStorage.getItem('key');

	const [formData, setFormData] = useState({
		gender: "",
		fromAge: "",
		toAge: "",
		marital_status: "",
		food: "",
		language: "",
		religion: "",
    smoke: "",
    drink: "",
		state: "",
		country: "India",
	});

	const [dispBox, setDispBox] = useState(
		<PreferanceEdit authID={isValidUser} formData={formData} />
	);
  const [dispBtn, setDispBtn] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const [enableDefault, setEnableDefault] = useState(false);

	const handlePreferance = async () => {
		var bodyFormData = new FormData();
		bodyFormData.append("authId", isValidUser);

		await axios({
			method: "post",
			url: getPreferance,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
				} else if (res_data.status_code === 200) {
					const retData = res_data.data;
					setFormData({
						gender: retData.gender,
						fromAge: retData.fromAge,
						toAge: retData.toAge,
						marital_status: retData.marital_status,
						food: retData.food,
						language: retData.language,
						religion: retData.religion,
            smoke: retData.smoke,
            drink: retData.drink,
						state: retData.state,
						country: retData.country,
					});
					// setRetMsg({ type: "success", msg: res_data.status_msg });
				} else {
					// setRetMsg({ type: "error", msg: res_data.status_msg });
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
	};

	const handleEditView = (e) => {
		if (e === "EDIT") {
      setDispBtn("EDIT");
			setDispBox(
        <PreferanceEdit
          authID={isValidUser}
          formData={formData}
          pageChange={(name) => handleEditView(name)}
          setEnableDefault={setEnableDefault}
        />
      );
		} else if (e === "VIEW") {
      setDispBtn("VIEW");
			setDispBox(
        <PreferanceView
          authID={isValidUser}
          formData={formData}
          pageChange={(name) => handleEditView(name)}
          handlePreferance={handlePreferance}
        />
      );
		}
	};

	const handleLoginRegister = (e) => {
		if (e === "login") {
			navigate("/login");
		}
	};

  const handlePreferenceDefault = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append('authId', isValidUser);

    await axios({
      method: "post",
      url: getpersonalinfo,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        const res_data = response.data;
        if (res_data.status_code === 200) {
          const udata = res_data.data;
          const today = dayjs();
          const dob = dayjs(udata.dob);
          const getAge = today.diff(dob, 'year');

          setEnableDefault(true);
          setFormData({
            ...formData,
            fromAge: (getAge - 5) < 18 ? 18 : (getAge - 5),
            toAge: (getAge + 5) > 73 ? 73 : (getAge + 5),
            gender: udata.gender === "Male" ? "Female" : "Male"
          });
        }
      })
      .catch(response => {
        console.log(response);
      })
  }

	useEffect(() => {
		if (!isValidUser) {
			navigate("/login");
			return;
		} else {
			handlePreferance();
			handleEditView("EDIT");
		}
	}, [isValidUser]);

	useEffect(() => {
    !enableDefault
      ? handleEditView("VIEW")
      : handleEditView("EDIT");
	}, [formData, enableDefault]);

  useEffect(() => {
    if (key === "preference" || propData?.key === "preference") {
      handleEditView("EDIT");
      handlePreferenceDefault();
    }
  }, [key]);

  useEffect(() => {
    if (isValidUser !== undefined && isValidUser !== "" && isValidUser !== null) {
      setLoginStatus("LOGGINSUCCESS");
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
			<Header
				// acc_type="login"
				ret_type={(e) => handleLoginRegister(e)}
				loginStatus={loginStatus}
			/>
      <div className="bg-container">
        <div className="container commonContainer">
          <div className="main-div" style={{ justifyContent: 'unset' }}>
            <div className="d-flex justify-content-center gap-4 mb-26">
              {dispBtn === 'EDIT' && key !== 'all-verified' &&  (
                <div class="profile">
                  <div class="outer">
                    <div class="inner">
                      <div id="number">
                        95%
                      </div>
                    </div>
                  </div>
                  <svg width="70px" height="70px">
                    <circle
                      className="profile95"
                      cx="35"
                      cy="35"
                      r="30"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              )}
              {dispBtn === 'EDIT' && (
                <div className="subscriptionHead">
                  <h3 className="text-center">Enter your Preferences</h3>
                  {key !== 'all-verified' && (
                    <p className="cp">Enter your details below</p>
                  )}
                </div>
              )}
              {dispBtn === 'VIEW' && (
                <div className="subscriptionHead">
                  <h3 className="text-center">Preferences</h3>
                </div>
              )}
            </div>
            <div className="paymentDivider"></div>
            <div className="row">
              <div className="col mt-40">
                {dispBox}
              </div>
            </div>
            <div className="row mt-3 mb-3">
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
			<div className="ft-footer-block mt-4">
				<Footer />
			</div>
		</>
	);
};
