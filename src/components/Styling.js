import { FaBars } from "react-icons/fa"
import { NavLink as Link } from "react-router-dom"
import styled from "styled-components"

export const Nav = styled.nav`
    background: cadetblue;
    width: 10vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 4rem;`

export const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: left;
text-decoration: none;
padding: 0.5rem;
height: 5vh;
cursor: pointer;
&.active {
  color:black;
}
&:hover {
  color: black;
}`

export const Bars = styled(FaBars)`
  display: flex;
  flex-direction: column;
  align-items: left;
  color: #fff;
  height: 20vh;`

export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;`