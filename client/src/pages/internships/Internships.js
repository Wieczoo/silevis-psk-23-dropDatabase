import React, { useEffect, useState } from "react";
import axios from "axios";

import './style.css';

import icon_downArrow from '../../assets/icons/down.png';

const Internships = () => {
  const [internships, setInternships] = useState();
  const [modalVindow, setModalVindow] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    axios.get('http://10.5.5.188:3001/api/internship')
      .then(function (response) { setInternships(response.data); })
      .catch(function (error) { console.log(error) });
  }, [])

  const toggleRow = (index) => {
    setExpandedRows((prev) => {
      const isRowExpanded = prev.includes(index);
      return isRowExpanded ? prev.filter((rowIndex) => rowIndex !== index) : [...prev, index];
    });
  };

  return (
    <>
      <div className="content">
        <h2 className="pageTitle">Internships</h2>
        <div id="filters"></div>

        <table>
          <thead>
            <tr>
              <th>Lp.</th>
              <th>Index</th>
              <th>Student programs</th>
              <th>Company</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {internships && internships.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.student.index}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button>Zatwierdź</button>
                    <button>Usuń</button>
                    <button onClick={() => toggleRow(index)}>
                      <img src={icon_downArrow} alt="arrowDown" />
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr className="hidden">
                    <td colSpan="5">
                        <span></span>
                        <span></span>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {modalVindow &&
        <div id="modalVindow">
          <h2>Are you sure</h2>
          <button>Yes</button>
          <button onClick={() => setModalVindow(false)}>Go back</button>
        </div>}
    </>
  );
}

export default Internships;