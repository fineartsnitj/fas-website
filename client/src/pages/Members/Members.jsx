import InfiniteScroll from "react-infinite-scroll-component";
import MemberCard from './MemberCard'
import React, { useEffect, useState } from "react";
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL.replace(/\/$/, "");


const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



  async function fetchAccount() {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/member/getAllMembers` //?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
      });
      console.log(response);
      setMembers((prevItems) => [...prevItems, ...response.data.members])
      response.data.length > 0 ? setHasMore(true) : setHasMore(false);
      // toast.success("Customer account fetched successfully");
      setPage(page + 1);
    }
    catch (e) {
      console.log("Something went wrong " + e.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchAccount();
    setLoading(false);
  }, [keyword]);

  return (
    <div>
      {loading ?
        <div>
          <h1>Loading...</h1>
        </div> :
        <div>{
          members.map((member, index) => <MemberCard key={index} member={member}></MemberCard>)
        }
        </div>
      }
    </div>
  );
};

export default Members;




