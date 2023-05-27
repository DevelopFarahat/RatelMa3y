import React, { useEffect, useState,useCallback,useRef } from "react";
import MessagesStyles from "./messages.module.css";
import Form from "react-bootstrap/Form";
import EmptyDataImage from "../../assets/images/empty.png";
import NoResultFiltaration from "../../assets/images/no-result.png";
import GreaterThanWhiteImage from "../../assets/images/greater-than-white.png";
import GreaterThanGrayImage from "../../assets/images/greater-than-gray.png";
import LessThanWhiteImage from "../../assets/images/less-than-white.png";
import LessThanGrayImage from "../../assets/images/less-than-gray.png";
import MessagesIcon from "../../assets/images/messages.png";
import { useTranslation } from "react-i18next";
import WarningIcon from "../../assets/images/warning.png";
import {AiFillFilter} from "react-icons/ai";
import {BiReset} from "react-icons/bi";
import CircleGif from "../../assets/images/check-circle.gif";
import Spinner from 'react-bootstrap/Spinner';
import {FaTrash} from "react-icons/fa";
import axios from "axios";
const Messages = ()=>{
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
    // pagination functionality ended
    const [t, i18n] = useTranslation();
    const [messages,setMessages] = useState([]);
    const [changeableMsg,setChangeableMsg] = useState([]);
    const [msgContent,setMsgContent] = useState("");
    const [selectedRow, setSelectedRow] = useState(-1);
    const [fetchAgain,setFetchAgain] = useState(0);
    const [filterValue, setFilterValue] = useState("");
    const [deleteAlertConfirmation, setAlertDeleteConfirmation] = useState(false);
    const [donnotAskmeAgain, setDonotAskmeAgain] = useState(false);
    const [donnotAskmeAgainChecked, setDonotAskmeAgainChecked] = useState(false);
    const [isUserDeleteAnyMsg,setIsUserDeleteAnymsg] = useState(false);
    const initialResponse = useRef();
    
const [isUserConfirmedDeletion,setisUserConfirmedDeletion] = useState(false);


    const handleDonnotAskmeAgainChange = (event) => {
        setDonotAskmeAgainChecked(current => !current);
        if (event.target.checked) {
          setDonotAskmeAgain(true);
        } else {
          setDonotAskmeAgain(false);
        }
      }
    const handlerRowClicked = useCallback((event,msg,messageObjiArrIndex) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
        showMessageContentAndMarkItAsReadedMsg(msg,messageObjiArrIndex);
    }, [selectedRow,messages]);
    const filterMessages = () => {
        let filtarationArr = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].name.toLowerCase().includes(filterValue.toLowerCase())){
                filtarationArr.push(messages[i]);
            }  else if (messages[i].status.toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(messages[i]);
            }
            else if (messages[i].date.split("T")[0].toLowerCase().includes(filterValue.toLowerCase())) {
                filtarationArr.push(messages[i]);
            }
        }
        filterValue !== ""
            ? setMessages(filtarationArr)
            : setMessages(initialResponse.current)
    };
    const resetTableFiltaration = () => {
        setFilterValue("");
        setMessages(initialResponse.current);
    };
    const handleFiltaration = (event) => {
        setFilterValue(event.target.value);
    };
    const sortMessages = (event)=>{
        let messagesCopy = [...messages];
        for(let i = 0;i< messagesCopy.length;i++){
            if(messagesCopy[i].status === "Read"){
                messagesCopy[i].precedence = 0;
            }else{
                messagesCopy[i].precedence = 1;
            }
        }
        switch(event.target.value){
            case "Read":
                messagesCopy.sort((a_messages,b_messages)=>{
                    return a_messages.precedence - b_messages.precedence;
                });
                break;
                case "Unread":
                    messagesCopy.sort((a_messages,b_messages)=>{
                        return b_messages.precedence - a_messages.precedence;
                    });
                    break;
                    case "ASC":
                    messagesCopy.sort((a_messages,b_messages)=>{
                            return new Date(a_messages.date.split("T")).getTime() - new Date(b_messages.date.split("T")).getTime();
                    });
                    break;
                    case "DSC":
                    messagesCopy.sort((a_messages,b_messages)=>{
                    return new Date(b_messages.date.split("T")).getTime() - new Date(a_messages.date.split("T")).getTime();
                    });
                    break;
                    default:
                            
        }
        setMessages(messagesCopy);
    }

    const showMessageContentAndMarkItAsReadedMsg = (msg,messageObjiArrIndex)=>{
        setMsgContent(msg.content);
      if(msg.status === 'Unread'){
          axios.put(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts/${msg._id}`,{status:'Read'},{headers:{'Access-Control-Allow-Origin': '*'}}).then((res)=>{
          }).catch((error)=>{
              console.log(error);
          });
          msg = {
              ...msg,
              status:'Read'
          }
          const messagesCopy = [...messages];
          messagesCopy[messageObjiArrIndex] = msg;
          for(let i = 0;i< messagesCopy.length;i++){
              if(messagesCopy[i].status === "Read"){
                  messagesCopy[i].precedence = 0;
              }else{
                  messagesCopy[i].precedence = 1;
              }
          }
          messagesCopy.sort((a,b)=>{
              return b.precedence - a.precedence;
          })
          setMessages(messagesCopy);
          
      }
    }
    const deleteMessage = (event,msg)=>{
        event.stopPropagation();
        if (msg !== undefined) {
            setChangeableMsg(msg);
          }
          if (donnotAskmeAgain === false || event.currentTarget.value === 'confirm') {
            if (event.currentTarget.value === 'cancel') {
              setAlertDeleteConfirmation(false);
            } else {
              setAlertDeleteConfirmation(true);
            }
      
          } else {
            setAlertDeleteConfirmation(false);
          }
        if (event.currentTarget.value === 'confirm' || donnotAskmeAgain === true) {
        let chMsg = msg === undefined ? changeableMsg : msg;
      setisUserConfirmedDeletion(true);
        axios.delete(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts/${chMsg._id}`).then((res)=>{
        setAlertDeleteConfirmation(false);
        setFetchAgain(fetchAgain+1);
        setIsUserDeleteAnymsg(true);
        setMsgContent('');
        setTimeout(()=>{
            setIsUserDeleteAnymsg(false);
        },1000)
        setisUserConfirmedDeletion(false);
        }).catch((error)=>{
    
        })
    }
    }
    useEffect(()=>{
        let abortController;
        abortController = new AbortController();
        (async ()=>{
            let signal = abortController.signal;
            axios.get(`${process.env.REACT_APP_BACK_HOST_URL}/api/contacts?limit=300&page=${currentPage}`,{signal:signal},{headers:{'Access-Control-Allow-Origin': '*'}}).then((res)=>{
                let messagesResponse = res.data.data;
                for(let i = 0;i< messagesResponse.length;i++){
                    if(messagesResponse[i].status === "Read"){
                        messagesResponse[i].precedence = 0;
                    }else{
                        messagesResponse[i].precedence = 1;
                    }
                }
                messagesResponse.sort((a,b)=>{
                    return b.precedence - a.precedence;
                })
                setMessages(messagesResponse);
                initialResponse.current = res.data.data;
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
                }).catch((error)=>{
                    console.log(error);
                })
        })();
        return ()=>abortController?.abort();
    },[fetchAgain,currentPage])
    return(

        <>
        {isUserDeleteAnyMsg?<>
            <div className={MessagesStyles["alert"]}>
              <img src={CircleGif} alt="successfull" />
              <span>
                <span style={{ fontWeight: "bold", color: "#198754" }}>
                  {localStorage.getItem("user_name")}
                </span>{" "}
                {t("Has Deleted Message Successfull")}
              </span>
            </div></>:null}
            {deleteAlertConfirmation ? <div className={`${MessagesStyles["alert"]} ${MessagesStyles["warning-alert"]}`}>
            {!isUserConfirmedDeletion?<><section>
          <img src={WarningIcon} alt="warning" />
          <span>{t("are you sure you want to delete this account")}</span>
        </section>
        <section style={{width:t("us")===t("Us")?'98%':'88%'}}>
          <Form.Check checked={donnotAskmeAgainChecked} name="dontAskmeAgain" id="donotAskmeAgain" onChange={handleDonnotAskmeAgainChange} />
          <Form.Label htmlFor="donotAskmeAgain">{t("don't ask me again!")}</Form.Label>
        </section>
        <section style={{direction:t("us")===t("Us")?'ltr':'rtl'}}>
          <button type="submit" className={MessagesStyles['btn']} value={"confirm"} onClick={deleteMessage}>{t("confirm")}</button>
          <button type="submit" value={"cancel"} className={MessagesStyles['btn']} onClick={deleteMessage}>{t("cancel")}</button>
        </section></>:<div className={MessagesStyles['loading-deletion-spiner-container']}>
          <section>
          <Spinner animation="border" role="status" size="xl" style={{color:'#198754'}}/>
          </section>
          <span>{t("Scanning.....")}</span>
        </div>}
      </div> : null}
        <div className={MessagesStyles['messages-main']}>
        <div className={MessagesStyles['pagination-container']} style={{direction:'rtl'}}>
           
                
               {pageNo !== undefined?<ul>
                {lastPage !== undefined?
                <button type="button" className={MessagesStyles['btn']} disabled={currentPage === 1?true:false} style={{cursor: 1 === currentPage?'not-allowed':'pointer'}}  onClick={getThePreviousPages}>
               <img src={currentPage === 1?GreaterThanGrayImage:GreaterThanWhiteImage} alt="GreaterThan"/>
                </button>:null}
                {pageNo.map((pN,index)=>(
                  index < 2 ?
                    <li key={pN.index} id={pN.index} style={{background:Number(currentPage)  === pN.index   ?'#198754':'',color:Number(currentPage)  === pN.index  ?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{pN.index}</li>:null
                ))}
                <li className={MessagesStyles['pages-separator']}><span>...</span></li>
                {lastPage !== undefined? 
                <li id={lastPage.id} style={{background:Number(currentPage)  === lastPage.index  ?'#198754':'',color:Number(currentPage)  === lastPage.index?'#FFFFFF':''}}  onClick={handleUpCommingPage}>{lastPage.index}</li>:null}
                {lastPage !== undefined?
                <button type="button" className={MessagesStyles['btn']} disabled={currentPage === lastPage.index?true:false} style={{cursor:currentPage === lastPage.index?'not-allowed':'pointer' }}  onClick={getTheNextPages}>
                    {lastPage !== undefined?<img src={currentPage === lastPage.index?LessThanGrayImage:LessThanWhiteImage} alt="lessThan"/>:null}
                    </button>:null}
               </ul>:null}
              
            </div>
        <div>
        <div className={MessagesStyles['messages-content-main-container']}>
            <div className={MessagesStyles['messages-icon-container']}>
                <img   src={MessagesIcon} alt="messages_icon"/>
            </div>
            {msgContent?
            <p className={MessagesStyles['msg-content']}>
                {msgContent}
            </p>:<img className={MessagesStyles["no-result"]} src={EmptyDataImage} alt="empty"/>}
        </div>
        <div className={MessagesStyles['all-messages-main-container']} style={{direction:t("us")=== t("Us")?'ltr':'rtl'}}>
        <div className={MessagesStyles["table-settings-container"]}>
            <section>
            <Form.Label
                    style={{textAlign:t("us")=== t("Us")?'left':'right'}}
                        htmlFor="messagesFilterTxt"
                        className={MessagesStyles["filter-label"]}
                    >
                        {t("filter_label")}
                    </Form.Label>
                    <Form.Control
                        id="messagesFilterTxt"
                        className={MessagesStyles["filter-txt"]}
                        value={filterValue}
                        onChange={handleFiltaration}
                    />
            </section>
            <section>
            <Form.Label style={{textAlign:t("us")=== t("Us")?'start':'end'}}>{t("sort")}</Form.Label>
                    <Form.Select onChange={sortMessages} style={{textAlign:t("us")=== t("Us")?'start':'end'}}>
                        <option value="">{t("select")}</option>
                        <optgroup label={t("status")}>
                        <option value="Read">{t("read")}</option>
                        <option value="Unread">{t("unread")}</option>
                        </optgroup>
                        <optgroup label={t("messageDate")}>
                            <option value="ASC">{t("asc")}</option>
                            <option value="DSC">{t("dsc")}</option>
                        </optgroup>
                    </Form.Select>
                </section>
                <section>
                <button
                        type="button"
                        className={MessagesStyles["btn"]}
                        style={{ marginTop: "auto",direction: 'ltr' }}
                        onClick={(event) => filterMessages(event.target.value)}
                    >
                        {t("filter_btn")} <AiFillFilter />
                    </button>
                    <button
                        type="button"
                        className={MessagesStyles["btn"]}
                        style={{ marginTop: "auto",direction: 'ltr' }}
                        onClick={resetTableFiltaration}
                    >
                        {t("reset")}
                        <BiReset style={{marginInline: 8}}/>
                    </button>
                </section>
                </div>
        <div className={MessagesStyles["table-wrapper"]} style={{justifyContent:messages.length !== 0?'flex-start':'center',alignItems:messages.length !== 0?'flex-start':'center'}}>
               
                    {messages.length === 0 || messages === undefined  ? (
                        <>
                          <img
                            src={NoResultFiltaration}
                            className={MessagesStyles["no-result"]}
                            alt="no-result"
                        />
                        {lastPage === -1?<span>{t("Loading Data.....")}</span>:<span>{t("No data found")}</span>}
                        </>
                      
                    ) : (
                        <table
                            className={MessagesStyles["messages-table"]}
                            
                        >
                            <thead>
                                <tr>
                                    <th>{t("name")}</th>
                                    <th>{t("email")}</th>
                                    <th>{t("mobile")}</th>
                                    <th>{t("messageDate")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("settings")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((ms,index) => (
                                    <tr key={ms._id} id={ms._id} onClick={(event)=>handlerRowClicked(event,ms,index)}  style={{ background: selectedRow === ms._id ? '#198754' : '', color: selectedRow === ms._id ? '#FFFFFF' : '', boxShadow: selectedRow === ms._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                        <td>{ms.name}</td>
                                        <td>{ms.email}</td>
                                        <td>{ms.phone}</td>
                                        <td>{ms.date.split("T")[0]}</td>
                                        <td>{ms.status}</td>
                                        {!deleteAlertConfirmation && changeableMsg._id === ms._id && isUserConfirmedDeletion === true?<td style={{color:'#E8110F'}}>{t("Scanning.....")}</td>:<td><FaTrash  onClick={(event)=>deleteMessage(event,ms)}/></td>}
                                        
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
    )
}
export default Messages;