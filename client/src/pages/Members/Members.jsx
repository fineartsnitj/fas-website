import InfiniteScroll from "react-infinite-scroll-component";
import MemberCard from './MemberCard'
import React, { useEffect, useState } from "react";
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("all");
  const [pageSize, setPageSize] = useState(10);

  async function fetchAccount() {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/member/getAllMembers?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
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
  }, [selectedYear]);

  return (
    <div
    className="w-[90%] max-w-[1400px] bg-black/50 backdrop-blur-2xl 
               rounded-xl shadow-lg p-8 overflow-hidden"
  >
    <div className="flex justify-right mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 bg-gray-800/40 text-white rounded-lg border border-white/20"
        >
          <option value="all">All Years</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
        </select>
      </div>
    {loading ? (
      <h1 className="text-center text-gray-300 text-lg">Loading...</h1>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                      gap-6 justify-center items-center px-4">
        {members.length > 0 ? (
          members.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))
        ) : (
          <h2 className="text-center text-gray-400 col-span-full">
            No members found.
          </h2>
        )}
      </div>
    )}
  </div>
  );
};

export default Members;




