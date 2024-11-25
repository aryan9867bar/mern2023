import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"

export const AdminUpdate = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: ""
    });

    const { authorizationToken, API } = useAuth();

    const params = useParams();
    console.log("params single user: ", params);

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`users single data ${data}`);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success("Updated Successfully");
            } else {
                toast.error("Not Updated Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1>Update User Data</h1>
                </div>
                <div className="container grid grid-two-cols">
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                              <label htmlFor="username">username</label>
                              <input
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={handleInput}
                                id="username"
                                required
                                autoComplete="off"
                                placeholder="username"
                              />
                            </div>
                            <div>
                              <label htmlFor="email">email</label>
                              <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleInput}
                                id="email"
                                required
                                autoComplete="off"
                                placeholder="email"
                              />
                            </div>
                            <div>
                              <label htmlFor="phone">phone</label>
                              <input
                                type="number"
                                name="phone"
                                value={data.phone}
                                onChange={handleInput}
                                id="phone"
                                required
                                autoComplete="off"
                                placeholder="number"
                              />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">
                              Update
                            </button>
                        </form>
                    </section>
                </div>
            </section>
        </>
    );
};