import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          旅行。
          <br />
          用世界足迹记录与分享。
        </h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </h2>
        <Link to="/login" className="cta">
          开始记录你的旅行足迹
        </Link>
      </section>
    </main>
  );
}
