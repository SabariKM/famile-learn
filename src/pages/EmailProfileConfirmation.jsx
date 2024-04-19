import React,{useState, useContext, useEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate } from "react-router-dom";
import { AccessContext } from '../constant/AccessContext';

import "../css/login.css";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { getSenderDataFromURLID, getSenderProfileConfirmationFromURLID } from "../constant/url";

export const EmailProfileConfirmation = (props) => {
    const state = useLocation()['state'];
    const [ uqURL ] = useState(state.uqURL);
    let navigate = useNavigate();

    const [status , setStatus] = useState('init');
    const [formData, setFormData] = useState({ fname: '', email:'', gender:'', dob:'', language:'', religion:'', 
    edu_qual:'', profession:'', annual_income:'', food:'', height:'', weight:'', city:'', state:'', country:'', photo:require('../assets/img/signup/profilesample.png') });

    const handlePersonalInfo = async(uqURL) => {
        var bodyFormData = new FormData();
        bodyFormData.append('uqURl', uqURL);
    
        await axios({
          method: "post",
          url: getSenderDataFromURLID,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            const res_data = response.data;
            console.log(res_data);
            if (res_data.status_code === 101){
              navigate('/login');
            }else if(res_data.status_code === 200){
              const udata = res_data.data
              setFormData({ fname: udata.fname, email:udata.email, gender:udata.gender, dob:udata.dob, language:udata.language, religion:udata.religion, 
              edu_qual:udata.edu_qual, profession:udata.profession, annual_income:udata.annual_income, food:udata.food, height:udata.height, weight:udata.weight, 
              city:udata.city, state:udata.state, country:udata.country, photo:udata.photo });
            }
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
    }

    const handleProfileConfirmation = async(uqURL) => {
        setStatus('load');
        var bodyFormData = new FormData();
        bodyFormData.append('uqURl', uqURL);
    
        await axios({
          method: "post",
          url: getSenderProfileConfirmationFromURLID,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            const res_data = response.data;
            console.log(res_data);
            if (res_data.status_code === 101){
              navigate('/login');
            }else if(res_data.status_code === 200){
                setStatus('success');
            }
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
    }
    useEffect(() =>{
        handlePersonalInfo(uqURL);
    },[uqURL]);

    return (
        <>
    <Header />
        <div  className="container d-flex justify-content-center">
            <div className="main-div">
                <div className="pt-5">
                    <div className="row" >
                        <div className="col p-0">
                            <h2 className="text-center pt-3">Matching Profile</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <img src={formData.photo} className="img-fluid" style={{    width: '300px',height: '260px'}}/>
                                        </div>
                                        <div className="col">
                                            <p>{formData.fname}</p>
                                            <p>{formData.dob + " " + formData.gender}</p>
                                            <p>{formData.city + " " + formData.state}</p>
                                            <p>{formData.profession}</p>
                                            <p>{formData.annual_income}</p>
                                            <p>{formData.weight + ", "+formData.height}</p>
                                            <p>{formData.food}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {
                                            status === 'init' &&
                                        <>
                                            <p className="text-center">
                                            By clicking below, you are consenting to your profile being sent to this person. If they are interested in you, they will receive access to your phone number and vice versa.
                                            </p>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn bg-dark text-white " onClick={() => handleProfileConfirmation(uqURL)}>CONFIRM MY INTEREST</button>
                                            </div>
                                        </>
                                        }
                                        {
                                        status === 'load' &&
                                        <>
                                            <div className="d-flex justify-content-center">
                                                <div className="bg-dark p-2">
                                                    <p className="text-white text-center">Sharing Your Interest, Please Wait</p>
                                                </div>
                                            </div>
                                        </>
                                        }
                                        {
                                        status === 'success' &&
                                        <>
                                            <div className="">
                                                <div className="d-flex justify-content-center ">
                                                    <div className="col-4">
                                                        <img className="img-fulid" src={require('../assets/img/signup/tickCircle.png')} alt="tick circle"/>
                                                    </div>
                                                </div>
                                                <p className="text-center">Your interest has been sent to this person. Please wait while they confirm their interest.</p>
                                            </div>
                                        </>
                                        }
                                    </div>
                                </div>
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