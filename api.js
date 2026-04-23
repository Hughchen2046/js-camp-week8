// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    const response = await axios.get(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`);
    // console.log(response.data.products);
    return response.data.products;
  } catch (error) {
    throw new Error(`取得產品列表失敗: ${error.response?.status}`);
  }
}
/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const response = await axios.get(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`);
    const { carts, total, finalTotal } = response.data;
    // console.log('購物車資料:', { carts, total, finalTotal });
    return { carts, total, finalTotal };
  } catch (error) {
    console.log('取得購物車資料失敗:', error.response.status);
  }
}
// fetchCart();
/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
    const response = await axios.post(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, {
      data: {
        productId,
        quantity
      }
    });

    // console.log('購物車資料:', response.data);
    return response.data;
  } catch (error) {
    console.log('加入購物車資料失敗:', error.response.status);
  }
}
/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
    const response = await axios.patch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`, {
      data: {
        id: cartId,
        quantity
      }
    });

    // console.log('購物車資料:', response.data);
    return response.data;
  } catch (error) {
    console.log('更新購物車資料失敗:', error.response.status);
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  try {
    const response = await axios.delete(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`);

    // console.log('購物車資料:', response.data);
    return response.data;
  } catch (error) {
    console.log('刪除購物車單一項目失敗:', error.response.status);
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  try {
    const response = await axios.delete(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`);

    // console.log('購物車資料:', response.data);
    return response.data;
  } catch (error) {
    console.log('清空購物車失敗:', error.response.status);
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
    const response = await axios.post(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`, {
      data: { user: userInfo }
    });

    // console.log('訂單資料:', response);
    return response.data;
  } catch (error) {
    console.log('建立訂單失敗:', error.response.status);
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const response = await axios.get(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`, {
      headers: {
        authorization: ADMIN_TOKEN
      }
    });

    // console.log('訂單資料:', response.data);
    return response.data.orders;
  } catch (error) {
    console.log('取得訂單列表失敗:', error.response.status);
  }
}
// fetchOrders();
/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
    const response = await axios.put(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`, {
      data: {
        id: orderId,
        paid: isPaid
      }
    }, {
      headers: {
        authorization: ADMIN_TOKEN
      }
    });

    // console.log('訂單資料:', response.data);
    return response.data;
  } catch (error) {
    // console.log('更新訂單失敗:', error.response);
    throw new Error(`更新訂單失敗: ${error.response}`);
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  try {
    const response = await axios.delete(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`, {
      headers: {
        authorization: ADMIN_TOKEN
      }
    });

    // console.log('訂單資料:', response.data);
    return response.data;
  } catch (error) {
    // console.log('刪除訂單失敗:', error.response);
    throw new Error(`刪除訂單失敗: ${error.response}`);
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
