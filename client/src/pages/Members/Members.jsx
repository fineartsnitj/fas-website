import React from 'react'
import MemberCard from './MemberCard'

const arr = [1, 2, 3, 4]
const Members = () => {
  return (
    <div>
        {
            arr.map((item, index) => <MemberCard key={index}>{item}</MemberCard>)
        }
    </div>
  )
}

export default Members