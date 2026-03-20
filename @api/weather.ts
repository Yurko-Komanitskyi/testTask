import type { ApiFunctionsContext } from "@redocly/config";

async function getCoordinates(
  city: string,
): Promise<{ lat: number; lon: number; name: string }> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
  );
  const data = await res.json();

  if (!data.results?.length) {
    throw new Error(`City not found: ${city}`);
  }

  const { latitude, longitude, name } = data.results[0];
  return { lat: latitude, lon: longitude, name };
}

export default async function handler(
  req: Request,
  context: ApiFunctionsContext,
) {
  const city = req.query.city;

  if (!city) {
    return context
      .status(400)
      .json({ error: "Missing required query param: city" });
  }

  const secretKey = process.env.WEATHER_SECRET_KEY;

  if (!secretKey) {
    return context
      .status(500)
      .json({ error: "WEATHER_SECRET_KEY is not configured" });
  }

  try {
    const { lat, lon, name } = await getCoordinates(city as string);

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
        `&wind_speed_unit=ms&timezone=auto`,
      {
        headers: {
          "x-secret-key": secretKey,
        },
      },
    );

    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo error: ${weatherRes.status}`);
    }

    const weather = await weatherRes.json();

    return context.status(200).json({
      city: name,
      latitude: lat,
      longitude: lon,
      current: weather.current,
      current_units: weather.current_units,
    });
  } catch (err: any) {
    return context.status(500).json({ error: err.message ?? "Unknown error" });
  }
}
