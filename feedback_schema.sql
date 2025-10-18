-- Create the feedback_submissions table
CREATE TABLE feedback_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- Reaction data
    reaction text,
    -- Feedback text
    feedback_text text,
    -- Additional metadata
    user_agent text,
    ip_address inet,
    CONSTRAINT valid_reaction CHECK (
        reaction IS NULL
        OR reaction IN (
            'very-sad',
            'sad',
            'neutral',
            'happy',
            'very-happy'
        )
    ),
    CONSTRAINT at_least_one_field CHECK (
        reaction IS NOT NULL
        OR feedback_text IS NOT NULL
    )
);
-- Create indexes for better query performance
CREATE INDEX idx_feedback_submissions_created_at ON feedback_submissions(created_at);
CREATE INDEX idx_feedback_submissions_reaction ON feedback_submissions(reaction);
-- Enable Row Level Security (RLS)
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;
-- Create policy for inserting (anyone can insert)
CREATE POLICY "Allow anonymous feedback inserts" ON feedback_submissions FOR
INSERT WITH CHECK (true);
-- Create policy for reading (only authenticated users can read)
CREATE POLICY "Allow authenticated feedback reads" ON feedback_submissions FOR
SELECT USING (auth.role() = 'authenticated');
-- Add comments for documentation
COMMENT ON TABLE feedback_submissions IS 'Stores user feedback and reactions from the website';
COMMENT ON COLUMN feedback_submissions.reaction IS 'User reaction: very-sad, sad, neutral, happy, very-happy';
COMMENT ON COLUMN feedback_submissions.feedback_text IS 'Optional text feedback from user';
COMMENT ON COLUMN feedback_submissions.user_agent IS 'User browser/device information';
COMMENT ON COLUMN feedback_submissions.ip_address IS 'User IP address for analytics';