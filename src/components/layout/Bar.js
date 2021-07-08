import React, { useEffect, useContext } from 'react'
import AuthContext from "../../context/authentication/authContext";

const Bar = () => {
    const { user, userAuthenticated, logout } = useContext(AuthContext)

    useEffect(() => {
        userAuthenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <header className="app-header">
            {user && <p className="nombre-usuario">Hola, <span>{user.name}</span></p>}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank logout"
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </nav>
        </header>
    )
}

export default Bar
