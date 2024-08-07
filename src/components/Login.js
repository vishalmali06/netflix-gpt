import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignForm, setIsSignForm] = useState(true)

    const toggleSignForm = () => {
        setIsSignForm(!isSignForm);
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/IN-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f1eb869_large.jpg"
                    alt="bg" />
            </div>
            <form className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignForm &&
                    <input
                        type="text"
                        placeholder="Full Name"
                        className='p-2 my-4 w-full bg-gray-700'
                    />
                }
                <input
                    type="text"
                    placeholder="Email Address"
                    className='p-2 my-4 w-full bg-gray-700'
                />
                <input
                    type="password"
                    placeholder="Password"
                    className='p-2 my-4 w-full bg-gray-700'
                />

                <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignForm ? 'Sign In' : 'Sign Up'}</button>

                <p className='py-4 cursor-pointer' onClick={toggleSignForm}>
                    {isSignForm ? 'New to Netflix? Sign Up Now' : 'Already registred Sign In Now'}
                </p>

            </form>
        </div>
    )
}

export default Login