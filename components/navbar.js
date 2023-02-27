import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import Container from "@components/container";
import Link from "next/link";
import Image from "next/image";
import GetImage from "@utils/getImage";
import { AiOutlineClose } from "react-icons/ai"
import { useSearchContext } from "context/searchContext";

export default function Navbar(props) {
  const leftmenu = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Categories",
      href: "/categories"
    },
    {
      label: "About",
      href: "/about"
    },
  ];

  const rightmenu = [
    {
      label: "Archive",
      href: "/archive"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { searchQuery, setSearchQuery } = useSearchContext()

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap z-50">
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {leftmenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a className="px-5 py-2 text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a className="w-48 dark:hidden">
                      {props.logo ? (
                        <Image
                          {...GetImage(props.logo)}
                          alt="Logo"
                          sizes="(max-width: 640px) 100vw, 200px"
                          priority={true}
                        />
                      ) : (
                        <span className="block text-center">
                          Stablo
                        </span>
                      )}
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="hidden w-48 dark:block">
                      {props.logoalt ? (
                        <Image
                          {...GetImage(props.logoalt)}
                          alt="Logo"
                          sizes="(max-width: 640px) 100vw, 200px"
                          priority={true}
                        />
                      ) : (
                        <span className="block text-center">
                          Stablo
                        </span>
                      )}
                    </a>
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                  {rightmenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className="px-5 py-2 text-lg font-medium text-gray-600 dark:text-gray-400 dark:hover:text-blue-500 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        <span> {item.label}</span>
                        {item.badge && (
                          <span className="bg-blue-100 text-blue-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded dark:bg-cyan-200 dark:text-blue-800 ">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </Link>
                  ))}
                  { isSearchOpen ?
                    <div className="relative flex flex-row items-center">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search" 
                          name="q" 
                          id="q" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value) }
                          className="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                        />
                        <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                      </div>
                      
                      <AiOutlineClose size={16} className='text-gray-600 dark:text-gray-400 ml-2 cursor-pointer' onClick={() => setIsSearchOpen(false)} />
                    </div> :
                    <button
                      className="px-5 py-2 text-lg font-medium text-gray-600 dark:text-gray-400 dark:hover:text-blue-500 hover:text-blue-500"
                      onClick={() => setIsSearchOpen(true) }
                    >
                      <span>Search</span>
                    </button>
                  }
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  { mobilemenu.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <a
                        className="px-5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""} >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  { isSearchOpen ?
                    <div className="relative flex flex-row items-center">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Search" 
                          name="q" 
                          id="q" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value) }
                          className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white"
                        />
                        <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                      </div>
                      
                      <AiOutlineClose size={16} className='text-gray-600 dark:text-gray-400 ml-2 cursor-pointer' onClick={() => setIsSearchOpen(false)} />
                    </div> :
                    <button
                      className="px-5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500"
                      onClick={() => setIsSearchOpen(true) }
                    >
                      <span>Search</span>
                    </button>
                  }
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}
