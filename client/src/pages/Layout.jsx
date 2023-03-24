import { Outlet, NavLink } from "react-router-dom";
import './Layout.css';
import NewsItem from "./NewsItem";
const Layout = () => {
    return (
      <div>
        <div className="menuContainer">
                <NewsItem/>            
                <ul className="menu-main">
                    <li> <NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/techNews">Technologies</NavLink></li>
                    <li><NavLink to="/businessNews">Business</NavLink></li>
                </ul>
        </div>
            
        
        <Outlet/> 


      </div>
    )
  };
  
  export default Layout;