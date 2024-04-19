import React, { useState, useEffect } from "react";
import { AccessContext } from "../constant/AccessContext";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap";

export const Header = (props) => {
	const acc_type = props.acc_type;
	const loginStatus = props.loginStatus;
	const handleLogout = React.useContext(AccessContext).handleLogout;
  const key = sessionStorage.getItem('key');

	let navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

	const handleClose = () => {
    setMenuOpen(false);
		setShowModal(false);
    document.body.classList.remove('modal-open');
    document.body.classList.add('hedar-modal-open');
	};

	const handleOpen = () => {
		setShowModal(true);
    document.body.classList.remove('hedar-modal-open');
	};

	const LoginRegisterbtn = () => {
		if (acc_type === "login" || acc_type === "register") {
			return (
				<div className="col-8 col-sm-10 col-md-11 d-flex align-items-center justify-content-end mb-2">
					<div className="row d-flex justify-content-end align-items-center">
						<div className="col-12 d-flex justify-content-end">
							<p
								className="text-white pe-2 pt-1 float-right d-none d-md-block m-0"
								style={{ float: "right" }}
							>
								Already a member?
							</p>
							<div className="d-grid gap-2 ">
								<button
									className="btn btn-outline-light btn-lg py-2 login-btn"
									width={{ width: "112px" }}
									onClick={() => {
										navigate("/login", { state: { ret_type: "login" } });
										props.ret_type("login");
									}}
								>
									LOGIN
								</button>
							</div>
							<div className="d-grid gap-2 ">
								<button
									className="btn btn-light btn-lg py-2 login-btn mx-1"
									width={{ width: "112px" }}
									onClick={() => {
										navigate("/join", { state: { ret_type: "register" } });
										props.ret_type("register");
									}}
								>
									Join
								</button>
							</div>
						</div>
					</div>
				</div>
			);
			// } else if (acc_type === "register") {
			// 	return (
			// 		<div className="col-6 col-md-2 d-flex justify-content-end">
			// 			<div className="d-grid gap-2 ">
			// 				<button
			// 					className="btn btn-light btn-lg login-btn"
			// 					width={{ width: "112px" }}
			// 					onClick={() => {
			// 						props.ret_type("register");
			// 						navigate("/login");
			// 					}}
			// 				>
			// 					Join
			// 				</button>
			// 			</div>
			// 		</div>
			// 	);
		} else {
			return <></>;
		}
	};

  useEffect(() => {
    if (showModal) {
      const modalElement = document.getElementById('logoutModal');
      const modal = new Modal(modalElement);
      modal.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        setShowModal(false);
      });
      return () => {
        modal.dispose();
        setMenuOpen(false);
      };
    }
  }, [showModal]);

	return (
		<>
			<nav className="navbar navbar_bg">
				<div className="container container-width">
					<div className="col d-flex ">
						{(loginStatus === "LOGGINSUCCESS")
              && (key !== "all-verified" && key !== "preference") && (
              <NavLink exact className="navbar-brand" to="/">
                <img
                  src={require("../assets/logo/logo_light.png")}
                  srcSet={require("../assets/logo/logo_light.png")}
                  alt="Famile Logo"
                  width="90"
                  height="70"
                />
						  </NavLink>
            )}
						{(loginStatus !== "LOGGINSUCCESS") && (
              <NavLink exact className="navbar-brand" to="/">
                <img
                  src={require("../assets/logo/logo_light.png")}
                  srcSet={require("../assets/logo/logo_light.png")}
                  alt="Famile Logo"
                  width="90"
                  height="70"
                />
						  </NavLink>
            )}
						{loginStatus === "LOGGINSUCCESS"
              && (key === "all-verified" || key === "preference") && (
              <NavLink exact className="navbar-brand" to="/personalinfo">
                <img
                  src={require("../assets/logo/logo_light.png")}
                  srcSet={require("../assets/logo/logo_light.png")}
                  alt="Famile Logo"
                  width="90"
                  height="70"
                />
						  </NavLink>
            )}
						{loginStatus === "LOGGINSUCCESS"
              && (key === "all-verified" || key === "preference") && (
							<div className="col-11 d-none d-lg-flex align-items-lg-center justify-content-lg-end">
								<ul className="navbar-nav main-nav">
									<li className="main-nav-item">
										<NavLink
											exact
											activeClassName="main-nav-item-active"
											className={({isActive}) => isActive
                        ? "main-nav-item-active nav-NavLink text-white"
                        : "nav-NavLink"
                      }
											aria-current="page"
											to="/personalinfo"
										>
											Your Profile
										</NavLink>
									</li>
                  <li className="main-nav-item">
										<NavLink
											exact
											activeClassName="main-nav-item-active"
											className={({isActive}) => isActive
                        ? "main-nav-item-active nav-NavLink text-white"
                        : "nav-NavLink"
                      }
											to="/preference"
										>
											Preferences
										</NavLink>
									</li>
									<li className="main-nav-item">
										<NavLink
											exact
											activeClassName="main-nav-item-active"
											className={({isActive}) => isActive
                        ? "main-nav-item-active nav-NavLink text-white"
                        : "nav-NavLink"
                      }
											to="/subscription"
										>
											Subscription
										</NavLink>
									</li>
									<li className="main-nav-item">
										<a className="nav-NavLink" onClick={handleOpen}>
											Logout
										</a>
									</li>
								</ul>
							</div>
						)}
            {(loginStatus === "LOGGINSUCCESS")
              && (key === "all-verified" || key === "preference") && (
              <div className="col-9 col-md-11 position-relative">
                <button
                  className="navbar-toggler d-block d-lg-none position-absolute navBtn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleMenu}
                >
                  <span
                    className={`
                      ${isMenuOpen
                        ? 'navbar-toggler-icon-close'
                        : 'navbar-toggler-icon'
                      }
                    `}
                  >
                  </span>
                </button>
                <div className="d-block d-lg-none xl-navbar bg-white">
                  <div
                    className="collapse navbar-collapse d-lg-none d-xl-none"
                    id="navbarSupportedContent"
                  >
                    {isMenuOpen && (
                        <ul className="navbar-nav">
                          <li className="nav-item">
                            <NavLink
                              exact
                              className={({isActive}) => isActive
                                ? "nav-NavLink activeNav text-dark"
                                : "nav-NavLink text-dark"
                              }
                              aria-current="page"
                              to="/personalinfo"
                            >
                              Your Profile
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              exact
                              className={({isActive}) => isActive
                                ? "nav-NavLink activeNav text-dark"
                                : "nav-NavLink text-dark"
                              }
                              to="/preference"
                            >
                              Preferance
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              exact
                              className={({isActive}) => isActive
                                ? "nav-NavLink activeNav text-dark"
                                : "nav-NavLink text-dark"
                              }
                              to="/subscription"
                            >
                              Subscription
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <a className="nav-NavLink text-dark" onClick={handleOpen}>
                              Logout
                            </a>
                          </li>
                        </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
            {loginStatus !== "LOGGINSUCCESS" && <LoginRegisterbtn />}
            {props?.showLogout === 'showLogout' && (
              <div className="col-8 col-sm-10 col-md-11 d-flex align-items-center justify-content-end">
              <ul className="navbar-nav main-nav">
                <li className="main-nav-item">
                  <a className="nav-NavLink" onClick={handleOpen}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            )}
					</div>
				</div>
			</nav>
			{/* <div>
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div> */}
      <div
        className={`${showModal ? 'd-block fade modal' : 'd-none'}`}
        id="logoutModal"
        tabIndex={-1}
        data-bs-backdrop="static"
      >
        <div className='modal-dialog'>
          <div className='modal-content profile-content'>
            <div className='modal-header'>
              <button
                type="button"
                class="btn-close custom-close"
                onClick={() => handleClose()}
              />
            </div>
            <div className="modal-body pt-2">
              <h4 className="text-center mb-4">Log out?</h4>
              <div className="logout-modal-img mx-auto mb-2">
                <img
                  src={require('../assets/img/signup/logout-icon.png')}
                  alt="Log out!"
                />
              </div>
              <p className="text-center m-0 mb-4">You are about to logout</p>
              <div className="col mb-4">
                <div className="d-flex justify-content-center gap-1">
                  <div className=" d-grid gap-2 ">
                    <button
                      className="btn btn-light btn-lg py-2 logout-btn"
                      width={{ width: "112px" }}
                      onClick={() => handleClose()}
                    >
                      Stay
                    </button>
                  </div>
                  <div className="d-grid gap-2 ">
                    <button
                      className="btn btn-light btn-lg py-2 logout-btn mx-1 btn-dark"
                      width={{ width: "112px" }}
                      onClick={() => {
                        setMenuOpen(false);
                        setShowModal(false);
                        handleLogout(true);
                        document.body.classList.add('hedar-modal-open');
                        document.body.classList.remove('modal-open');
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		</>
	);
};
