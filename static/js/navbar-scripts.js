// hack to load sidebar tree

document.addEventListener("readystatechange", loadTree);

function loadTree(event) {
    var loadbtn = document.getElementById('load-tree');
    loadbtn.setAttribute('hidden', 'true');
    loadbtn.click();

    if (localStorage['openNav'] === 'true') {
        if (document.getElementsByClassName('td-sidebar-nav-active-item').length === 0) { return; }
        // check is the last el
        let arrwos = document.getElementsByClassName('td-sidebar-nav-active-item')[0].getElementsByClassName('arrow')

        if (!document.getElementById('js-bootstrap-offcanvas').classList.contains('in')){
            let speedTransition = document.getElementsByClassName('navbar-offcanvas')[0];
            let _tmp = [...speedTransition.style];

            speedTransition.style += 'transition: 0s;'
            document.getElementById('js-bootstrap-offcanvas').classList.add('in');
            speedTransition.style.transition = _tmp
        }
    }
}


function fadeBg(event) {
    let shadowEl = document.getElementById('shadow');
    if (event.target.classList.contains('nav-link')) 
        shadowEl.style.display = 'block';
    else 
        shadowEl.style.display = 'none';
}

function hideAlgoliaPopUp(event) {
    if (document.getElementsByClassName('algolia-autocomplete').length > 0){
        if (!event.target.classList.contains('algolia-autocomplete') && event.target.getAttribute('type') !== 'search') {
            let autocompleteEl = document.getElementsByClassName('ds-dropdown-menu')[0];
            autocompleteEl.style.display = 'none';
        }
    }
}

function saveNavState(event) {
    let pressedEl = event.target
    if (pressedEl.id == 'load-tree') { return; }
    if (pressedEl.classList.contains('nav-item-tree') || pressedEl.parentElement.classList.contains('nav-item-tree') || pressedEl.parentElement.parentElement.classList.contains('nav-item-tree'))
        localStorage['openNav'] = true;
    else
        localStorage['openNav'] = false;
}

function showSearch(event) {
    var searchBox = document.getElementById("hidden-search");
    if (searchBox.classList.contains("d-lg-none")) {
        searchBox.classList.remove("d-lg-none");
        searchBox.focus();
        
    } else {
        searchBox.classList.add("d-lg-none");
    }
}

document.getElementById("search-btn").addEventListener("click", showSearch);
document.getElementById("hidden-search").addEventListener("blur", (event)=> {
    event.target.classList.add("d-lg-none");
});

document.body.addEventListener('click', saveNavState);
document.body.addEventListener("click", hideAlgoliaPopUp);
document.body.addEventListener('click', fadeBg);
document.getElementById('navbarDropdownMenuLink').addEventListener('click', fadeBg);


