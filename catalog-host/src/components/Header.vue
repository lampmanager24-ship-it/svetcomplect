<template>
  <header class="main-header">
    <nav class="nav-links">
      <router-link to="/" class="btn-nav logo-link">Головна</router-link>
      <a href="tel:+380680910306" class="btn-nav phone-link">068 091 03 06</a>
      
      <div class="messenger-links">
        <a href="https://t.me/0680910306" target="_blank" rel="noopener noreferrer" class="messenger-btn telegram-btn" title="Написати в Telegram">
          Telegram
        </a>
        <a href="viber://chat?number=%2B380680910306" class="messenger-btn viber-btn" title="Написати у Viber">
          Viber
        </a>
      </div>
    </nav>

    <div class="cart-wrapper">
      <button class="btn-cart" @click="$emit('open-cart')" aria-label="Кошик">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Кошик</span>
        <span class="cart-count">0</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
  gap: 15px;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.btn-nav {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  transition: transform 0.2s ease, color 0.2s ease;
}

.btn-nav:hover {
  transform: scale(1.08);
  color: #0066cc;
}

.phone-link {
  font-weight: 600;
  color: #111;
  white-space: nowrap;
}

.messenger-links {
  display: flex;
  gap: 8px;
}

.messenger-btn {
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 6px;
  color: #fff;
  white-space: nowrap;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.messenger-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.telegram-btn {
  background-color: #24a1de;
}

.viber-btn {
  background-color: #7360f2;
}

.btn-cart {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f7;
  border: 1px solid #d2d2d7;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: #1d1d1f;
  white-space: nowrap;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn-cart:hover {
  transform: scale(1.05);
  background: #e8e8ed;
}
</style>