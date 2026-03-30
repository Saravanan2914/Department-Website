import React, { useState } from 'react';
import { LayoutDashboard, Users, GraduationCap, TrendingUp, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'faculty', label: 'Faculty', icon: <Users size={20} /> },
        { id: 'students', label: 'Students', icon: <GraduationCap size={20} /> },
        { id: 'progress', label: 'Progress', icon: <TrendingUp size={20} /> },
    ];

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar glass">
                <div className="sidebar-header">
                    <h2>Admin Portal</h2>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-item logout" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                <header className="content-header glass">
                    <h1>{menuItems.find(i => i.id === activeTab)?.label}</h1>
                    <div className="user-profile">
                        <span>Admin User</span>
                        <div className="avatar">A</div>
                    </div>
                </header>

                <div className="content-body">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-view animate-fade-in">
                            <div className="stats-grid">
                                <div className="stat-card glass">
                                    <h3>Total Faculty</h3>
                                    <p className="stat-number">24</p>
                                </div>
                                <div className="stat-card glass">
                                    <h3>Total Students</h3>
                                    <p className="stat-number">450</p>
                                </div>
                                <div className="stat-card glass">
                                    <h3>Departments</h3>
                                    <p className="stat-number">3</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'faculty' && (
                        <div className="faculty-view animate-fade-in">
                            <div className="action-bar">
                                <button className="add-btn"><Plus size={18} /> Add Faculty Member</button>
                            </div>
                            <div className="list-container glass">
                                <h3>Faculty Members List</h3>
                                <p>List of faculty members will appear here.</p>
                                {/* Placeholder for list */}
                            </div>
                        </div>
                    )}

                    {activeTab === 'students' && (
                        <div className="students-view animate-fade-in">
                            <div className="list-container glass">
                                <h3>Student Details</h3>
                                <p>All student records will appear here.</p>
                                {/* Placeholder for list */}
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div className="progress-view animate-fade-in">
                            <div className="list-container glass">
                                <h3>Department Progress</h3>
                                {/* Placeholder */}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
