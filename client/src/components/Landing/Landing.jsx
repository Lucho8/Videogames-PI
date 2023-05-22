import { NavLink } from "react-router-dom";
import Styles from './Landing.module.css';

const Landing = () => {
    return(
        <div className={Styles.background}>
            <h1>Mi APP de Juegitos</h1>
            <NavLink to="/home"><button>Vamos pal home mi loco</button></NavLink>
        </div>
    )
} 

export default Landing