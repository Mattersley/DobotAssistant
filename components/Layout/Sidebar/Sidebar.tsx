import Menu from '../Menu/Menu'

const Sidebar = (): JSX.Element => (
  <aside
    className="md:z-20 fixed flex-none sidebar bg-white h-screen w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in rounded-br-full"
  >
    <div className="mt-10 sidebar-content py-6 w-full">
      <Menu />
    </div>
  </aside>
)
export default Sidebar
