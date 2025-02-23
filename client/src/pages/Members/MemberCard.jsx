import React from 'react'
import { NavLink } from 'react-router-dom'
import defaultProfile from '../../assets/default.jpg.png'

const MemberCard = ({member}) => {
    return (
        <div
      className="member-card relative w-full max-w-[280px] aspect-square rounded-xl 
                 overflow-hidden shadow-lg cursor-pointer transform-style-3d perspective-1000 mx-auto group"
    >
      {/* Profile Image */}
      <img
        loading="lazy"
        src={member?.profileImage === "default.jpg" ? defaultProfile : member?.profileImage}
        alt="Profile Pic"
        className="member-image w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* Hover Overlay with Smoky Slide-Up Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 
                   flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 
                   transition-all duration-700 ease-in-out transform translate-y-full group-hover:translate-y-0 p-4"
      >
        <NavLink
          to={`${member.username}`}
          className="member-name text-lg font-bold mb-2 opacity-0 translate-y-4 group-hover:opacity-100 
                     group-hover:translate-y-0 transition-all duration-500"
        >
          {member?.membername}
        </NavLink>
        <p className="member-year text-sm text-gray-300 opacity-0 translate-y-4 
                     group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {member?.role1?.roleName} - {member?.role1?.team}
        </p>
        <p className="text-sm text-gray-300 opacity-0 translate-y-4 
                     group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {member?.role2?.roleName} - {member?.role2?.team}
        </p>
        <p className="text-sm text-gray-300 opacity-0 translate-y-4 
                     group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {member?.role3?.roleName} - {member?.role3?.team}
        </p>
      </div>
    </div>
    )
}

export default MemberCard