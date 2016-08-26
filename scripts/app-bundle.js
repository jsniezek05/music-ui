define('app',['exports', './api/Auth', 'aurelia-framework', './model/Playlist'], function (exports, _Auth, _aureliaFramework, _Playlist) {
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

  var _dec, _class;

  _Playlist.Playlist.getAll().then(function (res) {
    console.log(res);
    var playlist = res[0];
    console.log(playlist.model.name);
    playlist.model.name = 'new name';
    playlist.save().then(function (res) {
      console.log(res);
    });
  });

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_Auth.Auth, _Playlist.Playlist), _dec(_class = function () {
    function App(auth) {
      _classCallCheck(this, App);

      this.playlist = [];

      this.auth = auth;
      this.auth.isLoggedIn().then(function (response) {
        console.log(response);
      });
      this.loadPlaylist();
    }

    App.prototype.loadPlaylist = function loadPlaylist() {
      var _this = this;

      _Playlist.Playlist.getAll().then(function (playlist) {
        _this.playlist = playlist;
        console.log(_this.playlist);
      });
    };

    App.prototype.login = function login() {
      var _this2 = this;

      this.auth.login(this.email, this.password).then(function (response) {
        _this2.firstName = response.content.firstName;
        _this2.lastName = response.content.lastName;
        _this2.fullName = _this2.firstName + ' ' + _this2.lastName;
      });
    };

    return App;
  }()) || _class);
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    apiEndpoint: '192.168.0.119:1337'
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
define('api/Auth',['exports', 'aurelia-http-client', '../environment'], function (exports, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Auth = undefined;

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

  var Auth = exports.Auth = function () {
    function Auth() {
      _classCallCheck(this, Auth);

      this.client = new _aureliaHttpClient.HttpClient();
      this.client.configure(function (config) {
        config.withBaseUrl(_environment2.default.apiEndpoint);
      });
    }

    Auth.prototype.isLoggedIn = function isLoggedIn() {
      return this.client.get('/auth');
    };

    Auth.prototype.login = function login(email, password) {
      return this.client.post('/login', { email: email, password: password });
    };

    return Auth;
  }();
});
define('base/BaseModel',['exports', 'aurelia-http-client', '../environment'], function (exports, _aureliaHttpClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BaseModel = undefined;

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

  var BaseModel = exports.BaseModel = function () {
    function BaseModel(model) {
      _classCallCheck(this, BaseModel);

      this.path = '';

      this.client = new _aureliaHttpClient.HttpClient();
      this.client.configure(function (config) {
        config.withBaseUrl(_environment2.default.apiEndpoint);
      });
      this.model = model;
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
  }();
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
        config.withBaseUrl(_environment2.default.apiEndpoint);
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
        config.withBaseUrl(_environment2.default.apiEndpoint);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n    <input type=\"text\" value.bind=\"email\">\n    <input type=\"password\" value.bind=\"password\">\n    <button click.trigger=\"login()\">Submit</button>\n\n  <p if.bind=\"fullName\">${fullName} is logged in</p>\n  <ul>\n    <li repeat.for=\"item of playlist\">${item.model.name}</li>\n  </ul>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map