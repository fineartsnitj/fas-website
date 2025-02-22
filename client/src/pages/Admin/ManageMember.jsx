import React, { useEffect, useState } from 'react'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import Select from 'react-select';

const ManageMember = () => {

    const [roles, setRoles] = useState([]);
    const optionList = [];

    const [roleid1, setRoleid1] = useState([]);
    const [roleid2, setRoleid2] = useState([]);
    const [roleid3, setRoleid3] = useState([]);

    const [file, setFile] = useState();
    const [username, setusername] = useState(undefined);
    const [bio, setbio] = useState();
    const [email, setemail] = useState(undefined);
    const [membername, setmembername] = useState(undefined);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchRoles(){
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/member/getAllRoles`,
            });
            setRoles(response.data.roles);
        } catch (error) {
            console.log("Something went wrong " + error.message);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchRoles();
        setLoading(false);
    }, [])

    for (var i = 0; i < roles.length; i++) {
        let obj = {
            label: roles.at(i).roleName + " - " + roles.at(i).team,
            value: roles.at(i)._id,
        }
        optionList.push(obj);
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setUploading(true);
        if (!membername) {
            alert("Please enter membername to upload resource");
            setUploading(false);
            return;
        }
        if (!username) {
            alert("Please enter username to upload resource");
            setUploading(false);
            return;
        }
        if (!email) {
            alert("Please enter email to upload resource");
            setUploading(false);
            return;
        }
        //the above attributes are compulsory.

        const formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        formData.append("bio", bio);
        formData.append("membername", membername);
        formData.append("email", email);
        formData.append("role1", roleid1);
        formData.append("role2", roleid2);
        formData.append("role3", roleid3);
        //add more attributes like above

        console.log(formData);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        const url = `${BASE_URL}/v1/member/createMember`;
        // dispatch(addResource(formData, config));
        axios.post(url, formData).then((response) => {
            console.log(response.data);
            // toast.success(response.data.message);
            alert("Member created successfully");
            setUploading(false);
        });
    }



    return (
        <div>ManageMember
            <p>This is the Manage Member Section</p>

            <form onSubmit={handleSubmit}>
                <p className="mt-3">Enter Member Name *</p>
                <input
                    type="text"
                    name="membername"
                    id=""
                    onChange={(e) => setmembername(e.target.value)}
                />
                <p className="mt-3">Enter a unique username *</p>
                <input
                    type="text"
                    name="username"
                    id=""
                    onChange={(e) => setusername(e.target.value)}
                />
                <p className="mt-3">Enter a unique email address *</p>
                <input
                    type="email"
                    name="email"
                    id=""
                    onChange={(e) => setemail(e.target.value)}
                />
                <p className="mt-3">Enter a very short description(optional)</p>
                <input
                    type="text"
                    name="bio"
                    id=""
                    onChange={(e) => setbio(e.target.value)}
                />

                <label htmlFor="roleid1">
                    <h4>Select Role1</h4>
                    <div className="dropdown-container">
                        <Select options={optionList} placeholder="Select Role1" onChange={(data) => { setRoleid1(data.value) }} isSearchable={true} />
                    </div>
                </label>
                <label htmlFor="roleid2">
                    <h4>Select Role2</h4>
                    <div className="dropdown-container">
                        <Select options={optionList} placeholder="Select Role2" onChange={(data) => { setRoleid2(data.value) }} isSearchable={true} />
                    </div>
                </label>
                <label htmlFor="roleid3">
                    <h4>Select Role3</h4>
                    <div className="dropdown-container">
                        <Select options={optionList} placeholder="Select Role3" onChange={(data) => { setRoleid3(data.value) }} isSearchable={true} />
                    </div>
                </label>
                <p className="mt-3">Upload a file in pdf format</p>
                <input type="file" onChange={handleChange} />
                <button type="submit" className="ml-4 px-6 bg-primary-600 py-1.5 rounded-md text-white hover:bg-primary-700">Upload</button>
                {uploading && <span> Uploading.... please wait</span>}
            </form>
        </div>
    )
}

export default ManageMember