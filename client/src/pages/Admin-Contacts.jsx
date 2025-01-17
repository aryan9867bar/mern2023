import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationToken, API } = useAuth();

    const getContactsData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`contacts data ${data}`);
            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                getContactsData();
                toast.success("Deleted Successfully");
            } else {
                toast.error("Not Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContactsData();
    }, []);

    return (
        <>
            <section className="admin-contacts-section">
                <h1>Admin Contacts Data</h1>

                <div className="container admin-users">
                    {contactData.map((curContactData, index) => {
                        const { username, email, message, _id } = curContactData;
                        return (
                            <div key={index}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{message}</p>
                                <button className="btn" onClick={() => deleteContactById(_id)}>Delete</button>
                            </div>
                        );
                    })}
                </div>
            </section>
            
        </>
    );
};