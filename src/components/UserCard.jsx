const UserCard = ({ user }) => {

    const { firstName, lastName, about, age, gender, imageUrl } = user || {};
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
                    <button className="btn btn-primary">Ignore</button>
                     <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;