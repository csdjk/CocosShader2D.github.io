System.register("chunks:///_virtual/BlurPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Vec4, gfx, rendering;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "68e5f47EgdGZrWcMccDmGEL", "BlurPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var Blur = exports('Blur', (_dec = ccclass('Blur'), _dec2 = menu('PostProcessL/Blur'), _dec3 = property(Material), _dec4 = property({
        range: [0.0, 20.0],
        slide: true,
        step: 0.01
      }), _dec5 = property({
        type: Number,
        range: [1, 6],
        slide: true,
        step: 1
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(Blur, _postProcess$PostProc);

        function Blur() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "blurRadius", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "iteration", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Blur.prototype;

        _proto.changeBlurRadius = function changeBlurRadius(slider) {
          this.blurRadius = slider.progress * 20;
        };

        _proto.changeBlurIteration = function changeBlurIteration(value) {
          this.iteration = parseInt(value);
        };

        return Blur;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blurRadius", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "iteration", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      })), _class2)) || _class) || _class));
      var BlurPass = exports('BlurPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(BlurPass, _postProcess$SettingP);

        function BlurPass() {
          var _this2;

          _this2 = _postProcess$SettingP.call(this) || this;
          _this2.name = 'BlurPass';
          _this2.effectName = 'Shaders/Blur.effect';
          _this2.outputNames = ['BlurPassColor'];
          _this2.m_BlurMipUp = [];
          _this2.m_BlurMipDown = [];
          _this2.k_MaxPyramidSize = 16;
          _this2.params = new Vec4();

          for (var i = 0; i < _this2.k_MaxPyramidSize; i++) {
            _this2.m_BlurMipUp[i] = "BlurMip" + i;
            _this2.m_BlurMipDown[i] = "BlurMipDown" + i;
          }

          return _this2;
        }

        var _proto2 = BlurPass.prototype;

        _proto2.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto2.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport;
          var setting = this.setting;
          var blurMipDown = this.m_BlurMipDown;
          var blurMipUp = this.m_BlurMipUp;
          var shadingScale = 1 / 2; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          material == null ? void 0 : material.setProperty('blurRadius', setting.blurRadius);
          context.material = material; // down sampler pass

          var lastOutput = input0;

          for (var i = 0; i < this.setting.iteration; i++) {
            var mipDown = blurMipDown[i];
            shadingScale = shadingScale * 0.5;
            context.updatePassViewPort(shadingScale).addRenderPass('post-process', "blur-pass" + cameraID).setPassInput(lastOutput, 'inputTexture').addRasterView(mipDown, gfx.Format.RGBA8).blitScreen(0).version();
            lastOutput = mipDown;
          } // up sampler pass


          var lastUp = lastOutput;

          for (var _i = this.setting.iteration - 2; _i >= 0; _i--) {
            var mipUp = blurMipUp[_i];
            shadingScale = shadingScale * 2;
            context.updatePassViewPort(shadingScale).addRenderPass('post-process', "blur-pass" + cameraID).setPassInput(lastUp, 'inputTexture').addRasterView(mipUp, gfx.Format.RGBA8).blitScreen(0).version();
            lastUp = mipUp;
          } // combine pass


          context.updatePassViewPort().addRenderPass('post-process', "blur-final" + cameraID).setPassInput(lastUp, 'inputTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(1).version();
        };

        _createClass(BlurPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(Blur);
          }
        }]);

        return BlurPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new BlurPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ColorAdjustmentPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Color, gfx, rendering, Vec4;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Color = module.Color;
      gfx = module.gfx;
      rendering = module.rendering;
      Vec4 = module.Vec4;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "20ce2px78xOipKaLsthzWxI", "ColorAdjustmentPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var ColorAdjustment = exports('ColorAdjustment', (_dec = ccclass('ColorAdjustment'), _dec2 = menu('PostProcessL/ColorAdjustment'), _dec3 = property(Material), _dec4 = property(Color), _dec5 = property({
        range: [0.0, 5.0],
        slide: true,
        step: 0.01
      }), _dec6 = property({
        range: [0.0, 5.0],
        slide: true,
        step: 0.01
      }), _dec7 = property({
        range: [0.0, 5.0],
        slide: true,
        step: 0.01
      }), _dec8 = property(Boolean), _dec9 = property({
        range: [-180, 180],
        slide: true,
        step: 1,
        visible: function visible() {
          return this.useHue;
        }
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(ColorAdjustment, _postProcess$PostProc);

        function ColorAdjustment() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "color", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "brightness", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "saturation", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "contrast", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "useHue", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "hueDegree", _descriptor7, _assertThisInitialized(_this));

          return _this;
        }

        return ColorAdjustment;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(1, 1, 1, 1);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "brightness", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "saturation", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "contrast", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "useHue", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "hueDegree", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      })), _class2)) || _class) || _class));
      var ColorAdjustmentPass = exports('ColorAdjustmentPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(ColorAdjustmentPass, _postProcess$SettingP);

        function ColorAdjustmentPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'ColorAdjustmentPass';
          _this2.effectName = 'Shaders/ColorAdjustment.effect';
          _this2.params = new Vec4();
          _this2.params2 = new Vec4();
          return _this2;
        }

        var _proto = ColorAdjustmentPass.prototype;

        _proto.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0); // set setting value to material

          var setting = this.setting;
          this.params.x = setting.brightness;
          this.params.y = setting.saturation;
          this.params.z = setting.contrast;
          this.params.w = setting.useHue ? 1 : 0;
          material == null ? void 0 : material.setProperty('params', this.params);
          material == null ? void 0 : material.setProperty('color', setting.color);
          material == null ? void 0 : material.setProperty('hueDegree', setting.hueDegree);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(ColorAdjustmentPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(ColorAdjustment);
          }
        }]);

        return ColorAdjustmentPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new ColorAdjustmentPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

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
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
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

