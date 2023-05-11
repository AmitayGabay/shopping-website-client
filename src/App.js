import { useState, useEffect } from 'react';
import AppRoutes from "./sherd/routes/AppRoutes";
import UserContext from "./sherd/contexts/userContext";
import { GET_USER_BY_USERNAME_URL } from './sherd/constants/urls';
import { apiGet } from './sherd/services/apiRequests';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const updateCurrentUser = (updatedCurrentUser) => {
    updatedCurrentUser.password = "******";
    console.log(updatedCurrentUser);
    setCurrentUser(updatedCurrentUser);
  }
  const getCurrentUser = async () => {
    const token = { Authorization: localStorage.getItem("Authorization") };
    const user = await apiGet(GET_USER_BY_USERNAME_URL, token);
    if (user) {
      updateCurrentUser(user);
    }
  }
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser }}>
      <AppRoutes />
    </UserContext.Provider>
  )
}

export default App;
