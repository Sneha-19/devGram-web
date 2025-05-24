import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(store => store.connections)

    const getConnections = async () => {
        const connections = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
        dispatch(addConnection(connections?.data?.data))
    }

    useEffect(() => {
        getConnections()
    }, [])

    if(!connections || connections.length == 0) return <div className="text-center my-10">No Connection Found!</div>

    return (
        <div className="text-center my-10">
            <h1 className="text-2xl font-bold">Connections</h1>
            <div>
                {connections.map((connection) => {
                    return (
                        <div key={connection._id} className="flex  m-5 p-5 w-1/2 mx-auto rounded-xl bg-base-300">
                            <img className="h-20 " src={connection.imageUrl} />
                            <div className="text-left mx-3">
                                <div>{connection.firstName + " " + connection.lastName}</div>
                                <div>{connection.about}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections;