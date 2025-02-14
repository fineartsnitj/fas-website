// import React from 'react'
// import MemberCard from './MemberCard'

// const arr = [1, 2, 3, 4]
// const Members = () => {
//   return (
//     <div>
//         {
//             arr.map((item, index) => <MemberCard key={index}>{item}</MemberCard>)
//         }
//     </div>
//   )
// }

// export default Members

import React, { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL.replace(/\/$/, "");


const Members = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/v1/member/getAllMembers`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  console.log(data); // Check if data is being fetched

  return (
    <div>
      {data ? <p>Data loaded successfully!</p> : <p>Loading...</p>}
    </div>
  );
};

export default Members;




