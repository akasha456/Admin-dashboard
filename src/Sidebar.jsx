import { faFaceLaughWink, faTachographDigital, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <li className="nav-item">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/portal/user-list">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

           
            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0" />

            {/* <!-- Nav Item - Users --> */}
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/user-list">
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                    <span>Users</span>
                </Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/portal/user-list2">
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                    <span>Events</span>
                </Link>
            </li>

        </ul>
    );
}

export default Sidebar;
