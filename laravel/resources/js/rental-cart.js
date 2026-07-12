// Global Memory Array to keep cart state
let globalCart = [];

/**
 * دالة إظهار وإخفاء الـ Modal باستعمال كلاس hidden
 */
function toggleCartModal(show) {
  const modal = document.getElementById('cart-modal');
  
  if (show) {
    modal.classList.remove('hidden');
    renderCartDOM();
  } else {
    modal.classList.add('hidden');
  }
}

/**
 * دالة إضافة المعدات للسلة
 */
function addToCart(id, name, img, price, guide) {
  const existingItem = globalCart.find(item => item.id === id);

  if (existingItem) {
    Swal.fire({
      icon: 'warning',
      title: 'Already in Basket!',
      text: `"${name}" has already been added to your selection.`,
      confirmButtonColor: '#059669',
      customClass: { popup: 'rounded-2xl' }
    });
    return;
  }

  globalCart.push({ id, name, img, price, guide });

  Swal.fire({
    icon: 'success',
    title: 'Added to Basket',
    text: `"${name}" successfully added.`,
    showConfirmButton: false,
    timer: 1500,
    position: 'top-end',
    toast: true
  });

  updateCartStatusCounters();
}

/**
 * حذف عنصر من السلة
 */
function removeCartItem(id) {
  globalCart = globalCart.filter(item => item.id !== id);
  updateCartStatusCounters();
  renderCartDOM();
}

/**
 * تحديث العداد
 */
function updateCartStatusCounters() {
  document.getElementById('cart-count').innerText = globalCart.length;
}

/**
 * بناء وعرض عناصر السلة ديناميكياً داخل الـ Modal
 */
function renderCartDOM() {
  const container = document.getElementById('cart-items-container');
  const totalLabel = document.getElementById('cart-total-price');
  
  container.innerHTML = '';
  let runningSum = 0;

  if (globalCart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-slate-300">
        <i class="fa-solid fa-basket-shopping text-3xl mb-2 block"></i>
        <p class="text-xs font-medium text-slate-400">Your rental selection is empty.</p>
      </div>`;
    totalLabel.innerHTML = `0.00 <span class="text-xs font-bold text-emerald-600">DH</span>`;
    return;
  }

  globalCart.forEach(item => {
    runningSum += item.price;
    
    const element = document.createElement('div');
    element.className = "flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 shadow-sm relative group";
    element.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200">
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 truncate">${item.name}</h4>
        <span class="text-[9px] text-slate-400 font-medium block">Guide: ${item.guide}</span>
        <span class="text-xs font-bold text-slate-950 block mt-0.5">${item.price.toFixed(2)} DH</span>
      </div>
      <button onclick="removeCartItem(${item.id})" class="h-7 w-7 rounded-lg bg-red-50 hover:bg-red-500 text-red-600 hover:text-white flex items-center justify-center transition-colors">
        <i class="fa-solid fa-trash-can text-[10px]"></i>
      </button>
    `;
    container.appendChild(element);
  });

  totalLabel.innerHTML = `${runningSum.toFixed(2)} <span class="text-xs font-bold text-emerald-600">DH</span>`;
}

/**
 * تأكيد طلب الكراء
 */
function confirmRentalOrder() {
  if (globalCart.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Empty Request',
      text: 'Kindly select at least one item before confirming.',
      confirmButtonColor: '#ef4444'
    });
    return;
  }

  toggleCartModal(false);

  Swal.fire({
    icon: 'success',
    title: 'Rental Order Confirmed!',
    text: 'Your gear reservation request has been sent successfully.',
    confirmButtonColor: '#059669',
    customClass: { popup: 'rounded-2xl' }
  }).then(() => {
    globalCart = [];
    updateCartStatusCounters();
  });
}

/**
 * ربط أزرار الـ Add to Cart بالـ Data Attributes
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
      const id = parseInt(this.getAttribute('data-id'));
      const name = this.getAttribute('data-name');
      const img = this.getAttribute('data-image');
      const price = parseFloat(this.getAttribute('data-price'));
      const guide = this.getAttribute('data-guide');

      addToCart(id, name, img, price, guide);
    });
  });
});