import React from 'react'
import { NavLink } from 'react-router-dom'

const MemberCard = ({member}) => {
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img loading='lazy'
                    src={member?.profileImage}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <NavLink to={`${member.username}`} className="card-title hover:scale-110">{member?.membername}</NavLink>
                <p>{member?.role1?.roleName} - {member?.role1?.team} </p>
                <p>{member?.role2?.roleName} - {member?.role2?.team} </p>
                <p>{member?.role3?.roleName} - {member?.role3?.team} </p>
            </div>
        </div>
    )
}

export default MemberCard