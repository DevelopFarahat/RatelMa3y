import React, { useEffect, useState,useCallback,useRef } from "react";
import MessagesStyles from "./messages.module.css";
import Form from "react-bootstrap/Form";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { useTranslation } from "react-i18next";
import {AiFillFilter} from "react-icons/ai";
import {BiReset} from "react-icons/bi";
import axios from "axios";
const Messages = ()=>{
    const [t, i18n] = useTranslation();
    const [isArabic, setIsArabic] = useState(false);
    useEffect(() => {
        setIsArabic(localStorage.getItem("i18nextLng") === "ar");
    }, [localStorage.getItem("i18nextLng")]);
    const [messages,setMessages] = useState([]);
    const [msgContent,setMsgContent] = useState("");
    const [selectedRow, setSelectedRow] = useState(-1);
    const [filterValue, setFilterValue] = useState("");
    const initialResponse = useRef();



    const handlerRowClicked = useCallback((event) => {
        const id = event.currentTarget.id;
        setSelectedRow(id);
    }, []);
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
    const sortMessages = (sortType)=>{
        let messagesCopy = [...messages];
        for(let i = 0;i< messagesCopy.length;i++){
            if(messagesCopy[i].status === "Read"){
                messagesCopy[i].precedence = 0;
            }else{
                messagesCopy[i].precedence = 1;
            }
        }
        switch(sortType){
            case "Read":
                messagesCopy.sort((a_messages,b_messages)=>{
                    return a_messages.precedence - b_messages.precedence;
                });
                break;
                case "Unread":
                    messagesCopy.sort((a_messages,b_messages)=>{
                        return a_messages.precedence - b_messages.precedence;
                    });
                    break;
                    case "ASC":
                    messagesCopy.sort((a_messages,b_messages)=>{
                            return new Date(a_messages).getTime() - new Date(b_messages).getTime();
                    });
                    break;
                    case "DSC":
                    messagesCopy.sort((a_messages,b_messages)=>{
                    return new Date(b_messages).getTime() - new Date(a_messages).getTime();
                    });
                    break;
                    default:
                            
        }
        setMessages(messagesCopy);
    }
    const showMessageContentAndMarkItAsReadedMsg = (msg)=>{

       
    }
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/contacts`).then((res)=>{
        setMessages(res.data.data);
        initialResponse.current = res.data.data;
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    return(
        <>
        <div className={MessagesStyles['messages-content-main-container']}>
            <p></p>
        </div>
        <div className={MessagesStyles['all-messages-main-container']}>
        <div className={MessagesStyles["table-settings-container"]}>
                    <Form.Label
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
                    <Form.Label>Sort</Form.Label>
                    <Form.Select onChange={sortMessages}>
                        <option value="">Select</option>
                        <optgroup label="By Message Status">
                        <option value="Read">Read</option>
                        <option value="Unread">Unread</option>
                        </optgroup>
                        <optgroup label="By Date">
                            <option value="ASC">ASC</option>
                            <option value="DSC">DSC</option>
                        </optgroup>
                    </Form.Select>
                    <button
                        type="button"
                        className={MessagesStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={(event) => filterMessages(event.target.value)}
                    >
                        {t("filter_btn")} <AiFillFilter />
                    </button>
                    <button
                        type="button"
                        className={MessagesStyles["btn"]}
                        style={{ marginTop: "auto" }}
                        onClick={resetTableFiltaration}
                    >
                        {t("reset_btn")}
                        <BiReset />
                    </button>
                </div>
        <div className={MessagesStyles["table-wrapper"]}>
                 
                    {messages.length === 0 ? (
                        <img
                            src={NoResultFiltaration}
                            className={MessagesStyles["no-result"]}
                            alt="no-result"
                        />
                    ) : (
                        <table
                            className={MessagesStyles["messages-table"]}
                            
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((ms) => (
                                    <tr key={ms._id} id={ms._id} onClick={handlerRowClicked}  style={{ background: selectedRow === ms._id ? '#038674' : '', color: selectedRow === ms._id ? '#FFFFFF' : '', boxShadow: selectedRow === ms._id ? `rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)` : '' }}>
                                        <td>{ms.name}</td>
                                        <td>{ms.email}</td>
                                        <td>{ms.phone}</td>
                                        <td>{ms.date.split("T")[0]}</td>
                                        <td>{ms.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
        </div>
        </>
    )
}
export default Messages;