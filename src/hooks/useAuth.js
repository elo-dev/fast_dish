import React, { useState, useEffect, useContext, createContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { set, child, get, getDatabase, ref } from 'firebase/database'

import { setUser } from '../redux-query/toolkitSlice/userSlice'
import { useConnectUserMutation } from '../redux-query/services/connectUser'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  updateProfile,
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
  const [userAuth, setUserAuth] = useState(() =>
    JSON.parse(localStorage.getItem('authUser') || null)
  )

  const db = getDatabase()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const auth = getAuth()
  const [connectUser, { isLoading: isLoadingConnect }] =
    useConnectUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signin = async (email, password) => {
    setIsLoading(true)
    setError(false)

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      const response = await get(child(ref(db), `user/${user.uid}`))

      localStorage.setItem('spoonacularAuth', JSON.stringify(response.val()))
      localStorage.setItem('authUser', JSON.stringify(user))

      dispatch(
        setUser({
          id: user.uid,
          token: user.accessToken,
          name: user.displayName,
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
    setIsLoading(true)
    setError(false)

    try {
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

      localStorage.setItem(
        'spoonacularAuth',
        JSON.stringify({
          spoonacularUsername,
          email,
          hash,
          spoonacularPassword,
        })
      )

      localStorage.setItem('authUser', JSON.stringify(user))
      dispatch(
        setUser({
          id: user.uid,
          token: user.accessToken,
          name: user.displayName,
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

  const signout = async () => {
    setIsLoading(true)
    setError(false)
    try {
      await signOut(auth)
      localStorage.removeItem('authUser')
      localStorage.removeItem('spoonacularAuth')
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
      const spoonacularAuth = JSON.parse(
        localStorage.getItem('spoonacularAuth')
      )
      if (user && spoonacularAuth) {
        localStorage.setItem('authUser', JSON.stringify(user))
        setUserAuth(user)
      } else {
        localStorage.removeItem('authUser')
        localStorage.removeItem('spoonacularAuth')
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
  }
}
