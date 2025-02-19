const addModal = () => {
    const modalHandler = () => {
        const modal = document.getElementById('main-nav')
        const closeBtn = document.getElementsByClassName('sm-dox')[0]
        if (window.innerWidth < 768) {
            closeBtn.appendChild(modal)
        } else {
            closeBtn.after(modal)
        }
    }

    window.addEventListener('resize', () => {
        modalHandler()
    })

    modalHandler()
}

const onBurger = () => {
    const burgerBtn = document.querySelector('.main-menu-btn');
    const modal = document.getElementById('navbar-main-menu');

    burgerBtn.addEventListener('click', () => {
        const isVisible = modal.style.display == 'flex';

        modal.style.display = isVisible ? null : 'flex';
    });
}

const create_nav_wrapper = () => {
    const searchBoxWrapper = document.getElementById('searchBoxPos2');
    const themeToggler = document.querySelector("doxygen-awesome-dark-mode-toggle");
    const searchBox = document.getElementById('MSearchBox');

    const mainNav = document.createElement('div');
    mainNav.id = 'main-navbar';

    const mainMenu = document.getElementById('main-menu');
    mainMenu.id = 'navbar-main-menu';

    mainNav.appendChild(mainMenu);

    mainMenu.after(searchBox);
    mainMenu.after(themeToggler);

    searchBoxWrapper.parentNode.removeChild(searchBoxWrapper);

    const oldWrapper = document.getElementById('main-nav');

    oldWrapper.before(mainNav);
}

const remove_legacy_searchbox = () => {
    const burgerBtn = document.querySelector('.main-menu-btn');
    const mainMenu = document.getElementById('navbar-main-menu');

    mainMenu.after(burgerBtn);

    const mobileSearchBox = document.getElementById('searchBoxPos1');

    mobileSearchBox.parentNode.removeChild(mobileSearchBox);
}

const old_docs_version = () => {
    const version = "v2.0"
    const brief = document.getElementById('projectbrief').getElementsByTagName('a')[0];
    brief.textContent += " " + version;
    const base_page_url = window.location.pathname.split('/' + version + '/')[1];

    var warning = document.createElement("div");
    warning.style.width = '100%';
    warning.style.display = 'flex';
    warning.style.flexDirection = 'column';
    warning.innerHTML = `
      <a style="padding: 16px; margin-bottom: 20px; text-align: center; border: 1px solid var(--warning-color-dark); border-radius: var(--border-radius-large);" href="/` + base_page_url + `">
        ⚠️ This is the documentation for an old userver version. Click here to switch to the latest version.
      </a>
    `;
    const titlearea = document.getElementById('titlearea');
    titlearea.parentNode.insertBefore(warning, titlearea);
}

const add_docs_versioning = () => {
    old_docs_version();

    const footer = document.getElementById('nav-path').getElementsByTagName('ul')[0];
    footer.innerHTML = `
    <li style="box-shadow: inset -1px 0 0 0 var(--separator-color); background-image: none; margin-right: 48px;">
        <span style="color: var(--toc-foreground);">Docs version:</span>
        <a href="/docs/v1.0/` + window.location.pathname.split('/v2.0/')[1] + `">v1.0</a>, 
        <span style="background-image: none; color: var(--toc-active-color); font-weight: bold;">v2.0</span>,
        <a href="/` + window.location.pathname.split('/v2.0/')[1] + `">trunk/develop</a>
    </li>`
    + footer.innerHTML;
}

const init_header = () => {
    addModal();
    create_nav_wrapper();
    remove_legacy_searchbox();
    onBurger();
    add_docs_versioning();
}
