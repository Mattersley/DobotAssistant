import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/initFirebase'

const useFirestoreFetcher = async (path: string) => {
  const getItemsFromDB = {}
  const querySnapshot = await getDocs(collection(db, path))
  querySnapshot.forEach((doc) => {
    const item = { [doc.id]: doc.data() }
    Object.assign(getItemsFromDB, item)
  })

  return getItemsFromDB
}

export default useFirestoreFetcher
