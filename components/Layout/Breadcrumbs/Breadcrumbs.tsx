import { HomeIcon } from '@heroicons/react/solid'

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]

const Breadcrumbs = () => (
  <nav aria-label="Breadcrumb" className="flex bg-white h-5 mt-6">
    <ol className="flex items-center space-x-4">
      <li>
        <div>
          <a className="text-gray-400 hover:text-gray-500" href="/">
            <HomeIcon aria-hidden="true" className="flex-shrink-0 h-5 w-5" />
            <span className="sr-only">Home</span>
          </a>
        </div>
      </li>
      {pages.map((page) => (
        <li key={page.name}>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 h-5 w-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <a
              aria-current={page.current ? 'page' : undefined}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              href={page.href}
            >
              {page.name}
            </a>
          </div>
        </li>
      ))}
    </ol>
  </nav>
)

export default Breadcrumbs
