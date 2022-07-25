const PwInput = () => (
  <div className=" relative ">
    <label className="text-gray-700" htmlFor="with-indications">
      Password
      <span className="text-red-500 required-dot">
        *
      </span>
    </label>
    <input
      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      id="with-indications"
      name="password"
      placeholder="Password"
      type="text"
    />
    <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3">
      <div className="h-full col-span-3 bg-green-500 rounded" />
      <div className="h-full col-span-3 bg-green-500 rounded" />
      <div className="h-full col-span-3 bg-green-500 rounded" />
      <div className="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1" />
    </div>
    <div className="mt-2 text-green-500">
      Valid password
    </div>
  </div>
)

export default PwInput
