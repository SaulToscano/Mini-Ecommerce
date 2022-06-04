var category_name;

window.onload = function () {
    /*Inicia la pagina web con una busqueda inicial*/
    find_product(4);

    /*Agrega al input de busqueda del top navbar la propiedad para iniciar la busqueda aprentando "Enter"*/
    document.getElementById('search_input').onkeydown = function (e) {
        if (e.key === 'Enter') {
            find_product();
        }
    }

    /*busca las categorias del left navbar y agrega el evento para que al ser seleccionadas se resalte la
    categoria que esta filtrando los productos*/
    const elements = document.querySelectorAll('.left_navbar_list');

    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            elements.forEach(element => {
                element.classList.toggle('left_navbar_selected', false);
            })

            element.classList.toggle('left_navbar_selected', true)
        })
    })
}

/*
find_product(): toma 2 posibles elementos, del navegador izquierdo los botones le mandan un numero integral
que es la 'categoria', con esa categoria se hace una solicitud a la api para que envie todos los datos de la DB
de dicha categoria.
del input buscador toma un valor string y hace una peticion en la api para que busque en la DB todos los productos
que puedan contener ese valor como nombre. ej: 'coca' traera todos los productos que tengan coca en su nombre
*/
function find_product(category, page =  1) {
    let search_type = '';
    let parameter_type = '';
    if (typeof category === 'number') {
        search_type = 'category';
        parameter_type = 'id'
        category_name = category;
    } else {
        search_type = 'name';
        parameter_type = 'q'
        category = document.getElementById('search_input').value;
        category_name = category;
    }
    fetch(`https://backend-bsale-api-test.herokuapp.com/products/${search_type}?${parameter_type}=${category}&page=${page}`)
        .then(res => res.json())
        .then(json => {
            create_paginacion(json);
            create_product_list(json);
        })
        .catch(err => console.log(err))
}

/*
Create_Product_list(): se invoca despues de la peticion a la api y del arreglo que recibe de la api crea
las tarjetas de los productos
*/
function create_product_list(products) {
    var productContainer = document.getElementById('productsContainer')
    productContainer.innerHTML = "";

    if (products.data.length === 0) {
        productContainer.innerHTML = "<h1 class='products_container_empty'>No se encontraron productos con ese nombre...</h1>";
    }

    products.data.forEach((product, index) => {
        let product_main_div = document.createElement("div");
        product_main_div.setAttribute("class", "product_main_div");

        let product_image;

        if (product.url_image) {
            product_image = document.createElement("object");
            product_image.type = "image/png";
            product_image.data = product.url_image;
        } else {
            product_image = document.createElement("img");
            product_image.src = "./img/img_not_found_default.jpg";
            product_image.alt = "Imagen no encontrada";
        }

        let product_name = document.createElement("span");
        product_name.innerHTML = product.name;

        let product_price = document.createElement("span");
        product_price.innerHTML = `$${product.price}`;

        product_main_div.appendChild(product_image);
        product_main_div.appendChild(product_name);
        product_main_div.appendChild(product_price);

        productContainer.appendChild(product_main_div);
    })
}

/*create_paginacion(): Se invoca despues de buscar los productos de la BD, toma el arreglo de los productos
y en base a su largo hace una division para crear las distintas paginas*/
function create_paginacion(products) {
    let paginacion_main_div = document.getElementById('paginacionContainer');
    paginacion_main_div.innerHTML = "";

    let size = products.paging.totalPages
    if (size === 0) size = 1;

    let paginacion_span = document.createElement("span");
    paginacion_span.setAttribute("id", "paginacion_anterior");
    paginacion_span.setAttribute("class", "paginacion_hide");
    paginacion_span.innerHTML = "Anterior";
    paginacion_span.addEventListener('click', (e) => {
        find_product(category_name, (parseInt(products.paging.currentPage) - 1))
    })
    paginacion_main_div.appendChild(paginacion_span)

    for (let c = 0; c < size; c++) {
        let paginacion_span = document.createElement("span");
        paginacion_span.setAttribute("id", c + 1);
        paginacion_span.innerHTML = ` ${(c + 1)} `;
        paginacion_span.addEventListener('click', (e) => {
            find_product(category_name, c + 1)
        })
        paginacion_main_div.appendChild(paginacion_span)
    }

    paginacion_span = document.createElement("span");
    paginacion_span.setAttribute("id", "paginacion_siguiente");
    if (size === 1) {
        paginacion_span.setAttribute("class", "paginacion_hide");
    }
    paginacion_span.innerHTML = "Siguiente";
    paginacion_span.addEventListener('click', (e) => {
        find_product(category_name, (parseInt(products.paging.currentPage) + 1))
    })
    paginacion_main_div.appendChild(paginacion_span)

    pagination_control(parseInt(products.paging.currentPage), size)

    set_actual_page(products.paging.currentPage)
}

/*pagination_control(): usa la variable "page" para mostrar la pagina actual, controla 
que no se muestre el span "Anterior" o "Siguiente" si se esta en la primera o ultima pagina*/
function pagination_control(page, size) {
    if (page === 1) {
        document.getElementById('paginacion_anterior').classList.toggle('paginacion_hide', true)
    } else {
        document.getElementById('paginacion_anterior').classList.toggle('paginacion_hide', false)
    }

    if (page >= size) {
        document.getElementById('paginacion_siguiente').classList.toggle('paginacion_hide', true)
    } else {
        document.getElementById('paginacion_siguiente').classList.toggle('paginacion_hide', false)
    }
}

/*set_actual_page(): Inserta la clase "paginacion_actual_page" a la pagina actual para que resalte
en la pagina web*/
function set_actual_page(page) {
    let paginacion_main_div = document.getElementById('paginacionContainer');
    let actual_page = document.getElementById(page);

    paginacion_main_div.childNodes.forEach(page => {
        page.classList.toggle('paginacion_actual_page', false)
    })

    actual_page.classList.toggle('paginacion_actual_page', true)
}