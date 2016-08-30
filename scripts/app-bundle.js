define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'App';
      config.map([{ route: ['', 'dashboard'], name: 'dashboard', moduleId: './routes/dashboard', title: 'Dashboard' }, { route: 'login', name: 'login', moduleId: './routes/login', title: 'Login' }]);

      this.router = router;
    };

    return App;
  }();
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    apiUrl: 'http://localhost:1337'
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('api/AppHttpClient',['exports', 'aurelia-framework', 'aurelia-http-client', '../environment'], function (exports, _aureliaFramework, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppHttpClient = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AppHttpClient = exports.AppHttpClient = function (_HttpClient) {
    _inherits(AppHttpClient, _HttpClient);

    function AppHttpClient() {
      _classCallCheck(this, AppHttpClient);

      var _this = _possibleConstructorReturn(this, _HttpClient.call(this));

      _this.configure(function (config) {
        config.withBaseUrl(_environment2.default.apiUrl).withCredentials();
      });
      return _this;
    }

    return AppHttpClient;
  }(_aureliaHttpClient.HttpClient);
});
define('api/Auth',['exports', 'aurelia-framework', './AppHttpClient'], function (exports, _aureliaFramework, _AppHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Auth = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Auth = exports.Auth = (_dec = (0, _aureliaFramework.inject)(_AppHttpClient.AppHttpClient), _dec(_class = function () {
    function Auth(client) {
      _classCallCheck(this, Auth);

      this.client = client;
    }

    Auth.prototype.isLoggedIn = function isLoggedIn() {
      return this.client.get('/auth');
    };

    Auth.prototype.login = function login(email, password) {
      return this.client.post('/login', { email: email, password: password });
    };

    return Auth;
  }()) || _class);
});
define('api/PlaylistApi',['exports', 'aurelia-framework', './AppHttpClient'], function (exports, _aureliaFramework, _AppHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PlaylistApi = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PlaylistApi = exports.PlaylistApi = (_dec = (0, _aureliaFramework.inject)(_AppHttpClient.AppHttpClient), _dec(_class = function () {
    function PlaylistApi(client) {
      _classCallCheck(this, PlaylistApi);

      this.client = client;
      this.resource = '/playlist';
    }

    PlaylistApi.prototype.getAll = function getAll() {
      return this.client.get(this.url).then(function (response) {
        return console.log(response);
      }).catch(function (err) {
        return console.log(err);
      });
    };

    PlaylistApi.prototype.create = function create(newPlaylist) {
      return this.client.post(this.url, newPlaylist).then(function (response) {
        return console.log(response);
      }).catch(function (err) {
        return console.log(err);
      });
    };

    PlaylistApi.prototype.getSongs = function getSongs(id) {
      return this.client.get(this.url + '/' + id + '/songs').then(function (res) {
        return console.log(res);
      }).catch(function (err) {
        return console.log(err);
      });
    };

    return PlaylistApi;
  }()) || _class);
});
define('api/SongApi',['exports', 'aurelia-framework', './AppHttpClient'], function (exports, _aureliaFramework, _AppHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SongApi = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SongApi = exports.SongApi = (_dec = (0, _aureliaFramework.inject)(_AppHttpClient.AppHttpClient), _dec(_class = function () {
    function SongApi(client) {
      _classCallCheck(this, SongApi);

      this.client = client;
      this.resource = '/song';
    }

    SongApi.prototype.getAll = function getAll() {
      return this.client.get(this.url).then(function (response) {
        return console.log(response);
      }).catch(function (err) {
        return console.log(err);
      });
    };

    SongApi.prototype.create = function create(newPlaylist) {
      return this.client.post(this.url, newPlaylist).then(function (response) {
        return console.log(response);
      }).catch(function (err) {
        return console.log(err);
      });
    };

    SongApi.prototype.getPlaylists = function getPlaylists(id) {
      return this.client.get(this.url + '/' + id + '/playlists').then(function (res) {
        return console.log(res);
      }).catch(function (err) {
        return console.log(err);
      });
    };

    return SongApi;
  }()) || _class);
});
define('base/BaseModel',['exports', 'aurelia-framework', '../api/AppHttpClient'], function (exports, _aureliaFramework, _AppHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BaseModel = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var BaseModel = exports.BaseModel = (_dec = (0, _aureliaFramework.inject)(_AppHttpClient.AppHttpClient), _dec(_class = function () {
    function BaseModel(client) {
      _classCallCheck(this, BaseModel);

      this.path = '';

      this.client = client;
    }

    BaseModel.prototype.save = function save() {
      var _this = this;

      var method = this.model.id ? 'put' : 'post';
      var path = this.model.id ? this.path + '/' + this.model.id : this.path;
      return this.client[method](path, this.model).then(function (res) {
        return _this;
      });
    };

    BaseModel.prototype.destroy = function destroy() {
      if (!this.model.id) {
        return Promise.reject('Trying to destroy model with no id');
      }
      return this.client.delete(this.path + '/' + this.model.id);
    };

    return BaseModel;
  }()) || _class);
});
define('model/Playlist',['exports', '../base/BaseModel', 'aurelia-http-client', '../environment'], function (exports, _BaseModel2, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Playlist = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Playlist = exports.Playlist = function (_BaseModel) {
    _inherits(Playlist, _BaseModel);

    function Playlist() {
      var _temp, _this, _ret;

      _classCallCheck(this, Playlist);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseModel.call.apply(_BaseModel, [this].concat(args))), _this), _this.path = '/playlist', _temp), _possibleConstructorReturn(_this, _ret);
    }

    Playlist.getAll = function getAll() {
      var client = new _aureliaHttpClient.HttpClient();
      client.configure(function (config) {
        config.withBaseUrl(_environment2.default.apiUrl);
      });
      return client.get('/playlist').then(function (res) {
        return res.content.map(function (model) {
          return new Playlist(model);
        });
      });
    };

    return Playlist;
  }(_BaseModel2.BaseModel);
});
define('model/Song',['exports', '../base/BaseModel', 'aurelia-http-client', '../environment'], function (exports, _BaseModel2, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Song = undefined;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Song = exports.Song = function (_BaseModel) {
    _inherits(Song, _BaseModel);

    function Song() {
      var _temp, _this, _ret;

      _classCallCheck(this, Song);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseModel.call.apply(_BaseModel, [this].concat(args))), _this), _this.path = '/song', _temp), _possibleConstructorReturn(_this, _ret);
    }

    Song.getAll = function getAll() {
      var client = new _aureliaHttpClient.HttpClient();
      client.configure(function (config) {
        config.withBaseUrl(_environment2.default.apiUrl);
      });
      return client.get('/song').then(function (res) {
        return res.map(function (model) {
          return new Song(model);
        });
      });
    };

    return Song;
  }(_BaseModel2.BaseModel);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('routes/dashboard',['exports', 'aurelia-router', 'aurelia-framework', './../api/Auth'], function (exports, _aureliaRouter, _aureliaFramework, _Auth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dashboard = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Dashboard = exports.Dashboard = (_dec = (0, _aureliaFramework.inject)(_Auth.Auth), _dec(_class = function Dashboard(auth) {
    _classCallCheck(this, Dashboard);

    this.auth = auth;
  }) || _class);
});
define('routes/login',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Login = exports.Login = function Login() {
    _classCallCheck(this, Login);
  };
});
define('resources/elements/login-form',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoginForm = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var LoginForm = exports.LoginForm = (_class = function () {
    function LoginForm() {
      _classCallCheck(this, LoginForm);

      _initDefineProp(this, 'value', _descriptor, this);
    }

    LoginForm.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

    return LoginForm;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/elements/login-view',['exports', 'aurelia-framework', 'aurelia-router', '../../api/Auth'], function (exports, _aureliaFramework, _aureliaRouter, _Auth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoginView = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var LoginView = exports.LoginView = (_dec = (0, _aureliaFramework.inject)(_Auth.Auth, _aureliaRouter.Router), _dec(_class = function () {
    function LoginView(auth, router) {
      _classCallCheck(this, LoginView);

      this.error = '';

      this.auth = auth;
      this.router = router;
    }

    LoginView.prototype.login = function login() {
      var _this = this;

      this.error = '';
      this.auth.login(this.email, this.password).then(function (user) {
        _this.user = user;
        console.log(user);
        _this.auth.currentUser = _this.user;
        _this.router.navigate('dashboard');
      }).catch(function (error) {
        console.log(error);
        _this.error = 'Error';
      });
    };

    return LoginView;
  }()) || _class);
});
define('resources/elements/navbar',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Navbar = exports.Navbar = function Navbar() {
    _classCallCheck(this, Navbar);
  };
});
define('resources/elements/playlists',['exports', 'aurelia-framework', '../../model/Playlist', '../../api/Auth'], function (exports, _aureliaFramework, _Playlist, _Auth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Playlists = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var Playlists = exports.Playlists = (_dec = (0, _aureliaFramework.inject)(_Playlist.Playlist, _Auth.Auth), _dec(_class = (_class2 = function () {
    function Playlists(playlist, auth) {
      _classCallCheck(this, Playlists);

      this.playlists = [];

      _initDefineProp(this, 'newPlaylist', _descriptor, this);

      _initDefineProp(this, 'playlist', _descriptor2, this);

      _initDefineProp(this, 'objPlaylist', _descriptor3, this);

      this.playlist = playlist;
      this.auth = auth;
      this.user = this.auth.currentUser;
      this.loadPlaylists();
    }

    Playlists.prototype.loadPlaylists = function loadPlaylists() {
      var _this = this;

      _Playlist.Playlist.getAll().then(function (playlists) {
        _this.playlists = playlists;
        console.log(_this.playlists);
      });
    };

    return Playlists;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'newPlaylist', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return '';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'playlist', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'objPlaylist', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return {};
    }
  })), _class2)) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./style.css\"></require>\n  <require from=\"./resources/elements/navbar\"></require>\n\n  <navbar></navbar>\n  <div class=\"row\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!style.css', ['module'], function(module) { module.exports = "@import url('../node_modules/bootstrap/dist/css/bootstrap.css');\n\nbody{\n    background-color: darkgrey;\n    padding:100px;\n}\ninput{\n    margin-top: 7px;\n    margin-bottom: 7px;\n}\n\ndiv.playlists{\n    background-color: lightgray;\n    text-align:center;\n    margin-left: 15px;\n    margin-top: 10px;\n    height: 200px;\n}\n\ndiv.sidebar{\n    height:100%;\n    bottom:0;\n}\n"; });
