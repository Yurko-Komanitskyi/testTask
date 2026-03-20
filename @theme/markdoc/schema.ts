import { Schema } from "@markdoc/markdoc";

export const tags: Record<string, Schema> = {
  weather: {
    render: "Weather",
    description: "Displays current weather for a given city using Open-Meteo.",
    selfClosing: true,
    attributes: {
      city: {
        type: String,
        required: true,
        description: 'City name to fetch weather for (e.g. "Kyiv", "London")',
      },
    },
  },
};
