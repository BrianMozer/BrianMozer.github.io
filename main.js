const app = new Vue({
  el: '#app',
  data: {
    // existing data
    isMenuOpen: false,
    products: [
                { id: 1, title: 'Beet Hybrid B1', short_text: 'Высокая устойчивость и отличный вкус', image: 'b1.png' },
                { id: 2, title: 'Beet Hybrid B2', short_text: 'Раннеспелый гибрид для открытого грунта', image: 'b2.png' },
                { id: 3, title: 'Beet Hybrid B3', short_text: 'Идеально подходит для тепличных условий', image: 'b3.png' },
                { id: 4, title: 'Beet Hybrid B4', short_text: 'Устойчив к вирусу BYLCV', image: 'b4.png' },
                { id: 5, title: 'Beet Hybrid B5', short_text: 'Длительный срок хранения и ярко-красный цвет', image: 'b5.png' }
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