define('text!routes/dashboard.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../resources/elements/playlists\"></require>\n  <playlists></playlists>\n</template>"; });
define('text!routes/login.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../resources/elements/login-view\"></require>\n  <login-view></login-view>\n</template>"; });
define('text!resources/elements/login-form.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${value}</h1>\n</template>"; });
define('text!resources/elements/login-view.html', ['module'], function(module) { module.exports = "<template>\n  <div>${error}</div>\n  <div align=\"center\">\n    <div>\n      <h3>Please Sign In</h3>\n      <form submit.trigger=\"login()\">\n        <div class=\"input-group\">\n          <input type=\"text\" value.bind=\"email\" placeholder=\"Email\">\n        </div>\n        <div class=\"input-group\">\n          <input type=\"password\" value.bind=\"password\" placeholder=\"Password\">\n        </div>\n        <button class=\"btn btn-default-right\" type=\"submit\">Sign In</button>\n      </form>\n    </div>\n  </div>\n</template>"; });
define('text!resources/elements/navbar.html', ['module'], function(module) { module.exports = "<template>\n  <nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container-fluid\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">Website</a>\n      </div>\n      <ul class=\"nav navbar-nav\">\n        <li><a>All Songs</a></li>\n        <li><a href=\"#/dashboard\">Playlists</a></li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#/login\">Login</a></li>\n      </ul>\n      </div>\n    </div>\n  </nav>\n</template>"; });
define('text!resources/elements/playlists.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-2 playlists\">\n    <h4>Create Playlist</h4>\n    <input type=\"text\" value.bind=\"newPlaylist\" placeholder=\"New\">\n    <button click.trigger=\"addPlaylist(newPlaylist)\">Create</button>\n  </div>\n  <div if.bind=\"newPlaylist\" class=\"col-md-2 playlists\">\n    <h4>${newPlaylist}</h4>\n  </div>\n  <div repeat.for=\"item of playlists\" class=\"col-md-2 playlists\">\n    <h4>${item.model.name}</h4>\n  </div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map