import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import UserDetails from "./components/userDetails";
import OldConsult from "./pages/oldConsult";
import AddUser from "./pages/addUser";
import Footer from "./components/footer";
import NewConsult from "./pages/newConsult";
import Diabetes from "../src/components/NCDs/diabetes/diabetes";
import DiabResults from "../src/components/NCDs/diabetes/diabResults";
import DiabMeds from "./components/NCDs/diabetes/diabResults/outPatient/diabMeds";
import AllPatients from "./pages/allPatients";
import OldPatientDetails from "./components/NCDs/diabetes/oldPatientDetails";
import OldDiab from "./components/NCDs/diabetes/oldDiab";
import Reconsult from "./components/NCDs/diabetes/reconsult/reconsult";
import NDiabResults from "./components/NCDs/diabetes/n_diabResults";
import Hypertension from "./components/NCDs/hypertension/hypertension";
import HyperResults from "./components/NCDs/hypertension/hyperResults";
import OldHyper from "./components/NCDs/hypertension/oldHyper";
import OldHyperPatientDetails from "./components/NCDs/hypertension/oldHyperPatientDetails";
import NHyperResults from "./components/NCDs/hypertension/n_hyperResults";
import DiabMedsTable from "./components/tables/diabetes/diabmedsTable";
import Asthma from "./components/NCDs/asthma/asthma";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route
            path="/sign-in"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route
            path="/adduser"
            element={isLoggedIn == "true" ? <AddUser /> : <Login />}
          />
          <Route
            path="/userDetails"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route
            path="/userDetails/patients"
            element={isLoggedIn == "true" ? <AllPatients /> : <Login />}
          />
          <Route
            path="/userDetails/newconsult"
            element={isLoggedIn == "true" ? <NewConsult /> : <Login />}
          />
          <Route
            path="/userDetails/oldconsult"
            element={isLoggedIn == "true" ? <OldConsult /> : <Login />}
          />
                    <Route
            path="/userDetails/oldconsult/oldhypertension"
            element={isLoggedIn == "true" ? <OldHyper /> : <Login />}
          />
            <Route
            path="/userDetails/oldconsult/oldhypertension/nhyperresults"
            element={isLoggedIn == "true" ? <NHyperResults /> : <Login />}
          />
                 <Route
            path="/userDetails/oldconsult/oldhypertension/oldhyperpatientdetails"
            element={isLoggedIn == "true" ? <OldHyperPatientDetails /> : <Login />}
          />
          <Route
            path="/userDetails/oldconsult/olddiabetes"
            element={isLoggedIn == "true" ? <OldDiab /> : <Login />}
          />
   
          <Route
            path="/userDetails/oldconsult/olddiabetes/ndiabresults"
            element={isLoggedIn == "true" ? <NDiabResults /> : <Login />}
          />
          {/* <Route path="/userDetails/oldconsult/olddiabetes" element={<OldDiab />}/> */}
          <Route
            path="/userDetails/oldconsult/olddiabetes/oldpatientdetails"
            element={isLoggedIn == "true" ? <OldPatientDetails /> : <Login />}
          />
          {/* <Route path="/userDetails/oldconsult/olddiabetes/oldpatientdetails" element={<OldPatientDetails />}/> */}
          <Route
            path="/userDetails/oldconsult/olddiabetes/oldpatientdetails/reconsult"
            element={isLoggedIn == "true" ? <Reconsult /> : <Login />}
          />
          <Route
            path="/userDetails/diabetes"
            element={isLoggedIn == "true" ? <Diabetes /> : <Login />}
          />
          <Route
            path="/userDetails/diabetes/diabresults"
            element={isLoggedIn == "true" ? <DiabResults /> : <Login />}
          />
          <Route
            path="/userDetails/diabetes/diabresults/diabmeds"
            element={isLoggedIn == "true" ? <DiabMeds /> : <Login />}
          />
          <Route
            path="/userDetails/hypertension"
            element={isLoggedIn == "true" ? <Hypertension /> : <Login />}
          />
          
          <Route
            path="/userDetails/hypertension/hyperresults"
            element={isLoggedIn == "true" ? <HyperResults /> : <Login />}
          />

<Route
            path="/userDetails/asthma"
            element={isLoggedIn == "true" ? <Asthma /> : <Login />}
          />
          

          {/* For View Purposes */}
          <Route path="/view" element={<DiabMedsTable />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
