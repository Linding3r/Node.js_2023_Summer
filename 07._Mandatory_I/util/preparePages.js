import { readPage, renderPage } from './templateEngine.js';

const frontpage = readPage('./public/pages/frontpage/frontpage.html');
export const frontpagePage = renderPage(frontpage, {
    tabTitle: 'Frontpage',
    activePage: 'frontpage'
})

const nodejs = readPage('./public/pages/js101/js101.html');
export const js101Page = renderPage(nodejs, {
    tabTitle: 'JavaScript',
    activePage: 'js101'
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

const server = readPage('./public/pages/serverPage/serverPage.html');
export const serverPage = renderPage(server, {
    tabTitle: 'Server',
    activePage: 'server'
});

const node = readPage('./public/pages/node/node.html');
export const nodePage = renderPage(node, {
    tabTitle: 'Node',
    activePage: 'node'
});