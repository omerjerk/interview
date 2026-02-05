import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Type definition for Interview (conceptual)
/*
interface Interview {
  id: string;
  company: string;
  role: string;
  status: string;
  date: string;
  notes?: string;
}
*/

// In-memory mock data
let interviews = [
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
        status: 'Interviewing',
        date: '2024-03-12T14:30:00Z',
    },
];

// GET all interviews
app.get('/api/interviews', (req, res) => {
    res.json(interviews);
});

// GET by ID
app.get('/api/interviews/:id', (req, res) => {
    const interview = interviews.find(i => i.id === req.params.id);
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
});

// POST new interview
app.post('/api/interviews', (req, res) => {
    const { company, role, status, date, notes } = req.body;
    if (!company || !role || !status || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newInterview = {
        id: uuidv4(),
        company,
        role,
        status,
        date,
        notes: notes || ''
    };

    interviews.unshift(newInterview);
    res.status(201).json(newInterview);
});

// PUT update interview
app.put('/api/interviews/:id', (req, res) => {
    const { id } = req.params;
    const index = interviews.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Interview not found' });

    const updatedInterview = {
        ...interviews[index],
        ...req.body,
        id // ensure id doesn't change
    };

    interviews[index] = updatedInterview;
    res.json(updatedInterview);
});

// DELETE interview
app.delete('/api/interviews/:id', (req, res) => {
    const { id } = req.params;
    const index = interviews.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Interview not found' });

    interviews = interviews.filter(i => i.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
