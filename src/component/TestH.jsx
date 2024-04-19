import React from "react";
import { Header } from "./Header";
import "../css/login.css";
import { Footer } from "./Footer";

export const TestH = () => {
    return(
        <>
            <Header />
            <div className="LOGIN px-4">
                
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 position-relative d-flex justify-content-sm-center pt-5 ">
                       
                            <h1 className="text-center position-absolute">Famile</h1>
                        
                            <div className="login-left">
                                <div className="rectangle rectangle4" />
                                <div className="rectangle rectangle3" />
                                <div className="rectangle rectangle2" />
                                <div className="rectangle rectangle1 pt-5" >
                                    <h3 className="text-center">Login</h3>
                                    <p className="text-center">You are already registered. Please login to continue</p>
                                    <div class="mt-5 mx-5 mb-4">
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email" />
                                    </div>
                                    <div class="mx-5 ">
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
                                    </div>
                                    <div class="d-grid gap-2 mx-5 mt-5">
                                        <p className="text-end">Forgot Password</p>
                                        <button class="btn btn-primary bg-dark text-white" type="button">Login</button>
                                        <p className="text-center">Don't have an account? Register</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="login-right">
                                <img className="bg-dots" alt="Famile mm" src={require('../assets/img/group-1088.png')} />
                                <img className="vec-heart" alt="Famile mm" src={require('../assets/img/signup/Vector.png')} />
                                <div className="row">
                                    <div>
                                        <img className="img1" alt="Famile mm" src={require('../assets/img/signup/img1.png')} />
                                        <img className="img2" alt="Famile mm" src={require('../assets/img/signup/img2.png')} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                        <img className="img3" alt="Famile mm" src={require('../assets/img/signup/img3.png')} />
                                        <img
                                            className="img4"
                                            alt="Hands indian bride"
                                            src={require('../assets/img/signup/img4.png')}
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
    )
}