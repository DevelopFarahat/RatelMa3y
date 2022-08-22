import react, { useState } from "react";
import InstructorHistoryStyles from "./instructorHistory.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import Form from "react-bootstrap/Form";
const InstructorHistory = ({col1Name,col2Name,col3Name,arrName,selectedInstructorData,initialResponseSpecificInstructorData, setSelectedInstructorData }) => {
    const [filterValue, setFilterValue] = useState('');
    const filterAccounts = () => {
        console.log(filterValue);
        let filtarationArr = [];
        console.log("selectedInstructorData");
        console.log(selectedInstructorData)
        console.log("selectedInstructorData");
        for (let i = 0; i < selectedInstructorData[arrName].length; i++) {

            if (selectedInstructorData[arrName][i].name.toLowerCase().includes(filterValue.toLowerCase())) {
                console.log("inside name condition");
                filtarationArr.push(selectedInstructorData[arrName][i]);

            }
            else if ( selectedInstructorData[arrName][i].email.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(selectedInstructorData[arrName][i]);
            }
        }
        if (filtarationArr.length !== 0) {



            //selectedInstructorData.students = filtarationArr;
            //console.log(selectedInstructorData);
        }
        filterValue !== '' ? setSelectedInstructorData({ ...selectedInstructorData, students: filtarationArr }) : setSelectedInstructorData(selectedInstructorData);


    }

    const resetTableFiltaration = () => {
        setFilterValue('');
        console.log(initialResponseSpecificInstructorData);
        setSelectedInstructorData(initialResponseSpecificInstructorData.current);
    }
    const handleFiltaration = (event) => {
        setFilterValue(event.target.value);
    }
    return (
        <>
            {selectedInstructorData[arrName] === undefined || selectedInstructorData[arrName].length === 0 ? <img src={EmptyDataImage} className={InstructorHistoryStyles['no-result']} alt="no-result" /> : <>
                <div className={InstructorHistoryStyles['table-settings-container']}>
                    <Form.Label htmlFor="userAccountFilterTxt" className={InstructorHistoryStyles['filter-label']}>Filter</Form.Label>
                    <Form.Control id="userAccountFilterTxt" className={InstructorHistoryStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />

                    <button type="button" className={InstructorHistoryStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterAccounts(event.target.value)}>Filter <AiFillFilter /></button>
                    <button type="button" className={InstructorHistoryStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>Reset<BiReset /></button>
                </div>
                <div className={InstructorHistoryStyles['table-wrapper']}>
                    {selectedInstructorData[arrName] === undefined || selectedInstructorData[arrName].length === 0 ? <img src={NoResultFiltaration} className={InstructorHistoryStyles['no-result']} alt="no-result" /> : <table className={InstructorHistoryStyles['system-accounts-table']}>
                        <thead>
                            <tr>
                                <th>{col1Name}</th>
                                <th>{col2Name}</th>
                                <th>{col3Name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedInstructorData[arrName].map((stdData) => (
                                <tr key={stdData._id} id={stdData._id}>
                                    <td>{stdData.name}</td>
                                    <td>{stdData.email}</td>
                                    <td>{stdData.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}

                </div>
            </>}
        </>
    )
}
export default InstructorHistory;