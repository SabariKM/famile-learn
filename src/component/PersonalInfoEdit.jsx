import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { canvasPreview } from "../custom-hooks/canvasPreview";
import { useDebounceEffect } from "../custom-hooks/useDebounceEffect";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import stateDist from "../constant/state-dist.json";
import religion from "../constant/religion.json";
import language from "../constant/languages.json";
import { setpersonalinfo } from "../constant/url";

export const PersonalInfoEdit = (props) => {
	let navigate = useNavigate();
	const access = sessionStorage.getItem('access_detals');

  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef("");

  const [crop, setCrop] = useState({
    unit: 'px',
    width: 420,
    height: 420,
    aspect: 420 / 420,
  });
  const [imgSrc, setImgSrc] = useState("");
  const [completedCrop, setCompletedCrop] = useState();
  const [sampleImg, setSampleImg] = useState("sampleInnerImage");

	const [formData, setFormData] = useState({
		fname: "",
		email: "",
		gender: "",
		dob: "Date of Birth",
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
		country: "India",
		photo: require("../assets/img/signup/profilesample.png"),
	});
	const [errorDisp, setErrorDisp] = useState({
		fname: false,
		email: false,
		gender: false,
		dob: false,
		language: false,
		religion: false,
		edu_qual: false,
		profession: false,
		annual_income: false,
		food: false,
		height: false,
    smoke: false,
    drink: false,
		weight: false,
		city: false,
		state: false,
		country: false,
		photo: false,
	});
	const [retMsg, setRetMsg] = useState({
		type: "",
		msg: "",
		uploadText: "Upload Photo",
	});
	const [loading, setLoading] = useState(false);

  const handleEditView = (name) => {
		props.pageChange(name);
	};

	const validateInput = () => {
		if (formData?.fname?.length === 0) {
			setErrorDisp({ ...errorDisp, fname: true });
			return false;
		} else if (
			!formData.email.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setErrorDisp({ ...errorDisp, email: true });
			return false;
		} else if (formData.gender.length === 0) {
			setErrorDisp({ ...errorDisp, gender: true });
			return false;
		} else if (formData.dob.length === 0 || errorDisp.dob === true) {
			setErrorDisp({ ...errorDisp, dob: true });
			return false;
		} else if (formData.language.length === 0) {
			setErrorDisp({ ...errorDisp, language: true });
			return false;
		} else if (formData.religion.length === 0) {
			setErrorDisp({ ...errorDisp, religion: true });
			return false;
		} else if (formData.edu_qual.length === 0) {
			setErrorDisp({ ...errorDisp, edu_qual: true });
			return false;
		} else if (formData.profession.length === 0) {
			setErrorDisp({ ...errorDisp, profession: true });
			return false;
		} else if (formData.annual_income.length === 0) {
			setErrorDisp({ ...errorDisp, annual_income: true });
			return false;
		} else if (formData.food.length === 0) {
			setErrorDisp({ ...errorDisp, food: true });
			return false;
		} else if (formData.smoke?.length === 0) {
			setErrorDisp({ ...errorDisp, smoke: true });
			return false;
		} else if (formData.drink?.length === 0) {
			setErrorDisp({ ...errorDisp, drink: true });
			return false;
		} else if (formData.height.length === 0) {
			setErrorDisp({ ...errorDisp, height: true });
			return false;
		} else if (formData.weight.length === 0) {
			setErrorDisp({ ...errorDisp, weight: true });
			return false;
		} else if (formData.city.length === 0) {
			setErrorDisp({ ...errorDisp, city: true });
			return false;
		} else if (formData.state.length === 0) {
			setErrorDisp({ ...errorDisp, length: true });
			return false;
		} else if (formData.country.length === 0) {
			setErrorDisp({ ...errorDisp, country: true });
			return false;
		} else if (errorDisp.photo === true) {
      return false;
    }
		return true;
	};

	const handleFiles = (e) => {
    const uploadedImg = e.target.files[0];

    if (uploadedImg?.size > 1024 * 1024 * 10) {
      setErrorDisp({...errorDisp, photo: true});
      setRetMsg({...retMsg, msg: 'Maximum file size exceeded.'})
      return false;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result || ""));
    reader?.readAsDataURL(uploadedImg);

    setErrorDisp({...errorDisp, photo: false});
    setSampleImg("");
		setFormData({
			...formData,
			photo: uploadedImg,
			photo_raw: uploadedImg,
      originalPhoto: uploadedImg
		});
		setRetMsg({ ...retMsg, uploadText: "Change Photo" });
	};

  // const onImageLoad = (e) => {
  //   const { width, height } = e.currentTarget;
  //   const initCrop = {
  //     unit: 'px',
  //     width: width >= 420 ? 420 : width,
  //     height: height >= 420 ? 420 : height,
  //     aspect: width >= 420 ? 420 : width / height >= 420 ? 420 : height,
  //   }
  //   setCrop({
  //     ...crop,
  //     width: width >= 420 ? 420 : width,
  //     height: height >= 420 ? 420 : height,
  //     aspect: width >= 420 ? 420 : width / height >= 420 ? 420 : height,
  //   });
  //   setCompletedCrop(initCrop);
  // }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const offscreen = new OffscreenCanvas(
      completedCrop.width,
      completedCrop.height
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: "image/jpeg",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);
    const fileName = formData.photo_raw.name;
    const file = new File([blob], fileName, { type: "image/jpeg" });

    setFormData({
      ...formData,
      photo: file,
    })
  }

	const handlePersonalInfo = async (e) => {
		e.preventDefault();

		if (!validateInput()) {
			return false;
		}
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("fname", formData.fname);
		bodyFormData.append("email", formData.email);
		bodyFormData.append("gender", formData.gender);
		bodyFormData.append("dob", formData.dob.toString());
		bodyFormData.append("language", formData.language);
		bodyFormData.append("religion", formData.religion);
		bodyFormData.append("edu_qual", formData.edu_qual);
		bodyFormData.append("profession", formData.profession);
		bodyFormData.append("annual_income", formData.annual_income);
		bodyFormData.append("food", formData.food);
		bodyFormData.append("smoke", formData.smoke);
		bodyFormData.append("drink", formData.drink);
		bodyFormData.append("height", formData.height);
		bodyFormData.append("weight", formData.weight);
		bodyFormData.append("city", formData.city);
		bodyFormData.append("state", formData.state);
		bodyFormData.append("country", formData.country);
		sampleImg === "" && bodyFormData.append("photo", formData.photo);
		sampleImg === "" && bodyFormData.append("originalPhoto", formData.originalPhoto);

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
					setRetMsg({ type: "success", msg: res_data.status_msg });
          handleEditView("VIEW");
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

	const handleDateOfBirth = (date) => {
    const age = moment().diff(date, 'years');
    if (age >= 18) {
      setFormData({ ...formData, dob: moment(date).format("DD-MM-YYYY") });
    } else {
      setErrorDisp({ ...errorDisp, dob: true });
    }
	};

	const handleChangeFormData = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleChangeFormDataText = (e) => {
		const { name, value } = e.target;
		if (
			/^[a-zA-Z\s]*$/.test(
				value
			) &&
			value.length <= 30
		) {
			setFormData({
				...formData,
				[name]: value,
			});
      setErrorDisp({ ...errorDisp, [name]: false });
		} else {
      setErrorDisp({ ...errorDisp, [name]: true });
    }
	};

  const handleChangeProffession = e => {
    const { name, value } = e.target;
		if (
			/^[A-Za-z,. ]+$/.test(value) &&
			value.length <= 30
		) {
			setFormData({
				...formData,
				[name]: value,
			});
      setErrorDisp({ ...errorDisp, [name]: false });
		} else {
      setErrorDisp({ ...errorDisp, [name]: true });
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

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  useEffect(() => {
    sampleImg === "" && onDownloadCropClick();
  }, [completedCrop]);

	useEffect(() => {
		setFormData(props.formData);
	}, []);

	return (
		<>
			<div className="row d-flex justify-content-center">
				<div className="col-lg-5 col-md-7 col-sm-8 col-10 px-1">
					<form onSubmit={handlePersonalInfo}>
						<div className="row">
							<div className="col-12">
								<div className="col d-flex justify-content-center cropContainer">
									{sampleImg === 'sampleInnerImage' && (
                    <div className="sampleImgBox imgContainer position-relative">
                      <img
                        className={`img-fluid`}
                        src={formData?.photo}
                        alt="profileimg"
                      />
                    </div>
                  )}
                  {sampleImg !== 'sampleInnerImage' && (
                    <ReactCrop
                      crop={crop}
                      onChange={c => setCrop(c)}
                      onComplete={(newCrop) => setCompletedCrop(newCrop)}
                      style={{
                        marginTop: 51,
                        maxWidth: '100%',
                        maxHeight: '100%'
                      }}
                      aspect={420/420}
                      // locked
                    >
                      <img
                        ref={imgRef}
                        src={imgSrc}
                        // onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                  {sampleImg !== 'sampleInnerImage' && (
                    <div className="mt-5 d-flex justify-content-center">
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          objectFit: "cover",
                          // width: completedCrop?.width,
                          // height: completedCrop?.height,
                          width: 420,
                          height: 420,
                          visibility: 'hidden',
                          position: 'absolute'
                        }}
                      />
                    </div>
                  )}
								</div>
								<div className="d-grid gap-2 col-8 col-md-8 mx-auto mt-4 ">
									<label class="btn btn-lg btn-outline-dark p-0 py-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="currentColor"
											className="bi bi-cloud-upload"
											viewBox="0 0 16 16"
											style={{ marginRight: "10px" }}
										>
											<path
												fillRule="evenodd"
												d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
											/>
											<path
												fillRule="evenodd"
												d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
											/>
										</svg>
										<input
											type="file"
											style={{ display: "none" }}
											onChange={handleFiles}
                      accept="image/jpeg, image/png, image/jpg"
										/>
										{/* {retMsg.uploadText} */}
                    Change Photo
									</label>
								</div>
							</div>
              <h2 className="text-center mt-77">Personal Details</h2>
							<div className="d-flex justify-content-center">
								<div className="col-12">
									<div className="col-12 ">
                    <div className={`fieldInput nameField rounded preferencePgInput ${
                      errorDisp?.fname ? "borderError" : ""
                    }`}>
                      <input
                        type="text"
                        maxLength={30}
                        minLength={3}
                        className={`form-control mt-4 p-2 ${
                          errorDisp?.fname && formData?.fname?.length <= 2
                            ? "is-invalid-input"
                            : ""
                        }`}
                        placeholder="Name"
                        name="fname"
                        value={formData?.fname}
                        onChange={(e) => handleChangeFormDataText(e)}
                      />
										{errorDisp.fname && formData.fname?.length <= 3 && (
                      <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
												Please Enter Valid Name
											</p>
										)}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput mailField rounded preferencePgInput ${
                      errorDisp?.email ? "borderError" : ""
                    }`}>
                      <input
                        type="text"
                        className={`form-control mt-3 p-2 ${
                          errorDisp.email &&
                          !formData.email.match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          )
                            ? "is-invalid-input"
                            : ""
                        }`}
                        placeholder="Email"
                        name="email"
                        value={formData?.email}
                        onChange={(e) => handleChangeFormData(e)}
                      />
                      {errorDisp.email &&
                        !formData.email.match(
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ) && (
                          <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                            Please Enter Valid Email
                          </p>
                        )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput genderField rounded preferencePgInput ${
                      errorDisp?.gender ? "borderError" : ""
                    }`}>
                      <select
                        key={"gender"}
                        className={`form-select mt-3 p-2 ${
                          errorDisp.gender ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="gender"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.gender}
                      >
                        <option value="" selected disabled className="optionsHead">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errorDisp.gender && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Gender Field Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput datePickerField preferencePgInput rounded ${
                      errorDisp?.dob ? "borderError" : ""
                    }`}>
                      <DatePicker
                        dateFormat={"dd-MMM-yyyy"}
                        showYearDropdown
                        showMonthDropdown
                        yearDropdownItemNumber={73}
                        scrollableYearDropdown
                        value={formData?.dob}
                        // selected={formData?.dob}
                        maxDate={moment().toDate()}
                        className={`form-control mt-3 p-2 z-2 ${
                          errorDisp?.dob &&
                          !moment(formData?.dob, "DD-MMM-YYYY").isValid()
                            ? "is-invalid-input"
                            : ""
                          } ${moment().diff(formData?.dob, 'years') < 18
                                ? 'is-invalid-input'
                                : ""
                          }
                        `}
                        onChange={(date) => handleDateOfBirth(date)}
                      />
                      {errorDisp?.dob &&
                        !moment(formData?.dob, "DD-MMM-YYYY").isValid() && (
                          <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                            Date Of Birth Is Required
                          </p>
                      )}
                      {errorDisp?.dob &&
                        moment().diff(formData?.dob, 'years') < 18 && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          You are Not Eligible
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput langField preferencePgInput rounded ${
                      errorDisp?.language ? "borderError" : ""
                    }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.language ? "is-invalid-input" : ""
                        }`}
                        aria-label="Language"
                        name="language"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.language}
                      >
                        <option value="" selected disabled className="optionsHead" >
                          Language
                        </option>
                        {language.languages?.map((item) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                      {errorDisp.language && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Language Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput relegionField preferencePgInput rounded ${
                      errorDisp?.religion ? "borderError" : ""
                    }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.religion ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="religion"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.religion}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Religion
                        </option>
                        {religion.religion?.map((item) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                      {errorDisp.religion && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Religion Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput educationField preferencePgInput rounded ${
                      errorDisp?.edu_qual ? "borderError" : ""
                    }`}>
                      <input
                        type="text"
                        className={`form-control mt-3 p-2 ${
                          errorDisp.edu_qual ? "is-invalid-input" : ""
                        }`}
                        placeholder="Educational"
                        name="edu_qual"
                        value={formData?.edu_qual}
                        onChange={(e) => handleChangeFormDataText(e)}
                      />
                      {errorDisp.edu_qual && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          {formData?.edu_qual.length === 0
                            ? 'Education Is Required'
                            : 'Enter Valid Qualification'
                          }
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput professionField preferencePgInput rounded ${
                      errorDisp?.profession ? "borderError" : ""
                    }`}>
                      <input
                        type="text"
                        maxLength={30}
                        minLength={3}
                        className={`form-control mt-3 p-2 ${
                          errorDisp.profession ? "is-invalid-input" : ""
                        }`}
                        placeholder="Profession"
                        name="profession"
                        value={formData?.profession}
                        onChange={(e) => handleChangeProffession(e)}
                      />
                      {errorDisp.profession && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Proffession Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput incomeField preferencePgInput rounded ${ errorDisp?.annual_income ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.annual_income ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="annual_income"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.annual_income}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Annual Income
                        </option>
                        <option value="No Income">No Income</option>
                        <option value="Upto 2 Lakhs">Upto 2 Lakhs</option>
                        <option value="2 Lakhs - 5 Lakhs">
                          2 Lakhs - 5 Lakhs
                        </option>
                        <option value="5 Lakhs - 10 Lakhs">
                          5 Lakhs - 10 Lakhs
                        </option>
                        <option value="10 Lakhs - 18 Lakhs">
                          10 Lakhs - 18 Lakhs
                        </option>
                        <option value="18 Lakhs - 30 Lakhs">
                          18 Lakhs - 30 Lakhs
                        </option>
                        <option value="30 Lakhs - 50 Lakhs">
                          30 Lakhs - 50 Lakhs
                        </option>
                        <option value="50 Lakhs - 1 Crore">
                          50 Lakhs - 1 Crore
                        </option>
                        <option value="Above 1 Crore">Above 1 Crore</option>
                      </select>
                      {errorDisp.annual_income && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Annual Income Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput foodField preferencePgInput rounded ${ errorDisp?.food ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.food ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="food"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.food}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Food
                        </option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                      {errorDisp.food && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Food Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput smokeField preferencePgInput rounded ${ errorDisp?.smoke ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.smoke ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="smoke"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.smoke}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Smoke
                        </option>
                        <option value="Never">Never</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Regular">Regular</option>
                      </select>
                      {errorDisp?.smoke && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Smoke Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput drinkField preferencePgInput rounded ${ errorDisp?.drink ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.drink ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="drink"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.drink}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Drink
                        </option>
                        <option value="Never">Never</option>
                        <option value="Sometimes">Sometimes</option>
                        <option value="Regular">Regular</option>
                      </select>
                      {errorDisp?.drink && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Drink Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput heightField preferencePgInput rounded ${ errorDisp?.height ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.height ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="height"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.height}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Height
                        </option>
                        {heightComp()}
                      </select>
                      {errorDisp.height && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Height Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput weightField preferencePgInput rounded ${ errorDisp?.weight ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.weight ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="weight"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.weight}
                      >
                        <option value="" selected disabled className="optionsHead">
                          Weight
                        </option>
                        {weightComp()}
                      </select>
                      {errorDisp.weight && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Weight Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput cityField preferencePgInput rounded ${ errorDisp?.city ? "borderError" : "" }`}>
                      <input
                        type="text"
                        className={`form-control mt-3 p-2 ${
                          errorDisp.city ? "is-invalid-input" : ""
                        }`}
                        placeholder="City"
                        name="city"
                        value={formData?.city}
                        onChange={(e) => handleChangeFormData(e)}
                      />
                      {errorDisp.city && formData.city?.length <= 2 && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          City Is Required
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput locField preferencePgInput rounded ${ errorDisp?.state ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.state && formData.state?.length <= 3
                            ? "is-invalid-input"
                            : ""
                        }`}
                        aria-label=""
                        name="state"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.state}
                      >
                        <option value="" selected disabled className="optionsHead">
                          State
                        </option>
                        {stateDist.states?.map((item) => {
                          return <option value={item.state}>{item.state}</option>;
                        })}
                      </select>
                      {errorDisp.state && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          State Is Mandatory
                        </p>
                      )}
                    </div>
									</div>
									<div className="col-12">
                    <div className={`fieldInput countryField preferencePgInput rounded ${ errorDisp?.country ? "borderError" : "" }`}>
                      <select
                        className={`form-select mt-3 p-2 ${
                          errorDisp.country ? "is-invalid-input" : ""
                        }`}
                        aria-label=""
                        name="country"
                        onChange={(e) => handleChangeFormData(e)}
                        value={formData?.country}
                      >
                        <option value="" disabled className="optionsHead">
                          Country
                        </option>
                        <option selected value="India">
                          India
                        </option>
                      </select>
                      {errorDisp.country && (
                        <p className="is-invalid-text text-nowrap error text-start text-capitalize mb-0 mt-1">
                          Country Is Required
                        </p>
                      )}
                    </div>
									</div>
								</div>
							</div>
						</div>
            <div className="d-flex justify-content-center mt-40">
              <div className="d-grid col-sm-6 col-5">
                <button
                  type="submit"
                  className="btn btn-primary bg-dark p-2"
                  disabled={loading}
                >
                  Update
                </button>
                </div>
            </div>
					</form>
				</div>
			</div>
		</>
	);
};
