import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">到访城市</NavLink>
        </li>
        <li>
          <NavLink to="countries">到访国家</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
