import React from "react";
import "../css/common.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";

export const TermsOfUse = (props) => {
	return (
		<>
			<Header loginStatus={props.loginStatus} />
			<div className="container d-flex justify-content-center">
				<div className="main-div">
					<div className="mt-5">
						<div className="row">
							<div className="col d-flex justify-content-center">
								<div className="col-12 col-md-8 ">
									<h2 className="text-center">Terms of Use</h2>
									<div className="px-2 m-3 my-3 py-3 tos-content">
										<ol>
											<li>
												Introduction
												<ol>
													<ul>
														1.1 Famile.org is solely owned and operated by 1D1S
														Entercon Pvt Ltd, Chennai, India.
													</ul>
													<ul>
														1.2 By using our services, you agree to comply with
														and be bound by these terms and conditions.
													</ul>
												</ol>
											</li>
											<li>
												Eligibility
												<ol>
													<ul>
														2.1 You must be at least 18 years old to register on
														our site.
													</ul>
													<ul>
														2.2 By registering, you confirm that you are legally
														capable of entering into a matrimonial alliance.
													</ul>
													<ul>
														2.3 Since our website specifically mentions that we
														do support people who do not believe in caste, by
														subscribing to the services of our website, you
														hereby confirm that you are a person who does not
														believe in caste, and any infringement on this
														ideology will be taken very seriously and your
														account will be banned immediately.
													</ul>
													<ul>
														2.4 Famile.org reserves the right to forthwith
														terminate your use and/or registration without
														refund of any subscription fee paid, if at any time
														Famile.org is, in its sole discretion, of the
														opinion or has any reason to believe that you are
														not eligible to use this Website or that you have
														made any misrepresentation about your eligibility.
													</ul>
												</ol>
											</li>
											<li>
												Registration and Profile Information
												<ol>
													<ul>
														3.1 You agree to provide accurate and current
														information during the registration process.
													</ul>
													<ul>
														3.2 Profiles found to contain false information may
														be subject to removal without notice.
													</ul>
													<ul>
														3.3 You hereby represent and warrant that you are
														representing yourself or the person you are creating
														a profile for is your nearest member of family (such
														as son, daughter, brother, sister, etc.,) and you
														are doing so with their full knowledge and consent.
														By creating a profile and subscribing to our
														services, you agree to represent only authentic data
														and nothing is falsified.{" "}
													</ul>
													<ul>
														3.4 As part of the registration process, you are
														required to setup your preferences. If you do not
														set your preferred matching preferences, our
														algorithms will take into default cognizance, the
														best matching criteria setup on similar profiles as
														yours.
													</ul>
													<ul>
														3.5 Upon registration and payment of the annual
														subscription fees, Famile.org will start sending you
														matches, which will be based on availability of
														matching profiles.
													</ul>
												</ol>
											</li>
											<li>
												Refund Policy
												<ol>
													<ul>
														4.1 After your profile registration is completed,
														your profile will be shared with other matching
														users, and you will be receiving matching profile as
														well. Once this process starts, we will not be able
														to issue refunds.
													</ul>
													<ul>
														4.2 In special cases, where users have not received
														any profile matches at all during the course of
														their annual subscription, users may contact us, and
														our team may consider extending the duration of the
														subscription, or adding a new subscription either
														totally free of cost or at a reduced price. However,
														Famile.org reserves the right to do so and it will
														be at our sole discretion.
													</ul>
												</ol>
											</li>
											<li>
												Privacy and Security
												<ol>
													<ul>
														5.1 We prioritize the privacy and security of your
														personal information. Please refer to our Privacy
														Policy for details.
													</ul>
													<ul>
														5.2 You are responsible for maintaining the
														confidentiality of your account credentials.
													</ul>
												</ol>
											</li>
											<li>
												User Conduct
												<ol>
													<ul>
														6.1 Users must conduct themselves in a respectful
														and lawful manner.
													</ul>
													<ul>
														6.2 Harassment, abuse, or any form of misconduct
														towards other users is strictly prohibited.
													</ul>
												</ol>
											</li>
											<li>
												Content Guidelines
												<ol>
													<ul>
														7.1 Users are responsible for the content they post
														on the site, including text, images, and other
														media.
													</ul>
													<ul>
														7.2 Prohibited content includes but is not limited
														to offensive, misleading, or illegal material.
													</ul>
												</ol>
											</li>
											<li>
												Interaction with Other Users
												<ol>
													<ul>
														8.1 Famile.org is not responsible for the outcome of
														interactions between users.
													</ul>
													<ul>
														8.2 Users are encouraged to exercise caution and
														conduct thorough verification before proceeding with
														matrimonial alliances.
													</ul>
													<ul>
														8.3 You further understand and acknowledge that
														while interacting with other users, you may be
														exposed to content that is inaccurate, offensive,
														indecent, or objectionable, and you hereby waive any
														legal or equitable rights or remedies you have or
														may have against Famile.org with respect thereto and
														agree to indemnify and hold the Famile.org harmless
														to the fullest extent allowed by law regarding all
														matters related to your use of the services provided
														on Famile.org or any of our subsidiary or related
														service associated with us.
													</ul>
													<ul>
														8.4 Users who find suitable profiles of partners
														through the Website must independently
														verify/confirm details of the potential partners and
														should conduct due diligence on their own.
														Famile.org will not be responsible for the
														authenticity or correctness of any information
														exchanged through the Website.
													</ul>
													<ul>
														8.5 By using our services, you agree to behave
														responsibly while interacting with other users and
														will not exhibit indecent behaviour or solicit other
														users for financial favours, physical relationships,
														harass other users in any form or engage in
														inappropriate communication language. You hereby
														understand that violation of this policy will result
														in immediate termination of your account and you
														will not be issued any refund of your subscription
														fees.
													</ul>
													<ul>
														8.6 You agree not to stalk or persist communication
														with a person may have communicated with you through
														Famile.org but has lost interest in you after
														communications. Such behaviour will be deemed as
														violation of privacy and harassment and your profile
														will be terminated and no refunds will be made. We
														will cooperate with law-enforcement authorities
														depending on the seriousness and gravity of your
														violation.
													</ul>
													<ul>
														8.7 You agree not to publish or transmit any data
														related to a profile which was communicated to you
														via Famile.org, to anyone else.
													</ul>
												</ol>
											</li>
											<li>
												Termination of Account
												<ol>
													<ul>
														9.1 Famile.org reserves the right to suspend or
														terminate accounts that violate these terms.
													</ul>
													<ul>
														9.2 Users may terminate their accounts at any time
														after notifying us.
													</ul>
													<ul>
														9.3 Users who are getting married are required to
														notify us so our website algorithms stop connecting
														users with your profile.
													</ul>
													<ul>
														9.4 Use or launch any automated system, including
														without limitation, "robots", "spiders", "offline
														readers", etc., that accesses the Website Famile.org
														in a manner that sends more request messages to
														Website servers in a given period of time than a
														human can reasonably produce in the same period by
														using a conventional online web browser shall result
														in termination of your account.
													</ul>
													<ul>
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
												<ol>
													<ul>
														10.1 These terms may be modified at any time without
														prior notice. Users are encouraged to review the
														terms regularly.
													</ul>
												</ol>
											</li>
											<li>
												Governing Law
												<ol>
													<ul>
														11.1 These terms are governed by the laws of
														Chennai, Tamil Nadu, India.
													</ul>
													<ul>
														11.2 Any disputes arising out of or relating to
														these terms will be subject to the exclusive
														jurisdiction of the courts in Chennai, Tamil Nadu,
														India.
													</ul>
												</ol>
											</li>
											<li>
												Content
												<ol>
													<ul>
														12.1 Under no circumstances will Famile.org be
														liable in any way for any Content, including, but
														not limited to, any errors or omissions in any
														Content, or any loss or damage of any kind incurred
														as a result of the use of any Content made available
														through the Website or as a result thereof.{" "}
													</ul>
													<ul>
														12.2 You understand and agree that when using the
														Website, you will be exposed to Content from
														different sources and that Famile.org shall not be
														responsible for the accuracy, usefulness, safety, or
														intellectual property rights of or relating to such
														Content.{" "}
													</ul>
												</ol>
											</li>
											<li>
												Communication with us
												<ol>
													<ul>
														13.1 If any content on the Website does not adhere
														to these terms and conditions, please send an email
														to hello@famile.org indicating the non-adherence so
														as to enable Famile.org to take appropriate action
														as deemed necessary by Famile.org.
													</ul>
													<ul>
														13.2 The user has to inform Famile.org that the User
														has married another User of the Website and wishes
														to update the Website with a success story.
														Famile.org reserves the right to request such
														documents as proof of a marriage as it may deem fit
														from the User or both the Users.
													</ul>
												</ol>
											</li>
											<li>
												Our Matching Algorithms
												<ol>
													<ul>
														14.1 Our matching or match-making algorithms are
														engineered to send you up to 3 of the best matching
														profiles based on your preferences and your profile
														information.
													</ul>
													<ul>
														14.2 Our matching algorithms do not guarantee
														sending you matches every week, and will be able to
														send you profiles only based on availability of
														matching profiles.
													</ul>
												</ol>
											</li>
											<li>
												Marketing
												<ol>
													<ul>
														15.1 Famile.org also reserves the right to publish
														the success story of users at its discretion.
													</ul>
												</ol>
											</li>
											<li>
												Our Software & Services
												<ol>
													<ul>
														16.1 Reverse engineer, decompile, disassemble, copy,
														reproduce, distribute, modify, transmit, perform,
														publish or create derivative works from or in any
														way exploit any part of the Website in violation of
														these Terms or the laws of any country.
													</ul>
													<ul>
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
												<ol>
													<ul>
														17.1 You are requested to keep your login
														credentials private and not to disclose it to
														anyone. Famile.org is not responsible for any misuse
														of your account that may arise out of you disclosing
														your account information to anyone else.
													</ul>
													<ul>
														17.2 Keep your information appropriate and updated
														at all times.
													</ul>
													<ul>
														17.3 Famile.org is not responsible for any issues or
														conflicts that may arise out of your
														misrepresentation of your data.
													</ul>
												</ol>
											</li>
										</ol>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
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
			<div className="ft-footer-block">
				<Footer />
			</div>
		</>
	);
};
