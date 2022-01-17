import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "./containers/Register/Register";
import PackageRegister from "./containers/PackageRegister/PackageRegister";
import Login from "./containers/Login/Login";
import Layout from "./components/UI/Layout/Layout";
import AboutUs from "./containers/AboutUs/AboutUs";
import Contacts from "./containers/Contacts/Contacts";
import Rules from "./containers/Rules/Rules";
import HowItWorks from "./containers/HowItWorks/HowItWorks";
import News from "./containers/News/News";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='/package-register' element={<PackageRegister/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' exact element={<Register/>}/>
                <Route path='/rules' element={<Rules/>}/>
                <Route path='/about_us' element={<AboutUs/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/how_it_works' element={<HowItWorks/>}/>
                <Route path='/news' element={<News/>}/>
            </Routes>
        </Layout>
    );
};

export default App;