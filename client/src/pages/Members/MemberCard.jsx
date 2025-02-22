import React from 'react'

const MemberCard = ({member}) => {
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={member?.profileImage}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{member?.membername}</h2>
                <p>{member?.roles?.at(0)?.roleName} - {member?.roles?.at(0)?.team} </p>
                <p>{member?.roles?.at(1)?.roleName} - {member?.roles?.at(1)?.team} </p>
            </div>
        </div>
    )
}

export default MemberCard