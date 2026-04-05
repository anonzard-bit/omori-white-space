class Cart {
  // CONSTRUCTOR & INITIALIZATION
  constructor() {
    this.storageKey = 'omoriCart';
    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.init();
  }

  init() {
    this.updateCartCount();
    this.bindAddButtons();
    this.renderCartPage();
    this.renderCheckoutPage();
    this.handleCheckoutForm();
  }

  // STORAGE METHODS
  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price / item.quantity, 0);
  }

  updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (!cartCountEl) return;
    const count = this.getItemCount();
    cartCountEl.textContent = count;
    cartCountEl.style.display = count > 0 ? 'flex' : 'none';
  }

// ITEM MANAGEMENT
  addItem(productId, name, price, image) {
    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ id: productId, name, price, image, quantity: 1 });
    }
    this.saveCart();
    this.updateCartCount();
    this.renderCartPage();
    this.renderCheckoutPage();
    this.showNotification(`${name} added to cart!`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.renderCartPage();
    this.renderCheckoutPage();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (!item) return;
    item.quantity = quantity;
    if (item.quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.saveCart();
    this.updateCartCount();
    this.renderCartPage();
    this.renderCheckoutPage();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
    this.renderCartPage();
    this.renderCheckoutPage();
  }

  // CART DISPLAY & RENDERING
  bindAddButtons() {
    const buttons = document.querySelectorAll('.btn-add-cart');
    if (!buttons.length) return;

    const products = {
      sunny: { name: 'SUNNY Plush', price: 28, image: 'img/march-sunny.png' },
      kel: { name: 'KEL Plush', price: 28, image: 'img/march-kel.png' },
      aubrey: { name: 'AUBREY Plush', price: 24, image: 'img/march-aubrey.png' },
      hero: { name: 'HERO Plush', price: 28, image: 'img/march-hero.png' },
      basil: { name: 'BASIL Plush', price: 25, image: 'img/march-basil.png' },
      stranger: { name: 'STRANGER Plush', price: 28, image: 'img/march-omori_plushies_stranger_front.png' }
    };

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.product;
        const product = products[productId];
        if (product) {
          this.addItem(productId, product.name, product.price, product.image);
        }
      });
    });
  }

  // ORDER SUMMARY & CHECKOUT
  renderCartPage() {
    const container = document.querySelector('.cart-items');
    if (!container) return;

    if (!this.items.length) {
      container.innerHTML = '';
      document.querySelector('.cart-empty').style.display = 'block';
      document.querySelector('.checkout-button').classList.add('disabled');
      document.querySelector('.order-summary-list').innerHTML = '<p class="text-muted">No items in cart.</p>';
      document.querySelector('.order-total').textContent = '$0.00';
      return;
    }

    document.querySelector('.cart-empty').style.display = 'none';
    document.querySelector('.checkout-button').classList.remove('disabled');

    container.innerHTML = this.items.map(item => `
      <div class="card product-card mb-3">
        <div class="row g-0 align-items-center">
          <div class="col-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-8">
            <div class="card-body">
              <h6 class="card-title">${item.name}</h6>
              <p class="card-text text-muted">$${item.price.toFixed(2)} each</p>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary cart-qty-btn" data-action="decrease" data-product="${item.id}">-</button>
                <span class="badge bg-secondary px-3">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary cart-qty-btn" data-action="increase" data-product="${item.id}">+</button>
                <button class="btn btn-sm btn-danger ms-auto remove-item" data-product="${item.id}">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.cart-qty-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.product;
        const action = button.dataset.action;
        const item = this.items.find(product => product.id === id);
        if (!item) return;
        const quantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        this.updateQuantity(id, quantity);
      });
    });

    container.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        this.removeItem(button.dataset.product);
      });
    });

    this.renderOrderSummary();
  }

  renderOrderSummary() {
    const summary = document.querySelector('.order-summary-list');
    if (!summary) return;

    if (!this.items.length) {
      summary.innerHTML = '<p class="text-muted">No items added yet.</p>';
      return;
    }

    summary.innerHTML = this.items.map(item => `
      <div class="d-flex justify-content-between mb-2">
        <div>
          <strong>${item.name}</strong>
          <div class="text-muted">Qty: ${item.quantity}</div>
        </div>
        <div>$${(item.price / item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    const total = document.querySelector('.order-total');
    if (total) {
      total.textContent = `$${this.getTotal().toFixed(2)}`;
    }
  }

  renderCheckoutPage() {
    this.renderOrderSummary();
  }

  handleCheckoutForm() {
    const form = document.querySelector('.checkout-form');
    if (!form) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!this.items.length) {
        this.showNotification('Your cart is empty.');
        return;
      }
      this.clearCart();
      const success = document.querySelector('.checkout-success');
      if (success) {
        success.style.display = 'block';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

    // NOTIFICATIONS

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 260px;';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
  }
}

// CART INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  new Cart();
});
