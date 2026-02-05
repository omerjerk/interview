import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Interview, InterviewStatus } from '../../types';

interface InterviewFormProps {
    initialData?: Partial<Interview>;
    onSubmit: (data: Omit<Interview, 'id'>) => void;
    onCancel: () => void;
}

const STATUS_OPTIONS: InterviewStatus[] = [
    'Applied', 'Phone Screen', 'Technical Round', 'Behavioral', 'Offer', 'Rejected', 'Ghosted'
];

export const InterviewForm: React.FC<InterviewFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        company: initialData?.company || '',
        role: initialData?.role || '',
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        status: initialData?.status || 'Applied' as InterviewStatus,
        notes: initialData?.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            company: formData.company,
            role: formData.role,
            date: new Date(formData.date).toISOString(),
            status: formData.status,
            notes: formData.notes,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Google"
                required
            />

            <Input
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Senior Frontend Engineer"
                required
            />

            <div className="input-group">
                <label className="input-label">Status</label>
                <select
                    className="input-field"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as InterviewStatus })}
                >
                    {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
            />

            <div className="input-group">
                <label className="input-label">Notes</label>
                <textarea
                    className="input-field"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Rounds, interviewers, thoughts..."
                    rows={3}
                    style={{ resize: 'vertical' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    {initialData ? 'Update Interview' : 'Add Interview'}
                </Button>
            </div>
        </form>
    );
};
