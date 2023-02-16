module.exports = async (req, res, next) => {
  const itemsSold = req.body;

  if (itemsSold.some(({ productId }) => productId === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
      
  if (itemsSold.some(({ quantity }) => quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
    
  if (itemsSold.some(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }  
    return next();
};