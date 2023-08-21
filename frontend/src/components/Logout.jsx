import React, { useContext, useEffect } from 'react'
import context from '../Context/context'
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    const { user, logged, setLogged, setUser } = useContext(context)
    const navigate = useNavigate()
    useEffect(() => {
        async function logout() {

            const res = await fetch('http://localhost:3218/logout', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            const data = await res.json();
            console.log('data in logout:>> ', data);
            setUser({ name: null, id: null });
            setLogged(false)
            navigate('/')
            window.alert(data.loggedOut)
        }
        logout();
    }, [])

    return (
        <>

        </>
    )
}
