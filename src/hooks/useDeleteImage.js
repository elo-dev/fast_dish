import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../firebase'

const useDeleteImage = (uploadedImage) => {
  const deleteImage = () => {
    const deleteRef = ref(storage, uploadedImage)

    return deleteObject(deleteRef)
  }

  return {
    deleteImage,
  }
}

export default useDeleteImage
