import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>城市</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>访问 {cityName} 的时间</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>旅行笔记</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>了解更多</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          在Wikipedia上了解更多关于 {cityName} 的信息 &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