System.register("chunks:///_virtual/DepthOfFieldPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, gfx, Vec4, rendering;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      gfx = module.gfx;
      Vec4 = module.Vec4;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "7ed57D4MqxEDbYv9RMPUeVJ", "DepthOfFieldPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var DepthOfField = exports('DepthOfField', (_dec = ccclass('DepthOfField'), _dec2 = menu('PostProcessL/DepthOfField'), _dec3 = property(Material), _dec4 = property({
        range: [0, 20, 0.01],
        slide: true
      }), _dec5 = property({
        range: [0, 50, 0.01],
        slide: true
      }), _dec6 = property({
        range: [0.0, 20.0],
        slide: true,
        step: 0.01
      }), _dec7 = property({
        type: Number,
        range: [1, 6],
        slide: true,
        step: 1
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_PostProcessSetting) {
        _inheritsLoose(DepthOfField, _PostProcessSetting);

        function DepthOfField() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _PostProcessSetting.call.apply(_PostProcessSetting, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "focalDistance", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "range", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "blurRadius", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "iteration", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        return DepthOfField;
      }(PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "focalDistance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "range", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "blurRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "iteration", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      })), _class2)) || _class) || _class));
      var DepthOfFieldPass = exports('DepthOfFieldPass', /*#__PURE__*/function (_SettingPass) {
        _inheritsLoose(DepthOfFieldPass, _SettingPass);

        function DepthOfFieldPass() {
          var _this2;

          _this2 = _SettingPass.call(this) || this;
          _this2.name = 'DepthOfFieldPass';
          _this2.outputNames = ['DepthOfFieldPassColor'];
          _this2.m_BlurMipUp = [];
          _this2.m_BlurMipDown = [];
          _this2.k_MaxPyramidSize = 16;
          _this2.params = new Vec4();

          for (var i = 0; i < _this2.k_MaxPyramidSize; i++) {
            _this2.m_BlurMipUp[i] = "BlurMip" + i;
            _this2.m_BlurMipDown[i] = "BlurMipDown" + i;
          }

          return _this2;
        }

        var _proto = DepthOfFieldPass.prototype;

        _proto.checkEnable = function checkEnable(camera) {
          var setting = this.setting;
          return setting.material && _SettingPass.prototype.checkEnable.call(this, camera);
        };

        _proto.render = function render(camera, ppl) {
          var cameraID = this.getCameraUniqueID(camera);
          var context = this.context;
          context.clearBlack();
          var blurTex = this.blur(camera);
          var input0 = this.lastPass.slotName(camera, 0);
          var output = this.slotName(camera);
          var depth = context.depthSlotName;
          var setting = this.setting;
          this.params.x = setting.focalDistance;
          this.params.y = setting.range;
          setting.material.setProperty('params', this.params);
          context.material = setting.material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').setPassInput(depth, 'depthTexture').setPassInput(blurTex, 'screenBlurTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(1).version();
        };

        _proto.blur = function blur(camera) {
          var cameraID = this.getCameraUniqueID(camera);
          var context = this.context;
          var material = this.setting.material;
          var passViewport = context.passViewport;
          var setting = this.setting;
          var blurMipDown = this.m_BlurMipDown;
          var blurMipUp = this.m_BlurMipUp;
          var shadingScale = 1 / 2;
          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          material == null ? void 0 : material.setProperty('blurRadius', setting.blurRadius);
          context.material = material; // down sampler pass

          var lastOutput = input0;

          for (var i = 0; i < this.setting.iteration; i++) {
            var mipDown = blurMipDown[i];
            shadingScale = shadingScale * 0.5;
            context.updatePassViewPort(shadingScale).addRenderPass('post-process', "blur-pass" + cameraID).setPassInput(lastOutput, 'inputTexture').addRasterView(mipDown, gfx.Format.RGBA8).blitScreen(0).version();
            lastOutput = mipDown;
          } // up sampler pass


          var lastUp = lastOutput;

          for (var _i = this.setting.iteration - 2; _i >= 0; _i--) {
            var mipUp = blurMipUp[_i];
            shadingScale = shadingScale * 2;
            context.updatePassViewPort(shadingScale).addRenderPass('post-process', "blur-pass" + cameraID).setPassInput(lastUp, 'inputTexture').addRasterView(mipUp, gfx.Format.RGBA8).blitScreen(0).version();
            lastUp = mipUp;
          }

          return lastUp;
        };

        _createClass(DepthOfFieldPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(DepthOfField);
          }
        }]);

        return DepthOfFieldPass;
      }(SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new DepthOfFieldPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EdgeDetectionPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Color, Vec4, gfx, rendering;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Color = module.Color;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "c3431/D9mBPxpdwgOfFZtSy", "EdgeDetectionPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var EdgeDetection = exports('EdgeDetection', (_dec = ccclass('EdgeDetection'), _dec2 = menu('PostProcessL/EdgeDetection'), _dec3 = property(Material), _dec4 = property(Color), _dec5 = property({
        range: [0.01, 5.0],
        slide: true,
        step: 0.01
      }), _dec6 = property({
        range: [0.0, 1.0],
        slide: true,
        step: 0.01
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(EdgeDetection, _postProcess$PostProc);

        function EdgeDetection() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "edgeColor", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "edgeWidth", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "edgeLerp", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = EdgeDetection.prototype;

        _proto.changeEdgeWidth = function changeEdgeWidth(slider) {
          this.edgeWidth = slider.progress * 5;
        };

        return EdgeDetection;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "edgeColor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0.0, 1.0, 0.0, 1.0);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "edgeWidth", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "edgeLerp", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class) || _class));
      var EdgeDetectionPass = exports('EdgeDetectionPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(EdgeDetectionPass, _postProcess$SettingP);

        function EdgeDetectionPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'EdgeDetectionPass';
          _this2.effectName = 'Shaders/EdgeDetection.effect';
          _this2.outputNames = ['RadialBlurPassColor'];
          _this2.params = new Vec4();
          return _this2;
        }

        var _proto2 = EdgeDetectionPass.prototype; // Whether the pass should rendered

        _proto2.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto2.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0); // set setting value to material

          var setting = this.setting;
          this.params.x = setting.edgeWidth;
          this.params.y = setting.edgeColor.x;
          this.params.z = setting.edgeColor.y;
          this.params.w = setting.edgeColor.z;
          material == null ? void 0 : material.setProperty('params', this.params);
          material == null ? void 0 : material.setProperty("edgeLerp", setting.edgeLerp);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(EdgeDetectionPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(EdgeDetection);
          }
        }]);

        return EdgeDetectionPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new EdgeDetectionPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EditorAsset.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, assetManager;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b4efaAVZsxCQZatNM62OZ/9", "EditorAsset", undefined);
      /**
       * 编辑器内资源加载类
       */


      var EditorAsset = exports('default', /*#__PURE__*/function () {
        function EditorAsset() {}
        /**
         * 
         * @param path 
         * @returns 
         *  const effectAsset = await EditorAsset.loadResource<EffectAsset>('Shaders/RadialBlur.effect');
         */


        EditorAsset.loadResource = /*#__PURE__*/function () {
          var _loadResource = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(path) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (CC_EDITOR) {
                    _context2.next = 3;
                    break;
                  }

                  console.warn('[EditorAsset]', '该函数只在编辑器环境内有效！');
                  return _context2.abrupt("return");

                case 3:
                  return _context2.abrupt("return", new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
                    var uuid;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return Editor.Message.request("asset-db", "query-uuid", "db://assets/" + path);

                        case 3:
                          uuid = _context.sent;
                          assetManager.loadAny({
                            uuid: uuid
                          }, function (err, data) {
                            if (err) {
                              reject(err);
                            } else {
                              resolve(data);
                            }
                          });
                          _context.next = 10;
                          break;

                        case 7:
                          _context.prev = 7;
                          _context.t0 = _context["catch"](0);
                          reject(_context.t0);

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee, null, [[0, 7]]);
                  }))));

                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function loadResource(_x) {
            return _loadResource.apply(this, arguments);
          }

          return loadResource;
        }();

        return EditorAsset;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FirstPersonCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
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

      cclegacy._RF.push({}, "f578aPT39VG8q3mfpGiiDSg", "FirstPersonCamera", undefined);

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

