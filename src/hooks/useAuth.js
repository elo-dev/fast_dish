import { useState, useEffect, useContext, createContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { set, ref, onValue } from 'firebase/database'
import { db } from '../firebase'

import { setUser } from '../redux/toolkitSlice/userSlice'
import { useConnectUserMutation } from '../redux/services/connectUser'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [userAuth, setUserAuth] = useState(
    JSON.parse(localStorage.getItem('user') || null)
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const auth = getAuth()
  const [connectUser] = useConnectUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signin = async (email, password) => {
    try {
      setIsLoading(true)
      setError(false)
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      dispatch(
        setUser({
          id: user.uid,
          token: user.accessToken,
          username: user.displayName,
          email: user.email,
        })
      )
      setUserAuth(user)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  const signup = async (name, username, email, password) => {
    try {
      setIsLoading(true)
      setError(false)
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(user, {
        displayName: name,
      })

      const {
        username: spoonacularUsername,
        hash,
        spoonacularPassword,
      } = await connectUser({
        username,
        email,
      }).unwrap()

      await set(ref(db, `user/${user.uid}`), {
        spoonacularUsername,
        email,
        hash,
        spoonacularPassword,
      })

      dispatch(
        setUser({
          id: user.uid,
          token: user.accessToken,
          username: user.displayName,
          email: user.email,
        })
      )
      setUserAuth(user)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      const errorCode = error.code
      if (errorCode === 'auth/email-already-in-use') {
        setError(true)
      }
      setIsLoading(false)
    }
  }

  const googleSignIn = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)

      dispatch(
        setUser({
          id: user.uid,
          token: user.accessToken,
          username: user.displayName,
          email: user.email,
        })
      )

      setIsLoading(false)
      navigate('/')
    } catch (error) {
      setIsLoading(false)
    }
  }

  const signout = async () => {
    try {
      setIsLoading(true)
      setError(false)
      await signOut(auth)
      localStorage.removeItem('user')
      setUserAuth(null)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `user/${user.uid}`)

        const unsubscribe = onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            localStorage.setItem(
              'user',
              JSON.stringify({ ...snapshot.val(), ...user })
            )
            setUserAuth({ ...snapshot.val(), ...user })
          } else {
            setUserAuth(null)
          }
        })

        return () => unsubscribe()
      } else {
        setUserAuth(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    userAuth,
    isLoading,
    error,
    signin,
    signup,
    signout,
    googleSignIn,
  }
}
