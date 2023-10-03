document.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.getElementById('loginLink');

    function createAdminLink() {
        const adminLink = document.createElement('li'); 
        adminLink.innerHTML = '<a class="nav-link $ACTIVE_PAGE_admin" href="/admin">Admin</a>'; 
        adminLink.id = 'adminLink'; 
        return adminLink;
    }


    fetch('/checkAuth', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.isAuthenticated) {
            loginLink.innerHTML = '<a class="nav-link" href="#">Logout</a>';
            loginLink.firstElementChild.addEventListener('click', () => {
                fetch('/logout', {
                    method: 'POST',
                })
                .then(() => {
                    const adminLink = document.getElementById('adminLink');
                    if (adminLink) {
                        adminLink.remove();
                    }
                    location.href = '/';
                });
            });

            if (!document.getElementById('adminLink')) {
                const adminLink = createAdminLink();
                document.querySelector('ul').appendChild(adminLink);
            }
        } else {
            const adminLink = document.getElementById('adminLink');
            if (adminLink) {
                adminLink.remove();
            }
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
