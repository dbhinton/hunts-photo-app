import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './LayoutStyles.css'

export default function Layout() {
    return (
        <>
        <div>
            <Header />
            <main className='py-3'>
            <Outlet className="mt-4"/>
            </main>
            

            <Footer />

 
        </div>
        </>
    )
}
