const db = require("../db/connectToDB");

const SelectAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM product ", (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const SelectProductDashboardData = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      select
       product_sold.purchase_date,product_sold.id,
       product_sold.country ,
        product.product_name ,
         product.price
          from product_sold
      inner join product
       on product_sold.product_id = product.product_id 
      where purchase_date between '${startDate}' and '${endDate}'
        
        `,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("RESULT : ", result);
        return resolve(result);
      }
    );
  });
};

const SelectAllProductsImages = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM product_images", (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

module.exports = {
  SelectAllProductsImages,
  SelectAllProducts,
  SelectProductDashboardData,
};
