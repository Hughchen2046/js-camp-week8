// ========================================
// 工具函式
// ========================================

const dayjs = require('dayjs');

/**
 * 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 例如 '8折'
 */
function getDiscountRate(product) {
  // 請實作此函式
  const discountRate = Math.round((product.price / product.origin_price) * 10);
  // console.log('折扣率:', discountRate);
  return `${discountRate}折`;
}
// getDiscountRate({ price: 770, origin_price: 1000 }); // 測試計算折扣率
/**
 * 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 分類陣列
 */
function getAllCategories(products) {
  // 請實作此函式
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
}

/**
 * 格式化日期
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 格式 'YYYY/MM/DD HH:mm'，例如 '2024/01/01 08:00'
 */
function formatDate(timestamp) {
  // 請實作此函式
  // 提示：dayjs.unix...
  return dayjs.unix(timestamp).format('YYYY/MM/DD HH:mm');
}

/**
 * 計算距今天數
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - 例如 '3 天前'
 */
function getDaysAgo(timestamp) {
  // 請實作此函式
  // 提示：
  // 1. 用 dayjs() 取得今天
  // 2. 用 dayjs.unix(timestamp) 取得日期
  // 3. 用 .diff() 計算天數差異
  const today = dayjs();
  const date = dayjs.unix(timestamp);
  const daysAgo = today.diff(date, 'day');
  return daysAgo === 0 ? '今天' : `${daysAgo} 天前`;
}

/**
 * 驗證訂單使用者資料
 * @param {Object} data - 使用者資料
 * @returns {Object} - { isValid: boolean, errors: string[] }
 * 
 * 驗證規則：
 * - name: 不可為空
 * - tel: 必須是 09 開頭的 10 位數字
 * - email: 必須包含 @ 符號
 * - address: 不可為空
 * - payment: 必須是 'ATM', 'Credit Card', 'Apple Pay' 其中之一
 */
function validateOrderUser(data) {
  // 請實作此函式
  const errors = [];
  const payment = ['ATM', 'Credit Card', 'Apple Pay']
  if (!data.name) {
    errors.push('姓名不可為空');
  }
  if (!/^09\d{8}$/.test(data.tel)) {
    errors.push('電話格式必須是 09 開頭的 10 位數字');
  }
  if (!data.email.includes('@')) {
    errors.push('電子郵件必須包含 @ 符號');
  }
  if (!data.address) {
    errors.push('地址不可為空');
  }
  if (!payment.includes(data.payment)) {
    errors.push('付款方式必須是 \'ATM\', \'Credit Card\', \'Apple Pay\' 其中之一');
  }
  return {
    isValid: errors.length === 0,
    errors
  };

}

/**
 * 驗證購物車數量
 * @param {number} quantity - 數量
 * @returns {Object} - { isValid: boolean, error?: string }
 * 
 * 驗證規則：
 * - 必須是正整數
 * - 不可小於 1
 * - 不可大於 99
 */
function validateCartQuantity(quantity) {
  // 請實作此函式
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return {
      isValid: false,
      error: '數量必須是 1 到 99 的正整數'
    };
  }
  return {
    isValid: true,
    error: ''
  };
}

/**
 * 格式化金額
 * @param {number} amount - 金額
 * @returns {string} - 格式化後的金額
 * 
 * 格式化規則：
 * - 加上 "NT$ " 前綴
 * - 數字需要千分位逗號分隔（例如：1000 → 1,000）
 * - 使用台灣格式（zh-TW）
 * 
 * 範例：
 * formatCurrency(1000) → "NT$ 1,000"
 * formatCurrency(1234567) → "NT$ 1,234,567"
 * 
 */
function formatCurrency(amount) {
  // 請實作此函式
  return `NT$ ${amount.toLocaleString("zh-TW")}`;
}

module.exports = {
  getDiscountRate,
  getAllCategories,
  formatDate,
  getDaysAgo,
  validateOrderUser,
  validateCartQuantity,
  formatCurrency
};
