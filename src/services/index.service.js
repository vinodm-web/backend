const connection = require('../configs/database');
const responseHandler = require('../helpers/responseHandler');
const responseStatus = require('../helpers/constant');

class IndexService {

   get() {
      console.log('getService');
      return new Promise(function (resolve) {
         try {
            let sql = `SELECT * FROM users`;
            connection.query(sql, (error, results) => {
               if (error) { resolve(responseHandler.error(responseStatus.databaseError, error)) }

               (results && results.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', results)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
         } catch (error) {
            console.log('getService : error ', error);
            resolve(responseHandler.error(error))
         }
      })
   }

   getById(id) {
      console.log('getByIdService');
      return new Promise(function (resolve) {
         try {
            let sql = `SELECT * FROM users WHERE id ='` + id + `'`;
            connection.query(sql, (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (results && results.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', results)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
         } catch (error) {
            console.log('getByIdService : error ', error);
            resolve(responseHandler.error(error))
         }
      })
   }

   create(data) {
      console.log('createService');
      return new Promise(function (resolve) {
         try {
            const newData = {
               name: data.name
            }
            let sql = `INSERT INTO users(name) VALUES(?)`;
            connection.query(sql, [newData.name], (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               results && results.insertId !== 0 ? resolve(responseHandler.success(responseStatus.success, 'Data created successfully', { id: results.insertId, ...newData })) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
         } catch (error) {
            console.log('createService : error ', error);
            resolve(responseHandler.error(error))
         }
      })
   }

   update(id, data) {
      console.log('updateService');
      return new Promise(function (resolve) {
         try {
            let sql = `UPDATE users SET name = ? WHERE id = ?`;
            connection.query(sql, [data.name, id], (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (results && results.affectedRows === 1) ? resolve(responseHandler.success(responseStatus.success, 'Data updated successfully', results.affectedRows)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
         } catch (error) {
            console.log('updateService : error ', error);
            resolve(responseHandler.error(error))
         }
      })
   }

   delete(id) {
      console.log('deleteService');
      return new Promise(function (resolve) {
         try {
            let sql = `DELETE FROM users WHERE id = ?`;
            connection.query(sql, [id], (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (results && results.affectedRows === 1) ? resolve(responseHandler.success(responseStatus.success, 'Data deleted successfully', results.affectedRows)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
         } catch (error) {
            console.log('deleteService : error ', error);
            resolve(responseHandler.error(error))
         }
      })
   }
}

module.exports = IndexService
