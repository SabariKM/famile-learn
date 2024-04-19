import React, { useState, useEffect } from "react";

export const PersonalInfoView = (props) => {
  const userDetails = props.formData;

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
		height: "",
		weight: "",
		city: "",
		state: "",
		country: "",
		photo: require("../assets/img/signup/profilesample.png"),
	});

	const handleEditView = (name) => {
		props.pageChange(name);
	};

  const getMonth = (month) => {
    return month === '01'
      ? 'Jan'
      : month === '02'
      ? 'Feb'
      : month === '03'
      ? 'Mar'
      : month === '04'
      ? 'Apr'
      : month === '05'
      ? 'May'
      : month === '06'
      ? 'Jun'
      : month === '07'
      ? 'Jul'
      : month === '08'
      ? 'Aug'
      : month === '09'
      ? 'Sep'
      : month === '10'
      ? 'Oct'
      : month === '11'
      ? 'Nov'
      : 'Dec'
  }

	useEffect(() => {
		setFormData(userDetails);
	}, []);

  useEffect(() => {
    setFormData(props.formData);
  }, [props.formData]);

	return (
		<>
			<div className="preferance row">
        <div className="d-flex justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-8 col-10">
            <div className="col-12 d-flex justify-content-center flex-column align-items-center">
              <div className="sampleImgBox imgContainer position-relative">
                <img
                  className={`img-fluid`}
                  src={formData?.photo}
                  alt="profileimg"
                />
              </div>
            </div>
            <h2 className="text-center mt-77 fs-21">Personal Details</h2>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <div className="col-12">
                <div className="col-12 mb-3">
                  <div class="fieldInput nameField preferencePgInput rounded">
                    <input className="h-48 col-12" type="text" value={formData?.fname} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput mailField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.email} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput genderField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.gender} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput dateField preferencePgInput d-flex gap-2">
                    <input
                      className="h-48 ms-54"
                      type="text"
                      value={formData?.dob.split('-')[2]}
                      disabled
                      style={{width: '100%'}}
                    />
                    <input
                      className="h-48"
                      type="text"
                      value={getMonth(formData?.dob.split('-')[1])}
                      disabled
                      style={{width: '100%'}}
                    />
                    <input
                      className="h-48"
                      type="text"
                      value={formData?.dob.split('-')[0]}
                      disabled
                      style={{width: '100%'}}
                    />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput langField preferencePgInput rounded">
                    <input className="h-48 col-12" type="text" value={formData?.language} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput relegionField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.religion} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput educationField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.edu_qual} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput professionField preferencePgInput rounded">
                    <input className="h-48 col-12" type="text" value={formData?.profession} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput incomeField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.annual_income} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput foodField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.food} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput smokeField preferencePgInput rounded">
                    <input className="h-48 col-12" type="text" value={formData?.smoke} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput drinkField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.drink} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput heightField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.height} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput weightField preferencePgInput rounded">
                    <input className="h-48 col-12" type="text" value={formData?.weight} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput cityField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.city} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput locField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.state} disabled />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div class="fieldInput countryField preferencePgInput">
                    <input className="h-48 col-12" type="text" value={formData?.country} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <div className="d-grid col-sm-6 col-5">
                <button
                  className="btn shadow-sm btn-dark text-white font14 mt-2 "
                  onClick={() => handleEditView("EDIT")}
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
			</div>
		</>
	);
};
