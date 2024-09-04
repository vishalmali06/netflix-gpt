import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGIN_BG } from '../utils/constatnt';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(store => store.user);


    const handleSignOut = () => {
        signOut(auth).then(() => { }).catch((error) => {
            navigate("/error")
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    }
                    ));
                navigate("/browse");
            } else {
                dispatch(removeUser({}));
                navigate("/");
            }
        });
        // Unsubscribe When Conponet Unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img
                className='w-44'
                src={LOGIN_BG}
                alt="logo" />

            {user && (
                <div className='flex p-2'>
                    <img
                        className='w-12 h-12'
                        alt='usericon'
                        src={user?.photoURL}
                    />
                    <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>

                </div>
            )}
        </div>
    )
}

export default Header