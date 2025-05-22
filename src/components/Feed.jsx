import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constants"
import UserCard from "./UserCard"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"

const Feed = () => {
    const feedData = useSelector(store => store.feed);
    const dispatch = useDispatch();
    
    const getFeed = async () => {
        if (feedData) return;
        try {
            const feed = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true
            });
            dispatch(addFeed(feed?.data?.data));
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return (
        feedData &&
        <div className="flex justify-center my-20"><UserCard user={feedData[0]} /></div>
    )
}

export default Feed