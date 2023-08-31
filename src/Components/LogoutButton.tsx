function LogoutButton({ setIsUserOnline }) {
  function logout() {
    localStorage.setItem("jwtToken", null);
    setIsUserOnline(false);
  }

  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;
