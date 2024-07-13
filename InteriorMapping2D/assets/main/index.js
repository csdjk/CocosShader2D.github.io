System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Canvas, UITransform, instantiate, Label, Color, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      Color = module.Color;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Color, CCInteger, Vec4, Texture2D, CCBoolean, Material, Layout, Prefab, Sprite, MeshRenderer, instantiate, Label, Button, EventHandler, Slider, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Color = module.Color;
      CCInteger = module.CCInteger;
      Vec4 = module.Vec4;
      Texture2D = module.Texture2D;
      CCBoolean = module.CCBoolean;
      Material = module.Material;
      Layout = module.Layout;
      Prefab = module.Prefab;
      Sprite = module.Sprite;
      MeshRenderer = module.MeshRenderer;
      instantiate = module.instantiate;
      Label = module.Label;
      Button = module.Button;
      EventHandler = module.EventHandler;
      Slider = module.Slider;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class4, _class5, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

      cclegacy._RF.push({}, "5eabfnjIwhFmqOHvHs0AvZ+", "EffectController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          disallowMultiple = _decorator.disallowMultiple;

      var PropertyType = /*#__PURE__*/function (PropertyType) {
        PropertyType[PropertyType["Color"] = 0] = "Color";
        PropertyType[PropertyType["Number"] = 1] = "Number";
        PropertyType[PropertyType["RangeNumber"] = 2] = "RangeNumber";
        PropertyType[PropertyType["Vector"] = 3] = "Vector";
        PropertyType[PropertyType["Texture"] = 4] = "Texture";
        return PropertyType;
      }(PropertyType || {});

      Enum(PropertyType);
      var MaterialProperty = (_dec = ccclass('MaterialProperty'), _dec2 = property(String), _dec3 = property({
        type: PropertyType
      }), _dec4 = property({
        type: [Color],
        visible: function visible() {
          return this.type == PropertyType.Color;
        }
      }), _dec5 = property({
        type: CCInteger,
        range: [1, 4, 1],
        visible: function visible() {
          return this.type == PropertyType.Vector;
        }
      }), _dec6 = property({
        type: Vec4,
        visible: function visible() {
          return this.type == PropertyType.Vector;
        }
      }), _dec7 = property({
        type: Texture2D,
        visible: function visible() {
          return this.type == PropertyType.Texture;
        }
      }), _dec8 = property({
        type: Number,
        visible: function visible() {
          return this.type == PropertyType.Number || this.type == PropertyType.RangeNumber;
        }
      }), _dec9 = property({
        type: Number,
        visible: function visible() {
          return this.type == PropertyType.RangeNumber || this.type == PropertyType.Vector;
        }
      }), _dec10 = property({
        type: Number,
        visible: function visible() {
          return this.type == PropertyType.RangeNumber || this.type == PropertyType.Vector;
        }
      }), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function MaterialProperty(parameters) {
          _initializerDefineProperty(this, "name", _descriptor, this);

          _initializerDefineProperty(this, "type", _descriptor2, this); //-----------Color----------


          _initializerDefineProperty(this, "colorValue", _descriptor3, this); //-----------Vector----------


          _initializerDefineProperty(this, "sliderCount", _descriptor4, this);

          _initializerDefineProperty(this, "vectorValue", _descriptor5, this); //-----------Texture----------


          _initializerDefineProperty(this, "textureValue", _descriptor6, this); //-----------Number----------


          _initializerDefineProperty(this, "numberValue", _descriptor7, this); //Range Number Min


          _initializerDefineProperty(this, "min", _descriptor8, this); //Range Number MAX


          _initializerDefineProperty(this, "max", _descriptor9, this);
        }

        var _proto = MaterialProperty.prototype;

        _proto.progressToValue = function progressToValue(progress) {
          return this.min + (this.max - this.min) * progress;
        };

        _proto.valueToProgress = function valueToProgress(value) {
          if (value !== undefined) {
            return (value - this.min) / (this.max - this.min);
          } else {
            return (this.numberValue - this.min) / (this.max - this.min);
          }
        };

        return MaterialProperty;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PropertyType.RangeNumber;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colorValue", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [Color.BLACK, Color.GREEN];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sliderCount", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "vectorValue", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec4();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "textureValue", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "numberValue", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "min", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class);
      var EffectController = exports('EffectController', (_dec11 = ccclass('EffectController'), _dec12 = disallowMultiple(true), _dec13 = property(CCBoolean), _dec14 = property({
        type: Material,
        visible: function visible() {
          return this.addMaterial;
        }
      }), _dec15 = property([MaterialProperty]), _dec16 = property(Layout), _dec17 = property(Prefab), _dec18 = property(Prefab), _dec11(_class4 = _dec12(_class4 = (_class5 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectController, _Component);

        function EffectController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "addMaterial", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "materialList", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "properties", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueItemContainer", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "colorPrefab", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rangeNumberPrefab", _descriptor15, _assertThisInitialized(_this));

          _this.material = void 0;
          _this.propertiesMap = new Map();
          return _this;
        }

        var _proto2 = EffectController.prototype; // onFocusInEditor(): void {
        //     this.clear();
        //     this.init();
        // }

        _proto2.onEnable = function onEnable() {
          this.clear();
          this.init();
        };

        _proto2.onDisable = function onDisable() {
          this.clear();
        };

        _proto2.init = function init() {
          var _this$node$getCompone,
              _this2 = this,
              _this$properties;

          if (this.valueItemContainer == null || this.properties.length == 0) {
            return;
          }

          this.material = (_this$node$getCompone = this.node.getComponent(Sprite)) == null ? void 0 : _this$node$getCompone.sharedMaterial;

          if (this.material == null) {
            var _this$node$getCompone2;

            this.material = (_this$node$getCompone2 = this.node.getComponent(MeshRenderer)) == null ? void 0 : _this$node$getCompone2.sharedMaterial;
          }

          if (this.material == null) {
            console.error('Material is null');
            return;
          }

          this.propertiesMap.clear();
          this.properties.forEach(function (prop) {
            _this2.propertiesMap.set(prop.name, prop);
          });
          (_this$properties = this.properties) == null ? void 0 : _this$properties.forEach(function (prop, index) {
            _this2.createValueItem(prop);
          });
        };

        _proto2.clear = function clear() {
          var _this$valueItemContai, _this$valueItemContai2;

          (_this$valueItemContai = this.valueItemContainer) == null ? void 0 : _this$valueItemContai.node.destroyAllChildren();
          (_this$valueItemContai2 = this.valueItemContainer) == null ? void 0 : _this$valueItemContai2.node.removeAllChildren();
          this.propertiesMap.clear();
        };

        _proto2.setMaterialProperty = function setMaterialProperty(propName, value) {
          var _this$material;

          (_this$material = this.material) == null ? void 0 : _this$material.setProperty(propName, value);
          this.materialList.forEach(function (material) {
            material == null ? void 0 : material.setProperty(propName, value);
          });
        };

        _proto2.createValueItem = function createValueItem(prop) {
          switch (prop.type) {
            case PropertyType.Color:
              // 初始化颜色类型的值
              this.initColor(prop);
              break;

            case PropertyType.Number:
              break;

            case PropertyType.RangeNumber:
              this.initSlider(prop);
              break;

            case PropertyType.Vector:
              // 初始化向量类型的值
              this.initVectorSlider(prop);
              break;

            case PropertyType.Texture:
              // 初始化纹理类型的值
              break;

            default:
              console.error("Unknown property type: " + prop.type);
              break;
          }
        };

        _proto2.initColor = function initColor(prop) {
          var _this3 = this;

          if (!this.colorPrefab) {
            console.error('numberPrefab is null');
            return;
          }

          var item = instantiate(this.colorPrefab);
          this.valueItemContainer.node.addChild(item);
          item.active = true;
          var labels = item.getComponentsInChildren(Label);
          labels[0].string = prop.name; // this.material.setProperty(prop.name, prop.colorValue[0]);

          this.setMaterialProperty(prop.name, prop.colorValue[0]);
          var colorLayout = item.getComponentInChildren(Layout);
          var itemNode = item.children[0];
          itemNode.active = false;
          prop.colorValue.forEach(function (color, index) {
            var colorNode = instantiate(itemNode);
            colorNode.active = true;
            colorNode.parent = colorLayout.node;
            var sprite = colorNode.getComponent(Sprite);
            sprite.color = color;
            var colorBtn = colorNode.getComponent(Button);
            colorBtn.transition = Button.Transition.NONE;
            var checkEventHandler = new EventHandler();
            checkEventHandler.target = _this3.node;
            checkEventHandler.component = 'EffectController';
            checkEventHandler.handler = 'onColorChangeValue';
            checkEventHandler.customEventData = prop.name;
            colorBtn.clickEvents.push(checkEventHandler);
          });
        };

        _proto2.onColorChangeValue = function onColorChangeValue(button, customEventData) {
          var prop = this.propertiesMap.get(customEventData);
          var color = button.target.getComponent(Sprite).color;
          prop.colorValue[0] = color; // this.material.setProperty(prop.name, color);

          this.setMaterialProperty(prop.name, color);
        };

        _proto2.initSlider = function initSlider(prop) {
          if (!this.rangeNumberPrefab) {
            console.error('numberPrefab is null');
            return;
          }

          var item = instantiate(this.rangeNumberPrefab);
          this.valueItemContainer.node.addChild(item);
          item.active = true;
          var labels = item.getComponentsInChildren(Label);
          labels[0].string = prop.name;
          labels[1].string = prop.numberValue.toFixed(2); // this.material.setProperty(prop.name, prop.numberValue);

          this.setMaterialProperty(prop.name, prop.numberValue);
          var slider = item.getComponent(Slider);
          slider.progress = prop.valueToProgress();
          var checkEventHandler = new EventHandler();
          checkEventHandler.target = this.node;
          checkEventHandler.component = 'EffectController';
          checkEventHandler.handler = 'onSliderChangeValue';
          checkEventHandler.customEventData = prop.name;
          slider == null ? void 0 : slider.slideEvents.push(checkEventHandler);
        };

        _proto2.onSliderChangeValue = function onSliderChangeValue(slider, customEventData) {
          var prop = this.propertiesMap.get(customEventData);
          var value = prop.progressToValue(slider.progress); // this.material.setProperty(prop.name, value);

          this.setMaterialProperty(prop.name, value);
          var labels = slider.getComponentsInChildren(Label);
          labels[1].string = value.toFixed(2);
        };

        _proto2.initVectorSlider = function initVectorSlider(prop) {
          var values = prop.vectorValue;
          var names = ['x', 'y', 'z', 'w'];

          for (var i = 0; i < prop.sliderCount; i++) {
            var valueName = names[i];
            var _value = values[valueName];
            var item = instantiate(this.rangeNumberPrefab);
            this.valueItemContainer.node.addChild(item);
            item.active = true;
            var labels = item.getComponentsInChildren(Label);
            labels[0].string = prop.name + "." + valueName;
            labels[1].string = _value.toFixed(2);
            var slider = item.getComponent(Slider);
            slider.progress = prop.valueToProgress(_value);
            var checkEventHandler = new EventHandler();
            checkEventHandler.target = this.node;
            checkEventHandler.component = 'EffectController';
            checkEventHandler.handler = 'onVectorSliderChangeValue';
            checkEventHandler.customEventData = prop.name + "." + valueName;
            slider == null ? void 0 : slider.slideEvents.push(checkEventHandler);
          } // this.material.setProperty(prop.name, values);


          this.setMaterialProperty(prop.name, values);
        };

        _proto2.onVectorSliderChangeValue = function onVectorSliderChangeValue(slider, customEventData) {
          var data = customEventData.split('.');
          var propName = data[0];
          var prop = this.propertiesMap.get(propName);
          var value = prop.progressToValue(slider.progress);
          var labels = slider.getComponentsInChildren(Label);
          labels[1].string = value.toFixed(2); // 获取分量名称

          var name = data[1]; // 修改 vectorValue 的对应分量

          var vectorValue = prop.vectorValue;
          vectorValue[name] = value; // 设置材质的对应属性
          // this.material.setProperty(propName, vectorValue);

          this.setMaterialProperty(prop.name, vectorValue);
        };

        return EffectController;
      }(Component), (_descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "addMaterial", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "materialList", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "properties", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class5.prototype, "valueItemContainer", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class5.prototype, "colorPrefab", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class5.prototype, "rangeNumberPrefab", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class5)) || _class4) || _class4));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/first-person-camera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec2, Vec3, Quat, KeyCode, input, Input, game, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec2 = module.Vec2;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      KeyCode = module.KeyCode;
      input = module.input;
      Input = module.Input;
      game = module.game;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "f578aPT39VG8q3mfpGiiDSg", "first-person-camera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var v2_1 = new Vec2();
      var v2_2 = new Vec2();
      var v3_1 = new Vec3();
      var qt_1 = new Quat();
      var KEYCODE = {
        W: 'W'.charCodeAt(0),
        S: 'S'.charCodeAt(0),
        A: 'A'.charCodeAt(0),
        D: 'D'.charCodeAt(0),
        Q: 'Q'.charCodeAt(0),
        E: 'E'.charCodeAt(0),
        SHIFT: KeyCode.SHIFT_LEFT
      };
      var FirstPersonCamera = exports('FirstPersonCamera', (_dec = property({
        slide: true,
        range: [0.05, 0.5, 0.01]
      }), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FirstPersonCamera, _Component);

        function FirstPersonCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "moveSpeed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "moveSpeedShiftScale", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "damp", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateSpeed", _descriptor4, _assertThisInitialized(_this));

          _this._euler = new Vec3();
          _this._velocity = new Vec3();
          _this._position = new Vec3();
          _this._speedScale = 1;
          return _this;
        }

        var _proto = FirstPersonCamera.prototype;

        _proto.onLoad = function onLoad() {
          input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          Vec3.copy(this._euler, this.node.eulerAngles);
          Vec3.copy(this._position, this.node.position);
        };

        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        };

        _proto.update = function update(dt) {
          var t = Math.min(dt / this.damp, 1); // position

          Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
          Vec3.lerp(v3_1, this.node.position, this._position, t);
          this.node.setPosition(v3_1); // rotation

          Quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
          Quat.slerp(qt_1, this.node.rotation, qt_1, t);
          this.node.setRotation(qt_1);
        };

        _proto.onMouseWheel = function onMouseWheel(e) {
          var delta = -e.getScrollY() * this.moveSpeed * 0.1; // delta is positive when scroll down

          Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this.node.position, v3_1, delta);
        };

        _proto.onKeyDown = function onKeyDown(e) {
          var v = this._velocity;

          if (e.keyCode === KEYCODE.SHIFT) {
            this._speedScale = this.moveSpeedShiftScale;
          } else if (e.keyCode === KEYCODE.W) {
            if (v.z === 0) {
              v.z = -1;
            }
          } else if (e.keyCode === KEYCODE.S) {
            if (v.z === 0) {
              v.z = 1;
            }
          } else if (e.keyCode === KEYCODE.A) {
            if (v.x === 0) {
              v.x = -1;
            }
          } else if (e.keyCode === KEYCODE.D) {
            if (v.x === 0) {
              v.x = 1;
            }
          } else if (e.keyCode === KEYCODE.Q) {
            if (v.y === 0) {
              v.y = -1;
            }
          } else if (e.keyCode === KEYCODE.E) {
            if (v.y === 0) {
              v.y = 1;
            }
          }
        };

        _proto.onKeyUp = function onKeyUp(e) {
          var v = this._velocity;

          if (e.keyCode === KEYCODE.SHIFT) {
            this._speedScale = 1;
          } else if (e.keyCode === KEYCODE.W) {
            if (v.z < 0) {
              v.z = 0;
            }
          } else if (e.keyCode === KEYCODE.S) {
            if (v.z > 0) {
              v.z = 0;
            }
          } else if (e.keyCode === KEYCODE.A) {
            if (v.x < 0) {
              v.x = 0;
            }
          } else if (e.keyCode === KEYCODE.D) {
            if (v.x > 0) {
              v.x = 0;
            }
          } else if (e.keyCode === KEYCODE.Q) {
            if (v.y < 0) {
              v.y = 0;
            }
          } else if (e.keyCode === KEYCODE.E) {
            if (v.y > 0) {
              v.y = 0;
            }
          }
        };

        _proto.onTouchStart = function onTouchStart(e) {
          console.log('onTouchStart');

          if (game.canvas.requestPointerLock) {
            game.canvas.requestPointerLock();
          }
        };

        _proto.onTouchMove = function onTouchMove(e) {
          console.log('onTouchMove');
          e.getStartLocation(v2_1);

          if (v2_1.x > game.canvas.width * 0.4) {
            // rotation
            e.getDelta(v2_2);
            this._euler.y -= v2_2.x * this.rotateSpeed * 0.1;
            this._euler.x += v2_2.y * this.rotateSpeed * 0.1;
          } else {
            // position
            e.getLocation(v2_2);
            Vec2.subtract(v2_2, v2_2, v2_1);
            this._velocity.x = v2_2.x * 0.01;
            this._velocity.z = -v2_2.y * 0.01;
          }
        };

        _proto.onTouchEnd = function onTouchEnd(e) {
          if (document.exitPointerLock) {
            document.exitPointerLock();
          }

          e.getStartLocation(v2_1);

          if (v2_1.x < game.canvas.width * 0.4) {
            // position
            this._velocity.x = 0;
            this._velocity.z = 0;
          }
        };

        return FirstPersonCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeedShiftScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damp", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './EffectController.ts', './first-person-camera.ts'], function () {
  return {
    setters: [null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});