// module.exports.get = function(req, id, next) {
//     if (id) {
//         var sql = "SELECT * FROM person where firstname = ?";
//         runquery(req, sql, [id], next);
//     }
//     else {
//         var sql = "SELECT * FROM person";
//         runquery(req, sql, [id], next);
//     } };
// module.exports.post = function(req, next) {
//     var sql = 'insert into person set ?';
//     runquery(req, sql, req.body, next);
// };
//
//
// function runquery(req, sql, inputobj, next) {
//     req.app.get('connectPool').getConnection(function(error, connection) {
//         if (error) {
//             return console.error(error);
//         }
//         // Connection successfully established
//         connection.query(sql, inputobj, function(error, results) {
//             if (error) {
//                 return next(error, null);
//             }
//             connection.release();
//             return next(null, results);
//         })
//     }) }
