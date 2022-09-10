import React, { useEffect, useRef } from 'react';
import { GoogleButton } from 'react-google-button';
import { useNavigate } from 'react-router-dom';

// Required scripts
import { useAuthContext } from '../background/auth';

const LoginView = () => {
  const { signInWithGoogle, user } = useAuthContext();
  const navigate = useNavigate();
  const initialRun = useRef(true);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialRun.current) {
      initialRun.current = false;
    } else if (user != null) {
      navigate(-1);
    }
  }, [user]);

  return (
    <div>
      <h1 className='text-center text-3xl font-bold py-8'>My Chat App :)</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default LoginView;