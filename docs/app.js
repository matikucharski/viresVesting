var require = meteorInstall({"imports":{"ui":{"body.html":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// imports/ui/body.html                                                                                  //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
module.link("./template.body.js", { "*": "*+" });

///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.body.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// imports/ui/template.body.js                                                                           //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //

Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    class: "container"
  }, "\n        ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("address"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "padded"
    }, "\n            ", HTML.TEXTAREA({
      name: "seed",
      id: "seed",
      cols: "30",
      rows: "10",
      "data-role": "seed"
    }), "\n        "), HTML.Raw('\n        <div class="padded">\n            <a href="#" class="button2 login" data-action="login">Login</a>\n        </div>\n        ') ];
  }, function() {
    return [ "\n            ", HTML.DIV({
      class: "padded"
    }, "\n            ", Blaze.If(function() {
      return Spacebars.call(view.lookup("runningCounter"));
    }, function() {
      return HTML.Raw('\n                <div class="green"></div>\n            ');
    }, function() {
      return HTML.Raw('\n                <div class="yellow"></div>\n            ');
    }), "\n            "), "\n        " ];
  }), "\n        ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("runningCounter"));
  }, function() {
    return HTML.Raw('\n        <div class="padded">\n            <a href="#" class="button2" data-action="start-counter">Observe block height</a>\n        </div>\n        ');
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("runningCounter"));
  }, function() {
    return HTML.Raw('\n        <div class="padded">\n            <a href="#" class="button2" data-action="stop-counter">Stop observing block height</a>\n        </div>\n        ');
  }), "\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("address"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "padded"
    }, "\n            Address: ", Blaze.View("lookup:address", function() {
      return Spacebars.mustache(view.lookup("address"));
    }), "\n        "), "\n        " ];
  }), "\n    ", HTML.DIV({
    class: "padded"
  }, "\n        Current height: ", Blaze.View("lookup:currentHeight", function() {
    return Spacebars.mustache(view.lookup("currentHeight"));
  }), "\n    "), "\n    ", HTML.DIV({
    class: "padded"
  }, "\n        Next vesting in: ~", Blaze.View("lookup:vestingInBlocks", function() {
    return Spacebars.mustache(view.lookup("vestingInBlocks"));
  }), " min\n    "), "\n    ", HTML.DIV({
    class: "padded"
  }, "\n        Estimated date: ", Blaze.View("lookup:vestingInDate", function() {
    return Spacebars.mustache(view.lookup("vestingInDate"));
  }), "\n    "), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("tx"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "padded"
    }, "\n            Transaction id: ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("txUrl"));
      },
      target: "_blank"
    }, Blaze.View("lookup:tx", function() {
      return Spacebars.mustache(view.lookup("tx"));
    })), "\n        "), "\n    " ];
  }), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("tx2"));
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "padded"
    }, "\n            Transaction id: ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("tx2Url"));
      },
      target: "_blank"
    }, Blaze.View("lookup:tx2", function() {
      return Spacebars.mustache(view.lookup("tx2"));
    })), "\n        "), "\n    " ];
  }), HTML.Raw('\n\n        <small class="padded version">\n            v0.13a\n        </small>\n<!--        <div class="padded">-->\n<!--            <a href="#" class="button2 danger" data-action="run-script">Do not touch me</a>-->\n<!--        </div>-->\n    '));
}));
Meteor.startup(Template.body.renderToDocument);

