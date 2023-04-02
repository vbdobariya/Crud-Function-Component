import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function Axios() {

useEffect(() =>{
    axios.get("https://reqres.in/api/users?delay=3")
    .then((response) =>
    console.log(response.data)
    );
},[])

  return (
    <div>
      <h1>hello Axios</h1>
    </div>
  )
}

export default Axios;
