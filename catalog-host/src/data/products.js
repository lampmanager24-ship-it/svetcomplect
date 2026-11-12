import { products as ledChandeliersProducts } from './led-chandeliers.js'
import { hangingLedProducts } from './hanging-led.js'
import { pointsProducts } from './points.js'
import { trackProducts } from './track.js'
import { magneticTrackProducts } from './tracks.js'
import { wallProducts } from './wall.js'
import { flashProducts } from './flash.js'
import { goldProducts } from './gold.js'
import { pendantProducts } from './pendant.js'
import { gxProducts } from './gx.js' // <--- 10-й файл (люстри під лампу)

export const products = [
  // 1. Люстри лед
  ...ledChandeliersProducts.map(item => ({ ...item, id: `led-${item.id}`, categoryId: 'led-chandeliers' })),

  // 2. Люстри підвісні лед
  ...hangingLedProducts.map(item => ({ ...item, id: `hanging-${item.id}`, categoryId: 'hanging-led' })),

  // 3. Точки
  ...pointsProducts.map(item => ({ ...item, id: `point-${item.id}`, categoryId: 'points' })),

  // 4. Треки 230в
  ...trackProducts.map(item => ({ ...item, id: `track-${item.id}`, categoryId: 'tracks-230v' })),

  // 5. Магнітні треки
  ...magneticTrackProducts.map(item => ({ ...item, id: `mag-${item.id}`, categoryId: 'magnetic-tracks' })),

  // 6. Настінні світильники
  ...wallProducts.map(item => ({ ...item, id: `wall-${item.id}`, categoryId: 'wall-lights' })),

  // 7. Світильники накладні
  ...flashProducts.map(item => ({ ...item, id: `flash-${item.id}`, categoryId: 'surface-lights' })),

  // 8. Кришталеві
  ...goldProducts.map(item => ({ ...item, id: `gold-${item.id}`, categoryId: 'crystal' })),

  // 9. Одинарні підвіси
  ...pendantProducts.map(item => ({ ...item, id: `pendant-${item.id}`, categoryId: 'single-pendants' })),

  // 10. Люстри під лампу (10-та кнопка, шлях у роутері перевір за своїм проєктом — наприклад 'lamp-chandeliers' або 'gx-lamps')
  ...gxProducts.map(item => ({ ...item, id: `gx-${item.id}`, categoryId: 'lamp-chandeliers' }))
];