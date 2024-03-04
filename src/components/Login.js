import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  //we can use states too but we're using useRef to see what is there in the input box
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
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
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
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
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
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
            className="my-4 w-full rounded-lg bg-gray-700 p-4"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Adress"
          className="my-4 w-full rounded-lg bg-gray-700 p-4"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="my-4 w-full rounded-lg bg-gray-700 p-4"
        />
        <p className="px-2 text-lg font-bold text-red-500">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className="my-6 w-full rounded-lg bg-red-700 p-4"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer py-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Signup Now"
            : "Already registered Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
