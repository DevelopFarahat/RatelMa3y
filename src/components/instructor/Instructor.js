import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import InstructorStyles from "./instructor.module.css";
import Form from "react-bootstrap/Form";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { AiFillSetting } from "react-icons/ai";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import availableIcon from "../../assets/images/checkmark.png";
import absenceIcon from "../../assets/images/do-not-enter.png";
import GreaterThanWhiteImage from "../../assets/images/greater-than-white.png";
import GreaterThanGrayImage from "../../assets/images/greater-than-gray.png";
import LessThanWhiteImage from "../../assets/images/less-than-white.png";
import LessThanGrayImage from "../../assets/images/less-than-gray.png";
import InstructorWorkHistory from "../instructor_working_history/InstructorWorkHistory";
import { composeInitialProps } from "react-i18next";
const Instructor = () => {
    const [pageNo,setPageNo] = useState([]);
    const [pageNoCopy,setPageNoCopy] = useState([]);
    const [pageNoArrLength,setPageNoArrLength] = useState(-1);
    const [lastPage,setLastPage] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);
    //pagination functinality
    const handleUpCommingPage = (event) => {
        const id = event.currentTarget.id;
            setCurrentPage(Number(id));
        if(Number(id)>= 2 && Number(id) > currentPage){
            //currentPage+1 
               if(currentPage+1 !== pageNo[pageNo.length-1].index && Number(id) <= pageNo[pageNo.length-1].index  ){
                //if(Number(id) !== pageNo[pageNo.length-1].index){
                    let pageNoCopy = [...pageNo];
                    console.log("yaa am farahat rakez");
                    pageNoCopy.splice(0,1)
                    setPageNo(pageNoCopy);
               }else{
                    if(Number(id) !== pageNoArrLength && Number(id) === 2 && lastPage.index !== 2){
                    console.log("yaa rab saadny")
                    let pNoCopy = [...pageNoCopy];
                    pNoCopy.splice(0,1);
                    setPageNo(pNoCopy);
                }
               
               }
        }
  }
    
    const getThePreviousPages = (event)=>{
        let pNo = {};
        if(currentPage < pageNoArrLength  && pageNo.length === 2){ 
            console.log("inshaa allah1")
         /*
                pageNo.reverse().splice(0,1);
                pageNo.reverse();
                */
                if(currentPage-1 !== 1){
                    console.log("insorna yaa allah");
                    pageNo.reverse().splice(0,1);
                    pageNo.reverse();
                    pNo.id = (pageNo[0].index-1)
                    pNo.index = (pageNo[0].index-1)
                    pageNo.unshift(pNo);
                    setPageNo(pageNo);
                }else{
                    setPageNo(pageNoCopy);
                }
                if(currentPage > 1)
                setCurrentPage(currentPage-1);
            
            
        }else{
            if(pageNo.length !== 2){
                console.log("inshaa allah")
                console.log(currentPage)
               /*
                    pageNo.reverse().splice(0,1);
                    pageNo.reverse();
                    */
                    console.log(currentPage)
                    console.log(pageNoCopy)
                    if(currentPage-1 !== 1){
                        console.log("insorna yaa allah");
                        pageNo.reverse().splice(0,1);
                        pageNo.reverse();
                        pNo.id = (pageNo[0].index-1)
                        pNo.index = (pageNo[0].index-1)
                        pageNo.unshift(pNo);
                        setPageNo(pageNo);
                    }else{
                        console.log("mona zaki")
                        console.log(pageNoCopy)
                        setPageNo(pageNoCopy);
                    }
                    if(currentPage > 1)
                    setCurrentPage(currentPage-1);
            }else{
                if(currentPage > 1)
                setCurrentPage(currentPage-1);
            }
            console.log(pageNo);
        }  
    }
    const getTheNextPages = (event)=>{
        let pNo = {};
       if(currentPage+1 <= 2){
        if(currentPage+1 !== pageNo[pageNo.length-1].index && pageNo.length !== 2){
              setCurrentPage(currentPage+1);
           
        }else{
            setPageNo(pageNoCopy);
                setCurrentPage(currentPage+1);
        }
       }else{
        if( currentPage+1   >  pageNo[pageNo.length-1].index){
            if( pageNo.length > 2){
                console.log("ياكريم اكرمنا");
                setCurrentPage(currentPage+1);
            }else{
                
                if( currentPage !== pageNoArrLength ){
                    console.log("hgvplm lk uk")
                    /*
                    let pNoCopy = [...pageNo];
                    pNoCopy.splice(0,1);
                    console.log(pNoCopy);
                     setPageNo(pNoCopy);
                     setCurrentPage(currentPage+1);
                     */
                     pageNo.splice(0,1);
                     
                     pNo.id = (currentPage+1)
                     pNo.index = (currentPage+1)
                     pageNo.push(pNo);
                     setPageNo(pageNo);
                    
                     setCurrentPage(currentPage+1);
                }else{
                
                    setCurrentPage(currentPage+1);
                }
                
            }
            
        }else{
  
          //  if(currentPage === 2 && pageNo.length < 9){
            if(currentPage === 2 && pageNo.length < pageNoArrLength){
                console.log("yaa gamad ya farahat");
                let pNoCopy = [...pageNoCopy];
                pNoCopy.splice(0,1);
                console.log(pNoCopy);
                 setPageNo(pNoCopy);
                 setCurrentPage(currentPage+1);
            }else{
                if(pageNo.length > 2){
                    console.log("ahha")
                    let pNoCopy = [...pageNo];
                    pNoCopy.splice(0,1);
                    console.log(pNoCopy);
                     setPageNo(pNoCopy);
                     setCurrentPage(currentPage+1);
                }else{
                    setCurrentPage(currentPage+1);
                }
              
            }
              
        }
       }
       
    }
    // pagination functionality ended
    const [instructorData, setInstructorData] = useState([]);
    const [instructorSessionsDetails,setInstructorSessionsDetails] = useState([]);
    const initialInstructorSessionsDetails = useRef();
    const [filterValue, setFilterValue] = useState("");
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedInstructorData, setSelectedInstructorData] = useState([]);
    const initialResponse = useRef();
    const initialResponseSpecificInstructorData = useRef();
    const [fetchAgain, setFetchAgain] = useState(0); //Just dummy number to tell that another fetch call is needed

    const handleFiltaration = (event) => {
        console.log(event.target.value);
        setFilterValue(event.target.value);
    };

    const filterStudents = () => {
        let filtarationArr = [];

        for (let i = 0; i < instructorData.length; i++) {
     
            if (instructorData[i].name.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].gender.toLowerCase() === filterValue.toLowerCase()){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].age.toString() === filterValue){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].privileges.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(instructorData[i]);
            }
            else if(instructorData[i].state.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(instructorData[i]);
            }else if(instructorData[i].programs !== null && instructorData[i].programs  !== undefined){
                for(let j = 0 ; j <instructorData[i].programs.length;j++ ){
                    if(instructorData[i].programs[j].toLowerCase().includes(filterValue.toLowerCase())){
                        filtarationArr.push(instructorData[i]);
                    }
                }
                
            }
        }
        filterValue !== ""
            ? setInstructorData(filtarationArr)
            : setInstructorData(initialResponse.current);
    };

    const resetTableFiltaration = () => {
        setFilterValue("");
        setInstructorData(initialResponse.current);

        setFetchAgain(fetchAgain + 1);
    };

    const sortInstructorTable = (event) => {
        let sortedInstructorArr = [...instructorData];

        switch (event.target.value) {
            case "inACall":
                sortedInstructorArr.sort((a, b) => {
                    return Number(b.in_session) - Number(a.in_session);
                });
                break;
            case "offline":
                sortedInstructorArr.sort((a, b) => {
                    return Number(a.in_session) - Number(b.in_session);
                });
                break;
            case "avaliable":
                sortedInstructorArr.sort((a, b) => {
                    console.log("yes man");
                    return Number(b.is_available) - Number(a.is_available);
                });
                break;

            case "notAvailable":
                sortedInstructorArr.sort((a, b) => {
                    return Number(a.is_available) - Number(b.is_available);
                });
                break;
            case "ageDsc":
                sortedInstructorArr.sort((a, b) => {
                    return b.age - a.age;
                });
                break;
            case "ageAsc":
                sortedInstructorArr.sort((a, b) => {
                    return Number(a.age) - Number(b.age);
                });
                break;
            case "startedAtDSC":
                sortedInstructorArr.sort((a, b) => {
                    return (
                        new Date(b.started_at.split("T")[0]).getTime() -
                        new Date(a.started_at.split("T")[0]).getTime()
                    );
                });
                break;

            case "startedAtASC":
                sortedInstructorArr.sort((a, b) => {
                    return (
                        new Date(a.started_at.split("T")[0]).getTime() -
                        new Date(b.started_at.split("T")[0]).getTime()
                    );
                });
                break;

            default:
        }
        setInstructorData(
                sortedInstructorArr

        );
    };
    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);
    const setInstructorAvailability = (event, instructorObji) => {
        let availability = event.currentTarget.id === "available" ? false : true;
        axios
            .put(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${instructorObji._id}`, {
                is_available: availability,
            })
            .then((res) => {
                console.log(res);
                setFetchAgain(fetchAgain + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSpecificInstructorData = (event) => {
        event.stopPropagation();
        axios
            .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors/${event.currentTarget.id}`)
            .then((res) => {
                initialResponseSpecificInstructorData.current = res.data;
                setSelectedInstructorData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
            axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/sessions?user_id=${event.currentTarget.id}&limit=10000000000000000`).then((res)=>{
                initialInstructorSessionsDetails.current = res.data.data;
                setInstructorSessionsDetails(res.data.data);

            }).catch((error)=>{
                console.log(error);
            })

        handlerRowClicked(event);
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACK_HOST_URL}/api/instructors?limit=300&page=${currentPage}`)
            .then((res) => {
                initialResponse.current = res.data.data;
                setInstructorData(res.data.data);
                let pageN =  Math.ceil(res.data.count/300);
                let numOfPages = [];
                for(let i = 0 ; i < pageN;i++){
                  numOfPages.push({id:i+1,index:i+1});
                }
                setPageNoCopy(numOfPages);
                setLastPage(numOfPages[numOfPages.length-1]);
                numOfPages.reverse().splice(numOfPages[numOfPages.length-1],1);
                setPageNoArrLength(numOfPages.length);
                setPageNo(numOfPages.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    }, [fetchAgain,currentPage]);

    return (
        <>
        <div className={InstructorStyles['instructor-main-container']}>


        <div className={InstructorStyles['pagination-container']} style={{direction:'rtl'}}>
                { 
               pageNo !== undefined?<ul>
                <button type="button" className={InstructorStyles['btn']} disabled={currentPage === 1?true:false} style={{cursor: 1 === currentPage?'not-allowed':'pointer',opacity:1 === currentPage?'.5':'1'  }}  onClick={getThePreviousPages}>
               <img src={currentPage === 1?GreaterThanGrayImage:GreaterThanWhiteImage} alt="GreaterThan"/>
                </button>
                {pageNo.map((pN,index)=>(
                  index < 2 ?
                    <li key={pN.index} id={pN.index} style={{background:Number(currentPage)  === pN.index   ?'#c2a054':'',color:Number(currentPage)  === pN.index  ?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{pN.index}</li>:null
                ))}
                <li className={InstructorStyles['pages-separator']}>{"..."}</li>
                {lastPage !== undefined? 
                <li id={lastPage.id} style={{background:Number(currentPage)  === lastPage.index  ?'#c2a054':'',color:Number(currentPage)  === lastPage.index?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{lastPage.index}</li>:null}
                
                <button type="button" className={InstructorStyles['btn']} disabled={currentPage === lastPage.index?true:false} style={{cursor:currentPage === lastPage.index?'not-allowed':'pointer',opacity:currentPage === lastPage.index?'.5':'1' }}  onClick={getTheNextPages}>
                    {lastPage !== undefined?<img src={currentPage === lastPage.index?LessThanGrayImage:LessThanWhiteImage} alt="lessThan"/>:null}
                    </button>
               </ul>:null
                }
            </div>


            <div>
            <InstructorWorkHistory
                setInstructorSessionsDetails={setInstructorSessionsDetails}
                instructorSessionsDetails={instructorSessionsDetails}
                initialInstructorSessionsDetails={initialInstructorSessionsDetails}
                selectedInstructorData={selectedInstructorData}
                initialResponseSpecificInstructorData={
                    initialResponseSpecificInstructorData
                }
                setSelectedInstructorData={setSelectedInstructorData}
            />
            <div className={InstructorStyles["instructor-data-container"]}>
                <div className={InstructorStyles["table-settings-container"]}>
                    <Form.Label
                        htmlFor="instructorFilterTxt"
                        className={InstructorStyles["filter-label"]}
                    >
                        Filter
                    </Form.Label>
                    <Form.Control
                        id="instructorFilterTxt"
                        className={InstructorStyles["filter-txt"]}
                        value={filterValue}
                        onChange={handleFiltaration}
                    />
                    <Form.Select id="instructor-sort-select" onChange={sortInstructorTable}>
                        <option value="">Select</option>
                        <optgroup label="By Instructor Status">
                            <option value="inACall">In a Call</option>
                            <option value="offline">Offline</option>
                        </optgroup>
                        <optgroup label=" By Availability">
                            <option value="avaliable">Avaliable</option>
                            <option value="notAvailable">Not Available</option>
                        </optgroup>
                        <optgroup label="By Age">
                            <option value="ageDsc">DSC</option>
                            <option value="ageAsc">ASC</option>
                        </optgroup>
                        <optgroup label="Started At">
                            <option value="startedAtDSC">DSC</option>
                            <option value="startedAtASC">ASC</option>
                        </optgroup>
                    </Form.Select>
                    <button
                        type="button"
                        className={InstructorStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={(event) => filterStudents(event.target.value)}
                    >
                        Filter <AiFillFilter />
                    </button>
                    <button
                        type="button"
                        className={InstructorStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={resetTableFiltaration}
                    >
                        Reset
                        <BiReset />
                    </button>
                </div>

                <div className={InstructorStyles["table-wrapper"]}>
                    {instructorData?.length === 0 ? (
                        <img
                            src={NoResultFiltaration}
                            className={InstructorStyles["no-result"]}
                            alt="no-result"
                        />
                    ) : (
                        <table className={InstructorStyles["instructor-table"]}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Students N</th>
                                    <th>Sessions N</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>State</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Started At</th>
                                    <th>Is Available</th>
                                    <th>In Session</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instructorData?.map((instructData) => (
                                    <tr
                                        key={instructData._id}
                                        id={instructData._id}
                                        onClick={(event) => {
                                            getSpecificInstructorData(event);
                                        }}
                                        style={{
                                            background:
                                                selectedRow === instructData._id ? "#038674" : "",
                                            color: selectedRow === instructData._id ? "#FFFFFF" : "",
                                            boxShadow:
                                                selectedRow === instructData._id
                                                    ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)`
                                                    : "",
                                        }}
                                    >
                                        <td>{instructData.name}</td>
                                        <td>{instructData.students.length}</td>
                                        <td>{instructData.sessions.length}</td>
                                        <td>{instructData.age}</td>
                                        <td>{instructData.gender}</td>
                                        <td>{instructData.state}</td>
                                        <td>{instructData.email}</td>
                                        <td>{instructData.mobile}</td>
                                        <td>
                                            <span>{instructData.started_at.split("T")[0]}</span>
                                        </td>
                                        <td>
                                            {instructData.is_available ? (
                                                <img
                                                    src={availableIcon}
                                                    className={InstructorStyles["available-img"]}
                                                    id="available"
                                                    alt="available"
                                                    onClick={(event) =>
                                                        setInstructorAvailability(event, instructData)
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src={absenceIcon}
                                                    className={InstructorStyles["absence-img"]}
                                                    id="absence"
                                                    onClick={(event) =>
                                                        setInstructorAvailability(event, instructData)
                                                    }
                                                    alt="not-here"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {instructData.in_session ? (
                                                <div
                                                    className={InstructorStyles["online-sessions"]}
                                                ></div>
                                            ) : (
                                                <div
                                                    className={
                                                        InstructorStyles["offline-instructor-sessions"]
                                                    }
                                                ></div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            </div>
            </div>
        </>
    );
};
export default Instructor;
