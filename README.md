# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка зависимостей
```
npm install
```

## Запуск в режиме разработки
```
npm run dev
```

## Сборка для production
```
npm run build
```

## Запуск собранного проекта
```
npm run start
```

## Описание проекта

Проект реализует интернет-магазин Web-ларёк с товарами для веб-разработчиков с возможностью просмотра каталога, добавления в корзину и оформления заказа. Проект реализован на TypeScript как SPA (Single Page Application) с использованием архитектуры MVP(Model-View-Presenter).


## Model (Компоненты модели данных)

**Назначение:** Управление данными, бизнес-логика, работа с API и хранилищами.

### ProductModel
Класс ProductModel управляет каталогом товаров. 
Его функции: 
- загрузка товаров с сервера; 
- поиск по ID; 
- фильтрация по категориям.

```
class ProductModel {
  async loadProducts(): Promise<Product[]>;         // Загрузка товаров через Api.get()
  getProductById(id: string): Product | undefined;  // Поиск товара по ID
  getProductsByType(type: string): Product[];       // Фильтрация по категории
}
```
### CartModel
Класс CartModel управляет корзиной покупок. 
Его функции: 
- добавление/удаление товаров; 
- расчет стоимости; 
- сохранение в localStorage.

```
class CartModel {
  addItem(product: Product): void;              // Добавление товара в корзину
  removeItem(productId: string): void;          // Удаление товара из корзины
  getItems(): CartItem[];                       // Получение всех items
  getTotalPrice(): number;                      // Расчет общей суммы
  clearCart(): void;                            // Очистка корзины
}
```
### OrderModel
Класс OrderModel управляет заказами. 
Его функции: 
- создание заказов; 
- работа с API заказов.
```
class OrderModel {
  async createOrder(data: OrderData): Promise<Order>;  // Создание через Api.post()
}
```

## View (Компоненты представления)
**Назначение:** Отображение UI, обработка пользовательского ввода, делегирование действий презентерам.

### MainView
**Компонент MainView** отображает главную страницу с каталогом товаров, используя компоненты ProductCard.

```
interface IMainView {
  render(products: Product[]): HTMLElement;     // Отрисовка каталога товаров
  updateCartCounter(count: number): void;       // Обновление счетчика корзины
  showProductModal(product: Product): void;     // Показ модального окна товара
  hideProductModal(): void;                     // Скрытие модального окна
  bindHandlers(handlers: MainViewHandlers): void; // Привязка обработчиков
}
```

### CartView
**Компонент CartView** отображает модальное окно корзины с товарами и формой оформления заказа.

```
interface ICartView {
    render(items: CartItem[]): HTMLElement;       // Отрисовка содержимого корзины
    open(): void;                                 // Открытие модального окна
    close(): void;                                // Закрытие модального окна
    showCheckoutStep(step: CheckoutStep): void;   // Переключение шагов оформления
    showValidationError(errors: string[]): void;  // Показ ошибок валидации
    showOrderSuccess(order: Order): void;         // Показ успешного заказа
    bindHandlers(handlers: CartViewHandlers): void; // Привязка обработчиков
}
```

### ProductCard
**Компонент ProductCard** отображает карточку отдельного товара с кнопками действий.

```
interface IProductCard {
    render(product: Product): HTMLElement;        // Отрисовка карточки товара
    setInCartState(isInCart: boolean): void;      // Обновление состояния корзины
    bindHandlers(handlers: ProductCardHandlers): void; // Привязка обработчиков
}
```

## Presenter (Компоненты презентера)

**Назначение:** Обработка пользовательских действий, преобразование в события, координация между View и Model.

### MainPresenter
**Класс MainPresenter** обрабатывает действия на главной странице.

```
class MainPresenter {
    onProductClick(productId: string): void;      // Обработка клика по товару
    onAddToCart(productId: string): void;         // Обработка добавления в корзину
    onCartIconClick(): void;                      // Обработка клика по иконке корзины
    getHandlers(): MainViewHandlers;              // Получение обработчиков для View
}
```

