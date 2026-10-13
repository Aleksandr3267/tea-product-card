(() => {
  'use strict';

  const PACKS = [
    { id: '100',  weight: '100 г',  sku: '01306', old: 349.2, price: 326.4 },
    { id: '500',  weight: '500 г',  sku: '01307', old: 1646,  price: 1432 },
    { id: '1000', weight: '1000 г', sku: '01308', old: 2592,  price: 2064 },
    { id: '5000', weight: '5000 г', sku: '01309', old: 8710,  price: 6320 },
  ];

  const nf = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const formatPrice = (n) => `${nf.format(n)} ₽`;

  const $packs = document.getElementById('packs');
  const $price = document.getElementById('price-current');
  const $old = document.getElementById('price-old');
  const $discount = document.getElementById('price-discount');
  const $sku = document.getElementById('sku');
  const $btn = document.getElementById('add-to-cart');
  const $label = document.getElementById('cart-label');

  let current = PACKS[0];
  let timer;

  const renderPacks = () => {
    $packs.innerHTML = PACKS.map((p, i) => `
      <div class="pack">
        <input class="pack__input" type="radio" name="pack" id="pack-${p.id}" value="${p.id}"${i === 0 ? ' checked' : ''}>
        <label class="pack__label" for="pack-${p.id}">
          <span class="pack__weight">${p.weight}</span>
          <span class="pack__price">${formatPrice(p.price)}</span>
        </label>
      </div>`).join('');
  };

  const renderPrice = (pack) => {
    const hasDiscount = pack.old > pack.price;
    $price.textContent = formatPrice(pack.price);
    $sku.textContent = pack.sku;
    $old.hidden = !hasDiscount;
    $discount.hidden = !hasDiscount;
    if (hasDiscount) {
      $old.textContent = formatPrice(pack.old);
      $discount.textContent = `−${Math.round((1 - pack.price / pack.old) * 100)}%`;
    }
  };

  $packs.addEventListener('change', (e) => {
    const pack = PACKS.find((p) => p.id === e.target.value);
    if (!pack) return;
    current = pack;
    renderPrice(pack);
    resetButton();
  });

  const resetButton = () => {
    clearTimeout(timer);
    $btn.classList.remove('is-added');
    $label.textContent = 'В корзину';
  };



  renderPacks();
  renderPrice(current);


  /* ------------------------------ Zoom product ------------------------------ */
  const image = document.querySelector(".product__image");
  const zoomBtn = document.querySelector(".product__zoom");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox__img");
  const closeBtn = lightbox.querySelector(".lightbox__close");

  const openLightbox = () => {
    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt;
    lightbox.showModal();
  };

  image.addEventListener("click", openLightbox);
  zoomBtn.addEventListener("click", openLightbox);
  closeBtn.addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  
})();