System.register("chunks:///_virtual/GlitchArtPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Vec4, gfx, rendering;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "0fa6a96uQxKA5KsxyFJumgt", "GlitchArtPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var GlitchArt = exports('GlitchArt', (_dec = ccclass('GlitchArt'), _dec2 = menu('PostProcessL/GlitchArt'), _dec3 = property(Material), _dec4 = property({
        range: [0.01, 5.0],
        slide: true,
        step: 0.01
      }), _dec5 = property({
        range: [0.0, 1.0],
        slide: true,
        step: 0.01
      }), _dec6 = property({
        range: [-10.0, 10.0],
        slide: true,
        step: 0.01
      }), _dec7 = property({
        range: [0.0, 1.0],
        slide: true,
        step: 0.01
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(GlitchArt, _postProcess$PostProc);

        function GlitchArt() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scanLineJitter", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "colorDrift", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "verticalJump", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizontalShake", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        return GlitchArt;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scanLineJitter", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colorDrift", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "verticalJump", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "horizontalShake", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      })), _class2)) || _class) || _class));
      var GlitchArtPass = exports('GlitchArtPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(GlitchArtPass, _postProcess$SettingP);

        function GlitchArtPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'GlitchArtPass';
          _this2.effectName = 'Shaders/GlitchArt.effect';
          _this2.params = new Vec4();
          return _this2;
        }

        var _proto = GlitchArtPass.prototype;

        _proto.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0); // set setting value to material

          var setting = this.setting;
          this.params.x = setting.scanLineJitter;
          this.params.y = setting.colorDrift;
          this.params.z = setting.verticalJump;
          this.params.w = setting.horizontalShake;
          material == null ? void 0 : material.setProperty('params', this.params);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(GlitchArtPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(GlitchArt);
          }
        }]);

        return GlitchArtPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new GlitchArtPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './FirstPersonCamera.ts', './MaterialProperty.ts', './PostController.ts', './PostPropertyController.ts', './SwitchNode.ts', './EditorAsset.ts', './BlurPass.ts', './ColorAdjustmentPass.ts', './DepthOfFieldPass.ts', './EdgeDetectionPass.ts', './GlitchArtPass.ts', './PixelizeDiamondPass.ts', './PixelizeHexagonGridPass.ts', './PixelizeQuadPass.ts', './RadialBlurPass.ts', './VignettePass.ts', './Test.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MaterialProperty.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Enum, Color, CCInteger, Vec4, Texture2D;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Color = module.Color;
      CCInteger = module.CCInteger;
      Vec4 = module.Vec4;
      Texture2D = module.Texture2D;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "4f4eaPM87pJ4YrQvFjqFPjF", "MaterialProperty", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          disallowMultiple = _decorator.disallowMultiple;
      var PropertyType = exports('PropertyType', /*#__PURE__*/function (PropertyType) {
        PropertyType[PropertyType["Color"] = 0] = "Color";
        PropertyType[PropertyType["Float"] = 1] = "Float";
        PropertyType[PropertyType["Int"] = 2] = "Int";
        PropertyType[PropertyType["Vector"] = 3] = "Vector";
        PropertyType[PropertyType["Texture"] = 4] = "Texture";
        PropertyType[PropertyType["Bool"] = 5] = "Bool";
        return PropertyType;
      }({}));
      Enum(PropertyType);
      var MaterialProperty = exports('MaterialProperty', (_dec = ccclass('MaterialProperty'), _dec2 = property(String), _dec3 = property({
        type: PropertyType
      }), _dec4 = property({
        type: Boolean,
        visible: function visible() {
          return this.type == PropertyType.Bool;
        }
      }), _dec5 = property({
        type: [Color],
        visible: function visible() {
          return this.type == PropertyType.Color;
        }
      }), _dec6 = property({
        type: CCInteger,
        range: [1, 4, 1],
        visible: function visible() {
          return this.type == PropertyType.Vector;
        }
      }), _dec7 = property({
        type: Vec4,
        visible: function visible() {
          return this.type == PropertyType.Vector;
        }
      }), _dec8 = property({
        type: Texture2D,
        visible: function visible() {
          return this.type == PropertyType.Texture;
        }
      }), _dec9 = property({
        type: Number,
        visible: function visible() {
          return this.type == PropertyType.Int || this.type == PropertyType.Float;
        }
      }), _dec10 = property({
        type: Number,
        visible: function visible() {
          return this.type == PropertyType.Int || this.type == PropertyType.Float || this.type == PropertyType.Vector;
        }
      }), _dec11 = property({
        type: Number,
        visible: function visible() {
          return this.type == PropertyType.Int || this.type == PropertyType.Float || this.type == PropertyType.Vector;
        }
      }), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function MaterialProperty() {
          _initializerDefineProperty(this, "name", _descriptor, this);

          _initializerDefineProperty(this, "type", _descriptor2, this); //-----------Bool----------


          _initializerDefineProperty(this, "boolValue", _descriptor3, this); //-----------Color----------


          _initializerDefineProperty(this, "colorValue", _descriptor4, this); //-----------Vector----------


          _initializerDefineProperty(this, "sliderCount", _descriptor5, this);

          _initializerDefineProperty(this, "vectorValue", _descriptor6, this); //-----------Texture----------


          _initializerDefineProperty(this, "textureValue", _descriptor7, this); //-----------Number----------


          _initializerDefineProperty(this, "numberValue", _descriptor8, this); //Range Number Min


          _initializerDefineProperty(this, "min", _descriptor9, this); //Range Number MAX


          _initializerDefineProperty(this, "max", _descriptor10, this);
        }

        var _proto = MaterialProperty.prototype;

        _proto.progressToFloat = function progressToFloat(progress) {
          return this.min + (this.max - this.min) * progress;
        };

        _proto.progressToInt = function progressToInt(progress) {
          return Math.round(this.min + (this.max - this.min) * progress);
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
          return PropertyType.Float;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "boolValue", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "colorValue", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [Color.BLACK, Color.GREEN, Color.RED, Color.WHITE];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sliderCount", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "vectorValue", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec4();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "textureValue", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "numberValue", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "min", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "max", [_dec11], {
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

System.register("chunks:///_virtual/PixelizeDiamondPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Vec4, gfx, rendering;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "5c1eeGOiBtOyJu+WjR/poYi", "PixelizeDiamondPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var PixelizeDiamond = exports('PixelizeDiamond', (_dec = ccclass('PixelizeDiamond'), _dec2 = menu('PostProcessL/PixelizeDiamond'), _dec3 = property(Material), _dec4 = property({
        range: [0.01, 1.0],
        slide: true,
        step: 0.01
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(PixelizeDiamond, _postProcess$PostProc);

        function PixelizeDiamond() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pixelSize", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        return PixelizeDiamond;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pixelSize", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      })), _class2)) || _class) || _class));
      var PixelizeDiamondPass = exports('PixelizeDiamondPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(PixelizeDiamondPass, _postProcess$SettingP);

        function PixelizeDiamondPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'PixelizeDiamondPass';
          _this2.effectName = 'Shaders/PixelizeDiamond.effect';
          _this2.outputNames = ['PixelizeQuadPassColor'];
          return _this2;
        }

        var _proto = PixelizeDiamondPass.prototype; // Whether the pass should rendered

        _proto.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0);
          var depth = context.depthSlotName; // set setting value to material

          var setting = this.setting;
          material == null ? void 0 : material.setProperty('PixelSize', setting.pixelSize);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').setPassInput(depth, 'depthTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(PixelizeDiamondPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(PixelizeDiamond);
          }
        }]);

        return PixelizeDiamondPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new PixelizeDiamondPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PixelizeHexagonGridPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Vec4, gfx, rendering;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "7e5dbL/NqdPDIxIxjlwbclH", "PixelizeHexagonGridPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var PixelizeHexagonGrid = exports('PixelizeHexagonGrid', (_dec = ccclass('PixelizeHexagonGrid'), _dec2 = menu('PostProcessL/PixelizeHexagonGrid'), _dec3 = property(Material), _dec4 = property({
        range: [0.01, 1.0],
        slide: true,
        step: 0.01
      }), _dec5 = property({
        range: [0.01, 5.0],
        slide: true,
        step: 0.01
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(PixelizeHexagonGrid, _postProcess$PostProc);

        function PixelizeHexagonGrid() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pixelSize", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gridWidth", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        return PixelizeHexagonGrid;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pixelSize", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.05;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gridWidth", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class) || _class));
      var PixelizeHexagonGridPass = exports('PixelizeHexagonGridPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(PixelizeHexagonGridPass, _postProcess$SettingP);

        function PixelizeHexagonGridPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'PixelizeHexagonGridPass';
          _this2.effectName = 'Shaders/PixelizeHexagonGrid.effect';
          _this2.outputNames = ['PixelizeHexagonGridPassColor'];
          _this2.params = new Vec4();
          return _this2;
        }

        var _proto = PixelizeHexagonGridPass.prototype; // Whether the pass should rendered

        _proto.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0);
          var depth = context.depthSlotName; // set setting value to material

          var setting = this.setting;
          this.params.x = setting.pixelSize;
          this.params.y = setting.gridWidth;
          material == null ? void 0 : material.setProperty('params', this.params);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').setPassInput(depth, 'depthTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(PixelizeHexagonGridPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(PixelizeHexagonGrid);
          }
        }]);

        return PixelizeHexagonGridPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new PixelizeHexagonGridPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PixelizeQuadPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Vec4, gfx, rendering;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "36150yM4atGv5IDobQuZ9hp", "PixelizeQuadPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var PixelizeQuad = exports('PixelizeQuad', (_dec = ccclass('PixelizeQuad'), _dec2 = menu('PostProcessL/PixelizeQuad'), _dec3 = property(Material), _dec4 = property({
        range: [0.01, 1.0],
        slide: true,
        step: 0.01
      }), _dec5 = property({
        type: Boolean
      }), _dec6 = property({
        range: [0.2, 5.0],
        slide: true,
        step: 0.01,
        visible: function visible() {
          return !this.useAutoScreenRatio;
        }
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(PixelizeQuad, _postProcess$PostProc);

        function PixelizeQuad() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pixelSize", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "useAutoScreenRatio", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pixelRatio", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        return PixelizeQuad;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pixelSize", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "useAutoScreenRatio", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pixelRatio", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class) || _class));
      var PixelizeQuadPass = exports('PixelizeQuadPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(PixelizeQuadPass, _postProcess$SettingP);

        function PixelizeQuadPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'PixelizeQuadPass';
          _this2.effectName = 'Shaders/PixelizeQuad.effect';
          _this2.outputNames = ['PixelizeQuadPassColor'];
          _this2.params = new Vec4();
          return _this2;
        }

        var _proto = PixelizeQuadPass.prototype; // Whether the pass should rendered

        _proto.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          console.log('PixelizeQuadPass render');
          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0);
          var depth = context.depthSlotName; // set setting value to material

          var setting = this.setting;
          var size = (1.01 - setting.pixelSize) * 200;
          var ratio = setting.pixelRatio;

          if (setting.useAutoScreenRatio) {
            ratio = passViewport.width / passViewport.height;
          }

          this.params.x = size;
          this.params.y = ratio;
          material == null ? void 0 : material.setProperty('params', this.params);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').setPassInput(depth, 'depthTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(PixelizeQuadPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(PixelizeQuad);
          }
        }]);

        return PixelizeQuadPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new PixelizeQuadPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PostController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EditorAsset.ts', './PostPropertyController.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, postProcess, Node, Prefab, instantiate, Label, Toggle, EventHandler, Component, find, EditorAsset, PostPropertyController;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Node = module.Node;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Label = module.Label;
      Toggle = module.Toggle;
      EventHandler = module.EventHandler;
      Component = module.Component;
      find = module.find;
    }, function (module) {
      EditorAsset = module.default;
    }, function (module) {
      PostPropertyController = module.PostPropertyController;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "d0563G3PuZO5r4qzzSETLF/", "PostController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          disallowMultiple = _decorator.disallowMultiple;
      var PostProcessSetting = postProcess.PostProcessSetting;
      var PostProcessController = exports('PostProcessController', (_dec = ccclass('PostProcessController'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property([PostPropertyController]), _dec5 = property(Node), _dec6 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PostProcessController, _Component);

        function PostProcessController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.className = 'PostProcessController';
          _this.propertyContainerName = 'ValueLayout';
          _this.propertyPrefabPath = 'CommonRaw/Prefabs/ValueLayout.prefab';
          _this.toggleContainerName = 'ToggleGroupLayout';
          _this.ToggleGroupLayoutPrefabPath = 'CommonRaw/Prefabs/ToggleGroupLayout.prefab';
          _this.boolItemPrefabPath = 'CommonRaw/Prefabs/ShaderProperties/BoolItem.prefab';

          _initializerDefineProperty(_this, "_postPropertyControllers", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "postPropertyControllerList", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "toggleContainer", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boolPrefab", _descriptor4, _assertThisInitialized(_this));

          _this.currentPostProcess = null;
          _this.toggleList = [];
          _this._postProcessSettings = [];
          return _this;
        }

        var _proto = PostProcessController.prototype;

        _proto.onFocusInEditor = function onFocusInEditor() {
          this.loadPrefabs();
        };

        _proto.onEnable = function onEnable() {
          this.clear();
          this.init();
        };

        _proto.loadPrefabs = /*#__PURE__*/function () {
          var _loadPrefabs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var canvas, toggleContainerPrefab;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  canvas = find('Canvas');

                  if (!(canvas == null)) {
                    _context.next = 4;
                    break;
                  }

                  console.error('Canvas is null');
                  return _context.abrupt("return");

                case 4:
                  if (!(this.toggleContainer == null || this.toggleContainer.isValid === false)) {
                    _context.next = 12;
                    break;
                  }

                  this.toggleContainer = canvas.getChildByName(this.toggleContainerName);

                  if (!(this.toggleContainer == null)) {
                    _context.next = 12;
                    break;
                  }

                  _context.next = 9;
                  return EditorAsset.loadResource(this.ToggleGroupLayoutPrefabPath);

                case 9:
                  toggleContainerPrefab = _context.sent;
                  this.toggleContainer = instantiate(toggleContainerPrefab);
                  canvas.addChild(this.toggleContainer);

                case 12:
                  _context.next = 14;
                  return EditorAsset.loadResource(this.boolItemPrefabPath);

                case 14:
                  this.boolPrefab = _context.sent;

                case 15:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function loadPrefabs() {
            return _loadPrefabs.apply(this, arguments);
          }

          return loadPrefabs;
        }();

        _proto.onDisable = function onDisable() {
          this.clear();
        };

        _proto.init = function init() {
          var _this2 = this;

          this.postProcessSettings.forEach(function (setting) {
            _this2.createPostItem(setting);
          });
          this.select(1);
        };

        _proto.select = function select(index) {
          this.toggleList[index].isChecked = true;
        };

        _proto.clear = function clear() {
          var _this$toggleContainer;

          (_this$toggleContainer = this.toggleContainer) == null ? void 0 : _this$toggleContainer.removeAllChildren();
          this.toggleList = [];
        };

        _proto.setMaterialProperty = function setMaterialProperty(propName, value) {
          this.currentPostProcess[propName] = value;
        };

        _proto.createPostItem = function createPostItem(setting) {
          if (!this.boolPrefab) {
            console.error('boolPrefab is null');
            return;
          }

          var item = instantiate(this.boolPrefab);
          this.toggleContainer.addChild(item);
          item.active = true;
          var labels = item.getComponentsInChildren(Label);
          labels[0].string = setting.name.match(/<(.*)>/)[1];
          var toggle = item.getComponent(Toggle);
          toggle.isChecked = setting.enabled;
          var checkEventHandler = new EventHandler();
          checkEventHandler.target = this.node;
          checkEventHandler.component = this.className;
          checkEventHandler.handler = 'onSwitchPostProcess';
          checkEventHandler.customEventData = setting.name;
          toggle == null ? void 0 : toggle.checkEvents.push(checkEventHandler);
          this.toggleList.push(toggle);
        };

        _proto.onSwitchPostProcess = function onSwitchPostProcess(toggle, customEventData) {
          var _this3 = this;

          this.currentPostProcess = this.postProcessSettings.find(function (setting) {
            return setting.name == customEventData;
          });
          this.currentPostProcess.enabled = toggle.isChecked;

          if (this.currentPostProcess.enabled) {
            this.postPropertyControllerList.forEach(function (controller) {
              controller.node.active = false;
            });
            var controller = this.postPropertyControllerList.find(function (controller) {
              return controller.postProcess == _this3.currentPostProcess;
            });
            controller.node.active = true;
          }
        };

        _createClass(PostProcessController, [{
          key: "postPropertyControllers",
          get: function get() {
            return this._postPropertyControllers;
          },
          set: function set(v) {
            this._postPropertyControllers = v;
            this.postPropertyControllerList = v == null ? void 0 : v.getComponentsInChildren(PostPropertyController);
          }
        }, {
          key: "postProcessSettings",
          get: function get() {
            if (this._postProcessSettings.length == 0) {
              this._postProcessSettings = this.node.getComponents(PostProcessSetting);
            }

            return this._postProcessSettings;
          }
        }]);

        return PostProcessController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_postPropertyControllers", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class2.prototype, "postPropertyControllers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "postPropertyControllers"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "postPropertyControllerList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toggleContainer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "boolPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PostPropertyController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MaterialProperty.ts', './EditorAsset.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, postProcess, Node, Prefab, Vec2, Vec4, Color, CCClass, instantiate, Label, Toggle, EventHandler, Layout, Sprite, Button, Slider, Component, find, MaterialProperty, PropertyType, EditorAsset;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Node = module.Node;
      Prefab = module.Prefab;
      Vec2 = module.Vec2;
      Vec4 = module.Vec4;
      Color = module.Color;
      CCClass = module.CCClass;
      instantiate = module.instantiate;
      Label = module.Label;
      Toggle = module.Toggle;
      EventHandler = module.EventHandler;
      Layout = module.Layout;
      Sprite = module.Sprite;
      Button = module.Button;
      Slider = module.Slider;
      Component = module.Component;
      find = module.find;
    }, function (module) {
      MaterialProperty = module.MaterialProperty;
      PropertyType = module.PropertyType;
    }, function (module) {
      EditorAsset = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "00469QEOP9IJ5rzc+aagw6O", "PostPropertyController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          disallowMultiple = _decorator.disallowMultiple;
      var PostProcessSetting = postProcess.PostProcessSetting;
      var PostPropertyController = exports('PostPropertyController', (_dec = ccclass('PostPropertyController'), _dec2 = property({
        type: Node
      }), _dec3 = property(String), _dec4 = property(String), _dec5 = property([MaterialProperty]), _dec6 = property(Node), _dec7 = property(Prefab), _dec8 = property(Prefab), _dec9 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PostPropertyController, _Component);

        function PostPropertyController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.className = 'PostPropertyController';
          _this.propertyContainerName = 'ValueLayout';
          _this.propertyPrefabPath = 'CommonRaw/Prefabs/ValueLayout.prefab';
          _this.colorItemPrefabPath = 'CommonRaw/Prefabs/ShaderProperties/ColorItem.prefab';
          _this.rangeNumberItemPrefabPath = 'CommonRaw/Prefabs/ShaderProperties/RangeNumberItem.prefab';
          _this.boolItemPrefabPath = 'CommonRaw/Prefabs/ShaderProperties/BoolItem.prefab';

          _initializerDefineProperty(_this, "postProcessNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_postName", _descriptor2, _assertThisInitialized(_this));

          _this._postProcess = void 0;
          _this.postProcessSettings = [];

          _initializerDefineProperty(_this, "properties", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "propertyContainer", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "colorPrefab", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rangeNumberPrefab", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boolPrefab", _descriptor7, _assertThisInitialized(_this));

          _this.propertiesMap = new Map();
          return _this;
        }

        var _proto = PostPropertyController.prototype;

        _proto.onFocusInEditor = function onFocusInEditor() {
          this.loadPrefabs();
          this._postName = this.node.name;

          if (this.properties.length == 0) {
            this.initProperties();
          }
        };

        _proto.onEnable = function onEnable() {
          this.clear();
          this.initPostProperty();
        };

        _proto.getPostProcess = function getPostProcess() {
          var _this2 = this;

          this.postProcessSettings = this.postProcessNode.getComponents(PostProcessSetting);
          this.postProcessSettings.forEach(function (setting) {
            if (setting.name.includes(_this2.postName)) {
              _this2._postProcess = setting;
            }
          });
        };

        _proto.loadPrefabs = /*#__PURE__*/function () {
          var _loadPrefabs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var canvas, valueItemContainerPrefab;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  canvas = find('Canvas');

                  if (!(canvas == null)) {
                    _context.next = 4;
                    break;
                  }

                  console.error('Canvas is null');
                  return _context.abrupt("return");

                case 4:
                  if (!(this.propertyContainer == null || this.propertyContainer.isValid === false)) {
                    _context.next = 12;
                    break;
                  }

                  this.propertyContainer = canvas.getChildByName(this.propertyContainerName);

                  if (!(this.propertyContainer == null)) {
                    _context.next = 12;
                    break;
                  }

                  _context.next = 9;
                  return EditorAsset.loadResource(this.propertyPrefabPath);

                case 9:
                  valueItemContainerPrefab = _context.sent;
                  this.propertyContainer = instantiate(valueItemContainerPrefab);
                  canvas.addChild(this.propertyContainer);

                case 12:
                  _context.next = 14;
                  return EditorAsset.loadResource(this.colorItemPrefabPath);

                case 14:
                  this.colorPrefab = _context.sent;
                  _context.next = 17;
                  return EditorAsset.loadResource(this.rangeNumberItemPrefabPath);

                case 17:
                  this.rangeNumberPrefab = _context.sent;
                  _context.next = 20;
                  return EditorAsset.loadResource(this.boolItemPrefabPath);

                case 20:
                  this.boolPrefab = _context.sent;

                case 21:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function loadPrefabs() {
            return _loadPrefabs.apply(this, arguments);
          }

          return loadPrefabs;
        }();

        _proto.onDisable = function onDisable() {
          this.clear();
        };

        _proto.clear = function clear() {
          var _this$propertyContain;

          (_this$propertyContain = this.propertyContainer) == null ? void 0 : _this$propertyContain.removeAllChildren();
          this.propertiesMap.clear();
        };

        _proto.setMaterialProperty = function setMaterialProperty(propName, value) {
          this.postProcess[propName] = value;
        };

        _proto.initProperties = function initProperties() {
          if (this.postProcess == null) return;
          this.properties = [];

          for (var _i = 0, _Object$keys = Object.keys(this.postProcess); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];

            if (!key.startsWith('_')) {
              var value = this.postProcess[key];

              if (typeof value === 'number' || typeof value === 'boolean' || value instanceof Vec2 || value instanceof Vec4 || value instanceof Color) {
                console.log(key + "  " + value);
                var prop = new MaterialProperty();
                prop.name = key;
                var attr = CCClass.Attr.attr(this.postProcess, key);

                if (typeof value === 'number') {
                  prop.type = PropertyType.Float;
                  prop.numberValue = value;
                  prop.min = attr.min;
                  prop.max = attr.max;
                } else if (typeof value === 'boolean') {
                  prop.type = PropertyType.Bool;
                  prop.boolValue = value;
                } else if (value instanceof Vec2) {
                  prop.type = PropertyType.Vector;
                  prop.sliderCount = 2;
                  prop.vectorValue = new Vec4(value.x, value.y, 0, 0);
                } else if (value instanceof Vec4) {
                  prop.type = PropertyType.Vector;
                  prop.sliderCount = 4;
                  prop.vectorValue = value;
                } else if (value instanceof Color) {
                  prop.type = PropertyType.Color;
                  prop.colorValue[0] = value;
                }

                this.properties.push(prop);
              }
            }
          }
        };

        _proto.initPostProperty = function initPostProperty() {
          var _this3 = this;

          this.propertiesMap.clear();
          this.properties.forEach(function (prop) {
            _this3.propertiesMap.set(prop.name, prop);
          });
          this.properties.forEach(function (prop, index) {
            _this3.createValueItem(prop);
          });
        };

        _proto.createValueItem = function createValueItem(prop) {
          switch (prop.type) {
            case PropertyType.Color:
              this.initColor(prop);
              break;

            case PropertyType.Int:
              this.initSlider(prop);
              break;

            case PropertyType.Float:
              this.initSlider(prop);
              break;

            case PropertyType.Vector:
              this.initVectorSlider(prop);
              break;

            case PropertyType.Texture:
              break;

            case PropertyType.Bool:
              this.initBool(prop);
              break;

            default:
              console.error("Unknown property type: " + prop.type);
              break;
          }
        };

        _proto.initBool = function initBool(prop) {
          if (!this.boolPrefab) {
            console.error('boolPrefab is null');
            return;
          }

          var item = instantiate(this.boolPrefab);
          this.propertyContainer.addChild(item);
          item.active = true;
          var labels = item.getComponentsInChildren(Label);
          labels[0].string = prop.name;
          var toggle = item.getComponent(Toggle);
          toggle.isChecked = prop.boolValue;
          var checkEventHandler = new EventHandler();
          checkEventHandler.target = this.node;
          checkEventHandler.component = this.className;
          checkEventHandler.handler = 'onBoolChangeValue';
          checkEventHandler.customEventData = prop.name;
          toggle == null ? void 0 : toggle.checkEvents.push(checkEventHandler);
        };

        _proto.initColor = function initColor(prop) {
          var _this4 = this;

          if (!this.colorPrefab) {
            console.error('numberPrefab is null');
            return;
          }

          var item = instantiate(this.colorPrefab);
          this.propertyContainer.addChild(item);
          item.active = true;
          var labels = item.getComponentsInChildren(Label);
          labels[0].string = prop.name;
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
            checkEventHandler.target = _this4.node;
            checkEventHandler.component = _this4.className;
            checkEventHandler.handler = 'onColorChangeValue';
            checkEventHandler.customEventData = prop.name;
            colorBtn.clickEvents.push(checkEventHandler);
          });
        };

        _proto.onBoolChangeValue = function onBoolChangeValue(toggle, customEventData) {
          var prop = this.propertiesMap.get(customEventData);
          prop.boolValue = toggle.isChecked;
          this.setMaterialProperty(prop.name, prop.boolValue);
        };

        _proto.onColorChangeValue = function onColorChangeValue(button, customEventData) {
          var prop = this.propertiesMap.get(customEventData);
          var color = button.target.getComponent(Sprite).color;
          prop.colorValue[0] = color;
          this.setMaterialProperty(prop.name, color);
        };

        _proto.initSlider = function initSlider(prop) {
          if (!this.rangeNumberPrefab) {
            console.error('numberPrefab is null');
            return;
          }

          var item = instantiate(this.rangeNumberPrefab);
          this.propertyContainer.addChild(item);
          item.active = true;
          var labels = item.getComponentsInChildren(Label);
          labels[0].string = prop.name;
          labels[1].string = prop.numberValue.toFixed(2);
          this.setMaterialProperty(prop.name, prop.numberValue);
          var slider = item.getComponent(Slider);
          slider.progress = prop.valueToProgress();
          var checkEventHandler = new EventHandler();
          checkEventHandler.target = this.node;
          checkEventHandler.component = this.className;
          checkEventHandler.handler = 'onSliderChangeValue';
          checkEventHandler.customEventData = prop.name;
          slider == null ? void 0 : slider.slideEvents.push(checkEventHandler);
        };

        _proto.onSliderChangeValue = function onSliderChangeValue(slider, customEventData) {
          var prop = this.propertiesMap.get(customEventData);
          var value;

          if (prop.type == PropertyType.Float) {
            value = prop.progressToFloat(slider.progress);
          } else {
            value = prop.progressToInt(slider.progress);
          }

          this.setMaterialProperty(prop.name, value);
          var labels = slider.getComponentsInChildren(Label);
          labels[1].string = value.toFixed(2);
        };

        _proto.initVectorSlider = function initVectorSlider(prop) {
          var values = prop.vectorValue;
          var names = ['x', 'y', 'z', 'w'];

          for (var i = 0; i < prop.sliderCount; i++) {
            var valueName = names[i];
            var value = values[valueName];
            var item = instantiate(this.rangeNumberPrefab);
            this.propertyContainer.addChild(item);
            item.active = true;
            var labels = item.getComponentsInChildren(Label);
            labels[0].string = prop.name + "." + valueName;
            labels[1].string = value.toFixed(2);
            var slider = item.getComponent(Slider);
            slider.progress = prop.valueToProgress(value);
            var checkEventHandler = new EventHandler();
            checkEventHandler.target = this.node;
            checkEventHandler.component = this.className;
            checkEventHandler.handler = 'onVectorSliderChangeValue';
            checkEventHandler.customEventData = prop.name + "." + valueName;
            slider == null ? void 0 : slider.slideEvents.push(checkEventHandler);
          }

          this.setMaterialProperty(prop.name, values);
        };

        _proto.onVectorSliderChangeValue = function onVectorSliderChangeValue(slider, customEventData) {
          var data = customEventData.split('.');
          var propName = data[0];
          var prop = this.propertiesMap.get(propName);
          var value = prop.progressToFloat(slider.progress);
          var labels = slider.getComponentsInChildren(Label);
          labels[1].string = value.toFixed(2); // 获取分量名称

          var name = data[1]; // 修改 vectorValue 的对应分量

          var vectorValue = prop.vectorValue;
          vectorValue[name] = value;
          this.setMaterialProperty(prop.name, vectorValue);
        };

        _createClass(PostPropertyController, [{
          key: "postName",
          get: function get() {
            return this._postName;
          },
          set: function set(v) {
            this._postName = v;
            this.getPostProcess();
            this.initProperties();
          }
        }, {
          key: "postProcess",
          get: function get() {
            if (this._postProcess) return this._postProcess;
            this.getPostProcess();
            return this._postProcess;
          }
        }]);

        return PostPropertyController;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "postProcessNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_postName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "postName", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "postName"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "properties", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "propertyContainer", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "colorPrefab", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rangeNumberPrefab", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "boolPrefab", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RadialBlurPass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Vec4, gfx, rendering, Vec2;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Vec4 = module.Vec4;
      gfx = module.gfx;
      rendering = module.rendering;
      Vec2 = module.Vec2;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "1d8a8y6hUlLRIu+oMwh4Zh1", "RadialBlurPass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var RadialBlur = exports('RadialBlur', (_dec = ccclass('RadialBlur'), _dec2 = menu('PostProcessL/RadialBlur'), _dec3 = property(Material), _dec4 = property({
        range: [0.0, 5.0],
        slide: true,
        step: 0.01
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(RadialBlur, _postProcess$PostProc);

        function RadialBlur() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "highSample", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "blueCenter", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "blurFactor", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = RadialBlur.prototype;

        _proto.changeBlurFactor = function changeBlurFactor(slider) {
          this.blurFactor = slider.progress;
        };

        return RadialBlur;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "highSample", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "blueCenter", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0.5, 0.5);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "blurFactor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class) || _class));
      var RadialBlurPass = exports('RadialBlurPass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(RadialBlurPass, _postProcess$SettingP);

        function RadialBlurPass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'RadialBlurPass';
          _this2.effectName = 'Shaders/RadialBlur.effect';
          _this2.outputNames = ['RadialBlurPassColor'];
          _this2.params = new Vec4();
          return _this2;
        }

        var _proto2 = RadialBlurPass.prototype; // Whether the pass should rendered

        _proto2.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto2.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0);
          var depth = context.depthSlotName; // also can get depth slot name from forward pass.
          // let forwardPass = builder.getPass(ForwardPass);
          // depth = forwardPass.slotName(camera, 1);
          // set setting value to material

          var setting = this.setting;
          this.params.x = setting.blueCenter.x;
          this.params.y = setting.blueCenter.y;
          this.params.z = setting.blurFactor * 0.01;
          this.params.w = setting.highSample ? 1 : 0;
          material == null ? void 0 : material.setProperty('params', this.params);
          var texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          material == null ? void 0 : material.setProperty('texSize', texSize);
          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').setPassInput(depth, 'depthTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(RadialBlurPass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(RadialBlur);
          }
        }]);

        return RadialBlurPass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new RadialBlurPass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SwitchNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;

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
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "989dcpoAjNEYJ/QFVapSZkz", "SwitchNode", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SwitchNode = exports('SwitchNode', (_dec = ccclass('SwitchNode'), _dec2 = property(Number), _dec3 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SwitchNode, _Component);

        function SwitchNode() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "startIndex", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "nodeList", _descriptor2, _assertThisInitialized(_this));

          _this.index = 0;
          return _this;
        }

        var _proto = SwitchNode.prototype;

        _proto.onEnable = function onEnable() {
          if (this.nodeList.length == 0) {
            return;
          }

          for (var i = 0; i < this.nodeList.length; i++) {
            this.nodeList[i].active = false;
          }

          this.nodeList[this.startIndex].active = true;
        };

        _proto.next = function next() {
          this.nodeList[this.index].active = false;
          this.index = (this.index + 1) % this.nodeList.length;
          this.nodeList[this.index].active = true;
        };

        _proto.prev = function prev() {
          this.nodeList[this.index].active = false;
          this.index = (this.index - 1 + this.nodeList.length) % this.nodeList.length;
          this.nodeList[this.index].active = true;
        };

        return SwitchNode;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startIndex", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeList", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Test.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "9cba36IqcpOVJfs9OOVBctS", "Test", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Test = exports('Test', (_dec = ccclass('Test'), _dec2 = property(Boolean), _dec3 = property(Color), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Test, _Component);

        function Test() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "testBool", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "test", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "testInput", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "color", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Test.prototype; // @property()
        // test = '';
        // @property({
        //     type:"test-input"
        // })
        // butt = '';

        _proto.onEnable = function onEnable() {
          console.log(this.color instanceof Color);
        };

        return Test;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "testBool", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "test", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "testInput", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 0);
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VignettePass.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, postProcess, Material, Color, Vec2, gfx, rendering, Vec4;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      postProcess = module.postProcess;
      Material = module.Material;
      Color = module.Color;
      Vec2 = module.Vec2;
      gfx = module.gfx;
      rendering = module.rendering;
      Vec4 = module.Vec4;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "fbd49ep9WVGvamWRGMyh8GY", "VignettePass", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SettingPass = postProcess.SettingPass,
          PostProcessSetting = postProcess.PostProcessSetting,
          BlitScreenPass = postProcess.BlitScreenPass,
          ForwardPass = postProcess.ForwardPass;
      var Vignette = exports('Vignette', (_dec = ccclass('Vignette'), _dec2 = menu('PostProcessL/Vignette'), _dec3 = property(Material), _dec4 = property(Color), _dec5 = property(Vec2), _dec6 = property({
        range: [0.0, 1.0],
        slide: true,
        step: 0.01
      }), _dec7 = property({
        range: [0.01, 1.0],
        slide: true,
        step: 0.01
      }), _dec8 = property(Boolean), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_postProcess$PostProc) {
        _inheritsLoose(Vignette, _postProcess$PostProc);

        function Vignette() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _postProcess$PostProc.call.apply(_postProcess$PostProc, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "material", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vignetteColor", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vignetteCenter", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vignetteIntensity", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vignetteSmoothness", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rounded", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        return Vignette;
      }(postProcess.PostProcessSetting), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vignetteColor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 1);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "vignetteCenter", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0.5, 0.5);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "vignetteIntensity", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "vignetteSmoothness", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rounded", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class) || _class));
      var VignettePass = exports('VignettePass', /*#__PURE__*/function (_postProcess$SettingP) {
        _inheritsLoose(VignettePass, _postProcess$SettingP);

        function VignettePass() {
          var _this2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2 = _postProcess$SettingP.call.apply(_postProcess$SettingP, [this].concat(args)) || this;
          _this2.name = 'VignettePass';
          _this2.effectName = 'Shaders/Vignette.effect';
          _this2.params = new Vec4();
          _this2.params2 = new Vec4();
          return _this2;
        }

        var _proto = VignettePass.prototype;

        _proto.checkEnable = function checkEnable(camera) {
          return _postProcess$SettingP.prototype.checkEnable.call(this, camera) && this.setting.material != null;
        };

        _proto.render = function render(camera, ppl) {
          if (this.setting.material == null) {
            return;
          }

          var cameraID = this.getCameraUniqueID(camera); // clear background to black color 

          var context = this.context;
          context.clearBlack();
          var material = this.setting.material;
          var passViewport = context.passViewport; // input name from last pass's output slot 0

          var input0 = this.lastPass ? this.lastPass.slotName(camera, 0) : '';
          var output = this.slotName(camera, 0); // set setting value to material

          var setting = this.setting;
          this.params.x = setting.vignetteCenter.x;
          this.params.y = setting.vignetteCenter.y;
          this.params.z = setting.vignetteIntensity * 3;
          this.params.w = setting.vignetteSmoothness * 5;
          this.params2.x = setting.vignetteColor.x;
          this.params2.y = setting.vignetteColor.y;
          this.params2.z = setting.vignetteColor.z;
          var aspectRatio = passViewport.width / passViewport.height;
          this.params2.w = setting.rounded ? aspectRatio : 1;
          material == null ? void 0 : material.setProperty('params', this.params);
          material == null ? void 0 : material.setProperty('params2', this.params2); // const texSize = new Vec4(1 / passViewport.width, 1 / passViewport.height, passViewport.width, passViewport.height);
          // material?.setProperty('texSize', texSize);

          context.material = material;
          context.updatePassViewPort().addRenderPass('post-process', "" + this.name + cameraID).setPassInput(input0, 'inputTexture').addRasterView(output, gfx.Format.RGBA8).blitScreen(0).version();
        };

        _createClass(VignettePass, [{
          key: "setting",
          get: function get() {
            return this.getSetting(Vignette);
          }
        }]);

        return VignettePass;
      }(postProcess.SettingPass));
      var builder = rendering.getCustomPipeline('Custom');

      if (builder) {
        builder.insertPass(new VignettePass(), BlitScreenPass);
      }

      cclegacy._RF.pop();
    }
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