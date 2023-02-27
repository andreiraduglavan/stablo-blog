import { useContext, useState, createContext } from "react";

const Context = createContext()

export const SearchContext = ({children}) => {
  const [searchQuery, setSearchQuery] = useState('')

  return(
    <Context.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </Context.Provider>
  )
}

export const useSearchContext = () => useContext(Context)