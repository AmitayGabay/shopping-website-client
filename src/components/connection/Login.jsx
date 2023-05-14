import React, { useRef, useState, useEffect, useContext } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import { apiGet, apiPost } from "../../sherd/services/apiRequests";
import { GET_USER_BY_USERNAME_URL, SIGNIN_URL } from "../../sherd/constants/urls";
import UserContext from "../../sherd/contexts/userContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { updateCurrentUser } = useContext(UserContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginRequest = {
                username: username,
                password: password,
            };
            const data = await apiPost(SIGNIN_URL, loginRequest);
            localStorage.setItem("Authorization", "Bearer " + data.jwt);
            const user = await apiGet(GET_USER_BY_USERNAME_URL, "sendToken");
            updateCurrentUser(user);
            setUsername("");
            setPassword("");
            navigate("/");
        } catch (e) {
            if (!e.response) {
                setErrMsg("No Server Response");
            } else if (e.response.status === 403) {
                setErrMsg("Incorrect Username Or Password");
            } else {
                setErrMsg("Authentication Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <div className={style.logIn}>
            <section className={style.section}>
                <p ref={errRef} className={errMsg ? style.error_mes : "offscreen"}>
                    {errMsg}
                </p>
                <h1>Sign In</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label className={style.label} htmlFor="userName">Username:</label>
                    <input className={style.input}
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <label className={style.label} htmlFor="password">Password:</label>
                    <input className={style.input}
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button className={style.button} type="submit" disabled={!username.trim().length || !password.trim().length}>
                        Sign in
                    </button>
                </form>
                <p>
                    Need an Account?
                    <br />
                    <span className="line">
                        <Link to="/sign-up">Sign up</Link>
                    </span>
                </p>
            </section>
        </div>
    );
}

export default Login;
