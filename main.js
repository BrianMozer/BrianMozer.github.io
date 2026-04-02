const app = new Vue({
  el: '#app',
  data: {
    // existing data
    isMenuOpen: false,
    products: [
      { id: 1, title: 'Bordo Beetroot', short_text: 'Beet Hybrid', image: 'img/b1.png', desc: 'A mid-early variety...' },
      { id: 2, title: 'Cylindra Beetroot', short_text: 'Beet Hybrid', image: 'img/b2.png', desc: 'Unique cylindrical shape...' },
      { id: 3, title: 'Detroit Beetroot', short_text: 'Beet Hybrid', image: 'img/b3.png', desc: 'Round, smooth roots...' },
      { id: 4, title: 'Egyptian Beetroot', short_text: 'Beet Hybrid', image: 'img/b4.png', desc: 'Flat-round shape...' },
      { id: 5, title: 'Renova Beetroot', short_text: 'Beet Hybrid', image: 'img/b5.png', desc: 'Late variety...' }
    ],
    product: {},
    btnVisible: 0,

    // new data for cart and contact form
    cart: [],               // array of full product objects in cart
    contactFields: {        // v-model bindings for all form fields
      name: '',
      company: '',
      position: '',
      city: '',
      country: '',
      telephone: '',
      email: '',
      user_type: 'seed_producer',
      other_spec: '',
      interest: '',
      captcha: ''
    },
    orderSubmitted: false    // flag to show order summary instead of form
  },

  mounted() {
    this.getProduct();
    this.checkInCart();
    this.getCart();          // load cart from localStorage on every page
  },

  methods: {
    // existing methods
    getProduct() {
      if (window.location.hash) {
        let id = window.location.hash.replace('#', '');
        this.product = this.products.find(p => p.id == id) || {};
      }
    },
    addToCart(id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.btnVisible = 1;
      }
    },
    checkInCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (this.product && cart.includes(this.product.id)) {
        this.btnVisible = 1;
      }
    },

    // new methods
    getCart() {
      const storedIds = JSON.parse(localStorage.getItem('cart')) || [];
      // filter products that have id in storedIds
      this.cart = this.products.filter(p => storedIds.includes(p.id));
    },
    removeFromCart(id) {
      // remove from array
      this.cart = this.cart.filter(p => p.id !== id);
      // update localStorage
      const ids = this.cart.map(p => p.id);
      localStorage.setItem('cart', JSON.stringify(ids));
    },
    makeOrder() {
      // manual validation of required fields (marked with *)
      if (!this.contactFields.name || !this.contactFields.email || !this.contactFields.captcha) {
        alert('Please fill in all required fields (Name, Email, Captcha).');
        return;
      }
      // after successful validation
      this.orderSubmitted = true;
      // clear the cart (both array and localStorage)
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify([]));
      // (optional) keep contactFields for display
    }
  }
});