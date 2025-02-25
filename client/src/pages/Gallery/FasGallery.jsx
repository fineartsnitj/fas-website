import React from 'react'
import {useState, useEffect} from 'react';
import GalleryCard from './GalleryCard';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const arr = [1, 2, 3, 4];
const FasGallery = () => {

  const [artworks, setartworks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  async function fetchAccount() {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/artwork/getAllArtworks?keyword=${keyword}&page=${page}&pageSize=${pageSize}&fas=${true}`,
      });
      // console.log(response);
      setartworks((prevItems) => [...prevItems, ...response?.data?.artworks])
      response.data?.artworks?.length > 0 ? setHasMore(true) : setHasMore(false);
      // alert("artwork account fetched successfully");
      setPage(page + 1);
    }
    catch (e) {

      alert("Something went wrong " + e.message);
    }
  }

  async function fetchAccount2() {
    try {
      setPage(1);
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/artwork/getAllArtworks?keyword=${keyword}&page=1&pageSize=${pageSize}&fas=${true}`,
      });
      // console.log(response);
      setartworks(response?.data?.artworks);
      response?.data?.artworks?.length > 0 ? setHasMore(true) : setHasMore(false);
      alert("artwork account fetched successfully");
      setPage(page + 1);
    }
    catch (e) {

      alert("Something went wrong " + e.message);
    }
  }

  console.log(artworks);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchAccount2();
    setLoading(false);
  }, [keyword]);


  return (
    <div>
      <InfiniteScroll
        dataLength={artworks.length}
        next={fetchAccount}
        hasMore={hasMore}
        >
      {artworks?.map((artwork, index) => (
        
        <GalleryCard artwork={artwork} key={index}></GalleryCard>
        
      ))}
      </InfiniteScroll>
    </div>
  )
}

export default FasGallery