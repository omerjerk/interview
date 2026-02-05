import React from 'react';
import { Button } from '../ui/Button';
import './Navbar.css';

interface NavbarProps {
    onAddClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddClick }) => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    Interview Tracker
                </div>
                <div className="navbar-actions">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                    <Button variant="ghost" size="sm">Analytics</Button>
                    <div className="navbar-separator"></div>
                    <Button variant="primary" size="sm" onClick={onAddClick}>
                        + Add Interview
                    </Button>
                </div>
            </div>
        </header>
    );
};
