import react, { useState,useCallback } from "react";
import InstructorHistoryStyles from "./instructorHistory.module.css";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
const InstructorHistory = ({col1Name,col2Name,col3Name,arrName,selectedInstructorData,initialResponseSpecificInstructorData, setSelectedInstructorData }) => {
    const [t, i18n] = useTranslation();
    const [filterValue, setFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(-1);
    const filterAccounts = () => {
        
        let filtarationArr = [];

        for (let i = 0; i < selectedInstructorData[arrName].length; i++) {

            if (selectedInstructorData[arrName][i].name.toLowerCase().includes(filterValue.toLowerCase())) {
          
                filtarationArr.push(selectedInstructorData[arrName][i]);

            }
            else if ( selectedInstructorData[arrName][i].email.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(selectedInstructorData[arrName][i]);
            }
        }
        if (filtarationArr.length !== 0) {



           
        }
        filterValue !== '' ? setSelectedInstructorData({ ...selectedInstructorData, students: filtarationArr }) : setSelectedInstructorData(selectedInstructorData);


    }

    const resetTableFiltaration = () => {
        setFilterValue('');
    
        setSelectedInstructorData(initialResponseSpecificInstructorData.current);
    }
    const handleFiltaration = (event) => {
        setFilterValue(event.target.value);
    }
    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);
    return (
        <>
            {selectedInstructorData[arrName] === undefined || selectedInstructorData[arrName].length === 0 ? <img src={EmptyDataImage} className={InstructorHistoryStyles['no-result']} alt="no-result" /> : <>
                <div className={InstructorHistoryStyles['table-settings-container']} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
                    <section>
                    <Form.Label htmlFor="userAccountFilterTxt" className={InstructorHistoryStyles['filter-label']} style={{textAlign:t("us")=== t("Us")?'left':'right'}}>{t("filter")}</Form.Label>
                    <Form.Control id="userAccountFilterTxt" className={InstructorHistoryStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />
                    </section>
                    <section>
                    <button type="button" className={InstructorHistoryStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterAccounts(event.target.value)}>{t("filter")} <AiFillFilter /></button>
                    <button type="button" className={InstructorHistoryStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>{t("reset")}<BiReset /></button>
                    </section>
                </div>
                <div className={InstructorHistoryStyles['table-wrapper']} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
                    {selectedInstructorData[arrName] === undefined || selectedInstructorData[arrName].length === 0 ? <img src={NoResultFiltaration} className={InstructorHistoryStyles['no-result']} alt="no-result" /> : <table className={InstructorHistoryStyles['system-accounts-table']}>
                        <thead>
                            <tr>
                                <th>{t("name")}</th>
                                <th>{t("email")}</th>
                                <th>{t("mobile")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedInstructorData[arrName].map((stdData) => (
                                <tr key={stdData._id} id={stdData._id} onClick={handlerRowClicked} style={{ background: selectedRow === stdData._id ? '#198754' : '', color: selectedRow === stdData._id ? '#FFFFFF' : '', boxShadow: selectedRow === stdData._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
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