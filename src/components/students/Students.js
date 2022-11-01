import React, {  useState,useRef, useCallback } from "react";
import StudentSubscriptionState from "../student_subscription_state/StudentSubscriptionState";
import StudentDetails from "../student_details/StudentDetails";
import studentStyles from "./Students.module.css";
import GreaterThanWhiteImage from "../../assets/images/greater-than-white.png";
import GreaterThanGrayImage from "../../assets/images/greater-than-gray.png";
import LessThanWhiteImage from "../../assets/images/less-than-white.png";
import LessThanGrayImage from "../../assets/images/less-than-gray.png";
import {FaLessThan} from "react-icons/fa";
const Students = () => {
    const [specificStudentJoiningRequestData,setSpecificStudentJoiningRequestData] = useState({});
    const [studentSessionsDetails,setStudentSessionsDetails] = useState([]);
    const [isStudentRequestDataVisible,setIsStudentRequestDataVisible] = useState(true);
    const [isStudentRatelDataVisible,setIsStudentRatelDataVisible] = useState(false);
    const initialStudentSessionsDetails = useRef();
    const [pageNo,setPageNo] = useState([]);
    const [pageNoCopy,setPageNoCopy] = useState([]);
    const [pageNoArrLength,setPageNoArrLength] = useState(-1);
    const [lastPage,setLastPage] = useState(-1);
    const [currentPage,setCurrentPage] = useState(1);

    const handleUpCommingPage = (event) => {
        const id = event.currentTarget.id;
            setCurrentPage(Number(id));
        if(Number(id)>= 2 && Number(id) > currentPage){
            //currentPage+1 
               if(currentPage+1 !== pageNo[pageNo.length-1].index && Number(id) <= pageNo[pageNo.length-1].index  ){
                //if(Number(id) !== pageNo[pageNo.length-1].index){
                    let pageNoCopy = [...pageNo];
                    pageNoCopy.splice(0,1)
                    setPageNo(pageNoCopy);
               }else{
                    if(Number(id) !== pageNoArrLength && Number(id) === 2 && lastPage.index !== 2){
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
         /*
                pageNo.reverse().splice(0,1);
                pageNo.reverse();
                */
                if(currentPage-1 !== 1){
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
             
               /*
                    pageNo.reverse().splice(0,1);
                    pageNo.reverse();
                    */
                 
             
                    if(currentPage-1 !== 1){
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
                if(currentPage > 1)
                setCurrentPage(currentPage-1);
            }
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
                setCurrentPage(currentPage+1);
            }else{
                
                if( currentPage !== pageNoArrLength ){
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
                let pNoCopy = [...pageNoCopy];
                pNoCopy.splice(0,1);
                 setPageNo(pNoCopy);
                 setCurrentPage(currentPage+1);
            }else{
                if(pageNo.length > 2){
                    let pNoCopy = [...pageNo];
                    pNoCopy.splice(0,1);

                     setPageNo(pNoCopy);
                     setCurrentPage(currentPage+1);
                }else{
                    setCurrentPage(currentPage+1);
                }
              
            }
              
        }
       }
       
    }
    return (
        <>
        <div className={studentStyles['students']}>
            <div className={studentStyles['pagination-container']} style={{direction:'rtl'}}>
                { 
               pageNo !== undefined?<ul>
                  {lastPage !== undefined? 
                <button type="button" className={studentStyles['btn']} disabled={currentPage === 1?true:false} style={{cursor: 1 === currentPage?'not-allowed':'pointer' }}  onClick={getThePreviousPages}>
               <img src={currentPage === 1?GreaterThanGrayImage:GreaterThanWhiteImage} alt="GreaterThan"/>
                </button>:null}
                {pageNo.map((pN,index)=>(
                  index < 2 ?
                    <li key={pN.index} id={pN.index} style={{background:Number(currentPage)  === pN.index   ?'#198754':'',color:Number(currentPage)  === pN.index  ?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{pN.index}</li>:null
                ))}
                <li className={studentStyles['pages-separator']}><span>...</span></li>
                {lastPage !== undefined? 
                <li id={lastPage.id} style={{background:Number(currentPage)  === lastPage.index  ?'#198754':'',color:Number(currentPage)  === lastPage.index?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{lastPage.index}</li>:null}
                {lastPage !== undefined?
                <button type="button" className={studentStyles['btn']} disabled={currentPage === lastPage.index?true:false} style={{cursor:currentPage === lastPage.index?'not-allowed':'pointer'}}  onClick={getTheNextPages}>
                    {lastPage !== undefined?<img src={currentPage === lastPage.index?LessThanGrayImage:LessThanWhiteImage} alt="lessThan"/>:null}
                    </button>:null}
               </ul>:null}
                
            </div>
        <div>
        <StudentDetails      studentSessionsDetails={studentSessionsDetails} setStudentSessionsDetails={setStudentSessionsDetails} initialStudentSessionsDetails={initialStudentSessionsDetails} specificStudentJoiningRequestData={specificStudentJoiningRequestData} setSpecificStudentJoiningRequestData={setSpecificStudentJoiningRequestData} setIsStudentRequestDataVisible={setIsStudentRequestDataVisible} setIsStudentRatelDataVisible={setIsStudentRatelDataVisible} isStudentRequestDataVisible={isStudentRequestDataVisible} isStudentRatelDataVisible={isStudentRatelDataVisible} />
        <StudentSubscriptionState       setStudentSessionsDetails={setStudentSessionsDetails} currentPage={currentPage} setPageNoArrLength={setPageNoArrLength} setLastPage={setLastPage} setPageNoCopy={setPageNoCopy} setPageNo={setPageNo}  initialStudentSessionsDetails={initialStudentSessionsDetails} setSpecificStudentJoiningRequestData={setSpecificStudentJoiningRequestData} />
        </div>
        </div>
        </>
    )
}
export default Students