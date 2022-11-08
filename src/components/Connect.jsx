import { Input } from './Elements/Elements';
import css from './../styles/connect.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';


import { logInWithEmailAndPassword, registerWithEmailAndPassword, signInWithGoogle, sendPasswordReset } from "./../firebase";

function filterErr(error) {
    console.log(error);
    let type = "", code = "";
    if (error) {
        if (error.message.includes('auth/user-not-found')) {
            type = "email";
            code = "This user does not exist";
        } else if (error.message.includes('auth/wrong-password')) {
            type = "password";
            code = "This password is incorrect";
        } else if (error.message.includes('auth/too-many-requests')) {
            type = "toast";
            code = "Too many requests. Reset your password or try again later.";
        } else if (error.message.includes('auth/popup-closed-by-user')) {
            type = "error";
            code = "Popup closed by user. Try again.";
        } else if (error.message.includes('auth/email-already-in-use')) {
            type = "email";
            code = "This email address is already in use";
        } else if (error.message.includes('auth/invalid-email')) {
            type = "email";
            code = "This email is invalid";
        } else if (error.message.includes('auth/internal-error')) {
            type = "toast";
            code = "An internal error occured. Try again later.";
        }
    }
    return {
        type,
        code,
    };
}

function Connect(props) {
    const [state, setState] = useState("login");
    return (
        <div className={css.connector}>
            <div className={css.layout}>
                <div className={css.wrapper}>
                    {state === "login" && <LoginCard setState={setState} />}
                    {state === "register" && <RegisterCard setState={setState} />}
                    {state === "password" && <PasswordCard setState={setState} />}
                </div>
            </div>
        </div>
    );
}
export default Connect;

function LoginCard(props) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [disabled, setDisabled] = useState(false);

    async function login(e) {
        e.preventDefault();

        if (!email) return e.target[0].focus();
        if (!password) return e.target[1].focus();

        setEmailError("");
        setPasswordError("");

        setDisabled(true);

        const auth = await logInWithEmailAndPassword(email, password);
        const error = filterErr(auth);
        if (error.type === 'email') {
            setEmailError(error.code);
            e.target[0].focus();
        } else if (error.type === 'password') {
            setPasswordError(error.code);
            e.target[1].focus();
        } else if (error.type === 'toast') {
            toast.error(error.code);
            e.target[0].focus();
        }
        setDisabled(false);
    }

    async function google(e) {
        setDisabled(true);
        const post = toast.loading("Waiting for Google authentication...");
        const auth = await signInWithGoogle();
        const error = filterErr(auth);
        if (auth) {
            toast.error(error.code, {id: post});
        } else {
            toast.success("Google Authentication completed.", {id: post});
        }
        setDisabled(false);
    }
    return (
        <>
            <div className={css.content}>
                <div className={css.header}>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </div>
                </div>
                <form action="" className={css.form} onSubmit={login}>
                    <Input
                        type="email"
                        label="Email Address"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError || ""}
                        required={true}
                    />
                    <Input
                        type="password"
                        label="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError || ""}
                        required={true}
                    />
                    <div className="justify-center">
                        <button type="submit" className={css.button} disabled={disabled}>Sign in</button>
                    </div>
                </form>
                <div className="justify-center">
                    <button type="button" onClick={google} disabled={disabled} className={css.happy}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={css.google}>
                            <g>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>
            </div>
            <div className={css.content}>
                <div className="justify-center">
                    <button type="button" disabled={disabled} onClick={() => props.setState("password")} className={css.happy}>
                        <span>Forgot your Password?</span>
                    </button>
                </div>
                <br />
                <div className="justify-center">
                    <button type="button" disabled={disabled} onClick={() => props.setState("register")} className={css.happy}>
                        <span>Create a new Account</span>
                    </button>
                </div>
            </div>
        </>
    );
}

function RegisterCard(props) {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [disabled, setDisabled] = useState(false);

    async function register(e) {
        e.preventDefault();

        if (!name) return e.target[0].focus();
        if (!email) return e.target[1].focus();
        if (!password) return e.target[2].focus();

        setNameError("");
        setEmailError("");
        setPasswordError("");

        setDisabled(true);

        const auth = await registerWithEmailAndPassword(name, email, password);
        const error = filterErr(auth);
        if (error.type === 'name') {
            setNameError(error.code);
            e.target[0].focus();
        } else if (error.type === 'email') {
            setEmailError(error.code);
            e.target[1].focus();
        } else if (error.type === 'password') {
            setPasswordError(error.code);
            e.target[2].focus();
        } else if (error.type === 'toast') {
            toast.error(error.code);
            e.target[0].focus();
        }
        setDisabled(false);
    }

    async function google(e) {
        setDisabled(true);
        const post = toast.loading("Waiting for Google authentication...");
        const auth = await signInWithGoogle();
        const error = filterErr(auth);
        if (auth) {
            toast.error(error.code, {id: post});
        } else {
            toast.success("Google Authentication completed.", {id: post});
        }
        setDisabled(false);
    }
    return (
        <>
            <div className={css.content}>
                <div className={css.header}>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </div>
                </div>
                <form action="" onSubmit={register} className={css.form}>
                    <Input
                        type="text"
                        label="Full Name"
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                        error={nameError || ""}
                        required={true}
                    />
                    <Input
                        type="email"
                        label="Email Address"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError || ""}
                        required={true}
                    />
                    <Input
                        type="password"
                        label="Password"
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError || ""}
                        required={true}
                    />
                    <div className="justify-center">
                        <button type="submit" className={css.button} disabled={disabled}>Sign up</button>
                    </div>
                </form>
                <div className="justify-center">
                    <button type="button" className={css.happy} disabled={disabled} onClick={google}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={css.google}>
                            <g>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>
            </div>
            <div className={css.content}>
                <div className="justify-center">
                    <button type="button" disabled={disabled} onClick={() => props.setState("login")} className={css.happy}>
                        <span>Already have an Account? Sign in</span>
                    </button>
                </div>
            </div>
        </>
    );
}

function PasswordCard(props) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [disabled, setDisabled] = useState(false);

    async function reset(e) {
        e.preventDefault();

        if (!email) return e.target[0].focus();

        setEmailError("");

        setDisabled(true);

        const auth = await sendPasswordReset(email);
        if (auth === true) return (toast.success("Password reset link sent successfully.") && props.setState("login"));
        const error = filterErr(auth);
        if (error.type === 'email') {
            setEmailError(error.code);
            e.target[0].focus();
        } else if (error.type === 'toast') {
            toast.error(error.code);
            e.target[0].focus();
        }
        setDisabled(false);
    }
    return (
        <>
            <div className={css.content}>
                <div className={css.header}>
                    <div className={css.symbol}>
                        <img className={css.logo} src="/logo192.png" alt="" />
                        <span className={css.text}>Task Manager</span>
                    </div>
                </div>
                <form action="" onSubmit={reset} className={css.form}>
                    <Input
                        type="email"
                        label="Email Address"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError || ""}
                        required={true}
                    />
                    <div className="justify-center">
                        <button type="submit" disabled={disabled} className={css.button}>Send Password Reset Link</button>
                    </div>
                    <p className={css.comment}>Use Google authentication for Goole users.</p>
                </form>
            </div>
            <div className={css.content}>
                <div className="justify-center">
                    <button type="button" disabled={disabled} onClick={() => props.setState("login")} className={css.happy}>
                        <span>Back to Sign in</span>
                    </button>
                </div>
            </div>
        </>
    );
}