/** @format */

import React from "react";
import Table from "react-bootstrap/Table";

function Studentreviws() {
  const students = ["Ali", "Mohamed"];
  const lesons = ["Sourat Taha (1-10)", "Sourat Maryam (20-33)"];
  return (
    <div className='container'>
      <Table striped='columns'>
        <thead>
          <tr>
            <th>Room time</th>
            <th>Instructor</th>
            <th>Students Names</th>
            <th>Memorizing evaluation</th>
            <th>Review evaluation</th>
            <th>lesson</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>August 2, 2022</td>
            <td>Mahmoud</td>
            <td>{students}</td>
            <td>7</td>
            <td>8</td>
            <td>{lesons}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
export default Studentreviws;
