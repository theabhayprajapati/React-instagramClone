import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadString, updateDoc } from 'firebase/storage'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { Fragment } from 'react/cjs/react.development'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { db, storage } from '../components/firebase'
function Modal() {
  const [open, setopen] = useRecoilState(modalState)
  const filepicker = useRef(null)
  const [SelectedFile, setSelectedFile] = useState(null)
  const captinref = useRef('')
  const { data: session } = useSession()
  const [loading, setloading] = useState(false)
  const uploadPost = async () => {
    if (loading) return
    setloading(true)
    //  todo: Create a post AND to firestore post colletion
    // todo: get the post id for the newlit create post
    // todo: upload the imahe to  firebase storahe with the post Id
    // todo: get a download url from fb storage and upload to orginal psot with url
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captinref.current.value,
      profileimage: session.user.image,
      timestamp: serverTimestamp(),
    })
    console.log('new post addef  with id ', docRef.id)

    // * uploading the image to the firestore
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    // * upladoing the file to firebae storing

    await uploadString(imageRef, SelectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      },
    )
    setopen(false)
    setloading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    {
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result)
      }
    }
  }
  return (
    <div>
      <Transition.Root show={open} as={Fragment} onClose={setopen}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                {/* this elmant is to trick the browser into centering the modal context */}
              </Dialog.Overlay>
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {SelectedFile ? (
                    <img
                      src={SelectedFile}
                      className="object-center cursor-pointer"
                      onClick={() => setSelectedFile(null)}
                      alt=""
                    />
                  ) : (
                    <>
                      <div
                        onClick={() => filepicker.current.click()}
                        className="mx-auto flex items-center justify-center h-12 w-12  rounded-full bg-red-100 cursor-pointer"
                      >
                        <CameraIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium
                      text-gray-900"
                      >
                        Upload a Photo
                      </Dialog.Title>
                      <div>
                        <input
                          type="file"
                          hidden
                          ref={filepicker}
                          onChange={addImageToPost}
                        />
                        <div className="mt-2">
                          <input
                            type="text"
                            ref={captinref}
                            className="border-none focus:ring-0 w-full text-center"
                            placeholder="Enter a caption...."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      onClick={uploadPost}
                      disabled={!SelectedFile}
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2  bg-red-400 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    >
                      {loading ? 'Uploading Post' : 'Upload Post'}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default Modal
