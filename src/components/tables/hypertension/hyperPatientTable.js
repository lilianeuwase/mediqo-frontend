import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ReactPaginate from "react-paginate";
import { useRef } from "react";

import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
} from "mdb-react-ui-kit";

export default function HyperPatientTable({}) {
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
    fetch("http://localhost:5000/getAllHyperPatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientData");
        setData(data.data);
      });
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  //deleting patient
  const deletePatient = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteHyperPatient", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          Hyperpatientid: id,
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
      `http://localhost:5000/paginatedHyperPatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "HyperpatientData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  return (
    <div className="table">
    <hr class="hr hr-blurry" />
      <div className="table-container">
        <h5
          className="text-center fw-normal my-5 fw-bold"
          style={{ letterSpacing: "1px" }}
        >
          Hypertension Patients
        </h5>
        <MDBTable responsive hover small align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Patients</th>
              <th scope="col">Age</th>
              <th scope="col">Phone Number</th>
              <th scope="col">NCD</th>
              <th scope="col">Edit/Delete</th>
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
                        <p className="text-muted mb-0">{i.lname}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <MDBBadge color="success" pill>
                      {i.age}
                    </MDBBadge>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{i.phone_number}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{i.NCD}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deletePatient(i._id, i.fname)}
                      />
                    </p>
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
