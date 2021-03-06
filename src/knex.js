let level = require('level');
const path = require('path');
const dbPath = path.join(__dirname, 'db');
var db = level(dbPath, {valueEncoding: 'json'});

// db open close func
const dbOpen = () => {
  db.open(() => {
    console.log('opened');
  });
}
const dbClose = () => {
  db.close(() => {
    console.log('closed');
  });
  
}

// company
const getCompanyDetails = () => {
  return new Promise((resolve, reject) => {
    db.get('company', function (err, value) {
      if (err) {
        if(err.notFound) {
          dbClose()
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          dbClose();
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
    
      dbClose();
      resolve(value);
    });
  });
}




const editCompanyDetails = (company) => {
  // edit companyDetails
  console.log(company);
  return new Promise((resolve, reject) => {
    dbOpen();
    db.put('company', company, function (err) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      dbClose();
      resolve({message: 'Updated Successfully', errType: '', errCode: 2000, company});
    });
  });
}

// consigner

const getAllConsigners = () => {
  // fetch all consigners
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('consigners', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      
      dbClose();
      resolve(value);
    });
  });
}

const getConsginerById = (id) => {
  // get single consigner
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('consigners', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      
      dbClose();
      let consignerDetails = value.filter((consigner) => {
        // console.log(consigner);
        if(consigner.id === id.toString()) {
          return consigner;
        }
      });
      if(consignerDetails) {
        resolve(consignerDetails);
      } else {
        reject({message: 'Sorry! No Data Exist', errType: 'noData', errCode: 4040})
      }
    });
  });
}

const addConsignerDb = (consigner) => {
  // add a consigner
  console.log(consigner);
  return new Promise((resolve, reject) => {
    dbOpen();
    db.put('consigners', consigner, function (err) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      dbClose();
      resolve({message: 'Added Successfully', errType: '', errCode: 2000, consigner});
    });
  });
}

const editConsigner = (id, consigner) => {
  // edit consigner
}

const deleteConsigner =  (id) => {
  // delete consigner
  console.log('delete id is ', id);
  return new Promise( (resolve, reject) => {
    dbOpen();
    db.get('consigners', function (err, value) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      console.log('filter', id);
      let updatedDb = value.filter((consigner) => {
        return consigner.id !== id.toString();
      });
      console.log('updated db is ', updatedDb);
      db.put('consigners', updatedDb, function (err) {
        if (err) {
          dbClose();
          reject(
            {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
          ); 
        }
        dbClose();
        resolve({message: 'Deleted Successfully', errType: '', errCode: 2000, updatedDb});
      });
    });
  });

}

// =================================
// consignee========================
// =================================

const getAllconsignees = () => {
  // fetch all consignees
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('consignees', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      
      dbClose();
      resolve(value);
    });
  });
}

const getConsgineeById = (id) => {
  // get single consignee
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('consignees', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      
      dbClose();
      let consigneeDetails = value.filter((consignee) => {
        console.log(consignee);
        // console.log(consignee);
        if(consignee.id === id.toString()) {
          return consignee;
        }
      });
      if(consigneeDetails) {
        resolve(consigneeDetails);
      } else {
        reject({message: 'Sorry! No Data Exist', errType: 'noData', errCode: 4040})
      }
    });
  });
}

const addConsigneeDb = (consignee) => {
  // add a consignee
  console.log(consignee);
  return new Promise((resolve, reject) => {
    dbOpen();
    db.put('consignees', consignee, function (err) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      dbClose();
      resolve({message: 'Added Successfully', errType: '', errCode: 2000, consignee});
    });
  });
}

const deleteconsignee = (id) => {
  // delete consignee
  console.log('delete id is ', id);
  return new Promise( (resolve, reject) => {
    dbOpen();
    db.get('consignees', function (err, value) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      console.log('filter', id);
      let updatedDb = value.filter((consignee) => {
        return consignee.id !== id.toString();
      });
      console.log('updated db is ', updatedDb);
      db.put('consignees', updatedDb, function (err) {
        if (err) {
          dbClose();
          reject(
            {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
          ); 
        }
        dbClose();
        resolve({message: 'Deleted Successfully', errType: '', errCode: 2000, updatedDb});
      });
    });
  });
}
// =================================
// Product========================
// =================================

const getAllProducts = () => {
  // fetch all Products
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('products', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      
      dbClose();
      resolve(value);
    });
  });
}

const getProductById = (id) => { 
  // get single Product
  return new Promise((resolve, reject) => {
    if(!id) {
      reject({message: 'Id Unavailable', errType: 'noid', errCode: 4000})
    } else {
      dbOpen();
      db.get('products', function (err, value) {
        if (err) {
          dbClose();
          if(err.notFound) {
            reject(
              {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
            );
          } else {
            return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
          }
        } 
        
        dbClose();
        let productDetails = value.filter((product) => {
          console.log(product);
          // console.log(Product);
          if(product.id === id.toString()) {
            return product;
          }
        });
        if(productDetails) {
          resolve(productDetails);
        } else {
          reject({message: 'Sorry! No Data Exist', errType: 'noData', errCode: 4040})
        }
      });
    }
  });
}

const addProductDb = (products) => {
  // add a Product
  console.log(products);
  return new Promise((resolve, reject) => {
    dbOpen();
    db.put('products', products, function (err) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      dbClose();
      resolve({message: 'Added Successfully', errType: '', errCode: 2000, products});
    });
  });
}

