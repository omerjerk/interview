import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { InterviewCard } from './components/interview/InterviewCard';
import { InterviewForm } from './components/interview/InterviewForm';
import { Interview } from './types';

// Mock data
const INITIAL_INTERVIEWS: Interview[] = [
    {
        id: '1',
        company: 'Tech Corp',
        role: 'Frontend Engineer',
        status: 'Applied',
        date: '2024-03-10T10:00:00Z',
    },
    {
        id: '2',
        company: 'Startup Inc',
        role: 'Full Stack Developer',
        status: 'Technical Round',
        date: '2024-03-12T14:30:00Z',
    },
    {
        id: '3',
        company: 'Big Data Co',
        role: 'Backend Engineer',
        status: 'Rejected',
        date: '2024-02-28T09:00:00Z'
    }
];

function App() {
    const [interviews, setInterviews] = useState<Interview[]>(INITIAL_INTERVIEWS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAddClick = () => {
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (id: string) => {
        setEditingId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleSubmit = (data: Omit<Interview, 'id'>) => {
        if (editingId) {
            setInterviews(prev => prev.map(item =>
                item.id === editingId ? { ...data, id: editingId } : item
            ));
        } else {
            const newInterview: Interview = {
                ...data,
                id: Math.random().toString(36).substr(2, 9),
            };
            setInterviews(prev => [newInterview, ...prev]);
        }
        handleCloseModal();
    };

    const editingInterview = editingId ? interviews.find(i => i.id === editingId) : undefined;

    return (
        <Layout onAddInterview={handleAddClick}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Dashboard</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Welcome back! Here are your active applications.
                </p>
            </header>

            {interviews.length === 0 ? (
                <div style={{ padding: '4rem', border: '1px dashed var(--color-border)', borderRadius: '0.75rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    <p style={{ marginBottom: '1rem' }}>No interviews yet. Add one to get started!</p>
                    <Button onClick={handleAddClick}>Add First Interview</Button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {interviews.map(interview => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            onEdit={handleEditClick}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingId ? 'Edit Interview' : 'Add New Interview'}
            >
                <InterviewForm
                    initialData={editingInterview}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </Layout>
    );
}

export default App;
