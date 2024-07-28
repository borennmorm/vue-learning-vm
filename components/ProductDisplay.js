app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:  
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <!-- image goes here -->
        <a :href="url">
          <img :src="image" alt=""  :class="{ 'out-of-stock-img': !inStock }"/>
        </a>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>

        <p>{{ sale }}</p>

        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p>Shipping: {{ shipping  }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="size in sizes" :key="size.id">{{ size.size }}</div>

        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }"
        ></div>

        <button
          class="button"
          @click="addToCart"
          :disabled="!inStock"
          :class=" { disabledButton: !inStock }"
        >
          Add to Cart
        </button>
        <button class="button" @click="removeFromCart">Remove Item</button>
      </div>
    </div>

    <review-list v-if="reviews.length" :reviews="reviews"></review-list>

    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        description: 'A pair of socks',
        onSale: true,
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0},
          ],
        reviews: [],
        sizes: [{
            id: 9876,
            size: 'small',
        },
        {
            id: 9877,
            size: 'medium',
        },
        {
            id: 9878,
            size: 'large',
        },
        {
            id: 9879,
            size: 'x-large',
        },
        
    ],
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
        // if(this.cart >= 1) {
        //     this.cart -= 1;
        // }
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
        this.selectedVariant = index;
        console.log(index);
    },
    addReview(review) {
        this.reviews.push(review)
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product;
    },
    image() {
        return this.variants[this.selectedVariant].image;
    },
    inStock() {
        return this.variants[this.selectedVariant].quantity;
    },
    sale() {
        if(this.onSale) {
            return this.brand + ' ' + this.product + ' is on sale!';
        } 
        return '';
    },
    shipping() {
        if(this.premium) {
            return 'Free'
        } 
        return 2.99;
    }
}
})