### CartPresenter
**Класс CartPresenter** обрабатывает действия в корзине и процессе оформления.

```
class CartPresenter {
    onClose(): void;                              // Закрытие модального окна
    onRemoveItem(productId: string): void;        // Удаление товара из корзины
    onCheckoutStep1(address: string, paymentMethod: string): void; // Шаг 1 оформления
    onCheckoutStep2(email: string, phone: string): void;           // Шаг 2 оформления
    async onOrderSubmit(orderData: OrderData): Promise<void>;      // Валидация + отправка заказа
    getHandlers(): CartViewHandlers;              // Получение обработчиков для View
}
```

## Вспомгательные компоненты

### EventEmitter
**Класс EventEmitter** обеспечивает коммуникацию между всеми компонентами через систему событий.
```
class EventEmitter implements IEvents {
    on<T>(event: EventName, callback: (data: T) => void): void;    // Подписка на событие
    emit<T>(event: string, data?: T): void;                       // Публикация события
    off(event: EventName, callback: Subscriber): void;            // Отписка от события
}
```

### API
**Класс Api**обеспечивает HTTP-взаимодействие с сервером.
```
class Api {
    get(uri: string): Promise<object>;                                          // GET запросы
    post(uri: string, data: object, method?: ApiPostMethods): Promise<object>;  // POST/PUT/DELETE
}
```

### OrederValidationService
  **Класс OrederValidationService** производит валидацию данных при офрмлении заказа
  ```
  class OrderValidationService {
    validateOrderData(data: OrderData): ValidationResult;   // Валидация данных заказа
    validateAddress(address: string): boolean;              // Валидация адреса
    validateEmail(email: string): boolean;                  // Валидация email
    validatePhone(phone: string): boolean;                  // Валидация телефона
    private isValidEmail(email: string): boolean;           // Проверка формата email
    private isValidPhone(phone: string): boolean;           // Проверка формата телефона
  }
  ```

## Типы данных
```
// Модели даннных
interface Product {
    id: string;           // Уникальный идентификатор товара
    type: string;         // Категория товара
    name: string;         // Название товара
    imageUrl: string;     // URL изображения товара
    description: string;  // Описание товара
    price: number;        // Цена товара
}

interface CartItem {
    product: Product;    // Данные товара
    quantity: number;    // Количество товара в корзине
}

interface OrderData {
    items: CartItem[];       // Товары в заказе
    deliveryAddress: string; // Адрес доставки
    paymentMethod: string;   // Способ оплаты
    customerEmail: string;   // Email покупателя
    customerPhone: string;   // Телефон покупателя
}

// Результат валидации
interface ValidationResult {
    isValid: boolean;     // Результат валидации
    errors: string[];     // Список ошибок
}

// Обработчики
interface MainViewHandlers {
    onProductClick: (productId: string) => void;
    onAddToCart: (productId: string) => void;
    onCartIconClick: () => void;
}

interface CartViewHandlers {
    onClose: () => void;
    onRemoveItem: (productId: string) => void;
    onCheckoutStep1: (address: string, paymentMethod: string) => void;
    onCheckoutStep2: (email: string, phone: string) => void;
    onOrderSubmit: (orderData: OrderData) => void;
}

interface ProductCardHandlers {
    onClick: (productId: string) => void;
    onAddToCart: (productId: string) => void;
}
```

## Взайимодействие компонентов
### Процесс: Оформление заказа
  1. Пользователь → Заполняет форму в CartView

  2. CartView → Вызывает handlers.onOrderSubmit(orderData)

  3. CartPresenter → Валидирует данные через OrderValidationService

  4. CartPresenter → Если валидно: вызывает OrderModel.createOrder()

  5. CartPresenter → Если невалидно: emits 'validation:error'

  6. OrderModel → Отправляет данные через Api.post()

  7. CartPresenter → Обрабатывает результат → Обновляет CartView