import { useState } from 'react';

interface ProductFormData {
    name: string;
    category: string;
    price: string;
    quantity: string;
    description: string;
}

interface FormErrors {
    [key: string]: string;
}

interface AddProductFormProps {
    onSubmit: (data: ProductFormData) => void;
    onCancel: () => void;
}

const AddProductForm = ({ onSubmit, onCancel }: AddProductFormProps) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        category: 'Pepper',
        price: '',
        quantity: '',
        description: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validate = () => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.price || isNaN(Number(formData.price))) newErrors.price = 'Valid price is required';
        if (!formData.quantity || isNaN(Number(formData.quantity))) newErrors.quantity = 'Valid quantity is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="e.g. Ceylon Black Pepper"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                        type="text"
                        name="price"
                        className="form-input"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && <span className="form-error">{errors.price}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                        type="text"
                        name="quantity"
                        className="form-input"
                        placeholder="0"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    {errors.quantity && <span className="form-error">{errors.quantity}</span>}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Category</label>
                <select
                    name="category"
                    className="form-input"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ cursor: 'pointer' }}
                >
                    <option value="Pepper">Pepper</option>
                    <option value="Chili">Chili</option>
                    <option value="Chili Powder">Chili Powder</option>
                    <option value="Cinnamon">Cinnamon</option>
                    <option value="Muskari Powder">Muskari Powder</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    className="form-input"
                    rows={3}
                    placeholder="Describe your spice..."
                    value={formData.description}
                    onChange={handleChange}
                    style={{ resize: 'none' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={onCancel} style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: 600
                }}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    Add Product
                </button>
            </div>
        </form>
    );
};

export default AddProductForm;
