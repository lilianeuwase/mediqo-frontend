import React, { useState } from "react";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "../diabetes/addDiab.css";
import "../../buttons/button.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function AddAsthma() {
  //Profile
  const consultations = 1;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [phone_number, setPhone] = useState("");
  const [gender, setGender] = useState("");

  //Check-up
  const [chronic_cough, setCough] = useState("");
  const [dyspnea, setDyspnea] = useState("");

  const [hypoxia, setHypoxia] = useState("");

  //Symptoms
  const [state, setState] = React.useState({
    confusion: false,
    tachycardia: false,
    wheez: false,
    sighing: false,
    expiratory_time: false,
    clubb: false,
    cyanosis: false,

    hiv: false,

    //Complications
    prego: false,

    //Emergency Signs
    broken: false,
    bradycardia: false,
  });

  //Lab Results
  const [RR, setRr] = useState("");
  const [creatinine, setCreatinine] = useState("");

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    confusion,
    tachycardia,
    wheez,
    sighing,
    expiratory_time,
    clubb,
    cyanosis,

    hiv,

    //Complications
    prego,

    //Danger Signs
    broken,
  } = state;

  const error =
    [
      confusion,
      tachycardia,
      wheez,
      sighing,
      expiratory_time,
      clubb,
      cyanosis,

      hiv,

      //Complications
      prego,

      //Danger Signs
      broken,
    ].filter((v) => v).length !== 2;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      consultations,
      //Profile
      fname,
      lname,
      age,
      gender,
      height,
      weight,
      phone_number,

      //Lab results
      RR,
      creatinine,

      chronic_cough,

      confusion,
      tachycardia,
      wheez,
      sighing,
      expiratory_time,
      clubb,
      cyanosis,

      hiv,

      //Complications
      prego,

      //Danger Signs
      broken
    );
    fetch("https://mediqo-api.onrender.com/registerAsthmaPatient", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        consultations,
        //Profile
        fname,
        lname,
        age,
        gender,
        height,
        weight,
        phone_number,

        //Lab results
        RR,
        creatinine,

        chronic_cough,

        confusion,
        tachycardia,
        wheez,
        sighing,
        expiratory_time,
        clubb,
        cyanosis,

        hiv,

        //Complications
        prego,

        //Danger Signs
        broken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientRegister");
        if (data.status == "ok") {
          alert("Registration Successful");
          window.location.href = "/userDetails/asthma/asthmaresults";
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <div className="container">
      <MDBContainer className="my-4">
        <MDBCard>
          <form onSubmit={handleSubmit}>
            <MDBCol md="8 modal-dialog-centered">
              <MDBCol md="8 modal-dialog-centered" className="ms-5">
                <MDBCardBody className="d-flex flex-column">
                  <h5
                    className="text-center fw-normal my-2 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Patient Profile
                  </h5>

                  <MDBInput
                    wrapperClass="mb-2"
                    label="First name"
                    id="typeText"
                    type="text"
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Last name"
                    id="typeText"
                    type="text"
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Patient Age"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />

                  <FormControl size="small" fullWidth className="mb-2">
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                    </Select>
                  </FormControl>

                  <MDBInput
                    wrapperClass="mb-2"
                    label="Height(Meters)"
                    id="typeNumber"
                    type="number"
                    step=".01"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Weight(Kgs)"
                    id="typeNumber"
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Phone number"
                    id="typePhone"
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />

                  <h6
                    className="text-center fw-normal my-1 pb-2 fw-bold mt-4"
                    style={{ letterSpacing: "1px" }}
                  >
                    Lab Results & Check-up
                  </h6>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Respiratory Rate (Breaths per min)"
                    id="typeText"
                    type="text"
                    onChange={(e) => setRr(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Creatinine (μmol/L)"
                    id="typeText"
                    type="text"
                    onChange={(e) => setCreatinine(e.target.value)}
                  />
                  <FormControl size="small" fullWidth className="mb-2">
                    <InputLabel id="demo-simple-select-label">Cough</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chronic_cough}
                      label="Gender"
                      onChange={(e) => setCough(e.target.value)}
                      required
                    >
                      <MenuItem value="Productive">
                        Productive (yellow, green sputum)
                      </MenuItem>
                      <MenuItem value="Large">
                        Large volume purulence (thick, white pus)
                      </MenuItem>
                      <MenuItem value="Hemoptysis">Hemoptysis</MenuItem>
                      <MenuItem value="Male">
                        Large volume purulence (thick, white pus)
                      </MenuItem>
                      <MenuItem value="Persistent">Persistent & dry</MenuItem>
                      <MenuItem value="Worse">Worse lying flat</MenuItem>
                      <MenuItem value="Episodic">Episodic & dry</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth className="mb-2">
                    <InputLabel id="demo-simple-select-label">
                      Dyspnea
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={dyspnea}
                      label="Dyspnea"
                      onChange={(e) => setDyspnea(e.target.value)}
                      required
                    >
                      <MenuItem value="Sudden">Sudden onset</MenuItem>
                      <MenuItem value="Progressive">Progressive</MenuItem>
                      <MenuItem value="Episodic">Episodic</MenuItem>
                    </Select>
                  </FormControl>
                </MDBCardBody>
              </MDBCol>

              <MDBCol md="8 modal-dialog-centered" className="ms-5">
                <MDBCardBody className="d-flex flex-column">
                  {/* Classical symptoms */}
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h6
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Clinical Symptoms & Danger Signs
                        </h6>
                        <FormHelperText>
                          Tick symptoms accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={confusion}
                              onChange={handleChange}
                              name="confusion"
                            />
                          }
                          label="Restlessness & Confusion"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={tachycardia}
                              onChange={handleChange}
                              name="tachycardia"
                            />
                          }
                          label="Difficult to Hear Heart Sounds"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={wheez}
                              onChange={handleChange}
                              name="wheez"
                            />
                          }
                          label="Expiratory Wheezing"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sighing}
                              onChange={handleChange}
                              name="sighing"
                            />
                          }
                          label="Decreased Breath Sounds"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={expiratory_time}
                              onChange={handleChange}
                              name="expiratory_time"
                            />
                          }
                          label="Increased Expiratory Time"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={clubb}
                              onChange={handleChange}
                              name="clubb"
                            />
                          }
                          label="Clubbing of Fingers or Cyanosis"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={cyanosis}
                              onChange={handleChange}
                              name="cyanosis"
                            />
                          }
                          label="Blue Extremities"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hiv}
                              onChange={handleChange}
                              name="hiv"
                            />
                          }
                          label="H I V"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={prego}
                              onChange={handleChange}
                              name="prego"
                            />
                          }
                          label="Pregnant"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={broken}
                              onChange={handleChange}
                              name="broken"
                            />
                          }
                          label="Broken Sentences"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MDBCardBody>
              </MDBCol>
            </MDBCol>
            <div className="d-grid">
              <button type="submit" className="button-small">
                SUBMIT
              </button>
            </div>
          </form>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
