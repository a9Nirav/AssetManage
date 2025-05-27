import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import logo1 from '../../assets/logo.png';
import { getlogin } from '../../features/masterApi.js';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        LoginId: '',
        LogPwd: '',
        LoginName: '',
        ComCode: ''
    });


    const context = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        context?.setIsHideSidebarAndHeader?.(true);
        return () => context?.setIsHideSidebarAndHeader?.(false);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };
console.log(formData)
    const onSubmit = async (e) => {
        e.preventDefault(); // prevent form reload
        try {
            const result = await dispatch(getlogin(formData)).unwrap();
            // navigate after successful login
            if (result) navigate('/dashboard');
            console.log(result)
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    

    return (
        <section className="loginSection vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-3">
                        <div className="loginBox">
                            <div className='wrapper mt-3 card border p-4'>
                                <div className=' text-center'>
                                    <div className=" d-flex justify-content-center">
                                        <img src={logo1} width={"30px"} alt="Logo" />
                                    </div>
                                    <h5 className='font-weight-bold mt-2 mb-3'>Login Now</h5>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                        <span className='icon'><FaUserAlt /></span>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='LoginId'
                                            value={formData.LoginId}
                                            onChange={handleChange}
                                            placeholder='Enter your User ID'
                                            onFocus={() => setInputIndex(0)}
                                            onBlur={() => setInputIndex(null)}
                                            autoFocus
                                        />
                                    </div>

                                    <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                        <span className='icon'><FaLock /></span>
                                        <input
                                            type={isShowPassword ? 'text' : 'password'}
                                            name='LogPwd'
                                            className='form-control'
                                            value={formData.LogPwd}
                                            onChange={handleChange}
                                            placeholder='Enter your password'
                                            onFocus={() => setInputIndex(1)}
                                            onBlur={() => setInputIndex(null)}
                                        />
                                        <span className='toggleShowPassword' onClick={() => setIsShowPassword(!isShowPassword)}>
                                            {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                        </span>
                                    </div>

                                    <input
                                        type="text"
                                        name="LoginName"
                                        value={formData.LoginName}
                                        onChange={handleChange}
                                        className="form-control my-2"
                                        placeholder='Login Name'
                                    />

                                    <input
                                        type="text"
                                        name="ComCode"
                                        value={formData.ComCode}
                                        onChange={handleChange}
                                        className="form-control my-2"
                                        placeholder='ComCode'
                                    />

                                    <div className='form-group'>
                                        <Button type="submit" className="btn-blue btn-lg w-100">Sign In</Button>
                                    </div>

                                    <div className='form-group text-center mb-0'>
                                        <Link to={'/Master/UserMaster'} className="link">FORGOT PASSWORD</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
