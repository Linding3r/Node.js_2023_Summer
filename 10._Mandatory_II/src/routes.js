import Login from './component/Login/Login.svelte';
import Admin from './component/Admin/Admin.svelte';

const routes = {
    '/': Login,
    '/admin': Admin
};

export default routes;
