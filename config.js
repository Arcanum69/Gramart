const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.CONNECTION_STRING, {});

connect.then(() => {
  console.log("Database connected sucessfully.");
}).catch(()=> {
  console.log("Database not connected.")
});

// User Schema
const userSchema = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId, 
    default: new mongoose.Types.ObjectId() 
},
  username: { 
    type: String, 
    required: true, unique: true
},
  password: {
    type: String,
    required: true
},
//   phoneNumber: { 
//     type: String, 
//     required: true 
// },
//   email_id: { 
//     type: String, 
//     required: true, unique: true 
// },
  isVendor: { 
    type: Boolean, 
    default: false 
},
  vendor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', default: null 
},
isVerified: { 
  type: Boolean, 
  default: false 
},
//   location: { 
//     type: String, 
//     required: true 
// },
  itemsOnSale: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
}],
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
const USER = mongoose.model('User', userSchema);
const PRODUCT = mongoose.model('Product', productSchema);
const CATEGORY = mongoose.model('Category', categorySchema);

module.exports = { USER, PRODUCT, CATEGORY };
