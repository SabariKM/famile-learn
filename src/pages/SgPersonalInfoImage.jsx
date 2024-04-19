import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AccessContext } from "../constant/AccessContext";
import axios from "axios";
import { setpersonalinfo } from "../constant/url";
import { canvasPreview } from "../custom-hooks/canvasPreview";
import { useDebounceEffect } from "../custom-hooks/useDebounceEffect";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { toast } from "react-toastify";
import SampleImg from "../assets/img/signup/imginner.png";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from "bootstrap";

export const SgPersonalInfoImage = (props) => {
	let navigate = useNavigate();
	const state = useLocation()["state"];
	let propData = { ...state, login: false };

  const key = sessionStorage.getItem('key');
  const access = sessionStorage.getItem('access_detals');

  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef("");

  const [showModal, setShowModal] = useState(true);
	const [formData, setFormData] = useState({
		photo: SampleImg,
	});
	const [errorDisp, setErrorDisp] = useState(false);
	const [retMsg, setRetMsg] = useState({
		type: "",
		msg: "",
		uploadText: "Upload Photo",
	});
	const [sampleImg, setSampleImg] = useState("sampleInnerImage");
	const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 420,
    height: 420,
    aspect: 420 / 420,
  });

  const [imgSrc, setImgSrc] = useState("");
  const [completedCrop, setCompletedCrop] = useState();

	const handleFiles = (e) => {
    const uploadedImg = e.target.files[0];

    if (uploadedImg?.size > 1024 * 1024 * 10) {
      setErrorDisp(true);
      setRetMsg({...retMsg, msg: 'Maximum file size exceeded.'})
      return false;
    }

    setErrorDisp(false);
    setRetMsg({...retMsg, msg: ''});

    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result || ""));
    reader.readAsDataURL(uploadedImg);
    const imgUrl = URL.createObjectURL(uploadedImg);

		setFormData({
			...formData,
			photo: imgUrl,
			photo_raw: uploadedImg,
      originalPhoto: uploadedImg
		});

		setRetMsg({ ...retMsg, uploadText: "Change Photo" });
		setSampleImg("");
		setErrorDisp(false);
	};

	const handlePersonalInfo = async () => {
		if (errorDisp) {
			return false;
		}
    console.log('formData', ("originalPhoto" in formData));
    if (!("originalPhoto" in formData)) {
      setErrorDisp(true);
      setRetMsg({...retMsg, msg: 'Please select the photo'});
      return false;
    }

		setLoading(true);
    setErrorDisp(false);
    setRetMsg({...retMsg, msg: ''});

		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("photo", formData.photo_raw);
		bodyFormData.append("originalPhoto", formData.originalPhoto);
		bodyFormData.append("comp_lev", 3);

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
					toast.success("Photo Uploaded Successfully");
					setTimeout(() => {
						if (!propData?.login) {
							navigate("/signuptermsofuse", { state: propData });
						}
					}, 2000);
					setRetMsg({ type: "success", msg: res_data.status_msg });
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

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const initCrop = {
      unit: 'px',
      width: width >= 420 ? 420 : width,
      height: height >= 420 ? 420 : height,
      aspect: width >= 420 ? 420 : width / height >= 420 ? 420 : height,
    }
    setCrop({
      ...crop,
      width: width >= 420 ? 420 : width,
      height: height >= 420 ? 420 : height,
      aspect: width >= 420 ? 420 : width / height >= 420 ? 420 : height,
    });
    setCompletedCrop(initCrop);
  }

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
      photo: blobUrlRef.current,
      photo_raw: file
    })
  }

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
    if (access === undefined || !access) {
      navigate("/login");
    }
	}, [access]);

  useEffect(() => {
    if (key !== 'photo-upload') {
      const modalElement = document.getElementById('profileModal');
      const modal = new Modal(modalElement);
      modal.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        setShowModal(false);
      });

      return () => {
        modal.dispose();
      };
    }
  }, [key]);

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
			<Header loginStatus={props.loginStatus} showLogout='showLogout' />
      <div className="bg-container">
        <div
          className="
            container
            d-flex
            justify-content-center
            commonContainer"
        >
          <div className="main-div have-note">
            <div className="note d-flex justify-content-center align-items-center">
              Note: Your profile can be edited later
            </div>
            <div className="d-flex flex-row justify-content-center align-items-md-center align-items-top gap-4 mb-3">
              <div className="profile">
                <div class="outer">
                  <div class="inner">
                    <div id="number">
                      50%
                    </div>
                  </div>
                </div>
                <svg width="70px" height="70px">
                  <circle
                    className="profile50"
                    cx="35"
                    cy="35"
                    r="30"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div className="imageUploadHeaderOuter">
                <h2 className="imageUploadHeader">Upload Your Best Photo</h2>
                <p className="mb-0 fw-bold imageUploadSubHeader" style={{color: '#555 !important'}}>
                  Smile Please. And make sure your photo is vertical.
                </p>
                <p className="imageUploadSubHeader">
                  (Upload JPEG, JPG, PNG only. Max 10 MB file size.)
                </p>
              </div>
            </div>
            <div className="paymentDivider"></div>
            <div className="col-12">
              <div className=" d-flex justify-content-center">
                <div className="col-9 col-sm-8 d-flex justify-content-center">
                  {sampleImg === 'sampleInnerImage' && (
                    <div className="sampleImgBox position-relative">
                      <div className="col" style={{width: "100%", height: "100%"}}>
                        {/* <img
                          className="sampleImgHeart  img-fluid"
                          alt="Famile"
                          src={require("../assets/img/signup/Vector.png")}
                        /> */}
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "100%",
                            height: "100%"
                          }}
                        >
                          <img
                            // className={`img-fluid ${sampleImg}`}
                            src={formData.photo}
                            alt="profileimg"
                            style={{
                              width: sampleImg === "sampleInnerImage" ? "" : "100%",
                              height: sampleImg === "sampleInnerImage"
                                ? ""
                                : "100%",
                              objectFit: `cover`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {sampleImg !== 'sampleInnerImage' && (
                    <ReactCrop
                      crop={crop}
                      onChange={c => setCrop(c)}
                      onComplete={(newCrop) => setCompletedCrop(newCrop)}
                      style={{
                        marginTop: 51,
                        maxWidth: '60%',
                        maxHeight: '100%'
                      }}
                      aspect={420/420}
                      // locked
                    >
                      <img
                        ref={imgRef}
                        src={imgSrc}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  )}
                  {sampleImg !== 'sampleInnerImage' && (
                    <div className="mt-5 d-flex justify-content-center">
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          objectFit: "contain",
                          width: completedCrop?.width,
                          height: completedCrop?.height,
                          visibility: 'hidden',
                          position: 'absolute'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="d-grid gap-2 col-8 col-md-4 mx-auto mt-40">
                <label class="btn btn-lg btn-outline-dark p-0 py-2 uploadBtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cloud-upload uploadIcon"
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
                  {retMsg.uploadText}
                </label>
              </div>
              <div className="col d-flex justify-content-center mt-3 position-relative">
                <div className="d-grid gap-2 col-8 col-md-4 mx-auto">
                  <button
                    className="btn btn-lg btn-dark text-white btn-outline-dark"
                    onClick={() => handlePersonalInfo()}
                    disabled={loading}
                  >
                    SUBMIT
                  </button>
                  <div style={{ height: "30px" }}>
                    {errorDisp === true && (
                      <div>
                        <p
                          className={`is-invalid-text text-nowrap  error mx-auto text-capitalize mb-1 ${retMsg.type}`}
                        >
                          {retMsg.msg}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-center pt-md-3 pt-lg-5 heartOuter">
                <img
                  className="img-fluid"
                  src={require("../assets/img/signup/signuptop.png")}
                  alt="heart"
                  width="129px"
                  height="71px"
                />
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
			<div className="ft-footer-block uploadImgFooter">
				<Footer />
			</div>
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
                <h5 className="text-center modal-head m-0">Profile Created!</h5>
                <p className="text-center modal-desc">Login details sent to you by Email & SMS</p>
              </div>
            </div>
          </div>
        </div>
      )}
		</>
	);
};
