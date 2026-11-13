<template>
  <div class="home-page">
    <main>
      <!-- Маркетинговий блок -->
      <section class="hero-card">
        <h1>Комплектація освітленням: від схеми до доставки на об'єкт</h1>
        <p>Надішліть план або фото приміщення, і за 24 години ви отримаєте схему розстановки світла з візуалізацією та три варіанти кошторису під різний бюджет. Треки, точки, люстри, розетки й вимикачі: усе з одних рук. Доставка безкоштовна, консультація без зобов'язань.</p>
        
        <div class="hero-buttons">
          <button class="btn-consultation" @click="$emit('open-consultation')">
            Замовити консультацію
          </button>
          
          <button class="btn-to-catalog" @click="scrollToCatalog">
            Знаєте що вам треба? Спуститись до каталогу
          </button>
        </div>
      </section>

      <!-- Каталог категорій -->
      <section id="catalog-section" class="categories-section">
        <div class="categories-grid">
          
          <router-link to="/category/led-chandeliers" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/chandelier.webp" alt="Люстри лед">
            </div>
            <h3>люстри лед</h3>
          </router-link>

          <router-link to="/category/hanging-led" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/pendants.webp" alt="Люстри підвісні лед">
            </div>
            <h3>люстри підвісні лед</h3>
          </router-link>

          <!-- КАТЕГОРІЯ ТОЧКИ -->
          <div @click="$emit('open-points-modal')" class="category-card points-card-trigger">
            <div class="card-image-wrap">
              <img src="/images/point.jpg" alt="Точки">
            </div>
            <h3>точки</h3>
          </div>

          <!-- КАТЕГОРІЯ ТРЕКИ 230В -->
          <div @click="$emit('open-tracks230v-modal')" class="category-card points-card-trigger">
            <div class="card-image-wrap">
              <img src="/images/trackd.webp" alt="Треки 230в">
            </div>
            <h3>треки 230в</h3>
          </div>

          <!-- КАТЕГОРІЯ МАГНІТНІ ТРЕКИ -->
          <div @click="$emit('open-magnetic-modal')" class="category-card points-card-trigger">
            <div class="card-image-wrap">
              <img src="/images/tracks.png" alt="Магнітні треки">
            </div>
            <h3>магнітні треки</h3>
          </div>

          <router-link to="/category/wall-lights" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/wall.jpg" alt="Настінні світильники">
            </div>
            <h3>настінні світильники</h3>
          </router-link>

          <router-link to="/category/surface-lights" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/mount.png" alt="Світильники накладні">
            </div>
            <h3>світильники накладні</h3>
          </router-link>

          <router-link to="/category/crystal" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/gold.webp" alt="Кришталеві">
            </div>
            <h3>кришталеві</h3>
          </router-link>

          <router-link to="/category/single-pendants" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/pendant.png" alt="Одинарні підвіси">
            </div>
            <h3>одинарні підвіси</h3>
          </router-link>

          <router-link to="/category/lamp-chandeliers" class="category-card">
            <div class="card-image-wrap">
              <img src="/images/gx.jpg" alt="Люстри під лампу">
            </div>
            <h3>люстри під лампу</h3>
          </router-link>

        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    scrollToCatalog() {
      const catalogElement = document.getElementById('catalog-section');
      if (catalogElement) {
        // Виправляємо занадто низький скрол: робимо поправку на висоту шапки (~70px)
        const yOffset = -70; 
        const y = catalogElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.hero-card {
  background: var(--bg-card, #f9f9f9);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.hero-card h1 { 
  font-size: 26px; 
  line-height: 1.4; 
  margin-bottom: 15px; 
  color: var(--text-main, #111); 
}

.hero-card p { 
  color: var(--text-secondary, #555); 
  font-size: 14px; 
  max-width: 900px; 
  margin: 0 auto; 
  line-height: 1.5; 
  margin-bottom: 24px; 
}

.hero-buttons { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 12px; 
}

.btn-consultation { 
  background-color: var(--text-main, #111); 
  color: var(--bg-card, #fff); 
  border: none; 
  padding: 12px 24px; 
  font-size: 15px; 
  font-weight: 600; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: 0.2s; 
}

.btn-consultation:hover { 
  opacity: 0.9; 
  transform: scale(1.04); 
}

.btn-to-catalog { 
  background-color: var(--bg-card, #ffffff); 
  border: 1.5px solid var(--border-color, #d2d2d7); 
  color: var(--text-main, #1d1d1f); 
  font-size: 14px; 
  font-weight: 500; 
  padding: 10px 20px; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: 0.2s; 
}

.btn-to-catalog:hover { 
  border-color: #0066cc; 
  color: #0066cc; 
  transform: scale(1.04); 
}

.categories-grid { 
  display: grid; 
  grid-template-columns: repeat(5, 1fr); 
  gap: 16px; 
}

.category-card, .points-card-trigger {
  background: var(--bg-card, #fff); 
  border: 1px solid var(--border-color, #eaeaea); 
  border-radius: 10px; 
  overflow: hidden;
  text-decoration: none; 
  color: inherit; 
  display: flex; 
  flex-direction: column;
  width: 100%; 
  max-width: 240px; 
  margin: 0 auto; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease; 
  cursor: pointer;
}

.category-card:hover, .points-card-trigger:hover {
  transform: translateY(-4px) scale(1.03); 
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.card-image-wrap { 
  width: 100%; 
  height: 130px; 
  background: var(--bg-card, #fdfdfd); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding: 10px; 
  box-sizing: border-box; 
}

.card-image-wrap img { 
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain; 
}

.category-card h3, .points-card-trigger h3 { 
  padding: 12px 8px; 
  font-size: 13px; 
  text-align: center; 
  margin: 0; 
  color: var(--text-main, #333); 
  font-weight: 600; 
  text-transform: lowercase; 
}

@media (max-width: 640px) {
  .categories-grid { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 12px; 
  }
}
</style>