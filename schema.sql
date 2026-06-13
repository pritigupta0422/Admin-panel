-- Nexix Admin Database Schema and Seed Data

-- 1. Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    source TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    tech_stack TEXT NOT NULL,
    client TEXT NOT NULL,
    description TEXT,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'pending')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Create Careers Table
CREATE TABLE IF NOT EXISTS careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position TEXT NOT NULL,
    department TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'full_time' CHECK (type IN ('full_time', 'contract', 'internship')),
    description TEXT,
    applicants INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('open', 'review', 'draft', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Create Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    unique_visitors INTEGER NOT NULL DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow all operations for authenticated users only
DROP POLICY IF EXISTS "Authenticated users only" ON leads;
CREATE POLICY "Authenticated users only" ON leads
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users only" ON portfolio;
CREATE POLICY "Authenticated users only" ON portfolio
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users only" ON blog_posts;
CREATE POLICY "Authenticated users only" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users only" ON team_members;
CREATE POLICY "Authenticated users only" ON team_members
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users only" ON careers;
CREATE POLICY "Authenticated users only" ON careers
    FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users only" ON analytics_events;
CREATE POLICY "Authenticated users only" ON analytics_events
    FOR ALL USING (auth.role() = 'authenticated');


-- Seed Data

-- 10 Sample Leads
INSERT INTO leads (name, email, phone, service, source, notes, status, created_at) VALUES
('John Doe', 'john.doe@example.com', '+1-555-0199', 'Mobile App', 'Google Search', 'Interested in building a cross-platform iOS/Android app.', 'new', now() - interval '2 days'),
('Jane Smith', 'jane.smith@example.com', '+1-555-0182', 'Web Development', 'Referral', 'Needs a custom e-commerce solution with Stripe integration.', 'in_progress', now() - interval '5 days'),
('Robert Johnson', 'robert.j@example.com', '+1-555-0143', 'Cloud Migration', 'LinkedIn', 'Wants to migrate legacy server infrastructure to AWS.', 'new', now() - interval '1 day'),
('Emily Davis', 'emily.d@example.com', '+1-555-0112', 'UI/UX Design', 'Dribbble', 'Redesigning existing SaaS platform dashboard.', 'done', now() - interval '10 days'),
('Michael Brown', 'm.brown@example.com', '+1-555-0165', 'Web Development', 'Google Search', 'Needs a landing page for their new marketing campaign.', 'new', now() - interval '4 hours'),
('William Wilson', 'william@example.com', '+1-555-0176', 'Mobile App', 'Referral', 'Fitness tracking app proposal.', 'in_progress', now() - interval '4 days'),
('Olivia Taylor', 'olivia.t@example.com', '+1-555-0131', 'SEO Optimization', 'Google Search', 'SEO audit and continuous optimization for retail shop.', 'done', now() - interval '12 days'),
('James Anderson', 'james.a@example.com', '+1-555-0188', 'Cloud Migration', 'LinkedIn', 'Kubernetes cluster deployment.', 'in_progress', now() - interval '3 days'),
('Sophia Thomas', 'sophia@example.com', '+1-555-0129', 'UI/UX Design', 'Dribbble', 'Design system guidelines for corporate website.', 'new', now() - interval '6 days'),
('David Jackson', 'david.j@example.com', '+1-555-0104', 'Web Development', 'Google Search', 'API integration support for logistics platform.', 'done', now() - interval '15 days');

-- 5 Portfolio Projects
INSERT INTO portfolio (name, category, tech_stack, client, description, visible, created_at) VALUES
('Nexix Cloud Platform', 'Cloud Migration', 'AWS, Terraform, Kubernetes', 'Stellar Corp', 'Successfully migrated client core infrastructure to a containerized multi-region AWS environment.', true, now() - interval '30 days'),
('Apex Fitness Tracker', 'Mobile App', 'React Native, Expo, Redux Toolkit', 'Apex Fit Ltd', 'Built a high-performance fitness tracker supporting GPS routes, custom training plans, and heart rate integration.', true, now() - interval '45 days'),
('Elevate Portal', 'Web Development', 'Next.js, Tailwind CSS, PostgreSQL', 'Elevate Real Estate', 'A premium, search-optimized property listing portal featuring map overlays, virtual tours, and CRM integrations.', true, now() - interval '15 days'),
('Zenith Design System', 'UI/UX Design', 'Figma, React, Storybook', 'Internal Project', 'A unified, accessible design library utilized across all client and internal products to enforce brand consistency.', false, now() - interval '60 days'),
('GreenCart E-Commerce', 'Web Development', 'Vite, Express, Stripe, Supabase', 'GreenCart Co.', 'Created an environment-friendly online marketplace featuring real-time inventory tracking and carbon offset calculator.', true, now() - interval '10 days');

-- 5 Blog Posts
INSERT INTO blog_posts (title, author, category, content, status, published_at, created_at) VALUES
('Scaling Express APIs in 2026', 'Admin User', 'Backend', 'Scaling backend services is crucial in today''s high-demand web landscape. This post details cluster setups, database connection pooling with Supabase, and caching layers...', 'published', now() - interval '2 days', now() - interval '3 days'),
('The Future of Tailwind CSS', 'Jane Smith', 'Frontend', 'With new updates changing the way utility-first CSS engines work, we examine CSS variables, performance gains, and easier configurations...', 'published', now() - interval '5 days', now() - interval '6 days'),
('Introduction to Supabase RLS', 'Admin User', 'Security', 'Row Level Security is the bedrock of serverless database architectures. Learn how to configure policies to secure your PostgreSQL tables...', 'draft', NULL, now() - interval '1 day'),
('Mastering React Router v6', 'John Doe', 'Frontend', 'A comprehensive walkthrough of loaders, actions, and layouts in React Router for building clean, nested application layouts...', 'pending', NULL, now() - interval '4 days'),
('Designing for Accessibility', 'Emily Davis', 'UI/UX', 'Web accessibility is not an afterthought. We discuss semantic markup, ARIA roles, contrast standards, and keyboard navigation techniques...', 'published', now() - interval '7 days', now() - interval '8 days');

-- 5 Team Members
INSERT INTO team_members (name, role, department, email, status, created_at) VALUES
('Alex Rivera', 'Principal Architect', 'Engineering', 'alex@nexix.tech', 'active', now() - interval '120 days'),
('Sarah Chen', 'Senior UX Designer', 'Design', 'sarah@nexix.tech', 'active', now() - interval '90 days'),
('Marcus Brody', 'Product Manager', 'Management', 'marcus@nexix.tech', 'active', now() - interval '60 days'),
('Elena Rostova', 'Frontend Engineer', 'Engineering', 'elena@nexix.tech', 'active', now() - interval '45 days'),
('David Miller', 'DevOps Specialist', 'Engineering', 'david.m@nexix.tech', 'inactive', now() - interval '15 days');

-- 5 Careers / Jobs Listings
INSERT INTO careers (position, department, type, description, applicants, status, created_at) VALUES
('Senior React Developer', 'Engineering', 'full_time', 'Seeking a talented React Developer to join our core team to work on next-generation UI solutions.', 14, 'open', now() - interval '12 days'),
('Product Designer', 'Design', 'full_time', 'Lead UX/UI designers to establish our design guidelines and build intuitive user flows.', 8, 'open', now() - interval '8 days'),
('Cloud Engineer Intern', 'Engineering', 'internship', 'Familiarity with AWS, Docker, and CI/CD pipelines preferred. 6-month program with potential full-time conversion.', 23, 'review', now() - interval '20 days'),
('Technical Writer', 'Marketing', 'contract', 'Create engaging developer-focused guides, blog posts, and technical documentation.', 3, 'draft', now() - interval '2 days'),
('Backend Team Lead', 'Engineering', 'full_time', 'Lead our backend engineers to build highly scalable REST/GraphQL Node APIs.', 0, 'closed', now() - interval '30 days');

-- Basic Analytics Data for the Current Month (Seeded for dashboard analytics)
INSERT INTO analytics_events (page, views, unique_visitors, recorded_at) VALUES
('/', 4520, 1890, now() - interval '15 days'),
('/leads', 1250, 480, now() - interval '14 days'),
('/portfolio', 890, 320, now() - interval '13 days'),
('/blog', 1400, 670, now() - interval '12 days'),
('/team', 450, 210, now() - interval '11 days'),
('/careers', 980, 540, now() - interval '10 days'),
('/analytics', 210, 80, now() - interval '9 days'),
('/', 5120, 2150, now() - interval '8 days'),
('/leads', 1420, 590, now() - interval '7 days'),
('/portfolio', 950, 410, now() - interval '6 days'),
('/blog', 1620, 820, now() - interval '5 days'),
('/team', 510, 240, now() - interval '4 days'),
('/careers', 1100, 610, now() - interval '3 days'),
('/analytics', 240, 95, now() - interval '2 days'),
('/', 6010, 2520, now() - interval '1 day');
