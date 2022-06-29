import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'

const useUploadImage = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadError, setUploadError] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [percentLoading, setPercentLoading] = useState(0)

  const uploadImage = (image) => {
    const storageRef = ref(storage, `images/${image?.uid}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    setIsUploadLoading(true)

    const next = (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )
      setPercentLoading(progress)
    }

    const error = (error) => {
      setUploadError(error)
    }

    const complete = () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUploadedImage(downloadURL)
        setIsUploadLoading(false)
      })
    }

    uploadTask.on('state_changed', next, error, complete)
  }

  return {
    uploadImage,
    uploadedImage,
    uploadError,
    percentLoading,
    isUploadLoading,
  }
}

export default useUploadImage
