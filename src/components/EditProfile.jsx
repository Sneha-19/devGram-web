import { useState } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    // const { firstName, lastName, age, gender, imageUrl, about } = user;
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age || "")
    const [gender, setGender] = useState(user.gender)
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [about, setAbout] = useState(user.about)
    const [success, setSuccess] = useState(false)

    const handleEditProfile = async () => {
        try {
            const updatedUser = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, imageUrl, about }, { withCredentials: true });
            dispatch(addUser(updatedUser?.data?.data));
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            }, 3000)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="flex justify-center gap-5 my-10">
                <div className="flex justify-center">
                    <div className="card bg-base-300 p-7 shadow-sm text-center items-center">
                        <div className="card-body w-80">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-start">FirstName</legend>
                                <input type="text" placeholder="FirstName" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-start">LastName</legend>
                                <input type="text" placeholder="LastName" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-start">Age</legend>
                                <input type="number" placeholder="Age" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-start">Photo Url</legend>
                                <input type="text" placeholder="Photo Url" className="input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-start">About</legend>
                                <textarea className="textarea" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-start">Gender</legend>
                                <input type="text" className="input" placeholder="Gender" list="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                                <datalist id="gender" >
                                    <option value="Male"></option>
                                    <option value="Female"></option>
                                    <option value="Others"></option>
                                </datalist>
                            </fieldset>

                            <div className="card-actions justify-center mt-3">
                                <button className="btn btn-primary" onClick={() => handleEditProfile()}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender, imageUrl, about }} />
            </div>
            {success && <div className="toast toast-top toast-center">
                <div className="alert alert-info">
                    <span>Profile updated successfully!</span>
                </div>
            </div>}
        </>
    )
}

export default EditProfile