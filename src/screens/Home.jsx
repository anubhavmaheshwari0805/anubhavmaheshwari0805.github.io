import { useState } from "react";
import './../styles/HomeScreenStyles.css';
import { pages } from "../utils/Constants";
import logo from "./../assets/HALTitleLogo.png";
import Page0 from '../components/AGVStatus';
import Page1 from './../components/Page1';
import Page2 from './../components/Page2';
import Page3 from './../components/Page3';
import Page4 from './../components/Page4';
import Page5 from './../components/Page5';
import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import AGVStatus from "../components/AGVStatus";

function Home() {
    const allPages = pages;
    const [selectedPage, setSelectedPage] = useState(0);
    const changeSelected = (id) => {
        setSelectedPage(id);
    }
    return (
        <div className="home">
            <div className="headerBar">
                <div className="topBarTitle">
                    <img src={logo} className="globeLogo"/>
                    <h2>AGV DashBoard</h2>
                </div>
                <div className="tabs"></div>
                <div className="profile">
                    <h2>AGV Admin</h2>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>AM</Avatar>
                </div>
            </div>
            <div className="body">
                <div className="sideBar">
                    {
                        allPages.map((element, id) => (
                            <button className="sideBarButton" key={id} onClick={()=>changeSelected(id)}>{element}</button>
                        ))
                    }
                </div>
                <div className="contentDiv">
                    { selectedPage === 0 && <AGVStatus /> }
                </div>
            </div>
        </div>
    );
}

export default Home;