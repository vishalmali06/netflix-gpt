import React, { useRef, useState } from 'react'
import Header from './Header'
import checkValidData from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignForm, setIsSignForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignForm = () => {
        setIsSignForm(!isSignForm);
    }

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        if (!isSignForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/26736191?v=4"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL
                            }
                            ));
                        navigate("/browse");
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/IN-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f1eb869_large.jpg"
                    alt="bg" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignForm &&
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className='p-2 my-4 w-full bg-gray-700'
                    />
                }
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className='p-2 my-4 w-full bg-gray-700'
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className='p-2 my-4 w-full bg-gray-700'
                />

                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignForm ? 'Sign In' : 'Sign Up'}</button>

                <p className='py-4 cursor-pointer' onClick={toggleSignForm}>
                    {isSignForm ? 'New to Netflix? Sign Up Now' : 'Already registred Sign In Now'}
                </p>

            </form>
        </div>
    )
}

export default Login