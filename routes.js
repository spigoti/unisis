const Router  = require("express");

//Articles
const {ListArticlesController} = require("./controllers/ListArticles");
const CreateArticleController = require("./controllers/articles/CreateArticleController");
const DeleteArticleController = require("./controllers/articles/DeleteArticleController");

//User
const ListUsersController = require("./controllers/ListUsers");
const CreateUserController = require("./controllers/users/CreateUserController");
const UpdateUserController = require("./controllers/users/UpdateUserController");
const DeleteUserController = require("./controllers/users/DeleteUserController");
const ReadUserController = require("./controllers/users/ReadUserController");

//Protocol
const CreateProtocolController = require("./controllers/protocols/CreateProtocolController");

//Others
const AuthController = require("./controllers/AuthController");
const {confirmAuthenticated} = require("./middleware/confirmAuthenticated");

const router = Router();

router.post('/auth', new AuthController().handle);
router.post('/user',  new CreateUserController().handle);
router.get('/user/:id',  new ReadUserController().handle);
router.put('/user',  new UpdateUserController().handle);
router.delete('/user/:id',  new DeleteUserController().handle);
router.post('/article',  new CreateArticleController().handle);
router.delete('/article/:id',  new DeleteArticleController().handle);
router.post('/protocol', new CreateProtocolController().handle);
router.post('/search', confirmAuthenticated, new ListArticlesController().handle);
router.get('/users', new ListUsersController().handle);


module.exports = {router};