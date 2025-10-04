// src/controller/ApiController.ts
export const testApi = async (): Promise<boolean> => {
  try {
    const response = await fetch("https://city-of-gold-app-2.onrender.com/"); // root endpoint or /health
    
    if (!response.ok) throw new Error("API not reachable");

    return true;
  } catch (err) {
    console.error("API test failed:", err);
    return false;
  }
};