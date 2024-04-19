import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../constant/url";
import { useForm } from "react-hook-form";

export const RegisterBox = (props) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
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
        } else {
          setErrorMsg(res_data.status_msg);
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    setLoading(false);
  }

	return (
		<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-flex justify-content-center pt-0 mt-xl-5">
			<h1 className="text-center position-absolute mt-4 mt-md-5 mt-lg-3 pt-0 pt-md-2 loginHead d-xl-none">Famile</h1>

			<form
				className="login-left mt-0 mt-md-5 mt-lg-2 pt-2"
				onSubmit={handleSubmit(onSubmit)}
				action="post"
			>
				<div className="rectangle rectangle4" />
				<div className="rectangle rectangle3" />
				<div className="rectangle rectangle2" />
				<div className="rectangle rectangle1 pt-5">
					<h2 className="text-center">Join</h2>
					<p className="text-center lg-text">Enter your details below</p>
					<div className="col-12">
						<div className={`mx-2 mx-md-5 mb-3 inputField fieldInput nameField ${errors.name ? "borderError" : ""} ${isInputFocused ? 'inputFocused' : ''}`}>
							<input
								{...register("name", {
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
                className={`form-control p-2 ${errors.name ? "border-danger" : "border border-1"}`}
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
						<div className="input-group mx-2 mx-md-5">
							<div className="col-2 col-md-1 me-2 me-lg-3 registerInputSelect">
								<select className={`form-select p-2 ${errors.phone ? "border-danger" : "border border-1"}`}>
									<option>IN</option>
								</select>
							</div>
							<div className="col-2 col-md-1 me-2 me-lg-3 registerInputSelect">
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
              <div className="col-6 col-md-8 registerInputField">
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
                    // pattern: {
                    //   value: /^[6789]\d{9}$/,
                    //   message: "Enter Valid Phone Number"
                    // }
                  })}
                  className={`form-control p-2 me-3 ${errors.phone ? "border-danger" : "border border-1"}`}
                  onInput={handleNumberinput}
                  placeholder="Phone"
                />
              </div>
						</div>
            {errors.phone &&
              <div className="d-flex mx-2 mx-md-5">
                <p className="errorField">
                  {errors.phone.message}
                </p>
              </div>
            }
					</div>
					{/* <div className="col">
						<p className="text-end mx-5 mt-1">
							<a href="javascript:void(0)" style={{ color: "black" }}>
								&nbsp;
							</a>
							<a href="#" style={{ color: "black" }}>
								&nbsp;
							</a>
						</p>
					</div> */}
					<div className="d-flex justify-content-center mt-4">
						<div className="d-grid gap-2 col-7 mt-3 mx-5">
							<button
								className="btn btn-primary bg-dark text-white"
								type="submit"
								disabled={loading}
							>
								JOIN
							</button>
						</div>
					</div>
          {errorMsg &&
            <div className="mt-2" style={{ height: "25px" }}>
              <p className={`mt-2 text-center error errorField text-capitalize`}>{errorMsg}</p>
            </div>
          }
          <div className="d-flex justify-content-center pt-1">
            <img
              style={{top: "90%"}}
              className="btm-flower"
              alt="Mask group"
              src={require("../assets/img/signup/mask-group.png")}
            />
          </div>
				</div>
			</form>
		</div>
	);
};
