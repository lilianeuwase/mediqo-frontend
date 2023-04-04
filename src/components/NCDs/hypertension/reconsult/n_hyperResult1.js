import { React, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import LifestyleCard from "../../../cards/lifestyleCard";
import ProfileCard from "../../../cards/profileCard";
import HyperMedsTable from "../../../tables/hypertension/hypermedsTable";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function NHyperResult1({ i, contro, titra }) {
  let weight = i.weight ?? [];
  let height = i.height ?? [];
  let bmi = i.bmi ?? [];

  const b = i.consultations - 1 ?? 0;
  const phone_number = i.phone_number;
  const current_name = i.lname + " " + i.fname;
  //Store Results
  const diagnosis = "";
  const patient_manage = "";
  const hyper_stage = "";
  const [medication, setMedication] = useState("");
  const control = contro;
  const titration = titra;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      phone_number,
      diagnosis,
      patient_manage,
      medication,
      hyper_stage,
      control
    );
    fetch("http://localhost:5000/updateHyperPatient1", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        phone_number,
        diagnosis,
        patient_manage,
        medication,
        hyper_stage,
        control,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientRegister");
        if (data.status == "ok") {
          alert("Patient Info is Updated");
          window.location.href = "/userDetails";
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <MDBCol>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md="5" className="mb-4">
            <ProfileCard
              name={current_name}
              gender={i.gender}
              age={i.age}
              weight={weight[b]}
              height={height[b]}
              bmi={bmi[b]}
              phone={i.phone_number}
            />
          </MDBCol>
          <MDBCol>
            <MDBCol>
              <InfoCard
                color="light"
                class="text-dark mb-4"
                header="Findings"
                textClass="fw-bold text-danger"
                text={control + " Control"}
              />
            </MDBCol>
            <MDBCol>
              <InfoCard
                color="dark"
                class="text-light mb-4"
                header="Patient Management"
                textClass="fw-bold text-light"
                text={titration}
              />
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <HyperMedsTable />
          </MDBCol>
          <MDBCol sm="4">
            <LifestyleCard />
          </MDBCol>

          <MDBCol sm="8">
            <Box className="box">
              <FormControl size="small" fullWidth className="mt-4">
                <InputLabel id="demo-simple-select-label">
                  Prescribed Medicine
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={medication}
                  label="Medication"
                  onChange={(e) => setMedication(e.target.value)}
                  required
                >
                  <MenuItem value="1st Line">1st Line</MenuItem>
                  <MenuItem value="2nd Line">2nd Line</MenuItem>
                  <MenuItem value="3rd Line">3rd Line</MenuItem>
                  <MenuItem value="4th Line">4th Line</MenuItem>
                  <MenuItem value="4th Line">4th Line</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </MDBCol>
          <MDBCol sm="2">
            <div className="d-grid mt-4">
              <button type="submit" className="button-3">
                FINISH & SAVE
              </button>
            </div>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBCol>
  );
}
