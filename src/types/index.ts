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

interface ValidationResult {
    isValid: boolean;     // Результат валидации
    errors: string[];     // Список ошибок
}

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