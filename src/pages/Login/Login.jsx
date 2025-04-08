import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import logo1 from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';




const Login = () => {
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context?.setIsHideSidebarAndHeader) {
            context.setIsHideSidebarAndHeader(true);
        }
        return () => {
            if (context?.setIsHideSidebarAndHeader) {
                context.setIsHideSidebarAndHeader(false); // Restore Sidebar & Header after leaving Login page
            }
        };
    }, []);

    return (
        <>
            <section className="loginSection vh-100 d-flex align-items-center">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-3">
                            <div className="loginBox">

                                <div className='wrapper mt-3 card border p-4'>
                                    <div className=' text-center'>
                                        <div className=" d-flex justify-content-center">
                                            <img src={logo1} width={"30px"} />
                                        </div>
                                        <h5 className='font-weight-bold mt-2 mb-3'>Login Now</h5>
                                    </div>
                                    <form>
                                        <div className={`form-group position-relative ${inputIndex === 0 && 'focus'}`}>
                                            <span className='icon'><FaUserAlt /></span>
                                            <input type='text' className='form-control' placeholder='Enter your User ID'
                                                onFocus={() => setInputIndex(0)} onBlur={() => setInputIndex(null)} autoFocus />
                                        </div>

                                        <div className={`form-group position-relative ${inputIndex === 1 && 'focus'}`}>
                                            <span className='icon'><FaLock /></span>
                                            <input type={isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                                onFocus={() => setInputIndex(1)} onBlur={() => setInputIndex(null)} />
                                            <span className='toggleShowPassword' onClick={() => setIsShowPassword(!isShowPassword)}>
                                                {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                            </span>
                                        </div>
                                        <div className='form-group'>
                                            <Button className="btn-blue btn-lg w-100 " onClick={()=>navigate('/Master/UserMaster')}>Sign In</Button>
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




        </>
    );
}

export default Login;
