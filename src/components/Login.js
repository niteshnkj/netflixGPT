import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constant";
import toast from "react-hot-toast";
// import { ReCaptcha } from "react-recaptcha-v3";

// import googleicon from "../assets/googleicon.svg";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [showPassword, setShowPassword] = useState(false);
  // const recaptchaRef = useRef();

  // const handleRecaptchaChange = (value) => {
  //   console.log("ReCAPTCHA value:", value);
  // };

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const auth = getAuth();
  //we can use states too but we're using useRef to see what is there in the input box
  const name = useRef(null);
  const email = useRef("test@netflixclone.com");
  const password = useRef("Test@123");

  useEffect(() => {
    email.current.value = "test@netflixclone.com";
    password.current.value = "Test@123";
  }, []);
  //validation for name is still pending
  const handleButtonClick = () => {
    const message = checkValidData(
      // name.current.value,
      email.current.value,
      password.current.value,
    );
    setErrorMessage(message);
    //if any message is there then return else signin or signup
    if (message) return;
    //signin /signup logic

    if (!isSignInForm) {
      //sign up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              //fixing the signup avatar bug auth have current value instead of user
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
              toast.error(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          toast.error(errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("User Not found");
          toast.error("User Not Found");
        });
    }
  };
  // const login = () => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;

  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  // function to toggle between signin and signup form
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_URL}
          alt="backgroundImg"
          className="h-screen w-screen object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-0 right-0 mx-auto my-36 w-full rounded-lg bg-black bg-opacity-80 p-12 text-white md:w-3/12"
      >
        <h1 className="py-4  text-3xl font-bold ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Your Name"
            className="my-4 w-full rounded-lg bg-gray-700 p-4 focus:outline-none"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Adress"
          className="my-4 w-full rounded-lg bg-gray-700 p-4 focus:outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="my-4 w-full rounded-lg bg-gray-700 p-4 focus:outline-none"
        />
        <p className="px-2 text-lg font-bold text-red-500">{errorMessage}</p>
        {/* <button
          className="my-6 flex w-full justify-center gap-2 rounded-lg bg-white p-3"
          onClick={() => login()}
        >
          {" "}
          <span className="pl-2 pt-2">
            <img src={googleicon} alt="google_icon" />
          </span>
          <p className="w-full text-[#858585]">Sign in with Google</p>
        </button> */}

        <button
          onClick={handleButtonClick}
          className="my-6 w-full rounded-lg bg-red-700 p-4"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer py-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to NetflixGpt? Signup Now"
            : "Already registered? SignIn Now"}
        </p>
        {/* <ReCaptcha
          sitekey="6LezlQgqAAAAAMbeCM64Jfne4vE6JEIMsUouLF1-"
          ref={recaptchaRef}
          onChange={handleRecaptchaChange}
        /> */}
      </form>
    </div>
  );
};

export default Login;
