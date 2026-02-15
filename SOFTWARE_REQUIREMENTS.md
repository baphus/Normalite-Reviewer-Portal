# Software Requirements Specification (SRS)

Normalite Reviewer Portal

## 1. Purpose

This document defines the software requirements for the Normalite Reviewer Portal, a web-based preparation platform for Cebu Normal University (CNU) students and alumni preparing for the Licensure Examination for Teachers (LET). The requirements are derived from the existing website concept and UI screens in this workspace.

## 2. Scope

The system provides:

- Student-facing features: account onboarding, dashboards, mock exams, flashcards, review materials, leaderboards, and profile settings.

- Admin-facing features: content management (subjects, questions, exams, flashcards), user management, analytics and reports, and import/export tools.

Out of scope:

- Proctoring and remote monitoring.

- Payments or e-commerce.

- External LMS integration beyond data export/import.

## 3. Stakeholders

- Students and alumni (primary users)

- Faculty contributors/moderators

- Admins and system operators

- University leadership (report consumers)

## 4. Definitions

- LET: Licensure Examination for Teachers

- Gen Ed: General Education

- Prof Ed: Professional Education

- Major/Specialization: Subject-area content

- Mock Exam: Timed, scored examination simulation

- Flashcard Deck: A set of study flashcards

## 5. Assumptions

- Users are affiliated with CNU and use a school email.

- Content aligns with current LET coverage and CNU standards.

- The system is accessible via modern browsers on desktop and mobile.

## 6. Constraints

- Institutional branding (crimson and gold theme).

- Student accounts must be tied to academic profile data.

- Data privacy for student performance data is required.

## 7. User Roles and Permissions

### 7.1 Student

- Register and authenticate.

- Access mock exams and flashcards.

- View analytics, leaderboards, and exam results.

- Manage profile and preferences.

### 7.2 Faculty/Contributor (Admin Portal Role)

- Create/edit questions.

- Submit questions for moderation.

- Create/update flashcard decks.

### 7.3 Admin

- Full content management.

- Approve/flag questions.

- Manage users and access.

- Generate reports and export data.

- Configure system settings.

## 8. Functional Requirements

### 8.1 Public Website

- The system shall provide a public landing page with product overview, features, and calls to action.

- The system shall allow navigation to login and registration.

### 8.2 Authentication and Registration

- The system shall allow students to register with full name, student ID, and school email.

- The system shall validate that the email domain is @cnu.edu.ph.

- The system shall allow login using email and password.

- The system shall support password visibility toggling.

- The system shall provide a “Forgot password” entry point.

### 8.3 Student Dashboard

- The system shall display progress KPIs (exam performance, mastery, module completion).

- The system shall show subject strengths by percentage.

- The system shall list recent mock exams and allow review.

- The system shall surface a daily challenge prompt.

- The system shall show a weekly leaderboard snapshot.

### 8.4 Mock Exams (Student)

- The system shall list mock exams with categories, duration, and question count.

- The system shall allow search and filter by category.

- The system shall allow starting an exam and show timer.

- The system shall provide question navigation, flagging, and section indicators.

- The system shall allow submission and display results summary.

- The system shall provide detailed mistake analysis with explanations.

- The system shall allow retake and review actions.

### 8.5 Exam Results and Review

- The system shall display overall pass/fail status, total score, and time statistics.

- The system shall provide per-category performance breakdown.

- The system shall show recommendations based on weak areas.

- The system shall allow download of a PDF report.

- The system shall show exam-specific leaderboard standings.

### 8.6 Flashcards

- The system shall list flashcard decks with mastery percent and progress state.

- The system shall allow filtering by category and status (all/in progress/saved/completed).

- The system shall allow opening a deck and flipping cards.

- The system shall show progress and allow next/previous navigation.

- The system shall allow creating a custom deck (student-facing entry point).

### 8.7 Leaderboards

- The system shall provide weekly and all-time leaderboards.

- The system shall show ranks, points, and user highlighting.

- The system shall show featured top performers.

### 8.8 Profile and Settings

- The system shall allow students to update personal info and academic profile.

- The system shall allow changes to review goals and schedule preferences.

- The system shall show account status and joined date.

- The system shall allow navigation to security, notifications, and exam history sections.

### 8.9 Admin Dashboard

- The system shall show total registered users, question bank size, and flagged items.

- The system shall show recent registrations and audit log entries.

- The system shall provide quick actions (invite faculty, export users, backup).

### 8.10 Admin Subjects Management

- The system shall allow creating and managing subjects and categories.

- The system shall show total questions and active exams per subject.

