<template>
  <div id="app" class="site-container">
    
    <!-- ФІКСОВАНА ШАПКА -->
    <header class="main-header">
      <nav class="nav-links">
        <router-link v-if="isHome" to="/about" class="btn-nav">Про нас</router-link>
        <router-link v-else to="/" class="btn-nav">До головної</router-link>

        <a href="tel:+380638533794" class="btn-nav phone-link">063 853 37 94</a>
        
        <div class="messenger-links">
          <a href="https://t.me/chandelier_manager" target="_blank" rel="noopener noreferrer" class="messenger-btn telegram-btn">Telegram</a>
          <a href="viber://chat?number=%2B380638533794" class="messenger-btn viber-btn">Viber</a>
        </div>
      </nav>

      <div class="cart-wrapper">
        <button class="btn-cart" @click="openCartModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span>Кошик</span>
          <span class="cart-count" v-if="totalCount > 0">{{ totalCount }}</span>
        </button>
      </div>
    </header>

    <!-- ВМІСТ СТОРІНОК -->
    <main class="page-content">
      <router-view 
        @open-consultation="isConsultationOpen = true" 
        @open-points-modal="isPointsModalOpen = true"
        @open-tracks230v-modal="isTracks230vModalOpen = true"
        @open-magnetic-modal="isMagneticModalOpen = true"
        @add-to-cart="addToCart"
      />
    </main>

    <!-- 1. КОШИК -->
    <div v-if="isCartOpen" class="modal-backdrop" @click.self="closeCartModal">
      <div class="modal-window">
        <div class="modal-header">
          <h2>{{ isCheckoutStep ? 'Оформлення замовлення' : 'Обрані товари' }}</h2>
          <button class="close-btn" @click="closeCartModal" aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body cart-body">
          <div v-if="!isCheckoutStep">
            <p v-if="cart.length === 0" class="empty-text">Ваш кошик поки що порожній</p>
            
            <div v-else>
              <div class="cart-items-list">
                <div v-for="item in cart" :key="item.uniqueId" class="cart-item">
                  <div class="cart-item-img">
                    <img :src="item.image" :alt="item.specs">
                  </div>
                  <div class="cart-item-info">
                    <p class="cart-item-specs">{{ item.specs }}</p>
                  </div>
                  <div class="cart-item-price-wrap">
                    <span class="cart-item-price">{{ item.price * item.quantity }} грн</span>
                  </div>
                  <div class="cart-item-counter">
                    <button @click="decreaseQuantity(item)" class="count-btn">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item)" class="count-btn">+</button>
                  </div>
                  <button class="remove-btn" @click="removeFromCart(item.uniqueId)" title="Видалити">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="cart-footer-action" v-if="cart.length > 0">
                <div class="total-amount">
                  <span>Загальна сума:</span>
                  <strong>{{ totalPrice }} грн</strong>
                </div>
                <button class="btn-proceed-order" @click="isCheckoutStep = true">
                  Замовити
                </button>
              </div>
            </div>
          </div>

          <div v-else class="checkout-form">
            <form @submit.prevent="submitOrder">
              <div class="form-group">
                <label>ПІБ отримувача</label>
                <input type="text" v-model="orderForm.fullName" placeholder="Іванов Іван Іванович" required />
              </div>
              <div class="form-group">
                <label>Номер телефону</label>
                <input type="tel" v-model="orderForm.phone" placeholder="+38 (068) 000-00-00" required />
              </div>
              <div class="form-group">
                <label>Місто</label>
                <input type="text" v-model="orderForm.city" placeholder="наприклад, Київ" required />
              </div>
              <div class="form-group">
                <label>Номер відділення Нової Пошти</label>
                <input type="text" v-model="orderForm.warehouse" placeholder="наприклад, Відділення №15" required />
              </div>
              <div class="form-group">
                <label>Коментар до замовлення (необов'язково)</label>
                <textarea v-model="orderForm.comment" placeholder="Ваші побажання або запитання..."></textarea>
              </div>
              <div class="checkout-buttons">
                <button type="button" class="btn-back-cart" @click="isCheckoutStep = false">Назад до кошика</button>
                <button type="submit" class="btn-make-order">Зробити замовлення</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. КОНСУЛЬТАЦІЯ -->
    <div v-if="isConsultationOpen" class="modal-backdrop" @click.self="isConsultationOpen = false">
      <div class="modal-window">
        <div class="modal-header">
          <h2>Замовити консультацію</h2>
          <button class="close-btn" @click="isConsultationOpen = false" aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body consultation-body">
          <p class="consultation-desc">Оберіть зручний спосіб зв'язку з нами:</p>
          <div class="consultation-buttons">
            <a href="https://t.me/0680910306" target="_blank" rel="noopener noreferrer" class="con-btn telegram">Telegram</a>
            <a href="viber://chat?number=%2B380680910306" class="con-btn viber">Viber</a>
            <a href="tel:+380680910306" class="con-btn phone">068 091 03 06</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. МОДАЛКА ТОЧОК -->
    <div v-if="isPointsModalOpen" class="modal-backdrop" @click.self="isPointsModalOpen = false">
      <div class="modal-window">
        <div class="modal-header">
          <h2>Оберіть тип точок</h2>
          <button class="close-btn" @click="isPointsModalOpen = false" aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body points-choice-body">
          <router-link to="/points/embedded" class="points-choice-card" @click="isPointsModalOpen = false">
            <div class="points-choice-img">
              <img src="/images/pointsImg/point17.jpg" alt="Вбудовані точки" />
            </div>
            <span>Вбудовані точки</span>
          </router-link>

          <router-link to="/points/surface" class="points-choice-card" @click="isPointsModalOpen = false">
            <div class="points-choice-img">
              <img src="/images/pointsImg/points1.jpg" alt="Накладні точки" />
            </div>
            <span>Накладні точки</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 4. МОДАЛКА ТРЕКИ 230В -->
    <div v-if="isTracks230vModalOpen" class="modal-backdrop" @click.self="isTracks230vModalOpen = false">
      <div class="modal-window">
        <div class="modal-header">
          <h2>Треки 230В</h2>
          <button class="close-btn" @click="isTracks230vModalOpen = false" aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body points-choice-body">
          <router-link to="/tracks230v/rails" class="points-choice-card" @click="isTracks230vModalOpen = false">
            <div class="points-choice-img">
              <img src="/images/trackd.webp" alt="Шинопровід для треків 230В" />
            </div>
            <span>Шинопровід для треків 230В</span>
          </router-link>

          <router-link to="/tracks230v/fixtures" class="points-choice-card" @click="isTracks230vModalOpen = false">
            <div class="points-choice-img">
              <img src="/images/trackd.webp" alt="Світильники 230В" />
            </div>
            <span>Світильники 230В</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 5. МОДАЛКА МАГНІТНІ ТРЕКИ -->
    <div v-if="isMagneticModalOpen" class="modal-backdrop" @click.self="isMagneticModalOpen = false">
      <div class="modal-window">
        <div class="modal-header">
          <h2>Магнітні треки</h2>
          <button class="close-btn" @click="isMagneticModalOpen = false" aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body points-choice-body">
          <router-link to="/magnetic/rails" class="points-choice-card" @click="isMagneticModalOpen = false">
            <div class="points-choice-img">
              <img src="/images/tracks.png" alt="Шинопровід для магнітної системи" />
            </div>
            <span>Шинопровід для магнітної системи</span>
          </router-link>

          <router-link to="/magnetic/fixtures" class="points-choice-card" @click="isMagneticModalOpen = false">
            <div class="points-choice-img">
              <img src="/images/tracks.png" alt="Магнітні світильники" />
            </div>
            <span>Магнітні світильники</span>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const isCartOpen = ref(false)
    const isConsultationOpen = ref(false)
    const isPointsModalOpen = ref(false)
    const isTracks230vModalOpen = ref(false)
    const isMagneticModalOpen = ref(false)
    const isCheckoutStep = ref(false)
    const cart = ref([])

    const orderForm = reactive({ fullName: '', phone: '', city: '', warehouse: '', comment: '' })

    const isHome = computed(() => route.path === '/')
    const totalCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
    const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

    const openCartModal = () => { isCartOpen.value = true }
    const closeCartModal = () => {
      isCartOpen.value = false
      setTimeout(() => { isCheckoutStep.value = false }, 200)
    }

    const addToCart = (product, categoryName) => {
      const uniqueId = `${categoryName}-${product.id}`
      const existingItem = cart.value.find(item => item.uniqueId === uniqueId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.value.push({
          uniqueId,
          id: product.id,
          category: categoryName,
          specs: product.specs || product.name || 'Світильник',
          price: product.price || 0,
          image: product.image || product.img || '/images/chandelier.webp',
          quantity: 1
        })
      }
    }

    const increaseQuantity = (item) => { item.quantity += 1 }
    const decreaseQuantity = (item) => { if (item.quantity > 0) item.quantity -= 1 }
    const removeFromCart = (uniqueId) => { cart.value = cart.value.filter(item => item.uniqueId !== uniqueId) }

    const submitOrder = async () => {
      const itemsList = cart.value.map(i => `• ${i.specs} — ${i.quantity} шт. (${i.price * i.quantity} грн)`).join('\n')
      const orderMessage = `🚨 Нове замовлення на сайті! 🚨\n\n👤 ПІБ: ${orderForm.fullName}\n📞 Телефон: ${orderForm.phone}\n🏙 Місто: ${orderForm.city}\n📦 Відділення НП: ${orderForm.warehouse}\n💬 Коментар: ${orderForm.comment || 'немає'}\n\n🛒 Товари:\n${itemsList}\n\n💰 Загальна сума: ${totalPrice.value} грн`

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '8ca1b102-ef72-409f-b7a7-5ea97c7873ea',
            subject: '🚨 Нове замовлення освітлення з сайту!',
            from_name: 'Менеджер сайту',
            message: orderMessage,
            pib: orderForm.fullName,
            phone: orderForm.phone,
            city: orderForm.city,
            warehouse: orderForm.warehouse,
            comment: orderForm.comment
          })
        });
        const result = await response.json();
        if (result.success) {
          alert('Дякуємо! Ваше замовлення успішно оформлене.')
          cart.value = []
          isCheckoutStep.value = false
          isCartOpen.value = false
          orderForm.fullName = ''
          orderForm.phone = ''
          orderForm.city = ''
          orderForm.warehouse = ''
          orderForm.comment = ''
        } else {
          alert('Сталася помилка при відправці: ' + result.message)
        }
      } catch (err) {
        console.error('Помилка мережі:', err)
        alert('Не вдалося з’єднатися з сервером.')
      }
    }

    return {
      isHome, isCartOpen, isConsultationOpen, isPointsModalOpen, isTracks230vModalOpen, isMagneticModalOpen,
      isCheckoutStep, cart, totalCount, totalPrice, orderForm,
      openCartModal, closeCartModal, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, submitOrder
    }
  }
}
</script>

