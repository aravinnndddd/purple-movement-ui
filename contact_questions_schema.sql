-- Create the contact_questions table
CREATE TABLE contact_questions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- Question data
    question_text text NOT NULL,
    -- Status tracking
    status text DEFAULT 'pending' NOT NULL,
    -- Response data (for admin use)
    response_text text,
    responded_at timestamp with time zone,
    responded_by text,
    -- Additional metadata
    user_agent text,
    ip_address inet,
    CONSTRAINT valid_status CHECK (
        status IN ('pending', 'in-progress', 'answered', 'closed')
    ),
    CONSTRAINT question_not_empty CHECK (length(trim(question_text)) > 0)
);
-- Create indexes for better query performance
CREATE INDEX idx_contact_questions_created_at ON contact_questions(created_at);
CREATE INDEX idx_contact_questions_status ON contact_questions(status);
-- Enable Row Level Security (RLS)
ALTER TABLE contact_questions ENABLE ROW LEVEL SECURITY;
-- Create policy for inserting (anyone can insert)
CREATE POLICY "Allow anonymous question inserts" ON contact_questions FOR
INSERT WITH CHECK (true);
-- Create policy for reading (only authenticated users can read)
CREATE POLICY "Allow authenticated question reads" ON contact_questions FOR
SELECT USING (auth.role() = 'authenticated');
-- Create policy for updating (only authenticated users can update)
CREATE POLICY "Allow authenticated question updates" ON contact_questions FOR
UPDATE USING (auth.role() = 'authenticated');
-- Add comments for documentation
COMMENT ON TABLE contact_questions IS 'Stores user questions from the contact section';
COMMENT ON COLUMN contact_questions.question_text IS 'The question submitted by the user';
COMMENT ON COLUMN contact_questions.status IS 'Current status: pending, in-progress, answered, closed';
COMMENT ON COLUMN contact_questions.response_text IS 'Admin response to the question';
COMMENT ON COLUMN contact_questions.responded_at IS 'Timestamp when question was answered';
COMMENT ON COLUMN contact_questions.responded_by IS 'Admin who responded to the question';
COMMENT ON COLUMN contact_questions.user_agent IS 'User browser/device information';
COMMENT ON COLUMN contact_questions.ip_address IS 'User IP address for analytics';