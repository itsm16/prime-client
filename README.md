## Frontend Routes

### Public Routes
- `/register` - User registration page
- `/login` - User login page
- `/logout` - User logout page

### User Routes
- `/` - Jobs listing page (view all available jobs)
- `/apply/:jobId` - Job application page (apply for specific job)

### Admin Routes
- `/` - Jobs listing page (view, create, update, delete jobs)
- `/apply/:jobId` - Job application page (view job details)

### Error Routes
- `/not-found` - 404 page

### Route Access Control
- **Public**: `/register`, `/login`, `/logout`
- **Users**: `/`, `/apply/:jobId` (can view jobs and apply)
- **Admins**: `/`, `/apply/:jobId` (full CRUD operations on jobs)

### Component Features
- **Jobs Page**: Displays all jobs with filtering and search
- **JobPage**: Shows job details and application form
- **CreateJobModal**: Modal for creating/editing jobs (admin only)
- **JobCard**: Individual job card with apply/edit/delete actions
