import axios from "axios";

const fetchUserData = async (id) => {
  try {
    const response = await axios.get(
      `https://event-aura-yt4akn7xpq-uc.a.run.app/api/users/${id}`
    );
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return error;
  }
};

export { fetchUserData };
