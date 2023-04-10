import React, { useEffect, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import PatientHome from "../../NCDs/diabetes/patientHome";

export default function DiabPatientTable({}) {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAllPatient();
    getPaginatedPatients();
  }, []);

  //fetching all patient
  const getAllPatient = () => {
    fetch("https://mediqo-api.onrender.com/getAllPatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");
        setData(data.data);
      });
  };

  //deleting patient
  const deletePatient = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("https://mediqo-api.onrender.com/deletePatient", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          patientid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllPatient();
        });
    } else {
    }
  };

  //Display user
  const displayPatient = (i) => {
    return(<div>
      <PatientHome patientData={i} />
    </div>);
    
  

    // window.location.href = "/userDetails/oldconsult";
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedPatients();
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedPatients();
  }

  function getPaginatedPatients() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  return (
    <div className="table">
      <div className="table-container">
        <h5
          className="text-center fw-normal my-5 fw-bold"
          style={{ letterSpacing: "1px" }}
        >
          Diabetes Patients
        </h5>
        <MDBTable responsive hover small align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Patients</th>
              <th scope="col">Age</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gender</th>
              <th scope="col">Consultations</th>
              <th scope="col">Delete</th>
            </tr>
          </MDBTableHead>
          {data.map((i) => {
            return (
              <MDBTableBody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{i.fname}</p>
                        <p className="mb-0">{i.lname}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <MDBBadge color="success" pill>
                      {i.age}
                    </MDBBadge>
                  </td>
                  <td>
                    <p className="mb-0">{i.phone_number}</p>
                  </td>
                  <td>
                    <p className="mb-0">{i.gender}</p>
                  </td>
                  <td>
                    <p className="mb-0">{i.consultations}</p>
                  </td>
                  <td>
                    {/* <h6>
                      <MDBBadge color="info" onClick={() => displayPatient(i)}>
                        Details
                      </MDBBadge>
                    </h6> */}
                    <h6>
                      <MDBBadge
                        color="danger"
                        onClick={() => deletePatient(i._id, i.fname)}
                      >
                        Delete
                      </MDBBadge>
                    </h6>
                  </td>
                </tr>
              </MDBTableBody>
            );
          })}
        </MDBTable>
      </div>
      <hr class="hr hr-blurry" />
    </div>
  );
}
