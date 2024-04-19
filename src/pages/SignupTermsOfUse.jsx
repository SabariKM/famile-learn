import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/common.css";
import { paymentInitiate } from "../constant/url";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const SignupTermsOfUse = (props) => {
	const propData = useLocation()["state"];
	let navigate = useNavigate();
	let access = sessionStorage.getItem('access_detals');
	let phone = propData?.phone;

	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append("authId", access);
		bodyFormData.append("phoneNumber", phone);
		await axios({
			method: "post",
			url: paymentInitiate,
			data: bodyFormData,
			headers: { "Content-Type": "multipart/form-data" },
		})
			.then(function (response) {
				//handle success
				const res_data = response.data;
				if (res_data.status_code === 101) {
					console.log("Api Authentication failed. login again.");
				} else if (res_data.status_code === 200) {
          console.log(res_data);
					window.location.href =
						res_data.pg_response.data.instrumentResponse.redirectInfo.url;
				} else {
					console.log(res_data.status_msg);
				}
			})
			.catch(function (response) {
				//handle error
				console.log(response);
			});
		setLoading(false);
	};

	useEffect(() => {
		if (access === undefined || !access) {
			navigate("/login");
		}
	}, [access]);

  // {/*
    useEffect(() => {
      const disableBackButton = () => {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function(event) {
          window.scrollTo(-100, 0);
          window.history.pushState(null, '', window.location.href);
        };
      };

      disableBackButton();

      return () => {
        window.onpopstate = null;
      };
    }, []);
  // */}

  {/*
    useEffect(() => {
      const disableBackButton = () => {
        window.history.pushState(null, document.title, window.location.href);
      };

      const handlePopstate = (event) => {
        window.scrollTo(-100, 0);
        window.history.pushState(null, document.title, window.location.href);
      };

      disableBackButton();
      window.addEventListener('popstate', handlePopstate);

      return () => {
        window.removeEventListener('popstate', handlePopstate);
      };
    }, []);
  */}


	return (
		<>
			<Header loginStatus={props.loginStatus} showLogout='showLogout' />
      <div className="bg-container">
        <div className="container d-flex justify-content-center commonContainer">
          <div className="main-div have-note">
            <div className="note d-flex justify-content-center align-items-center">
            Note: Your profile can be edited later
            </div>
            <div className="row">
              <div className="col ">
                <div className="col d-flex gap-4 justify-content-center align-items-center mb-65">
                  <div class="profile">
                    <div class="outer">
                      <div class="inner">
                        <div id="number">
                          75%
                        </div>
                      </div>
                    </div>
                    <svg width="70px" height="70px">
                      <circle
                        className="profile75"
                        cx="35"
                        cy="35"
                        r="30"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="imageUploadHeader">Terms of Use</h2>
                    <p className="mb-0 imageUploadSubHeader">Please read carefully before accessing our <br /> services</p>
                  </div>
                </div>
                <div>
                  <div className="mt-3 pt-3 px-sm-3 px-md-5 pb-4 sintos-content mx-149">
                    <ol>
                      <li>
                        Introduction
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            1.1 Famile.org is solely owned and operated by
                            1D1S Entercon Pvt Ltd, Chennai, India.{" "}
                          </ul>
                          <ul className="p-0">
                            1.2 By using our services, you agree to comply
                            with and be bound by these terms and conditions.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Eligibility
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            2.1 You must be at least 18 years old to register
                            on our site.
                          </ul>
                          <ul className="p-0">
                            2.2 By registering, you confirm that you are
                            legally capable of entering into a matrimonial
                            alliance.
                          </ul>
                          <ul className="p-0">
                            2.3 Since our website specifically mentions that
                            we do support people who do not believe in caste,
                            by subscribing to the services of our website, you
                            hereby confirm that you are a person who does not
                            believe in caste, and any infringement on this
                            ideology will be taken very seriously and your
                            account will be banned immediately.
                          </ul>
                          <ul className="p-0">
                            2.4 Famile.org reserves the right to forthwith
                            terminate your use and/or registration without
                            refund of any subscription fee paid, if at any
                            time Famile.org is, in its sole discretion, of the
                            opinion or has any reason to believe that you are
                            not eligible to use this Website or that you have
                            made any misrepresentation about your eligibility.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Registration and Profile Information
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            3.1 You agree to provide accurate and current
                            information during the registration process.
                          </ul>
                          <ul className="p-0">
                            3.2 Profiles found to contain false information
                            may be subject to removal without notice.
                          </ul>
                          <ul className="p-0">
                            3.3 You hereby represent and warrant that you are
                            representing yourself or the person you are
                            creating a profile for is your nearest member of
                            family (such as son, daughter, brother, sister,
                            etc.,) and you are doing so with their full
                            knowledge and consent. By creating a profile and
                            subscribing to our services, you agree to
                            represent only authentic data and nothing is
                            falsified.{" "}
                          </ul>
                          <ul className="p-0">
                            3.4 As part of the registration process, you are
                            required to setup your preferences. If you do not
                            set your preferred matching preferences, our
                            algorithms will take into default cognizance, the
                            best matching criteria setup on similar profiles
                            as yours.
                          </ul>
                          <ul className="p-0">
                            3.5 Upon registration and payment of the annual
                            subscription fees, Famile.org will start sending
                            you matches, which will be based on availability
                            of matching profiles.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Refund Policy
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            4.1 After your profile registration is completed,
                            your profile will be shared with other matching
                            users, and you will be receiving matching profile
                            as well. Once this process starts, we will not be
                            able to issue refunds.
                          </ul>
                          <ul className="p-0">
                            4.2 In special cases, where users have not
                            received any profile matches at all during the
                            course of their annual subscription, users may
                            contact us, and our team may consider extending
                            the duration of the subscription, or adding a new
                            subscription either totally free of cost or at a
                            reduced price. However, Famile.org reserves the
                            right to do so and it will be at our sole
                            discretion.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Privacy and Security
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            5.1 We prioritize the privacy and security of your
                            personal information. Please refer to our Privacy
                            Policy for details.
                          </ul>
                          <ul className="p-0">
                            5.2 You are responsible for maintaining the
                            confidentiality of your account credentials.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        User Conduct
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            6.1 Users must conduct themselves in a respectful
                            and lawful manner.
                          </ul>
                          <ul className="p-0">
                            6.2 Harassment, abuse, or any form of misconduct
                            towards other users is strictly prohibited.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Content Guidelines
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            7.1 Users are responsible for the content they
                            post on the site, including text, images, and
                            other media.
                          </ul>
                          <ul className="p-0">
                            7.2 Prohibited content includes but is not limited
                            to offensive, misleading, or illegal material.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Interaction with Other Users
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            8.1 Famile.org is not responsible for the outcome
                            of interactions between users.
                          </ul>
                          <ul className="p-0">
                            8.2 Users are encouraged to exercise caution and
                            conduct thorough verification before proceeding
                            with matrimonial alliances.
                          </ul>
                          <ul className="p-0">
                            8.3 You further understand and acknowledge that
                            while interacting with other users, you may be
                            exposed to content that is inaccurate, offensive,
                            indecent, or objectionable, and you hereby waive
                            any legal or equitable rights or remedies you have
                            or may have against Famile.org with respect
                            thereto and agree to indemnify and hold the
                            Famile.org harmless to the fullest extent allowed
                            by law regarding all matters related to your use
                            of the services provided on Famile.org or any of
                            our subsidiary or related service associated with
                            us.
                          </ul>
                          <ul className="p-0">
                            8.4 Users who find suitable profiles of partners
                            through the Website must independently
                            verify/confirm details of the potential partners
                            and should conduct due diligence on their own.
                            Famile.org will not be responsible for the
                            authenticity or correctness of any information
                            exchanged through the Website.
                          </ul>
                          <ul className="p-0">
                            8.5 By using our services, you agree to behave
                            responsibly while interacting with other users and
                            will not exhibit indecent behaviour or solicit
                            other users for financial favours, physical
                            relationships, harass other users in any form or
                            engage in inappropriate communication language.
                            You hereby understand that violation of this
                            policy will result in immediate termination of
                            your account and you will not be issued any refund
                            of your subscription fees.
                          </ul>
                          <ul className="p-0">
                            8.6 You agree not to stalk or persist
                            communication with a person may have communicated
                            with you through Famile.org but has lost interest
                            in you after communications. Such behaviour will
                            be deemed as violation of privacy and harassment
                            and your profile will be terminated and no refunds
                            will be made. We will cooperate with
                            law-enforcement authorities depending on the
                            seriousness and gravity of your violation.
                          </ul>
                          <ul className="p-0">
                            8.7 You agree not to publish or transmit any data
                            related to a profile which was communicated to you
                            via Famile.org, to anyone else.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Termination of Account
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            9.1 Famile.org reserves the right to suspend or
                            terminate accounts that violate these terms.
                          </ul>
                          <ul className="p-0">
                            9.2 Users may terminate their accounts at any time
                            after notifying us.
                          </ul>
                          <ul className="p-0">
                            9.3 Users who are getting married are required to
                            notify us so our website algorithms stop
                            connecting users with your profile.
                          </ul>
                          <ul className="p-0">
                            9.4 Use or launch any automated system, including
                            without limitation, "robots", "spiders", "offline
                            readers", etc., that accesses the Website
                            Famile.org in a manner that sends more request
                            messages to Website servers in a given period of
                            time than a human can reasonably produce in the
                            same period by using a conventional online web
                            browser shall result in termination of your
                            account.
                          </ul>
                          <ul className="p-0">
                            9.5 You agree not to collect or harvest any
                            personally identifiable information, including
                            account names, from Famile.org, nor to use the
                            communication systems provided by the Website for
                            any commercial solicitation purposes.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Modification of Terms
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            10.1 These terms may be modified at any time
                            without prior notice. Users are encouraged to
                            review the terms regularly.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Governing Law
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            11.1 These terms are governed by the laws of
                            Chennai, Tamil Nadu, India.
                          </ul>
                          <ul className="p-0">
                            11.2 Any disputes arising out of or relating to
                            these terms will be subject to the exclusive
                            jurisdiction of the courts in Chennai, Tamil Nadu,
                            India.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Content
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            12.1 Under no circumstances will Famile.org be
                            liable in any way for any Content, including, but
                            not limited to, any errors or omissions in any
                            Content, or any loss or damage of any kind
                            incurred as a result of the use of any Content
                            made available through the Website or as a result
                            thereof.{" "}
                          </ul>
                          <ul className="p-0">
                            12.2 You understand and agree that when using the
                            Website, you will be exposed to Content from
                            different sources and that Famile.org shall not be
                            responsible for the accuracy, usefulness, safety,
                            or intellectual property rights of or relating to
                            such Content.{" "}
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Communication with us
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            13.1 If any content on the Website does not adhere
                            to these terms and conditions, please send an
                            email to hello@famile.org indicating the
                            non-adherence so as to enable Famile.org to take
                            appropriate action as deemed necessary by
                            Famile.org.
                          </ul>
                          <ul className="p-0">
                            13.2 The user has to inform Famile.org that the
                            User has married another User of the Website and
                            wishes to update the Website with a success story.
                            Famile.org reserves the right to request such
                            documents as proof of a marriage as it may deem
                            fit from the User or both the Users.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Our Matching Algorithms
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            14.1 Our matching or match-making algorithms are
                            engineered to send you up to 3 of the best
                            matching profiles based on your preferences and
                            your profile information.
                          </ul>
                          <ul className="p-0">
                            14.2 Our matching algorithms do not guarantee
                            sending you matches every week, and will be able
                            to send you profiles only based on availability of
                            matching profiles.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Marketing
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            15.1 Famile.org also reserves the right to publish
                            the success story of users at its discretion.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Our Software & Services
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            16.1 Reverse engineer, decompile, disassemble,
                            copy, reproduce, distribute, modify, transmit,
                            perform, publish or create derivative works from
                            or in any way exploit any part of the Website in
                            violation of these Terms or the laws of any
                            country.
                          </ul>
                          <ul className="p-0">
                            16.2 Create a database in electronic or structured
                            manual form by systematically downloading and
                            storing the entire Website or part thereof except
                            such information as relates or concerns you
                            directly.
                          </ul>
                        </ol>
                      </li>
                      <li>
                        Your Responsibilities
                        <ol className="ps-0 ps-sm-0 ps-md-4">
                          <ul className="p-0">
                            17.1 You are requested to keep your login
                            credentials private and not to disclose it to
                            anyone. Famile.org is not responsible for any
                            misuse of your account that may arise out of you
                            disclosing your account information to anyone
                            else.
                          </ul>
                          <ul className="p-0">
                            17.2 Keep your information appropriate and updated
                            at all times.
                          </ul>
                          <ul className="p-0">
                            17.3 Famile.org is not responsible for any issues
                            or conflicts that may arise out of your
                            misrepresentation of your data.
                          </ul>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col d-flex justify-content-center">
                  <div className="col-xl-9 col-sm-10 bg-sandal py-30 onlyMobWidth">
                    <h3 className="text-center m-0">Rs. 2995 /-</h3>
                    <p className="text-center mt-0 mb-12 text-12 text-10">
                      For an Annual Subscription (365 Days)
                    </p>
                    <div className="d-grid gap-2 col-xl-3 col-lg-4 col-md-5 col-10 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-primary bg-dark p-2"
                        onClick={() => handlePayment()}
                      >
                        AGREE & SUBSCRIBE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 mb-5">
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
			<div className="ft-footer-block termsOfUseFooter">
				<Footer />
			</div>
		</>
	);
};
