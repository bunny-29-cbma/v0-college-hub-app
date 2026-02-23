-- Seeding initial data for College Hub
-- Insert departments
INSERT INTO departments (name) VALUES 
    ('Computer Science'),
    ('Electronics'),
    ('Mechanical'),
    ('Civil'),
    ('Mathematics'),
    ('Physics'),
    ('Chemistry'),
    ('English')
ON CONFLICT DO NOTHING;

-- Insert users (passwords are hashed versions of the demo passwords)
INSERT INTO users (email, password_hash, name, role, department, student_id, employee_id) VALUES 
    ('student@college.edu', '$2b$10$demo_hash_student123', 'John Doe', 'student', 'Computer Science', 'CS2024001', NULL),
    ('faculty@college.edu', '$2b$10$demo_hash_faculty123', 'Dr. Jane Smith', 'faculty', 'Computer Science', NULL, 'FAC001'),
    ('hod@college.edu', '$2b$10$demo_hash_hod123', 'Prof. Robert Johnson', 'hod', 'Computer Science', NULL, 'HOD001'),
    ('principal@college.edu', '$2b$10$demo_hash_principal123', 'Dr. Mary Wilson', 'principal', NULL, NULL, 'PRIN001')
ON CONFLICT (email) DO NOTHING;

-- Update departments with HOD references
UPDATE departments SET hod_id = (SELECT id FROM users WHERE email = 'hod@college.edu') WHERE name = 'Computer Science';

-- Insert subjects
INSERT INTO subjects (name, code, department_id, faculty_id) VALUES 
    ('Data Structures', 'CS301', (SELECT id FROM departments WHERE name = 'Computer Science'), (SELECT id FROM users WHERE email = 'faculty@college.edu')),
    ('Database Systems', 'CS302', (SELECT id FROM departments WHERE name = 'Computer Science'), (SELECT id FROM users WHERE email = 'faculty@college.edu')),
    ('Web Development', 'CS303', (SELECT id FROM departments WHERE name = 'Computer Science'), (SELECT id FROM users WHERE email = 'faculty@college.edu'))
ON CONFLICT DO NOTHING;

-- Insert sample attendance records
INSERT INTO attendance (student_id, subject_id, date, status, marked_by) VALUES 
    ((SELECT id FROM users WHERE email = 'student@college.edu'), (SELECT id FROM subjects WHERE code = 'CS301'), CURRENT_DATE - INTERVAL '1 day', 'present', (SELECT id FROM users WHERE email = 'faculty@college.edu')),
    ((SELECT id FROM users WHERE email = 'student@college.edu'), (SELECT id FROM subjects WHERE code = 'CS302'), CURRENT_DATE - INTERVAL '1 day', 'present', (SELECT id FROM users WHERE email = 'faculty@college.edu')),
    ((SELECT id FROM users WHERE email = 'student@college.edu'), (SELECT id FROM subjects WHERE code = 'CS303'), CURRENT_DATE - INTERVAL '1 day', 'late', (SELECT id FROM users WHERE email = 'faculty@college.edu'))
ON CONFLICT DO NOTHING;

-- Insert syllabus progress
INSERT INTO syllabus_progress (subject_id, topic, description, progress_percentage, status, updated_by) VALUES 
    ((SELECT id FROM subjects WHERE code = 'CS301'), 'Arrays and Linked Lists', 'Introduction to basic data structures', 100, 'completed', (SELECT id FROM users WHERE email = 'faculty@college.edu')),
    ((SELECT id FROM subjects WHERE code = 'CS301'), 'Trees and Graphs', 'Advanced data structures and algorithms', 75, 'in-progress', (SELECT id FROM users WHERE email = 'faculty@college.edu')),
    ((SELECT id FROM subjects WHERE code = 'CS302'), 'SQL Fundamentals', 'Basic SQL queries and database design', 60, 'in-progress', (SELECT id FROM users WHERE email = 'faculty@college.edu'))
ON CONFLICT DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (title, description, category, student_id, assigned_by, status, due_date) VALUES 
    ('Complete React Project', 'Build a full-stack web application using React and Node.js', 'Web Development', (SELECT id FROM users WHERE email = 'student@college.edu'), (SELECT id FROM users WHERE email = 'faculty@college.edu'), 'in-progress', CURRENT_DATE + INTERVAL '5 days'),
    ('Machine Learning Assignment', 'Implement a classification algorithm using Python', 'AI/ML', (SELECT id FROM users WHERE email = 'student@college.edu'), (SELECT id FROM users WHERE email = 'faculty@college.edu'), 'pending', CURRENT_DATE + INTERVAL '10 days')
ON CONFLICT DO NOTHING;

-- Insert sample leave requests
INSERT INTO leave_requests (user_id, type, start_date, end_date, reason, status) VALUES 
    ((SELECT id FROM users WHERE email = 'faculty@college.edu'), 'Personal Leave', CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE + INTERVAL '7 days', 'Family function', 'pending')
ON CONFLICT DO NOTHING;

-- Insert sample messages
INSERT INTO messages (from_user_id, to_user_id, subject, message, priority) VALUES 
    ((SELECT id FROM users WHERE email = 'faculty@college.edu'), (SELECT id FROM users WHERE email = 'hod@college.edu'), 'Request for Additional Lab Equipment', 'Dear HOD, I would like to request additional computers for the programming lab. The current setup is insufficient for the increasing number of students.', 'high')
ON CONFLICT DO NOTHING;
