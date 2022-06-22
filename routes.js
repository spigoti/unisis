const Router  = require("express");

//Articles
const ListArticlesController = require("./controllers/articles/ListArticlesController");
const CreateArticleController = require("./controllers/articles/CreateArticleController");
const DeleteArticleController = require("./controllers/articles/DeleteArticleController");

//User
const ListUsersController = require("./controllers/users/ListUserController");
const CreateUserController = require("./controllers/users/CreateUserController");
const UpdateUserController = require("./controllers/users/UpdateUserController");
const DeleteUserController = require("./controllers/users/DeleteUserController");
const ReadUserController = require("./controllers/users/ReadUserController");

//Protocol
const CreateProtocolController = require("./controllers/protocols/CreateProtocolController");
const ReadProtocolController = require("./controllers/protocols/ReadProtocolController");
const ListProtocolController = require("./controllers/protocols/ListProtocolsController");
const DeleteProtocolController = require("./controllers/protocols/DeleteProtocolController");
const UpdateProtocolController = require("./controllers/protocols/UpdateProtocolController");

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
router.get('/protocol', new ListProtocolController().handle);
router.get('/protocol/:id', new ReadProtocolController().handle);
router.put('/protocol/:id', new UpdateProtocolController().handle);
router.delete('/protocol/:id', new DeleteProtocolController().handle);
router.post('/search', confirmAuthenticated, new ListArticlesController().handle);
router.get('/users', new ListUsersController().handle);


module.exports = {router};