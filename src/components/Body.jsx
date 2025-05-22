import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    const fetchUser = async () => {
        if(user) return;
        try {
            const loggedInUser = await axios.get(BASE_URL + "/profile", { withCredentials: true });
            dispatch(addUser(loggedInUser.data));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login")
            }
            console.error(err)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body