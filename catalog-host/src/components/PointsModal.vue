<template>
  <div class="category-dropdown-container">
    <!-- Кнопка категорії -->
    <button @click="isModalOpen = true" class="category-btn">
      Точкові світильники
    </button>

    <!-- Спливаюче вікно -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
      <div class="modal-content">
        <h3>Оберіть підкатегорію</h3>
        
        <div class="modal-cards">
          <!-- Вбудовані -->
          <router-link to="/points/embedded" class="modal-card" @click="isModalOpen = false">
            <img src="/images/pointsImg/point1.jpg" alt="Вбудовані" />
            <span>Вбудовані точки</span>
          </router-link>

          <!-- Накладні -->
          <router-link to="/points/surface" class="modal-card" @click="isModalOpen = false">
            <img src="/images/pointsImg/points1.jpg" alt="Накладні" />
            <span>Накладні точки</span>
          </router-link>
        </div>

        <button class="close-btn" @click="isModalOpen = false">Закрити</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isModalOpen = ref(false)
</script>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.modal-content { background: #fff; padding: 30px; border-radius: 12px; text-align: center; max-width: 500px; width: 90%; }
.modal-cards { display: flex; justify-content: space-around; gap: 15px; margin: 20px 0; }
.modal-card { text-decoration: none; color: #333; border: 2px solid #ddd; border-radius: 8px; padding: 10px; width: 45%; }
.modal-card img { width: 100%; height: 120px; object-fit: cover; border-radius: 6px; }
.modal-card span { display: block; margin-top: 8px; font-weight: bold; }
.close-btn { background: #dc3545; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
</style>