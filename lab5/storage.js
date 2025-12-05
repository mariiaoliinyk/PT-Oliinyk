import { Storage } from "https://cdn.jsdelivr.net/npm/@ionic/storage@3.0.6/+esm";

(async () => {
  const storage = new Storage();
  await storage.create();
  window.appStorage = storage;
})();
