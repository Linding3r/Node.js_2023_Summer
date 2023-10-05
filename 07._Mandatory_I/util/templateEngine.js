import fs from 'fs';

export function readPage(filePath) {
    return fs.readFileSync(filePath).toString();
}

export function renderPage(page, config = {}) {
    const navbar = fs
        .readFileSync('./public/components/navbar/navbar.html')
        .toString()
        .replace('$TAB_TITLE', config.tabTitle || '')
        .replace('$CSS_LINKS', config.cssLinks || '')
        .replace('$ACTIVE_PAGE_js101', config.activePage === 'js101' ? 'active' : '')
        .replace('$ACTIVE_PAGE_frontpage', config.activePage === 'frontpage' ? 'active' : '')
        .replace('$ACTIVE_PAGE_projects', config.activePage === 'projects' ? 'active' : '')
        .replace('$ACTIVE_PAGE_express', config.activePage === 'express' ? 'active' : '')
        .replace('$ACTIVE_PAGE_admin', config.activePage === 'admin' ? 'active' : '')
        .replace('$ACTIVE_PAGE_login', config.activePage === 'login' ? 'active' : '')
        .replace('$ACTIVE_PAGE_node', config.activePage === 'node' ? 'active' : '')
        .replace('$ACTIVE_PAGE_misc', config.activePage === 'misc' ? 'active' : '')
    const footer = fs.readFileSync('./public/components/footer/footer.html').toString();

    return navbar + page + footer;
}
