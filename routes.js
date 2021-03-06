const Router  = require("express");

//Articles
const ListArticlesController = require("./controllers/articles/ListArticlesController");
const DeleteArticleController = require("./controllers/articles/DeleteArticleController");
const UpdateArticleController = require("./controllers/articles/UpdateArticleController");

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
const ShareProtocolController = require("./controllers/protocols/ShareProtocolController");
const ReadSharedProtocolController = require("./controllers/protocols/ReadSharedProtocolController");
const DeleteShareProcotolController = require("./controllers/protocols/DeleteShareProcotolController");

//Others
const AuthController = require("./controllers/AuthController");
const {confirmAuthenticated} = require("./middleware/confirmAuthenticated");

const router = Router();

router.post('/auth', new AuthController().handle);
router.post('/user',  new CreateUserController().handle);
router.get('/user/:id',  confirmAuthenticated,  new ReadUserController().handle);
router.put('/user', confirmAuthenticated, new UpdateUserController().handle);
router.delete('/user/:id', confirmAuthenticated, new DeleteUserController().handle);
router.delete('/article/:id', confirmAuthenticated, new DeleteArticleController().handle);
router.put('/article/:id', confirmAuthenticated, new UpdateArticleController().handle);
router.post('/protocol', confirmAuthenticated, new CreateProtocolController().handle);
router.post('/protocol/share', confirmAuthenticated, new ShareProtocolController().handle);
router.get('/protocol/share/:id', confirmAuthenticated, new ReadSharedProtocolController().handle);
router.delete('/protocol/share/:id', confirmAuthenticated, new DeleteShareProcotolController().handle);
router.get('/protocol', confirmAuthenticated, new ListProtocolController().handle);
router.get('/protocol/:id', confirmAuthenticated, new ReadProtocolController().handle);
router.put('/protocol/:id', confirmAuthenticated, new UpdateProtocolController().handle);
router.delete('/protocol/:id', confirmAuthenticated, new DeleteProtocolController().handle);
router.post('/search', confirmAuthenticated, new ListArticlesController().handle);
router.get('/users', confirmAuthenticated, new ListUsersController().handle);

module.exports = {router};