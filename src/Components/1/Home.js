import { useState, useEffect } from "react";
import Signup from "../Signup";
import Signin from "../Signin";
import AdminDashboard from "./AdminDashboard";

export default function Home() {
  const [isUserOnline, setIsUserOnline] = useState(false);

  //at page load
  //if token at localStorage
  ////////use server to check it
  ////////if valid
  //////////////set isUserOnline to true
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
      ? JSON.parse(localStorage.getItem("jwtToken"))?.token
      : undefined;

    if (token) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
        },
      };
      // check if token is valid

      async function checkTokenValidity() {
        try {
          let response = await fetch(
            `http://localhost:3000/auth`,
            requestOptions
          );
          if (!response.ok) {
            setIsUserOnline(false);
            throw new Error("Request failed");
          }
          console.log("auth succeded, setting user state to online!");
          setIsUserOnline(true);

          // Process the data or perform other operations
        } catch (error) {
          console.error("Error:", error);
          setIsUserOnline(false);
        }
      }

      checkTokenValidity();
    } else {
      setIsUserOnline(false);
    }
  }, []);

  return (
    <div>
      Home
      {!isUserOnline ? (
        <div>
          <Signup /> <Signin setIsUserOnline={setIsUserOnline} />
        </div>
      ) : (
        <div>
          <LogoutButton setIsUserOnline={setIsUserOnline} />
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}

function LogoutButton({ setIsUserOnline }) {
  function logout() {
    localStorage.setItem("jwtToken", null);
    setIsUserOnline(false);
  }

  return <button onClick={logout}>Logout</button>;
}
