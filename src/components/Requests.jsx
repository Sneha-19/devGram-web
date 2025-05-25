import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests)

    const getRequests = async () => {
        try {
            const requests = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
            dispatch(addRequests(requests?.data?.data))
        } catch (err) {
            console.error(err)
        }
    }

    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true })
            dispatch(removeRequests(requestId))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getRequests()
    }, [])

    if (!requests || requests.length == 0) return <div className="text-center my-10">No Requests Found!</div>

    return (
        <div className="text-center my-10">
            <h1 className="text-2xl font-bold">Requests</h1>
            <div>
                {requests.map((request) => {
                    return (
                        <div key={request._id} className="flex  m-5 p-5 w-1/2 mx-auto rounded-xl bg-base-300">
                            <img className="h-20 " src={request.fromUserId.imageUrl} />
                            <div className="text-left mx-3">
                                <div>{request.fromUserId.firstName + " " + request.fromUserId.lastName}</div>
                                <div>{request.fromUserId.about}</div>
                            </div>
                            <div className="flex gap-3">
                                <button className="btn btn-primary" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Requests;