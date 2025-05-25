import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

    const { _id, firstName, lastName, about, age, gender, imageUrl } = user || {};
    const dispatch = useDispatch()

    const sendRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeFeed(_id));
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm p-10">
            <figure>
                <img
                    src={imageUrl}
                    alt="Image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age ? `${age} years old` : "Age not specified"}</p>
                <p>{gender || "Gender not specified"}</p>
                <p>{about}</p>
                <div className="card-actions justify-center mt-5">
                    <button className="btn btn-primary" onClick={() => sendRequest("ignored", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => sendRequest("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;