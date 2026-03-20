export default function XUpdatedAt() {
  console.log("adding updatedAt ... ");
  return {
    Operation: {
      leave(target) {
        if (target) {
          target["x-updatedAt"] = new Date().toISOString();
        }
      },
    },
  };
}
