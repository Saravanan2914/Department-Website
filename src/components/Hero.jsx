import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, GraduationCap, Code, Cpu, Database, Network, Terminal, Server, Wifi, Sun } from 'lucide-react';
import bgImage from '../assets/bg.png';
import './Hero.css';

const Hero = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [brightness, setBrightness] = useState(100);

    const navigate = useNavigate();

    const handleAdminLogin = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate('/admin');
        }, 1000); // 1s transition delay
    };

    return (
        <div className="hero-container">
            {/* Brightness Darkening Overlay */}
            <div className="brightness-overlay" style={{ opacity: 1 - brightness / 100 }}></div>

            {/* Page Transition Overlay */}
            <div className={`page-transition-overlay ${isTransitioning ? 'active' : ''}`}>
                <div className="cyber-doors top-door"></div>
                <div className="cyber-doors bottom-door"></div>

                <div className="transition-content">
                    <div className="access-granted glitch-text" data-text="ACCESS GRANTED">
                        ACCESS GRANTED
                    </div>
                    <div className="loading-bar-container">
                        <div className="loading-bar"></div>
                    </div>
                </div>
            </div>

            <div className="bg-overlay"></div>

            {/* TV Static Overlay */}
            <div className="tv-static"></div>

            {/* Glowing Cyber Orbs */}
            <div className="cyber-orb orb-1"></div>
            <div className="cyber-orb orb-2"></div>
            <div className="cyber-orb orb-3"></div>

            {/* Animated tech grid background */}
            <div className="tech-grid"></div>

            {/* Glowing lines */}
            <div className="glowing-line line-1"></div>
            <div className="glowing-line line-2"></div>
            <div className="glowing-line line-3"></div>

            {/* Floating Tech Elements */}
            <div className="floating-elements">
                <Code className="float-item icon-1" size={32} />
                <Cpu className="float-item icon-2" size={40} />
                <Database className="float-item icon-3" size={28} />
                <Network className="float-item icon-4" size={36} />
                <Terminal className="float-item icon-5" size={45} />
                <Server className="float-item icon-6" size={30} />
                <Wifi className="float-item icon-7" size={35} />
                <div className="float-item text-1">{"</>"}</div>
                <div className="float-item text-2">{"{...}"}</div>
                <div className="float-item text-3">{"0101"}</div>
            </div>

            <img src={bgImage} alt="Background" className="bg-image" />

            {/* Brightness Control Slider */}
            <div className="brightness-control glass">
                <Sun className="brightness-icon" size={20} />
                <input
                    type="range"
                    min="20"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                    className="brightness-slider"
                />
            </div>

            {/* Top Right Content */}
            <div className="hero-main-section glass animate-fade-in relative z-10">
                <div className="scanner-line"></div>
                <h1 className="title">
                    Welcome to&nbsp;&nbsp;<span className="text-gradient glitch-text" data-text="IT DEPARTMENT">IT DEPARTMENT</span>
                </h1>

                <div className="subtitle-container">
                    <p className="typewriter-text">Empowering the Future of Technology</p>
                </div>

                <nav className="nav-links">
                    <button className="nav-btn group">
                        <span className="btn-text">Home</span>
                        <span className="btn-hover-line"></span>
                    </button>
                    <button className="nav-btn group">
                        <span className="btn-text">Department</span>
                        <span className="btn-hover-line"></span>
                    </button>
                    <button className="nav-btn group">
                        <span className="btn-text">Alumini</span>
                        <span className="btn-hover-line"></span>
                    </button>
                    <button className="nav-btn group" onClick={() => navigate('/gallery')}>
                        <span className="btn-text">Gallery</span>
                        <span className="btn-hover-line"></span>
                    </button>
                    <button className="nav-btn group">
                        <span className="btn-text">Contact</span>
                        <span className="btn-hover-line"></span>
                    </button>
                </nav>

                <div className="login-wrapper" onMouseLeave={() => setShowLogin(false)}>
                    <button
                        className="main-login-btn cyber-btn"
                        onMouseEnter={() => setShowLogin(true)}
                        onClick={() => setShowLogin(!showLogin)}
                    >
                        <span className="cyber-btn-text">Login Portal</span>
                    </button>

                    <div className={`modules-dropdown ${showLogin ? 'active' : ''}`}>
                        <div className="module-option cyber-option" onClick={handleAdminLogin}>
                            <Shield className="icon-lucide" size={20} />
                            <span>Admin</span>
                            <div className="option-border"></div>
                        </div>
                        <div className="module-option cyber-option" onClick={() => navigate('/faculty')}>
                            <Users className="icon-lucide" size={20} />
                            <span>Faculty</span>
                            <div className="option-border"></div>
                        </div>
                        <div className="module-option cyber-option">
                            <GraduationCap className="icon-lucide" size={20} />
                            <span>Student</span>
                            <div className="option-border"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;;
