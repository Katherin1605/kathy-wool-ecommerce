import { getProducts, getProductById, getBestProducts, createProductModel } from '../models/productsModel.js';

export const fetchProducts = async (req, res) => {
    const {order_by, limit, page, category_id} = req.query;
    try {
        const products = await getProducts({order_by, limit, page, category_id});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const fetchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const fetchBestProducts = async (req, res) => {
    try {
        const bestProducts = await getBestProducts();
        res.json(bestProducts);
    } catch (error) {
        console.error('Error fetching best products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, category_id, description, price, stock, url_image, isactive } = req.body;
        const newProduct = await createProductModel({ name, category_id, description, price, stock, url_image, isactive });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
