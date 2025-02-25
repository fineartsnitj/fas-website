import React from 'react'
import GalleryCard from './GalleryCard';
import InfiniteScroll from "react-infinite-scroll-component";

const arr = [1, 2, 3, 4];
const Gallery = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({ accountNo: "", customerFName: "", email: "" });

  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // function handleChange(e) {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  // }
  async function fetchAccount() {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/account/getCustomerAccounts?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
      });
      console.log(response);
      setCustomers((prevItems) => [...prevItems, ...response.data])
      response.data.length > 0 ? setHasMore(true) : setHasMore(false);
      toast.success("Customer account fetched successfully");
      setPage(page + 1);
    }
    catch (e) {

      toast.error("Something went wrong " + e.message);
    }
  }

  async function fetchAccount2() {
    try {
      setPage(1);
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/account/getCustomerAccounts?keyword=${keyword}&page=1&pageSize=${pageSize}`,
      });
      console.log(response);
      setCustomers(response.data);
      response.data.length > 0 ? setHasMore(true) : setHasMore(false);
      toast.success("Customer account fetched successfully");
      setPage(page + 1);
    }
    catch (e) {

      toast.error("Something went wrong " + e.message);
    }
  }

  console.log(customers);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchAccount2();
    setLoading(false);
  }, [keyword]);


  return (
    <div>
      {arr.map((item, index) => (
        <InfiniteScroll
        dataLength={customers.length}
        next={fetchAccount}
        hasMore={hasMore}
        >
        <GalleryCard key={index}></GalleryCard>
        </InfiniteScroll>
      ))}
    </div>
  )
}

export default Gallery