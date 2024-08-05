import axios from "axios";

const getAllEvents = async (organizerId) => {
  let res = await axios.get(`http://localhost:8080/api/events/user`, {
    params: {
      userId: organizerId,
    },
  });
  console.log(res);
};

export { getAllEvents };
