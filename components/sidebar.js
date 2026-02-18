/**
 * Shared Sidebar Component for Normalite EDGE
 * 
 * Usage: Add this to any page:
 *   <div id="sidebar-container"></div>
 *   <script src="components/sidebar.js"></script>      (from root pages)
 *   <script src="../components/sidebar.js"></script>    (from admin-pages/ or reviewer-pages/)
 * 
 * The script auto-detects:
 *   - Which role (reviewee/admin/reviewer) based on the URL path
 *   - Which nav item is active based on the current page filename
 * 
 * To change the sidebar for any role, just edit the config objects below.
 */

(function () {
    // =====================================================================
    // CONFIGURATION - Edit these to change sidebar content for each role
    // =====================================================================

    const REVIEWEE_NAV = [
        { icon: 'dashboard', href: 'dashboard.html', label: 'Dashboard' },
        { icon: 'quiz', href: 'exams.html', label: 'Exams' },
        { icon: 'library_books', href: 'study.html', label: 'Study' },
        { icon: 'video_call', href: 'video-conference.html', label: 'Conferences' },
        { icon: 'settings', href: 'settings.html', label: 'Settings' },
    ];

    const ADMIN_NAV = [
        { icon: 'dashboard', href: 'dashboard.html', label: 'Dashboard' },
        { icon: 'assignment', href: 'exams.html', label: 'Exams' },
        { icon: 'style', href: 'study.html', label: 'Study' },
        { icon: 'group', href: 'users.html', label: 'Users' },
        { icon: 'video_call', href: 'video-conferences.html', label: 'Video Conferences' },
        { icon: 'event_note', href: 'logs.html', label: 'Logs' },
        { icon: 'settings', href: 'settings.html', label: 'Settings' },
    ];

    const REVIEWER_NAV = [
        { icon: 'dashboard', href: 'dashboard.html', label: 'Dashboard' },
        { icon: 'assignment', href: 'exams.html', label: 'Exams' },
        { icon: 'style', href: 'study.html', label: 'Study' },
        { icon: 'video_call', href: 'video-conferences.html', label: 'Video Conferences' },
        { icon: 'settings', href: 'settings.html', label: 'Settings' },
    ];

    // Map pages to their parent nav item (for sub-pages that should highlight a parent)
    const ACTIVE_OVERRIDES = {
        // Reviewee
        'mock-exam.html': 'exams.html',
        'mock-exam-result.html': 'exams.html',
        'mock-exam-review.html': 'exams.html',
        'custom-deck.html': 'study.html',
        'study-session.html': 'study.html',
        'security.html': 'settings.html',
        // Admin & Reviewer
        'create-exam.html': 'exams.html',
        'exam-performance.html': 'exams.html',
        'exams-temp.html': 'exams.html',
    };

    // =====================================================================
    // AUTO-DETECTION
    // =====================================================================

    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    function detectRole() {
        if (path.includes('/admin-pages/')) return 'admin';
        if (path.includes('/reviewer-pages/')) return 'reviewer';
        return 'reviewee';
    }

    const role = detectRole();

    function getNavItems() {
        switch (role) {
            case 'admin': return ADMIN_NAV;
            case 'reviewer': return REVIEWER_NAV;
            default: return REVIEWEE_NAV;
        }
    }

    function getActiveHref() {
        if (ACTIVE_OVERRIDES[filename]) return ACTIVE_OVERRIDES[filename];
        return filename;
    }

    // =====================================================================
    // CSS CLASSES
    // =====================================================================

    const ACTIVE_CLS = 'flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary group transition-colors';
    const INACTIVE_CLS = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary dark:text-gray-300 dark:hover:bg-white/5 transition-colors';

    // =====================================================================
    // HTML GENERATION
    // =====================================================================

    function makeNavLink(item, isActive) {
        const cls = isActive ? ACTIVE_CLS : INACTIVE_CLS;
        const filled = isActive ? " font-variation-settings-'FILL'1" : '';
        return `<a class="${cls}" href="${item.href}">
<span class="material-symbols-outlined text-[20px]${filled}">${item.icon}</span>
<p class="text-sm font-medium">${item.label}</p>
</a>`;
    }

    function makeNav(navItems, activeHref) {
        return navItems.map(item => makeNavLink(item, item.href === activeHref)).join('\n');
    }

    function getLogoutUrl() {
        return role === 'reviewee' ? 'index.html' : '../login.html';
    }

    function buildRevieweeSidebar(activeHref) {
        return `<aside class="flex w-64 flex-col border-r border-[#e5e7eb] bg-white dark:bg-[#1a0a0a] dark:border-[#3a1a1a] transition-all duration-300 fixed inset-y-0 left-0 z-50 transform -translate-x-full md:relative md:translate-x-0 md:flex shrink-0" id="sidebar">
<div class="flex h-full flex-col justify-between p-4">
<div class="flex flex-col gap-6">
<div class="flex items-center justify-between md:justify-start gap-3 px-2 py-2">
<div class="flex items-center gap-3">
<div class="bg-center bg-no-repeat bg-cover rounded-lg h-10 w-10 shadow-sm border border-primary/10" style='background-image: url("https://img.icons8.com/color/512/university.png");'></div>
<div class="flex flex-col">
<h1 class="text-primary text-lg font-bold leading-tight tracking-tight">Normalite EDGE</h1>
<p class="text-gray-500 text-xs font-normal">Reviewee Portal</p>
</div>
</div>
<button class="md:hidden text-gray-500" id="close-sidebar">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<nav class="flex flex-col gap-1">
${makeNav(REVIEWEE_NAV, activeHref)}
</nav>
</div>
<div class="flex flex-col gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
<div class="flex items-center justify-between px-2">
<div class="flex items-center gap-3">
<div class="relative">
<div class="h-9 w-9 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-white dark:ring-[#1a0a0a] shadow-sm" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlj7X3FeByZgwcrzsXQJwePv-4yl8HA3bmTcnNF5lOgngG9vpjm_kyYznzAPZgPVIZ-iMHlmeLbCxxpq7CR0YM-1BmepRG_eeyil5lqU2SlUhs9CHW8_FrpUtQdHmoXzl8DTzoy5_otYgexhRADm4-hnUyPM1rjk5okTceIRQral4XdpNixjnPxWisoyjD-rAs9h-1yU_deBaVQXXGAgGafWOKjyID8Bj0sZqv-7JuPA06AKS6bvqdQNAoiXA1T1tArTvVkGymOOhr");'></div>
<button onclick="window.location.href='achievements.html'" class="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white dark:border-[#1a0a0a]" title="12 Achievements Gained">
<span class="material-symbols-outlined text-[12px] font-bold">emoji_events</span>
</button>
</div>
<div class="flex flex-col overflow-hidden">
<p class="text-sm font-medium text-gray-900 dark:text-white truncate" id="user-fullname">Maria Clara</p>
<p class="text-xs text-gray-500 truncate" id="user-specialization-text">BSEd - English</p>
</div>
</div>
<div class="relative">
<button class="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500 relative" id="notification-button">
<span class="material-symbols-outlined text-[20px]">notifications</span>
<span class="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-[#1a0a0a]"></span>
</button>
</div>
</div>
<button class="flex w-full items-center gap-2 justify-center rounded-lg h-9 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10" onclick="window.location.href='${getLogoutUrl()}'">
<span class="material-symbols-outlined text-[18px]">logout</span>
<span>Log Out</span>
</button>
</div>
</div>
</aside>`;
    }

    function buildAdminSidebar(activeHref) {
        return `<aside class="flex w-64 flex-col border-r border-[#e5e7eb] bg-white dark:bg-[#1a0a0a] dark:border-[#3a1a1a] transition-all duration-300 hidden md:flex">
<div class="flex h-full flex-col justify-between p-4">
<div class="flex flex-col gap-6">
<div class="flex items-center gap-3 px-2 py-2">
<div class="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 shadow-sm border border-primary/20" data-alt="University Logo showing a shield or crest" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRPPNAtErCq7KnUYhj2JsmJNhkhexjuGMyftx05EykHw3q1BlzO-71-JUqsyQSFSiag1qAKfi6bcA9G4HUgLH1lLaFzKMl9DKsXWwXV0LdNJ02QNwnvh0WdIdFpy2zVJg73wjkd-PXjqbBElMEF5bOGlukZ5tUK9GGdjXWh5MWEDuPjDjM55USlSs5AGGZgVZmG8pOwiXYtj1yKgNzA-AvvZAO9x3_VXoFCpwqbuUsTJFM7b4mNxI7kjy_2gqMFqaI0pkK4DcIYkVd");'>
</div>
<div class="flex flex-col">
<h1 class="text-primary text-lg font-bold leading-tight tracking-tight">Normalite EDGE</h1>
<p class="text-gray-500 text-xs font-normal">Admin Portal</p>
</div>
</div>
<nav class="flex flex-col gap-1">
${makeNav(ADMIN_NAV, activeHref)}
</nav>
</div>
<div class="flex flex-col gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
<div class="flex items-center gap-3 px-2">
<div class="h-9 w-9 rounded-full bg-gray-200 bg-cover bg-center border border-gray-300" data-alt="Admin profile picture" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlj7X3FeByZgwcrzsXQJwePv-4yl8HA3bmTcnNF5lOgngG9vpjm_kyYznzAPZgPVIZ-iMHlmeLbCxxpq7CR0YM-1BmepRG_eeyil5lqU2SlUhs9CHW8_FrpUtQdHmoXzl8DTzoy5_otYgexhRADm4-hnUyPM1rjk5okTceIRQral4XdpNixjnPxWisoyjD-rAs9h-1yU_deBaVQXXGAgGafWOKjyID8Bj0sZqv-7JuPA06AKS6bvqdQNAoiXA1T1tArTvVkGymOOhr");'>
</div>
<div class="flex flex-col overflow-hidden">
<p class="text-sm font-medium text-gray-900 dark:text-white truncate">System Admin</p>
<p class="text-xs text-gray-500 truncate">Administrator</p>
</div>
<button class="ml-auto h-9 w-9 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-primary transition-colors relative" aria-label="Notifications">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-[#1a0a0a]"></span>
</button>
</div>
<button class="flex w-full items-center gap-2 justify-center rounded-lg h-9 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10" onclick="window.location.href='${getLogoutUrl()}'">
<span class="material-symbols-outlined text-[18px]">logout</span>
<span>Log Out</span>
</button>
</div>
</div>
</aside>`;
    }

    function buildReviewerSidebar(activeHref) {
        return `<aside class="flex w-64 flex-col border-r border-[#e5e7eb] bg-white dark:bg-[#1a0a0a] dark:border-[#3a1a1a] transition-all duration-300 fixed inset-y-0 left-0 z-50 transform -translate-x-full md:relative md:translate-x-0 md:flex shrink-0" id="sidebar">
<div class="flex h-full flex-col justify-between p-4">
<div class="flex flex-col gap-6">
<div class="flex items-center justify-between md:justify-start gap-3 px-2 py-2">
<div class="flex items-center gap-3">
<div class="bg-center bg-no-repeat bg-cover rounded-lg h-10 w-10 shadow-sm border border-primary/10" style='background-image: url("https://img.icons8.com/color/512/university.png");'></div>
<div class="flex flex-col">
<h1 class="text-primary text-lg font-bold leading-tight tracking-tight">Normalite EDGE</h1>
<p class="text-gray-500 text-xs font-normal">Reviewer Portal</p>
</div>
</div>
<button class="md:hidden text-gray-500" id="close-sidebar">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<nav class="flex flex-col gap-1">
${makeNav(REVIEWER_NAV, activeHref)}
</nav>
</div>
<div class="flex flex-col gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
<div class="flex items-center justify-between px-2">
<div class="flex items-center gap-3">
<div class="relative">
<div class="h-9 w-9 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-white dark:ring-[#1a0a0a] shadow-sm" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRPPNAtErCq7KnUYhj2JsmJNhkhexjuGMyftx05EykHw3q1BlzO-71-JUqsyQSFSiag1qAKfi6bcA9G4HUgLH1lLaFzKMl9DKsXWwXV0LdNJ02QNwnvh0WdIdFpy2zVJg73wjkd-PXjqbBElMEF5bOGlukZ5tUK9GGdjXWh5MWEDuPjDjM55USlSs5AGGZgVZmG8pOwiXYtj1yKgNzA-AvvZAO9x3_VXoFCpwqbuUsTJFM7b4mNxI7kjy_2gqMFqaI0pkK4DcIYkVd");'></div>
</div>
<div class="flex flex-col overflow-hidden">
<p class="text-sm font-medium text-gray-900 dark:text-white truncate">Reviewer</p>
<p class="text-xs text-gray-500 truncate">Reviewer</p>
</div>
</div>
<div class="relative">
<button class="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500 relative" id="notification-button">
<span class="material-symbols-outlined text-[20px]">notifications</span>
<span class="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-[#1a0a0a]"></span>
</button>
</div>
</div>
<button class="flex w-full items-center gap-2 justify-center rounded-lg h-9 px-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10" onclick="window.location.href='${getLogoutUrl()}'">
<span class="material-symbols-outlined text-[18px]">logout</span>
<span>Log Out</span>
</button>
</div>
</div>
</aside>`;
    }

    // =====================================================================
    // SIDEBAR BACKDROP (for reviewee & reviewer mobile sidebars)
    // =====================================================================

    function buildBackdrop() {
        return '<div class="fixed inset-0 bg-black/50 z-40 hidden md:hidden" id="sidebar-backdrop"></div>';
    }

    // =====================================================================
    // INJECTION & INITIALIZATION
    // =====================================================================

    function init() {
        const container = document.getElementById('sidebar-container');
        if (!container) {
            console.warn('[sidebar.js] No #sidebar-container element found.');
            return;
        }

        const activeHref = getActiveHref();
        let sidebarHTML;

        switch (role) {
            case 'admin':
                sidebarHTML = buildAdminSidebar(activeHref);
                break;
            case 'reviewer':
                sidebarHTML = buildReviewerSidebar(activeHref);
                break;
            default:
                sidebarHTML = buildRevieweeSidebar(activeHref);
                break;
        }

        container.innerHTML = sidebarHTML;

        // Inject sidebar-backdrop into <main> for reviewee & reviewer (mobile sidebar support)
        if (role !== 'admin') {
            const main = document.querySelector('main');
            if (main) {
                // Remove any existing backdrop first
                const existing = document.getElementById('sidebar-backdrop');
                if (existing) existing.remove();
                // Insert at beginning of main
                main.insertAdjacentHTML('afterbegin', buildBackdrop());
            }
        }

        // Set up sidebar toggle for mobile (reviewee & reviewer)
        if (role !== 'admin') {
            initSidebarToggle();
        }
    }

    function initSidebarToggle() {
        const sidebar = document.getElementById('sidebar');
        const closeSidebarButton = document.getElementById('close-sidebar');
        const sidebarBackdrop = document.getElementById('sidebar-backdrop');
        const mobileMenuButton = document.getElementById('mobile-menu-button');

        if (!sidebar) return;

        function toggleSidebar() {
            const isHidden = sidebar.classList.contains('-translate-x-full');
            if (isHidden) {
                sidebar.classList.remove('-translate-x-full');
                if (sidebarBackdrop) sidebarBackdrop.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
            }
        }

        if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleSidebar);
        if (closeSidebarButton) closeSidebarButton.addEventListener('click', toggleSidebar);
        if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', toggleSidebar);

        // Expose globally so pages can call it if needed
        window.toggleSidebar = toggleSidebar;
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
