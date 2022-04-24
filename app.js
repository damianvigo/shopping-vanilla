const d = document,
  $carrito = d.getElementById('carrito'),
  $template = d.getElementById('template'),
  fragment = d.createDocumentFragment(),
  $btnesBotones = d.querySelectorAll('.btn');

const carritoObjeto = [];

const agregarAlCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
  };

  const indice = carritoObjeto.findIndex((item) => item.id === producto.id);
  console.log(indice);

  if (indice === -1) {
    carritoObjeto.push(producto);
    console.log(carritoObjeto);
  } else {
    carritoObjeto[indice].cantidad++;
    console.log(carritoObjeto);
  }

  pintarCarrito(carritoObjeto);
};

const pintarCarrito = (array) => {
  console.log($carrito);
  $carrito.innerHTML = '';

  array.forEach((item) => {
    const clone = $template.content.firstElementChild.cloneNode(true);

    clone.querySelector('.lead').textContent = item.titulo;
    clone.querySelector('.badge').textContent = item.cantidad;

    fragment.appendChild(clone);
  });

  $carrito.appendChild(fragment);
};

$btnesBotones.forEach((btn) => btn.addEventListener('click', agregarAlCarrito));
