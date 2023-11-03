'use client';

import { initializeApp } from 'firebase/app';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { doc, getDoc, setDoc, collection, getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { FIREBASE_API } from 'src/config-global';

import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

export const firebaseApp = initializeApp(FIREBASE_API);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const STORAGE = getStorage(firebaseApp);

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
};

type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    try {
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          if (user.emailVerified) {
            const userProfile = doc(DB, 'users', user.uid);

            const docSnap = await getDoc(userProfile);

            const profile = docSnap.data();

            dispatch({
              type: Types.INITIAL,
              payload: {
                user: {
                  ...user,
                  ...profile,
                  id: user.uid,
                  role: 'user',
                },
              },
            });
          } else {
            dispatch({
              type: Types.INITIAL,
              payload: {
                user: null,
              },
            });
          }
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: null,
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(AUTH, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(AUTH, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const userProfile = doc(collection(DB, 'users'), user?.uid);

        setDoc(userProfile, {
          uid: user?.uid,
          email: user.email,
          displayName: '',
          birthdate: '',
          profileImage: '',
          address: {
            address: '',
            state: '',
            city: '',
            zipCode: 0,
          },
          plan: {
            id: 0,
            name: '',
            date: null,
          },
          authMethod: 'Google',
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const loginWithGithub = useCallback(async () => {
    const provider = new GithubAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  const loginWithTwitter = useCallback(async () => {
    const provider = new TwitterAuthProvider();

    await signInWithPopup(AUTH, provider);
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const newUser = await createUserWithEmailAndPassword(AUTH, email, password);

      await sendEmailVerification(newUser.user);

      const userProfile = doc(collection(DB, 'users'), newUser.user?.uid);

      await setDoc(userProfile, {
        uid: newUser.user?.uid,
        email,
        displayName: `${firstName} ${lastName}`,
        birthdate: '',
        profileImage: '',
        address: {
          address: '',
          state: '',
          city: '',
          zipCode: 0,
        },
        plan: {
          id: 0,
          name: '',
          date: null,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut(AUTH);
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(AUTH, email);
  }, []);

  // UPDATE USER
  const updateUser = useCallback(async (user: any) => {
    const userProfile = doc(collection(DB, 'users'), user?.uid);

    setDoc(userProfile, {
      email: user?.email,
      displayName: user?.displayName,
      profileImage: user?.profileImage || '',
      birthdate: user?.birthdate,
      address: user?.address,
      plan: user?.plan,
      favourites: user?.favourites || [],
      history: user?.history || [],
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const getFavourites = async (user: any): Promise<any | null> => {
    const userProfile = doc(collection(DB, 'users'), user?.uid);
    try {
      const docSnapshot = await getDoc(userProfile);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      return null;
    }
  };

  const addToFavourites = useCallback(async (user: any) => {
    const userProfile = doc(collection(DB, 'users'), user?.uid);

    setDoc(userProfile, {
      email: user?.email,
      displayName: user?.displayName,
      profileImage: user?.profileImage || '',
      birthdate: user?.birthdate,
      address: user?.address,
      plan: user?.plan,
      favourites: user?.favourites || [],
      history: user?.history || [],
    })
      .then(() => {})
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const addToHistory = useCallback(async (user: any) => {
    const userProfile = doc(collection(DB, 'users'), user?.uid);

    setDoc(userProfile, {
      email: user?.email,
      displayName: user?.displayName,
      profileImage: user?.profileImage || '',
      birthdate: user?.birthdate,
      address: user?.address,
      plan: user?.plan,
      favourites: user?.favourites || [],
      history: user?.history || [],
    })
      .then(() => {})
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const uploadFileToStorage = useCallback(async (file: any, user: any) => {
    try {
      const storagePath = `profileImages/${user?.uid}/${file.name}`;
      const storageRef = ref(STORAGE, storagePath);

      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file to storage:', error);
      throw error;
    }
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user?.emailVerified ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'firebase',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      updateUser,
      getFavourites,
      addToFavourites,
      addToHistory,
      forgotPassword,
      loginWithGoogle,
      loginWithGithub,
      loginWithTwitter,
      uploadFileToStorage,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      updateUser,
      getFavourites,
      forgotPassword,
      loginWithGithub,
      loginWithGoogle,
      loginWithTwitter,
      addToFavourites,
      addToHistory,
      uploadFileToStorage,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
