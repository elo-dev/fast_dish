import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ref, update } from 'firebase/database'
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../../firebase'

import { Button, Input, Layout, Progress, Row, Typography, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import {
  setAboutMe,
  setAvatar,
  setUsername,
} from '../../redux/toolkitSlice/userSlice'

import { useAuth } from '../../hooks/useAuth'
import useUploadImage from '../../hooks/useUploadImage'

import { getBase64 } from '../../utils/getBase64'

import style from './Settings.module.scss'

const { Text } = Typography

const Settings = () => {
  const auth = getAuth()
  const { userAuth } = useAuth()
  const dispatch = useDispatch()

  const { uploadImage, uploadedImage, percentLoading, isUploadLoading } =
    useUploadImage()

  useEffect(() => {
    if (uploadedImage) {
      updateProfile(auth.currentUser, { photoURL: uploadedImage })
      dispatch(setAvatar({ avatar: uploadedImage }))
      setImageUrl(null)
    }
  }, [uploadedImage])

  const inputs = [
    {
      id: 1,
      label: 'Display Name',
      name: 'username',
      type: 'text',
      placeholder: 'Edit name',
      text: userAuth.displayName,
    },
    {
      id: 2,
      label: 'Email',
      name: 'email',
      type: 'text',
      placeholder: 'Edit email',
      text: userAuth.email,
    },
    {
      id: 3,
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Change password',
      text: '********',
    },
    {
      id: 4,
      label: 'About me',
      name: 'aboutMe',
      type: 'text',
      placeholder: 'About me',
      text: 'About me',
    },
  ]

  const [values, setValues] = useState({
    username: userAuth.displayName || '',
    email: '',
    password: '',
    aboutMe: '',
  })

  const [isEditFields, setIsEditFields] = useState({
    username: false,
    email: false,
    password: false,
    aboutMe: false,
  })

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState('')
  const [errorField, setErrorField] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = async (info) => {
    try {
      setLoading(true)
      setError('')

      const url = await getBase64(info.file)

      setLoading(false)
      setImageUrl(url)
      uploadImage(info.file)
    } catch (error) {
      setError(error)
    }
  }

  const changeSetting = (name) => {
    if (name === 'username') {
      changeUsername(name)
    } else if (name === 'email') {
      changeEmail(name)
    } else if (name === 'password') {
      changePassword(name)
    } else if (name === 'aboutMe') {
      changeAboutMe(name)
    }
  }

  const changeUsername = async (name) => {
    if (values.username.length > 2) {
      try {
        setError('')
        setErrorField({
          ...errorField,
          [name]: '',
        })
        await updateProfile(auth.currentUser, {
          displayName: values.username,
        })
        dispatch(setUsername({ username: values.username }))
        setIsEditFields({ ...isEditFields, [name]: !name })
      } catch (error) {
        setError(error)
      }
    } else {
      setErrorField({
        ...errorField,
        [name]: 'The username is shorter than 2 characters',
      })
    }
  }

  const changePassword = async (name) => {
    if (values.password.length > 5) {
      try {
        setError('')
        setErrorField({
          ...errorField,
          [name]: '',
        })
        await updatePassword(auth.currentUser, values.password)
        setIsEditFields({ ...isEditFields, [name]: !name })
      } catch (error) {
        setError(error)
      }
    } else {
      setErrorField({
        ...errorField,
        [name]: 'The password is shorter than 6 characters',
      })
    }
  }

  const changeEmail = async (name) => {
    let regex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}'
    if (values.email.match(regex)) {
      try {
        setErrorField({
          ...errorField,
          [name]: '',
        })
        setError('')
        await updateEmail(auth.currentUser, values.email)
        setIsEditFields({ ...isEditFields, [name]: !name })
      } catch (error) {
        setError(error)
      }
    } else {
      setErrorField({
        ...errorField,
        [name]: 'The entered email is not correct',
      })
    }
  }

  const changeAboutMe = async (name) => {
    try {
      setErrorField({
        ...errorField,
        [name]: '',
      })
      setError('')
      await update(ref(db, `user/${auth.currentUser.uid}`), {
        aboutMe: values.aboutMe,
      })
      dispatch(setAboutMe({ aboutMe: values.aboutMe }))
      setIsEditFields({ ...isEditFields, [name]: !name })
    } catch (error) {
      setError(error)
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const changeIsEditField = (name) => {
    setIsEditFields({ ...isEditFields, [name]: !!name })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <Layout className={style.settings}>
      <Row>
        <Upload
          name="avatar"
          listType="picture-card"
          className={style.upload}
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" className={style.avatar} />
          ) : (
            uploadButton
          )}
        </Upload>
        {isUploadLoading && <Progress percent={percentLoading} size="small" />}
      </Row>

      {inputs.map((input) => (
        <Row
          align="middle"
          justify="space-between"
          className={style.info}
          key={input.id}
        >
          <div className={style.info__wrapper}>
            <label htmlFor={input.name} className={style.info__label}>
              {input.label}
            </label>
            {isEditFields[input.name] ? (
              <Input
                id={input.name}
                name={input.name}
                value={values[input.name]}
                onChange={onChange}
                placeholder={input.placeholder}
                type={input.type}
                autoFocus
              />
            ) : (
              <Text className={style.info__name}>{input.text}</Text>
            )}
            {errorField[input.name] && (
              <p className={style.error}>{errorField[input.name]}</p>
            )}
          </div>
          {isEditFields[input.name] ? (
            <Button
              className={style.btn_edit}
              onClick={() => changeSetting(input.name)}
            >
              Save
            </Button>
          ) : (
            <Button
              className={style.btn_edit}
              onClick={() => changeIsEditField(input.name)}
            >
              Edit
            </Button>
          )}
        </Row>
      ))}
    </Layout>
  )
}

export default Settings