const deleteProduct = (id) => {
  // delete Product
  console.log('delete id is ', id);
  return new Promise( (resolve, reject) => {
    dbOpen();
    db.get('products', function (err, value) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      console.log('filter', id);
      let updatedDb = value.filter((product) => {
        return product.id !== id.toString();
      });
      console.log('updated db is ', updatedDb);
      db.put('products', updatedDb, function (err) {
        if (err) {
          dbClose();
          reject(
            {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
          ); 
        }
        dbClose();
        resolve({message: 'Deleted Successfully', errType: '', errCode: 2000, updatedDb});
      });
    });
  });
}

const editProductDetails = (newProduct) => {
  console.log('new product is ', newProduct);
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('products', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      console.log('before filter', value);
      // search product
      let productDetails = value.filter((product) => {
        // console.log(product);
        return product.id !== newProduct.id.toString();
      });
      productDetails.push(newProduct);
      console.log('added updated product', productDetails);
      db.put('products', productDetails, function (err) {
        if (err) {
          dbClose();
          reject(
            {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
          ); 
        }
        dbClose();
        resolve({message: 'Updated Successfully', errType: '', errCode: 2000,newProduct});
      });
    });
  });
}

// =================================
// Receipt==========================
// =================================

const getNextReceiptCount = () => {
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('receipt', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          return resolve(
            {message: 'Fetched', errType: '', errCode: 2000, count: 1}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      value.length++;
      dbClose();
      return resolve(
        {message: 'Fetched', errType: '', errCode: 2000, count: value.length}
      );
    });
  });
}

const addReceipt = (receipt) => {
  // add a receipt
  console.log(receipt);
  return new Promise((resolve, reject) => {
    dbOpen();
    db.put('receipt', receipt, function (err) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      dbClose();
      resolve({message: 'Added Successfully', errType: '', errCode: 2000, receipt});
    });
  });
}

const getAllReceipts = () => {
  return new Promise((resolve, reject) => {
    dbOpen();
    db.get('receipt', function (err, value) {
      if (err) {
        dbClose();
        if(err.notFound) {
          reject(
            {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
          );
        } else {
          return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
        }
      } 
      
      dbClose();
      resolve(value);
    });
  });
}

const getReceiptById = (id) => {
  return new Promise((resolve, reject) => {
    if(!id) {
      reject({message: 'Id Unavailable', errType: 'noid', errCode: 4000})
    } else {
      dbOpen();
      db.get('receipt', function (err, value) {
        if (err) {
          dbClose();
          if(err.notFound) {
            reject(
              {message: 'No Data Available. Add one to Continue', errType: 'nodb', errCode: 0001, error: err}
            );
          } else {
            return reject({message: 'Sorry! Something went wrong', errType: 'dbRelated', errCode: 0002, error: err});
          }
        } 
        
        dbClose();
        let productDetails = value.filter((product) => {
          console.log(product);
          // console.log(Product);
          if(product.id === id.toString()) {
            return product;
          }
        });
        if(productDetails) {
          resolve(productDetails);
        } else {
          reject({message: 'Sorry! No Data Exist', errType: 'noData', errCode: 4040})
        }
      });
    }
  });
}

const deleteReceipt = (id) => {
  console.log('delete id is ', id);
  return new Promise( (resolve, reject) => {
    dbOpen();
    db.get('receipt', function (err, value) {
      if (err) {
        dbClose();
        reject(
          {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
        ); 
      }
      console.log('filter', id);
      let updatedDb = value.filter((product) => {
        return product.id !== id.toString();
      });
      console.log('updated db is ', updatedDb);
      db.put('receipt', updatedDb, function (err) {
        if (err) {
          dbClose();
          reject(
            {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: err}
          ); 
        }
        dbClose();
        resolve({message: 'Deleted Successfully', errType: '', errCode: 2000, updatedDb});
      });
    });
  });
}

// delete batch data

const deleteReceipts = () => {
  console.log('delete all receipt triggered ');
  
  return new Promise( (resolve, reject) => {
    try {
      dbOpen();
      db.batch().del('receipt').write(() => {
        resolve('all receipt cleared');
      });
      dbClose();
    } catch(e) {
      dbClose();
      reject(
        {message: 'Failed To Perform Operation. Please Contact Developer', errType: 'insertionError', errCode: 5000, error: e}
      );
    }
  });
}

module.exports = {
  getCompanyDetails,
  editCompanyDetails,
  getAllConsigners,
  getConsginerById,
  addConsignerDb,
  editConsigner,
  deleteConsigner,
  getAllconsignees,
  getConsgineeById,
  addConsigneeDb,
  deleteconsignee,
  getAllProducts,
  addProductDb,
  deleteProduct,
  getProductById,
  editProductDetails,
  addReceipt,
  getNextReceiptCount,
  getAllReceipts,
  getReceiptById,
  deleteReceipt,
  deleteReceipts
}

