
import React, { useState, useCallback, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { IoIosPersonAdd } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import SystemUsersStyles from "./SystemUsers.module.css";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { TbChevronDownLeft, TbPlayerTrackNext } from "react-icons/tb";
import { ImPrevious2 } from "react-icons/im";
import axios from "axios";
import { object } from "yup";
const SystemUsers = () => {
    let listOfCountries = [
        { id: 0, name: "Egypt" },
        { id: 1, name: "Kuwait" },
        { id: 2, name: "Lebanon" },
        { id: 3, name: "Libya" },
        { id: 4, name: "Oman" },
        { id: 5, name: "Qatar" },
        { id: 6, name: "Saudi Arabia" },
        { id: 7, name: "Syria" },
        { id: 8, name: "United Arab Emirates" }

    ]
    let namesOfDaysOfTheWeek = [
        { id: 0, name: "Saturday", att: 'working_days' },
        { id: 1, name: "Sunday", att: 'working_days' },
        { id: 2, name: "Monday", att: 'working_days' },
        { id: 3, name: "Tuesday", att: 'working_days' },
        { id: 4, name: "Wednesday", att: 'working_days' },
        { id: 5, name: "Thursday", att: 'working_days' },
        { id: 6, name: "Friday", att: 'working_days' }
    ];
    let workingHoursArr = [
        ["8:00 am", "10:00 pm"],
        ["10:00 am", "12:00 pm"],
        ["12:00 pm", "2:00 pm"],
        ["2:00 pm", "4:00 pm"],
        ["4:00 pm", "6:00 pm"],
        ["6:00 pm", "8:00 pm"],
        ["8:00 pm", "10:00 pm"],
        ["10:00 pm", "12:00 am"]
    ]
    let workingHoursCheckedValuesArr = [

        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1],
        [0, 1]


    ]

    let Working_hours = [


        { id: 0, appointment: " 8:00 am to 10:00 pm", att: "h0" },
        { id: 1, appointment: " 10:00 am to 12:00 pm", att: "h1" },
        { id: 2, appointment: " 12:00 pm to 2:00 pm", att: "h2" },
        { id: 3, appointment: " 2:00 pm to 4:00 pm", att: "h3" },
        { id: 4, appointment: " 4:00 pm to 6:00 pm", att: "h4" },
        { id: 5, appointment: " 6:00 pm to 8:00 pm", att: "h5" },
        { id: 6, appointment: " 8:00 pm to 10:00 pm", att: "h6" },
        { id: 7, appointment: " 10:00 pm to 12:00 am", att: "h7" }
    ];

    let programs = [
        { id: 0, programName: "Recitation" },
        { id: 1, programName: "Noor Bayan" },
        { id: 2, programName: "Memorizing" }

    ]
    /*
        let systemDataAccountsArr = [{ id: 1, username: "devfarahat", fullname: "mohamed farahat", privilege: "instructor", mobile: "01150849567" }
            , { id: 2, username: "codeLoop", fullname: "mohamed gamal", privilege: "admin", mobile: "0119798663" },
        { id: 3, username: "rashed123", fullname: "mohamed rashed", privilege: "supervisor", mobile: "012966788974" },
        { id: 4, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 5, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 6, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 7, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 8, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 9, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 10, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 11, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 12, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 13, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 14, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 15, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 16, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
        { id: 17, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" }];
    */
        const [isArabic, setIsArabic] = useState(false);
        useEffect(() => {
          setIsArabic(localStorage.getItem("i18nextLng")==='ar');
        }, [localStorage.getItem("i18nextLng")]);
      
        const styles = {
          body: {
            direction: isArabic ? "rtl" : "ltr",
          },
        };
    const [accountsData, setAccountsData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [workingDays, setWorkingDays] = useState({
        d0: '',
        d1: '',
        d2: '',
        d3: '',
        d4: '',
        d5: '',
        d6: '',
    });
    const [WorkingHours, setWorkingHours] = useState({
        h0: '',
        h1: '',
        h2: '',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
        h7: ''
    });
    const [checkedHours, setCheckedHours] = useState({
        h0: false,
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
        h7: false
    });
    const [systemUsersFormSteps, setSystemUsersFormSteps] = useState({
        firstStep: false,
        secondStep: true,
        thirdStep:false
    });
    const [checkedDays, setCheckedDays] = useState({
        d0: false,
        d1: false,
        d2: false,
        d3: false,
        d4: false,
        d5: false,
        d6: false
    });
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        gender: '',
        age: '',
        state: '',
        started_at: '',
        prefs: {
            working_hours: [],
            working_days: [],
        },
        password: '',
        mobile: '',
        programs: '',
        privileges: ''
    });
    const [errors, setErrors] = useState({
        emailError: '',
        nameError: '',
        ageError: '',
        genderError: '',
        stateError: '',
        started_atError: '',
        working_hoursError: '',
        working_daysError: '',
        privilegesError: '',
        mobileError: '',
        programsError: '',
        passwordError: '',

    });

    const [fetchAgain, setFetchAgain] = useState(0)           //Just dummy number to tell that another fetch call is needed

    const handleChange = (event) => {
        if (event.target.id !== 'age') {
            setUserData({
                ...userData,
                [event.target.id]: event.target.value,
            }
            )
        } else {
            setUserData({
                ...userData,
                age: Number(event.target.value),
            }
            )
        }
        errorHandle(event.target.id, event.target.value);
    }

    const handleAppointmentInDays = (event) => {
        setCheckedDays({ ...checkedDays, [event.target.id]: !checkedDays[event.target.id] })
        if (event.target.checked) {
            setWorkingDays({

                ...workingDays,
                [event.target.id]: event.target.value


            })
        } else {
            let workingDaysCloneObji = workingDays;

            let arr = Object.values(workingDaysCloneObji);
            arr.splice(event.target.value, 1);
            setWorkingDays(arr);
        }

    }
    const handleApoointmentInHours = (event) => {
        setCheckedHours({ ...checkedHours, [event.target.id]: !checkedHours[event.target.id] });
        if (event.target.checked) {
            setWorkingHours({
                ...WorkingHours,
                [event.target.id]: workingHoursCheckedValuesArr[event.target.value]
            })
        } else {
            let workingHoursCloneObji = WorkingHours;
            let arr = Object.values(workingHoursCloneObji);

            arr[event.target.value] = [0, 0];
            setWorkingHours(arr);
        }
    }
    const errorHandle = (filed, value) => {
        if (filed === 'email') {
            const emailRegx = /^[A-Z a-z]+[0-9]*@[A-Z a-z]+.com$/;
            setErrors({
                ...errors,
                emailError: value.length === 0 ? 'Email Is Required' : emailRegx.test(value) ? null : 'Email Must Contain @ and end with .com'
            });
        } else if (filed === 'mobile') {
            const mobileRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
            setErrors({
                ...errors,
                mobileError: value.length === 0 ? 'Mobile Is Required' : mobileRegx.test(value) ? null : 'Mobile Must Start With Country Code with 01 and consists of 11 digit'
            });

        }

        else if (filed === 'name') {
            const nameRegx = /[a-z A-Z]{3,}\s{1}[a-z A-Z]{3,}$/;
            setErrors({
                ...errors,
                nameError: value.length === 0 ? 'Fullname Is Required' : nameRegx.test(value) ? null : 'Fullname  must contain a white space and min length of 3 characters'
            });
        }
        else if (filed === 'age') {
            setErrors({
                ...errors,
                ageError: value.length === 0 ? 'Age Is Required' : ''
            });
        }
        else if (filed === 'gender') {
            setErrors({
                ...errors,
                genderError: value.length === 0 ? 'Gender Is Required' : ''
            });
        }
        else if (filed === 'programs') {
            setErrors({
                ...errors,
                programsError: value.length === 0 ? 'Programs Is Required' : ''
            });
        }
        else if (filed === 'password') {
            const passwordRegx = /([0-9]|[a-zA-Z])+([0-9]|[a-zA-Z]){7}/;
            setErrors({
                ...errors,
                passwordError: value.length === 0 ? 'password Is Required' : passwordRegx.test(value) ? null : 'password must be  characters or digits and  length of 8'
            });
        }
        else if (filed === 'privileges') {
            setErrors({
                ...errors,
                privilegesError: value.length === 0 ? 'Privileges Is Required' : null
            });
        }
        else if (filed === 'state') {

            setErrors({
                ...errors,
                stateError: value.length === 0 ? 'State Is Required' : ''
            });
        }
        else if (filed === 'started_at') {

            setErrors({
                ...errors,
                started_atError: value.length === 0 ? 'Started At  Is Required' : ''
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (workingDays.d0 === '' && workingDays.d1 === '' && workingDays.d2 === '' && workingDays.d3 === '' && workingDays.d4 === '' && workingDays.d5 === '' && workingDays.d6 === '') {

            setErrors({
                ...errors,
                working_daysError: 'Choose At Least One Day',
                working_hoursError: ''
            })
        }
        else if (WorkingHours.h0 === '' && WorkingHours.h1 === '' && WorkingHours.h2 === '' && WorkingHours.h3 === '' && WorkingHours.h4 === '' && WorkingHours.h5 === '' && WorkingHours.h6 === '' && WorkingHours.h7 === '') {
            setErrors({
                ...errors,
                working_daysError: '',
                working_hoursError: 'Choose At Least One Hour'
            })
        } else {
            setErrors({
                ...errors,
                working_hoursError: '',
                working_daysError: ''
            })
        }
        let wD = [];
        for (let i = 0; i < Object.values(workingDays).length; i++) {
            if (Object.values(workingDays)[i] !== '') {
                wD.push(Number(Object.values(workingDays)[i]));
            }

        }
        let wHours = [];

        for (let i = 0; i < Object.values(WorkingHours).length; i++) {
            if (Object.values(WorkingHours)[i] === '') {
                let emptyWorkingHourInitialValue = Object.values(WorkingHours)[i] = [0, 0];
                wHours.push(emptyWorkingHourInitialValue);
            } else {
                wHours.push(Object.values(WorkingHours)[i])
            }
        }
        setUserData({
            ...userData,
            prefs: {
                working_days: wD,
                working_hours: wHours
            }

        })


        let finalUser = {
            ...userData,
            prefs: {
                working_days: wD,
                working_hours: wHours
            }
        }
        
         axios.post(`https://ratel-may.herokuapp.com/api/instructors`, finalUser).then((res) => {
             console.log(res.data)
             console.log(userData);
         }).catch((error) => {
             console.log(error.message);
         });
     
    }



    const filterAccounts = () => {
        console.log(filterValue);
        let filtarationArr = [];
        for (let i = 0; i < accountsData.length; i++) {

            if (filterValue.toLowerCase() === accountsData[i].username.toLowerCase()) {
                filtarationArr.push(accountsData[i]);

            }
            else if (filterValue.toLowerCase() === accountsData[i].fullname.toLowerCase()) {
                filtarationArr.push(accountsData[i]);
            }
            else if (filterValue.toLowerCase() === accountsData[i].privileges.toLowerCase()) {
                filtarationArr.push(accountsData[i]);
            }
        }
        filterValue !== '' ? setAccountsData(filtarationArr) : setAccountsData(accountsData);


    }
    const resetTableFiltaration = () => {
        setFilterValue('');
        setAccountsData(accountsData);
    }
    const handleFiltaration = (event) => {
        setFilterValue(event.target.value);
        console.log(userData);
    }
    const systemUsersNextStep = (event) => {
        event.preventDefault();
        event.target.id === 'firstStep' ? setSystemUsersFormSteps({ firstStep: true, secondStep: false,thirdStep:false }) :event.target.id === 'secondStep'? setSystemUsersFormSteps({ firstStep: false, secondStep: true,thirdStep:false }):setSystemUsersFormSteps({ firstStep: false, secondStep: false,thirdStep:true })

    }

    useEffect(() => {
        axios.get(`https://ratel-may.herokuapp.com/api/instructors`).then((res) => {
            setAccountsData(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <>
            <form className={SystemUsersStyles['system-user-form']} style={styles.body} method="post" encType="multipart/form-data" onSubmit={handleSubmit} >
                {systemUsersFormSteps.firstStep ? <><div>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="text" name="e-mail" id="email" value={userData.email} onChange={handleChange.bind(this)} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.emailError ? SystemUsersStyles['errors'] : ''}`} />
                    <small className='text-danger'>{errors.emailError}</small>
                </div>
                    <div>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="text" name="name" id="name" value={userData.name} onChange={handleChange.bind(this)} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.nameError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.nameError}</small>
                    </div>

                    <div>
                        <Form.Label htmlFor="age">Age</Form.Label>
                        <Form.Control min={1} max={100} type="number" name="age" id="age" value={userData.age} onChange={handleChange.bind(this)} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.ageError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.ageError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="Password" id="password" value={userData.password} onChange={handleChange.bind(this)} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.passwordError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.passwordError}</small>
                    </div>
                    <button type="submit" className={`${userData.name === '' || userData.email === '' || userData.age === '' || userData.gender === '' || userData.programs === '' || userData.password === '' || errors.nameError || errors.emailError || errors.ageError || errors.genderError || errors.programsError || errors.passwordError ? SystemUsersStyles['disabled-btn'] : SystemUsersStyles['btn']}`} style={{ float: 'right' }} id="secondStep" onClick={(event) => systemUsersNextStep(event)}>Next<TbPlayerTrackNext style={{ margin: '-2px 0 0 3px' }} /></button>


                </> : systemUsersFormSteps.nextStep ? <>
                    <div>
                        <Form.Label htmlFor="gender">Gender</Form.Label>
                        <Form.Select name="gender" id="gender" value={userData.gender} onChange={handleChange.bind(this)} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.genderError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.genderError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="programs">Programs</Form.Label>
                        <Form.Select id="programs" name="programs" onChange={handleChange.bind(this)} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.programsError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            {programs.map((pr) => (
                                <option key={pr.id} value={pr.programName}>{pr.programName}</option>
                            ))}
                        </Form.Select>
                        <small className='text-danger'>{errors.programsError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="state">State</Form.Label>
                        <Form.Select name="state" id="state" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.stateError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            {listOfCountries.map((country) => (
                                <option key={country.id} value={country.name}>{country.name}</option>
                            ))}
                        </Form.Select>
                        <small className='text-danger'>{errors.stateError}</small>
                    </div>

                    <div>
                        <Form.Label htmlFor="mobile">Mobile</Form.Label>
                        <Form.Control type="tel" name="Mobile" id="mobile" value={userData.mobile} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.mobileError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.mobileError}</small>
                    </div>
                    <div>

                        <Form.Label htmlFor="privileges">Privileges</Form.Label>
                        <Form.Select id="privileges" name="Privileges" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.privilegesError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            <option value="Admin">Admin</option>
                            <option value="None">Instructor</option>
                            <option value="Supervisor">Supervisor</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.privilegesError}</small>
                    </div>
                    <button type="button" className={SystemUsersStyles['btn']} id="firstStep" onClick={(event) => systemUsersNextStep(event)}><ImPrevious2 style={{ marginTop: '-3px' }} />Next</button>
                </> : <>
                    <span>Working Days</span>
                    <div className={`${SystemUsersStyles['days-check-box-container']} ${errors.working_daysError ? SystemUsersStyles['errors'] : ''}`}>

                        <div >
                            <Form.Label htmlFor="d0" >Saturday</Form.Label>
                            <Form.Check name="d0" id="d0" value={0} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays['d0']} />
                        </div>
                        <div >
                            <Form.Label htmlFor="d1" >Sunday</Form.Label>
                            <Form.Check name="d1" id="d1" value={1} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays["d1"]} />
                        </div>
                        <div >
                            <Form.Label htmlFor="d2" >Monday</Form.Label>
                            <Form.Check name="d2" id="d2" value={2} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays["d2"]} />
                        </div>
                        <div >
                            <Form.Label htmlFor="d3" >Tuesday</Form.Label>
                            <Form.Check name="d3" id="d3" value={3} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays["d3"]} />
                        </div>
                        <div >
                            <Form.Label htmlFor="d4" >Tuesday</Form.Label>
                            <Form.Check name="d4" id="d4" value={4} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays["d4"]} />
                        </div>
                        <div >
                            <Form.Label htmlFor="d5" >Tuesday</Form.Label>
                            <Form.Check name="d5" id="d5" value={5} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays["d5"]} />
                        </div>
                        <div >
                            <Form.Label htmlFor="d6" >Tuesday</Form.Label>
                            <Form.Check name="d6" id="d6" value={6} onChange={(event) => handleAppointmentInDays(event)} checked={checkedDays["d6"]} />
                        </div>

                    </div>
                    <small className="text-danger">{errors.working_daysError}</small><br />
                    <span>Working Hours</span>
                    <div className={`${SystemUsersStyles['hours-check-box-container']} ${errors.working_hoursError ? SystemUsersStyles['errors'] : ''}`}>
                        {Working_hours.map((wh, index) => (
                            <div key={wh.id}>
                                <Form.Label htmlFor={wh.att}>{wh.appointment}</Form.Label>
                                <Form.Check id={wh.att} name={wh.att} value={index} onChange={handleApoointmentInHours} checked={checkedHours['hindex']} />
                            </div>
                        ))}

                    </div>
                    <small className="text-danger">{errors.working_hoursError}</small><br />
                    <div>
                        <Form.Label htmlFor="started_at">Started at</Form.Label>
                        <Form.Control type="date" id="started_at" name="started_at" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.started_atError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className="text-danger">{errors.started_atError}</small>
                    </div>



                    <button type="submit" className={`${userData.state === '' || userData.mobile === '' || userData.privileges === '' || userData.working_days === '' || userData.working_hours === '' || userData.started_at === '' || errors.stateError || errors.mobileError || errors.privilegeError || errors.working_daysError || errors.working_hoursError || errors.started_atError ? SystemUsersStyles['disabled-btn'] : SystemUsersStyles['btn']}`} style={{ float: 'right' }}>Add User<IoIosPersonAdd style={{ margin: '0 0 3px 3px' }} /></button>
                </>}
            </form>
            <div className={SystemUsersStyles['system-user-data-container']} style={styles.body}>
                <div className={SystemUsersStyles['table-settings-container']} style={styles.body}>
                    <Form.Label htmlFor="userAccountFilterTxt" className={SystemUsersStyles['filter-label']}>Filter</Form.Label>
                    <Form.Control id="userAccountFilterTxt" className={SystemUsersStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />

                    <button type="button" className={SystemUsersStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterAccounts(event.target.value)}>Filter <AiFillFilter /></button>
                    <button type="button" className={SystemUsersStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>Reset<BiReset /></button>
                </div>
                <div className={SystemUsersStyles['table-wrapper']} style={styles.body}>
                    {accountsData.length === 0 ? <img src={NoResultFiltaration} className={SystemUsersStyles['no-result']} alt="no-result"  /> : <table className={SystemUsersStyles['system-accounts-table']} style={styles.body}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Privileges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountsData.map((userAccount) => (
                                <tr key={userAccount._id} id={userAccount._id}>
                                    <td>{userAccount._id}</td>
                                    <td>{userAccount.name}</td>
                                    <td>{userAccount.email}</td>
                                    <td>{userAccount.mobile}</td>
                                    <td>{userAccount.privilages??userAccount.privileges}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </div>


        </>
    )
}
export default SystemUsers;