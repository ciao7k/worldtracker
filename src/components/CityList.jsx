import { useState, useMemo } from "react";
import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading } = useCities();
  const [selectedYear, setSelectedYear] = useState("all");

  // 获取所有可用的年份
  const availableYears = useMemo(() => {
    const years = new Set(
      cities.map((city) => new Date(city.startDate).getFullYear())
    );
    return ["all", ...Array.from(years).sort((a, b) => b - a)];
  }, [cities]);

  // 根据选择的年份过滤城市
  const filteredCities = useMemo(() => {
    if (selectedYear === "all") return cities;
    return cities.filter((city) => {
      const cityYear = new Date(city.startDate).getFullYear();
      return cityYear.toString() === selectedYear;
    });
  }, [cities, selectedYear]);

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="添加您的第一个城市" />;

  return (
    <>
      <div className={styles.filterContainer}>
        <label htmlFor="yearSelect">选择年份：</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className={styles.yearSelect}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year === "all" ? "所有年份" : year}
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.cityList}>
        {filteredCities.map((city) => (
          <CityItem city={city} key={city.id} />
        ))}
      </ul>

      {filteredCities.length === 0 && (
        <Message message={`${selectedYear}年没有旅行记录`} />
      )}
    </>
  );
}

export default CityList;
