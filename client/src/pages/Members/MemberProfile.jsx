const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router"


const MemberProfile = () => {
    const params = useParams();
    const [member, setMember] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAccount(){
        try{
            const response = await axios.get(`${BASE_URL}/v1/member/getMemberByUsername/${params.username}`);
            setMember(response.data?.member);
            console.log(response);
        } catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchAccount();
        setLoading(false);
    }, []);
    return (
        <div>
            <h1>Hello</h1>
            {loading ? <h1>Loading...</h1> :
                <div className=" bg-slate-50">
                    <h1>Profile of {member?.membername}</h1>
                    <p>Email: {member?.email}</p>
                    <div className="card-body">
                        <h2 className="card-title">{member?.membername}</h2>
                        <p>{member?.role1?.roleName} - {member?.role1?.team} </p>
                        <p>{member?.role2?.roleName} - {member?.role2?.team} </p>
                        <p>{member?.role3?.roleName} - {member?.role3?.team} </p>
                    </div>
                    

                 
                </div>
            }
        </div>

    )
}

export default MemberProfile