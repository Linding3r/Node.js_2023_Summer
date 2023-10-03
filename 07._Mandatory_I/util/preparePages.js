import { readPage, renderPage } from './templateEngine.js';

const frontpage = readPage('./public/pages/frontpage/frontpage.html');
export const frontpagePage = renderPage(frontpage, {
    tabTitle: 'Frontpage',
    activePage: 'frontpage'
})

const nodejs = readPage('./public/pages/nodejs/nodejs.html');
export const nodejsPage = renderPage(nodejs, {
    tabTitle: 'Node.js',
    activePage: 'node'
});

const express = readPage('./public/pages/express/express.html');
export const expressPage = renderPage(express, {
    tabTitle: 'Express.js',
    activePage: 'express'
});

const login = readPage('./public/pages/login/login.html');
export const loginPage = renderPage(login, {
    tabTitle: 'Login',
    cssLinks: '<link rel="stylesheet" href="../../pages/login/login.css">',
    activePage: 'login'
});

const projects = readPage('./public/pages/projects/projects.html');
export const projectsPage = renderPage(projects, {
    tabTitle: 'Projects',
    activePage: 'projects'
});

const admin = readPage('./public/pages/admin/admin.html');
export const adminPage = renderPage(admin, {
    tabTitle: 'Admin',
    activePage: 'admin'
});