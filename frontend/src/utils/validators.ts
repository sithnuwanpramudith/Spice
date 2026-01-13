export interface ProductData {
    name: string;
    price: string | number;
    category: string;
    stock: string | number;
    description?: string;
}

export const validateProduct = (data: ProductData) => {
    const errors: { [key: string]: string } = {};

    if (!data.name || data.name.trim().length < 3) {
        errors.name = "Product name must be at least 3 characters long";
    }

    if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) {
        errors.price = "Enter a valid price greater than 0";
    }

    if (!data.category) {
        errors.category = "Please select a category";
    }

    const stockNum = Number(data.stock);
    if (data.stock === '' || isNaN(stockNum) || stockNum < 0) {
        errors.stock = "Stock cannot be negative";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateSupplierEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
