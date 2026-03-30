import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [student, setStudent] = useState(null);
    const [credits, setCredits] = useState({});
    const [showCgpaModal, setShowCgpaModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedStudent = localStorage.getItem('current_student');
        if (!storedStudent) {
            navigate('/student-login');
        } else {
            const parsedStudent = JSON.parse(storedStudent);
            // Fetch latest data from university_students to ensure results are up-to-date
            const allStudents = JSON.parse(localStorage.getItem('university_students') || '[]');
            const latestStudentInfo = allStudents.find(s => s.id === parsedStudent.id) || parsedStudent;
            setStudent(latestStudentInfo);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('current_student');
        navigate('/');
    };

    const gradePoints = {
        'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'U': 0, 'F': 0, 'RA': 0, 'AB': 0
    };

    const handleCreditChange = (courseCode, value) => {
        setCredits(prev => ({
            ...prev,
            [courseCode]: value === '' ? '' : Number(value)
        }));
    };

    const calculateCGPA = () => {
        let totalCredits = 0;
        let earnedPoints = 0;

        if (!student || !student.results) return "0.00";

        student.results.forEach(result => {
            result.subjects.forEach(sub => {
                const credit = credits[sub.courseCode];
                if (credit && credit > 0) {
                    totalCredits += credit;
                    const gp = gradePoints[sub.grade.toUpperCase()] !== undefined 
                        ? gradePoints[sub.grade.toUpperCase()] 
                        : (sub.result === 'P' ? 5 : 0);
                    earnedPoints += (credit * gp);
                }
            });
        });

        if (totalCredits === 0) return "0.00";
        return (earnedPoints / totalCredits).toFixed(2);
    };

    const calculateSGPA = (semester) => {
        let totalCredits = 0;
        let earnedPoints = 0;

        if (!student || !student.results) return "0.00";

        const semResult = student.results.find(r => r.semester === semester);
        if (!semResult) return "0.00";

        semResult.subjects.forEach(sub => {
            const credit = credits[sub.courseCode];
            if (credit && credit > 0) {
                totalCredits += credit;
                const gp = gradePoints[sub.grade.toUpperCase()] !== undefined 
                    ? gradePoints[sub.grade.toUpperCase()] 
                    : (sub.result === 'P' ? 5 : 0);
                earnedPoints += (credit * gp);
            }
        });

        if (totalCredits === 0) return "0.00";
        return (earnedPoints / totalCredits).toFixed(2);
    };

    const getAppreciationMessage = (cgpa) => {
        const score = parseFloat(cgpa);
        if (isNaN(score) || score === 0) return "Please enter your credits to calculate your CGPA.";
        if (score >= 9.0) return "Outstanding! Keep up the brilliant work! 🌟";
        if (score >= 8.0) return "Excellent! You're doing great! 👏";
        if (score >= 7.0) return "Good job! Keep pushing for more! 👍";
        if (score >= 6.0) return "Not bad, but there's room for improvement! 💪";
        return "Work harder! You can do this! 📚";
    };

    if (!student) return null;

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'results', label: 'My Results', icon: <FileText size={20} /> },
        { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    ];

    return (
        <div className="student-container">
            <aside className="student-sidebar glass">
                <div className="sidebar-header">
                    <h2>Student Portal</h2>
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

            <main className="student-content">
                <header className="content-header glass">
                    <h1>{menuItems.find(i => i.id === activeTab)?.label}</h1>
                    <div className="user-profile">
                        <span>{student.name}</span>
                        <div className="avatar">{student.name.charAt(0)}</div>
                    </div>
                </header>

                <div className="content-body">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-view animate-fade-in">
                            <div className="welcome-banner glass">
                                <h2>Welcome back, {student.name}!</h2>
                                <p>This is your student portal. You can view your results and profile here.</p>
                            </div>
                            <div className="stats-grid mt-4">
                                <div className="stat-card glass">
                                    <h3>Roll Number</h3>
                                    <p className="stat-number">{student.roll}</p>
                                </div>
                                <div className="stat-card glass">
                                    <h3>Department</h3>
                                    <p className="stat-number">{student.dept || 'IT'}</p>
                                </div>
                                <div className="stat-card glass">
                                    <h3>Semesters Completed</h3>
                                    <p className="stat-number">{student.results ? student.results.length : 0}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'results' && (
                        <div className="results-view animate-fade-in">
                            <div className="list-container glass">
                                <h3>My Academic Results</h3>
                                {(!student.results || student.results.length === 0) ? (
                                    <p className="no-data">No results have been uploaded yet.</p>
                                ) : (
                                    <div className="student-list results-list">
                                        {student.results.map((result, i) => (
                                            <div key={i} className="result-card glass-panel">
                                                <h4>Semester {result.semester}</h4>
                                                <div className="subjects-table-container">
                                                    <table className="subjects-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Course Code</th>
                                                                <th>Course Name</th>
                                                                <th>Credits</th>
                                                                <th>Grade</th>
                                                                <th>Result</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {result.subjects.map((sub, j) => (
                                                                <tr key={j}>
                                                                    <td>{sub.courseCode}</td>
                                                                    <td>{sub.courseName}</td>
                                                                    <td>
                                                                        <input 
                                                                            type="number" 
                                                                            min="1" 
                                                                            max="10" 
                                                                            className="credit-input"
                                                                            placeholder="Cr"
                                                                            value={credits[sub.courseCode] || ''}
                                                                            onChange={(e) => handleCreditChange(sub.courseCode, e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td><span className={`grade-badge grade-${sub.grade.replace('+', 'plus').toLowerCase()}`}>{sub.grade}</span></td>
                                                                    <td><span className={`status-badge status-${sub.result.toLowerCase()}`}>{sub.result === 'P' ? 'Pass' : 'Fail'}</span></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button 
                                className="cgpa-calculator-btn glass"
                                onClick={() => setShowCgpaModal(true)}
                            >
                                Calculate CGPA
                            </button>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="profile-view animate-fade-in">
                            <div className="profile-card glass">
                                <div className="profile-header-large">
                                    <div className="large-avatar">{student.name.charAt(0)}</div>
                                    <div className="profile-titles">
                                        <h2>{student.name}</h2>
                                        <span className="role-badge">Student - {student.dept || 'IT'} Dept</span>
                                    </div>
                                </div>
                                <div className="profile-details">
                                    <div className="detail-group">
                                        <label>Full Name</label>
                                        <p>{student.name}</p>
                                    </div>
                                    <div className="detail-group">
                                        <label>Roll Number</label>
                                        <p>{student.roll}</p>
                                    </div>
                                    <div className="detail-group">
                                        <label>Username</label>
                                        <p>{student.username}</p>
                                    </div>
                                    <div className="detail-group">
                                        <label>Program</label>
                                        <p>B.Tech Information Technology</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {showCgpaModal && (
                <div className="modal-overlay animate-fade-in" onClick={() => setShowCgpaModal(false)}>
                    <div className="cgpa-modal glass animate-scale-up" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowCgpaModal(false)}>&times;</button>
                        <h3>Performance Summary</h3>
                        
                        <div className="semesters-list">
                            {student.results && student.results.map((result, idx) => (
                                <div key={idx} className="semester-sgpa-row">
                                    <span className="semester-label">Semester {result.semester} SGPA</span>
                                    <span className="semester-score">{calculateSGPA(result.semester)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="overall-divider"></div>

                        <h4>Overall CGPA</h4>
                        <div className="cgpa-score-large">{calculateCGPA()}</div>
                        <p className="appreciation-msg">{getAppreciationMessage(calculateCGPA())}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
