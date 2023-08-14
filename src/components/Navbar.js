// imports
import { NavLink } from "react-router-dom"
import Logo from "../assets/logo.jpg"

// styles
import './Navbar.css'

export default function Navbar() {
  return (
    <div className="navbar">
        <ul>
            <li className="logo">
                <img src={Logo} height="200px" alt="logo" />
            </li>
            <li><button>Concerts</button></li>
            <li><button>Theatre</button></li>
            <li><button>Science</button></li>
            <li><button>Ballet</button></li>
            <li><button>Newsletter</button></li>
        </ul>
    </div>
  )
}
