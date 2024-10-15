import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/user/getUsers", { withCredentials: true });
        setAllUsers(res.data.data); 
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred while fetching users.");
      } finally {
        setLoading(false); 
      }
    };

    getData();
  }, []);

  return { allUsers, loading, error }; 
};

export default useGetAllUsers;
