import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';
// import logo from "public/images/Yash Store.png"
const Header = () => {
    return (
        <MainHeader>
            <NavLink>
                <img src="./images/logo-no-background.png" className="logo " style={{width: "100px", margin: "20px"}} alt="" />
            </NavLink>
        <Nav/>
        </MainHeader>
    )
}

const MainHeader = styled.header` 
 height: 7rem;
 background-color:${({ theme }) => theme.colors.bg};
 display:flex;
 justify-content: space-between;
 align-items: center;
 position: relative;
.logo{
 height: auto;
 object-fit: contain;


}
@media (max-width:${({ theme }) => theme.media.mobile}) { 
} 
`;
export default Header