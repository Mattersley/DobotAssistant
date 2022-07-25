const Settings = () => (
  <>
    <div className="fixed flex align-middle items-center px-6 w-full md:w-mainWidth h-16 border bg-gray-50 shadow-sm z-40">
      <p className="hidden sm:block mt-1 text-xl font-medium leading-6 text-donutPurple sm:mr-6">Settings </p>
    </div>
    <div className="mt-16 grid grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-2xl m-4 h-full p-6">
        <p className="text-center text-lg text-donutPurple">Data Source</p>
        <p>Wordpress/Shopify</p>
        <p>GraphQL or REST</p>
      </div>
      <div className="bg-white shadow rounded-2xl m-4 h-full p-6">
        <p className="text-center text-lg text-donutPurple">Inventory</p>
        <p>Expiry dates?</p>
        <p>Suppliers?</p>
        <p>Categories?</p>
      </div>
      <div className="bg-white shadow rounded-2xl m-4 h-full p-6">
        <p className="text-center text-lg text-donutPurple">Pack</p>
        <p>Label size</p>
        <p>Printer</p>
        <p>Printer media</p>
      </div>
      <div className="bg-white shadow rounded-2xl m-4 h-full p-6">
        <p className="text-center text-lg text-donutPurple">Appearance / Branding</p>
        <p>Logo</p>
        <p>Colour Scheme</p>
      </div>

    </div>
  </>
)

export default Settings
