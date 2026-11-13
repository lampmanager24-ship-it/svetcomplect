<template>
  <div class="site-container">
    <header class="category-header">
      <h1>{{ categoryTitle }}</h1>
    </header>

    <main>
      <div v-if="filteredProducts.length === 0" class="no-products">
        <p>У цій категорії поки немає товарів.</p>
      </div>

      <div v-else class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-img-wrap">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <div class="product-specs">
              <span>{{ product.specs }}</span>
            </div>
            <div class="product-bottom">
              <span class="product-price">{{ product.price }} грн</span>
              
              <button 
                class="btn-buy" 
                :class="{ 'added': addedStatus[product.id] }"
                @click="handleAddToCart(product)"
              >
                {{ addedStatus[product.id] ? 'Додано!' : 'Додати' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products.js'
import { embeddedPointsProducts } from '../data/embedded-points.js'
import { surfacePointsProducts } from '../data/surface-points.js'
import { tracks230vRailsProducts } from '../data/tracks230v-rails.js'
import { tracks230vFixturesProducts } from '../data/tracks230v-fixtures.js'
import { magneticRailsProducts } from '../data/magnetic-rails.js'
import { magneticFixturesProducts } from '../data/magnetic-fixtures.js'

const props = defineProps({
  categoryType: { type: String, default: '' }
})

const route = useRoute()
const emit = defineEmits(['add-to-cart'])
const addedStatus = reactive({})

const categoryNames = {
  'led-chandeliers': 'Люстри LED',
  'hanging-led': 'Люстри підвісні LED',
  'points': 'Точки',
  'tracks-230v': 'Треки 230В',
  'magnetic-tracks': 'Магнітні треки',
  'wall-lights': 'Настінні світильники',
  'surface-lights': 'Світильники накладні',
  'crystal': 'Кришталеві',
  'single-pendants': 'Одинарні підвіси',
  'lamp-chandeliers': 'Люстри під лампу'
}

const categoryTitle = computed(() => {
  if (props.categoryType === 'embedded') return 'Вбудовані точки'
  if (props.categoryType === 'surface') return 'Накладні точки'
  if (props.categoryType === 'tracks230v-rails') return 'Шинопровід для треків 230В'
  if (props.categoryType === 'tracks230v-fixtures') return 'Світильники 230В'
  if (props.categoryType === 'magnetic-rails') return 'Шинопровід для магнітної системи'
  if (props.categoryType === 'magnetic-fixtures') return 'Магнітні світильники'
  return categoryNames[route.params.id] || 'Категорія товарів'
})

const filteredProducts = computed(() => {
  if (props.categoryType === 'embedded') return embeddedPointsProducts
  if (props.categoryType === 'surface') return surfacePointsProducts
  if (props.categoryType === 'tracks230v-rails') return tracks230vRailsProducts
  if (props.categoryType === 'tracks230v-fixtures') return tracks230vFixturesProducts
  if (props.categoryType === 'magnetic-rails') return magneticRailsProducts
  if (props.categoryType === 'magnetic-fixtures') return magneticFixturesProducts
  return products.filter(item => item.categoryId === route.params.id)
})

const handleAddToCart = (product) => {
  const currentCategory = props.categoryType || route.params.id
  emit('add-to-cart', product, currentCategory)
  addedStatus[product.id] = true
  setTimeout(() => { addedStatus[product.id] = false }, 3000)
}
</script>

<style scoped>
.site-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.category-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color, #eaeaea);
}

.category-header h1 {
  font-size: 20px;
  margin: 0;
  color: var(--text-main, #111);
}

.no-products {
  text-align: center;
  color: var(--text-secondary, #666);
  padding: 40px 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.product-card {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.product-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.product-img-wrap {
  width: 100%;
  height: 160px;
  background: var(--bg-card, #fdfdfd);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
}

.product-img-wrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-details {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-details h3 {
  font-size: 14px;
  margin: 0 0 6px 0;
  color: var(--text-main, #222);
}

.product-specs {
  font-size: 12px;
  color: var(--text-secondary, #666);
  margin-bottom: 12px;
  line-height: 1.3;
}

.product-bottom {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.product-price {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-main, #111);
}

.btn-buy {
  background: rgba(52, 152, 219, 0.15);
  color: #3498db;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  transition: 0.2s;
}

.btn-buy:hover {
  background: rgba(52, 152, 219, 0.3);
}

.btn-buy.added {
  background: rgba(41, 128, 185, 0.3);
  color: #2980b9;
  font-weight: 600;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .product-img-wrap {
    height: 110px;
  }

  .product-details { padding: 8px; }
  .product-details h3 { font-size: 13px; margin-bottom: 4px; }
  .product-specs { font-size: 11px; margin-bottom: 8px; }
  .product-price { font-size: 13px; }
  .btn-buy { padding: 5px 8px; font-size: 11px; }
}
</style>