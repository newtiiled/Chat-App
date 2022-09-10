import React, { useContext, createContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Required scripts
import auth from './config';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOutGoogle = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      alert(error);
    });
  };

  useEffect(() => {
    const changeUser = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => {
      changeUser();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, logOutGoogle, user }}>
      { children }
    </AuthContext.Provider>
  );
};