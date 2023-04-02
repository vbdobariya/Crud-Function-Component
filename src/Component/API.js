import React from 'react'
import { useEffect } from 'react'

const API = () => {

    const getUsers = async () => {
        const response = await fetch('https://reqres.in/api/users?page=2')
        const data = await response.json();
        console.log(data);
    }

useEffect(() => {
    getUsers()
},[])

  return (
    <div>

    </div>
  )
}

export default API;