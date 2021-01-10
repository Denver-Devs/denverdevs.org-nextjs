import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-full shadow-sm py-4 bg-white dark:bg-dark text-base font-semibold text-blue-900 dark:text-gray-100">
      <div className="flex container m-auto justify-between">
        <div>
          Denver Devs
        </div>

        <ul className="list-none flex">
          <li className="px-2"><Link href="/about"><a>About</a></Link></li>
          <li className="px-2"><a href="">Events</a></li>
          <li className="px-2">
            Rules & Guidelines

            <ul className="hidden">
              <li>Rules</li>
            </ul>
          </li>
          <li className="px-2"><a href="">Sign in</a></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
