import React, { useEffect, useState } from "react";

export const PreferanceView = (props) => {
	const [formData, setFormData] = useState({
		gender: "",
		fromAge: "",
		toAge: "",
		marital_status: "",
		food: "",
		language: "",
		religion: "",
		state: "",
		country: "",
	});

	useEffect(() => {
		setFormData(props.formData);
	}, [props.formData]);

  useEffect(() => {
    props.handlePreferance();
  }, [])

	return (
		<div className="preftbl-pref row">
      <div className="d-flex justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-9 col-11">
          <div className="col-12 mb-3">
            <div class="fieldInput genderField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.gender} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex justify-content-between gap-2">
              <div className="preferencePgInput fieldInput fieldAge">
                <input className="h-48 " style={{width: '100%'}} type="text" value={formData.fromAge} disabled />
              </div>
              <div className="preferencePgInput fieldInput fieldAge">
                <input className="h-48 fieldAge" style={{width: '100%'}} type="text" value={formData.toAge} disabled />
              </div>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput maritalField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.marital_status} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput foodField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.food} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput langField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.language} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput relegionField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.religion} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput smokeField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.smoke} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput drinkField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.drink} disabled />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div class="fieldInput locField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.state} disabled />
            </div>
          </div>
          <div className="col-12">
            <div class="fieldInput countryField preferencePgInput">
              <input className="h-48 col-12" type="text" value={formData.country} disabled />
            </div>
          </div>
          <div className="col-12 mb-3 mt-40 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary bg-dark p-2 col-7"
              onClick={() => props.pageChange("EDIT")}
            >
              Edit Preferences
            </button>
          </div>
        </div>
      </div>
		</div>
	);
};
