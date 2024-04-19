import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { Login } from "./pages/Login";
import { PersonalInfoPage } from "./pages/PersonalInfoPage";
import { PaymentResult } from "./pages/PaymentResult";
import { Subcscription } from "./pages/Subcscription";
import { TermsOfService } from "./pages/TermsOfService";
import { TermsOfUse } from "./pages/TermsOfUse";
import { Preference } from "./pages/Preference";
import { Privacy } from "./pages/Privacy";
import { useNavigate } from "react-router-dom";
import { AccessContext } from "./constant/AccessContext";
import { SubscriptionRate } from "./pages/SubscriptionRate";
import { PaymentFailed } from "./pages/PaymentFailed";
import { SgPersonalInfo } from "./pages/SgPersonalInfo";
import { SgPersonalInfoImage } from "./pages/SgPersonalInfoImage";
import { EmailProfileConfirmation } from "./pages/EmailProfileConfirmation";
import { EmailProfileConfirmedResponse } from "./pages/EmailProfileConfirmedResponse";
import { SignupTermsOfUse } from "./pages/SignupTermsOfUse";
import ScrollToTop from "./component/ScrollToTop";
function App() {
	const queryParameters = new URLSearchParams(window.location.search);
	const pathname = queryParameters.get("path");
	const aid = queryParameters.get("aid");
	const phone = queryParameters.get("phone");
	const uqURL = queryParameters.get("uqid");

	const navigate = useNavigate();

	const [authID, setAuthID] = useState();
	const [loginStatus, setLoginStatus] = useState("NOTLOGGEDIN");

	const handleAuthID = (ret_item) => {
		if (ret_item !== undefined && ret_item !== "") {
			sessionStorage.setItem("access_detals", ret_item);
			setAuthID(ret_item.authID);
		}
	};

	const handleLoginAuthID = (ret_item) => {
		if (ret_item !== undefined && ret_item !== "") {
			sessionStorage.setItem("access_detals", ret_item);
			setAuthID(ret_item);
			setLoginStatus("LOGGINSUCCESS");
		}
	};

	const handleLogout = (e) => {
		if (e) {
			setAuthID(null);
			sessionStorage.clear();
			setLoginStatus("NOTLOGGEDIN");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
		}
	};

	useEffect(() => {
		if (pathname !== null) {
			handleAuthID({ authID: aid, phone: phone });
			if (
				pathname === "ematchingprofile" ||
				pathname === "ematchingprofileresponse"
			) {
				navigate(pathname, { state: { uqURL: uqURL }, replace: true });
			} else {
				navigate(pathname, {
					state: { authID: aid, phone: phone },
				});
			}
		}
	}, [pathname]);

	return (
		<div className="App overflow-hidden">
      <ScrollToTop />
			<AccessContext.Provider
				value={{
					authID: authID,
					handleLogout: handleLogout,
					setAuthID: handleAuthID,
				}}
			>
				<Routes>
					<Route
            exact
            path="/"
            element={<SignUp onLogOut={handleLogout} />}
          />
					<Route
						exact
						path="/login"
						element={<Login onLogin={handleLoginAuthID} />}
					/>
					<Route
						exact
						path="/join"
						element={<Login onLogin={handleLoginAuthID} />}
					/>
					<Route
						exact
						path="/personalinfo"
						element={<PersonalInfoPage loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/sgpersonalinfo"
						element={<SgPersonalInfo loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/sgpersonalinfoimg"
						element={<SgPersonalInfoImage loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/signuptermsofuse"
						element={<SignupTermsOfUse loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/subscriptionrate"
						element={<SubscriptionRate loginStatus={loginStatus} />}
					/>
					<Route
						path="/pmtfailed"
						element={<PaymentFailed loginStatus={loginStatus} />}
					/>
					<Route
						path="/pmtresult"
						element={<PaymentResult loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/preference"
						element={<Preference loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/subscription"
						element={<Subcscription loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/termofservice"
						element={<TermsOfService loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/termsofuse"
						element={<TermsOfUse loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/ematchingprofile"
						element={<EmailProfileConfirmation loginStatus={loginStatus} />}
					/>
					<Route
						exact
						path="/ematchingprofileresponse"
						element={
							<EmailProfileConfirmedResponse loginStatus={loginStatus} />
						}
					/>
					{/* <Route
                exact
                path="/verfication"
                element={ <Verification accessId={handleAuthID}/> }
              />
          */}
					<Route
						exact
						path="/privacy"
						element={<Privacy loginStatus={loginStatus} />}
					/>
				</Routes>
			</AccessContext.Provider>
		</div>
	);
}

export default App;
