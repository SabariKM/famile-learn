import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import stateDist from "../constant/state-dist.json";
import religion from "../constant/religion.json";
import language from "../constant/languages.json";
import { setPreferance } from "../constant/url";
import { Button, ButtonGroup, Tab, Tabs } from "@material-ui/core";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const PreferanceEdit = (props) => {
  const isValidUser = sessionStorage.getItem('access_detals');

  const [showModal, setShowModal] = useState(false);
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
	const [errorDisp, setErrorDisp] = useState({
		gender: false,
		fromAge: false,
		toAge: false,
		marital_status: false,
		food: false,
		language: false,
		religion: false,
    smoke: false,
    drink: false,
		state: false,
		country: false,
	});
	const [retMsg, setRetMsg] = useState({ type: "", msg: "" });
	const [loading, setLoading] = useState(false);

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		setErrorDisp({ ...errorDisp, [name]: false });
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateInput = () => {
		if (formData.gender.length === 0) {
			setErrorDisp({
        ...errorDisp,
        gender: true
      });
      return false;
		} else if (formData.fromAge.length === 0
      ||formData.toAge.length === 0
      || formData.toAge < formData.fromAge) {
        setErrorDisp({
          ...errorDisp,
          fromAge: true
        });
        return false;
		} else if (formData.marital_status.length === 0) {
			setErrorDisp({
        ...errorDisp,
        marital_status: true
      });
      return false;
		} else if (formData.language.length === 0) {
			setErrorDisp({
        ...errorDisp,
        language: true
      });
      return false;
		} else if (formData.religion.length === 0) {
			setErrorDisp({
        ...errorDisp,
        religion: true
      });
      return false;
		} else if (formData.food.length === 0) {
			setErrorDisp({
        ...errorDisp,
        food: true
      });
      return false;
		} else if (formData?.smoke?.length === 0) {
			setErrorDisp({
        ...errorDisp,
        smoke: true
      });
      return false;
		} else if (formData?.drink?.length === 0) {
			setErrorDisp({
        ...errorDisp,
        drink: true
      });
      return false;
		} else if (formData.state.length === 0) {
			setErrorDisp({
        ...errorDisp,
        state: true
      });
      return false;
		} else if (formData.country.length === 0) {
			setErrorDisp({
        ...errorDisp,
        country: true
      });
      return false;
		}

    setErrorDisp({
      gender: false,
      fromAge: false,
      toAge: false,
      marital_status: false,
      food: false,
      language: false,
      religion: false,
      smoke: false,
      drink: false,
      state: false,
      country: false,
    });
		return true;
	};

	const handlePreferance = async (e) => {
		e.preventDefault();

		if (!validateInput()) {
			return false;
		}
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", isValidUser);
		bodyFormData.append("gender", formData.gender);
		bodyFormData.append("toAge", formData.toAge);
		bodyFormData.append("fromAge", formData.fromAge);
		bodyFormData.append("marital_status", formData.marital_status);
		bodyFormData.append("language", formData.language);
		bodyFormData.append("religion", formData.religion);
		bodyFormData.append("food", formData.food);
		bodyFormData.append("smoke", formData.smoke);
		bodyFormData.append("drink", formData.drink);
		bodyFormData.append("state", formData.state);
		bodyFormData.append("country", formData.country);

		await axios({
			method: "post",
			url: setPreferance,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
				} else if (res_data.status_code === 200) {
          sessionStorage.setItem('key', 'all-verified');
          props.setEnableDefault(false);
          props.pageChange("VIEW")
					setRetMsg({ type: "success", msg: res_data.status_msg });
          setShowModal(true);
				} else {
					setRetMsg({ type: "error", msg: res_data.status_msg });
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	const fromAge = () => {
		let elem = [];
		for (let i = 18; i <= 80; i++) {
			elem.push(<option value={i}>{i}</option>);
		}
		return elem;
	};

	const toAge = () => {
		let elem = [];
		for (let i = 18; i <= 80; i++) {
			elem.push(<option value={i}>{i}</option>);
		}
		return elem;
	};

  useEffect(() => {
    if (showModal) {
      const modalElement = document.getElementById('profileModal');
      const modal = new Modal(modalElement);
      modal.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        setShowModal(false);
      });
      return () => {
        modal.dispose();
        props.pageChange("VIEW");
      };
    }
  }, [showModal]);

	useEffect(() => {
		setFormData(props.formData);
	}, [props.formData]);

	return (
    <>
      <form method="post" onSubmit={handlePreferance} className="col">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9 col-11 px-2">
            <div className="col-12 mb-3">
              <ButtonGroup
                className={`w-full d-flex btnGroup`}
                variant="outlined"
                name="gender"
              >
                <Button
                  className="col-6 border bg-white fw-normal d-flex align-items-center h-48 text-capitalize btnField btnMale"
                  value="Male"
                  onClick={e => {
                    setFormData({...formData, gender: "Male"});
                    setErrorDisp({...errorDisp, gender: false})
                  }}
                >
                  <span className="me-3 ms-48">Male</span>
                  <CheckCircleIcon
                    color="success"
                    className={formData.gender === "Male" ? 'visible' : 'invisible'}
                  />
                </Button>
                <Button
                  className="col-6 border bg-white fw-normal d-flex align-items-center h-48 text-capitalize btnField btnFemale"
                  value="Female"
                  onClick={e => {
                    setFormData({...formData, gender: "Female"})
                    setErrorDisp({...errorDisp, gender: false})
                  }}
                >
                  <span className="me-3 ms-48">Female</span>
                  <CheckCircleIcon
                    color="success"
                    className={formData.gender === "Female" ? 'visible' : 'invisible'}
                  />
                </Button>
              </ButtonGroup>
              {errorDisp?.gender && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Gender Field Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div class="input-group inputGrp">
                <div className="ageField">
                  <select
                    className={`form-select sel-td ${
                      errorDisp.fromAge && formData.fromAge?.length <= 1
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="fromAge"
                    name="fromAge"
                    onChange={(e) => handleChangeFormData(e)}
                    value={formData.fromAge}
                  >
                    <option value="" selected disabled className="optionsHead">
                      From Age
                    </option>
                    {fromAge()}
                  </select>
                </div>
                <div className="ageField">
                  <select
                    className={`form-select sel-td ageField  ${
                      errorDisp.toAge && formData.toAge?.length <= 1
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="toage"
                    name="toAge"
                    onChange={(e) => handleChangeFormData(e)}
                    value={formData.toAge}
                  >
                    <option value="" selected disabled className="optionsHead">
                      To Age
                    </option>
                    {toAge()}
                  </select>
                </div>
              </div>
              {errorDisp?.fromAge
                && (errorDisp?.fromAge?.length === 0
                    || errorDisp?.toAge?.length === 0) && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  From Age And To Age Is Required
                </p>
              )}
              {errorDisp?.fromAge
                && (formData.toAge < formData.fromAge) && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  From Age Cannot Be Greater Than To Age
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput maritalField preferencePgInput">
                <select
                  className={`form-select sel-td  ${
                    errorDisp.marital_status && formData.marital_status?.length <= 1
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label=""
                  name="marital_status"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.marital_status}
                >
                  <option value="" selected disabled className="optionsHead">
                    Marital Status
                  </option>
                  <option value="Any">Any</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              {errorDisp?.marital_status && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Marital Status Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput langField preferencePgInput">
                <select
                  className={`form-select sel-td  ${
                    errorDisp.language && formData.language?.length <= 1
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Language"
                  name="language"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.language}
                >
                  <option value="" selected disabled className="optionsHead">
                    Language
                  </option>
                  <option value="Any">Any</option>
                  {language.languages?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
              {errorDisp?.language && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Language Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput relegionField preferencePgInput">
                <select
                  className={` multiselect form-select sel-td  ${
                    errorDisp.religion && formData.religion?.length <= 1
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label=""
                  name="religion"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.religion}
                >
                  <option value="" selected disabled className="optionsHead">
                    Religion
                  </option>
                  <option value="Any">Any</option>
                  {religion.religion?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
              {errorDisp?.religion && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Religion Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput foodField preferencePgInput">
                <select
                  className={`form-select sel-td  ${
                    errorDisp.food && formData.food?.length <= 1 ? "is-invalid" : ""
                  }`}
                  aria-label=""
                  name="food"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.food}
                >
                  <option value="" selected disabled className="optionsHead">
                    Food
                  </option>
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </div>
              {errorDisp?.food && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Food Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput smokeField preferencePgInput">
                <select
                  className={`form-select sel-td  ${
                    errorDisp.smoke && formData.smoke?.length <= 1 ? "is-invalid" : ""
                  }`}
                  aria-label=""
                  name="smoke"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.smoke}
                >
                  <option value="" selected disabled className="optionsHead">
                    Smoke
                  </option>
                  <option value="Never">Never</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
              {errorDisp?.smoke && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Smoke Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput drinkField preferencePgInput">
                <select
                  className={`form-select sel-td ${
                    errorDisp.drink && formData.drink?.length <= 1 ? "is-invalid" : ""
                  }`}
                  aria-label=""
                  name="drink"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.drink}
                >
                  <option value="" selected disabled className="optionsHead">
                    Drink
                  </option>
                  <option value="Never">Never</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
              {errorDisp?.drink && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Drink Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="fieldInput locField preferencePgInput">
                <select
                  className={`form-select sel-td  ${
                    errorDisp.state && formData.state?.length <= 1
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label=""
                  name="state"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.state}
                >
                  <option value="" selected disabled className="optionsHead">
                    State
                  </option>
                  {stateDist.states?.map((item) => {
                    return <option value={item.state}>{item.state}</option>;
                  })}
                </select>
              </div>
              {errorDisp?.state && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  State Is Required
                </p>
              )}
            </div>
            <div className="col-12">
              <div className="fieldInput countryField preferencePgInput">
                <select
                  className={`form-select sel-td  ${
                    errorDisp.country && formData.country?.length <= 1
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label=""
                  name="country"
                  onChange={(e) => handleChangeFormData(e)}
                  value={formData.country}
                >
                  <option value="" disabled className="optionsHead">
                    Country
                  </option>
                  <option selected value="India">India</option>
                </select>
              </div>
              {errorDisp?.country && (
                <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                  Country Is Required
                </p>
              )}
            </div>
            <div className="col-12 mb-3">
              <div className="gap-2 mx-auto mt-40 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary bg-dark p-2 col-7"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
              <p className={`text-center ${retMsg.type} mt-1`}>{retMsg.msg}</p>
            </div>
          </div>
        </div>
      </form>
      {showModal && (
        <div
          className='modal fade'
          id="profileModal"
          tabIndex={-1}
          data-bs-backdrop="static"
        >
          <div className='modal-dialog'>
            <div className='modal-content profile-content'>
              <div className='modal-header'>
                <button
                  type="button"
                  class="btn-close custom-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div class="modal-body">
                <div className="modal-image-container mx-auto mb-3">
                  <img
                    src={require('../assets/img/signup/PopupTickIcon.png')}
                    alt="Profile Created!"
                  />
                </div>
                <p className="text-center m-0 mb-3">Your Preferences updated Successfully</p>
                <div className="footer-modal-img mx-auto">
                  <img
                    src={require('../assets/img/signup/mask-group.png')}
                    alt="Tree!"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
	);
};
