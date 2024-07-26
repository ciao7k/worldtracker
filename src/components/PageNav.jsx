import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">价格</NavLink>
        </li>
        <li>
          <NavLink to="/product">产品</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            登录
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
