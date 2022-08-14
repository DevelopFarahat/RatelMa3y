
import React, { useState,useCallback } from "react";
import Form from 'react-bootstrap/Form';
import { IoIosPersonAdd } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import SystemUsersStyles from "./SystemUsers.module.css";
import NoResultFiltaration from "../../assets/images/no-result.png";
const SystemUsers = () => {
    let systemDataAccountsArr = [{ id:1, username: "devfarahat", fullname: "mohamed farahat", privilege: "instructor", mobile: "01150849567" }
        , { id:2, username: "codeLoop", fullname: "mohamed gamal", privilege: "admin", mobile: "0119798663" },
    { id:3, username: "rashed123", fullname: "mohamed rashed", privilege: "supervisor", mobile: "012966788974" },
    { id:4, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:5, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:6, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:7, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:8, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:9, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:10, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:11, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:12, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:13, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:14, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:15, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:16, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" },
    { id:17, username: "magdy22", fullname: "mohamed magdy", privilege: "supervisor", mobile: "01977464" }];

    const [accountsData, setAccountsData] = useState(systemDataAccountsArr);
    const [filterValue, setFilterValue] = useState('');
    const [userData, setUserData] = useState({
        username: '',
        fullname: '',
        password: '',
        mobile: '',
        privilege: ''
    });
    const [errors, setErrors] = useState({
        usernameError: '',
        fullnameError: '',
        privilegeError: '',
        mobileError: '',
        passwordError: '',

    });
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.id]: event.target.value
        }
        )
        errorHandle(event.target.id, event.target.value);
    }
    const errorHandle = (filed, value) => {
        if (filed === 'username') {
            const usernameRegx = /^[a-zA-Z]{3,}/;
            setErrors({
                ...errors,
                usernameError: value.length === 0 ? 'Username Is Required' : usernameRegx.test(value) ? null : 'Username must be contains characters and minimum length of 3 characters'
            });
        } else if (filed === 'mobile') {
            const mobileRegx = /^[+][0-9]+(01)(0|1|2|5)[0-9]{8}$/;
            setErrors({
                ...errors,
                mobileError: value.length === 0 ? 'Mobile Is Required' : mobileRegx.test(value) ? null : 'Mobile Must Start With Country Code with 01 and consists of 11 digit'
            });

        }

        else if (filed === 'fullname') {
            const fullnameRegx = /[a-z A-Z]{3,}\s{1}[a-z A-Z]{3,}$/;
            setErrors({
                ...errors,
                fullnameError: value.length === 0 ? 'Fullname Is Required' : fullnameRegx.test(value) ? null : 'Fullname  must contain a white space and min length of 3 characters'
            });
        } else if (filed === 'password') {
            const passwordRegx = /([0-9]|[a-zA-Z])+([0-9]|[a-zA-Z]){7}/;
            setErrors({
                ...errors,
                passwordError: value.length === 0 ? 'password Is Required' : passwordRegx.test(value) ? null : 'password must be  characters or digits and  length of 8'
            });
        }
        else if (filed === 'privilege') {
            setErrors({
                ...errors,
                privilegeError: value.length === 0 ? 'Privilege Is Required' : null
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
        for (let i = 0; i < systemDataAccountsArr.length; i++) {

            if (filterValue.toLowerCase() === systemDataAccountsArr[i].username.toLowerCase()) {
                filtarationArr.push(systemDataAccountsArr[i]);

            }
            else if (filterValue.toLowerCase() === systemDataAccountsArr[i].fullname.toLowerCase()) {
                filtarationArr.push(systemDataAccountsArr[i]);
            }
            else if (filterValue.toLowerCase() === systemDataAccountsArr[i].privilege.toLowerCase()) {
                filtarationArr.push(systemDataAccountsArr[i]);
            }
        }
        filterValue !== '' ? setAccountsData(filtarationArr) : setAccountsData(systemDataAccountsArr);


    }
    const resetTableFiltaration = () => {
        setFilterValue('');
        setAccountsData(systemDataAccountsArr);
    }
    const handleFiltaration = (event) => {
        setFilterValue(event.target.value);
    }

    return (
        <>


            <form className={SystemUsersStyles['system-user-form']} method="post" onSubmit={handleSubmit}>
                <div>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text" name="Username" id="username" value={userData.username} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.usernameError ? SystemUsersStyles['errors'] : ''}`} />
                    <small className='text-danger'>{errors.usernameError}</small>
                </div>
                <div>
                    <Form.Label htmlFor="fullname">Fullname</Form.Label>
                    <Form.Control type="text" name="Fullname" id="fullname" value={userData.fullname} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.fullnameError ? SystemUsersStyles['errors'] : ''}`} />
                    <small className='text-danger'>{errors.fullnameError}</small>
                </div>
                <div>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" name="Password" id="password" value={userData.password} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.passwordError ? SystemUsersStyles['errors'] : ''}`} />
                    <small className='text-danger'>{errors.passwordError}</small>
                </div>
                <div>
                    <Form.Label htmlFor="mobile">Mobile</Form.Label>
                    <Form.Control type="tel" name="Mobile" id="mobile" value={userData.mobile} onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.mobileError ? SystemUsersStyles['errors'] : ''}`} />
                    <small className='text-danger'>{errors.mobileError}</small>
                </div>
                <div>
                    <Form.Label htmlFor="privilege">Privilege</Form.Label>
                    <Form.Select id="privilege" name="Privilege" onChange={handleChange} className={`${SystemUsersStyles['system-user-form-controls']} ${errors.privilegeError ? SystemUsersStyles['errors'] : ''}`} >
                        <option value="">Select</option>
                        <option value="ADMIN">Admin</option>
                        <option value="INSTRUCTOR">Instructor</option>
                        <option value="SUPERVISOR">Supervisor</option>
                    </Form.Select>
                    <small className='text-danger'>{errors.privilegeError}</small>
                </div>
                <button type="submit" disabled={userData.username === '' || userData.fullname === '' || userData.privilege === '' || userData.mobile === '' || userData.password === '' || errors.usernameError || errors.fullnameError || errors.passwordError || errors.mobileError || errors.privilegeError ? true : false} className={`${userData.username === '' || userData.fullname === '' || userData.privilege === '' || userData.mobile === '' || userData.password === '' || errors.usernameError || errors.fullnameError || errors.passwordError || errors.mobileError || errors.privilegeError ? SystemUsersStyles['disabled-btn'] : SystemUsersStyles['btn']}`}>Add User<IoIosPersonAdd style={{ margin: '0 0 3px 3px' }} /></button>
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
                                <th>Username</th>
                                <th>Fullname</th>
                                <th>Privilege</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountsData.map((userAccount) => (
                            <tr key={userAccount.id} id={userAccount.id}>
                                <td>{userAccount.id}</td>
                                <td>{userAccount.username}</td>
                                <td>{userAccount.fullname}</td>
                                <td>{userAccount.privilege}</td>
                                <td>{userAccount.mobile}</td>
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