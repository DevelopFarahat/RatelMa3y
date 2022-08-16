
import React, { useState, useCallback, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { IoIosPersonAdd } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import SystemUsersStyles from "./SystemUsers.module.css";
import NoResultFiltaration from "../../assets/images/no-result.png";
import { TbPlayerTrackNext } from "react-icons/tb";
import { ImPrevious2 } from "react-icons/im";
import axios from "axios";
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
    let Working_hours = [
        { id: 0, appointment: "from 10:00 am to 12:00 pm" },
        { id: 1, appointment: "from 1:00 pm to 3:00 pm" },
        { id: 2, appointment: "from 4:30 pm to 3:30 pm" },
        { id: 3, appointment: "from 10:00 pm to 12:00 am" }
    ];
    let programs = [
        { id: 0, programName: "Quran recitation" },
        { id: 1, programName: "Nour Al-Bayan" },
        { id: 2, programName: "Memorizing Quran" }

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
    const [accountsData, setAccountsData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [systemUsersFormSteps, setSystemUsersFormSteps] = useState({
        firstStep: true,
        nextStep: false
    })
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        gender: '',
        age: '',
        state: '',
        started_at: '',
        working_hours: [],
        working_days: [],
        password: '',
        mobile: '',
        programs: '',
        privileges: ''
    });
    const [errors, setErrors] = useState({
        emailError: '',
        /*fullnameError: '',*/
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
    const handleChange = (event) => {

            setUserData({
                ...userData,
                [event.target.id]:event.target.value
            }
            )








        errorHandle(event.target.id, event.target.value);
    }
    let x = [];
    const handleAppointmentInDays = (event)=>{
       // console.log(event.target.value);
        if(event.target.id.checked){
            console.log(true)
            x.push(event.target.value);
        }
        console.log(x);
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
        else if (filed === 'working_hours') {

            setErrors({
                ...errors,
                working_hoursError: value.length === 0 ? 'Working Hours Is Required' : ''
            });
        }
        else if (filed === 'working_days') {

            setErrors({
                ...errors,
                working_daysError: value.length === 0 ? 'Working Days Is Required' : ''
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

        console.log(userData);

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
        event.target.id === 'firstStep' ? setSystemUsersFormSteps({ firstStep: true, nextStep: false }) : setSystemUsersFormSteps({ firstStep: false, nextStep: true })

    }

    useEffect(() => {
        axios.get(`https://ratel-may.herokuapp.com/api/instructors`).then((res) => {
            setAccountsData(res.data);
        }).catch((error) => {
            console.log(error);
        })
    });

    return (
        <>


            <form className={SystemUsersStyles['system-user-form']} method="post" onSubmit={handleSubmit}>
                {systemUsersFormSteps.firstStep ? <><div>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="text" name="e-mail" id="email" value={userData.email} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.emailError ? SystemUsersStyles['errors'] : ''}`} />
                    <small className='text-danger'>{errors.emailError}</small>
                </div>
                    <div>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="text" name="name" id="name" value={userData.name} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.nameError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.nameError}</small>
                    </div>

                    <div>
                        <Form.Label htmlFor="age">Age</Form.Label>
                        <Form.Control type="number" name="age" id="age" value={userData.age} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.ageError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.ageError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="gender">Gender</Form.Label>
                        <Form.Select name="gender" id="gender" value={userData.gender} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.genderError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.genderError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="programs">Programs</Form.Label>
                        <Form.Select id="programs" name="programs" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.programsError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            {programs.map((pr) => (
                                <option key={pr.id} value={pr.programName}>{pr.programName}</option>
                            ))}
                        </Form.Select>
                        <small className='text-danger'>{errors.programsError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="Password" id="password" value={userData.password} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.passwordError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className='text-danger'>{errors.passwordError}</small>
                    </div>
                    <button type="submit" className={`${userData.name === '' || userData.email === '' || userData.age === '' || userData.gender === '' || userData.programs === '' || userData.password === '' || errors.nameError || errors.emailError || errors.ageError || errors.genderError || errors.programsError || errors.passwordError ? SystemUsersStyles['disabled-btn'] : SystemUsersStyles['btn']}`} style={{ float: 'right' }} id="nextStep" onClick={(event) => systemUsersNextStep(event)}>Next<TbPlayerTrackNext style={{ margin: '-2px 0 0 3px' }} /></button>

                </> : <>
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
                        <Form.Select id="privileges" name="Privileges" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.privilegeError ? SystemUsersStyles['errors'] : ''}`} >
                            <option value="">Select</option>
                            <option value="ADMIN">Admin</option>
                            <option value="INSTRUCTOR">Instructor</option>
                            <option value="SUPERVISOR">Supervisor</option>
                        </Form.Select>
                        <small className='text-danger'>{errors.privilegesError}</small>
                    </div>

                    <div className={SystemUsersStyles['days-check-box-container']}>
                        {namesOfDaysOfTheWeek.map((day) => (
                            <div key={day.id}>
                                <Form.Label htmlFor={day.att} >{day.name}</Form.Label>
                                <Form.Check name={day.att} id={day.att} value={day.id} onClick={handleAppointmentInDays} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <Form.Label htmlFor="working_hours">Working Hours</Form.Label>
                        <Form.Select id="working_hours" name="working_hours" multiple onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.working_hoursError ? SystemUsersStyles['errors'] : ''}`}>
                            <option value="">Select</option>
                            {Working_hours.map((wHours) => (
                                <option key={wHours.id} value={wHours.appointment}>{wHours.appointment}</option>
                            ))}
                        </Form.Select>
                        <small className="text-danger">{errors.working_hoursError}</small>
                    </div>
                    <div>
                        <Form.Label htmlFor="started_at">Started at</Form.Label>
                        <Form.Control type="date" id="started_at" name="started_at" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.started_atError ? SystemUsersStyles['errors'] : ''}`} />
                        <small className="text-danger">{errors.started_atError}</small>
                    </div>
                    <button type="button" className={SystemUsersStyles['btn']} id="firstStep" onClick={(event) => systemUsersNextStep(event)}><ImPrevious2 style={{ marginTop: '-3px' }} />Previous</button>
                    <button type="submit" className={`${userData.state === '' || userData.mobile === '' || userData.privileges === '' || userData.working_days === '' || userData.working_hours === '' || userData.started_at === '' || errors.stateError || errors.mobileError || errors.privilegeError || errors.working_daysError || errors.working_hoursError || errors.started_atError ? SystemUsersStyles['disabled-btn'] : SystemUsersStyles['btn']}`} style={{ float: 'right' }}>Add User<IoIosPersonAdd style={{ margin: '0 0 3px 3px' }} /></button>

                </>}
            </form>
            <div className={SystemUsersStyles['system-user-data-container']}>
                <div className={SystemUsersStyles['table-settings-container']}>
                    <Form.Label htmlFor="userAccountFilterTxt" className={SystemUsersStyles['filter-label']}>Filter</Form.Label>
                    <Form.Control id="userAccountFilterTxt" className={SystemUsersStyles['filter-txt']} value={filterValue} onChange={handleFiltaration} />

                    <button type="button" className={SystemUsersStyles['btn']} style={{ marginTop: 'auto' }} onClick={(event) => filterAccounts(event.target.value)}>Filter <AiFillFilter /></button>
                    <button type="button" className={SystemUsersStyles['btn']} style={{ marginTop: 'auto' }} onClick={resetTableFiltaration}>Reset<BiReset /></button>
                </div>
                <div className={SystemUsersStyles['table-wrapper']}>
                    {accountsData.length === 0 ? <img src={NoResultFiltaration} className={SystemUsersStyles['no-result']} alt="no-result" /> : <table className={SystemUsersStyles['system-accounts-table']}>
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
                                    <td>{userAccount.privilages}</td>
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