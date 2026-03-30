import React, { useState } from 'react';
import { LayoutDashboard, GraduationCap, UserPlus, LogOut, FileText, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem('university_students');
        return saved ? JSON.parse(saved) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('university_students', JSON.stringify(students));
    }, [students]);

    const [newStudent, setNewStudent] = useState({ name: '', roll: '', username: '', password: '' });

    const [showResultModal, setShowResultModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [semester, setSemester] = useState('');
    const [subjects, setSubjects] = useState([
        { courseCode: '', courseName: '', grade: '', result: '' }
    ]);

    const handleLogout = () => {
        navigate('/');
    };

    const handleDeleteStudent = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (newStudent.name && newStudent.roll && newStudent.username && newStudent.password) {
            // Check if username already exists
            if (students.some(s => s.username === newStudent.username)) {
                alert('Username already exists!');
                return;
            }
            setStudents([...students, {
                id: Date.now(),
                name: newStudent.name,
                roll: newStudent.roll,
                username: newStudent.username,
                password: newStudent.password,
                dept: 'IT',
                results: []
            }]);
            setNewStudent({ name: '', roll: '', username: '', password: '' });
            alert('Student Added Successfully!');
            setActiveTab('students');
        } else {
            alert('Please fill all fields');
        }
    };

    const openResultModal = (student) => {
        setSelectedStudent(student);
        setShowResultModal(true);
        setSemester('');
        setSubjects([{ courseCode: '', courseName: '', grade: '', result: '' }]);
    };

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    const addSubjectRow = () => {
        setSubjects([...subjects, { courseCode: '', courseName: '', grade: '', result: '' }]);
    };

    const removeSubjectRow = (index) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleResultSubmit = (e) => {
        e.preventDefault();
        // Validation check
        if (!semester) {
            alert('Please enter semester');
            return;
        }

        const newResult = { semester, subjects: [...subjects] };
        
        const updatedStudents = students.map(s => {
            if (s.id === selectedStudent.id) {
                return { ...s, results: [...(s.results || []), newResult] };
            }
            return s;
        });
        
        setStudents(updatedStudents);
        alert(`Results added successfully for ${selectedStudent.name}`);
        setShowResultModal(false);
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'students', label: 'Student Details', icon: <GraduationCap size={20} /> },
        { id: 'add-student', label: 'Add Student', icon: <UserPlus size={20} /> },
    ];

    return (
        <div className="faculty-container">
            {/* Sidebar */}
            <aside className="faculty-sidebar glass">
                <div className="sidebar-header">
                    <h2>Faculty Portal</h2>
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
            <main className="faculty-content">
                <header className="content-header glass">
                    <h1>{menuItems.find(i => i.id === activeTab)?.label}</h1>
                    <div className="user-profile">
                        <span>Faculty Member</span>
                        <div className="avatar">F</div>
                    </div>
                </header>

                <div className="content-body">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-view animate-fade-in">
                            <div className="stats-grid">
                                <div className="stat-card glass">
                                    <h3>My Students</h3>
                                    <p className="stat-number">{students.length}</p>
                                </div>
                                <div className="stat-card glass">
                                    <h3>Classes Today</h3>
                                    <p className="stat-number">4</p>
                                </div>
                                <div className="stat-card glass">
                                    <h3>Pending Assignments</h3>
                                    <p className="stat-number">12</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'students' && (
                        <div className="students-view animate-fade-in">
                            <div className="list-container glass">
                                <h3>Enrolled Students</h3>
                                <div className="student-list">
                                    {students.map((student) => (
                                        <div key={student.id} className="student-list-item">
                                            <div className="left-section">
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteStudent(student.id)}
                                                    title="Delete Student"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="student-info">
                                                    <span className="student-name">{student.name}</span>
                                                    <div className="student-details" style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#8892b0', marginTop: '4px' }}>
                                                        <span className="student-roll">Roll: {student.roll}</span>
                                                        <span>•</span>
                                                        <span className="student-username">User: {student.username}</span>
                                                        <span>•</span>
                                                        <span className="student-pass">Pass: {student.password}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="add-result-btn" onClick={() => openResultModal(student)}>
                                                <FileText size={16} /> Add Result
                                            </button>
                                        </div>
                                    ))}
                                    {students.length === 0 && <p className="no-data">No students enrolled yet.</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'add-student' && (
                        <div className="add-student-view animate-fade-in">
                            <div className="form-container glass">
                                <h3>Register New Student</h3>
                                <form className="student-form" onSubmit={handleAddStudent}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter student name"
                                            value={newStudent.name}
                                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Roll Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter roll number"
                                            value={newStudent.roll}
                                            onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Student Username</label>
                                        <input
                                            type="text"
                                            placeholder="Enter login username"
                                            value={newStudent.username}
                                            onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Student Password</label>
                                        <input
                                            type="text"
                                            placeholder="Enter login password"
                                            value={newStudent.password}
                                            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Department</label>
                                        <input type="text" value="IT" readOnly />
                                    </div>
                                    <button className="submit-btn" type="submit"><UserPlus size={18} /> Register Student</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Modal Overlay */}
                {showResultModal && (
                    <div className="modal-overlay animate-fade-in">
                        <div className="modal-content glass large-modal">
                            <div className="modal-header">
                                <h3>Add Result for {selectedStudent?.name}</h3>
                                <button className="close-btn" onClick={() => setShowResultModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleResultSubmit} className="result-form">
                                <div className="form-group semester-group">
                                    <label>Semester</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 05"
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                        required
                                        className="semester-input"
                                    />
                                </div>

                                <div className="subjects-container">
                                    <h4>Subjects</h4>
                                    {subjects.map((subject, index) => (
                                        <div key={index} className="subject-row glass-panel">
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Code</label>
                                                    <input
                                                        type="text"
                                                        placeholder="231ITV11"
                                                        value={subject.courseCode}
                                                        onChange={(e) => handleSubjectChange(index, 'courseCode', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group flex-2">
                                                    <label>Course Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Course Name"
                                                        value={subject.courseName}
                                                        onChange={(e) => handleSubjectChange(index, 'courseName', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Grade</label>
                                                    <select
                                                        value={subject.grade}
                                                        onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Sel</option>
                                                        <option value="O">O</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A">A</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                        <option value="U">U</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Result</label>
                                                    <select
                                                        value={subject.result}
                                                        onChange={(e) => handleSubjectChange(index, 'result', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Sel</option>
                                                        <option value="P">P</option>
                                                        <option value="F">F</option>
                                                    </select>
                                                </div>
                                                <div className="form-group delete-action">
                                                    {subjects.length > 1 && (
                                                        <button type="button" className="remove-row-btn" onClick={() => removeSubjectRow(index)}>
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="add-row-btn" onClick={addSubjectRow}>+ Add Subject</button>
                                </div>

                                <button type="submit" className="submit-btn full-width">Save Results</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FacultyDashboard;
