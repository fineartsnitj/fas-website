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
                <p>{member?.role1?.roleName} - {member?.role1?.team} </p>
                <p>{member?.role2?.roleName} - {member?.role2?.team} </p>
                <p>{member?.role3?.roleName} - {member?.role3?.team} </p>
            </div>
        </div>
    )
}

export default MemberCard