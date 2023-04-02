import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Table from "./Table";
import App from "../App";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />
}

function Router(props) {
    return(
        <Routes>
            <Route path="/" element={<App {...props}/>} />
            <Route path="/Rtable" element={<Table {...props} />} />
            <Route path="/edit/:id" element={<App {...props}/>} />
        </Routes>
    )
}
export default withParams(Router);