import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanelNavigation from "./AdminPanelNavigation";

function AdminPanel() {
    const [currAdminSession, setCurrAdminSession] = useState(null);
    const navigate = useNavigate();

    // turn off navigation
    React.useEffect(() => {
        // check if is in session
        const adminSession = JSON.parse(sessionStorage.getItem('adminSession'));
        
        if (!adminSession) {
            navigate('/admin/login');
        } else {
            setCurrAdminSession(adminSession);
        }
    }, [navigate]);

    return (
        <div>
            <AdminPanelNavigation />
            {currAdminSession && (
                <h1 className="lbl text-center">Welcome {currAdminSession.username}!</h1>
            )}
        </div>
    );
}

export default AdminPanel;