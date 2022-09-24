import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
// import { forgotPassword } from '../../actions/adminaction';
import { forgotPassword, clearErrors } from '../../../actions/userAction'
import "./ForgotPassword.css"
import { toast } from "react-toastify"
import { Navigate, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ForgotPassword = () => {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const navigate = useNavigate();
    const { error, message, loading } = useSelector(
        (state) => state.user
    );

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const email1 = {
            email: email
        }
        dispatch(forgotPassword(email1));
        navigate('/');
        // history.push("/")
    };

    useEffect(() => {

        if (error) {
            dispatch(clearErrors());
        }

        if (message) {
            console.log(message);
        }
    });
    function handleBack() {
        navigate('/signin');
    }
    return (
        <>

            {/* <> */}
            {/* <MetaData title="Forgot Password" /> */}
            <div className="forgotPasswordContainer">
                <div className='goback'>
                    <button onClick={handleBack} type='submit' className='btn btn-dark'>
                        <ArrowBackIcon />
                    </button>
                </div>
                <div className="forgotPasswordBox">
                    <h2 className="forgotPasswordHeading">Forgot Password</h2>

                    <form
                        className="forgotPasswordForm"
                        onSubmit={forgotPasswordSubmit}
                    >
                        <div className="forgotPasswordEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Send"
                            className="forgotPasswordBtn"
                        />
                    </form>
                </div>
            </div>
            {/* </> */}

        </>
    );
};
export default ForgotPassword;
