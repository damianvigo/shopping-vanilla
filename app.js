const d = document,
  $carrito = d.getElementById('carrito'),
  $template = d.getElementById('template'),
  $footer = d.getElementById('footer'),
  $templateFooter = d.getElementById('templateFooter'),
  fragment = d.createDocumentFragment();

d.addEventListener('click', (e) => {
  // console.log(e.target.matches('.card .btn-outline-primary'));
  if (e.target.matches('.card .btn-outline-primary')) {
    // console.log(e.target.dataset);
    agregarAlCarrito(e);
  }

  // console.log(e.target.matches('.list-group-item .btn-success'));
  if (e.target.matches('#carrito .list-group-item .btn-success')) {
    btnAumentar(e);
  }

  if (e.target.matches('#carrito .list-group-item .btn-danger')) {
    btnDisminuir(e);
  }
});

let carrito = [];

const agregarAlCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  console.log(producto);

  const indice = carrito.findIndex((item) => item.id === producto.id);
  console.log(indice);

  if (indice === -1) {
    carrito.push(producto);
    console.log(carrito);
  } else {
    carrito[indice].cantidad++;
    /*     carrito[indice].precio = carrito[indice].cantidad * producto.precio;
    console.log(carrito); */
  }

  pintarCarrito();
};

const pintarCarrito = () => {
  console.log($carrito);
  console.log(carrito);
  $carrito.textContent = '';

  carrito.forEach((item) => {
    // const clone = $template.content.firstElementChild.cloneNode(true);
    const clone = $template.content.cloneNode(true);

    clone.querySelector('.text-white .lead').textContent = item.titulo;
    clone.querySelector('.badge').textContent = item.cantidad;
    clone.querySelector('div .lead span').textContent =
      item.precio * item.cantidad;

    clone.querySelector('.btn-danger').dataset.id = item.id;
    clone.querySelector('.btn-success').dataset.id = item.id;
    fragment.appendChild(clone);
  });

  $carrito.appendChild(fragment);

  pintarFooter();
};

const pintarFooter = () => {
  $footer.textContent = '';

  const total = carrito.reduce((acc, current) => {
    return acc + current.cantidad * current.precio;
  }, 0);

  if (total === 0) return;

  // console.log(total);

  const clone = $templateFooter.content.cloneNode(true);
  clone.querySelector('span').textContent = total;
  /* no cicle without fragment */
  $footer.appendChild(clone);
};

const btnAumentar = (e) => {
  console.log(`aumentar: ${e.target.dataset.id}`);
  carrito = carrito.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });

  pintarCarrito();
};

const btnDisminuir = (e) => {
  console.log(`decrementar: ${e.target.dataset.id}`);
  carrito = carrito.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });

  pintarCarrito();
};
