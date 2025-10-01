-- Create the join_applications table
CREATE TABLE join_applications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- Step 1: Selected role
    selected_role text NOT NULL,
    -- Step 2: Form data
    defining_category text NOT NULL,
    why_here text NOT NULL,
    portfolio_link text,
    -- Step 3: Personal details
    name text,
    email text,
    phone text,
    not_interested boolean DEFAULT false NOT NULL,
    -- Additional metadata
    user_agent text,
    ip_address inet,
    CONSTRAINT valid_email CHECK (
        email IS NULL
        OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    ),
    CONSTRAINT valid_phone CHECK (
        phone IS NULL
        OR length(phone) >= 10
    ),
    CONSTRAINT required_fields CHECK (
        not_interested = true
        OR (
            name IS NOT NULL
            AND email IS NOT NULL
            AND phone IS NOT NULL
        )
    )
);
-- Create indexes for better query performance
CREATE INDEX idx_join_applications_created_at ON join_applications(created_at);
CREATE INDEX idx_join_applications_selected_role ON join_applications(selected_role);
CREATE INDEX idx_join_applications_not_interested ON join_applications(not_interested);
-- Enable Row Level Security (RLS)
ALTER TABLE join_applications ENABLE ROW LEVEL SECURITY;
-- Create policy for inserting (anyone can insert)
CREATE POLICY "Allow anonymous inserts" ON join_applications FOR
INSERT WITH CHECK (true);
-- Create policy for reading (only authenticated users can read)
CREATE POLICY "Allow authenticated reads" ON join_applications FOR
SELECT USING (auth.role() = 'authenticated');
-- Add comments for documentation
COMMENT ON TABLE join_applications IS 'Stores join form submissions from the Purple Movement website';
COMMENT ON COLUMN join_applications.selected_role IS 'Role selected in Step 1 (e.g., Student, Professional, etc.)';
COMMENT ON COLUMN join_applications.defining_category IS 'What defines the user (e.g., Innovation & Technology)';
COMMENT ON COLUMN join_applications.why_here IS 'User explanation of why they want to join';
COMMENT ON COLUMN join_applications.portfolio_link IS 'Optional portfolio/website link';
COMMENT ON COLUMN join_applications.not_interested IS 'Whether user opted out of sharing personal details';