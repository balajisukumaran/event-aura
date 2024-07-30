import axios from "axios";
const userId = localStorage.getItem("userId");

const getAllEvents = async() => {
  let res = await axios.get(`http://localhost:8080/api/events/user`, {
    params: {
      userId
    }
  });
  return res.data;
};

export {
  getAllEvents,
};
