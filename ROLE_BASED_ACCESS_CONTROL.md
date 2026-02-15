# Role-Based Access Control Implementation

## Overview
The Normalite EDGE portal now implements comprehensive role-based access control to differentiate between **Reviewers** and **Reviewees**.

## User Roles

### Reviewers (Admins)
Reviewers have full access to create, manage, and monitor educational content:
- ✅ Create, post, and schedule tests
- ✅ Host video conferences
- ✅ View and monitor submissions and scores
- ✅ Access moderation features in forums
- ✅ Manage all tests and assessments

### Reviewees (Students)
Reviewees have limited access focused on learning:
- ✅ Access review materials and study content
- ✅ Take tests and exams
- ✅ Join video conferences (cannot host)
- ✅ Participate in forums
- ❌ Cannot create or schedule tests
- ❌ Cannot host video conferences
- ❌ Cannot view other students' submissions
- ❌ Cannot access admin/reviewer-only pages

## Implementation Details

### 1. Registration (register.html)
- Users select their role during registration: **Reviewer** or **Reviewee**
- Access code required for all registrations
- Role is stored in `localStorage.setItem('userRole', role)`
- Automatic routing based on role:
  - Reviewers → `reviewer-dashboard.html`
  - Reviewees → `dashboard.html`

### 2. Login (login.html)
- Email-based role detection for demo purposes
- Emails containing "reviewer" or "admin" → Reviewer role
- Other emails → Reviewee role
- Role stored in localStorage for session persistence
- Automatic routing to appropriate dashboard

### 3. Protected Pages

#### Reviewer-Only Pages (with access control):
- **reviewer-dashboard.html** - Reviewer management dashboard
- **reviewer-tests.html** - Test creation and scheduling
- **reviewer-submissions.html** - Student submission monitoring

Access control code:
```javascript
const userRole = localStorage.getItem('userRole') || 'reviewee';
if (userRole !== 'reviewer') {
    alert('Access Denied: This page is only accessible to reviewers.');
    window.location.href = 'dashboard.html';
}
```

#### Shared Pages (with conditional features):

**video-conference.html**
- Reviewees: Can join sessions only
- Reviewers: Can join AND host sessions
- "Host Session" button hidden from reviewees using role detection

**forums.html** & **forum-post.html**
- Both roles can post and comment
- Reviewers see additional moderation buttons (hidden from reviewees)
- Moderation features include: delete posts, pin posts, manage discussions

### 4. Navigation Differences

#### Reviewee Sidebar Navigation:
- Dashboard
- Exams
- Review Materials
- Flashcards
- Leaderboard
- Live Sessions
- Forums
- Settings
- ❌ No admin portal link

#### Reviewer Sidebar Navigation:
- Reviewer Dashboard
- Tests (create/manage)
- Live Sessions (host/join)
- Submissions (monitor)
- Forums (moderate)

### 5. Role Detection Logic

All role-based features use this pattern:
```javascript
const userRole = localStorage.getItem('userRole') || 'reviewee';

if (userRole === 'reviewer') {
    // Show reviewer-only features
    document.getElementById('reviewerFeature').style.display = 'block';
}
```

## Testing Instructions

### Test as Reviewee:
1. Go to [register.html](register.html)
2. Select "Reviewee" role
3. Complete registration
4. You will be redirected to [dashboard.html](dashboard.html)
5. Try accessing:
   - ✅ Video conferences (can join only)
   - ✅ Forums (can participate)
   - ❌ reviewer-dashboard.html (access denied)
   - ❌ reviewer-tests.html (access denied)

### Test as Reviewer:
1. Go to [register.html](register.html)
2. Select "Reviewer" role
3. Complete registration
4. You will be redirected to [reviewer-dashboard.html](reviewer-dashboard.html)
5. You can access:
   - ✅ Create tests
   - ✅ Host video sessions
   - ✅ View submissions
   - ✅ Moderate forums

### Quick Test via Login:
- Login with email containing "reviewer" or "admin" → Reviewer access
- Login with any other email → Reviewee access

## Security Notes

⚠️ **Important**: This is a frontend prototype implementation using localStorage. In production:
1. Roles should be verified server-side
2. Use authentication tokens (JWT)
3. Implement server-side route protection
4. Validate all API requests with user permissions
5. Use secure session management
6. Never trust client-side role storage alone

## Files Modified

| File | Changes |
|------|---------|
| register.html | Added role storage to localStorage |
| login.html | Added role-based routing |
| reviewer-dashboard.html | Added access control check |
| reviewer-tests.html | Added access control check |
| reviewer-submissions.html | Added access control check |
| video-conference.html | Hide host button from reviewees |
| dashboard.html | Removed admin portal link |
| forums.html | Added reviewer moderation features |
| forum-post.html | Added reviewer moderation buttons |

## Summary

The portal now correctly implements role-based access control where:
- **Reviewers** can create content, host sessions, and monitor performance
- **Reviewees** can consume content, join sessions, and participate in discussions
- Access is controlled at both navigation and page levels
- Sensitive features are hidden or blocked based on user role
