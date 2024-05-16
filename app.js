const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const ordersRoutes = require('./routes/order');

const sequelize = require('./utils/path').sequelize;
const User = require('./model/user');
const Product = require('./model/Product');
const Cart = require('./model/Cart');
const CartItem = require('./model/Cart-Item');
const Order = require('./model/Order');
const OrderItem = require('./model/Cart-Item');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let userId;

//as we have introduced the concepts of template engine so we have to tell the express js 
//that now we are sending the dynamic web pages instead of static html pages
//here we tell the express that we are using pug template engine


app.set('view engine', 'pug');

//here we tell the expres the path of the views folder where all the pug files are stored
app.set('views', 'views');
app.use((req, res, next) => {
    if (userId) {
        req.userId = userId.dataValues.id;
    }
    next();
});

app.use('/admin', adminRoute);

app.use(shopRoute);

app.use('/orders', ordersRoutes);


app.use('/', (req, res, next) => {
    res.render('404error');
});


User.hasMany(Product);
Product.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);



sequelize.sync({

})
    .then(result => {
        return User.findOrCreate({
            where: { email: 'test@test.com' },
            defaults: {
                name: 'Rizwan Shah',
                email: 'test@test.com'
            }
        });
    })
    .then(([user, created]) => {
        userId = user;
        app.listen(3000, () => {
            console.log('server is running on port 3000');
        });
    })
    .catch(err => console.log(err));




