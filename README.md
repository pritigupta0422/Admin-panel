# Nexix Admin Dashboard

Nexix Admin is a full-stack admin dashboard web application built for a technology company. It is designed with a premium, responsive React interface styled with Tailwind CSS, backed by an Express.js Node API, and integrated directly with Supabase (PostgreSQL) for secure, session-aware authentication and Row Level Security (RLS).

---

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS v3, React Router DOM, Axios, Lucide Icons
- **Backend**: Node.js, Express, @supabase/supabase-js, CORS, Morgan logging
- **Database & Auth**: Supabase (PostgreSQL hosted, using dynamic request token forwarding for Row Level Security)

---

## Folder Structure
```
/client       # React Single Page Application (Vite project)
/server       # Express API Server using Supabase JS client
schema.sql    # Database schema DDL, RLS policies, and seed data
.env.example  # Global environment settings template
package.json  # Root package runner scripts
```

---

## Supabase Database Setup

Follow these steps to set up your Supabase project:

1. **Create a Supabase Project**: Go to [Supabase Console](https://supabase.com) and click **New Project**.
2. **Execute SQL Script**: 
   - Open the **SQL Editor** from the left panel in the Supabase Dashboard.
   - Click **New query**.
   - Copy the entire contents of [schema.sql](./schema.sql) and paste it into the editor.
   - Click **Run** to execute the query. This will:
     - Create all 6 tables (`leads`, `portfolio`, `blog_posts`, `team_members`, `careers`, `analytics_events`).
     - Enable Row Level Security (RLS) on each table.
     - Add security policies allowing all operations (`ALL`) for `authenticated` users only.
     - Seed your database with sample records (10 leads, 5 projects, 5 blog posts, 5 team members, 5 career openings, and initial analytics views).
3. **Register the Admin User**:
   - In the Supabase Dashboard, navigate to **Authentication** -> **Users**.
   - Click **Add User** -> **Create User**.
   - Enter Email: `admin@nexix.tech` and Password: `admin123`.
   - Toggle "Auto-confirm user" to avoid email verification, then save.

---

## Configuration Settings (.env)

Configure your project API keys. Copy the `.env.example` templates to `.env`:

### Root / Server Configurations (`.env` and `/server/.env`)
Create a `.env` in the root workspace and in the `/server` folder:
```ini
PORT=5000
CLIENT_URL=http://localhost:5173

# Fetch these from Project Settings -> API in your Supabase Dashboard
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-api-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Client Configurations (`/client/.env`)
Create a `.env` in the `/client` folder:
```ini
VITE_API_URL=http://localhost:5000/api
```

---

## Installation & Running Locally

Ensure Node.js (v18+) is installed. Run the commands below in your terminal from the root workspace folder:

### 1. Install Dependencies
Install packages for both the client and server projects:
```bash
npm run install-all
```

### 2. Run the Express Backend Server
Start the Express server on port 5000:
```bash
npm run server
```

### 3. Run the React Client
In a separate terminal window, start the Vite client server on port 5173:
```bash
npm run client
```

Open [http://localhost:5173](http://localhost:5173) in your browser. You will be redirected to the `/login` view. Use the credentials `admin@nexix.tech` / `admin123` to log in and access the full-stack dashboard.

---

## API Endpoints List

All routes are mounted under `/api` and require an active session token passed as a Bearer token in the `Authorization` header.

### Authentication (`/api/auth`)
- `POST /login`: Receives credentials, calls Supabase `signInWithPassword`, returns token/session.
- `POST /logout`: Revokes active session.
- `GET /me`: Decodes JWT token and returns current user details.

### Main Dashboards (`/api/dashboard`)
- `GET /summary`: Resolves counts, live indicators, recent lists, and service totals in parallel queries.

### Leads (`/api/leads`)
- `GET /`: Lists paginated leads, handles `?page=X&limit=Y` and search query `?q=searchterm`.
- `POST /`: Inserts new lead records.
- `PUT /:id`: Edits lead attributes.
- `DELETE /:id`: Deletes lead record.

### Portfolio (`/api/portfolio`), Blogs (`/api/blog`), Team (`/api/team`), Careers (`/api/careers`)
- Direct CRUD mappings supporting search filtering (`?q=`) and edits.

### Analytics (`/api/analytics`)
- `GET /summary`: Compiles page views, unique visitors, average session length, and conversion rates.
- `GET /top-pages`: Aggregates page traffic lists by path sorted descending.
