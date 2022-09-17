import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
// import { toast } from "react-toastify"
// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { loaduser, resetPassword ,clearErrors} from "../../../actions/userAction";
export default function ResetPassword( {match }) {
    const dispatch = useDispatch();
        const { error, success, loading } = useSelector(
        (state) => state.user
    );
    const navigate=useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const passwordObj = {
            password: password,
            confirmPassword: confirmPassword
        }
        dispatch(resetPassword(match.params.token, passwordObj));
        dispatch(loaduser());
        navigate('/');
        // history.push("/")
    };

    useEffect(() => {
        if (error) {

            // toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            // toast.success("Password Updated Successfully");
            navigate('/');
            // history.push("/");
        }
    });

    return (
        <>
            (
            <>
                {/* <MetaData title="Change Password" /> */}
                {/* <h1></h1> */}
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Update Profile</h2>

                        <form
                            className="resetPasswordForm"
                            onSubmit={resetPasswordSubmit}
                        >
                            <div>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Update"
                                className="resetPasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </>
            )
        </>
    );
};

// export default ResetPassword;