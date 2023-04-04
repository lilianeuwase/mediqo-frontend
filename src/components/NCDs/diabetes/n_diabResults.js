import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import Result4 from "../diabetes/diabResults/result4";
import Result1 from "../diabetes/diabResults/result1";
import NResult1 from "./reconsult/n_Result1";
import NResult2 from "./reconsult/n_Result2";

export default function NDiabResults() {
  const [patientData, setPatientData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/patientData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("patienttoken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");

        setPatientData(data.data);

        if (data.data == "token expired") {
          alert("Token expired Retrieve again");
          window.localStorage.clear();
          window.location.href = "/userDetails/oldconsult/olddiabetes";
        }
      });
  }, []);

  const current_name = patientData.lname + " " + patientData.fname;
  const b = patientData.consultations - 1 ?? 0;

  let fastglucose = patientData.fastglucose ?? [];
  let glucose = patientData.glucose ?? [];
  let hb = patientData.hb ?? [];

  return (
    <div>
      <UserNavbar />
      <MDBContainer className="my-4">
        {fastglucose[b] < 150 ? (
          <Result4 phone_number={patientData.phone_number} />
        ) : (fastglucose[b] >= 150 && fastglucose[b] <= 185) ||
          (hb >= 7.5 && hb[b] <= 8) ||
          (glucose[b] >= 150 && glucose[b] <= 185) ? (
          <NResult2
            i={patientData}
            contro="Good"
            titra="No medication/Insulin changes required"
          />
        ) : (fastglucose[b] >= 185 && fastglucose[b] <= 400) ||
          hb[b] > 8 ||
          (glucose[b] >= 185 && glucose[b] <= 400) ? (
          <NResult1
            i={patientData}
            contro="Poor"
            titra="Medication/Insulin Titrations Required"
          />
        ) : (
          <Result1 phone_number={patientData.phone_number} />
        )}
      </MDBContainer>
    </div>
  );
}
