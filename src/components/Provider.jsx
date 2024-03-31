import React, {createContext, useState} from 'react'

const Provider = (props) => {

  const [state, setState] = useState({doOnce : false, estado : false})

  return (
    <>
      <AppContext.Provider value={ [state, setState] }>
        {props.children}
      </AppContext.Provider>
    </>
  )
}

export default Provider
export const AppContext = createContext();