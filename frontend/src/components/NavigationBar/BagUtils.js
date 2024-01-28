import axios from 'axios';

export const fetchBagItems = async () => {
  try {
    const res = await axios.get('http://localhost:8800/bag-items');
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const calculateTotalQuantity = (bagItems) => {
  return bagItems.reduce((total, item) => total + item.quantity, 0);
};
