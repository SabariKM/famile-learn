import React from "react";
import vector_11 from "../assets/img/vector-11.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<>
      <div className="row position-relative d-flex justify-content-around ft-top-rectangle pt-3 pb-3 mx-0 px-lg-4">
        <div className="container container-width ">
          <div className="row px-2 px-lg-5 px-xl-5 mx-xl-3 mx-lg-3">
            <div className="col-8 px-0">
              <div className="ft-overlap">
                <div className="ft-socialm-box">
                  <img
                    className="ft-heart-vector"
                    alt="Vector"
                    src={vector_11}
                  />
                  <p className="connect-smedia m-0">Social Media</p>
                  <p className="connect-smedia-slbl m-0">Connect with us</p>
                </div>
              </div>
            </div>
            <div className="col-4 d-flex justify-content-end p-0 instagramOuterDiv">
              <div className="p-0">
                <a href="https://www.instagram.com/_famile_/" target="_blank">
                  <img
                    className="icon-instagram float-right"
                    alt="Icon instagram"
                    src={require("../assets/img/pngwing 2.png")}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row position-relative d-flex justify-content-around ft-btm-rectangle pt-3 pb-3 mx-0 px-lg-4">
        <div className="container container-width ">
          <div className="row px-2 px-lg-5 px-xl-5 mx-lg-3">
            <div className="col-sm-12 col-lg-8 px-0">
              <div className="col-12 px-0 text-center text-lg-start decreasedMarginTop">
                <Link exact to="/termsofuse" className="text-white footerTextAnchor">
                  Terms of Use
                </Link>
              </div>
              <div className="col-12 text-center text-lg-start">
                <Link exact to="/termofservice" className="text-white footerTextAnchor">
                  Your Privacy &amp; Our Responsibility
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 d-flex justify-content-end p-0">
              <div className="col-12 col-lg-10 col-lg-7 mt-1">
                <div className="col-xs-12 text-center text-lg-end">
                  <Link exact className="text-white mb-2 ms-md-3 text-decoration-underline footerTextAnchor">
                    Contact Us (hello@famile.org)
                  </Link>
                </div>
                <div className="col-xs-12 col d-flex justify-content-center justify-content-lg-end">
                  <div className=" col-md-12">
                    <p exact className="text-white m-0 ms-md-3 text-center text-lg-end footerTextAnchor">
                      1D1S Entercon Private Limited
                    </p>
                    <p exact className="text-white m-0 ms-md-3 text-center text-lg-end footerTextAnchor">
                      #3, 4th Street, Balakrishnapuram, Adambakkam, Chennai -
                      600088
                    </p>
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
