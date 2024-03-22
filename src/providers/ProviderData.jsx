import React, { createContext, useState, useContext } from 'react'

const ProviderData = ({children}) => {
  
  const [ urls, setUrls ] = useState([]);


  return (
    <UrlContext.Provider value={[urls, setUrls]}>
      {children}
    </UrlContext.Provider>
  )
}

export default ProviderData
export const UrlContext = createContext();