import axios from "axios";
import { useEffect, useState } from "react";

interface userData{
    id: number;
    username: string;
    email: string;
    posts: {
        id: number;
        title: string;
        body: string;
        createdAt: string;
        userId: number;
    }[];
}

function useGetUserPosts(id: string) {
    const [ userData, setUserData ] = useState<userData>()

    const fetchUserData = async (id: string) => {
        const res = await axios({
            url:`http://localhost:8787/api/v1/user/getuser/${id}`,
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        setUserData(res.data.user);
      };
      useEffect(() => {
        fetchUserData(id);
      }, [id]);

    return userData
}

export default useGetUserPosts
