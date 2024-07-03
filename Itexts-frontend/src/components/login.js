import { useEffect } from 'react';
import React, { useState } from "react"
import './style/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        let token = localStorage.getItem('token');
        if (token) {
            navigate(`/home/${token}`,{replace:true});
        }
    },[navigate])
    useEffect(() => {
        const bodystyle = () => {
            document.body.style.display = "grid";
        }
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");
        signupBtn.onclick = (() => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        });
        loginBtn.onclick = (() => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        });
        signupLink.onclick = (() => {
            signupBtn.click();
            return false;
        });
        bodystyle()  
    })
    const [Success, setSuccess] = useState(true);
    const [Alertmess, setAlertmess] = useState("");
    //States for login page
    const [Lemail, setLemail] = useState("");
    const [Lpass, setLpass] = useState("");

    //States for signin page
    const [Sname, setSname] = useState("");
    const [Semail, setSemail] = useState("");
    const [Spass, setSpass] = useState("");
    const Lsubmit = async (e) => {
        e.preventDefault();
        const loginapi = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: Lemail,
                password: Lpass
            })
        });
        const logres = await loginapi.json();
        // console.log(logres)
        if (logres.success) {
            localStorage.setItem("token", logres.token);
            navigate(`/home/${logres.token}`,{replace:true});
        } else {
            setAlertmess("You Entered Wrong Password Or Email !")
            setSuccess(logres.success)
        }
    }
    const Ssubmit = async (e) => {
        e.preventDefault()
        const signupapi = await fetch("http://localhost:5000/api/auth/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: Sname,
                email: Semail,
                password: Spass
            })
        });
        setSname("")
        setSemail("")
        setSpass("")
        const signres = await signupapi.json()
        console.log(signres)
        if (signres.success) {
            document.querySelector("label.login").click()
            // document.querySelector("#login").checked=true

        } else {
            setAlertmess("Email Already Exists !")
            setSuccess(signres.success)
        }
    }
    return (
        <>
            <div className="alert alert-danger bg-danger text-light alert-dismissible fade show" style={{ display: `${Success ? "none" : "block"}` }} role="alert">
                <i className="fa-solid fa-triangle-exclamation fa-beat fa-xl" style={{ color: "#f6f7f9" }}></i>
                &nbsp; {Alertmess}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{ color: "#f6f7f9" }}></button>
            </div>
            <div className="wrapper">
                <div className="title-text">
                    <div className="title login" >Login</div>
                    <div className="title signup">Signup</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" />
                        <input type="radio" name="slide" id="signup" />
                        <label htmlFor="login" className="slide login">Login</label>
                        <label htmlFor="signup" className="slide signup">Signup</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form className="login" onSubmit={Lsubmit}>
                            <div className="field">
                                <input type="email" placeholder="Email Address" value={Lemail} onChange={e => setLemail(e.target.value)} required />
                            </div>
                            <div className="field">
                                <input type="password" id="passin" placeholder="Password" value={Lpass} onChange={e => setLpass(e.target.value)} required />

                            </div>
                            <div className="pass-link"><a href="/">Forgot password?</a></div>
                            <div className="field btnn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Login" style={{ border: "none" }} />
                            </div>
                            <div className="signup-link">Not a member? <a href="/">Signup now</a></div>
                        </form>
                        <form className="signup" onSubmit={Ssubmit}>

                            <div className="field">
                                <input type="text" placeholder="Username" value={Sname} onChange={e => setSname(e.target.value)} required />
                            </div>
                            <div className="field">
                                <input type="email" placeholder="Email Address" value={Semail} onChange={e => setSemail(e.target.value)} required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" value={Spass} onChange={e => setSpass(e.target.value)} required />
                            </div>
                            <div className="field btnn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Login