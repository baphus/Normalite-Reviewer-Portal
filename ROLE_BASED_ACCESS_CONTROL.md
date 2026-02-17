# Role-Based Access Control

## Overview

The Normalite EDGE portal now has **two types of users**: **Admins (Reviewers)** and **Reviewees**. Admins are the same as reviewers and have full management access.

* * *

## User Roles

### Admins (Reviewers)

Admins are in charge of the whole platform. They can:

- Create and manage tests
- Host video sessions
- See all student submissions
- Manage users (add, remove, assign roles)
- Change system settings

### Reviewees

Reviewees are students focused on learning. They can:

- Access study materials
- Take tests and exams
- Join video sessions (cannot host)

- ❌ Cannot create tests or host sessions
- ❌ Cannot see other students’ submissions
- ❌ Cannot access admin or reviewer-only pages

* * *

## How It Works

1. **When you register**

    - Registration is now exclusively for **Reviewees**.
    - Reviewees provide their details (Name, Year, Course, Specialization, etc.) and are automatically directed to the Student Dashboard.
    - Admin (Reviewer) accounts are now managed separately or pre-configured.

2. **When you log in**

    - The system checks your role and sends you to the right dashboard.
3. **Page Access**

    - **Admins (Reviewers)** → Can access everything, including system settings and user management.
    - **Reviewees** → Can only access learning materials and exams.
4. **Navigation**

    - Reviewees only see student-related menus.
    - Admins (Reviewers) see all menus, including system settings and user management.
5. **Features**

    - Video sessions (Conferences): Only Admins (Reviewers) can host/create. Reviewees can join only.

* * *

## Testing

### As a Reviewee

- Register as Reviewee → go to Student Dashboard
- You can join video sessions and participate in forums
- You **cannot** access Revie

### As an Admin

-- Register as Admin (Reviewer) → go to Admin Dashboard
-- You can do everything, including manage users and system settings

* * *

## Important Notes

- This version is a **prototype**, meaning it mostly works in the browser.
- In a real system, roles and permissions should be checked on the server to keep things secure.
- Sensitive features should always be protected so only the correct role can access them.

* * *

## Summary

Now, Normalite EDGE has two user roles:

- **Admins (Reviewers):** Full control of the platform
- **Reviewees:** Focus on learning and participating

The portal ensures that each user only sees and can use the features allowed for their role.