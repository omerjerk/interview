import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Interview, InterviewStatus } from '../../types';
import './InterviewCard.css';

interface InterviewCardProps {
    interview: Interview;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const getStatusColor = (status: InterviewStatus): string => {
    switch (status) {
        case 'Applied': return 'var(--color-accent)';
        case 'Phone Screen': return '#a78bfa'; // Purple
        case 'Technical Round': return '#fbbf24'; // Amber
        case 'Behavioral': return '#f87171'; // Red/Pinkish
        case 'Offer': return '#4ade80'; // Green
        case 'Rejected': return '#94a3b8'; // Slate
        case 'Ghosted': return '#475569'; // Dark Slate
        default: return 'var(--color-text-secondary)';
    }
};



export const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onEdit }) => {
    const statusColor = getStatusColor(interview.status);

    return (
        <Card hoverable className="interview-card">
            <div className="interview-card-header">
                <h3 className="interview-role">{interview.role}</h3>
                <span
                    className="interview-status"
                    style={{
                        color: statusColor,
                        backgroundColor: `${statusColor}20` // 12% opacity hex
                    }}
                >
                    {interview.status}
                </span>
            </div>

            <p className="interview-company">{interview.company}</p>

            <div className="interview-meta">
                <span className="interview-date">📅 {new Date(interview.date).toLocaleDateString()}</span>
            </div>

            <div className="interview-footer">
                <Button variant="secondary" size="sm" onClick={() => onEdit?.(interview.id)} style={{ width: '100%' }}>
                    View Details
                </Button>
            </div>
        </Card>
    );
};
