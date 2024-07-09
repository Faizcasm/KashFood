"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAccountDetails = exports.register = exports.mailer = exports.logout = exports.login = exports.getUser = exports.forgotpassword = exports.changePassword = void 0;
var _usermodel = require("../models/usermodel/usermodel.js");
var _cloudinary = require("../middlewares/cloudinary.js");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var generateTokens = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(userId) {
    var user, accessToken;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _usermodel.User.findById(userId);
        case 3:
          user = _context.sent;
          accessToken = user.generateAccessToken();
          user.accessToken = accessToken;
          _context.next = 8;
          return user.save({
            validateBeforeSave: false
          });
        case 8:
          return _context.abrupt("return", {
            accessToken: accessToken
          });
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log("Something went wrong generatinmg tokens");
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function generateTokens(_x) {
    return _ref.apply(this, arguments);
  };
}();
var register = exports.register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$files, _req$files2;
    var _req$body, username, email, password, user, avatarfilepath, profile, cretedUser;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          if (!(!username || !email)) {
            _context2.next = 4;
            break;
          }
          console.log("All fields required");
          return _context2.abrupt("return", res.status(301));
        case 4:
          if (password) {
            _context2.next = 7;
            break;
          }
          console.log("Password is required");
          return _context2.abrupt("return", res.status(301));
        case 7:
          _context2.next = 9;
          return _usermodel.User.findOne({
            email: email
          });
        case 9:
          user = _context2.sent;
          if (!user) {
            _context2.next = 13;
            break;
          }
          console.log("User already exists");
          return _context2.abrupt("return", res.status(301));
        case 13:
          console.log(username, password, email);
          console.log((_req$files = req.files) === null || _req$files === void 0 ? void 0 : _req$files.profile);
          avatarfilepath = (_req$files2 = req.files) === null || _req$files2 === void 0 || (_req$files2 = _req$files2.profile[0]) === null || _req$files2 === void 0 ? void 0 : _req$files2.path;
          console.log(avatarfilepath);
          if (avatarfilepath) {
            _context2.next = 20;
            break;
          }
          console.log("path missing");
          return _context2.abrupt("return", res.status(301));
        case 20:
          _context2.next = 22;
          return (0, _cloudinary.uploadOnCloudinary)(avatarfilepath);
        case 22:
          profile = _context2.sent;
          if (profile) {
            _context2.next = 26;
            break;
          }
          console.log("Avatar required");
          return _context2.abrupt("return", res.status(301));
        case 26:
          _context2.next = 28;
          return _usermodel.User.create({
            email: email,
            username: username,
            password: password,
            profile: profile.url
          });
        case 28:
          cretedUser = _context2.sent;
          if (cretedUser) {
            _context2.next = 34;
            break;
          }
          console.log("register failed");
          return _context2.abrupt("return", res.status(301));
        case 34:
          console.log("Register success");
          return _context2.abrupt("return", res.status(200).json(cretedUser));
        case 36:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function register(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

//login

var login = exports.login = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, email, password, user, isPASSok, _yield$generateTokens, accessToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (email) {
            _context3.next = 4;
            break;
          }
          console.log("All fields required");
          return _context3.abrupt("return", res.status(301));
        case 4:
          if (password) {
            _context3.next = 7;
            break;
          }
          console.log("Password is required");
          return _context3.abrupt("return", res.status(301));
        case 7:
          _context3.next = 9;
          return _usermodel.User.findOne({
            email: email
          });
        case 9:
          user = _context3.sent;
          console.log(user);
          if (user) {
            _context3.next = 14;
            break;
          }
          console.log("User not exists");
          return _context3.abrupt("return", res.status(401).json({
            message: "User does not exits"
          }));
        case 14:
          _context3.next = 16;
          return user.isPasswordCorrected(password);
        case 16:
          isPASSok = _context3.sent;
          if (isPASSok) {
            _context3.next = 29;
            break;
          }
          _context3.prev = 18;
          console.log("Password did not match :", isPASSok);
          return _context3.abrupt("return", res.status(401).json({
            message: "Invalid Password"
          }));
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](18);
          console.log("Ispasswordcorrected have issues", _context3.t0);
          return _context3.abrupt("return", res.status(401).json({
            message: "Issues"
          }));
        case 27:
          _context3.next = 35;
          break;
        case 29:
          _context3.next = 31;
          return generateTokens(user._id);
        case 31:
          _yield$generateTokens = _context3.sent;
          accessToken = _yield$generateTokens.accessToken;
          console.log("login success");
          return _context3.abrupt("return", res.status(200).cookie('accessToken', accessToken, {
            secure: true,
            httpOnly: true
          }).json({
            user: user,
            accessToken: accessToken
          }));
        case 35:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[18, 23]]);
  }));
  return function login(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var logout = exports.logout = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$cookies, _req$user;
    var token, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          token = req === null || req === void 0 || (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.accessToken;
          console.log(token);
          _context4.next = 4;
          return _usermodel.User.findById(req === null || req === void 0 || (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.id);
        case 4:
          user = _context4.sent;
          console.log(user);
          return _context4.abrupt("return", res.status(200).clearCookie('accessToken', {
            secure: true,
            httpOnly: true
          }).json({
            message: "Logout success",
            user: user
          }));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function logout(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return req.user;
        case 2:
          user = _context5.sent;
          console.log(user);
          return _context5.abrupt("return", res.status(200).json(user));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getUser(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
var changePassword = exports.changePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$user2;
    var _req$body3, oldPassword, newPassword, user, isPasswordCorrect;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword;
          _context6.next = 3;
          return _usermodel.User.findById((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2._id);
        case 3:
          user = _context6.sent;
          _context6.next = 6;
          return user.isPasswordCorrected(oldPassword);
        case 6:
          isPasswordCorrect = _context6.sent;
          if (isPasswordCorrect) {
            _context6.next = 10;
            break;
          }
          console.log("invalid old password");
          return _context6.abrupt("return", res.status(301));
        case 10:
          user.password = newPassword;
          _context6.next = 13;
          return user.save({
            validateBeforeSave: false
          });
        case 13:
          return _context6.abrupt("return", res.status(200).json((200, {}, "Password changed successfully")));
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function changePassword(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var updateAccountDetails = exports.updateAccountDetails = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$user3;
    var _req$body4, newusername, newemail, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body4 = req.body, newusername = _req$body4.newusername, newemail = _req$body4.newemail;
          if (!(!newusername || !newemail)) {
            _context7.next = 4;
            break;
          }
          console.log("All fielda are required");
          return _context7.abrupt("return", res.status(301));
        case 4:
          _context7.next = 6;
          return _usermodel.User.findByIdAndUpdate((_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3._id, {
            $set: {
              username: newusername,
              email: newemail
            }
          }, {
            "new": true
          }).select("-password");
        case 6:
          user = _context7.sent;
          return _context7.abrupt("return", res.status(200).json((200, user, "Account details updated successfully")));
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function updateAccountDetails(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

//nodemailer
var mailer = exports.mailer = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body5, from, subject, message, to, transport, mailoptions;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body5 = req.body, from = _req$body5.from, subject = _req$body5.subject, message = _req$body5.message;
          to = "ebomber156@gmail.com";
          transport = _nodemailer["default"].createTransport({
            service: 'gmail',
            auth: {
              user: "clownm18@gmail.com",
              pass: "qqpx zpwx ogfv smtr"
            }
          });
          mailoptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
          };
          transport.sendMail(mailoptions, function (err, info) {
            if (err) {
              console.log("Something went wrong", err);
              return res.status(401);
            }
            console.log("Mail sended  :", info);
            return res.status(200).json(info);
          });
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function mailer(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var forgotpassword = exports.forgotpassword = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var email, user, transporter, mailOptions;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          email = req.body.email;
          _context9.prev = 1;
          _context9.next = 4;
          return _usermodel.User.findOne({
            email: email
          });
        case 4:
          user = _context9.sent;
          if (user) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          transporter = _nodemailer["default"].createTransport({
            service: 'Gmail',
            auth: {
              user: "clownm18@gmail.com",
              pass: "qqpx zpwx ogfv smtr"
            }
          });
          mailOptions = {
            from: 'clownm18@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n\n                    Please click on the following link, or paste this into your browser to complete the process:\n\n\n                    http://localhost:5173/\n\n\n                    Your password is ".concat(user.password, "\n                    If you did not request this, please ignore this email and your password will remain unchanged.\n")
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.error('Error sending email:', err);
              return res.status(500).json({
                message: 'Error sending email'
              });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({
              message: 'Email sent successfully'
            });
          });
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](1);
          console.error('Error:', _context9.t0);
          res.status(500).json({
            message: 'Internal server error'
          });
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 12]]);
  }));
  return function forgotpassword(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();