- The system shall show recent content updates.

### 8.11 Admin Subject Details

- The system shall allow editing subject metadata and adding questions.

- The system shall list questions with filters and difficulty levels.

- The system shall allow bulk import/export of questions per subject.

- The system shall surface flagged questions for quality review.

### 8.12 Admin Question Moderation

- The system shall list reported and newly submitted questions.

- The system shall show question details, answer options, and rationale.

- The system shall allow approve, edit, or keep flagged actions.

- The system shall allow moderator notes.

### 8.13 Admin Exams Management

- The system shall list exams with status (live/draft/archived).

- The system shall allow create, edit, duplicate, preview, restore, and delete exams.

### 8.14 Admin Exam Creator

- The system shall allow configuring title, category, duration, sections, and instructions.

- The system shall allow adding questions manually and via bulk import.

- The system shall allow marking correct answers and attaching images.

- The system shall allow draft saving and publishing.

### 8.15 Admin Flashcards Management

- The system shall allow creating and editing flashcard decks.

- The system shall display deck stats (cards, views).

### 8.16 Admin User Management

- The system shall allow searching, filtering, and editing user accounts.

- The system shall show account status (active/pending).

### 8.17 Admin Reports

- The system shall show subject performance, active users, and exam activity.

- The system shall allow export of report data.

### 8.18 Import / Export

- The system shall allow bulk import of questions, users, and subjects via CSV/XLSX.

- The system shall allow export of questions, performance data, and audit logs.

### 8.19 System Settings

- The system shall allow configuration of portal name and contact email.

- The system shall allow enabling guest mode.

- The system shall allow toggling post-exam review availability.

## 9. Non-Functional Requirements

### 9.1 Usability

- Responsive UI for desktop and mobile.

- Consistent navigation across student and admin portals.

### 9.2 Accessibility

- Color contrast sufficient for primary UI text.

- Keyboard navigable controls for forms and exam navigation.

- Screen reader-friendly labels for inputs and buttons.

### 9.3 Performance

- Exam navigation must respond within 300 ms for typical interactions.

- Leaderboards and dashboards load within 2 seconds on a standard broadband connection.

### 9.4 Security

- Passwords stored using a strong one-way hash.

- Role-based access control for admin functions.

- Input validation for all forms and imports.

### 9.5 Privacy and Compliance

- Student performance data is private and only visible to the student and authorized admins.

- Exported data includes access logging.

- System complies with applicable Philippine data protection requirements.

### 9.6 Reliability

- Exam submissions are atomic and idempotent.

- Audit logs for admin actions.

## 10. Data Requirements

### 10.1 Core Entities

- User: id, name, email, role, status, academic profile, goals

- Exam: id, title, category, duration, status, sections, questions

- Question: id, text, options, correct answer, difficulty, tags, rationale

- Exam Attempt: user, exam, answers, score, time, status

- Flashcard Deck: id, title, category, cards, mastery

- Leaderboard Entry: user, points, rank, period

- Audit Log: action, actor, timestamp, payload summary

### 10.2 Data Retention

- Exam attempts retained for at least 2 years.

- Audit logs retained for at least 1 year.

## 11. Integrations

- Email service for password reset and notifications.

- File storage for images attached to questions.

- Export format compatible with CSV and XLSX.

## 12. User Workflows

### 12.1 Student Workflow

1. Register with school email and academic profile.

2. Login and view dashboard insights.

3. Start mock exam, answer questions, submit.

4. Review results and mistake analysis.

5. Use flashcards for focused review.

6. Check leaderboard status and update profile goals.

### 12.2 Admin Workflow

1. Login to admin portal.

2. Review reported questions and approve/edit.

3. Create new mock exam and publish.

4. Monitor reports and export data.

## 13. Reporting Requirements

- Subject performance averages (Gen Ed, Prof Ed, Major).

- Weekly active users.

- Exam activity: score distributions and time spent.

## 14. UI and Branding Requirements

- Use CNU branding colors: Primary #800000, Accent #FFD700 / #F59E0B.

- Typography: Lexend (display) and Noto Sans (body).

- Consistent iconography using Material Symbols.

## 15. Acceptance Criteria (High-Level)

- Students can complete a full mock exam workflow end-to-end.

- Admins can create, publish, and manage exams and questions.

- Leaderboards display weekly and all-time rankings.

- Import/export operations support CSV and XLSX.

- System settings changes are persisted and reflected in the UI.

## 16. Future Considerations

- Adaptive exams and personalized study plans.

- Push notifications and calendar integrations.

- Advanced analytics dashboards for faculty.