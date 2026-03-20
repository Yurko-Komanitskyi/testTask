import React, { useState } from "react";
import { useDebounce } from "../../../../utils/useDebounce";
import { useWeather } from "../model/useWeather";
import { describeWeather } from "../model/helpers";

interface Props {
  city: string;
}

export function Weather({ city: initialCity }: Props) {
  const [input, setInput] = useState(initialCity);
  const debouncedCity = useDebounce(input, 500);

  const { data, error, loading } = useWeather(debouncedCity);

  const { label, emoji } = data
    ? describeWeather(data.current.weather_code)
    : { label: "", emoji: "" };

  const isTyping = input !== debouncedCity;

  return (
    <div className="wx-card">
      <div className="wx-form">
        <span className="wx-search-icon">🔍</span>
        <input
          className="wx-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city…"
        />
        {(loading || isTyping) && <span className="wx-spinner" />}
      </div>

      {error && !loading && (
        <div className="wx-state wx-state--error">
          ⚠️ Could not load weather for <strong>{debouncedCity}</strong>
        </div>
      )}

      {data && !loading && !isTyping && (
        <>
          <div className="wx-header">
            <span className="wx-emoji">{emoji}</span>
            <div>
              <div className="wx-city">{data.city}</div>
              <div className="wx-condition">{label}</div>
            </div>
          </div>

          <div className="wx-temp">
            {Math.round(data.current.temperature_2m)}
            <span className="wx-unit">{data.current_units.temperature_2m}</span>
          </div>

          <div className="wx-stats">
            <div className="wx-stat">
              <span>💨</span>
              <span>
                {data.current.wind_speed_10m}{" "}
                {data.current_units.wind_speed_10m}
              </span>
            </div>
            <div className="wx-stat">
              <span>💧</span>
              <span>
                {data.current.relative_humidity_2m}
                {data.current_units.relative_humidity_2m}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
