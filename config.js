const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: new mongoose.Types.ObjectId() 
},
  name: { 
    type: String, 
    required: true 
},
  phoneNumber: { 
    type: String, 
    required: true 
},
  email_id: { 
    type: String, 
    required: true, unique: true 
},
  isVendor: { 
    type: Boolean, 
    default: false 
},
  vendor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', default: null 
},
  location: { 
    type: String, 
    required: true 
},
  itemsOnSale: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
}],
  isVerified: { 
    type: Boolean, 
    default: false 
},
});

// Product Details Schema
const productSchema = new mongoose.Schema({
  P_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: new mongoose.Types.ObjectId() 
},
  P_category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', required: true 
},
  P_name: { 
    type: String, 
    required: true 
},
  P_description: { 
    type: String, 
    required: true 
},
  P_price: { 
    type: Number, 
    required: true 
},
  P_vendor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  P_images_links: [{ 
    type: String, 
    required: true 
}],
  P_location: { 
    type: String, 
    required: true 
},
  P_date_posted: { 
    type: Date, 
    default: Date.now 
},
  P_is_verified: { 
    type: Boolean, 
    default: false 
},
  P_is_refurbished: { 
    type: Boolean, 
    default: false 
},
});

// Categories Schema
const categorySchema = new mongoose.Schema({
  C_name: { 
    type: String, 
    required: true 
},
  C_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: new mongoose.Types.ObjectId() 
},
  C_items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
}],
});

// Exporting models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { User, Product, Category };
