import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const { storeTokenInLS, API } = useAuth();

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
        const response = await fetch(`${API}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        const responseData = await response.json();

        if (response.ok) {
          console.log("after login: ", responseData);
          toast.success("Login Successful");
          storeTokenInLS(responseData.token);
          setUser({email: "", password: ""})
          navigate("/");
        } else {
          toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
          console.log("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="500"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      id="email"
                      required
                      autoComplete="off"
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      id="password"
                      required
                      autoComplete="off"
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};