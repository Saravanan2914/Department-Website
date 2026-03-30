import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Target } from 'lucide-react';
import './StudentLogin.css';

const StudentLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const saved = localStorage.getItem('university_students');
        const students = saved ? JSON.parse(saved) : [];

        const student = students.find(s => s.username === username && s.password === password);

        if (student) {
            // Save current authenticated student
            localStorage.setItem('current_student', JSON.stringify(student));
            navigate('/student');
        } else {
            setError('Invalid username or password. Please contact your faculty if you haven\'t been added yet.');
        }
    };

    return (
        <div className="student-login-container">
            <div className="bg-overlay"></div>
            <div className="tech-grid"></div>
            
            <button className="back-btn glass" onClick={() => navigate('/')}>
                ← Back to Home
            </button>

            <div className="login-box glass animate-fade-in">
                <div className="login-header">
                    <Shield size={48} className="header-icon" />
                    <h2>Student Portal Access</h2>
                    <p>Enter your credentials to continue</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label>Username</label>
                        <div className="input-wrapper">
                            <User size={20} className="input-icon" />
                            <input 
                                type="text" 
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="cyber-btn main-login-btn">
                        <span className="cyber-btn-text">Authenticate</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
