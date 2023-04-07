import React from 'react';
import './LeftSidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Globe from '../../assets/Globe.png';

const LeftSidebar = ({ slideIn, handleSlideIn }) => {
    const navigate = useNavigate();

    const slideInStyle = {
        transform: "translateX(0%)"
    }

    const slideOutStyle = {
        transform: "translateX(-100%)"
    }

    const handleButtonClick = () => {
        navigate('/codeeditor');
        // handleSlideIn.bind(this)();
    };

    return (
        <div className='left-sidebar' style={slideIn ? slideInStyle : slideOutStyle}>
            <nav className='side-nav'>
                <button onClick={handleSlideIn} className="nav-btn">
                    <NavLink to="/" className="side-nav-links-1" activeclassname='active'>
                        <p>Home</p>
                    </NavLink> 
                </button>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <button onClick={()=>handleSlideIn()} className="nav-btn">
                        <NavLink to='/Questions' className="side-nav-links" activeclassname='active'>
                            <img src={Globe} alt="Globe"/>
                            <p style={{paddingLeft: "10px"}}> Questions</p>
                        </NavLink>
                    </button>
                    <button onClick={()=>handleSlideIn()} className="nav-btn">
                        <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft: "40px"}}>
                            <p>Tags</p>
                        </NavLink>
                    </button>
                    <button onClick={()=>handleSlideIn()} className="nav-btn">
                        <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft: "40px"}}>
                            <p>Users</p>
                        </NavLink>
                    </button>
                    <button onClick={handleButtonClick} className="nav-btn">
                        <NavLink to='/codeeditor' className='side-nav-links' activeclassname='active' style={{paddingLeft: "40px"}}>
                            <p>Code Editor</p>
                        </NavLink>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar;
