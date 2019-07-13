webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/aframe.js":
/*!*************************!*\
  !*** ./pages/aframe.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _comp_MyLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../comp/MyLayout */ "./comp/MyLayout.js");
/* harmony import */ var aframe_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! aframe-react */ "./node_modules/aframe-react/dist/index.js");
/* harmony import */ var aframe_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(aframe_react__WEBPACK_IMPORTED_MODULE_8__);










var _default =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(_default, _React$Component);

  function _default(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _default);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(_default).call(this, props));
    _this.state = {
      appRendered: false,
      color: 'red',
      modal: false,
      selectAmb: '',
      // variables del Modal y de la info del docente y aula 
      activeTab: '1' // Variable del navTab en la info del aula

    };
    _this.toggle = _this.toggle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    _this.tab_toggle = _this.tab_toggle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this));
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(_default, [{
    key: "toggle",
    value: function toggle(e) {
      this.setState(function (prevState) {
        return {
          modal: !prevState.modal,
          selectAmb: event.target.text || event.target.id
        };
      });
    }
  }, {
    key: "tab_toggle",
    value: function tab_toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== 'undefined') {
        __webpack_require__(/*! aframe */ "./node_modules/aframe/dist/aframe-master.js");

        __webpack_require__(/*! aframe-particle-system-component */ "./node_modules/aframe-particle-system-component/index.js");

        this.setState({
          appRendered: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_comp_MyLayout__WEBPACK_IMPORTED_MODULE_7__["HdModal"], {
        state: this.state,
        toggle: this.toggle,
        tab_toggle: this.tab_toggle
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        href: "#",
        onClick: this.toggle
      }, "Aula 101"), this.state.appRendered && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a-scene", {
        embedded: true,
        style: {
          display: 'block'
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a-assets", null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a-asset-item", {
        id: "tree-obj",
        src: "/static/obj-3D/PRUEBA.obj"
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a-asset-item", {
        id: "tree-mtl",
        src: "/static/obj-3D/PRUEBA.mtl"
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a-sky", {
        color: "#ECECEC"
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(aframe_react__WEBPACK_IMPORTED_MODULE_8__["Entity"], {
        id: "Aula-111",
        geometry: {
          primitive: 'box',
          width: 90,
          height: 50
        },
        material: {
          color: 'blue',
          opacity: 0.7
        },
        position: {
          x: -520,
          y: 60,
          z: -390
        },
        events: {
          click: this.toggle
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(aframe_react__WEBPACK_IMPORTED_MODULE_8__["Entity"], {
        text: {
          value: 'Hello, A-Frame React!',
          width: 90,
          height: 40,
          align: 'center'
        },
        material: {
          color: 'red'
        }
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a-obj-model", {
        position: "-3500 -150 -1000",
        src: "#tree-obj",
        mtl: "#tree-mtl"
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(aframe_react__WEBPACK_IMPORTED_MODULE_8__["Entity"], {
        primitive: "a-camera",
        "wasd-controls": "acceleration: 7000"
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(aframe_react__WEBPACK_IMPORTED_MODULE_8__["Entity"], {
        primitive: "a-cursor",
        animation__click: {
          property: 'scale',
          startEvents: 'click',
          from: '0.1 0.1 0.1',
          to: '1 1 1',
          dur: 150
        }
      }))));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);



/***/ })

})
//# sourceMappingURL=index.js.c0218665ae547a0a5373.hot-update.js.map