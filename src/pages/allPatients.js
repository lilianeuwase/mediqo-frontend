import React from "react";
import DiabPatientTable from "../components/tables/diabetes/diabPatientTable";
import HyperPatientTable from "../components/tables/hypertension/hyperPatientTable";
import UserNavbar from "../components/userNavbar";

export default function AllPatients() {
  return (
    <div>
      <UserNavbar />
      <DiabPatientTable />
      <HyperPatientTable />
    </div>
  );
}
