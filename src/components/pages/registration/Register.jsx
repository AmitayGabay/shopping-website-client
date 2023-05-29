import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Register.module.css";
import { Link } from "react-router-dom";
import { apiPost } from "../../../sherd/services/apiRequests";
import { REGISTER_URL } from "../../../sherd/constants/urls";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validPassword, setValidPassword] = useState(false);

    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(USERNAME_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, phone, address, username, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registerRequest = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                username: username,
                password: password
            }
            await apiPost(REGISTER_URL, registerRequest);
            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setUsername('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className={style.register}>
            {success ? (
                <section className={style.section}>
                    <h1>You have successfully registered!</h1>
                    <p>
                        <Link style={{ color: "black", fontWeight: "bold" }} to={"/sign-in"}>Sign in</Link>
                    </p>
                </section>
            ) : (
                <section className={style.section}>
                    <p ref={errRef} className={errMsg ? `${style.errmsg}` : `${style.offscreen}`}>{errMsg}</p>
                    <h1>Sign Up</h1>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.name}>
                            <div>
                                <label className={style.label} htmlFor="firstname">First Name:</label>
                                <input className={style.nameInput}
                                    type="text"
                                    id="firstname"
                                    autoComplete="off"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    required
                                    onFocus={() => setFirstNameFocus(true)}
                                    onBlur={() => setFirstNameFocus(false)}
                                />
                                <p id="uidnote" className={firstNameFocus && !firstName.trim().length ? `${style.instructions}` : `${style.offscreen}`}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    The first name is a required field.
                                </p>
                            </div>
                            <div>
                                <label className={style.label} htmlFor="lastname">Last Name:</label>
                                <input className={style.nameInput}
                                    type="text"
                                    id="lastname"
                                    autoComplete="off"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    required
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                />
                                <p id="uidnote" className={lastNameFocus && !lastName.trim().length ? `${style.instructions}` : `${style.offscreen}`}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    The last name is a required field.
                                </p>
                            </div>
                        </div>
                        <label className={style.label} htmlFor="email">Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? `${style.valid}` : `${style.hide}`} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? `${style.hide}` : `${style.invalid}`} />
                        </label>
                        <input className={style.input}
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && !validEmail ? `${style.instructions}` : `${style.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            The email is a required field. <br />
                            Must have a valid email.
                        </p>
                        <label className={style.label} htmlFor="phone">Phone:</label>
                        <input className={style.input}
                            type="text"
                            id="phone"
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                        <label className={style.label} htmlFor="address">Address:</label>
                        <input className={style.input}
                            type="text"
                            id="address"
                            autoComplete="off"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            required
                            onFocus={() => setAddressFocus(true)}
                            onBlur={() => setAddressFocus(false)}
                        />
                        <p id="uidnote" className={addressFocus && !address.trim().length ? `${style.instructions}` : `${style.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            The address is a required field.
                        </p>
                        <label className={style.label} htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? `${style.valid}` : `${style.hide}`} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !username ? `${style.hide}` : `${style.invalid}`} />
                        </label>
                        <input className={style.input}
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && !validName ? `${style.instructions}` : `${style.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must contain at least 4 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label className={style.label} htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? `${style.valid}` : `${style.hide}`} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? `${style.hide}` : `${style.invalid}`} />
                        </label>
                        <input className={style.input}
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? `${style.instructions}` : `${style.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must contain at least 8 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span aria-label="at symbol">@</span> <span>#</span> <span>$</span> <span>%</span>
                        </p>


                        <label className={style.label} htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? `${style.valid}` : `${style.hide}`} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? `${style.hide}` : `${style.invalid}`} />
                        </label>
                        <input className={style.input}
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? `${style.instructions}` : `${style.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className={style.button} disabled={!validName || !validPassword || !validMatch || !validEmail || !firstName.trim().length || !lastName.trim().length || !address.trim().length ? true : false}>Sign up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className={style.line}>
                            <Link style={{ color: "black", fontWeight: "bold" }} to={"/sign-in"}>sign in</Link>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Register;