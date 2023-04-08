import React, { useEffect, useState, useRef } from "react";
import UserNavbar from "../../userNavbar";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import ProfileCard from "../../cards/profileCard";
import Result4 from "../diabetes/diabResults/result4";
import Result3 from "../diabetes/diabResults/result3";
import Result1 from "../diabetes/diabResults/result1";
import Result2 from "../diabetes/diabResults/result2";
import AsthmaResult1 from "./asthmaResults/asthmaResult1";
import AsthmaResult2 from "./asthmaResults/asthmaResult2";
import AsthmaResult3 from "./asthmaResults/asthmaResult3";
import AsthmaAssCom from "./asthmaResults/asthmaAssCom";

export default function AsthmaResults() {
  //setting state
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(100);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getAllAsthmapatient();
    getPaginatedAsthmapatients();
  }, []);

  //fetching all Asthmapatient
  const getAllAsthmapatient = () => {
    fetch("https://mediqo-api.onrender.com/getAllAsthmapatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AsthmapatientData");
        setData(data.data);
      });
  };

  //pagination
  function handlePageClick(e) {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedAsthmapatients();
  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedAsthmapatients();
  }

  function getPaginatedAsthmapatients() {
    fetch(
      `https://mediqo-api.onrender.com/paginatedAsthmapatients?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AsthmapatientData");
        setPageCount(data.pageCount);
        setData(data.result);
      });
  }

  return (
    <div>
      <UserNavbar />
      <MDBContainer className="my-4">
        {data.map((i, a) => {
          if (data.length === a + 1) {
            const current_name = i.lname + " " + i.fname;
            const b = i.consultations - 1 ?? 0;
            if (
              i.acute_dyspnea[b] === "true" ||
              i.sighing[b] === "true" ||
              i.broken[b] === "true" ||
              i.tachy_brady[b] === "true" ||
              i.confusion[b] === "true" ||
              i.tachycardia[b] === "true" ||
              i.bradycardia[b] === "true" ||
              i.hypoxia[b] < 92
            ) {
              return (
                <div>
                  <MDBRow>
                    <h4
                      className="text-center fw-normal my-4 pb-3 fw-bold"
                      style={{ letterSpacing: "1px" }}
                    >
                      Medical Results
                    </h4>

                    <AsthmaResult1 i={i} />
                  </MDBRow>
                  <AsthmaAssCom />
                </div>
              );
            }
            if (
              i.cough[b] === "Episodic & dry" ||
              i.dyspnea[b] === "Episodic"
            ) {
              return (
                <div>
                  <MDBRow>
                    <h4
                      className="text-center fw-normal my-4 pb-3 fw-bold"
                      style={{ letterSpacing: "1px" }}
                    >
                      Medical Results
                    </h4>

                    <AsthmaResult2 i={i} />
                  </MDBRow>
                  <AsthmaAssCom />
                </div>
              );
            }
            return (
              <div>
                <MDBRow>
                  <h4
                    className="text-center fw-normal my-4 pb-3 fw-bold"
                    style={{ letterSpacing: "1px" }}
                  >
                    Medical Results
                  </h4>

                  <AsthmaResult3 i={i} />
                </MDBRow>
                <AsthmaAssCom />
              </div>
            );
          }
        })}
      </MDBContainer>
    </div>
  );
}
