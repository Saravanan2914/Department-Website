import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import './Gallery.css';

const categories = [
    "All",
    "On Campus",
    "Off Campus",
    "Academics",
    "Symposium",
    "Placements",
    "Industrial Visit",
    "Hackathons",
    "NPTEL",
    "Achievements II-Year",
    "Achievements III-Year",
    "Achievements Final Year"
];

// Placeholder data for the gallery
const initialGalleryItems = [
    { id: 1, category: "On Campus", imageUrl: "https://picsum.photos/seed/oncampus1/600/400", title: "Annual Day Celebration" },
    { id: 2, category: "On Campus", imageUrl: "https://picsum.photos/seed/oncampus2/600/400", title: "Tech Fest Inauguration" },
    { id: 3, category: "Off Campus", imageUrl: "https://picsum.photos/seed/offcampus1/600/400", title: "Community Service" },
    { id: 4, category: "Academics", imageUrl: "https://picsum.photos/seed/acad1/600/400", title: "Guest Lecture on AI" },
    { id: 5, category: "Academics", imageUrl: "https://picsum.photos/seed/acad2/600/400", title: "Project Expo" },
    { id: 6, category: "Symposium", imageUrl: "https://picsum.photos/seed/symp1/600/400", title: "Cyber Security Workshop" },
    { id: 7, category: "Placements", imageUrl: "https://picsum.photos/seed/place1/600/400", title: "MNC Recruitment Drive" },
    { id: 8, category: "Industrial Visit", imageUrl: "https://picsum.photos/seed/ind1/600/400", title: "Visit to Tech Park" },
    { id: 9, category: "Hackathons", imageUrl: "https://picsum.photos/seed/hack1/600/400", title: "24-Hour Codefest" },
    { id: 10, category: "NPTEL", imageUrl: "https://picsum.photos/seed/nptel1/600/400", title: "NPTEL Certification Ceremony" },
    { id: 11, category: "Achievements II-Year", imageUrl: "https://picsum.photos/seed/ach2_1/600/400", title: "Best Innovator Award" },
    { id: 12, category: "Achievements III-Year", imageUrl: "https://picsum.photos/seed/ach3_1/600/400", title: "National Level Hackathon Winners" },
    { id: 13, category: "Achievements Final Year", imageUrl: "https://picsum.photos/seed/ach4_1/600/400", title: "Startup Grant Winners" },
];

const Gallery = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredItems = activeCategory === "All"
        ? initialGalleryItems
        : initialGalleryItems.filter(item => item.category === activeCategory);

    return (
        <div className="gallery-container">
            {/* Background elements */}
            <div className="bg-overlay"></div>
            <div className="tech-grid"></div>
            <div className="glowing-line line-1"></div>
            <div className="glowing-line line-2"></div>

            <div className="gallery-content">
                <button className="back-btn cyber-btn" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </button>

                <div className="header-section">
                    <h1 className="title glitch-text" data-text="DEPARTMENT GALLERY">
                        DEPARTMENT GALLERY
                    </h1>
                    <p className="subtitle text-gradient">Capturing Moments of Excellence & Innovation</p>
                </div>

                <div className="filter-container glass">
                    <div className="filter-header">
                        <Filter size={18} />
                        <span>Filter by Category</span>
                    </div>
                    <div className="categories-wrapper">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="gallery-grid">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="gallery-card glass animate-fade-in">
                            <div className="card-image-wrapper">
                                <img src={item.imageUrl} alt={item.title} className="gallery-image" loading="lazy" />
                                <div className="image-overlay">
                                    <span className="view-text">Click to View</span>
                                </div>
                            </div>
                            <div className="card-info">
                                <span className="card-category text-gradient">{item.category}</span>
                                <h3 className="card-title">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="empty-state">
                        <p>No images found for this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