///////////////////////////////////////////////////////////////////////////////////////////////////////////

},"body.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// imports/ui/body.js                                                                                    //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
var _slicedToArray;
module.link("@babel/runtime/helpers/slicedToArray", {
  default: function (v) {
    _slicedToArray = v;
  }
}, 0);
var _regeneratorRuntime;
module.link("@babel/runtime/regenerator", {
  default: function (v) {
    _regeneratorRuntime = v;
  }
}, 1);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var Template;
module.link("meteor/templating", {
  Template: function (v) {
    Template = v;
  }
}, 1);
var Signer;
module.link("@waves/signer", {
  Signer: function (v) {
    Signer = v;
  }
}, 2);
var ProviderSeed;
module.link("@waves/provider-seed", {
  ProviderSeed: function (v) {
    ProviderSeed = v;
  }
}, 3);
module.link("./body.html");
function calculateTimeout(tmpl) {
  var height, minutesLeft, timeout;
  return _regeneratorRuntime.async(function () {
    function calculateTimeout$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _regeneratorRuntime.awrap(getHeight());
          case 2:
            height = _context.sent;
            tmpl.currentHeight.set(height);
            tmpl.intervalCounter.set(Date.now()); //it triggers tracker.autorun rerun
            minutesLeft = 1440 - height % 1440;
            timeout = minutesLeft < 2 ? 5 * 1000 : minutesLeft < 10 ? 20 * 1000 : minutesLeft < 60 ? 60 * 1000 : minutesLeft < 1000 ? 5 * 60 * 1000 : 10 * 60 * 1000;
            return _context.abrupt("return", {
              timeout: timeout,
              minutesLeft: minutesLeft
            });
          case 8:
          case "end":
            return _context.stop();
        }
      }
    }
    return calculateTimeout$;
  }(), null, null, null, Promise);
}
function runCallback(tmpl, calculateTimeout) {
  var _await$calculateTimeo, timeout, minutesLeft;
  return _regeneratorRuntime.async(function () {
    function runCallback$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regeneratorRuntime.awrap(calculateTimeout(tmpl));
          case 2:
            _await$calculateTimeo = _context2.sent;
            timeout = _await$calculateTimeo.timeout;
            minutesLeft = _await$calculateTimeo.minutesLeft;
            // const {address, publicKey} = await tmpl.signer.login();
            // const balances = await tmpl.signer.getBalance();
            console.log('%c timeout: ', 'background: #222; color: #dabacc', timeout, new Date());
            Meteor.setTimeout(function () {
              runCallback(tmpl, calculateTimeout);
            }, timeout);
          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }
    return runCallback$;
  }(), null, null, null, Promise);
}
var invokeScriptOptions = {
  dApp: '3PQL8GcwJYxECX99eRVYYPvixMwHPcxsGsw',
  call: {
    "function": 'withdrawVestedAllUSDN',
    args: []
  },
  fee: 0.1881 * Math.pow(10, 8)
};
var tataInvokeScriptOptions = {
  dApp: '3P2aJo7YfFPJXZqEyt8djXpKZVW8gVfUcg5',
  call: {
    "function": 'withdrawVestedAllUSDN',
    args: []
  },
  fee: 0.1891 * Math.pow(10, 8)
};
function checkIfSendVestingRequest(tmpl, height) {
  var minutesLeft, _await$Promise$all, _await$Promise$all2, tx, tx2;
  return _regeneratorRuntime.async(function () {
    function checkIfSendVestingRequest$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            minutesLeft = 1440 - height % 1440;
            if (!(minutesLeft >= 1439 && height !== 0)) {
              _context3.next = 14;
              break;
            }
            // removed !tmpl.alreadySent to allow next day vesting
            console.log('%c RUN: ', 'background: #222; color: #bada55', 'checkIfSendVestingRequest');
            tmpl.alreadySent = true;
            _context3.next = 6;
            return _regeneratorRuntime.awrap(Promise.all([tmpl.signer.invoke(invokeScriptOptions).broadcast(), tmpl.signer.invoke(tataInvokeScriptOptions).broadcast()]));
          case 6:
            _await$Promise$all = _context3.sent;
            _await$Promise$all2 = _slicedToArray(_await$Promise$all, 2);
            tx = _await$Promise$all2[0];
            tx2 = _await$Promise$all2[1];
            console.log('%c MATIdebug: ', 'background: #222; color: #bada55', tx);
            console.log('%c MATIdebug: ', 'background: #222; color: #bada55', tx2);
            tmpl.tx.set(tx[0].id);
            tmpl.tx2.set(tx2[0].id);
            // const tx = await tmpl.signer
            //     .invoke(invokeScriptOptions)
            //     .broadcast();
            // const tx2 = await tmpl.signer
            //     .invoke(tataInvokeScriptOptions)
            //     .broadcast();
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }
    return checkIfSendVestingRequest$;
  }(), null, null, null, Promise);
}
function getHeight() {
  var requestOptions;
  return _regeneratorRuntime.async(function () {
    function getHeight$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };
            _context4.next = 3;
            return _regeneratorRuntime.awrap(fetch("https://nodes.wavesnodes.com/activation/status", requestOptions).then(function (response) {
              return response.json();
            }).then(function (response) {
              return response.height;
            }));
          case 3:
            return _context4.abrupt("return", _context4.sent);
          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }
    return getHeight$;
  }(), null, null, null, Promise);
}
Template.body.onCreated(function () {
  function bodyOnCreated() {
    var _this = this;
    this.address = new ReactiveVar(null);
    this.currentHeight = new ReactiveVar(null);
    this.tx = new ReactiveVar(null);
    this.tx2 = new ReactiveVar(null);
    this.intervalCounter = new ReactiveVar(0);
    this.alreadySent = false;
    this.signer = new Signer();
    this.intervalId = 0;
    this.counterStarted = false;
    this.autorun(function () {
      function _callee(c) {
        var height;
        return _regeneratorRuntime.async(function () {
          function _callee$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  height = _this.currentHeight.get() || 0;
                  _context5.next = 3;
                  return _regeneratorRuntime.awrap(checkIfSendVestingRequest(_this, height));
                case 3:
                case "end":
                  return _context5.stop();
              }
            }
          }
          return _callee$;
        }(), null, null, null, Promise);
      }
      return _callee;
    }());
    runCallback(this, calculateTimeout);
  }
  return bodyOnCreated;
}());
Template.body.helpers({
  address: function () {
    var tmpl = Template.instance();
    return tmpl.address.get();
  },
  currentHeight: function () {
    var tmpl = Template.instance();
    return tmpl.currentHeight.get();
  },
  vestingInBlocks: function () {
    var tmpl = Template.instance();
    var height = tmpl.currentHeight.get() || 0;
    if (!height) {
      return null;
    }
    return 1440 - height % 1440;
  },
  vestingInDate: function () {
    var tmpl = Template.instance();
    var height = tmpl.currentHeight.get() || 0;
    if (!height) {
      return null;
    }
    var minutes = 1440 - height % 1440;
    return new Date(Date.now() + minutes * 60000).toLocaleTimeString();
  },
  tx: function () {
    var tmpl = Template.instance();
    return tmpl.tx.get();
  },
  txUrl: function () {
    var tmpl = Template.instance();
    return "https://wavesexplorer.com/transactions/" + tmpl.tx.get();
  },
  tx2: function () {
    var tmpl = Template.instance();
    return tmpl.tx2.get();
  },
  tx2Url: function () {
    var tmpl = Template.instance();
    return "https://wavesexplorer.com/transactions/" + tmpl.tx2.get();
  },
  runningCounter: function () {
    var tmpl = Template.instance();
    return tmpl.intervalCounter.get();
  }
});
Template.body.events({
  'click [data-action=login]': function () {
    function _callee2(e, tmpl) {
      var seed, _await$tmpl$signer$lo, address, publicKey, balances;
      return _regeneratorRuntime.async(function () {
        function _callee2$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                e.preventDefault();
                seed = tmpl.find('#seed').value.trim();
                tmpl.signer.setProvider(new ProviderSeed(seed));
                _context6.next = 5;
                return _regeneratorRuntime.awrap(tmpl.signer.login());
              case 5:
                _await$tmpl$signer$lo = _context6.sent;
                address = _await$tmpl$signer$lo.address;
                publicKey = _await$tmpl$signer$lo.publicKey;
                tmpl.address.set(address);
                _context6.next = 11;
                return _regeneratorRuntime.awrap(tmpl.signer.getBalance());
              case 11:
                balances = _context6.sent;
                console.log('%c MATIdebug: ', 'background: #222; color: #bada55', balances);
              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }
        return _callee2$;
      }(), null, null, null, Promise);
    }
    return _callee2;
  }(),
  'click [data-action=start-counter]': function () {
    function _callee4(e, tmpl) {
      return _regeneratorRuntime.async(function () {
        function _callee4$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                e.preventDefault();
                if (!tmpl.counterStarted) {
                  _context8.next = 3;
                  break;
                }
                return _context8.abrupt("return", false);
              case 3:
                tmpl.counterStarted = true;
                console.log('%c MATIdebug: ', 'background: #222; color: #bada55', 'hehe');
                // const height = await getHeight();
                // tmpl.currentHeight.set(height);
                // tmpl.intervalCounter.set(Date.now()); //it triggers tracker.autorun rerun

                // await runCallback(tmpl)
                tmpl.intervalId = Meteor.setInterval(function () {
                  function _callee3() {
                    var height;
                    return _regeneratorRuntime.async(function () {
                      function _callee3$(_context7) {
                        while (1) {
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return _regeneratorRuntime.awrap(getHeight());
                            case 2:
                              height = _context7.sent;
                              tmpl.currentHeight.set(height);
                              tmpl.intervalCounter.set(Date.now()); //it triggers tracker.autorun rerun
                              console.log('%c MATIdebug: ', 'background: #222; color: #bada55', 'bum');
                            case 6:
                            case "end":
                              return _context7.stop();
                          }
                        }
                      }
                      return _callee3$;
                    }(), null, null, null, Promise);
                  }
                  return _callee3;
                }(), 5 * 1000);
              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }
        return _callee4$;
      }(), null, null, null, Promise);
    }
    return _callee4;
  }(),
  'click [data-action=stop-counter]': function (e, tmpl) {
    e.preventDefault();
    Meteor.clearInterval(tmpl.intervalId);
    tmpl.counterStarted = false;
    tmpl.intervalCounter.set(0);
  },
  'click [data-action="run-script"]': function () {
    function _callee5(e, tmpl) {
      var tx;
      return _regeneratorRuntime.async(function () {
        function _callee5$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                e.preventDefault();
                console.log('%c MATIdebug: ', 'background: #222; color: #bada55', 'invoking script :)');
                _context9.next = 4;
                return _regeneratorRuntime.awrap(tmpl.signer.invoke({
                  dApp: '3PQL8GcwJYxECX99eRVYYPvixMwHPcxsGsw',
                  call: {
                    "function": 'withdrawVestedAllUSDN',
                    args: []
                  },
                  fee: 0.191 * Math.pow(10, 8)
                }).broadcast());
              case 4:
                tx = _context9.sent;
                console.log('%c MATIdebug: ', 'background: #222; color: #bada55', tx);
              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }
        return _callee5$;
      }(), null, null, null, Promise);
    }
    return _callee5;
  }()
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"client":{"main.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// client/main.js                                                                                        //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
module.link("../imports/ui/body.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".mjs",
    ".ts",
    ".css"
  ]
});

var exports = require("/client/main.js");