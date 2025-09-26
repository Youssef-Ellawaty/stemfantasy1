// Helper functions for admin panel
function showLoadingState() {
    const existingLoading = document.getElementById('admin-loading');
    if (existingLoading) {
        existingLoading.remove();
    }

    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'admin-loading';
    loadingDiv.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: white; padding: 20px; border-radius: 10px; z-index: 1000; display: flex; align-items: center; justify-content: center;';
    loadingDiv.textContent = 'جاري التحميل...';
    document.getElementById('admin-modal').appendChild(loadingDiv);
}

function hideLoadingState() {
    const loadingDiv = document.getElementById('admin-loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Enhanced error handling for admin panel requests
async function handleAdminRequest(requestFn, errorMessage = 'حدث خطأ أثناء تنفيذ العملية') {
    try {
        showLoadingState();
        await requestFn();
    } catch (error) {
        console.error('Admin operation error:', error);
        alert(errorMessage);
    } finally {
        hideLoadingState();
    }
}

// Debounced function to prevent multiple rapid tab switches
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced tab switching with loading state and error handling
async function switchAdminTab(tabName, event) {
    try {
        showLoadingState();

        // Hide all admin content
        document.querySelectorAll('.admin-content').forEach(content => {
            content.classList.remove('active');
            // Clear content to prevent stale data
            content.innerHTML = '';
        });

        // Show selected content
        const selectedTab = document.getElementById(`admin-${tabName}`);
        if (!selectedTab) {
            throw new Error(`Tab ${tabName} not found`);
        }
        selectedTab.classList.add('active');

        // Update tab buttons
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        if (event && event.target) {
            event.target.classList.add('active');
        }

        // Load only the data for the selected tab
        switch(tabName) {
            case 'rounds':
                await loadRoundsList();
                break;
            case 'matches':
                await loadMatchesList();
                break;
            case 'teams':
                await loadTeamsList();
                break;
            case 'players':
                await loadPlayersList();
                break;
            case 'users':
                await loadUsersList();
                break;
            case 'points':
                // Points tab specific loading if needed
                break;
            default:
                console.warn(`Unknown tab: ${tabName}`);
        }
    } catch (error) {
        console.error('Error switching admin tab:', error);
        alert('حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
        hideLoadingState();
    }
}

// Debounced version of switchAdminTab to prevent rapid switching
const debouncedSwitchAdminTab = debounce(switchAdminTab, 300);

// Export functions
window.showLoadingState = showLoadingState;
window.hideLoadingState = hideLoadingState;
window.handleAdminRequest = handleAdminRequest;
window.switchAdminTab = switchAdminTab;
window.debouncedSwitchAdminTab = debouncedSwitchAdminTab;