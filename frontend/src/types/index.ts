export type InterviewStatus = 'Applied' | 'Phone Screen' | 'Technical Round' | 'Behavioral' | 'Offer' | 'Rejected' | 'Ghosted';

export interface Interview {
    id: string;
    company: string;
    role: string;
    status: InterviewStatus;
    date: string; // ISO date string
    notes?: string;
    salary?: string;
}
