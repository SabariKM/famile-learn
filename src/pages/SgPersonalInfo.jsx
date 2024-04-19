import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import $, { event } from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import DatePicker from "react-datepicker";
import moment, { max } from "moment";
import "react-datepicker/dist/react-datepicker.css";
import stateDist from "../constant/state-dist.json";
import religion from "../constant/religion.json";
import language from "../constant/languages.json";

import { toast } from "react-toastify";
import { setpersonalinfo } from "../constant/url";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const SgPersonalInfo = (props) => {
	let navigate = useNavigate();
	const state = useLocation()["state"];
	let propData = { ...state, login: false };

	const access = propData?.authID;
	const fname = propData?.fname;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control
  } = useForm();

	const [retMsg, setRetMsg] = useState({ type: "", msg: "" });
	const [loading, setLoading] = useState(false);
  const [inputFocusState, setInputFocusState] = useState({});

  const handleFocus = (inputId) => {
    setInputFocusState((prevFocusState) => ({
      ...prevFocusState,
      [inputId]: true,
    }));
  };

  const handleBlur = (inputId) => {
    setInputFocusState((prevFocusState) => ({
      ...prevFocusState,
      [inputId]: false,
    }));
  };

  const handleNameInput = (event, id) => {
    const inputValue = event.target.value;
    const isValid = /^[a-zA-Z\s]*$/.test(inputValue);
    if (isValid) {
      setValue(id, inputValue);
    } else {
      setValue(id, inputValue.replace(/[^a-zA-Z\s]/g, ''))
    }
  };

  const handleStringWithDotAndComma = (event, field) => {
    const inputValue = event.target.value;
    const isValid = /^[a-zA-Z.,\s]*$/.test(inputValue);

    if (isValid) {
      setValue(field, inputValue);
    } else {
      const sanitizedValue = inputValue.replace(/[^a-zA-Z.,\s]+/g, '');
      setValue(field, sanitizedValue);
    }
  }

	const weightComp = () => {
		let elem = [];
		for (let i = 20; i <= 200; i++) {
			elem.push(<option value={i + " Kg"}>{i + " Kg"}</option>);
		}
		return elem;
	};

	const heightComp = () => {
		let elem = [];
		for (let i = 100; i <= 210; i++) {
			elem.push(<option value={i + " Cm"}>{i + " Cm"}</option>);
		}
		return elem;
	};

  const onSubmit = async (data) => {
    const {
      fname,
      email,
      gender,
      maritalSts,
      dob,
      language,
      religion,
      edu_qual,
      profession,
      annual_income,
      food,
      smoke,
      drink,
      height,
      weight,
      city,
      state,
      country
    } = data;
    const formatDOB = moment(dob).format("YYYY-MM-DD");

    setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("fname", fname);
		bodyFormData.append("email", email);
		bodyFormData.append("gender", gender);
		bodyFormData.append("maritalSts", maritalSts);
		bodyFormData.append("dob", formatDOB);
		bodyFormData.append("language", language);
		bodyFormData.append("religion", religion);
		bodyFormData.append("edu_qual", edu_qual);
		bodyFormData.append("profession", profession);
		bodyFormData.append("annual_income", annual_income);
		bodyFormData.append("food", food);
		bodyFormData.append("height", height);
		bodyFormData.append("weight", weight);
		bodyFormData.append("smoke", smoke);
		bodyFormData.append("drink", drink);
		bodyFormData.append("city", city);
		bodyFormData.append("state", state);
		bodyFormData.append("country", country);
		bodyFormData.append("comp_lev", 2);

		await axios({
			method: "post",
			url: setpersonalinfo,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					// toast.success(res_data.status_msg);
          sessionStorage.setItem('access_detals', access);
					setTimeout(() => {
						if (!propData?.login) {
							navigate("/sgpersonalinfoimg", { state: propData });
						}
					}, 2000);

					setRetMsg({ type: "success", msg: res_data.status_msg });
				} else {
					setRetMsg({ type: "error", msg: res_data.status_msg });
					toast.error(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
  }

	useEffect(() => {
		if (propData?.authID === undefined || !propData?.authID) {
			navigate("/login");
		}

		// if (propData?.acctype !== "signup") {
		// 	navigate("/personalinfo", { state: propData });
		// }
	}, [access]);

  useEffect(() => {
    setValue("fname", fname);
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
			<Header loginStatus={props.loginStatus} />
      <div className="bg-container">
        <div className="container d-flex justify-content-center commonContainer">
          <div className="divider"></div>
          <div className="main-div">
            <div>
              <div className="row personalHeader">
                <div className="col-md-5 col-4 d-flex justify-content-end">
                  <div class="profile">
                    <div class="outer">
                      <div class="inner">
                        <div id="number">
                          25%
                        </div>
                      </div>
                    </div>
                    <svg width="70px" height="70px">
                      <circle
                        className="profile25"
                        cx="35"
                        cy="35"
                        r="30"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-md-6 col-7 p-0">
                  <h2 className="m-0">Personal Details</h2>
                  <p className="m-0">Enter your details below</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-xs-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField nameField ${errors.fname ? "borderError" : ""} ${inputFocusState.fname ? 'inputFocused' : ''}`}>
                          <input
                            {...register("fname", {
                              required: "Name is required",
                              minLength: {
                                value: 2,
                                message: "Enter Valid Name"
                              },
                              maxLength: {
                                value: 30,
                                message: "Enter Valid Name"
                              },
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Enter Valid Name"
                              }
                            })}
                            type="text"
                            className={`form-control firstFormField p-2 ${
                              errors.fname ? "is-invalid-input" : ""
                            }`}
                            placeholder="Name"
                            id="fname"
                            onInput={(e) => handleNameInput(e, 'fname')}
                            onFocus={() => handleFocus("fname")}
                            onBlur={() => handleBlur("fname")}
                          />
                        </div>
                        {errors.fname && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0 mt-1">
                            {errors.fname.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput mailField ${errors.email ? "borderError" : ""} ${inputFocusState.email ? 'inputFocused' : ''}`}>
                          <input
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                              }
                            })}
                            type="email"
                            className={`form-control custom-margin-top p-2 ${
                              errors.email ? "is-invalid-input" : ""
                            }`}
                            placeholder="Email"
                            id="email"
                            onFocus={() => handleFocus("email")}
                            onBlur={() => handleBlur("email")}
                          />
                        </div>
                        {errors.email && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput genderField ${errors.gender ? "borderError" : ""} ${inputFocusState.gender ? 'inputFocused' : ''}`}>
                          <select
                            {...register("gender", {
                              required: "Gender is required"
                            })}
                            key={"gender"}
                            className={`form-select custom-margin-top p-2 ${
                              errors.gender ? "is-invalid-input" : ""
                            }`}
                            aria-label="Gender"
                            id="gender"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        {errors.gender && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput maritalField ${errors.maritalSts ? "borderError" : ""} ${inputFocusState.maritalSts ? 'inputFocused' : ''}`}>
                          <select
                            {...register("maritalSts", {
                              required: "Marital Status is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.maritalSts ? "is-invalid-input" : ""
                            }`}
                            aria-label="Language"
                            id="maritalSts"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Marital Status
                            </option>
                            <option value="Never Married">Never Married</option>
                            <option value="Widowed ">Widowed</option>
                            <option value="Divorced">Divorced</option>
                          </select>
                        </div>
                        {errors.maritalSts && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.maritalSts.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput dobField ${errors.dob ? "borderError" : ""} ${inputFocusState.dob ? 'inputFocused' : ''}`}>
                          <Controller
                            control={control}
                            name="dob"
                            id="dob"
                            rules={{
                              required: "Date Of Birth is required",
                              validate: value => {
                                const age = moment().diff(value, 'years');
                                return age >= 18 || "You are not eligible";
                              }
                            }}
                            render={({ field }) => (
                              <DatePicker
                                dateFormat={"dd-MMM-yyyy"}
                                showYearDropdown
                                showMonthDropdown
                                yearDropdownItemNumber={73}
                                scrollableYearDropdown
                                placeholderText="Date Of Birth"
                                maxDate={moment().toDate()}
                                className={`form-control custom-margin-top p-2 ${ errors.dob ? "is-invalid-input" : "" }`}
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                              />
                            )}
                          />
                        </div>
                        {errors.dob && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.dob.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput langField ${errors.language ? "borderError" : ""} ${inputFocusState.language ? 'inputFocused' : ''}`}>
                          <select
                            {...register("language", {
                              required: "Language is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.language ? "is-invalid-input" : ""
                            }`}
                            aria-label="Language"
                            id="language"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Language
                            </option>
                            {language.languages?.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                          </select>
                        </div>
                        {errors.language && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.language.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput relegionField ${errors.religion ? "borderError" : ""} ${inputFocusState.religion ? 'inputFocused' : ''}`}>
                            <select
                              {...register("religion", {
                                required: "Religion is required"
                              })}
                              className={`form-select custom-margin-top p-2 ${
                                errors.religion ? "is-invalid-input" : ""
                              }`}
                              aria-label=""
                              id="religion"
                            >
                              <option value="" selected disabled className="optionsHead">
                                Religion
                              </option>
                              {religion.religion?.map((item) => {
                                return <option value={item}>{item}</option>;
                              })}
                            </select>
                        </div>
                        {errors.religion && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.religion.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput educationField ${errors.edu_qual ? "borderError" : ""} ${inputFocusState.edu_qual ? 'inputFocused' : ''}`}>
                          <input
                          {...register("edu_qual", {
                            required: "Educ. Qualification is required",
                            minLength: {
                              value: 2,
                              message: "Enter Valid Educ. Qualification"
                            },
                            maxLength: {
                              value: 30,
                              message: "Enter Valid Educ. Qualification"
                            },
                            pattern: {
                              value: /^[A-Za-z., ]+$/,
                              message: "Enter Valid Educ. Qualification"
                            }
                          })}
                            type="text"
                            className={`form-control custom-margin-top p-2 ${
                              errors.edu_qual ? "is-invalid-input" : ""
                            }`}
                            placeholder="Education"
                            id="edu_qual"
                            onInput={(event) => handleStringWithDotAndComma(event, "edu_qual")}
                            onFocus={() => handleFocus("edu_qual")}
                            onBlur={() => handleBlur("edu_qual")}
                          />
                        </div>
                        {errors.edu_qual && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0 mt-1">
                            {errors.edu_qual.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput professionField ${errors.profession ? "borderError" : ""} ${inputFocusState.profession ? 'inputFocused' : ''}`}>
                          <input
                            {...register("profession", {
                              required: "Proffession is required",
                              minLength: {
                                value: 2,
                                message: "Enter Valid Proffession"
                              },
                              maxLength: {
                                value: 30,
                                message: "Enter Valid Proffession"
                              },
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Enter Valid Proffession"
                              }
                            })}
                            type="text"
                            className={`form-control custom-margin-top p-2 ${
                              errors.profession ? "is-invalid-input" : ""
                            }`}
                            placeholder="Profession"
                            id="profession"
                            onInput={(event) => handleStringWithDotAndComma(event, "profession")}
                            onFocus={() => handleFocus("profession")}
                            onBlur={() => handleBlur("profession")}
                          />
                        </div>
                        {errors.profession && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0 mt-1">
                            {errors.profession.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput incomeField ${errors.annual_income ? "borderError" : ""} ${inputFocusState.annual_income ? 'inputFocused' : ''}`}>
                          <select
                            {...register("annual_income", {
                              required: "Annual Income is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.annual_income ? "is-invalid-input" : ""
                            }`}
                            aria-label="Annual Income"
                            id="annual_income"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Annual Income
                            </option>
                            <option value="No Income">No Income</option>
                            <option value="Upto 2 Lakhs">Upto Rs.2 Lakhs</option>
                            <option value="2 Lakhs - 5 Lakhs">
                              Rs.2 Lakhs - Rs.5 Lakhs
                            </option>
                            <option value="5 Lakhs - 10 Lakhs">
                              Rs.5 Lakhs - Rs.10 Lakhs
                            </option>
                            <option value="10 Lakhs - 18 Lakhs">
                              Rs.10 Lakhs - Rs.18 Lakhs
                            </option>
                            <option value="18 Lakhs - 30 Lakhs">
                              Rs.18 Lakhs - Rs.30 Lakhs
                            </option>
                            <option value="30 Lakhs - 50 Lakhs">
                              Rs.30 Lakhs - Rs.50 Lakhs
                            </option>
                            <option value="50 Lakhs - 1 Crore">
                              Rs.50 Lakhs - Rs.1 Crore
                            </option>
                            <option value="Above 1 Crore">Above Rs.1 Crore</option>
                          </select>
                        </div>
                        {errors.annual_income && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.annual_income.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput foodField ${errors.food ? "borderError" : ""} ${inputFocusState.food ? 'inputFocused' : ''}`}>
                          <select
                            {...register("food", {
                              required: "Food is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.food ? "is-invalid-input" : ""
                            }`}
                            aria-label="Food"
                            id="food"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Food
                            </option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                          </select>
                        </div>
                        {errors.food && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.food.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput smokeField ${errors.smoke ? "borderError" : ""} ${inputFocusState.smoke ? 'inputFocused' : ''}`}>
                          <select
                            {...register("smoke", {
                              required: "Smoke is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.smoke ? "is-invalid-input" : ""
                            }`}
                            aria-label="Smoke"
                            id="smoke"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Smoke
                            </option>
                            <option value="Never">Never</option>
                            <option value="Sometimes">Sometimes</option>
                            <option value="Regular">Regular</option>
                          </select>
                        </div>
                        {errors.smoke && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.smoke.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput drinkField ${errors.drink ? "borderError" : ""} ${inputFocusState.drink ? 'inputFocused' : ''}`}>
                          <select
                            {...register("drink", {
                              required: "Drink is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.drink ? "is-invalid-input" : ""
                            }`}
                            aria-label="Drink"
                            id="drink"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Drinking
                            </option>
                            <option value="Never">Never</option>
                            <option value="Sometimes">Sometimes</option>
                            <option value="Regular">Regular</option>
                          </select>
                        </div>
                        {errors.drink && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.drink.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput heightField ${errors.height ? "borderError" : ""} ${inputFocusState.height ? 'inputFocused' : ''}`}>
                          <select
                            {...register("height", {
                              required: "Height is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.height ? "is-invalid-input" : ""
                            }`}
                            aria-label="Height"
                            id="height"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Height
                            </option>
                            {heightComp()}
                          </select>
                        </div>
                        {errors.height && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.height.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput weightField ${errors.weight ? "borderError" : ""} ${inputFocusState.weight ? 'inputFocused' : ''}`}>
                          <select
                            {...register("weight", {
                              required: "Weight is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.weight ? "is-invalid-input" : ""
                            }`}
                            aria-label="Weight"
                            id="weight"
                          >
                            <option value="" selected disabled className="optionsHead">
                              Weight
                            </option>
                            {weightComp()}
                          </select>
                        </div>
                        {errors.weight && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.weight.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput cityField ${errors.city ? "borderError" : ""} ${inputFocusState.city ? 'inputFocused' : ''}`}>
                          <input
                            {...register("city", {
                              required: "City is required",
                              minLength: {
                                value: 2,
                                message: "Enter Valid City Name"
                              },
                              maxLength: {
                                value: 30,
                                message: "Enter Valid City Name"
                              },
                              pattern: {
                                value: /^[A-Za-z ]+$/,
                                message: "Enter Valid City Name"
                              }
                            })}
                            type="text"
                            className={`form-control custom-margin-top p-2 ${
                              errors.city ? "is-invalid-input" : ""
                            }`}
                            placeholder="City"
                            id="city"
                            onInput={(e) => handleNameInput(e, 'city')}
                            onFocus={() => handleFocus("city")}
                            onBlur={() => handleBlur("city")}
                          />
                        </div>
                        {errors.city && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0 mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput locField ${errors.state ? "borderError" : ""} ${inputFocusState.state ? 'inputFocused' : ''}`}>
                          <select
                            {...register("state", {
                              required: "State is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.state ? "is-invalid-input" : ""
                            }`}
                            aria-label="State"
                            id="state"
                          >
                            <option value="" selected disabled className="optionsHead">
                              State
                            </option>
                            {stateDist.states?.map((item) => {
                              return (
                                <option value={item.state}>{item.state}</option>
                              );
                            })}
                          </select>
                        </div>
                        {errors.state && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-10 col-md-7">
                        <div className={`inputField fieldInput countryField ${errors.country ? "borderError" : ""} ${inputFocusState.country ? 'inputFocused' : ''}`}>
                          <select
                            {...register("country", {
                              required: "Country is required"
                            })}
                            className={`form-select custom-margin-top p-2 ${
                              errors.country ? "is-invalid-input" : ""
                            }`}
                            aria-label="Country"
                            id="country"
                          >
                            <option value="" disabled className="optionsHead">
                              Country
                            </option>
                            <option selected value="India">
                              India
                            </option>
                          </select>
                        </div>
                        {errors.country && (
                          <p className="is-invalid-text text-nowrap text-nowrap text-capitalize mb-0">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="d-grid gap-2 col-4 mx-auto firstFormField">
                      <button
                        type="submit"
                        className="btn btn-primary bg-dark p-2"
                        disabled={loading}
                      >
                        SUBMIT
                      </button>
                      {/* <div>
                        <p className={`text-center ${retMsg.type}`}>
                          {retMsg.msg}
                        </p>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row mt-sm-4 mb-sm-3">
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
			<div className="ft-footer-block personal-footer">
				<Footer />
			</div>
		</>
	);
};
