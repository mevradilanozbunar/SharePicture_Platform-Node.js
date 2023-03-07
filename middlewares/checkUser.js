import JsonWebToken from 'jsonwebtoken';
import User from '../models/userModel.js';

const checkUser = async (req, res, next) => {
    const token = req.cookies.JsonWebToken;
  
    if (token) {
      JsonWebToken.verify(token, process.env.JWT_PRIVATE_KEY, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null;
          next();
        } else {
          const user = await User.findById(decodedToken.userId);
          res.locals.user = user;
          //JWT decodedToken nesnesine ayrıştırılır ve kullanıcının kimliği (decodedToken.userId) kullanılarak veritabanından kullanıcı bilgileri (user) getirilir. Kullanıcı bilgileri res.locals.user değişkenine atanır ve bir sonraki middleware'e veya route handler'ına geçilir.
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  export default checkUser;

  //res.locals özelliği, app.locals özelliğine benzer, ancak app.locals tüm uygulama yaşam döngüsü boyunca ortak olan verileri depolamak için kullanılırken, res.locals her HTTP isteği için ayrılan bir nesne olduğu için, her HTTP isteği için özelleştirilmiş verileri depolamak için kullanılır.