
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MainPage from './components/MainPage';
import AllActivitiesScreen from "./components/AllActivitiesScreen";
import UserMenu from "./components/UserMenu";
import CreateActivityScreen from "./components/CreateActivityScreen";







export default function App() {

  useEffect(() => {
    document.title = "Activify"
  }, [])

  return (
      <BrowserRouter>
				<Routes>
					<Route exact path="/" element={<MainPage />} />
					<Route exact path="login" element={<LoginForm />} />
					<Route exact path="register" element={<RegistrationForm />} />
          <Route exact path="all-activities" element={<AllActivitiesScreen />} />
          <Route exact path="user-menu" element={<UserMenu />} />
          <Route exact path="create-activity" element={<CreateActivityScreen />} />
 				</Routes>
			</BrowserRouter>

  );
}
