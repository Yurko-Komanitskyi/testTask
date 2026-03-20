import XUpdatedAt from "./decorators/x-updatedAt.js";

export default function sparklePlugin() {
  return {
    id: "sparkle",
    decorators: {
      oas3: {
        "x-updatedAt": XUpdatedAt,
      },
    },
  };
}
