import { getStorage, ref } from 'firebase/storage'

const useFirebaseStorage = () => {
  const storage = getStorage()
  const storageRef = ref(storage, 'Events')
}

export default useFirebaseStorage
