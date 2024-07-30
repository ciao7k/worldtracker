// Form.jsx

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("点击城市位置 ");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !startDate) return;

    const newCity = {
      cityName,
      country,
      emoji,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      notes,
      position: { lat, lng },
      image,
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="点击地图上任意位置" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">城市名称</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">访问日期范围</label>
        <DatePicker
          id="date"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            const [start, end] = update;
            setStartDate(start);
            setEndDate(end);
          }}
          isClearable={true}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">旅行笔记</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="image">上传图片</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img src={image} alt="Preview" className={styles.imagePreview} />
        )}
      </div>

      <div className={styles.buttons}>
        <Button type="primary">添加</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
