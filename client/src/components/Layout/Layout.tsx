import React from 'react'
import Navbar from '../NavBar/Navbar'


interface Props{
    children:React.ReactNode
}

const Layout:React.FC<Props>=(props)=>{
    return(
        <div>
            <Navbar/>
            <main>
            {props.children}
            </main>
        </div>
    )
}
export default Layout