<style>
.site-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px 20px 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* СУПЕР-КОМПАКТНА ШАПКА ДЛЯ МОБІЛЬНИХ */
.main-header {
  position: sticky;
  top: 8px;
  background-color: #ffffff;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  gap: 8px;
}

.page-content { padding-top: 15px; }

.nav-links {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap; /* Дозволяє акуратно переноситися на дуже вузьких екранах */
}

.btn-nav {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 12px;
  white-space: nowrap;
}
.btn-nav:hover { color: #0066cc; }

.phone-link {
  font-weight: 600;
  color: #111;
  font-size: 12px;
}

.messenger-links {
  display: flex;
  gap: 4px;
}

.messenger-btn {
  text-decoration: none;
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
}
.telegram-btn { background-color: #24a1de; }
.viber-btn { background-color: #7360f2; }

.btn-cart {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f5f5f7;
  border: 1px solid #d2d2d7;
  padding: 5px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
}
.cart-count {
  background: #0066cc;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 8px;
}

/* ЗАЛІЗОБЕТОННЕ ЦЕНТРУВАННЯ МОДАЛЬНИХ ВІКОН НА ВСІХ ПРИСТРОЯХ */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center; /* Рівно по центру по вертикалі */
  z-index: 1000;
  backdrop-filter: blur(3px);
  padding: 10px;
  box-sizing: border-box;
}

.modal-window {
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  max-height: 85vh; /* Щоб вікно ніколи не вилазило за краї екрана мобільного */
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: auto; /* Додатковий захист від зсувів */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eaeaea;
  flex-shrink: 0;
}
.modal-header h2 { font-size: 15px; font-weight: 600; margin: 0; color: #111; }

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}
.close-btn:hover { color: #111; }

.modal-body {
  padding: 15px;
  overflow-y: auto;
  flex-grow: 1;
}

/* КАРТКИ ВИБОРУ У МОДАЛКАХ (ВЕРТИКАЛЬНО НА МОБІЛЬНИХ) */
.points-choice-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 576px) {
  .points-choice-body {
    grid-template-columns: 1fr; /* Одна під одною на телефонах */
  }
}

.points-choice-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #111;
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 12px;
  transition: 0.2s;
}
.points-choice-card:hover { border-color: #0066cc; }

.points-choice-img {
  width: 100%;
  height: 85px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-bottom: 8px;
}
.points-choice-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.points-choice-card span { font-size: 13px; font-weight: 600; text-align: center; }

/* Стилі кошика та форм */
.cart-body { text-align: left; }
.empty-text { color: #777; text-align: center; margin: 0; font-size: 13px; }
.cart-items-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.cart-item { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px; background: #f9f9f9; border-radius: 8px; border: 1px solid #eaeaea; }
.cart-item-img { width: 38px; height: 38px; background: #fff; border-radius: 6px; display: flex; align-items: center; justify-content: center; padding: 3px; flex-shrink: 0; }
.cart-item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.cart-item-info { flex-grow: 1; min-width: 0; }
.cart-item-specs { font-size: 11px; color: #555; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.cart-item-price-wrap { text-align: center; min-width: 60px; flex-shrink: 0; }
.cart-item-price { font-size: 12px; font-weight: 700; color: #0066cc; }
.cart-item-counter { display: flex; align-items: center; gap: 4px; background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 2px 4px; flex-shrink: 0; }
.count-btn { background: transparent; border: none; cursor: pointer; font-weight: 600; font-size: 12px; }
.remove-btn { background: transparent; border: none; color: #ff3b30; cursor: pointer; flex-shrink: 0; }
.cart-footer-action { border-top: 1px solid #eaeaea; padding-top: 10px; display: flex; flex-direction: column; gap: 8px; }
.total-amount { display: flex; justify-content: space-between; font-size: 13px; }
.total-amount strong { font-size: 15px; color: #0066cc; }
.btn-proceed-order { background-color: #111; color: #fff; border: none; padding: 10px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 13px; }
.checkout-form { display: flex; flex-direction: column; gap: 8px; }
.form-group { display: flex; flex-direction: column; gap: 3px; }
.form-group label { font-size: 11px; font-weight: 500; }
.form-group input, .form-group textarea { padding: 7px; border: 1px solid #d2d2d7; border-radius: 6px; font-size: 12px; outline: none; }
.checkout-buttons { display: flex; gap: 8px; margin-top: 6px; }
.btn-back-cart { background: #f5f5f7; border: 1px solid #d2d2d7; padding: 9px; border-radius: 8px; flex: 1; cursor: pointer; font-size: 12px; }
.btn-make-order { background-color: #0066cc; color: #fff; border: none; padding: 9px; border-radius: 8px; flex: 1.5; cursor: pointer; font-weight: 600; font-size: 12px; }
.consultation-body { display: flex; flex-direction: column; gap: 12px; text-align: center; }
.consultation-desc { font-size: 13px; color: #555; margin: 0; }
.consultation-buttons { display: flex; flex-direction: column; gap: 8px; }
.con-btn { display: block; text-decoration: none; padding: 10px; border-radius: 8px; font-weight: 600; color: #fff; font-size: 13px; }
.con-btn.telegram { background-color: #24a1de; }
.con-btn.viber { background-color: #7360f2; }
.con-btn.phone { background-color: #111; }
body {
  background-color: #ffffff; /* або твій колір фону сайту */
  color: #222222;
}

/* Приклад для картки товару та верхньої плаваючої панелі */
.product-card, .header-bar {
  background-color: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

/* Для дрібного опису характеристик (наприклад, "6вт 630мм 3600к") */
.product-specs {
  color: var(--text-secondary);
}
</style>