import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../constant/url";

export const LoginBox = (props) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState({ type: "", msg: "" });
  const [inputFocusState, setInputFocusState] = useState({});
  const [forgetPassword, setForgetPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

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

  const handleNumberinput = (event) => {
    let inputValue = event.target.value;
    const isValid = /^[6789]\d{0,9}$/.test(inputValue);
    if (isValid) {
      inputValue = inputValue.slice(0, 10);
    } else {
      inputValue = inputValue.replace(/[^6789\d]/g, '').slice(0, 10);
    }
    !forgetPassword && setValue('phone', inputValue);
    forgetPassword && setValue('vphone', inputValue);
  }

  const handlePasswordInput = (event, id) => {
    const inputValue = event.target.value;
    const isValid = /^[a-zA-Z0-9\s]*$/.test(inputValue);
    if (isValid) {
        setValue(id, inputValue);
    } else {
        setValue(id, inputValue.replace(/[^a-zA-Z0-9\s]/g, ''));
    }
  };

  const onSubmit = async (data) => {
    const { phone, password } = data;
    setLoading(true);

		var bodyFormData = new FormData();
		bodyFormData.append("phone", phone);
		bodyFormData.append("password", password.trim());

		await axios({
			method: "post",
			url: login,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					navigate("/login");
				} else if (res_data.status_code === 200) {
					props.onLogin(res_data.access_code);
          if (res_data?.steps === 'photo-upload') {
            navigate("/sgpersonalinfoimg", {
              state: {
                authID: res_data.access_code,
                phone: phone,
                key: 'photo-upload'
              },
            });
            sessionStorage.setItem('key', 'photo-upload');
          } else if (res_data?.steps === 'payment') {
            navigate("/signuptermsofuse", {
              state: {
                authID: res_data.access_code,
                phone: phone,
              },
            });
            sessionStorage.setItem('key', 'payment');
          } else if (res_data?.steps === 'phone-verify') {
            navigate("/pmtresult", {
              state: {
                authID: res_data.access_code,
                phone: phone,
                key: 'phone-verify'
              },
            });
            sessionStorage.setItem('key', 'phone-verify');
          } else if (res_data?.steps === 'email-verfiy') {
            navigate("/pmtresult", {
              state: {
                authID: res_data.access_code,
                phone: phone,
                key: 'email-verfiy'
              },
            });
            sessionStorage.setItem('key', 'email-verfiy');
          } else if (res_data?.steps === 'preference') {
            navigate("/preference", {
              state: {
                authID: res_data.access_code,
                phone: phone,
                key: 'preference'
              },
            });
            sessionStorage.setItem('key', 'preference');
          } else if (res_data?.steps === 'all-verified') {
            navigate("/personalinfo", {
              state: {
                authID: res_data.access_code,
                phone: phone,
              },
            });
            sessionStorage.setItem('key', 'all-verified');
          }
				}
				setErrorMsg({ type: "error", msg: res_data.status_msg });
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
  }

	const handleForgotPassword = () => {
   setForgetPassword(true);
	};

  const onSubmitVerify = data => {
    console.log((data));
    setIsVerified(true);
  }

  const onSubmitConfirmPassword = data => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords must match'
      });
      return;
    }
    console.log(data);
    setIsCompleted(true);
    setIsVerified(false);
  }

	return (
		<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-flex justify-content-center pt-0 mt-xl-5">
			<h1 className="text-center position-absolute mt-4 mt-md-5 mt-lg-3 pt-0 pt-md-2 loginHead d-xl-none">Famile</h1>
			{!forgetPassword && !isVerified && (
        <form
          className="login-left mt-0 mt-md-5 mt-lg-2 pt-2"
          onSubmit={handleSubmit(onSubmit)}
          method="post"
			  >
          <div className="rectangle rectangle4" />
          <div className="rectangle rectangle3" />
          <div className="rectangle rectangle2" />
          <div className="rectangle rectangle1 pt-5">
            <h2 className="text-center">Login</h2>
            <p className="text-center lg-text">Enter Credentials Below</p>
            <div className={`mx-2 mx-md-5 mb-3 inputField phoneField ${errors.phone ? "borderError" : ""} ${inputFocusState.phoneInput ? 'inputFocused' : ''}`}>
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
                  pattern: {
                    value: /^[6789]\d{9}$/,
                    message: "Enter Valid Phone Number"
                  }
                })}
                className={`form-control p-2 ${errors.phone ? "border-danger" : "border border-1"}`}
                id="phoneInput"
                placeholder="Phone"
                onInput={handleNumberinput}
                onFocus={() => handleFocus("phoneInput")}
                onBlur={() => handleBlur("phoneInput")}
              />
              {errors.phone &&
                <div className="d-flex">
                  <p className="errorField">
                    {errors.phone.message}
                  </p>
                </div>
              }
            </div>
            <div className={`mx-2 mx-md-5 inputField passwordField ${errors.password ? "borderError" : ""} ${inputFocusState.exampleFormControlInput1 ? 'inputFocused' : ''}`}>
              <input
                {...register("password", {
                  required: "Please enter password",
                })}
                type="password"
                className={`form-control p-2 ${errors.password ? "border-danger" : "border border-1"}`}
                id="exampleFormControlInput1"
                placeholder="Password"
                onFocus={() => handleFocus("exampleFormControlInput1")}
                onBlur={() => handleBlur("exampleFormControlInput1")}
              />
            </div>
            <div className="col d-flex justify-content-between mx-2 mx-md-5 mt-1 mb-3">
              <div className="d-flex">
                {errors.password &&
                  <p className="errorField">
                    {errors.password.message}
                  </p>
                }
              </div>
              <p className="text-end lg-text m-0">
                <a
                  href="javascript:void(0)"
                  style={{ color: "black" }}
                  onClick={() => handleForgotPassword()}
                >
                  Forgot Password?
                </a>
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <div className="d-grid gap-2 col-7  mx-5">
                <button
                  className="btn btn-primary bg-dark text-white"
                  type="submit"
                  disabled={loading}
                >
                  LOGIN
                </button>
              {errorMsg.msg && <p className="errorField text-center">{errorMsg.msg}</p>}
              </div>
            </div>

            <p className="text-center mt-2 lg-text">
              Don't have an account?{" "}
              <a
                href="javascript:void(0)"
                className="pmt-a"
                onClick={() => props.changeBox("register")}
              >
                Register
              </a>
            </p>
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
      )}
      {forgetPassword && !isVerified && !isCompleted && (
        <form
          className="login-left mt-0 mt-md-5 mt-lg-2 pt-2"
          onSubmit={handleSubmit(onSubmitVerify)}
          method="post"
			  >
          <div className="rectangle rectangle4" />
          <div className="rectangle rectangle3" />
          <div className="rectangle rectangle2" />
          <div className="rectangle rectangle1 pt-5">
            <h2 className="text-center">Forgot Password</h2>
            <p className="text-center lg-text">Enter the Email & Phone number you used to Register with</p>

            <div className={`mx-2 mx-md-5 mb-3 inputField phoneField ${errors.vphone ? "borderError" : ""} ${inputFocusState.phoneInput ? 'inputFocused' : ''}`}>
              <input
                {...register("vphone", {
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
                className={`form-control p-2 ${errors.vphone ? "border-danger" : "border border-1"}`}
                id="phoneInput"
                placeholder="Phone"
                onInput={handleNumberinput}
                onFocus={() => handleFocus("phoneInput")}
                onBlur={() => handleBlur("phoneInput")}
              />
              {errors.vphone &&
                <div className="d-flex">
                  <p className="errorField">
                    {errors.vphone.message}
                  </p>
                </div>
              }
            </div>
            <div className={`mx-2 mx-md-5 fieldInput inputField mailField ${errors.vemail ? "borderError" : ""} ${inputFocusState.vemail ? 'inputFocused' : ''}`}>
              <input
                {...register("vemail", {
                  required: "Please enter valid email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                className={`form-control p-2 ${errors.vemail ? "border-danger" : "border border-1"}`}
                id="vemail"
                placeholder="Email"
                onFocus={() => handleFocus("vemail")}
                onBlur={() => handleBlur("vemail")}
              />
            </div>
            <div className="col d-flex justify-content-between mx-2 mx-md-5">
              <div className="d-flex">
                {errors.vemail &&
                  <p className="errorField">
                    {errors.vemail.message}
                  </p>
                }
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className="d-grid gap-2 col-7 mt-4 mx-5">
                <button
                  className="btn btn-primary bg-dark text-white mt-3"
                  type="submit"
                  disabled={loading}
                >
                  VERIFY
                </button>
                {errorMsg.msg && <p className="errorField text-center">{errorMsg.msg}</p>}
              </div>
            </div>

            {/* <p className="text-center mt-2 lg-text">
              Check your email to reset password
            </p> */}
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
      )}
      {isVerified && !isCompleted && forgetPassword && (
        <form
          className="login-left mt-0 mt-md-5 mt-lg-2 pt-2"
          onSubmit={handleSubmit(onSubmitConfirmPassword)}
          method="post"
        >
          <div className="rectangle rectangle4" />
          <div className="rectangle rectangle3" />
          <div className="rectangle rectangle2" />
          <div className="rectangle rectangle1 pt-5">
            <h2 className="text-center">Reset Password</h2>
            <p className="text-center lg-text">Your new password must be different to previous passwords</p>

            <div className={`mx-2 mx-md-5 mb-3 inputField passwordField ${errors.phone ? "borderError" : ""} ${inputFocusState.newPassword ? 'inputFocused' : ''}`}>
              <input
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum 30 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Password must be with characters and numbers"
                  }
                })}
                className={`form-control p-2 ${errors.newPassword ? "border-danger" : "border border-1"}`}
                id="newPassword"
                placeholder="New Password"
                onInput={(e) => handlePasswordInput(e, "newPassword")}
                onFocus={() => handleFocus("newPassword")}
                onBlur={() => handleBlur("newPassword")}
              />
              {errors.newPassword &&
                <div className="d-flex">
                  <p className="errorField">
                    {errors.newPassword.message}
                  </p>
                </div>
              }
            </div>
            <div className={`mx-2 mx-md-5 inputField passwordField ${errors.confirmPassword ? "borderError" : ""} ${inputFocusState.confirmPassword ? 'inputFocused' : ''}`}>
              <input
                {...register("confirmPassword", {
                  required: "Please enter password",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Password must be with characters and numbers"
                  },
                })}
                type="password"
                className={`form-control p-2 ${errors.confirmPassword ? "border-danger" : "border border-1"}`}
                id="confirmPassword"
                placeholder="Confirm Password"
                onInput={(e) => handlePasswordInput(e, "confirmPassword")}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
              />
            </div>
            <div className="col d-flex justify-content-between mx-2 mx-md-5">
              <div className="d-flex">
                {errors.confirmPassword &&
                  <p className="errorField">
                    {errors.confirmPassword.message}
                  </p>
                }
              </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <div className="d-grid gap-2 col-7 mx-5 mt-3">
                <button
                  className="btn btn-primary bg-dark text-white"
                  type="submit"
                  disabled={loading}
                >
                  RESET PASSWORD
                </button>
              {errorMsg.msg && <p className="errorField text-center">{errorMsg.msg}</p>}
              </div>
            </div>
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
      )}
      {isCompleted && forgetPassword && (
        <form
          className="login-left mt-0 mt-md-5 mt-lg-2 pt-2"
          onSubmit={() => {
            setForgetPassword(false);
            setIsCompleted(false);
          }}
          method="post"
        >
          <div className="rectangle rectangle4" />
          <div className="rectangle rectangle3" />
          <div className="rectangle rectangle2" />
          <div className="rectangle rectangle1 pt-5">
            <div className="passwordResetImg mx-auto mt-4 mb-2">
              <img
                src={require('../assets/img/signup/PopupTickIcon.png')}
                alt="Completed"
              />
            </div>
            <h2 className="text-center mt-1 fs-28">Reset Completed</h2>
            <p className="text-center lg-text mx-5 mb-0">Your password has been successfully reset. <br/> Please proceed to login with your new credentials</p>

            <div className="d-flex justify-content-center mt-4">
              <div className="d-grid gap-2 col-7 mx-5 mt-2">
                <button
                  className="btn btn-primary bg-dark text-white"
                  type="submit"
                  disabled={loading}
                >
                  LOGIN
                </button>
              </div>
            </div>
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
      )}
		</div>
	);
};
