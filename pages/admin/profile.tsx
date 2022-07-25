const Profile = () => (
  <>
    <div className="flex align-middle items-center pl-6 w-full h-16 border bg-gray-50 shadow-sm">
      <h1 className="text-xl text-donutPurple font-bold">Your Profile</h1>
    </div>

    <div className="m-5 md:mx-28 xl:mx-96">
      <form className="flex items-center space-x-6">
        <div className="shrink-0">
          <p className="text-donutPurple">Profile Picture</p>
          <div className="border border-t w-full border-donutPurple mt-2 mb-6" />
          <img
            alt="Current profile"
            className="h-16 w-16 object-cover rounded-full"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
          />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" type="file" />
        </label>
      </form>
    </div>
  </>
)

export default Profile
