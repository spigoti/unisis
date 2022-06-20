const Router  = require("express");
const ListArticlesController = require("./controllers/ListArticles");
const {CreateUserController} = require("./controllers/users/CreateUserController");
const {UpdateUserController} = require("./controllers/users/UpdateUserController");
const {DeleteUserController} = require("./controllers/users/DeleteUserController");
const {ReadUserController} = require("./controllers/users/ReadUserController");
const {CreateProtocolController} = require("./controllers/protocols/CreateProtocolController");
const ListUsersController = require("./controllers/ListUsers");
const {AuthController} = require("./controllers/AuthController");
const {confirmAuthenticated} = require("./middleware/confirmAuthenticated")
const {CreateArticleController} = require("./controllers/articles/CreateArticleController");


const router = Router()

router.post('/auth', new AuthController().handle);
router.post('/user',  new CreateUserController().handle);
router.put('/user',  new UpdateUserController().handle);
router.post('/article',  new CreateArticleController().handle);
router.post('/protocol', new CreateProtocolController().handle);
router.post('/search', confirmAuthenticated, new ListArticlesController().handle);
router.get('/users', new ListUsersController().handle);


module.exports = {router};