const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress } = req.body;
    const userId = req.user ? req.user.id : req.body.userId; 

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cannot place an order with empty items' });
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      shippingAddress
    });

    const savedOrder = await newOrder.save();

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : req.params.userId;

    const orders = await Order.find({ userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};