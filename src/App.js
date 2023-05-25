import { useState, useEffect } from 'react';
import AppRoutes from "./sherd/routes/AppRoutes";
import UserContext from "./sherd/contexts/userContext";
import { GET_USER_BY_USERNAME_URL } from './sherd/constants/urls';
import { apiGet } from './sherd/services/apiRequests';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRequestToGetCurrentUserDone, setIsRequestToGetCurrentUserDone] = useState(false);
  const updateCurrentUser = (updatedCurrentUser) => {
    if (updatedCurrentUser) {
      updatedCurrentUser.password = "******";
    }
    setCurrentUser(updatedCurrentUser);
  }
  const getCurrentUser = async () => {
    try {
      if (localStorage.getItem('Authorization')) {
        const user = await apiGet(GET_USER_BY_USERNAME_URL, "sendToken");
        if (user) {
          updateCurrentUser(user);
        }
      }
    } catch (e) {
      console.error("Invalid token " + JSON.stringify(e));
    }
    setIsRequestToGetCurrentUserDone(true);
  }
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser, isRequestToGetCurrentUserDone }}>
      <AppRoutes />
    </UserContext.Provider>
  )
}

export default App;
