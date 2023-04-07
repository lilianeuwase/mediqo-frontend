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

export default function AddHyper() {
  //Profile
  const consultations = 1;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [phone_number, setPhone] = useState("");
  const [gender, setGender] = useState("");

  //Lab Resultd
  const [systobp, setSystobp] = useState("");
  const [diastobp, setDiastobp] = useState("");
  const [creatinine, setCreatinine] = useState("");

  const [state, setState] = React.useState({
    //Danger Signs
    confusion: false,
    vision: false,
    sighing: false,
    chest_pain: false,
    smoke: false,
    diabetes: false,
    proteinuria: false,

    //Complications
    bradycardia: false,
    hyperkalemia: false,
    prego: false,
    hiv: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    confusion,
    vision,
    sighing,
    chest_pain,
    smoke,
    diabetes,
    proteinuria,

    //Complications
    bradycardia,
    hyperkalemia,
    prego,
    hiv,
  } = state;

  const error =
    [
      confusion,
      vision,
      sighing,
      chest_pain,
      smoke,
      diabetes,
      proteinuria,

      //Complications
      bradycardia,
      hyperkalemia,
      prego,
      hiv,
    ].filter((v) => v).length !== 2;

  const bmi = (weight / (height * height)).toFixed(2);

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
      bmi,
      phone_number,

      //Lab results
      systobp,
      diastobp,
      creatinine,

      //Danger Signs
      confusion,
      vision,
      sighing,
      chest_pain,
      smoke,
      diabetes,
      proteinuria,

      //Complications
      bradycardia,
      hyperkalemia,
      prego,
      hiv
    );
    fetch("https://mediqo-api.onrender.com/registerHyperPatient", {
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
        bmi,
        phone_number,

        //Lab results
        systobp,
        diastobp,
        creatinine,

        //Danger Signs
        confusion,
        vision,
        sighing,
        chest_pain,
        smoke,
        diabetes,
        proteinuria,

        //Complications
        bradycardia,
        hyperkalemia,
        prego,
        hiv,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientRegister");
        if (data.status == "ok") {
          alert("Registration Successful");
          window.location.href = "/userDetails/hypertension/hyperresults";
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
              <MDBCol md="7 modal-dialog-centered">
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
                  <Box className="box">
                    <FormControl size="small" fullWidth className="mb-0">
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
                  </Box>
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
                </MDBCardBody>
              </MDBCol>

              <MDBCol md="6 modal-dialog-centered">
                <MDBCardBody className="d-flex flex-column">
                  {/* Danger Signs */}
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 0 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Danger Signs
                        </h5>
                        <FormHelperText>
                          Tick the signsaccordingly
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
                          label="Sudden Confusion/Weakness/Difficulty Speaking"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={vision}
                              onChange={handleChange}
                              name="vision"
                            />
                          }
                          label="Blurry vision"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sighing}
                              onChange={handleChange}
                              name="sighing"
                            />
                          }
                          label="Difficult breathing"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={chest_pain}
                              onChange={handleChange}
                              name="chest_pain"
                            />
                          }
                          label="Chest pain"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                  <h5
                    className="text-center fw-normal my-1 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Lab Results
                  </h5>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Systolic blood pressure (mmHg)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setSystobp(e.target.value)}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Diastolic blood pressure (mmHg)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setDiastobp(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Creatinine (umo/L)"
                    id="typeText"
                    type="text"
                    size="sm"
                    onChange={(e) => setCreatinine(e.target.value)}
                  />
                </MDBCardBody>
              </MDBCol>

              {/* Complications*/}
              <MDBCol md="5 modal-dialog-centered">
                <MDBCardBody className="d-flex flex-column">
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 0 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-2 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Complications
                        </h5>
                        <FormHelperText>
                          Tick complications accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={bradycardia}
                              onChange={handleChange}
                              name="bradycardia"
                            />
                          }
                          label="Bradycardia"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hyperkalemia}
                              onChange={handleChange}
                              name="hyperkalemia"
                            />
                          }
                          label="Hyperkalemia"
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
                              checked={hiv}
                              onChange={handleChange}
                              name="hiv"
                            />
                          }
                          label="H I V"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                  {/* Risk Factor*/}
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 0 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">
                        <h5
                          className="text-center text-dark fw-normal my-0 pb-1 fw-bold"
                          style={{ letterSpacing: "1px" }}
                        >
                          Risk Factors
                        </h5>
                        <FormHelperText>
                          Tick symptoms accordingly
                        </FormHelperText>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={smoke}
                              onChange={handleChange}
                              name="smoke"
                            />
                          }
                          label="Smoking"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={diabetes}
                              onChange={handleChange}
                              name="diabetes"
                            />
                          }
                          label="Diabetes"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={proteinuria}
                              onChange={handleChange}
                              name="proteinuria"
                            />
                          }
                          label="Proteinuria"
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

      {/* <DiabResults phone_number={phone_number} /> */}
    </div>
  );
}
