import { useState } from 'react'
// import { Outlet } from 'react-router-dom'
import Navber from './Navber'
import Header from './Header'

import { Outlet } from 'react-router'

const AdminLayout = () => {

    const [NavberOpen, setNavberOpen] = useState(true)

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Navber */}
            <Navber open={NavberOpen} onClose={() => setNavberOpen(false)} />

            {/* Mobile overlay */}
            {NavberOpen && (
                <div
                    className="fixed inset-0 z-20 bg-charcoal/40 lg:hidden"
                    onClick={() => setNavberOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header onMenuClick={() => setNavberOpen((prev) => !prev)} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )

}

export default AdminLayout