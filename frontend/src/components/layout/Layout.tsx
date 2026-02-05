import React from 'react';
import { Navbar } from './Navbar';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    onAddInterview?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onAddInterview }) => {
    return (
        <div className="layout">
            <Navbar onAddClick={onAddInterview} />
            <main className="layout-content">
                {children}
            </main>
        </div>
    );
};
