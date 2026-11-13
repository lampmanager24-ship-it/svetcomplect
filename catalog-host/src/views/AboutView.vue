<template>
  <div class="site-container about-page">
    <!-- Шапка сторінки -->
    <header class="about-header">
      <h1>Світло для вашого об'єкта: підібрали, порахували, привезли</h1>
    </header>

    <main class="about-content">
      <!-- Головний опис -->
      <section class="about-intro">
        <p>
          Ми комплектуємо квартири, будинки й комерційні приміщення освітленням та електрикою під ключ. 
          Замість того, щоб їздити по магазинах, порівнювати ціни й складати все докупи самотужки, ви отримуєте одного постачальника, який бере це на себе.
        </p>
      </section>

      <!-- Блоки переваг -->
      <div class="about-grid">
        <div class="about-card">
          <h2>Чому з нами вигідно</h2>
          <p>
            Ми працюємо напряму з постачальниками, тому наші ціни нижчі, ніж у роздрібних мережах. Ви платите за товар, а не за торгову націнку. Кожному об'єкту ми рахуємо три варіанти кошторису під різний бюджет, щоб ви бачили, на чому можна заощадити, а де краще не економити.
          </p>
        </div>

        <div class="about-card">
          <h2>Відповідальність на нас</h2>
          <p>
            Ми не просто продаємо світильники: підбираємо їх під ваше планування, перевіряємо комплектність і наявність, контролюємо відправлення. Якщо щось не підійшло чи прийшло з дефектом, ми вирішуємо це самі, без пінг-понгу між вами й виробником. На всі товари діє гарантія, а ви завжди знаєте, до кого звертатися.
          </p>
        </div>

        <div class="about-card">
          <h2>Усе під ключ</h2>
          <p>
            Освітлення, розетки, вимикачі, а згодом і чистова сантехніка: усе з одних рук і в одному замовленні. Ми робимо візуалізацію розстановки світла, рахуємо, скільки чого потрібно, і доставляємо на об'єкт безкоштовно.
          </p>
        </div>

        <div class="about-card">
          <h2>Завжди на зв'язку</h2>
          <p>
            Консультуємо без зобов'язань і відповідаємо протягом кількох годин у Telegram, Viber чи по телефону. Надішліть план або фото приміщення, і ми запропонуємо рішення.
          </p>
        </div>
      </div>

      <!-- Клієнти / Партнери -->
      <section class="about-clients">
        <h2>Працюємо з усіма</h2>
        <p>
          Наші клієнти: власники нових квартир, ремонтні бригади, дизайнери, електрики, прораби. Для партнерів діють окремі умови.
        </p>
      </section>

      <!-- Заклик до дії -->
      <section class="about-cta">
        <p class="cta-text">Хочете порахувати свій об'єкт? Натисніть нижче, і ми повернемося з пропозицією.</p>
        <button class="btn-consultation" @click="$emit('open-consultation')">
          Замовити консультацію
        </button>
      </section>
    </main>
  </div>
</template>

<script setup>
defineEmits(['open-consultation'])
</script>

<style scoped>
.site-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 30px 40px 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color, #eaeaea);
}

.about-header h1 {
  font-size: 26px;
  margin: 0;
  color: var(--text-main, #111);
  line-height: 1.3;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.about-intro {
  background: var(--bg-card, #f9f9f9);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color, #eaeaea);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.about-intro p {
  font-size: 15px;
  color: var(--text-secondary, #444);
  line-height: 1.6;
  margin: 0;
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.about-card {
  background: var(--bg-card, #fff);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color, #eaeaea);
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.about-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.about-card h2 {
  font-size: 18px;
  color: var(--text-main, #111);
  margin-top: 0;
  margin-bottom: 12px;
}

.about-card p {
  font-size: 14px;
  color: var(--text-secondary, #555);
  line-height: 1.5;
  margin: 0;
}

.about-clients {
  background: var(--bg-card, #fdfdfd);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color, #eaeaea);
  text-align: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.about-clients h2 {
  font-size: 18px;
  color: var(--text-main, #111);
  margin-top: 0;
  margin-bottom: 10px;
}

.about-clients p {
  font-size: 14px;
  color: var(--text-secondary, #555);
  margin: 0;
}

.about-cta {
  text-align: center;
  padding: 30px;
  background: var(--bg-card, #f5f5f7);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.cta-text {
  font-size: 16px;
  color: var(--text-main, #333);
  font-weight: 500;
  margin: 0;
}

.btn-consultation {
  background-color: var(--text-main, #111);
  color: var(--bg-card, #fff);
  border: none;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn-consultation:hover {
  opacity: 0.9;
  transform: scale(1.04);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .about-header h1 {
    font-size: 22px;
  }
}
</style>