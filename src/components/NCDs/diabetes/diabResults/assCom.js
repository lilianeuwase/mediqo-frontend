import React, { useEffect, useState, useRef } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import InfoCard from "../../../cards/infoCard";
import AssComTable from "../../../tables/diabetes/asscomTable";

export default function AssCom({ patientInfo }) {
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
    fetch("http://localhost:5000/getAllPatient", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "patientData");
        setData(data.data);
      });
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
      `http://localhost:5000/paginatedPatients?page=${currentPage.current}&limit=${limit}`,
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
    <div>
      <MDBContainer className="my-4">
        {data.map((i, a) => {
          if (data.length === a + 1) {
            const b = i.consultations - 1 ?? 0;
            if (
              i.retino[b] === true ||
              i.nephro[b] === true ||
              i.neuro[b] === true ||
              i.footulcer[b] === true ||
              i.hiv[b] === true ||
              i.htn[b] === true ||
              i.liver[b] === true ||
              i.prego[b] === true
            ) {
              return (
                <div>
          <AssComTable/>
                </div>
              );
            }
            return (
              <InfoCard
            color="light"
            class="text-dark mb-4"
            header="Complications & Co-morbidity"
            textClass="fw-bold text-danger"
            text="Patient has NO Complications nor Co-morbidity"
          />
            );
          }
        })}
      </MDBContainer>
    </div>
  );
}
