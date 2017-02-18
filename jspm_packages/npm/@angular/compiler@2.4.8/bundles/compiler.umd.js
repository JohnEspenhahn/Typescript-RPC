/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) : (factory((global.ng = global.ng || {}, global.ng.compiler = global.ng.compiler || {}), global.ng.core));
  }(this, function(exports, _angular_core) {
    'use strict';
    var VERSION = new _angular_core.Version('2.4.8');
    var TextAst = (function() {
      function TextAst(value, ngContentIndex, sourceSpan) {
        this.value = value;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
      }
      TextAst.prototype.visit = function(visitor, context) {
        return visitor.visitText(this, context);
      };
      return TextAst;
    }());
    var BoundTextAst = (function() {
      function BoundTextAst(value, ngContentIndex, sourceSpan) {
        this.value = value;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
      }
      BoundTextAst.prototype.visit = function(visitor, context) {
        return visitor.visitBoundText(this, context);
      };
      return BoundTextAst;
    }());
    var AttrAst = (function() {
      function AttrAst(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      AttrAst.prototype.visit = function(visitor, context) {
        return visitor.visitAttr(this, context);
      };
      return AttrAst;
    }());
    var BoundElementPropertyAst = (function() {
      function BoundElementPropertyAst(name, type, securityContext, needsRuntimeSecurityContext, value, unit, sourceSpan) {
        this.name = name;
        this.type = type;
        this.securityContext = securityContext;
        this.needsRuntimeSecurityContext = needsRuntimeSecurityContext;
        this.value = value;
        this.unit = unit;
        this.sourceSpan = sourceSpan;
      }
      BoundElementPropertyAst.prototype.visit = function(visitor, context) {
        return visitor.visitElementProperty(this, context);
      };
      Object.defineProperty(BoundElementPropertyAst.prototype, "isAnimation", {
        get: function() {
          return this.type === PropertyBindingType.Animation;
        },
        enumerable: true,
        configurable: true
      });
      return BoundElementPropertyAst;
    }());
    var BoundEventAst = (function() {
      function BoundEventAst(name, target, phase, handler, sourceSpan) {
        this.name = name;
        this.target = target;
        this.phase = phase;
        this.handler = handler;
        this.sourceSpan = sourceSpan;
      }
      BoundEventAst.calcFullName = function(name, target, phase) {
        if (target) {
          return target + ":" + name;
        } else if (phase) {
          return "@" + name + "." + phase;
        } else {
          return name;
        }
      };
      BoundEventAst.prototype.visit = function(visitor, context) {
        return visitor.visitEvent(this, context);
      };
      Object.defineProperty(BoundEventAst.prototype, "fullName", {
        get: function() {
          return BoundEventAst.calcFullName(this.name, this.target, this.phase);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BoundEventAst.prototype, "isAnimation", {
        get: function() {
          return !!this.phase;
        },
        enumerable: true,
        configurable: true
      });
      return BoundEventAst;
    }());
    var ReferenceAst = (function() {
      function ReferenceAst(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      ReferenceAst.prototype.visit = function(visitor, context) {
        return visitor.visitReference(this, context);
      };
      return ReferenceAst;
    }());
    var VariableAst = (function() {
      function VariableAst(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      VariableAst.prototype.visit = function(visitor, context) {
        return visitor.visitVariable(this, context);
      };
      return VariableAst;
    }());
    var ElementAst = (function() {
      function ElementAst(name, attrs, inputs, outputs, references, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan, endSourceSpan) {
        this.name = name;
        this.attrs = attrs;
        this.inputs = inputs;
        this.outputs = outputs;
        this.references = references;
        this.directives = directives;
        this.providers = providers;
        this.hasViewContainer = hasViewContainer;
        this.children = children;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
        this.endSourceSpan = endSourceSpan;
      }
      ElementAst.prototype.visit = function(visitor, context) {
        return visitor.visitElement(this, context);
      };
      return ElementAst;
    }());
    var EmbeddedTemplateAst = (function() {
      function EmbeddedTemplateAst(attrs, outputs, references, variables, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
        this.attrs = attrs;
        this.outputs = outputs;
        this.references = references;
        this.variables = variables;
        this.directives = directives;
        this.providers = providers;
        this.hasViewContainer = hasViewContainer;
        this.children = children;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
      }
      EmbeddedTemplateAst.prototype.visit = function(visitor, context) {
        return visitor.visitEmbeddedTemplate(this, context);
      };
      return EmbeddedTemplateAst;
    }());
    var BoundDirectivePropertyAst = (function() {
      function BoundDirectivePropertyAst(directiveName, templateName, value, sourceSpan) {
        this.directiveName = directiveName;
        this.templateName = templateName;
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      BoundDirectivePropertyAst.prototype.visit = function(visitor, context) {
        return visitor.visitDirectiveProperty(this, context);
      };
      return BoundDirectivePropertyAst;
    }());
    var DirectiveAst = (function() {
      function DirectiveAst(directive, inputs, hostProperties, hostEvents, sourceSpan) {
        this.directive = directive;
        this.inputs = inputs;
        this.hostProperties = hostProperties;
        this.hostEvents = hostEvents;
        this.sourceSpan = sourceSpan;
      }
      DirectiveAst.prototype.visit = function(visitor, context) {
        return visitor.visitDirective(this, context);
      };
      return DirectiveAst;
    }());
    var ProviderAst = (function() {
      function ProviderAst(token, multiProvider, eager, providers, providerType, lifecycleHooks, sourceSpan) {
        this.token = token;
        this.multiProvider = multiProvider;
        this.eager = eager;
        this.providers = providers;
        this.providerType = providerType;
        this.lifecycleHooks = lifecycleHooks;
        this.sourceSpan = sourceSpan;
      }
      ProviderAst.prototype.visit = function(visitor, context) {
        return null;
      };
      return ProviderAst;
    }());
    var ProviderAstType = {};
    ProviderAstType.PublicService = 0;
    ProviderAstType.PrivateService = 1;
    ProviderAstType.Component = 2;
    ProviderAstType.Directive = 3;
    ProviderAstType.Builtin = 4;
    ProviderAstType[ProviderAstType.PublicService] = "PublicService";
    ProviderAstType[ProviderAstType.PrivateService] = "PrivateService";
    ProviderAstType[ProviderAstType.Component] = "Component";
    ProviderAstType[ProviderAstType.Directive] = "Directive";
    ProviderAstType[ProviderAstType.Builtin] = "Builtin";
    var NgContentAst = (function() {
      function NgContentAst(index, ngContentIndex, sourceSpan) {
        this.index = index;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
      }
      NgContentAst.prototype.visit = function(visitor, context) {
        return visitor.visitNgContent(this, context);
      };
      return NgContentAst;
    }());
    var PropertyBindingType = {};
    PropertyBindingType.Property = 0;
    PropertyBindingType.Attribute = 1;
    PropertyBindingType.Class = 2;
    PropertyBindingType.Style = 3;
    PropertyBindingType.Animation = 4;
    PropertyBindingType[PropertyBindingType.Property] = "Property";
    PropertyBindingType[PropertyBindingType.Attribute] = "Attribute";
    PropertyBindingType[PropertyBindingType.Class] = "Class";
    PropertyBindingType[PropertyBindingType.Style] = "Style";
    PropertyBindingType[PropertyBindingType.Animation] = "Animation";
    function templateVisitAll(visitor, asts, context) {
      if (context === void 0) {
        context = null;
      }
      var result = [];
      var visit = visitor.visit ? function(ast) {
        return visitor.visit(ast, context) || ast.visit(visitor, context);
      } : function(ast) {
        return ast.visit(visitor, context);
      };
      asts.forEach(function(ast) {
        var astResult = visit(ast);
        if (astResult) {
          result.push(astResult);
        }
      });
      return result;
    }
    var StaticSymbol = (function() {
      function StaticSymbol(filePath, name, members) {
        this.filePath = filePath;
        this.name = name;
        this.members = members;
      }
      return StaticSymbol;
    }());
    var StaticSymbolCache = (function() {
      function StaticSymbolCache() {
        this.cache = new Map();
      }
      StaticSymbolCache.prototype.get = function(declarationFile, name, members) {
        members = members || [];
        var memberSuffix = members.length ? "." + members.join('.') : '';
        var key = "\"" + declarationFile + "\"." + name + memberSuffix;
        var result = this.cache.get(key);
        if (!result) {
          result = new StaticSymbol(declarationFile, name, members);
          this.cache.set(key, result);
        }
        return result;
      };
      return StaticSymbolCache;
    }());
    function isPresent(obj) {
      return obj != null;
    }
    function isBlank(obj) {
      return obj == null;
    }
    var STRING_MAP_PROTO = Object.getPrototypeOf({});
    function isStrictStringMap(obj) {
      return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
    }
    function stringify(token) {
      if (typeof token === 'string') {
        return token;
      }
      if (token == null) {
        return '' + token;
      }
      if (token.overriddenName) {
        return "" + token.overriddenName;
      }
      if (token.name) {
        return "" + token.name;
      }
      var res = token.toString();
      var newLineIndex = res.indexOf('\n');
      return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    var NumberWrapper = (function() {
      function NumberWrapper() {}
      NumberWrapper.parseIntAutoRadix = function(text) {
        var result = parseInt(text);
        if (isNaN(result)) {
          throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
      };
      NumberWrapper.isNumeric = function(value) {
        return !isNaN(value - parseFloat(value));
      };
      return NumberWrapper;
    }());
    function isJsObject(o) {
      return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    function isPrimitive(obj) {
      return !isJsObject(obj);
    }
    function escapeRegExp(s) {
      return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
    var StringMapWrapper = (function() {
      function StringMapWrapper() {}
      StringMapWrapper.merge = function(m1, m2) {
        var m = {};
        for (var _i = 0,
            _a = Object.keys(m1); _i < _a.length; _i++) {
          var k = _a[_i];
          m[k] = m1[k];
        }
        for (var _b = 0,
            _c = Object.keys(m2); _b < _c.length; _b++) {
          var k = _c[_b];
          m[k] = m2[k];
        }
        return m;
      };
      StringMapWrapper.equals = function(m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
          return false;
        }
        for (var i = 0; i < k1.length; i++) {
          var key = k1[i];
          if (m1[key] !== m2[key]) {
            return false;
          }
        }
        return true;
      };
      return StringMapWrapper;
    }());
    var ListWrapper = (function() {
      function ListWrapper() {}
      ListWrapper.findLast = function(arr, condition) {
        for (var i = arr.length - 1; i >= 0; i--) {
          if (condition(arr[i])) {
            return arr[i];
          }
        }
        return null;
      };
      ListWrapper.removeAll = function(list, items) {
        for (var i = 0; i < items.length; ++i) {
          var index = list.indexOf(items[i]);
          if (index > -1) {
            list.splice(index, 1);
          }
        }
      };
      ListWrapper.remove = function(list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
          list.splice(index, 1);
          return true;
        }
        return false;
      };
      ListWrapper.equals = function(a, b) {
        if (a.length != b.length)
          return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      };
      ListWrapper.flatten = function(list) {
        return list.reduce(function(flat, item) {
          var flatItem = Array.isArray(item) ? ListWrapper.flatten(item) : item;
          return ((flat)).concat(flatItem);
        }, []);
      };
      return ListWrapper;
    }());
    var isDefaultChangeDetectionStrategy = _angular_core.__core_private__.isDefaultChangeDetectionStrategy;
    var ChangeDetectorStatus = _angular_core.__core_private__.ChangeDetectorStatus;
    var LifecycleHooks = _angular_core.__core_private__.LifecycleHooks;
    var LIFECYCLE_HOOKS_VALUES = _angular_core.__core_private__.LIFECYCLE_HOOKS_VALUES;
    var ReflectorReader = _angular_core.__core_private__.ReflectorReader;
    var ViewContainer = _angular_core.__core_private__.ViewContainer;
    var CodegenComponentFactoryResolver = _angular_core.__core_private__.CodegenComponentFactoryResolver;
    var ComponentRef_ = _angular_core.__core_private__.ComponentRef_;
    var AppView = _angular_core.__core_private__.AppView;
    var DebugAppView = _angular_core.__core_private__.DebugAppView;
    var NgModuleInjector = _angular_core.__core_private__.NgModuleInjector;
    var registerModuleFactory = _angular_core.__core_private__.registerModuleFactory;
    var ViewType = _angular_core.__core_private__.ViewType;
    var view_utils = _angular_core.__core_private__.view_utils;
    var DebugContext = _angular_core.__core_private__.DebugContext;
    var StaticNodeDebugInfo = _angular_core.__core_private__.StaticNodeDebugInfo;
    var devModeEqual = _angular_core.__core_private__.devModeEqual;
    var UNINITIALIZED = _angular_core.__core_private__.UNINITIALIZED;
    var ValueUnwrapper = _angular_core.__core_private__.ValueUnwrapper;
    var TemplateRef_ = _angular_core.__core_private__.TemplateRef_;
    var Console = _angular_core.__core_private__.Console;
    var reflector = _angular_core.__core_private__.reflector;
    var Reflector = _angular_core.__core_private__.Reflector;
    var ReflectionCapabilities = _angular_core.__core_private__.ReflectionCapabilities;
    var NoOpAnimationPlayer = _angular_core.__core_private__.NoOpAnimationPlayer;
    var AnimationSequencePlayer = _angular_core.__core_private__.AnimationSequencePlayer;
    var AnimationGroupPlayer = _angular_core.__core_private__.AnimationGroupPlayer;
    var AnimationKeyframe = _angular_core.__core_private__.AnimationKeyframe;
    var AnimationStyles = _angular_core.__core_private__.AnimationStyles;
    var ANY_STATE = _angular_core.__core_private__.ANY_STATE;
    var DEFAULT_STATE = _angular_core.__core_private__.DEFAULT_STATE;
    var EMPTY_STATE = _angular_core.__core_private__.EMPTY_STATE;
    var FILL_STYLE_FLAG = _angular_core.__core_private__.FILL_STYLE_FLAG;
    var prepareFinalAnimationStyles = _angular_core.__core_private__.prepareFinalAnimationStyles;
    var balanceAnimationKeyframes = _angular_core.__core_private__.balanceAnimationKeyframes;
    var clearStyles = _angular_core.__core_private__.clearStyles;
    var collectAndResolveStyles = _angular_core.__core_private__.collectAndResolveStyles;
    var renderStyles = _angular_core.__core_private__.renderStyles;
    var ComponentStillLoadingError = _angular_core.__core_private__.ComponentStillLoadingError;
    var AnimationTransition = _angular_core.__core_private__.AnimationTransition;
    var TagContentType = {};
    TagContentType.RAW_TEXT = 0;
    TagContentType.ESCAPABLE_RAW_TEXT = 1;
    TagContentType.PARSABLE_DATA = 2;
    TagContentType[TagContentType.RAW_TEXT] = "RAW_TEXT";
    TagContentType[TagContentType.ESCAPABLE_RAW_TEXT] = "ESCAPABLE_RAW_TEXT";
    TagContentType[TagContentType.PARSABLE_DATA] = "PARSABLE_DATA";
    function splitNsName(elementName) {
      if (elementName[0] != ':') {
        return [null, elementName];
      }
      var colonIndex = elementName.indexOf(':', 1);
      if (colonIndex == -1) {
        throw new Error("Unsupported format \"" + elementName + "\" expecting \":namespace:name\"");
      }
      return [elementName.slice(1, colonIndex), elementName.slice(colonIndex + 1)];
    }
    function getNsPrefix(fullName) {
      return fullName === null ? null : splitNsName(fullName)[0];
    }
    function mergeNsAndName(prefix, localName) {
      return prefix ? ":" + prefix + ":" + localName : localName;
    }
    var NAMED_ENTITIES = {
      'Aacute': '\u00C1',
      'aacute': '\u00E1',
      'Acirc': '\u00C2',
      'acirc': '\u00E2',
      'acute': '\u00B4',
      'AElig': '\u00C6',
      'aelig': '\u00E6',
      'Agrave': '\u00C0',
      'agrave': '\u00E0',
      'alefsym': '\u2135',
      'Alpha': '\u0391',
      'alpha': '\u03B1',
      'amp': '&',
      'and': '\u2227',
      'ang': '\u2220',
      'apos': '\u0027',
      'Aring': '\u00C5',
      'aring': '\u00E5',
      'asymp': '\u2248',
      'Atilde': '\u00C3',
      'atilde': '\u00E3',
      'Auml': '\u00C4',
      'auml': '\u00E4',
      'bdquo': '\u201E',
      'Beta': '\u0392',
      'beta': '\u03B2',
      'brvbar': '\u00A6',
      'bull': '\u2022',
      'cap': '\u2229',
      'Ccedil': '\u00C7',
      'ccedil': '\u00E7',
      'cedil': '\u00B8',
      'cent': '\u00A2',
      'Chi': '\u03A7',
      'chi': '\u03C7',
      'circ': '\u02C6',
      'clubs': '\u2663',
      'cong': '\u2245',
      'copy': '\u00A9',
      'crarr': '\u21B5',
      'cup': '\u222A',
      'curren': '\u00A4',
      'dagger': '\u2020',
      'Dagger': '\u2021',
      'darr': '\u2193',
      'dArr': '\u21D3',
      'deg': '\u00B0',
      'Delta': '\u0394',
      'delta': '\u03B4',
      'diams': '\u2666',
      'divide': '\u00F7',
      'Eacute': '\u00C9',
      'eacute': '\u00E9',
      'Ecirc': '\u00CA',
      'ecirc': '\u00EA',
      'Egrave': '\u00C8',
      'egrave': '\u00E8',
      'empty': '\u2205',
      'emsp': '\u2003',
      'ensp': '\u2002',
      'Epsilon': '\u0395',
      'epsilon': '\u03B5',
      'equiv': '\u2261',
      'Eta': '\u0397',
      'eta': '\u03B7',
      'ETH': '\u00D0',
      'eth': '\u00F0',
      'Euml': '\u00CB',
      'euml': '\u00EB',
      'euro': '\u20AC',
      'exist': '\u2203',
      'fnof': '\u0192',
      'forall': '\u2200',
      'frac12': '\u00BD',
      'frac14': '\u00BC',
      'frac34': '\u00BE',
      'frasl': '\u2044',
      'Gamma': '\u0393',
      'gamma': '\u03B3',
      'ge': '\u2265',
      'gt': '>',
      'harr': '\u2194',
      'hArr': '\u21D4',
      'hearts': '\u2665',
      'hellip': '\u2026',
      'Iacute': '\u00CD',
      'iacute': '\u00ED',
      'Icirc': '\u00CE',
      'icirc': '\u00EE',
      'iexcl': '\u00A1',
      'Igrave': '\u00CC',
      'igrave': '\u00EC',
      'image': '\u2111',
      'infin': '\u221E',
      'int': '\u222B',
      'Iota': '\u0399',
      'iota': '\u03B9',
      'iquest': '\u00BF',
      'isin': '\u2208',
      'Iuml': '\u00CF',
      'iuml': '\u00EF',
      'Kappa': '\u039A',
      'kappa': '\u03BA',
      'Lambda': '\u039B',
      'lambda': '\u03BB',
      'lang': '\u27E8',
      'laquo': '\u00AB',
      'larr': '\u2190',
      'lArr': '\u21D0',
      'lceil': '\u2308',
      'ldquo': '\u201C',
      'le': '\u2264',
      'lfloor': '\u230A',
      'lowast': '\u2217',
      'loz': '\u25CA',
      'lrm': '\u200E',
      'lsaquo': '\u2039',
      'lsquo': '\u2018',
      'lt': '<',
      'macr': '\u00AF',
      'mdash': '\u2014',
      'micro': '\u00B5',
      'middot': '\u00B7',
      'minus': '\u2212',
      'Mu': '\u039C',
      'mu': '\u03BC',
      'nabla': '\u2207',
      'nbsp': '\u00A0',
      'ndash': '\u2013',
      'ne': '\u2260',
      'ni': '\u220B',
      'not': '\u00AC',
      'notin': '\u2209',
      'nsub': '\u2284',
      'Ntilde': '\u00D1',
      'ntilde': '\u00F1',
      'Nu': '\u039D',
      'nu': '\u03BD',
      'Oacute': '\u00D3',
      'oacute': '\u00F3',
      'Ocirc': '\u00D4',
      'ocirc': '\u00F4',
      'OElig': '\u0152',
      'oelig': '\u0153',
      'Ograve': '\u00D2',
      'ograve': '\u00F2',
      'oline': '\u203E',
      'Omega': '\u03A9',
      'omega': '\u03C9',
      'Omicron': '\u039F',
      'omicron': '\u03BF',
      'oplus': '\u2295',
      'or': '\u2228',
      'ordf': '\u00AA',
      'ordm': '\u00BA',
      'Oslash': '\u00D8',
      'oslash': '\u00F8',
      'Otilde': '\u00D5',
      'otilde': '\u00F5',
      'otimes': '\u2297',
      'Ouml': '\u00D6',
      'ouml': '\u00F6',
      'para': '\u00B6',
      'permil': '\u2030',
      'perp': '\u22A5',
      'Phi': '\u03A6',
      'phi': '\u03C6',
      'Pi': '\u03A0',
      'pi': '\u03C0',
      'piv': '\u03D6',
      'plusmn': '\u00B1',
      'pound': '\u00A3',
      'prime': '\u2032',
      'Prime': '\u2033',
      'prod': '\u220F',
      'prop': '\u221D',
      'Psi': '\u03A8',
      'psi': '\u03C8',
      'quot': '\u0022',
      'radic': '\u221A',
      'rang': '\u27E9',
      'raquo': '\u00BB',
      'rarr': '\u2192',
      'rArr': '\u21D2',
      'rceil': '\u2309',
      'rdquo': '\u201D',
      'real': '\u211C',
      'reg': '\u00AE',
      'rfloor': '\u230B',
      'Rho': '\u03A1',
      'rho': '\u03C1',
      'rlm': '\u200F',
      'rsaquo': '\u203A',
      'rsquo': '\u2019',
      'sbquo': '\u201A',
      'Scaron': '\u0160',
      'scaron': '\u0161',
      'sdot': '\u22C5',
      'sect': '\u00A7',
      'shy': '\u00AD',
      'Sigma': '\u03A3',
      'sigma': '\u03C3',
      'sigmaf': '\u03C2',
      'sim': '\u223C',
      'spades': '\u2660',
      'sub': '\u2282',
      'sube': '\u2286',
      'sum': '\u2211',
      'sup': '\u2283',
      'sup1': '\u00B9',
      'sup2': '\u00B2',
      'sup3': '\u00B3',
      'supe': '\u2287',
      'szlig': '\u00DF',
      'Tau': '\u03A4',
      'tau': '\u03C4',
      'there4': '\u2234',
      'Theta': '\u0398',
      'theta': '\u03B8',
      'thetasym': '\u03D1',
      'thinsp': '\u2009',
      'THORN': '\u00DE',
      'thorn': '\u00FE',
      'tilde': '\u02DC',
      'times': '\u00D7',
      'trade': '\u2122',
      'Uacute': '\u00DA',
      'uacute': '\u00FA',
      'uarr': '\u2191',
      'uArr': '\u21D1',
      'Ucirc': '\u00DB',
      'ucirc': '\u00FB',
      'Ugrave': '\u00D9',
      'ugrave': '\u00F9',
      'uml': '\u00A8',
      'upsih': '\u03D2',
      'Upsilon': '\u03A5',
      'upsilon': '\u03C5',
      'Uuml': '\u00DC',
      'uuml': '\u00FC',
      'weierp': '\u2118',
      'Xi': '\u039E',
      'xi': '\u03BE',
      'Yacute': '\u00DD',
      'yacute': '\u00FD',
      'yen': '\u00A5',
      'yuml': '\u00FF',
      'Yuml': '\u0178',
      'Zeta': '\u0396',
      'zeta': '\u03B6',
      'zwj': '\u200D',
      'zwnj': '\u200C'
    };
    var HtmlTagDefinition = (function() {
      function HtmlTagDefinition(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a,
            closedByChildren = _b.closedByChildren,
            requiredParents = _b.requiredParents,
            implicitNamespacePrefix = _b.implicitNamespacePrefix,
            _c = _b.contentType,
            contentType = _c === void 0 ? TagContentType.PARSABLE_DATA : _c,
            _d = _b.closedByParent,
            closedByParent = _d === void 0 ? false : _d,
            _e = _b.isVoid,
            isVoid = _e === void 0 ? false : _e,
            _f = _b.ignoreFirstLf,
            ignoreFirstLf = _f === void 0 ? false : _f;
        this.closedByChildren = {};
        this.closedByParent = false;
        this.canSelfClose = false;
        if (closedByChildren && closedByChildren.length > 0) {
          closedByChildren.forEach(function(tagName) {
            return _this.closedByChildren[tagName] = true;
          });
        }
        this.isVoid = isVoid;
        this.closedByParent = closedByParent || isVoid;
        if (requiredParents && requiredParents.length > 0) {
          this.requiredParents = {};
          this.parentToAdd = requiredParents[0];
          requiredParents.forEach(function(tagName) {
            return _this.requiredParents[tagName] = true;
          });
        }
        this.implicitNamespacePrefix = implicitNamespacePrefix;
        this.contentType = contentType;
        this.ignoreFirstLf = ignoreFirstLf;
      }
      HtmlTagDefinition.prototype.requireExtraParent = function(currentParent) {
        if (!this.requiredParents) {
          return false;
        }
        if (!currentParent) {
          return true;
        }
        var lcParent = currentParent.toLowerCase();
        return this.requiredParents[lcParent] != true && lcParent != 'template';
      };
      HtmlTagDefinition.prototype.isClosedByChild = function(name) {
        return this.isVoid || name.toLowerCase() in this.closedByChildren;
      };
      return HtmlTagDefinition;
    }());
    var TAG_DEFINITIONS = {
      'base': new HtmlTagDefinition({isVoid: true}),
      'meta': new HtmlTagDefinition({isVoid: true}),
      'area': new HtmlTagDefinition({isVoid: true}),
      'embed': new HtmlTagDefinition({isVoid: true}),
      'link': new HtmlTagDefinition({isVoid: true}),
      'img': new HtmlTagDefinition({isVoid: true}),
      'input': new HtmlTagDefinition({isVoid: true}),
      'param': new HtmlTagDefinition({isVoid: true}),
      'hr': new HtmlTagDefinition({isVoid: true}),
      'br': new HtmlTagDefinition({isVoid: true}),
      'source': new HtmlTagDefinition({isVoid: true}),
      'track': new HtmlTagDefinition({isVoid: true}),
      'wbr': new HtmlTagDefinition({isVoid: true}),
      'p': new HtmlTagDefinition({
        closedByChildren: ['address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'],
        closedByParent: true
      }),
      'thead': new HtmlTagDefinition({closedByChildren: ['tbody', 'tfoot']}),
      'tbody': new HtmlTagDefinition({
        closedByChildren: ['tbody', 'tfoot'],
        closedByParent: true
      }),
      'tfoot': new HtmlTagDefinition({
        closedByChildren: ['tbody'],
        closedByParent: true
      }),
      'tr': new HtmlTagDefinition({
        closedByChildren: ['tr'],
        requiredParents: ['tbody', 'tfoot', 'thead'],
        closedByParent: true
      }),
      'td': new HtmlTagDefinition({
        closedByChildren: ['td', 'th'],
        closedByParent: true
      }),
      'th': new HtmlTagDefinition({
        closedByChildren: ['td', 'th'],
        closedByParent: true
      }),
      'col': new HtmlTagDefinition({
        requiredParents: ['colgroup'],
        isVoid: true
      }),
      'svg': new HtmlTagDefinition({implicitNamespacePrefix: 'svg'}),
      'math': new HtmlTagDefinition({implicitNamespacePrefix: 'math'}),
      'li': new HtmlTagDefinition({
        closedByChildren: ['li'],
        closedByParent: true
      }),
      'dt': new HtmlTagDefinition({closedByChildren: ['dt', 'dd']}),
      'dd': new HtmlTagDefinition({
        closedByChildren: ['dt', 'dd'],
        closedByParent: true
      }),
      'rb': new HtmlTagDefinition({
        closedByChildren: ['rb', 'rt', 'rtc', 'rp'],
        closedByParent: true
      }),
      'rt': new HtmlTagDefinition({
        closedByChildren: ['rb', 'rt', 'rtc', 'rp'],
        closedByParent: true
      }),
      'rtc': new HtmlTagDefinition({
        closedByChildren: ['rb', 'rtc', 'rp'],
        closedByParent: true
      }),
      'rp': new HtmlTagDefinition({
        closedByChildren: ['rb', 'rt', 'rtc', 'rp'],
        closedByParent: true
      }),
      'optgroup': new HtmlTagDefinition({
        closedByChildren: ['optgroup'],
        closedByParent: true
      }),
      'option': new HtmlTagDefinition({
        closedByChildren: ['option', 'optgroup'],
        closedByParent: true
      }),
      'pre': new HtmlTagDefinition({ignoreFirstLf: true}),
      'listing': new HtmlTagDefinition({ignoreFirstLf: true}),
      'style': new HtmlTagDefinition({contentType: TagContentType.RAW_TEXT}),
      'script': new HtmlTagDefinition({contentType: TagContentType.RAW_TEXT}),
      'title': new HtmlTagDefinition({contentType: TagContentType.ESCAPABLE_RAW_TEXT}),
      'textarea': new HtmlTagDefinition({
        contentType: TagContentType.ESCAPABLE_RAW_TEXT,
        ignoreFirstLf: true
      })
    };
    var _DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
    function getHtmlTagDefinition(tagName) {
      return TAG_DEFINITIONS[tagName.toLowerCase()] || _DEFAULT_TAG_DEFINITION;
    }
    var _SELECTOR_REGEXP = new RegExp('(\\:not\\()|' + '([-\\w]+)|' + '(?:\\.([-\\w]+))|' + '(?:\\[([-.\\w*]+)(?:=([^\\]]*))?\\])|' + '(\\))|' + '(\\s*,\\s*)', 'g');
    var CssSelector = (function() {
      function CssSelector() {
        this.element = null;
        this.classNames = [];
        this.attrs = [];
        this.notSelectors = [];
      }
      CssSelector.parse = function(selector) {
        var results = [];
        var _addResult = function(res, cssSel) {
          if (cssSel.notSelectors.length > 0 && !cssSel.element && cssSel.classNames.length == 0 && cssSel.attrs.length == 0) {
            cssSel.element = '*';
          }
          res.push(cssSel);
        };
        var cssSelector = new CssSelector();
        var match;
        var current = cssSelector;
        var inNot = false;
        _SELECTOR_REGEXP.lastIndex = 0;
        while (match = _SELECTOR_REGEXP.exec(selector)) {
          if (match[1]) {
            if (inNot) {
              throw new Error('Nesting :not is not allowed in a selector');
            }
            inNot = true;
            current = new CssSelector();
            cssSelector.notSelectors.push(current);
          }
          if (match[2]) {
            current.setElement(match[2]);
          }
          if (match[3]) {
            current.addClassName(match[3]);
          }
          if (match[4]) {
            current.addAttribute(match[4], match[5]);
          }
          if (match[6]) {
            inNot = false;
            current = cssSelector;
          }
          if (match[7]) {
            if (inNot) {
              throw new Error('Multiple selectors in :not are not supported');
            }
            _addResult(results, cssSelector);
            cssSelector = current = new CssSelector();
          }
        }
        _addResult(results, cssSelector);
        return results;
      };
      CssSelector.prototype.isElementSelector = function() {
        return this.hasElementSelector() && this.classNames.length == 0 && this.attrs.length == 0 && this.notSelectors.length === 0;
      };
      CssSelector.prototype.hasElementSelector = function() {
        return !!this.element;
      };
      CssSelector.prototype.setElement = function(element) {
        if (element === void 0) {
          element = null;
        }
        this.element = element;
      };
      CssSelector.prototype.getMatchingElementTemplate = function() {
        var tagName = this.element || 'div';
        var classAttr = this.classNames.length > 0 ? " class=\"" + this.classNames.join(' ') + "\"" : '';
        var attrs = '';
        for (var i = 0; i < this.attrs.length; i += 2) {
          var attrName = this.attrs[i];
          var attrValue = this.attrs[i + 1] !== '' ? "=\"" + this.attrs[i + 1] + "\"" : '';
          attrs += " " + attrName + attrValue;
        }
        return getHtmlTagDefinition(tagName).isVoid ? "<" + tagName + classAttr + attrs + "/>" : "<" + tagName + classAttr + attrs + "></" + tagName + ">";
      };
      CssSelector.prototype.addAttribute = function(name, value) {
        if (value === void 0) {
          value = '';
        }
        this.attrs.push(name, value && value.toLowerCase() || '');
      };
      CssSelector.prototype.addClassName = function(name) {
        this.classNames.push(name.toLowerCase());
      };
      CssSelector.prototype.toString = function() {
        var res = this.element || '';
        if (this.classNames) {
          this.classNames.forEach(function(klass) {
            return res += "." + klass;
          });
        }
        if (this.attrs) {
          for (var i = 0; i < this.attrs.length; i += 2) {
            var name_1 = this.attrs[i];
            var value = this.attrs[i + 1];
            res += "[" + name_1 + (value ? '=' + value : '') + "]";
          }
        }
        this.notSelectors.forEach(function(notSelector) {
          return res += ":not(" + notSelector + ")";
        });
        return res;
      };
      return CssSelector;
    }());
    var SelectorMatcher = (function() {
      function SelectorMatcher() {
        this._elementMap = new Map();
        this._elementPartialMap = new Map();
        this._classMap = new Map();
        this._classPartialMap = new Map();
        this._attrValueMap = new Map();
        this._attrValuePartialMap = new Map();
        this._listContexts = [];
      }
      SelectorMatcher.createNotMatcher = function(notSelectors) {
        var notMatcher = new SelectorMatcher();
        notMatcher.addSelectables(notSelectors, null);
        return notMatcher;
      };
      SelectorMatcher.prototype.addSelectables = function(cssSelectors, callbackCtxt) {
        var listContext = null;
        if (cssSelectors.length > 1) {
          listContext = new SelectorListContext(cssSelectors);
          this._listContexts.push(listContext);
        }
        for (var i = 0; i < cssSelectors.length; i++) {
          this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
        }
      };
      SelectorMatcher.prototype._addSelectable = function(cssSelector, callbackCtxt, listContext) {
        var matcher = this;
        var element = cssSelector.element;
        var classNames = cssSelector.classNames;
        var attrs = cssSelector.attrs;
        var selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
        if (element) {
          var isTerminal = attrs.length === 0 && classNames.length === 0;
          if (isTerminal) {
            this._addTerminal(matcher._elementMap, element, selectable);
          } else {
            matcher = this._addPartial(matcher._elementPartialMap, element);
          }
        }
        if (classNames) {
          for (var i = 0; i < classNames.length; i++) {
            var isTerminal = attrs.length === 0 && i === classNames.length - 1;
            var className = classNames[i];
            if (isTerminal) {
              this._addTerminal(matcher._classMap, className, selectable);
            } else {
              matcher = this._addPartial(matcher._classPartialMap, className);
            }
          }
        }
        if (attrs) {
          for (var i = 0; i < attrs.length; i += 2) {
            var isTerminal = i === attrs.length - 2;
            var name_2 = attrs[i];
            var value = attrs[i + 1];
            if (isTerminal) {
              var terminalMap = matcher._attrValueMap;
              var terminalValuesMap = terminalMap.get(name_2);
              if (!terminalValuesMap) {
                terminalValuesMap = new Map();
                terminalMap.set(name_2, terminalValuesMap);
              }
              this._addTerminal(terminalValuesMap, value, selectable);
            } else {
              var partialMap = matcher._attrValuePartialMap;
              var partialValuesMap = partialMap.get(name_2);
              if (!partialValuesMap) {
                partialValuesMap = new Map();
                partialMap.set(name_2, partialValuesMap);
              }
              matcher = this._addPartial(partialValuesMap, value);
            }
          }
        }
      };
      SelectorMatcher.prototype._addTerminal = function(map, name, selectable) {
        var terminalList = map.get(name);
        if (!terminalList) {
          terminalList = [];
          map.set(name, terminalList);
        }
        terminalList.push(selectable);
      };
      SelectorMatcher.prototype._addPartial = function(map, name) {
        var matcher = map.get(name);
        if (!matcher) {
          matcher = new SelectorMatcher();
          map.set(name, matcher);
        }
        return matcher;
      };
      SelectorMatcher.prototype.match = function(cssSelector, matchedCallback) {
        var result = false;
        var element = cssSelector.element;
        var classNames = cssSelector.classNames;
        var attrs = cssSelector.attrs;
        for (var i = 0; i < this._listContexts.length; i++) {
          this._listContexts[i].alreadyMatched = false;
        }
        result = this._matchTerminal(this._elementMap, element, cssSelector, matchedCallback) || result;
        result = this._matchPartial(this._elementPartialMap, element, cssSelector, matchedCallback) || result;
        if (classNames) {
          for (var i = 0; i < classNames.length; i++) {
            var className = classNames[i];
            result = this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
            result = this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) || result;
          }
        }
        if (attrs) {
          for (var i = 0; i < attrs.length; i += 2) {
            var name_3 = attrs[i];
            var value = attrs[i + 1];
            var terminalValuesMap = this._attrValueMap.get(name_3);
            if (value) {
              result = this._matchTerminal(terminalValuesMap, '', cssSelector, matchedCallback) || result;
            }
            result = this._matchTerminal(terminalValuesMap, value, cssSelector, matchedCallback) || result;
            var partialValuesMap = this._attrValuePartialMap.get(name_3);
            if (value) {
              result = this._matchPartial(partialValuesMap, '', cssSelector, matchedCallback) || result;
            }
            result = this._matchPartial(partialValuesMap, value, cssSelector, matchedCallback) || result;
          }
        }
        return result;
      };
      SelectorMatcher.prototype._matchTerminal = function(map, name, cssSelector, matchedCallback) {
        if (!map || typeof name !== 'string') {
          return false;
        }
        var selectables = map.get(name) || [];
        var starSelectables = map.get('*');
        if (starSelectables) {
          selectables = selectables.concat(starSelectables);
        }
        if (selectables.length === 0) {
          return false;
        }
        var selectable;
        var result = false;
        for (var i = 0; i < selectables.length; i++) {
          selectable = selectables[i];
          result = selectable.finalize(cssSelector, matchedCallback) || result;
        }
        return result;
      };
      SelectorMatcher.prototype._matchPartial = function(map, name, cssSelector, matchedCallback) {
        if (!map || typeof name !== 'string') {
          return false;
        }
        var nestedSelector = map.get(name);
        if (!nestedSelector) {
          return false;
        }
        return nestedSelector.match(cssSelector, matchedCallback);
      };
      return SelectorMatcher;
    }());
    var SelectorListContext = (function() {
      function SelectorListContext(selectors) {
        this.selectors = selectors;
        this.alreadyMatched = false;
      }
      return SelectorListContext;
    }());
    var SelectorContext = (function() {
      function SelectorContext(selector, cbContext, listContext) {
        this.selector = selector;
        this.cbContext = cbContext;
        this.listContext = listContext;
        this.notSelectors = selector.notSelectors;
      }
      SelectorContext.prototype.finalize = function(cssSelector, callback) {
        var result = true;
        if (this.notSelectors.length > 0 && (!this.listContext || !this.listContext.alreadyMatched)) {
          var notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
          result = !notMatcher.match(cssSelector, null);
        }
        if (result && callback && (!this.listContext || !this.listContext.alreadyMatched)) {
          if (this.listContext) {
            this.listContext.alreadyMatched = true;
          }
          callback(this.selector, this.cbContext);
        }
        return result;
      };
      return SelectorContext;
    }());
    var __extends$3 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseError = (function(_super) {
      __extends$3(BaseError, _super);
      function BaseError(message) {
        _super.call(this, message);
        var nativeError = new Error(message);
        this._nativeError = nativeError;
      }
      Object.defineProperty(BaseError.prototype, "message", {
        get: function() {
          return this._nativeError.message;
        },
        set: function(message) {
          this._nativeError.message = message;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BaseError.prototype, "name", {
        get: function() {
          return this._nativeError.name;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BaseError.prototype, "stack", {
        get: function() {
          return ((this._nativeError)).stack;
        },
        set: function(value) {
          ((this._nativeError)).stack = value;
        },
        enumerable: true,
        configurable: true
      });
      BaseError.prototype.toString = function() {
        return this._nativeError.toString();
      };
      return BaseError;
    }(Error));
    var WrappedError = (function(_super) {
      __extends$3(WrappedError, _super);
      function WrappedError(message, error) {
        _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
        this.originalError = error;
      }
      Object.defineProperty(WrappedError.prototype, "stack", {
        get: function() {
          return (((this.originalError instanceof Error ? this.originalError : this._nativeError))).stack;
        },
        enumerable: true,
        configurable: true
      });
      return WrappedError;
    }(BaseError));
    var __extends$2 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var MODULE_SUFFIX = '';
    var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
    function dashCaseToCamelCase(input) {
      return input.replace(DASH_CASE_REGEXP, function() {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          m[_i - 0] = arguments[_i];
        }
        return m[1].toUpperCase();
      });
    }
    function splitAtColon(input, defaultValues) {
      return _splitAt(input, ':', defaultValues);
    }
    function splitAtPeriod(input, defaultValues) {
      return _splitAt(input, '.', defaultValues);
    }
    function _splitAt(input, character, defaultValues) {
      var characterIndex = input.indexOf(character);
      if (characterIndex == -1)
        return defaultValues;
      return [input.slice(0, characterIndex).trim(), input.slice(characterIndex + 1).trim()];
    }
    function visitValue(value, visitor, context) {
      if (Array.isArray(value)) {
        return visitor.visitArray((value), context);
      }
      if (isStrictStringMap(value)) {
        return visitor.visitStringMap((value), context);
      }
      if (value == null || isPrimitive(value)) {
        return visitor.visitPrimitive(value, context);
      }
      return visitor.visitOther(value, context);
    }
    var ValueTransformer = (function() {
      function ValueTransformer() {}
      ValueTransformer.prototype.visitArray = function(arr, context) {
        var _this = this;
        return arr.map(function(value) {
          return visitValue(value, _this, context);
        });
      };
      ValueTransformer.prototype.visitStringMap = function(map, context) {
        var _this = this;
        var result = {};
        Object.keys(map).forEach(function(key) {
          result[key] = visitValue(map[key], _this, context);
        });
        return result;
      };
      ValueTransformer.prototype.visitPrimitive = function(value, context) {
        return value;
      };
      ValueTransformer.prototype.visitOther = function(value, context) {
        return value;
      };
      return ValueTransformer;
    }());
    var SyncAsyncResult = (function() {
      function SyncAsyncResult(syncResult, asyncResult) {
        if (asyncResult === void 0) {
          asyncResult = null;
        }
        this.syncResult = syncResult;
        this.asyncResult = asyncResult;
        if (!asyncResult) {
          this.asyncResult = Promise.resolve(syncResult);
        }
      }
      return SyncAsyncResult;
    }());
    var SyntaxError = (function(_super) {
      __extends$2(SyntaxError, _super);
      function SyntaxError() {
        _super.apply(this, arguments);
      }
      return SyntaxError;
    }(BaseError));
    var __extends$1 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
    var CompileAnimationEntryMetadata = (function() {
      function CompileAnimationEntryMetadata(name, definitions) {
        if (name === void 0) {
          name = null;
        }
        if (definitions === void 0) {
          definitions = null;
        }
        this.name = name;
        this.definitions = definitions;
      }
      return CompileAnimationEntryMetadata;
    }());
    var CompileAnimationStateMetadata = (function() {
      function CompileAnimationStateMetadata() {}
      return CompileAnimationStateMetadata;
    }());
    var CompileAnimationStateDeclarationMetadata = (function(_super) {
      __extends$1(CompileAnimationStateDeclarationMetadata, _super);
      function CompileAnimationStateDeclarationMetadata(stateNameExpr, styles) {
        _super.call(this);
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
      }
      return CompileAnimationStateDeclarationMetadata;
    }(CompileAnimationStateMetadata));
    var CompileAnimationStateTransitionMetadata = (function(_super) {
      __extends$1(CompileAnimationStateTransitionMetadata, _super);
      function CompileAnimationStateTransitionMetadata(stateChangeExpr, steps) {
        _super.call(this);
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
      }
      return CompileAnimationStateTransitionMetadata;
    }(CompileAnimationStateMetadata));
    var CompileAnimationMetadata = (function() {
      function CompileAnimationMetadata() {}
      return CompileAnimationMetadata;
    }());
    var CompileAnimationKeyframesSequenceMetadata = (function(_super) {
      __extends$1(CompileAnimationKeyframesSequenceMetadata, _super);
      function CompileAnimationKeyframesSequenceMetadata(steps) {
        if (steps === void 0) {
          steps = [];
        }
        _super.call(this);
        this.steps = steps;
      }
      return CompileAnimationKeyframesSequenceMetadata;
    }(CompileAnimationMetadata));
    var CompileAnimationStyleMetadata = (function(_super) {
      __extends$1(CompileAnimationStyleMetadata, _super);
      function CompileAnimationStyleMetadata(offset, styles) {
        if (styles === void 0) {
          styles = null;
        }
        _super.call(this);
        this.offset = offset;
        this.styles = styles;
      }
      return CompileAnimationStyleMetadata;
    }(CompileAnimationMetadata));
    var CompileAnimationAnimateMetadata = (function(_super) {
      __extends$1(CompileAnimationAnimateMetadata, _super);
      function CompileAnimationAnimateMetadata(timings, styles) {
        if (timings === void 0) {
          timings = 0;
        }
        if (styles === void 0) {
          styles = null;
        }
        _super.call(this);
        this.timings = timings;
        this.styles = styles;
      }
      return CompileAnimationAnimateMetadata;
    }(CompileAnimationMetadata));
    var CompileAnimationWithStepsMetadata = (function(_super) {
      __extends$1(CompileAnimationWithStepsMetadata, _super);
      function CompileAnimationWithStepsMetadata(steps) {
        if (steps === void 0) {
          steps = null;
        }
        _super.call(this);
        this.steps = steps;
      }
      return CompileAnimationWithStepsMetadata;
    }(CompileAnimationMetadata));
    var CompileAnimationSequenceMetadata = (function(_super) {
      __extends$1(CompileAnimationSequenceMetadata, _super);
      function CompileAnimationSequenceMetadata(steps) {
        if (steps === void 0) {
          steps = null;
        }
        _super.call(this, steps);
      }
      return CompileAnimationSequenceMetadata;
    }(CompileAnimationWithStepsMetadata));
    var CompileAnimationGroupMetadata = (function(_super) {
      __extends$1(CompileAnimationGroupMetadata, _super);
      function CompileAnimationGroupMetadata(steps) {
        if (steps === void 0) {
          steps = null;
        }
        _super.call(this, steps);
      }
      return CompileAnimationGroupMetadata;
    }(CompileAnimationWithStepsMetadata));
    function _sanitizeIdentifier(name) {
      return name.replace(/\W/g, '_');
    }
    var _anonymousTypeIndex = 0;
    function identifierName(compileIdentifier) {
      if (!compileIdentifier || !compileIdentifier.reference) {
        return null;
      }
      var ref = compileIdentifier.reference;
      if (ref instanceof StaticSymbol) {
        return ref.name;
      }
      if (ref['__anonymousType']) {
        return ref['__anonymousType'];
      }
      var identifier = stringify(ref);
      if (identifier.indexOf('(') >= 0) {
        identifier = "anonymous_" + _anonymousTypeIndex++;
        ref['__anonymousType'] = identifier;
      } else {
        identifier = _sanitizeIdentifier(identifier);
      }
      return identifier;
    }
    function identifierModuleUrl(compileIdentifier) {
      var ref = compileIdentifier.reference;
      if (ref instanceof StaticSymbol) {
        return ref.filePath;
      }
      return reflector.importUri(ref);
    }
    var CompileSummaryKind = {};
    CompileSummaryKind.Pipe = 0;
    CompileSummaryKind.Directive = 1;
    CompileSummaryKind.NgModule = 2;
    CompileSummaryKind.Injectable = 3;
    CompileSummaryKind[CompileSummaryKind.Pipe] = "Pipe";
    CompileSummaryKind[CompileSummaryKind.Directive] = "Directive";
    CompileSummaryKind[CompileSummaryKind.NgModule] = "NgModule";
    CompileSummaryKind[CompileSummaryKind.Injectable] = "Injectable";
    function tokenName(token) {
      return isPresent(token.value) ? _sanitizeIdentifier(token.value) : identifierName(token.identifier);
    }
    function tokenReference(token) {
      if (isPresent(token.identifier)) {
        return token.identifier.reference;
      } else {
        return token.value;
      }
    }
    var CompileStylesheetMetadata = (function() {
      function CompileStylesheetMetadata(_a) {
        var _b = _a === void 0 ? {} : _a,
            moduleUrl = _b.moduleUrl,
            styles = _b.styles,
            styleUrls = _b.styleUrls;
        this.moduleUrl = moduleUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
      }
      return CompileStylesheetMetadata;
    }());
    var CompileTemplateMetadata = (function() {
      function CompileTemplateMetadata(_a) {
        var _b = _a === void 0 ? {} : _a,
            encapsulation = _b.encapsulation,
            template = _b.template,
            templateUrl = _b.templateUrl,
            styles = _b.styles,
            styleUrls = _b.styleUrls,
            externalStylesheets = _b.externalStylesheets,
            animations = _b.animations,
            ngContentSelectors = _b.ngContentSelectors,
            interpolation = _b.interpolation;
        this.encapsulation = encapsulation;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
        this.externalStylesheets = _normalizeArray(externalStylesheets);
        this.animations = animations ? ListWrapper.flatten(animations) : [];
        this.ngContentSelectors = ngContentSelectors || [];
        if (interpolation && interpolation.length != 2) {
          throw new Error("'interpolation' should have a start and an end symbol.");
        }
        this.interpolation = interpolation;
      }
      CompileTemplateMetadata.prototype.toSummary = function() {
        return {
          animations: this.animations.map(function(anim) {
            return anim.name;
          }),
          ngContentSelectors: this.ngContentSelectors,
          encapsulation: this.encapsulation
        };
      };
      return CompileTemplateMetadata;
    }());
    var CompileDirectiveMetadata = (function() {
      function CompileDirectiveMetadata(_a) {
        var _b = _a === void 0 ? {} : _a,
            isHost = _b.isHost,
            type = _b.type,
            isComponent = _b.isComponent,
            selector = _b.selector,
            exportAs = _b.exportAs,
            changeDetection = _b.changeDetection,
            inputs = _b.inputs,
            outputs = _b.outputs,
            hostListeners = _b.hostListeners,
            hostProperties = _b.hostProperties,
            hostAttributes = _b.hostAttributes,
            providers = _b.providers,
            viewProviders = _b.viewProviders,
            queries = _b.queries,
            viewQueries = _b.viewQueries,
            entryComponents = _b.entryComponents,
            template = _b.template;
        this.isHost = !!isHost;
        this.type = type;
        this.isComponent = isComponent;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.providers = _normalizeArray(providers);
        this.viewProviders = _normalizeArray(viewProviders);
        this.queries = _normalizeArray(queries);
        this.viewQueries = _normalizeArray(viewQueries);
        this.entryComponents = _normalizeArray(entryComponents);
        this.template = template;
      }
      CompileDirectiveMetadata.create = function(_a) {
        var _b = _a === void 0 ? {} : _a,
            isHost = _b.isHost,
            type = _b.type,
            isComponent = _b.isComponent,
            selector = _b.selector,
            exportAs = _b.exportAs,
            changeDetection = _b.changeDetection,
            inputs = _b.inputs,
            outputs = _b.outputs,
            host = _b.host,
            providers = _b.providers,
            viewProviders = _b.viewProviders,
            queries = _b.queries,
            viewQueries = _b.viewQueries,
            entryComponents = _b.entryComponents,
            template = _b.template;
        var hostListeners = {};
        var hostProperties = {};
        var hostAttributes = {};
        if (isPresent(host)) {
          Object.keys(host).forEach(function(key) {
            var value = host[key];
            var matches = key.match(HOST_REG_EXP);
            if (matches === null) {
              hostAttributes[key] = value;
            } else if (isPresent(matches[1])) {
              hostProperties[matches[1]] = value;
            } else if (isPresent(matches[2])) {
              hostListeners[matches[2]] = value;
            }
          });
        }
        var inputsMap = {};
        if (isPresent(inputs)) {
          inputs.forEach(function(bindConfig) {
            var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
            inputsMap[parts[0]] = parts[1];
          });
        }
        var outputsMap = {};
        if (isPresent(outputs)) {
          outputs.forEach(function(bindConfig) {
            var parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
            outputsMap[parts[0]] = parts[1];
          });
        }
        return new CompileDirectiveMetadata({
          isHost: isHost,
          type: type,
          isComponent: !!isComponent,
          selector: selector,
          exportAs: exportAs,
          changeDetection: changeDetection,
          inputs: inputsMap,
          outputs: outputsMap,
          hostListeners: hostListeners,
          hostProperties: hostProperties,
          hostAttributes: hostAttributes,
          providers: providers,
          viewProviders: viewProviders,
          queries: queries,
          viewQueries: viewQueries,
          entryComponents: entryComponents,
          template: template
        });
      };
      CompileDirectiveMetadata.prototype.toSummary = function() {
        return {
          summaryKind: CompileSummaryKind.Directive,
          type: this.type,
          isComponent: this.isComponent,
          selector: this.selector,
          exportAs: this.exportAs,
          inputs: this.inputs,
          outputs: this.outputs,
          hostListeners: this.hostListeners,
          hostProperties: this.hostProperties,
          hostAttributes: this.hostAttributes,
          providers: this.providers,
          viewProviders: this.viewProviders,
          queries: this.queries,
          entryComponents: this.entryComponents,
          changeDetection: this.changeDetection,
          template: this.template && this.template.toSummary()
        };
      };
      return CompileDirectiveMetadata;
    }());
    function createHostComponentMeta(typeReference, compMeta) {
      var template = CssSelector.parse(compMeta.selector)[0].getMatchingElementTemplate();
      return CompileDirectiveMetadata.create({
        isHost: true,
        type: {
          reference: typeReference,
          diDeps: [],
          lifecycleHooks: []
        },
        template: new CompileTemplateMetadata({
          encapsulation: _angular_core.ViewEncapsulation.None,
          template: template,
          templateUrl: '',
          styles: [],
          styleUrls: [],
          ngContentSelectors: [],
          animations: []
        }),
        changeDetection: _angular_core.ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        isComponent: true,
        selector: '*',
        providers: [],
        viewProviders: [],
        queries: [],
        viewQueries: []
      });
    }
    var CompilePipeMetadata = (function() {
      function CompilePipeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a,
            type = _b.type,
            name = _b.name,
            pure = _b.pure;
        this.type = type;
        this.name = name;
        this.pure = !!pure;
      }
      CompilePipeMetadata.prototype.toSummary = function() {
        return {
          summaryKind: CompileSummaryKind.Pipe,
          type: this.type,
          name: this.name,
          pure: this.pure
        };
      };
      return CompilePipeMetadata;
    }());
    var CompileNgModuleMetadata = (function() {
      function CompileNgModuleMetadata(_a) {
        var _b = _a === void 0 ? {} : _a,
            type = _b.type,
            providers = _b.providers,
            declaredDirectives = _b.declaredDirectives,
            exportedDirectives = _b.exportedDirectives,
            declaredPipes = _b.declaredPipes,
            exportedPipes = _b.exportedPipes,
            entryComponents = _b.entryComponents,
            bootstrapComponents = _b.bootstrapComponents,
            importedModules = _b.importedModules,
            exportedModules = _b.exportedModules,
            schemas = _b.schemas,
            transitiveModule = _b.transitiveModule,
            id = _b.id;
        this.type = type;
        this.declaredDirectives = _normalizeArray(declaredDirectives);
        this.exportedDirectives = _normalizeArray(exportedDirectives);
        this.declaredPipes = _normalizeArray(declaredPipes);
        this.exportedPipes = _normalizeArray(exportedPipes);
        this.providers = _normalizeArray(providers);
        this.entryComponents = _normalizeArray(entryComponents);
        this.bootstrapComponents = _normalizeArray(bootstrapComponents);
        this.importedModules = _normalizeArray(importedModules);
        this.exportedModules = _normalizeArray(exportedModules);
        this.schemas = _normalizeArray(schemas);
        this.id = id;
        this.transitiveModule = transitiveModule;
      }
      CompileNgModuleMetadata.prototype.toSummary = function() {
        return {
          summaryKind: CompileSummaryKind.NgModule,
          type: this.type,
          entryComponents: this.transitiveModule.entryComponents,
          providers: this.transitiveModule.providers,
          modules: this.transitiveModule.modules,
          exportedDirectives: this.transitiveModule.exportedDirectives,
          exportedPipes: this.transitiveModule.exportedPipes
        };
      };
      return CompileNgModuleMetadata;
    }());
    var TransitiveCompileNgModuleMetadata = (function() {
      function TransitiveCompileNgModuleMetadata() {
        this.directivesSet = new Set();
        this.directives = [];
        this.exportedDirectivesSet = new Set();
        this.exportedDirectives = [];
        this.pipesSet = new Set();
        this.pipes = [];
        this.exportedPipesSet = new Set();
        this.exportedPipes = [];
        this.modulesSet = new Set();
        this.modules = [];
        this.entryComponentsSet = new Set();
        this.entryComponents = [];
        this.providers = [];
      }
      TransitiveCompileNgModuleMetadata.prototype.addProvider = function(provider, module) {
        this.providers.push({
          provider: provider,
          module: module
        });
      };
      TransitiveCompileNgModuleMetadata.prototype.addDirective = function(id) {
        if (!this.directivesSet.has(id.reference)) {
          this.directivesSet.add(id.reference);
          this.directives.push(id);
        }
      };
      TransitiveCompileNgModuleMetadata.prototype.addExportedDirective = function(id) {
        if (!this.exportedDirectivesSet.has(id.reference)) {
          this.exportedDirectivesSet.add(id.reference);
          this.exportedDirectives.push(id);
        }
      };
      TransitiveCompileNgModuleMetadata.prototype.addPipe = function(id) {
        if (!this.pipesSet.has(id.reference)) {
          this.pipesSet.add(id.reference);
          this.pipes.push(id);
        }
      };
      TransitiveCompileNgModuleMetadata.prototype.addExportedPipe = function(id) {
        if (!this.exportedPipesSet.has(id.reference)) {
          this.exportedPipesSet.add(id.reference);
          this.exportedPipes.push(id);
        }
      };
      TransitiveCompileNgModuleMetadata.prototype.addModule = function(id) {
        if (!this.modulesSet.has(id.reference)) {
          this.modulesSet.add(id.reference);
          this.modules.push(id);
        }
      };
      TransitiveCompileNgModuleMetadata.prototype.addEntryComponent = function(id) {
        if (!this.entryComponentsSet.has(id.reference)) {
          this.entryComponentsSet.add(id.reference);
          this.entryComponents.push(id);
        }
      };
      return TransitiveCompileNgModuleMetadata;
    }());
    function _normalizeArray(obj) {
      return obj || [];
    }
    var ProviderMeta = (function() {
      function ProviderMeta(token, _a) {
        var useClass = _a.useClass,
            useValue = _a.useValue,
            useExisting = _a.useExisting,
            useFactory = _a.useFactory,
            deps = _a.deps,
            multi = _a.multi;
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.dependencies = deps;
        this.multi = !!multi;
      }
      return ProviderMeta;
    }());
    var $EOF = 0;
    var $TAB = 9;
    var $LF = 10;
    var $VTAB = 11;
    var $FF = 12;
    var $CR = 13;
    var $SPACE = 32;
    var $BANG = 33;
    var $DQ = 34;
    var $HASH = 35;
    var $$ = 36;
    var $PERCENT = 37;
    var $AMPERSAND = 38;
    var $SQ = 39;
    var $LPAREN = 40;
    var $RPAREN = 41;
    var $STAR = 42;
    var $PLUS = 43;
    var $COMMA = 44;
    var $MINUS = 45;
    var $PERIOD = 46;
    var $SLASH = 47;
    var $COLON = 58;
    var $SEMICOLON = 59;
    var $LT = 60;
    var $EQ = 61;
    var $GT = 62;
    var $QUESTION = 63;
    var $0 = 48;
    var $9 = 57;
    var $A = 65;
    var $E = 69;
    var $F = 70;
    var $X = 88;
    var $Z = 90;
    var $LBRACKET = 91;
    var $BACKSLASH = 92;
    var $RBRACKET = 93;
    var $CARET = 94;
    var $_ = 95;
    var $a = 97;
    var $e = 101;
    var $f = 102;
    var $n = 110;
    var $r = 114;
    var $t = 116;
    var $u = 117;
    var $v = 118;
    var $x = 120;
    var $z = 122;
    var $LBRACE = 123;
    var $BAR = 124;
    var $RBRACE = 125;
    var $NBSP = 160;
    var $BT = 96;
    function isWhitespace(code) {
      return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
    }
    function isDigit(code) {
      return $0 <= code && code <= $9;
    }
    function isAsciiLetter(code) {
      return code >= $a && code <= $z || code >= $A && code <= $Z;
    }
    function isAsciiHexDigit(code) {
      return code >= $a && code <= $f || code >= $A && code <= $F || isDigit(code);
    }
    function CompilerInjectable() {
      return function(x) {
        return x;
      };
    }
    function assertArrayOfStrings(identifier, value) {
      if (!_angular_core.isDevMode() || isBlank(value)) {
        return;
      }
      if (!Array.isArray(value)) {
        throw new Error("Expected '" + identifier + "' to be an array of strings.");
      }
      for (var i = 0; i < value.length; i += 1) {
        if (typeof value[i] !== 'string') {
          throw new Error("Expected '" + identifier + "' to be an array of strings.");
        }
      }
    }
    var INTERPOLATION_BLACKLIST_REGEXPS = [/^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
    function assertInterpolationSymbols(identifier, value) {
      if (isPresent(value) && !(Array.isArray(value) && value.length == 2)) {
        throw new Error("Expected '" + identifier + "' to be an array, [start, end].");
      } else if (_angular_core.isDevMode() && !isBlank(value)) {
        var start_1 = (value[0]);
        var end_1 = (value[1]);
        INTERPOLATION_BLACKLIST_REGEXPS.forEach(function(regexp) {
          if (regexp.test(start_1) || regexp.test(end_1)) {
            throw new Error("['" + start_1 + "', '" + end_1 + "'] contains unusable interpolation symbol.");
          }
        });
      }
    }
    var InterpolationConfig = (function() {
      function InterpolationConfig(start, end) {
        this.start = start;
        this.end = end;
      }
      InterpolationConfig.fromArray = function(markers) {
        if (!markers) {
          return DEFAULT_INTERPOLATION_CONFIG;
        }
        assertInterpolationSymbols('interpolation', markers);
        return new InterpolationConfig(markers[0], markers[1]);
      };
      ;
      return InterpolationConfig;
    }());
    var DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig('{{', '}}');
    var __extends$4 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ParserError = (function() {
      function ParserError(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation;
      }
      return ParserError;
    }());
    var ParseSpan = (function() {
      function ParseSpan(start, end) {
        this.start = start;
        this.end = end;
      }
      return ParseSpan;
    }());
    var AST = (function() {
      function AST(span) {
        this.span = span;
      }
      AST.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return null;
      };
      AST.prototype.toString = function() {
        return 'AST';
      };
      return AST;
    }());
    var Quote = (function(_super) {
      __extends$4(Quote, _super);
      function Quote(span, prefix, uninterpretedExpression, location) {
        _super.call(this, span);
        this.prefix = prefix;
        this.uninterpretedExpression = uninterpretedExpression;
        this.location = location;
      }
      Quote.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitQuote(this, context);
      };
      Quote.prototype.toString = function() {
        return 'Quote';
      };
      return Quote;
    }(AST));
    var EmptyExpr = (function(_super) {
      __extends$4(EmptyExpr, _super);
      function EmptyExpr() {
        _super.apply(this, arguments);
      }
      EmptyExpr.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
      };
      return EmptyExpr;
    }(AST));
    var ImplicitReceiver = (function(_super) {
      __extends$4(ImplicitReceiver, _super);
      function ImplicitReceiver() {
        _super.apply(this, arguments);
      }
      ImplicitReceiver.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitImplicitReceiver(this, context);
      };
      return ImplicitReceiver;
    }(AST));
    var Chain = (function(_super) {
      __extends$4(Chain, _super);
      function Chain(span, expressions) {
        _super.call(this, span);
        this.expressions = expressions;
      }
      Chain.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitChain(this, context);
      };
      return Chain;
    }(AST));
    var Conditional = (function(_super) {
      __extends$4(Conditional, _super);
      function Conditional(span, condition, trueExp, falseExp) {
        _super.call(this, span);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
      }
      Conditional.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitConditional(this, context);
      };
      return Conditional;
    }(AST));
    var PropertyRead = (function(_super) {
      __extends$4(PropertyRead, _super);
      function PropertyRead(span, receiver, name) {
        _super.call(this, span);
        this.receiver = receiver;
        this.name = name;
      }
      PropertyRead.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitPropertyRead(this, context);
      };
      return PropertyRead;
    }(AST));
    var PropertyWrite = (function(_super) {
      __extends$4(PropertyWrite, _super);
      function PropertyWrite(span, receiver, name, value) {
        _super.call(this, span);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
      }
      PropertyWrite.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitPropertyWrite(this, context);
      };
      return PropertyWrite;
    }(AST));
    var SafePropertyRead = (function(_super) {
      __extends$4(SafePropertyRead, _super);
      function SafePropertyRead(span, receiver, name) {
        _super.call(this, span);
        this.receiver = receiver;
        this.name = name;
      }
      SafePropertyRead.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitSafePropertyRead(this, context);
      };
      return SafePropertyRead;
    }(AST));
    var KeyedRead = (function(_super) {
      __extends$4(KeyedRead, _super);
      function KeyedRead(span, obj, key) {
        _super.call(this, span);
        this.obj = obj;
        this.key = key;
      }
      KeyedRead.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitKeyedRead(this, context);
      };
      return KeyedRead;
    }(AST));
    var KeyedWrite = (function(_super) {
      __extends$4(KeyedWrite, _super);
      function KeyedWrite(span, obj, key, value) {
        _super.call(this, span);
        this.obj = obj;
        this.key = key;
        this.value = value;
      }
      KeyedWrite.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitKeyedWrite(this, context);
      };
      return KeyedWrite;
    }(AST));
    var BindingPipe = (function(_super) {
      __extends$4(BindingPipe, _super);
      function BindingPipe(span, exp, name, args) {
        _super.call(this, span);
        this.exp = exp;
        this.name = name;
        this.args = args;
      }
      BindingPipe.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitPipe(this, context);
      };
      return BindingPipe;
    }(AST));
    var LiteralPrimitive = (function(_super) {
      __extends$4(LiteralPrimitive, _super);
      function LiteralPrimitive(span, value) {
        _super.call(this, span);
        this.value = value;
      }
      LiteralPrimitive.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitLiteralPrimitive(this, context);
      };
      return LiteralPrimitive;
    }(AST));
    var LiteralArray = (function(_super) {
      __extends$4(LiteralArray, _super);
      function LiteralArray(span, expressions) {
        _super.call(this, span);
        this.expressions = expressions;
      }
      LiteralArray.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitLiteralArray(this, context);
      };
      return LiteralArray;
    }(AST));
    var LiteralMap = (function(_super) {
      __extends$4(LiteralMap, _super);
      function LiteralMap(span, keys, values) {
        _super.call(this, span);
        this.keys = keys;
        this.values = values;
      }
      LiteralMap.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitLiteralMap(this, context);
      };
      return LiteralMap;
    }(AST));
    var Interpolation = (function(_super) {
      __extends$4(Interpolation, _super);
      function Interpolation(span, strings, expressions) {
        _super.call(this, span);
        this.strings = strings;
        this.expressions = expressions;
      }
      Interpolation.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitInterpolation(this, context);
      };
      return Interpolation;
    }(AST));
    var Binary = (function(_super) {
      __extends$4(Binary, _super);
      function Binary(span, operation, left, right) {
        _super.call(this, span);
        this.operation = operation;
        this.left = left;
        this.right = right;
      }
      Binary.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitBinary(this, context);
      };
      return Binary;
    }(AST));
    var PrefixNot = (function(_super) {
      __extends$4(PrefixNot, _super);
      function PrefixNot(span, expression) {
        _super.call(this, span);
        this.expression = expression;
      }
      PrefixNot.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitPrefixNot(this, context);
      };
      return PrefixNot;
    }(AST));
    var MethodCall = (function(_super) {
      __extends$4(MethodCall, _super);
      function MethodCall(span, receiver, name, args) {
        _super.call(this, span);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
      }
      MethodCall.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitMethodCall(this, context);
      };
      return MethodCall;
    }(AST));
    var SafeMethodCall = (function(_super) {
      __extends$4(SafeMethodCall, _super);
      function SafeMethodCall(span, receiver, name, args) {
        _super.call(this, span);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
      }
      SafeMethodCall.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitSafeMethodCall(this, context);
      };
      return SafeMethodCall;
    }(AST));
    var FunctionCall = (function(_super) {
      __extends$4(FunctionCall, _super);
      function FunctionCall(span, target, args) {
        _super.call(this, span);
        this.target = target;
        this.args = args;
      }
      FunctionCall.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return visitor.visitFunctionCall(this, context);
      };
      return FunctionCall;
    }(AST));
    var ASTWithSource = (function(_super) {
      __extends$4(ASTWithSource, _super);
      function ASTWithSource(ast, source, location, errors) {
        _super.call(this, new ParseSpan(0, isBlank(source) ? 0 : source.length));
        this.ast = ast;
        this.source = source;
        this.location = location;
        this.errors = errors;
      }
      ASTWithSource.prototype.visit = function(visitor, context) {
        if (context === void 0) {
          context = null;
        }
        return this.ast.visit(visitor, context);
      };
      ASTWithSource.prototype.toString = function() {
        return this.source + " in " + this.location;
      };
      return ASTWithSource;
    }(AST));
    var TemplateBinding = (function() {
      function TemplateBinding(span, key, keyIsVar, name, expression) {
        this.span = span;
        this.key = key;
        this.keyIsVar = keyIsVar;
        this.name = name;
        this.expression = expression;
      }
      return TemplateBinding;
    }());
    var RecursiveAstVisitor = (function() {
      function RecursiveAstVisitor() {}
      RecursiveAstVisitor.prototype.visitBinary = function(ast, context) {
        ast.left.visit(this);
        ast.right.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitChain = function(ast, context) {
        return this.visitAll(ast.expressions, context);
      };
      RecursiveAstVisitor.prototype.visitConditional = function(ast, context) {
        ast.condition.visit(this);
        ast.trueExp.visit(this);
        ast.falseExp.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitPipe = function(ast, context) {
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
      };
      RecursiveAstVisitor.prototype.visitFunctionCall = function(ast, context) {
        ast.target.visit(this);
        this.visitAll(ast.args, context);
        return null;
      };
      RecursiveAstVisitor.prototype.visitImplicitReceiver = function(ast, context) {
        return null;
      };
      RecursiveAstVisitor.prototype.visitInterpolation = function(ast, context) {
        return this.visitAll(ast.expressions, context);
      };
      RecursiveAstVisitor.prototype.visitKeyedRead = function(ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitKeyedWrite = function(ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        ast.value.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitLiteralArray = function(ast, context) {
        return this.visitAll(ast.expressions, context);
      };
      RecursiveAstVisitor.prototype.visitLiteralMap = function(ast, context) {
        return this.visitAll(ast.values, context);
      };
      RecursiveAstVisitor.prototype.visitLiteralPrimitive = function(ast, context) {
        return null;
      };
      RecursiveAstVisitor.prototype.visitMethodCall = function(ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
      };
      RecursiveAstVisitor.prototype.visitPrefixNot = function(ast, context) {
        ast.expression.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitPropertyRead = function(ast, context) {
        ast.receiver.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitPropertyWrite = function(ast, context) {
        ast.receiver.visit(this);
        ast.value.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitSafePropertyRead = function(ast, context) {
        ast.receiver.visit(this);
        return null;
      };
      RecursiveAstVisitor.prototype.visitSafeMethodCall = function(ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
      };
      RecursiveAstVisitor.prototype.visitAll = function(asts, context) {
        var _this = this;
        asts.forEach(function(ast) {
          return ast.visit(_this, context);
        });
        return null;
      };
      RecursiveAstVisitor.prototype.visitQuote = function(ast, context) {
        return null;
      };
      return RecursiveAstVisitor;
    }());
    var __decorate$2 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var TokenType = {};
    TokenType.Character = 0;
    TokenType.Identifier = 1;
    TokenType.Keyword = 2;
    TokenType.String = 3;
    TokenType.Operator = 4;
    TokenType.Number = 5;
    TokenType.Error = 6;
    TokenType[TokenType.Character] = "Character";
    TokenType[TokenType.Identifier] = "Identifier";
    TokenType[TokenType.Keyword] = "Keyword";
    TokenType[TokenType.String] = "String";
    TokenType[TokenType.Operator] = "Operator";
    TokenType[TokenType.Number] = "Number";
    TokenType[TokenType.Error] = "Error";
    var KEYWORDS = ['var', 'let', 'null', 'undefined', 'true', 'false', 'if', 'else', 'this'];
    var Lexer = (function() {
      function Lexer() {}
      Lexer.prototype.tokenize = function(text) {
        var scanner = new _Scanner(text);
        var tokens = [];
        var token = scanner.scanToken();
        while (token != null) {
          tokens.push(token);
          token = scanner.scanToken();
        }
        return tokens;
      };
      Lexer = __decorate$2([CompilerInjectable(), __metadata$2('design:paramtypes', [])], Lexer);
      return Lexer;
    }());
    var Token = (function() {
      function Token(index, type, numValue, strValue) {
        this.index = index;
        this.type = type;
        this.numValue = numValue;
        this.strValue = strValue;
      }
      Token.prototype.isCharacter = function(code) {
        return this.type == TokenType.Character && this.numValue == code;
      };
      Token.prototype.isNumber = function() {
        return this.type == TokenType.Number;
      };
      Token.prototype.isString = function() {
        return this.type == TokenType.String;
      };
      Token.prototype.isOperator = function(operater) {
        return this.type == TokenType.Operator && this.strValue == operater;
      };
      Token.prototype.isIdentifier = function() {
        return this.type == TokenType.Identifier;
      };
      Token.prototype.isKeyword = function() {
        return this.type == TokenType.Keyword;
      };
      Token.prototype.isKeywordLet = function() {
        return this.type == TokenType.Keyword && this.strValue == 'let';
      };
      Token.prototype.isKeywordNull = function() {
        return this.type == TokenType.Keyword && this.strValue == 'null';
      };
      Token.prototype.isKeywordUndefined = function() {
        return this.type == TokenType.Keyword && this.strValue == 'undefined';
      };
      Token.prototype.isKeywordTrue = function() {
        return this.type == TokenType.Keyword && this.strValue == 'true';
      };
      Token.prototype.isKeywordFalse = function() {
        return this.type == TokenType.Keyword && this.strValue == 'false';
      };
      Token.prototype.isKeywordThis = function() {
        return this.type == TokenType.Keyword && this.strValue == 'this';
      };
      Token.prototype.isError = function() {
        return this.type == TokenType.Error;
      };
      Token.prototype.toNumber = function() {
        return this.type == TokenType.Number ? this.numValue : -1;
      };
      Token.prototype.toString = function() {
        switch (this.type) {
          case TokenType.Character:
          case TokenType.Identifier:
          case TokenType.Keyword:
          case TokenType.Operator:
          case TokenType.String:
          case TokenType.Error:
            return this.strValue;
          case TokenType.Number:
            return this.numValue.toString();
          default:
            return null;
        }
      };
      return Token;
    }());
    function newCharacterToken(index, code) {
      return new Token(index, TokenType.Character, code, String.fromCharCode(code));
    }
    function newIdentifierToken(index, text) {
      return new Token(index, TokenType.Identifier, 0, text);
    }
    function newKeywordToken(index, text) {
      return new Token(index, TokenType.Keyword, 0, text);
    }
    function newOperatorToken(index, text) {
      return new Token(index, TokenType.Operator, 0, text);
    }
    function newStringToken(index, text) {
      return new Token(index, TokenType.String, 0, text);
    }
    function newNumberToken(index, n) {
      return new Token(index, TokenType.Number, n, '');
    }
    function newErrorToken(index, message) {
      return new Token(index, TokenType.Error, 0, message);
    }
    var EOF = new Token(-1, TokenType.Character, 0, '');
    var _Scanner = (function() {
      function _Scanner(input) {
        this.input = input;
        this.peek = 0;
        this.index = -1;
        this.length = input.length;
        this.advance();
      }
      _Scanner.prototype.advance = function() {
        this.peek = ++this.index >= this.length ? $EOF : this.input.charCodeAt(this.index);
      };
      _Scanner.prototype.scanToken = function() {
        var input = this.input,
            length = this.length;
        var peek = this.peek,
            index = this.index;
        while (peek <= $SPACE) {
          if (++index >= length) {
            peek = $EOF;
            break;
          } else {
            peek = input.charCodeAt(index);
          }
        }
        this.peek = peek;
        this.index = index;
        if (index >= length) {
          return null;
        }
        if (isIdentifierStart(peek))
          return this.scanIdentifier();
        if (isDigit(peek))
          return this.scanNumber(index);
        var start = index;
        switch (peek) {
          case $PERIOD:
            this.advance();
            return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, $PERIOD);
          case $LPAREN:
          case $RPAREN:
          case $LBRACE:
          case $RBRACE:
          case $LBRACKET:
          case $RBRACKET:
          case $COMMA:
          case $COLON:
          case $SEMICOLON:
            return this.scanCharacter(start, peek);
          case $SQ:
          case $DQ:
            return this.scanString();
          case $HASH:
          case $PLUS:
          case $MINUS:
          case $STAR:
          case $SLASH:
          case $PERCENT:
          case $CARET:
            return this.scanOperator(start, String.fromCharCode(peek));
          case $QUESTION:
            return this.scanComplexOperator(start, '?', $PERIOD, '.');
          case $LT:
          case $GT:
            return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, '=');
          case $BANG:
          case $EQ:
            return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, '=', $EQ, '=');
          case $AMPERSAND:
            return this.scanComplexOperator(start, '&', $AMPERSAND, '&');
          case $BAR:
            return this.scanComplexOperator(start, '|', $BAR, '|');
          case $NBSP:
            while (isWhitespace(this.peek))
              this.advance();
            return this.scanToken();
        }
        this.advance();
        return this.error("Unexpected character [" + String.fromCharCode(peek) + "]", 0);
      };
      _Scanner.prototype.scanCharacter = function(start, code) {
        this.advance();
        return newCharacterToken(start, code);
      };
      _Scanner.prototype.scanOperator = function(start, str) {
        this.advance();
        return newOperatorToken(start, str);
      };
      _Scanner.prototype.scanComplexOperator = function(start, one, twoCode, two, threeCode, three) {
        this.advance();
        var str = one;
        if (this.peek == twoCode) {
          this.advance();
          str += two;
        }
        if (threeCode != null && this.peek == threeCode) {
          this.advance();
          str += three;
        }
        return newOperatorToken(start, str);
      };
      _Scanner.prototype.scanIdentifier = function() {
        var start = this.index;
        this.advance();
        while (isIdentifierPart(this.peek))
          this.advance();
        var str = this.input.substring(start, this.index);
        return KEYWORDS.indexOf(str) > -1 ? newKeywordToken(start, str) : newIdentifierToken(start, str);
      };
      _Scanner.prototype.scanNumber = function(start) {
        var simple = (this.index === start);
        this.advance();
        while (true) {
          if (isDigit(this.peek)) {} else if (this.peek == $PERIOD) {
            simple = false;
          } else if (isExponentStart(this.peek)) {
            this.advance();
            if (isExponentSign(this.peek))
              this.advance();
            if (!isDigit(this.peek))
              return this.error('Invalid exponent', -1);
            simple = false;
          } else {
            break;
          }
          this.advance();
        }
        var str = this.input.substring(start, this.index);
        var value = simple ? NumberWrapper.parseIntAutoRadix(str) : parseFloat(str);
        return newNumberToken(start, value);
      };
      _Scanner.prototype.scanString = function() {
        var start = this.index;
        var quote = this.peek;
        this.advance();
        var buffer = '';
        var marker = this.index;
        var input = this.input;
        while (this.peek != quote) {
          if (this.peek == $BACKSLASH) {
            buffer += input.substring(marker, this.index);
            this.advance();
            var unescapedCode = void 0;
            if (this.peek == $u) {
              var hex = input.substring(this.index + 1, this.index + 5);
              if (/^[0-9a-f]+$/i.test(hex)) {
                unescapedCode = parseInt(hex, 16);
              } else {
                return this.error("Invalid unicode escape [\\u" + hex + "]", 0);
              }
              for (var i = 0; i < 5; i++) {
                this.advance();
              }
            } else {
              unescapedCode = unescape(this.peek);
              this.advance();
            }
            buffer += String.fromCharCode(unescapedCode);
            marker = this.index;
          } else if (this.peek == $EOF) {
            return this.error('Unterminated quote', 0);
          } else {
            this.advance();
          }
        }
        var last = input.substring(marker, this.index);
        this.advance();
        return newStringToken(start, buffer + last);
      };
      _Scanner.prototype.error = function(message, offset) {
        var position = this.index + offset;
        return newErrorToken(position, "Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]");
      };
      return _Scanner;
    }());
    function isIdentifierStart(code) {
      return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == $$);
    }
    function isIdentifier(input) {
      if (input.length == 0)
        return false;
      var scanner = new _Scanner(input);
      if (!isIdentifierStart(scanner.peek))
        return false;
      scanner.advance();
      while (scanner.peek !== $EOF) {
        if (!isIdentifierPart(scanner.peek))
          return false;
        scanner.advance();
      }
      return true;
    }
    function isIdentifierPart(code) {
      return isAsciiLetter(code) || isDigit(code) || (code == $_) || (code == $$);
    }
    function isExponentStart(code) {
      return code == $e || code == $E;
    }
    function isExponentSign(code) {
      return code == $MINUS || code == $PLUS;
    }
    function isQuote(code) {
      return code === $SQ || code === $DQ || code === $BT;
    }
    function unescape(code) {
      switch (code) {
        case $n:
          return $LF;
        case $f:
          return $FF;
        case $r:
          return $CR;
        case $t:
          return $TAB;
        case $v:
          return $VTAB;
        default:
          return code;
      }
    }
    var __decorate$1 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var SplitInterpolation = (function() {
      function SplitInterpolation(strings, expressions, offsets) {
        this.strings = strings;
        this.expressions = expressions;
        this.offsets = offsets;
      }
      return SplitInterpolation;
    }());
    var TemplateBindingParseResult = (function() {
      function TemplateBindingParseResult(templateBindings, warnings, errors) {
        this.templateBindings = templateBindings;
        this.warnings = warnings;
        this.errors = errors;
      }
      return TemplateBindingParseResult;
    }());
    function _createInterpolateRegExp(config) {
      var pattern = escapeRegExp(config.start) + '([\\s\\S]*?)' + escapeRegExp(config.end);
      return new RegExp(pattern, 'g');
    }
    var Parser = (function() {
      function Parser(_lexer) {
        this._lexer = _lexer;
        this.errors = [];
      }
      Parser.prototype.parseAction = function(input, location, interpolationConfig) {
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        this._checkNoInterpolation(input, location, interpolationConfig);
        var sourceToLex = this._stripComments(input);
        var tokens = this._lexer.tokenize(this._stripComments(input));
        var ast = new _ParseAST(input, location, tokens, sourceToLex.length, true, this.errors, input.length - sourceToLex.length).parseChain();
        return new ASTWithSource(ast, input, location, this.errors);
      };
      Parser.prototype.parseBinding = function(input, location, interpolationConfig) {
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        var ast = this._parseBindingAst(input, location, interpolationConfig);
        return new ASTWithSource(ast, input, location, this.errors);
      };
      Parser.prototype.parseSimpleBinding = function(input, location, interpolationConfig) {
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        var ast = this._parseBindingAst(input, location, interpolationConfig);
        var errors = SimpleExpressionChecker.check(ast);
        if (errors.length > 0) {
          this._reportError("Host binding expression cannot contain " + errors.join(' '), input, location);
        }
        return new ASTWithSource(ast, input, location, this.errors);
      };
      Parser.prototype._reportError = function(message, input, errLocation, ctxLocation) {
        this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
      };
      Parser.prototype._parseBindingAst = function(input, location, interpolationConfig) {
        var quote = this._parseQuote(input, location);
        if (isPresent(quote)) {
          return quote;
        }
        this._checkNoInterpolation(input, location, interpolationConfig);
        var sourceToLex = this._stripComments(input);
        var tokens = this._lexer.tokenize(sourceToLex);
        return new _ParseAST(input, location, tokens, sourceToLex.length, false, this.errors, input.length - sourceToLex.length).parseChain();
      };
      Parser.prototype._parseQuote = function(input, location) {
        if (isBlank(input))
          return null;
        var prefixSeparatorIndex = input.indexOf(':');
        if (prefixSeparatorIndex == -1)
          return null;
        var prefix = input.substring(0, prefixSeparatorIndex).trim();
        if (!isIdentifier(prefix))
          return null;
        var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
        return new Quote(new ParseSpan(0, input.length), prefix, uninterpretedExpression, location);
      };
      Parser.prototype.parseTemplateBindings = function(prefixToken, input, location) {
        var tokens = this._lexer.tokenize(input);
        if (prefixToken) {
          var prefixTokens = this._lexer.tokenize(prefixToken).map(function(t) {
            t.index = 0;
            return t;
          });
          tokens.unshift.apply(tokens, prefixTokens);
        }
        return new _ParseAST(input, location, tokens, input.length, false, this.errors, 0).parseTemplateBindings();
      };
      Parser.prototype.parseInterpolation = function(input, location, interpolationConfig) {
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        var split = this.splitInterpolation(input, location, interpolationConfig);
        if (split == null)
          return null;
        var expressions = [];
        for (var i = 0; i < split.expressions.length; ++i) {
          var expressionText = split.expressions[i];
          var sourceToLex = this._stripComments(expressionText);
          var tokens = this._lexer.tokenize(this._stripComments(split.expressions[i]));
          var ast = new _ParseAST(input, location, tokens, sourceToLex.length, false, this.errors, split.offsets[i] + (expressionText.length - sourceToLex.length)).parseChain();
          expressions.push(ast);
        }
        return new ASTWithSource(new Interpolation(new ParseSpan(0, isBlank(input) ? 0 : input.length), split.strings, expressions), input, location, this.errors);
      };
      Parser.prototype.splitInterpolation = function(input, location, interpolationConfig) {
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        var regexp = _createInterpolateRegExp(interpolationConfig);
        var parts = input.split(regexp);
        if (parts.length <= 1) {
          return null;
        }
        var strings = [];
        var expressions = [];
        var offsets = [];
        var offset = 0;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if (i % 2 === 0) {
            strings.push(part);
            offset += part.length;
          } else if (part.trim().length > 0) {
            offset += interpolationConfig.start.length;
            expressions.push(part);
            offsets.push(offset);
            offset += part.length + interpolationConfig.end.length;
          } else {
            this._reportError('Blank expressions are not allowed in interpolated strings', input, "at column " + this._findInterpolationErrorColumn(parts, i, interpolationConfig) + " in", location);
            expressions.push('$implict');
            offsets.push(offset);
          }
        }
        return new SplitInterpolation(strings, expressions, offsets);
      };
      Parser.prototype.wrapLiteralPrimitive = function(input, location) {
        return new ASTWithSource(new LiteralPrimitive(new ParseSpan(0, isBlank(input) ? 0 : input.length), input), input, location, this.errors);
      };
      Parser.prototype._stripComments = function(input) {
        var i = this._commentStart(input);
        return isPresent(i) ? input.substring(0, i).trim() : input;
      };
      Parser.prototype._commentStart = function(input) {
        var outerQuote = null;
        for (var i = 0; i < input.length - 1; i++) {
          var char = input.charCodeAt(i);
          var nextChar = input.charCodeAt(i + 1);
          if (char === $SLASH && nextChar == $SLASH && isBlank(outerQuote))
            return i;
          if (outerQuote === char) {
            outerQuote = null;
          } else if (isBlank(outerQuote) && isQuote(char)) {
            outerQuote = char;
          }
        }
        return null;
      };
      Parser.prototype._checkNoInterpolation = function(input, location, interpolationConfig) {
        var regexp = _createInterpolateRegExp(interpolationConfig);
        var parts = input.split(regexp);
        if (parts.length > 1) {
          this._reportError("Got interpolation (" + interpolationConfig.start + interpolationConfig.end + ") where expression was expected", input, "at column " + this._findInterpolationErrorColumn(parts, 1, interpolationConfig) + " in", location);
        }
      };
      Parser.prototype._findInterpolationErrorColumn = function(parts, partInErrIdx, interpolationConfig) {
        var errLocation = '';
        for (var j = 0; j < partInErrIdx; j++) {
          errLocation += j % 2 === 0 ? parts[j] : "" + interpolationConfig.start + parts[j] + interpolationConfig.end;
        }
        return errLocation.length;
      };
      Parser = __decorate$1([CompilerInjectable(), __metadata$1('design:paramtypes', [Lexer])], Parser);
      return Parser;
    }());
    var _ParseAST = (function() {
      function _ParseAST(input, location, tokens, inputLength, parseAction, errors, offset) {
        this.input = input;
        this.location = location;
        this.tokens = tokens;
        this.inputLength = inputLength;
        this.parseAction = parseAction;
        this.errors = errors;
        this.offset = offset;
        this.rparensExpected = 0;
        this.rbracketsExpected = 0;
        this.rbracesExpected = 0;
        this.index = 0;
      }
      _ParseAST.prototype.peek = function(offset) {
        var i = this.index + offset;
        return i < this.tokens.length ? this.tokens[i] : EOF;
      };
      Object.defineProperty(_ParseAST.prototype, "next", {
        get: function() {
          return this.peek(0);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(_ParseAST.prototype, "inputIndex", {
        get: function() {
          return (this.index < this.tokens.length) ? this.next.index + this.offset : this.inputLength + this.offset;
        },
        enumerable: true,
        configurable: true
      });
      _ParseAST.prototype.span = function(start) {
        return new ParseSpan(start, this.inputIndex);
      };
      _ParseAST.prototype.advance = function() {
        this.index++;
      };
      _ParseAST.prototype.optionalCharacter = function(code) {
        if (this.next.isCharacter(code)) {
          this.advance();
          return true;
        } else {
          return false;
        }
      };
      _ParseAST.prototype.peekKeywordLet = function() {
        return this.next.isKeywordLet();
      };
      _ParseAST.prototype.expectCharacter = function(code) {
        if (this.optionalCharacter(code))
          return;
        this.error("Missing expected " + String.fromCharCode(code));
      };
      _ParseAST.prototype.optionalOperator = function(op) {
        if (this.next.isOperator(op)) {
          this.advance();
          return true;
        } else {
          return false;
        }
      };
      _ParseAST.prototype.expectOperator = function(operator) {
        if (this.optionalOperator(operator))
          return;
        this.error("Missing expected operator " + operator);
      };
      _ParseAST.prototype.expectIdentifierOrKeyword = function() {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword()) {
          this.error("Unexpected token " + n + ", expected identifier or keyword");
          return '';
        }
        this.advance();
        return n.toString();
      };
      _ParseAST.prototype.expectIdentifierOrKeywordOrString = function() {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
          this.error("Unexpected token " + n + ", expected identifier, keyword, or string");
          return '';
        }
        this.advance();
        return n.toString();
      };
      _ParseAST.prototype.parseChain = function() {
        var exprs = [];
        var start = this.inputIndex;
        while (this.index < this.tokens.length) {
          var expr = this.parsePipe();
          exprs.push(expr);
          if (this.optionalCharacter($SEMICOLON)) {
            if (!this.parseAction) {
              this.error('Binding expression cannot contain chained expression');
            }
            while (this.optionalCharacter($SEMICOLON)) {}
          } else if (this.index < this.tokens.length) {
            this.error("Unexpected token '" + this.next + "'");
          }
        }
        if (exprs.length == 0)
          return new EmptyExpr(this.span(start));
        if (exprs.length == 1)
          return exprs[0];
        return new Chain(this.span(start), exprs);
      };
      _ParseAST.prototype.parsePipe = function() {
        var result = this.parseExpression();
        if (this.optionalOperator('|')) {
          if (this.parseAction) {
            this.error('Cannot have a pipe in an action expression');
          }
          do {
            var name_1 = this.expectIdentifierOrKeyword();
            var args = [];
            while (this.optionalCharacter($COLON)) {
              args.push(this.parseExpression());
            }
            result = new BindingPipe(this.span(result.span.start), result, name_1, args);
          } while (this.optionalOperator('|'));
        }
        return result;
      };
      _ParseAST.prototype.parseExpression = function() {
        return this.parseConditional();
      };
      _ParseAST.prototype.parseConditional = function() {
        var start = this.inputIndex;
        var result = this.parseLogicalOr();
        if (this.optionalOperator('?')) {
          var yes = this.parsePipe();
          var no = void 0;
          if (!this.optionalCharacter($COLON)) {
            var end = this.inputIndex;
            var expression = this.input.substring(start, end);
            this.error("Conditional expression " + expression + " requires all 3 expressions");
            no = new EmptyExpr(this.span(start));
          } else {
            no = this.parsePipe();
          }
          return new Conditional(this.span(start), result, yes, no);
        } else {
          return result;
        }
      };
      _ParseAST.prototype.parseLogicalOr = function() {
        var result = this.parseLogicalAnd();
        while (this.optionalOperator('||')) {
          var right = this.parseLogicalAnd();
          result = new Binary(this.span(result.span.start), '||', result, right);
        }
        return result;
      };
      _ParseAST.prototype.parseLogicalAnd = function() {
        var result = this.parseEquality();
        while (this.optionalOperator('&&')) {
          var right = this.parseEquality();
          result = new Binary(this.span(result.span.start), '&&', result, right);
        }
        return result;
      };
      _ParseAST.prototype.parseEquality = function() {
        var result = this.parseRelational();
        while (this.next.type == TokenType.Operator) {
          var operator = this.next.strValue;
          switch (operator) {
            case '==':
            case '===':
            case '!=':
            case '!==':
              this.advance();
              var right = this.parseRelational();
              result = new Binary(this.span(result.span.start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      };
      _ParseAST.prototype.parseRelational = function() {
        var result = this.parseAdditive();
        while (this.next.type == TokenType.Operator) {
          var operator = this.next.strValue;
          switch (operator) {
            case '<':
            case '>':
            case '<=':
            case '>=':
              this.advance();
              var right = this.parseAdditive();
              result = new Binary(this.span(result.span.start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      };
      _ParseAST.prototype.parseAdditive = function() {
        var result = this.parseMultiplicative();
        while (this.next.type == TokenType.Operator) {
          var operator = this.next.strValue;
          switch (operator) {
            case '+':
            case '-':
              this.advance();
              var right = this.parseMultiplicative();
              result = new Binary(this.span(result.span.start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      };
      _ParseAST.prototype.parseMultiplicative = function() {
        var result = this.parsePrefix();
        while (this.next.type == TokenType.Operator) {
          var operator = this.next.strValue;
          switch (operator) {
            case '*':
            case '%':
            case '/':
              this.advance();
              var right = this.parsePrefix();
              result = new Binary(this.span(result.span.start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      };
      _ParseAST.prototype.parsePrefix = function() {
        if (this.next.type == TokenType.Operator) {
          var start = this.inputIndex;
          var operator = this.next.strValue;
          var result = void 0;
          switch (operator) {
            case '+':
              this.advance();
              return this.parsePrefix();
            case '-':
              this.advance();
              result = this.parsePrefix();
              return new Binary(this.span(start), operator, new LiteralPrimitive(new ParseSpan(start, start), 0), result);
            case '!':
              this.advance();
              result = this.parsePrefix();
              return new PrefixNot(this.span(start), result);
          }
        }
        return this.parseCallChain();
      };
      _ParseAST.prototype.parseCallChain = function() {
        var result = this.parsePrimary();
        while (true) {
          if (this.optionalCharacter($PERIOD)) {
            result = this.parseAccessMemberOrMethodCall(result, false);
          } else if (this.optionalOperator('?.')) {
            result = this.parseAccessMemberOrMethodCall(result, true);
          } else if (this.optionalCharacter($LBRACKET)) {
            this.rbracketsExpected++;
            var key = this.parsePipe();
            this.rbracketsExpected--;
            this.expectCharacter($RBRACKET);
            if (this.optionalOperator('=')) {
              var value = this.parseConditional();
              result = new KeyedWrite(this.span(result.span.start), result, key, value);
            } else {
              result = new KeyedRead(this.span(result.span.start), result, key);
            }
          } else if (this.optionalCharacter($LPAREN)) {
            this.rparensExpected++;
            var args = this.parseCallArguments();
            this.rparensExpected--;
            this.expectCharacter($RPAREN);
            result = new FunctionCall(this.span(result.span.start), result, args);
          } else {
            return result;
          }
        }
      };
      _ParseAST.prototype.parsePrimary = function() {
        var start = this.inputIndex;
        if (this.optionalCharacter($LPAREN)) {
          this.rparensExpected++;
          var result = this.parsePipe();
          this.rparensExpected--;
          this.expectCharacter($RPAREN);
          return result;
        } else if (this.next.isKeywordNull()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), null);
        } else if (this.next.isKeywordUndefined()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), void 0);
        } else if (this.next.isKeywordTrue()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), true);
        } else if (this.next.isKeywordFalse()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), false);
        } else if (this.next.isKeywordThis()) {
          this.advance();
          return new ImplicitReceiver(this.span(start));
        } else if (this.optionalCharacter($LBRACKET)) {
          this.rbracketsExpected++;
          var elements = this.parseExpressionList($RBRACKET);
          this.rbracketsExpected--;
          this.expectCharacter($RBRACKET);
          return new LiteralArray(this.span(start), elements);
        } else if (this.next.isCharacter($LBRACE)) {
          return this.parseLiteralMap();
        } else if (this.next.isIdentifier()) {
          return this.parseAccessMemberOrMethodCall(new ImplicitReceiver(this.span(start)), false);
        } else if (this.next.isNumber()) {
          var value = this.next.toNumber();
          this.advance();
          return new LiteralPrimitive(this.span(start), value);
        } else if (this.next.isString()) {
          var literalValue = this.next.toString();
          this.advance();
          return new LiteralPrimitive(this.span(start), literalValue);
        } else if (this.index >= this.tokens.length) {
          this.error("Unexpected end of expression: " + this.input);
          return new EmptyExpr(this.span(start));
        } else {
          this.error("Unexpected token " + this.next);
          return new EmptyExpr(this.span(start));
        }
      };
      _ParseAST.prototype.parseExpressionList = function(terminator) {
        var result = [];
        if (!this.next.isCharacter(terminator)) {
          do {
            result.push(this.parsePipe());
          } while (this.optionalCharacter($COMMA));
        }
        return result;
      };
      _ParseAST.prototype.parseLiteralMap = function() {
        var keys = [];
        var values = [];
        var start = this.inputIndex;
        this.expectCharacter($LBRACE);
        if (!this.optionalCharacter($RBRACE)) {
          this.rbracesExpected++;
          do {
            var key = this.expectIdentifierOrKeywordOrString();
            keys.push(key);
            this.expectCharacter($COLON);
            values.push(this.parsePipe());
          } while (this.optionalCharacter($COMMA));
          this.rbracesExpected--;
          this.expectCharacter($RBRACE);
        }
        return new LiteralMap(this.span(start), keys, values);
      };
      _ParseAST.prototype.parseAccessMemberOrMethodCall = function(receiver, isSafe) {
        if (isSafe === void 0) {
          isSafe = false;
        }
        var start = receiver.span.start;
        var id = this.expectIdentifierOrKeyword();
        if (this.optionalCharacter($LPAREN)) {
          this.rparensExpected++;
          var args = this.parseCallArguments();
          this.expectCharacter($RPAREN);
          this.rparensExpected--;
          var span = this.span(start);
          return isSafe ? new SafeMethodCall(span, receiver, id, args) : new MethodCall(span, receiver, id, args);
        } else {
          if (isSafe) {
            if (this.optionalOperator('=')) {
              this.error('The \'?.\' operator cannot be used in the assignment');
              return new EmptyExpr(this.span(start));
            } else {
              return new SafePropertyRead(this.span(start), receiver, id);
            }
          } else {
            if (this.optionalOperator('=')) {
              if (!this.parseAction) {
                this.error('Bindings cannot contain assignments');
                return new EmptyExpr(this.span(start));
              }
              var value = this.parseConditional();
              return new PropertyWrite(this.span(start), receiver, id, value);
            } else {
              return new PropertyRead(this.span(start), receiver, id);
            }
          }
        }
      };
      _ParseAST.prototype.parseCallArguments = function() {
        if (this.next.isCharacter($RPAREN))
          return [];
        var positionals = [];
        do {
          positionals.push(this.parsePipe());
        } while (this.optionalCharacter($COMMA));
        return (positionals);
      };
      _ParseAST.prototype.expectTemplateBindingKey = function() {
        var result = '';
        var operatorFound = false;
        do {
          result += this.expectIdentifierOrKeywordOrString();
          operatorFound = this.optionalOperator('-');
          if (operatorFound) {
            result += '-';
          }
        } while (operatorFound);
        return result.toString();
      };
      _ParseAST.prototype.parseTemplateBindings = function() {
        var bindings = [];
        var prefix = null;
        var warnings = [];
        while (this.index < this.tokens.length) {
          var start = this.inputIndex;
          var keyIsVar = this.peekKeywordLet();
          if (keyIsVar) {
            this.advance();
          }
          var key = this.expectTemplateBindingKey();
          if (!keyIsVar) {
            if (prefix == null) {
              prefix = key;
            } else {
              key = prefix + key[0].toUpperCase() + key.substring(1);
            }
          }
          this.optionalCharacter($COLON);
          var name_2 = null;
          var expression = null;
          if (keyIsVar) {
            if (this.optionalOperator('=')) {
              name_2 = this.expectTemplateBindingKey();
            } else {
              name_2 = '\$implicit';
            }
          } else if (this.next !== EOF && !this.peekKeywordLet()) {
            var start_1 = this.inputIndex;
            var ast = this.parsePipe();
            var source = this.input.substring(start_1 - this.offset, this.inputIndex - this.offset);
            expression = new ASTWithSource(ast, source, this.location, this.errors);
          }
          bindings.push(new TemplateBinding(this.span(start), key, keyIsVar, name_2, expression));
          if (!this.optionalCharacter($SEMICOLON)) {
            this.optionalCharacter($COMMA);
          }
        }
        return new TemplateBindingParseResult(bindings, warnings, this.errors);
      };
      _ParseAST.prototype.error = function(message, index) {
        if (index === void 0) {
          index = null;
        }
        this.errors.push(new ParserError(message, this.input, this.locationText(index), this.location));
        this.skip();
      };
      _ParseAST.prototype.locationText = function(index) {
        if (index === void 0) {
          index = null;
        }
        if (isBlank(index))
          index = this.index;
        return (index < this.tokens.length) ? "at column " + (this.tokens[index].index + 1) + " in" : "at the end of the expression";
      };
      _ParseAST.prototype.skip = function() {
        var n = this.next;
        while (this.index < this.tokens.length && !n.isCharacter($SEMICOLON) && (this.rparensExpected <= 0 || !n.isCharacter($RPAREN)) && (this.rbracesExpected <= 0 || !n.isCharacter($RBRACE)) && (this.rbracketsExpected <= 0 || !n.isCharacter($RBRACKET))) {
          if (this.next.isError()) {
            this.errors.push(new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
          }
          this.advance();
          n = this.next;
        }
      };
      return _ParseAST;
    }());
    var SimpleExpressionChecker = (function() {
      function SimpleExpressionChecker() {
        this.errors = [];
      }
      SimpleExpressionChecker.check = function(ast) {
        var s = new SimpleExpressionChecker();
        ast.visit(s);
        return s.errors;
      };
      SimpleExpressionChecker.prototype.visitImplicitReceiver = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitInterpolation = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitLiteralPrimitive = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitPropertyRead = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitPropertyWrite = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitSafePropertyRead = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitMethodCall = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitSafeMethodCall = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitFunctionCall = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitLiteralArray = function(ast, context) {
        this.visitAll(ast.expressions);
      };
      SimpleExpressionChecker.prototype.visitLiteralMap = function(ast, context) {
        this.visitAll(ast.values);
      };
      SimpleExpressionChecker.prototype.visitBinary = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitPrefixNot = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitConditional = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitPipe = function(ast, context) {
        this.errors.push('pipes');
      };
      SimpleExpressionChecker.prototype.visitKeyedRead = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitKeyedWrite = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitAll = function(asts) {
        var _this = this;
        return asts.map(function(node) {
          return node.visit(_this);
        });
      };
      SimpleExpressionChecker.prototype.visitChain = function(ast, context) {};
      SimpleExpressionChecker.prototype.visitQuote = function(ast, context) {};
      return SimpleExpressionChecker;
    }());
    var ParseLocation = (function() {
      function ParseLocation(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
      }
      ParseLocation.prototype.toString = function() {
        return isPresent(this.offset) ? this.file.url + "@" + this.line + ":" + this.col : this.file.url;
      };
      ParseLocation.prototype.moveBy = function(delta) {
        var source = this.file.content;
        var len = source.length;
        var offset = this.offset;
        var line = this.line;
        var col = this.col;
        while (offset > 0 && delta < 0) {
          offset--;
          delta++;
          var ch = source.charCodeAt(offset);
          if (ch == $LF) {
            line--;
            var priorLine = source.substr(0, offset - 1).lastIndexOf(String.fromCharCode($LF));
            col = priorLine > 0 ? offset - priorLine : offset;
          } else {
            col--;
          }
        }
        while (offset < len && delta > 0) {
          var ch = source.charCodeAt(offset);
          offset++;
          delta--;
          if (ch == $LF) {
            line++;
            col = 0;
          } else {
            col++;
          }
        }
        return new ParseLocation(this.file, offset, line, col);
      };
      ParseLocation.prototype.getContext = function(maxChars, maxLines) {
        var content = this.file.content;
        var startOffset = this.offset;
        if (isPresent(startOffset)) {
          if (startOffset > content.length - 1) {
            startOffset = content.length - 1;
          }
          var endOffset = startOffset;
          var ctxChars = 0;
          var ctxLines = 0;
          while (ctxChars < maxChars && startOffset > 0) {
            startOffset--;
            ctxChars++;
            if (content[startOffset] == '\n') {
              if (++ctxLines == maxLines) {
                break;
              }
            }
          }
          ctxChars = 0;
          ctxLines = 0;
          while (ctxChars < maxChars && endOffset < content.length - 1) {
            endOffset++;
            ctxChars++;
            if (content[endOffset] == '\n') {
              if (++ctxLines == maxLines) {
                break;
              }
            }
          }
          return {
            before: content.substring(startOffset, this.offset),
            after: content.substring(this.offset, endOffset + 1)
          };
        }
        return null;
      };
      return ParseLocation;
    }());
    var ParseSourceFile = (function() {
      function ParseSourceFile(content, url) {
        this.content = content;
        this.url = url;
      }
      return ParseSourceFile;
    }());
    var ParseSourceSpan = (function() {
      function ParseSourceSpan(start, end, details) {
        if (details === void 0) {
          details = null;
        }
        this.start = start;
        this.end = end;
        this.details = details;
      }
      ParseSourceSpan.prototype.toString = function() {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
      };
      return ParseSourceSpan;
    }());
    var ParseErrorLevel = {};
    ParseErrorLevel.WARNING = 0;
    ParseErrorLevel.FATAL = 1;
    ParseErrorLevel[ParseErrorLevel.WARNING] = "WARNING";
    ParseErrorLevel[ParseErrorLevel.FATAL] = "FATAL";
    var ParseError = (function() {
      function ParseError(span, msg, level) {
        if (level === void 0) {
          level = ParseErrorLevel.FATAL;
        }
        this.span = span;
        this.msg = msg;
        this.level = level;
      }
      ParseError.prototype.toString = function() {
        var ctx = this.span.start.getContext(100, 3);
        var contextStr = ctx ? " (\"" + ctx.before + "[ERROR ->]" + ctx.after + "\")" : '';
        var details = this.span.details ? ", " + this.span.details : '';
        return "" + this.msg + contextStr + ": " + this.span.start + details;
      };
      return ParseError;
    }());
    var Text = (function() {
      function Text(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      Text.prototype.visit = function(visitor, context) {
        return visitor.visitText(this, context);
      };
      return Text;
    }());
    var Expansion = (function() {
      function Expansion(switchValue, type, cases, sourceSpan, switchValueSourceSpan) {
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
        this.switchValueSourceSpan = switchValueSourceSpan;
      }
      Expansion.prototype.visit = function(visitor, context) {
        return visitor.visitExpansion(this, context);
      };
      return Expansion;
    }());
    var ExpansionCase = (function() {
      function ExpansionCase(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
      }
      ExpansionCase.prototype.visit = function(visitor, context) {
        return visitor.visitExpansionCase(this, context);
      };
      return ExpansionCase;
    }());
    var Attribute$1 = (function() {
      function Attribute(name, value, sourceSpan, valueSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.valueSpan = valueSpan;
      }
      Attribute.prototype.visit = function(visitor, context) {
        return visitor.visitAttribute(this, context);
      };
      return Attribute;
    }());
    var Element = (function() {
      function Element(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
      }
      Element.prototype.visit = function(visitor, context) {
        return visitor.visitElement(this, context);
      };
      return Element;
    }());
    var Comment = (function() {
      function Comment(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      Comment.prototype.visit = function(visitor, context) {
        return visitor.visitComment(this, context);
      };
      return Comment;
    }());
    function visitAll(visitor, nodes, context) {
      if (context === void 0) {
        context = null;
      }
      var result = [];
      var visit = visitor.visit ? function(ast) {
        return visitor.visit(ast, context) || ast.visit(visitor, context);
      } : function(ast) {
        return ast.visit(visitor, context);
      };
      nodes.forEach(function(ast) {
        var astResult = visit(ast);
        if (astResult) {
          result.push(astResult);
        }
      });
      return result;
    }
    var __extends$6 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TokenType$1 = {};
    TokenType$1.TAG_OPEN_START = 0;
    TokenType$1.TAG_OPEN_END = 1;
    TokenType$1.TAG_OPEN_END_VOID = 2;
    TokenType$1.TAG_CLOSE = 3;
    TokenType$1.TEXT = 4;
    TokenType$1.ESCAPABLE_RAW_TEXT = 5;
    TokenType$1.RAW_TEXT = 6;
    TokenType$1.COMMENT_START = 7;
    TokenType$1.COMMENT_END = 8;
    TokenType$1.CDATA_START = 9;
    TokenType$1.CDATA_END = 10;
    TokenType$1.ATTR_NAME = 11;
    TokenType$1.ATTR_VALUE = 12;
    TokenType$1.DOC_TYPE = 13;
    TokenType$1.EXPANSION_FORM_START = 14;
    TokenType$1.EXPANSION_CASE_VALUE = 15;
    TokenType$1.EXPANSION_CASE_EXP_START = 16;
    TokenType$1.EXPANSION_CASE_EXP_END = 17;
    TokenType$1.EXPANSION_FORM_END = 18;
    TokenType$1.EOF = 19;
    TokenType$1[TokenType$1.TAG_OPEN_START] = "TAG_OPEN_START";
    TokenType$1[TokenType$1.TAG_OPEN_END] = "TAG_OPEN_END";
    TokenType$1[TokenType$1.TAG_OPEN_END_VOID] = "TAG_OPEN_END_VOID";
    TokenType$1[TokenType$1.TAG_CLOSE] = "TAG_CLOSE";
    TokenType$1[TokenType$1.TEXT] = "TEXT";
    TokenType$1[TokenType$1.ESCAPABLE_RAW_TEXT] = "ESCAPABLE_RAW_TEXT";
    TokenType$1[TokenType$1.RAW_TEXT] = "RAW_TEXT";
    TokenType$1[TokenType$1.COMMENT_START] = "COMMENT_START";
    TokenType$1[TokenType$1.COMMENT_END] = "COMMENT_END";
    TokenType$1[TokenType$1.CDATA_START] = "CDATA_START";
    TokenType$1[TokenType$1.CDATA_END] = "CDATA_END";
    TokenType$1[TokenType$1.ATTR_NAME] = "ATTR_NAME";
    TokenType$1[TokenType$1.ATTR_VALUE] = "ATTR_VALUE";
    TokenType$1[TokenType$1.DOC_TYPE] = "DOC_TYPE";
    TokenType$1[TokenType$1.EXPANSION_FORM_START] = "EXPANSION_FORM_START";
    TokenType$1[TokenType$1.EXPANSION_CASE_VALUE] = "EXPANSION_CASE_VALUE";
    TokenType$1[TokenType$1.EXPANSION_CASE_EXP_START] = "EXPANSION_CASE_EXP_START";
    TokenType$1[TokenType$1.EXPANSION_CASE_EXP_END] = "EXPANSION_CASE_EXP_END";
    TokenType$1[TokenType$1.EXPANSION_FORM_END] = "EXPANSION_FORM_END";
    TokenType$1[TokenType$1.EOF] = "EOF";
    var Token$1 = (function() {
      function Token(type, parts, sourceSpan) {
        this.type = type;
        this.parts = parts;
        this.sourceSpan = sourceSpan;
      }
      return Token;
    }());
    var TokenError = (function(_super) {
      __extends$6(TokenError, _super);
      function TokenError(errorMsg, tokenType, span) {
        _super.call(this, span, errorMsg);
        this.tokenType = tokenType;
      }
      return TokenError;
    }(ParseError));
    var TokenizeResult = (function() {
      function TokenizeResult(tokens, errors) {
        this.tokens = tokens;
        this.errors = errors;
      }
      return TokenizeResult;
    }());
    function tokenize(source, url, getTagDefinition, tokenizeExpansionForms, interpolationConfig) {
      if (tokenizeExpansionForms === void 0) {
        tokenizeExpansionForms = false;
      }
      if (interpolationConfig === void 0) {
        interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
      }
      return new _Tokenizer(new ParseSourceFile(source, url), getTagDefinition, tokenizeExpansionForms, interpolationConfig).tokenize();
    }
    var _CR_OR_CRLF_REGEXP = /\r\n?/g;
    function _unexpectedCharacterErrorMsg(charCode) {
      var char = charCode === $EOF ? 'EOF' : String.fromCharCode(charCode);
      return "Unexpected character \"" + char + "\"";
    }
    function _unknownEntityErrorMsg(entitySrc) {
      return "Unknown entity \"" + entitySrc + "\" - use the \"&#<decimal>;\" or  \"&#x<hex>;\" syntax";
    }
    var _ControlFlowError = (function() {
      function _ControlFlowError(error) {
        this.error = error;
      }
      return _ControlFlowError;
    }());
    var _Tokenizer = (function() {
      function _Tokenizer(_file, _getTagDefinition, _tokenizeIcu, _interpolationConfig) {
        if (_interpolationConfig === void 0) {
          _interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        this._file = _file;
        this._getTagDefinition = _getTagDefinition;
        this._tokenizeIcu = _tokenizeIcu;
        this._interpolationConfig = _interpolationConfig;
        this._peek = -1;
        this._nextPeek = -1;
        this._index = -1;
        this._line = 0;
        this._column = -1;
        this._expansionCaseStack = [];
        this._inInterpolation = false;
        this.tokens = [];
        this.errors = [];
        this._input = _file.content;
        this._length = _file.content.length;
        this._advance();
      }
      _Tokenizer.prototype._processCarriageReturns = function(content) {
        return content.replace(_CR_OR_CRLF_REGEXP, '\n');
      };
      _Tokenizer.prototype.tokenize = function() {
        while (this._peek !== $EOF) {
          var start = this._getLocation();
          try {
            if (this._attemptCharCode($LT)) {
              if (this._attemptCharCode($BANG)) {
                if (this._attemptCharCode($LBRACKET)) {
                  this._consumeCdata(start);
                } else if (this._attemptCharCode($MINUS)) {
                  this._consumeComment(start);
                } else {
                  this._consumeDocType(start);
                }
              } else if (this._attemptCharCode($SLASH)) {
                this._consumeTagClose(start);
              } else {
                this._consumeTagOpen(start);
              }
            } else if (!(this._tokenizeIcu && this._tokenizeExpansionForm())) {
              this._consumeText();
            }
          } catch (e) {
            if (e instanceof _ControlFlowError) {
              this.errors.push(e.error);
            } else {
              throw e;
            }
          }
        }
        this._beginToken(TokenType$1.EOF);
        this._endToken([]);
        return new TokenizeResult(mergeTextTokens(this.tokens), this.errors);
      };
      _Tokenizer.prototype._tokenizeExpansionForm = function() {
        if (isExpansionFormStart(this._input, this._index, this._interpolationConfig)) {
          this._consumeExpansionFormStart();
          return true;
        }
        if (isExpansionCaseStart(this._peek) && this._isInExpansionForm()) {
          this._consumeExpansionCaseStart();
          return true;
        }
        if (this._peek === $RBRACE) {
          if (this._isInExpansionCase()) {
            this._consumeExpansionCaseEnd();
            return true;
          }
          if (this._isInExpansionForm()) {
            this._consumeExpansionFormEnd();
            return true;
          }
        }
        return false;
      };
      _Tokenizer.prototype._getLocation = function() {
        return new ParseLocation(this._file, this._index, this._line, this._column);
      };
      _Tokenizer.prototype._getSpan = function(start, end) {
        if (start === void 0) {
          start = this._getLocation();
        }
        if (end === void 0) {
          end = this._getLocation();
        }
        return new ParseSourceSpan(start, end);
      };
      _Tokenizer.prototype._beginToken = function(type, start) {
        if (start === void 0) {
          start = this._getLocation();
        }
        this._currentTokenStart = start;
        this._currentTokenType = type;
      };
      _Tokenizer.prototype._endToken = function(parts, end) {
        if (end === void 0) {
          end = this._getLocation();
        }
        var token = new Token$1(this._currentTokenType, parts, new ParseSourceSpan(this._currentTokenStart, end));
        this.tokens.push(token);
        this._currentTokenStart = null;
        this._currentTokenType = null;
        return token;
      };
      _Tokenizer.prototype._createError = function(msg, span) {
        if (this._isInExpansionForm()) {
          msg += " (Do you have an unescaped \"{\" in your template? Use \"{{ '{' }}\") to escape it.)";
        }
        var error = new TokenError(msg, this._currentTokenType, span);
        this._currentTokenStart = null;
        this._currentTokenType = null;
        return new _ControlFlowError(error);
      };
      _Tokenizer.prototype._advance = function() {
        if (this._index >= this._length) {
          throw this._createError(_unexpectedCharacterErrorMsg($EOF), this._getSpan());
        }
        if (this._peek === $LF) {
          this._line++;
          this._column = 0;
        } else if (this._peek !== $LF && this._peek !== $CR) {
          this._column++;
        }
        this._index++;
        this._peek = this._index >= this._length ? $EOF : this._input.charCodeAt(this._index);
        this._nextPeek = this._index + 1 >= this._length ? $EOF : this._input.charCodeAt(this._index + 1);
      };
      _Tokenizer.prototype._attemptCharCode = function(charCode) {
        if (this._peek === charCode) {
          this._advance();
          return true;
        }
        return false;
      };
      _Tokenizer.prototype._attemptCharCodeCaseInsensitive = function(charCode) {
        if (compareCharCodeCaseInsensitive(this._peek, charCode)) {
          this._advance();
          return true;
        }
        return false;
      };
      _Tokenizer.prototype._requireCharCode = function(charCode) {
        var location = this._getLocation();
        if (!this._attemptCharCode(charCode)) {
          throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan(location, location));
        }
      };
      _Tokenizer.prototype._attemptStr = function(chars) {
        var len = chars.length;
        if (this._index + len > this._length) {
          return false;
        }
        var initialPosition = this._savePosition();
        for (var i = 0; i < len; i++) {
          if (!this._attemptCharCode(chars.charCodeAt(i))) {
            this._restorePosition(initialPosition);
            return false;
          }
        }
        return true;
      };
      _Tokenizer.prototype._attemptStrCaseInsensitive = function(chars) {
        for (var i = 0; i < chars.length; i++) {
          if (!this._attemptCharCodeCaseInsensitive(chars.charCodeAt(i))) {
            return false;
          }
        }
        return true;
      };
      _Tokenizer.prototype._requireStr = function(chars) {
        var location = this._getLocation();
        if (!this._attemptStr(chars)) {
          throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan(location));
        }
      };
      _Tokenizer.prototype._attemptCharCodeUntilFn = function(predicate) {
        while (!predicate(this._peek)) {
          this._advance();
        }
      };
      _Tokenizer.prototype._requireCharCodeUntilFn = function(predicate, len) {
        var start = this._getLocation();
        this._attemptCharCodeUntilFn(predicate);
        if (this._index - start.offset < len) {
          throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan(start, start));
        }
      };
      _Tokenizer.prototype._attemptUntilChar = function(char) {
        while (this._peek !== char) {
          this._advance();
        }
      };
      _Tokenizer.prototype._readChar = function(decodeEntities) {
        if (decodeEntities && this._peek === $AMPERSAND) {
          return this._decodeEntity();
        } else {
          var index = this._index;
          this._advance();
          return this._input[index];
        }
      };
      _Tokenizer.prototype._decodeEntity = function() {
        var start = this._getLocation();
        this._advance();
        if (this._attemptCharCode($HASH)) {
          var isHex = this._attemptCharCode($x) || this._attemptCharCode($X);
          var numberStart = this._getLocation().offset;
          this._attemptCharCodeUntilFn(isDigitEntityEnd);
          if (this._peek != $SEMICOLON) {
            throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan());
          }
          this._advance();
          var strNum = this._input.substring(numberStart, this._index - 1);
          try {
            var charCode = parseInt(strNum, isHex ? 16 : 10);
            return String.fromCharCode(charCode);
          } catch (e) {
            var entity = this._input.substring(start.offset + 1, this._index - 1);
            throw this._createError(_unknownEntityErrorMsg(entity), this._getSpan(start));
          }
        } else {
          var startPosition = this._savePosition();
          this._attemptCharCodeUntilFn(isNamedEntityEnd);
          if (this._peek != $SEMICOLON) {
            this._restorePosition(startPosition);
            return '&';
          }
          this._advance();
          var name_1 = this._input.substring(start.offset + 1, this._index - 1);
          var char = NAMED_ENTITIES[name_1];
          if (!char) {
            throw this._createError(_unknownEntityErrorMsg(name_1), this._getSpan(start));
          }
          return char;
        }
      };
      _Tokenizer.prototype._consumeRawText = function(decodeEntities, firstCharOfEnd, attemptEndRest) {
        var tagCloseStart;
        var textStart = this._getLocation();
        this._beginToken(decodeEntities ? TokenType$1.ESCAPABLE_RAW_TEXT : TokenType$1.RAW_TEXT, textStart);
        var parts = [];
        while (true) {
          tagCloseStart = this._getLocation();
          if (this._attemptCharCode(firstCharOfEnd) && attemptEndRest()) {
            break;
          }
          if (this._index > tagCloseStart.offset) {
            parts.push(this._input.substring(tagCloseStart.offset, this._index));
          }
          while (this._peek !== firstCharOfEnd) {
            parts.push(this._readChar(decodeEntities));
          }
        }
        return this._endToken([this._processCarriageReturns(parts.join(''))], tagCloseStart);
      };
      _Tokenizer.prototype._consumeComment = function(start) {
        var _this = this;
        this._beginToken(TokenType$1.COMMENT_START, start);
        this._requireCharCode($MINUS);
        this._endToken([]);
        var textToken = this._consumeRawText(false, $MINUS, function() {
          return _this._attemptStr('->');
        });
        this._beginToken(TokenType$1.COMMENT_END, textToken.sourceSpan.end);
        this._endToken([]);
      };
      _Tokenizer.prototype._consumeCdata = function(start) {
        var _this = this;
        this._beginToken(TokenType$1.CDATA_START, start);
        this._requireStr('CDATA[');
        this._endToken([]);
        var textToken = this._consumeRawText(false, $RBRACKET, function() {
          return _this._attemptStr(']>');
        });
        this._beginToken(TokenType$1.CDATA_END, textToken.sourceSpan.end);
        this._endToken([]);
      };
      _Tokenizer.prototype._consumeDocType = function(start) {
        this._beginToken(TokenType$1.DOC_TYPE, start);
        this._attemptUntilChar($GT);
        this._advance();
        this._endToken([this._input.substring(start.offset + 2, this._index - 1)]);
      };
      _Tokenizer.prototype._consumePrefixAndName = function() {
        var nameOrPrefixStart = this._index;
        var prefix = null;
        while (this._peek !== $COLON && !isPrefixEnd(this._peek)) {
          this._advance();
        }
        var nameStart;
        if (this._peek === $COLON) {
          this._advance();
          prefix = this._input.substring(nameOrPrefixStart, this._index - 1);
          nameStart = this._index;
        } else {
          nameStart = nameOrPrefixStart;
        }
        this._requireCharCodeUntilFn(isNameEnd, this._index === nameStart ? 1 : 0);
        var name = this._input.substring(nameStart, this._index);
        return [prefix, name];
      };
      _Tokenizer.prototype._consumeTagOpen = function(start) {
        var savedPos = this._savePosition();
        var tagName;
        var lowercaseTagName;
        try {
          if (!isAsciiLetter(this._peek)) {
            throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan());
          }
          var nameStart = this._index;
          this._consumeTagOpenStart(start);
          tagName = this._input.substring(nameStart, this._index);
          lowercaseTagName = tagName.toLowerCase();
          this._attemptCharCodeUntilFn(isNotWhitespace);
          while (this._peek !== $SLASH && this._peek !== $GT) {
            this._consumeAttributeName();
            this._attemptCharCodeUntilFn(isNotWhitespace);
            if (this._attemptCharCode($EQ)) {
              this._attemptCharCodeUntilFn(isNotWhitespace);
              this._consumeAttributeValue();
            }
            this._attemptCharCodeUntilFn(isNotWhitespace);
          }
          this._consumeTagOpenEnd();
        } catch (e) {
          if (e instanceof _ControlFlowError) {
            this._restorePosition(savedPos);
            this._beginToken(TokenType$1.TEXT, start);
            this._endToken(['<']);
            return;
          }
          throw e;
        }
        var contentTokenType = this._getTagDefinition(tagName).contentType;
        if (contentTokenType === TagContentType.RAW_TEXT) {
          this._consumeRawTextWithTagClose(lowercaseTagName, false);
        } else if (contentTokenType === TagContentType.ESCAPABLE_RAW_TEXT) {
          this._consumeRawTextWithTagClose(lowercaseTagName, true);
        }
      };
      _Tokenizer.prototype._consumeRawTextWithTagClose = function(lowercaseTagName, decodeEntities) {
        var _this = this;
        var textToken = this._consumeRawText(decodeEntities, $LT, function() {
          if (!_this._attemptCharCode($SLASH))
            return false;
          _this._attemptCharCodeUntilFn(isNotWhitespace);
          if (!_this._attemptStrCaseInsensitive(lowercaseTagName))
            return false;
          _this._attemptCharCodeUntilFn(isNotWhitespace);
          return _this._attemptCharCode($GT);
        });
        this._beginToken(TokenType$1.TAG_CLOSE, textToken.sourceSpan.end);
        this._endToken([null, lowercaseTagName]);
      };
      _Tokenizer.prototype._consumeTagOpenStart = function(start) {
        this._beginToken(TokenType$1.TAG_OPEN_START, start);
        var parts = this._consumePrefixAndName();
        this._endToken(parts);
      };
      _Tokenizer.prototype._consumeAttributeName = function() {
        this._beginToken(TokenType$1.ATTR_NAME);
        var prefixAndName = this._consumePrefixAndName();
        this._endToken(prefixAndName);
      };
      _Tokenizer.prototype._consumeAttributeValue = function() {
        this._beginToken(TokenType$1.ATTR_VALUE);
        var value;
        if (this._peek === $SQ || this._peek === $DQ) {
          var quoteChar = this._peek;
          this._advance();
          var parts = [];
          while (this._peek !== quoteChar) {
            parts.push(this._readChar(true));
          }
          value = parts.join('');
          this._advance();
        } else {
          var valueStart = this._index;
          this._requireCharCodeUntilFn(isNameEnd, 1);
          value = this._input.substring(valueStart, this._index);
        }
        this._endToken([this._processCarriageReturns(value)]);
      };
      _Tokenizer.prototype._consumeTagOpenEnd = function() {
        var tokenType = this._attemptCharCode($SLASH) ? TokenType$1.TAG_OPEN_END_VOID : TokenType$1.TAG_OPEN_END;
        this._beginToken(tokenType);
        this._requireCharCode($GT);
        this._endToken([]);
      };
      _Tokenizer.prototype._consumeTagClose = function(start) {
        this._beginToken(TokenType$1.TAG_CLOSE, start);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        var prefixAndName = this._consumePrefixAndName();
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._requireCharCode($GT);
        this._endToken(prefixAndName);
      };
      _Tokenizer.prototype._consumeExpansionFormStart = function() {
        this._beginToken(TokenType$1.EXPANSION_FORM_START, this._getLocation());
        this._requireCharCode($LBRACE);
        this._endToken([]);
        this._expansionCaseStack.push(TokenType$1.EXPANSION_FORM_START);
        this._beginToken(TokenType$1.RAW_TEXT, this._getLocation());
        var condition = this._readUntil($COMMA);
        this._endToken([condition], this._getLocation());
        this._requireCharCode($COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(TokenType$1.RAW_TEXT, this._getLocation());
        var type = this._readUntil($COMMA);
        this._endToken([type], this._getLocation());
        this._requireCharCode($COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
      };
      _Tokenizer.prototype._consumeExpansionCaseStart = function() {
        this._beginToken(TokenType$1.EXPANSION_CASE_VALUE, this._getLocation());
        var value = this._readUntil($LBRACE).trim();
        this._endToken([value], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(TokenType$1.EXPANSION_CASE_EXP_START, this._getLocation());
        this._requireCharCode($LBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.push(TokenType$1.EXPANSION_CASE_EXP_START);
      };
      _Tokenizer.prototype._consumeExpansionCaseEnd = function() {
        this._beginToken(TokenType$1.EXPANSION_CASE_EXP_END, this._getLocation());
        this._requireCharCode($RBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.pop();
      };
      _Tokenizer.prototype._consumeExpansionFormEnd = function() {
        this._beginToken(TokenType$1.EXPANSION_FORM_END, this._getLocation());
        this._requireCharCode($RBRACE);
        this._endToken([]);
        this._expansionCaseStack.pop();
      };
      _Tokenizer.prototype._consumeText = function() {
        var start = this._getLocation();
        this._beginToken(TokenType$1.TEXT, start);
        var parts = [];
        do {
          if (this._interpolationConfig && this._attemptStr(this._interpolationConfig.start)) {
            parts.push(this._interpolationConfig.start);
            this._inInterpolation = true;
          } else if (this._interpolationConfig && this._inInterpolation && this._attemptStr(this._interpolationConfig.end)) {
            parts.push(this._interpolationConfig.end);
            this._inInterpolation = false;
          } else {
            parts.push(this._readChar(true));
          }
        } while (!this._isTextEnd());
        this._endToken([this._processCarriageReturns(parts.join(''))]);
      };
      _Tokenizer.prototype._isTextEnd = function() {
        if (this._peek === $LT || this._peek === $EOF) {
          return true;
        }
        if (this._tokenizeIcu && !this._inInterpolation) {
          if (isExpansionFormStart(this._input, this._index, this._interpolationConfig)) {
            return true;
          }
          if (this._peek === $RBRACE && this._isInExpansionCase()) {
            return true;
          }
        }
        return false;
      };
      _Tokenizer.prototype._savePosition = function() {
        return [this._peek, this._index, this._column, this._line, this.tokens.length];
      };
      _Tokenizer.prototype._readUntil = function(char) {
        var start = this._index;
        this._attemptUntilChar(char);
        return this._input.substring(start, this._index);
      };
      _Tokenizer.prototype._restorePosition = function(position) {
        this._peek = position[0];
        this._index = position[1];
        this._column = position[2];
        this._line = position[3];
        var nbTokens = position[4];
        if (nbTokens < this.tokens.length) {
          this.tokens = this.tokens.slice(0, nbTokens);
        }
      };
      _Tokenizer.prototype._isInExpansionCase = function() {
        return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === TokenType$1.EXPANSION_CASE_EXP_START;
      };
      _Tokenizer.prototype._isInExpansionForm = function() {
        return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === TokenType$1.EXPANSION_FORM_START;
      };
      return _Tokenizer;
    }());
    function isNotWhitespace(code) {
      return !isWhitespace(code) || code === $EOF;
    }
    function isNameEnd(code) {
      return isWhitespace(code) || code === $GT || code === $SLASH || code === $SQ || code === $DQ || code === $EQ;
    }
    function isPrefixEnd(code) {
      return (code < $a || $z < code) && (code < $A || $Z < code) && (code < $0 || code > $9);
    }
    function isDigitEntityEnd(code) {
      return code == $SEMICOLON || code == $EOF || !isAsciiHexDigit(code);
    }
    function isNamedEntityEnd(code) {
      return code == $SEMICOLON || code == $EOF || !isAsciiLetter(code);
    }
    function isExpansionFormStart(input, offset, interpolationConfig) {
      var isInterpolationStart = interpolationConfig ? input.indexOf(interpolationConfig.start, offset) == offset : false;
      return input.charCodeAt(offset) == $LBRACE && !isInterpolationStart;
    }
    function isExpansionCaseStart(peek) {
      return peek === $EQ || isAsciiLetter(peek);
    }
    function compareCharCodeCaseInsensitive(code1, code2) {
      return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
    }
    function toUpperCaseCharCode(code) {
      return code >= $a && code <= $z ? code - $a + $A : code;
    }
    function mergeTextTokens(srcTokens) {
      var dstTokens = [];
      var lastDstToken;
      for (var i = 0; i < srcTokens.length; i++) {
        var token = srcTokens[i];
        if (lastDstToken && lastDstToken.type == TokenType$1.TEXT && token.type == TokenType$1.TEXT) {
          lastDstToken.parts[0] += token.parts[0];
          lastDstToken.sourceSpan.end = token.sourceSpan.end;
        } else {
          lastDstToken = token;
          dstTokens.push(lastDstToken);
        }
      }
      return dstTokens;
    }
    var __extends$5 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TreeError = (function(_super) {
      __extends$5(TreeError, _super);
      function TreeError(elementName, span, msg) {
        _super.call(this, span, msg);
        this.elementName = elementName;
      }
      TreeError.create = function(elementName, span, msg) {
        return new TreeError(elementName, span, msg);
      };
      return TreeError;
    }(ParseError));
    var ParseTreeResult = (function() {
      function ParseTreeResult(rootNodes, errors) {
        this.rootNodes = rootNodes;
        this.errors = errors;
      }
      return ParseTreeResult;
    }());
    var Parser$1 = (function() {
      function Parser(getTagDefinition) {
        this.getTagDefinition = getTagDefinition;
      }
      Parser.prototype.parse = function(source, url, parseExpansionForms, interpolationConfig) {
        if (parseExpansionForms === void 0) {
          parseExpansionForms = false;
        }
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        var tokensAndErrors = tokenize(source, url, this.getTagDefinition, parseExpansionForms, interpolationConfig);
        var treeAndErrors = new _TreeBuilder(tokensAndErrors.tokens, this.getTagDefinition).build();
        return new ParseTreeResult(treeAndErrors.rootNodes, ((tokensAndErrors.errors)).concat(treeAndErrors.errors));
      };
      return Parser;
    }());
    var _TreeBuilder = (function() {
      function _TreeBuilder(tokens, getTagDefinition) {
        this.tokens = tokens;
        this.getTagDefinition = getTagDefinition;
        this._index = -1;
        this._rootNodes = [];
        this._errors = [];
        this._elementStack = [];
        this._advance();
      }
      _TreeBuilder.prototype.build = function() {
        while (this._peek.type !== TokenType$1.EOF) {
          if (this._peek.type === TokenType$1.TAG_OPEN_START) {
            this._consumeStartTag(this._advance());
          } else if (this._peek.type === TokenType$1.TAG_CLOSE) {
            this._consumeEndTag(this._advance());
          } else if (this._peek.type === TokenType$1.CDATA_START) {
            this._closeVoidElement();
            this._consumeCdata(this._advance());
          } else if (this._peek.type === TokenType$1.COMMENT_START) {
            this._closeVoidElement();
            this._consumeComment(this._advance());
          } else if (this._peek.type === TokenType$1.TEXT || this._peek.type === TokenType$1.RAW_TEXT || this._peek.type === TokenType$1.ESCAPABLE_RAW_TEXT) {
            this._closeVoidElement();
            this._consumeText(this._advance());
          } else if (this._peek.type === TokenType$1.EXPANSION_FORM_START) {
            this._consumeExpansion(this._advance());
          } else {
            this._advance();
          }
        }
        return new ParseTreeResult(this._rootNodes, this._errors);
      };
      _TreeBuilder.prototype._advance = function() {
        var prev = this._peek;
        if (this._index < this.tokens.length - 1) {
          this._index++;
        }
        this._peek = this.tokens[this._index];
        return prev;
      };
      _TreeBuilder.prototype._advanceIf = function(type) {
        if (this._peek.type === type) {
          return this._advance();
        }
        return null;
      };
      _TreeBuilder.prototype._consumeCdata = function(startToken) {
        this._consumeText(this._advance());
        this._advanceIf(TokenType$1.CDATA_END);
      };
      _TreeBuilder.prototype._consumeComment = function(token) {
        var text = this._advanceIf(TokenType$1.RAW_TEXT);
        this._advanceIf(TokenType$1.COMMENT_END);
        var value = isPresent(text) ? text.parts[0].trim() : null;
        this._addToParent(new Comment(value, token.sourceSpan));
      };
      _TreeBuilder.prototype._consumeExpansion = function(token) {
        var switchValue = this._advance();
        var type = this._advance();
        var cases = [];
        while (this._peek.type === TokenType$1.EXPANSION_CASE_VALUE) {
          var expCase = this._parseExpansionCase();
          if (!expCase)
            return;
          cases.push(expCase);
        }
        if (this._peek.type !== TokenType$1.EXPANSION_FORM_END) {
          this._errors.push(TreeError.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '}'."));
          return;
        }
        var sourceSpan = new ParseSourceSpan(token.sourceSpan.start, this._peek.sourceSpan.end);
        this._addToParent(new Expansion(switchValue.parts[0], type.parts[0], cases, sourceSpan, switchValue.sourceSpan));
        this._advance();
      };
      _TreeBuilder.prototype._parseExpansionCase = function() {
        var value = this._advance();
        if (this._peek.type !== TokenType$1.EXPANSION_CASE_EXP_START) {
          this._errors.push(TreeError.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '{'."));
          return null;
        }
        var start = this._advance();
        var exp = this._collectExpansionExpTokens(start);
        if (!exp)
          return null;
        var end = this._advance();
        exp.push(new Token$1(TokenType$1.EOF, [], end.sourceSpan));
        var parsedExp = new _TreeBuilder(exp, this.getTagDefinition).build();
        if (parsedExp.errors.length > 0) {
          this._errors = this._errors.concat((parsedExp.errors));
          return null;
        }
        var sourceSpan = new ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end);
        var expSourceSpan = new ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end);
        return new ExpansionCase(value.parts[0], parsedExp.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
      };
      _TreeBuilder.prototype._collectExpansionExpTokens = function(start) {
        var exp = [];
        var expansionFormStack = [TokenType$1.EXPANSION_CASE_EXP_START];
        while (true) {
          if (this._peek.type === TokenType$1.EXPANSION_FORM_START || this._peek.type === TokenType$1.EXPANSION_CASE_EXP_START) {
            expansionFormStack.push(this._peek.type);
          }
          if (this._peek.type === TokenType$1.EXPANSION_CASE_EXP_END) {
            if (lastOnStack(expansionFormStack, TokenType$1.EXPANSION_CASE_EXP_START)) {
              expansionFormStack.pop();
              if (expansionFormStack.length == 0)
                return exp;
            } else {
              this._errors.push(TreeError.create(null, start.sourceSpan, "Invalid ICU message. Missing '}'."));
              return null;
            }
          }
          if (this._peek.type === TokenType$1.EXPANSION_FORM_END) {
            if (lastOnStack(expansionFormStack, TokenType$1.EXPANSION_FORM_START)) {
              expansionFormStack.pop();
            } else {
              this._errors.push(TreeError.create(null, start.sourceSpan, "Invalid ICU message. Missing '}'."));
              return null;
            }
          }
          if (this._peek.type === TokenType$1.EOF) {
            this._errors.push(TreeError.create(null, start.sourceSpan, "Invalid ICU message. Missing '}'."));
            return null;
          }
          exp.push(this._advance());
        }
      };
      _TreeBuilder.prototype._consumeText = function(token) {
        var text = token.parts[0];
        if (text.length > 0 && text[0] == '\n') {
          var parent_1 = this._getParentElement();
          if (isPresent(parent_1) && parent_1.children.length == 0 && this.getTagDefinition(parent_1.name).ignoreFirstLf) {
            text = text.substring(1);
          }
        }
        if (text.length > 0) {
          this._addToParent(new Text(text, token.sourceSpan));
        }
      };
      _TreeBuilder.prototype._closeVoidElement = function() {
        if (this._elementStack.length > 0) {
          var el = this._elementStack[this._elementStack.length - 1];
          if (this.getTagDefinition(el.name).isVoid) {
            this._elementStack.pop();
          }
        }
      };
      _TreeBuilder.prototype._consumeStartTag = function(startTagToken) {
        var prefix = startTagToken.parts[0];
        var name = startTagToken.parts[1];
        var attrs = [];
        while (this._peek.type === TokenType$1.ATTR_NAME) {
          attrs.push(this._consumeAttr(this._advance()));
        }
        var fullName = this._getElementFullName(prefix, name, this._getParentElement());
        var selfClosing = false;
        if (this._peek.type === TokenType$1.TAG_OPEN_END_VOID) {
          this._advance();
          selfClosing = true;
          var tagDef = this.getTagDefinition(fullName);
          if (!(tagDef.canSelfClose || getNsPrefix(fullName) !== null || tagDef.isVoid)) {
            this._errors.push(TreeError.create(fullName, startTagToken.sourceSpan, "Only void and foreign elements can be self closed \"" + startTagToken.parts[1] + "\""));
          }
        } else if (this._peek.type === TokenType$1.TAG_OPEN_END) {
          this._advance();
          selfClosing = false;
        }
        var end = this._peek.sourceSpan.start;
        var span = new ParseSourceSpan(startTagToken.sourceSpan.start, end);
        var el = new Element(fullName, attrs, [], span, span, null);
        this._pushElement(el);
        if (selfClosing) {
          this._popElement(fullName);
          el.endSourceSpan = span;
        }
      };
      _TreeBuilder.prototype._pushElement = function(el) {
        if (this._elementStack.length > 0) {
          var parentEl = this._elementStack[this._elementStack.length - 1];
          if (this.getTagDefinition(parentEl.name).isClosedByChild(el.name)) {
            this._elementStack.pop();
          }
        }
        var tagDef = this.getTagDefinition(el.name);
        var _a = this._getParentElementSkippingContainers(),
            parent = _a.parent,
            container = _a.container;
        if (parent && tagDef.requireExtraParent(parent.name)) {
          var newParent = new Element(tagDef.parentToAdd, [], [], el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
          this._insertBeforeContainer(parent, container, newParent);
        }
        this._addToParent(el);
        this._elementStack.push(el);
      };
      _TreeBuilder.prototype._consumeEndTag = function(endTagToken) {
        var fullName = this._getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
        if (this._getParentElement()) {
          this._getParentElement().endSourceSpan = endTagToken.sourceSpan;
        }
        if (this.getTagDefinition(fullName).isVoid) {
          this._errors.push(TreeError.create(fullName, endTagToken.sourceSpan, "Void elements do not have end tags \"" + endTagToken.parts[1] + "\""));
        } else if (!this._popElement(fullName)) {
          this._errors.push(TreeError.create(fullName, endTagToken.sourceSpan, "Unexpected closing tag \"" + endTagToken.parts[1] + "\""));
        }
      };
      _TreeBuilder.prototype._popElement = function(fullName) {
        for (var stackIndex = this._elementStack.length - 1; stackIndex >= 0; stackIndex--) {
          var el = this._elementStack[stackIndex];
          if (el.name == fullName) {
            this._elementStack.splice(stackIndex, this._elementStack.length - stackIndex);
            return true;
          }
          if (!this.getTagDefinition(el.name).closedByParent) {
            return false;
          }
        }
        return false;
      };
      _TreeBuilder.prototype._consumeAttr = function(attrName) {
        var fullName = mergeNsAndName(attrName.parts[0], attrName.parts[1]);
        var end = attrName.sourceSpan.end;
        var value = '';
        var valueSpan;
        if (this._peek.type === TokenType$1.ATTR_VALUE) {
          var valueToken = this._advance();
          value = valueToken.parts[0];
          end = valueToken.sourceSpan.end;
          valueSpan = valueToken.sourceSpan;
        }
        return new Attribute$1(fullName, value, new ParseSourceSpan(attrName.sourceSpan.start, end), valueSpan);
      };
      _TreeBuilder.prototype._getParentElement = function() {
        return this._elementStack.length > 0 ? this._elementStack[this._elementStack.length - 1] : null;
      };
      _TreeBuilder.prototype._getParentElementSkippingContainers = function() {
        var container = null;
        for (var i = this._elementStack.length - 1; i >= 0; i--) {
          if (this._elementStack[i].name !== 'ng-container') {
            return {
              parent: this._elementStack[i],
              container: container
            };
          }
          container = this._elementStack[i];
        }
        return {
          parent: this._elementStack[this._elementStack.length - 1],
          container: container
        };
      };
      _TreeBuilder.prototype._addToParent = function(node) {
        var parent = this._getParentElement();
        if (isPresent(parent)) {
          parent.children.push(node);
        } else {
          this._rootNodes.push(node);
        }
      };
      _TreeBuilder.prototype._insertBeforeContainer = function(parent, container, node) {
        if (!container) {
          this._addToParent(node);
          this._elementStack.push(node);
        } else {
          if (parent) {
            var index = parent.children.indexOf(container);
            parent.children[index] = node;
          } else {
            this._rootNodes.push(node);
          }
          node.children.push(container);
          this._elementStack.splice(this._elementStack.indexOf(container), 0, node);
        }
      };
      _TreeBuilder.prototype._getElementFullName = function(prefix, localName, parentElement) {
        if (isBlank(prefix)) {
          prefix = this.getTagDefinition(localName).implicitNamespacePrefix;
          if (isBlank(prefix) && isPresent(parentElement)) {
            prefix = getNsPrefix(parentElement.name);
          }
        }
        return mergeNsAndName(prefix, localName);
      };
      return _TreeBuilder;
    }());
    function lastOnStack(stack, element) {
      return stack.length > 0 && stack[stack.length - 1] === element;
    }
    var Message = (function() {
      function Message(nodes, placeholders, placeholderToMessage, meaning, description) {
        this.nodes = nodes;
        this.placeholders = placeholders;
        this.placeholderToMessage = placeholderToMessage;
        this.meaning = meaning;
        this.description = description;
      }
      return Message;
    }());
    var Text$1 = (function() {
      function Text(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      Text.prototype.visit = function(visitor, context) {
        return visitor.visitText(this, context);
      };
      return Text;
    }());
    var Container = (function() {
      function Container(children, sourceSpan) {
        this.children = children;
        this.sourceSpan = sourceSpan;
      }
      Container.prototype.visit = function(visitor, context) {
        return visitor.visitContainer(this, context);
      };
      return Container;
    }());
    var Icu = (function() {
      function Icu(expression, type, cases, sourceSpan) {
        this.expression = expression;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
      }
      Icu.prototype.visit = function(visitor, context) {
        return visitor.visitIcu(this, context);
      };
      return Icu;
    }());
    var TagPlaceholder = (function() {
      function TagPlaceholder(tag, attrs, startName, closeName, children, isVoid, sourceSpan) {
        this.tag = tag;
        this.attrs = attrs;
        this.startName = startName;
        this.closeName = closeName;
        this.children = children;
        this.isVoid = isVoid;
        this.sourceSpan = sourceSpan;
      }
      TagPlaceholder.prototype.visit = function(visitor, context) {
        return visitor.visitTagPlaceholder(this, context);
      };
      return TagPlaceholder;
    }());
    var Placeholder = (function() {
      function Placeholder(value, name, sourceSpan) {
        this.value = value;
        this.name = name;
        this.sourceSpan = sourceSpan;
      }
      Placeholder.prototype.visit = function(visitor, context) {
        return visitor.visitPlaceholder(this, context);
      };
      return Placeholder;
    }());
    var IcuPlaceholder = (function() {
      function IcuPlaceholder(value, name, sourceSpan) {
        this.value = value;
        this.name = name;
        this.sourceSpan = sourceSpan;
      }
      IcuPlaceholder.prototype.visit = function(visitor, context) {
        return visitor.visitIcuPlaceholder(this, context);
      };
      return IcuPlaceholder;
    }());
    var TAG_TO_PLACEHOLDER_NAMES = {
      'A': 'LINK',
      'B': 'BOLD_TEXT',
      'BR': 'LINE_BREAK',
      'EM': 'EMPHASISED_TEXT',
      'H1': 'HEADING_LEVEL1',
      'H2': 'HEADING_LEVEL2',
      'H3': 'HEADING_LEVEL3',
      'H4': 'HEADING_LEVEL4',
      'H5': 'HEADING_LEVEL5',
      'H6': 'HEADING_LEVEL6',
      'HR': 'HORIZONTAL_RULE',
      'I': 'ITALIC_TEXT',
      'LI': 'LIST_ITEM',
      'LINK': 'MEDIA_LINK',
      'OL': 'ORDERED_LIST',
      'P': 'PARAGRAPH',
      'Q': 'QUOTATION',
      'S': 'STRIKETHROUGH_TEXT',
      'SMALL': 'SMALL_TEXT',
      'SUB': 'SUBSTRIPT',
      'SUP': 'SUPERSCRIPT',
      'TBODY': 'TABLE_BODY',
      'TD': 'TABLE_CELL',
      'TFOOT': 'TABLE_FOOTER',
      'TH': 'TABLE_HEADER_CELL',
      'THEAD': 'TABLE_HEADER',
      'TR': 'TABLE_ROW',
      'TT': 'MONOSPACED_TEXT',
      'U': 'UNDERLINED_TEXT',
      'UL': 'UNORDERED_LIST'
    };
    var PlaceholderRegistry = (function() {
      function PlaceholderRegistry() {
        this._placeHolderNameCounts = {};
        this._signatureToName = {};
      }
      PlaceholderRegistry.prototype.getStartTagPlaceholderName = function(tag, attrs, isVoid) {
        var signature = this._hashTag(tag, attrs, isVoid);
        if (this._signatureToName[signature]) {
          return this._signatureToName[signature];
        }
        var upperTag = tag.toUpperCase();
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        var name = this._generateUniqueName(isVoid ? baseName : "START_" + baseName);
        this._signatureToName[signature] = name;
        return name;
      };
      PlaceholderRegistry.prototype.getCloseTagPlaceholderName = function(tag) {
        var signature = this._hashClosingTag(tag);
        if (this._signatureToName[signature]) {
          return this._signatureToName[signature];
        }
        var upperTag = tag.toUpperCase();
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        var name = this._generateUniqueName("CLOSE_" + baseName);
        this._signatureToName[signature] = name;
        return name;
      };
      PlaceholderRegistry.prototype.getPlaceholderName = function(name, content) {
        var upperName = name.toUpperCase();
        var signature = "PH: " + upperName + "=" + content;
        if (this._signatureToName[signature]) {
          return this._signatureToName[signature];
        }
        var uniqueName = this._generateUniqueName(upperName);
        this._signatureToName[signature] = uniqueName;
        return uniqueName;
      };
      PlaceholderRegistry.prototype.getUniquePlaceholder = function(name) {
        return this._generateUniqueName(name.toUpperCase());
      };
      PlaceholderRegistry.prototype._hashTag = function(tag, attrs, isVoid) {
        var start = "<" + tag;
        var strAttrs = Object.keys(attrs).sort().map(function(name) {
          return (" " + name + "=" + attrs[name]);
        }).join('');
        var end = isVoid ? '/>' : "></" + tag + ">";
        return start + strAttrs + end;
      };
      PlaceholderRegistry.prototype._hashClosingTag = function(tag) {
        return this._hashTag("/" + tag, {}, false);
      };
      PlaceholderRegistry.prototype._generateUniqueName = function(base) {
        var seen = this._placeHolderNameCounts.hasOwnProperty(base);
        if (!seen) {
          this._placeHolderNameCounts[base] = 1;
          return base;
        }
        var id = this._placeHolderNameCounts[base];
        this._placeHolderNameCounts[base] = id + 1;
        return base + "_" + id;
      };
      return PlaceholderRegistry;
    }());
    var _expParser = new Parser(new Lexer());
    function createI18nMessageFactory(interpolationConfig) {
      var visitor = new _I18nVisitor(_expParser, interpolationConfig);
      return function(nodes, meaning, description) {
        return visitor.toI18nMessage(nodes, meaning, description);
      };
    }
    var _I18nVisitor = (function() {
      function _I18nVisitor(_expressionParser, _interpolationConfig) {
        this._expressionParser = _expressionParser;
        this._interpolationConfig = _interpolationConfig;
      }
      _I18nVisitor.prototype.toI18nMessage = function(nodes, meaning, description) {
        this._isIcu = nodes.length == 1 && nodes[0] instanceof Expansion;
        this._icuDepth = 0;
        this._placeholderRegistry = new PlaceholderRegistry();
        this._placeholderToContent = {};
        this._placeholderToMessage = {};
        var i18nodes = visitAll(this, nodes, {});
        return new Message(i18nodes, this._placeholderToContent, this._placeholderToMessage, meaning, description);
      };
      _I18nVisitor.prototype.visitElement = function(el, context) {
        var children = visitAll(this, el.children);
        var attrs = {};
        el.attrs.forEach(function(attr) {
          attrs[attr.name] = attr.value;
        });
        var isVoid = getHtmlTagDefinition(el.name).isVoid;
        var startPhName = this._placeholderRegistry.getStartTagPlaceholderName(el.name, attrs, isVoid);
        this._placeholderToContent[startPhName] = el.sourceSpan.toString();
        var closePhName = '';
        if (!isVoid) {
          closePhName = this._placeholderRegistry.getCloseTagPlaceholderName(el.name);
          this._placeholderToContent[closePhName] = "</" + el.name + ">";
        }
        return new TagPlaceholder(el.name, attrs, startPhName, closePhName, children, isVoid, el.sourceSpan);
      };
      _I18nVisitor.prototype.visitAttribute = function(attribute, context) {
        return this._visitTextWithInterpolation(attribute.value, attribute.sourceSpan);
      };
      _I18nVisitor.prototype.visitText = function(text, context) {
        return this._visitTextWithInterpolation(text.value, text.sourceSpan);
      };
      _I18nVisitor.prototype.visitComment = function(comment, context) {
        return null;
      };
      _I18nVisitor.prototype.visitExpansion = function(icu, context) {
        var _this = this;
        this._icuDepth++;
        var i18nIcuCases = {};
        var i18nIcu = new Icu(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
        icu.cases.forEach(function(caze) {
          i18nIcuCases[caze.value] = new Container(caze.expression.map(function(node) {
            return node.visit(_this, {});
          }), caze.expSourceSpan);
        });
        this._icuDepth--;
        if (this._isIcu || this._icuDepth > 0) {
          var expPh = this._placeholderRegistry.getUniquePlaceholder("VAR_" + icu.type);
          i18nIcu.expressionPlaceholder = expPh;
          this._placeholderToContent[expPh] = icu.switchValue;
          return i18nIcu;
        }
        var phName = this._placeholderRegistry.getPlaceholderName('ICU', icu.sourceSpan.toString());
        var visitor = new _I18nVisitor(this._expressionParser, this._interpolationConfig);
        this._placeholderToMessage[phName] = visitor.toI18nMessage([icu], '', '');
        return new IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
      };
      _I18nVisitor.prototype.visitExpansionCase = function(icuCase, context) {
        throw new Error('Unreachable code');
      };
      _I18nVisitor.prototype._visitTextWithInterpolation = function(text, sourceSpan) {
        var splitInterpolation = this._expressionParser.splitInterpolation(text, sourceSpan.start.toString(), this._interpolationConfig);
        if (!splitInterpolation) {
          return new Text$1(text, sourceSpan);
        }
        var nodes = [];
        var container = new Container(nodes, sourceSpan);
        var _a = this._interpolationConfig,
            sDelimiter = _a.start,
            eDelimiter = _a.end;
        for (var i = 0; i < splitInterpolation.strings.length - 1; i++) {
          var expression = splitInterpolation.expressions[i];
          var baseName = _extractPlaceholderName(expression) || 'INTERPOLATION';
          var phName = this._placeholderRegistry.getPlaceholderName(baseName, expression);
          if (splitInterpolation.strings[i].length) {
            nodes.push(new Text$1(splitInterpolation.strings[i], sourceSpan));
          }
          nodes.push(new Placeholder(expression, phName, sourceSpan));
          this._placeholderToContent[phName] = sDelimiter + expression + eDelimiter;
        }
        var lastStringIdx = splitInterpolation.strings.length - 1;
        if (splitInterpolation.strings[lastStringIdx].length) {
          nodes.push(new Text$1(splitInterpolation.strings[lastStringIdx], sourceSpan));
        }
        return container;
      };
      return _I18nVisitor;
    }());
    var _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
    function _extractPlaceholderName(input) {
      return input.split(_CUSTOM_PH_EXP)[1];
    }
    var __extends$7 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var I18nError = (function(_super) {
      __extends$7(I18nError, _super);
      function I18nError(span, msg) {
        _super.call(this, span, msg);
      }
      return I18nError;
    }(ParseError));
    var _I18N_ATTR = 'i18n';
    var _I18N_ATTR_PREFIX = 'i18n-';
    var _I18N_COMMENT_PREFIX_REGEXP = /^i18n:?/;
    function extractMessages(nodes, interpolationConfig, implicitTags, implicitAttrs) {
      var visitor = new _Visitor(implicitTags, implicitAttrs);
      return visitor.extract(nodes, interpolationConfig);
    }
    function mergeTranslations(nodes, translations, interpolationConfig, implicitTags, implicitAttrs) {
      var visitor = new _Visitor(implicitTags, implicitAttrs);
      return visitor.merge(nodes, translations, interpolationConfig);
    }
    var ExtractionResult = (function() {
      function ExtractionResult(messages, errors) {
        this.messages = messages;
        this.errors = errors;
      }
      return ExtractionResult;
    }());
    var _VisitorMode = {};
    _VisitorMode.Extract = 0;
    _VisitorMode.Merge = 1;
    _VisitorMode[_VisitorMode.Extract] = "Extract";
    _VisitorMode[_VisitorMode.Merge] = "Merge";
    var _Visitor = (function() {
      function _Visitor(_implicitTags, _implicitAttrs) {
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
      }
      _Visitor.prototype.extract = function(nodes, interpolationConfig) {
        var _this = this;
        this._init(_VisitorMode.Extract, interpolationConfig);
        nodes.forEach(function(node) {
          return node.visit(_this, null);
        });
        if (this._inI18nBlock) {
          this._reportError(nodes[nodes.length - 1], 'Unclosed block');
        }
        return new ExtractionResult(this._messages, this._errors);
      };
      _Visitor.prototype.merge = function(nodes, translations, interpolationConfig) {
        this._init(_VisitorMode.Merge, interpolationConfig);
        this._translations = translations;
        var wrapper = new Element('wrapper', [], nodes, null, null, null);
        var translatedNode = wrapper.visit(this, null);
        if (this._inI18nBlock) {
          this._reportError(nodes[nodes.length - 1], 'Unclosed block');
        }
        return new ParseTreeResult(translatedNode.children, this._errors);
      };
      _Visitor.prototype.visitExpansionCase = function(icuCase, context) {
        var expression = visitAll(this, icuCase.expression, context);
        if (this._mode === _VisitorMode.Merge) {
          return new ExpansionCase(icuCase.value, expression, icuCase.sourceSpan, icuCase.valueSourceSpan, icuCase.expSourceSpan);
        }
      };
      _Visitor.prototype.visitExpansion = function(icu, context) {
        this._mayBeAddBlockChildren(icu);
        var wasInIcu = this._inIcu;
        if (!this._inIcu) {
          if (this._isInTranslatableSection) {
            this._addMessage([icu]);
          }
          this._inIcu = true;
        }
        var cases = visitAll(this, icu.cases, context);
        if (this._mode === _VisitorMode.Merge) {
          icu = new Expansion(icu.switchValue, icu.type, cases, icu.sourceSpan, icu.switchValueSourceSpan);
        }
        this._inIcu = wasInIcu;
        return icu;
      };
      _Visitor.prototype.visitComment = function(comment, context) {
        var isOpening = _isOpeningComment(comment);
        if (isOpening && this._isInTranslatableSection) {
          this._reportError(comment, 'Could not start a block inside a translatable section');
          return;
        }
        var isClosing = _isClosingComment(comment);
        if (isClosing && !this._inI18nBlock) {
          this._reportError(comment, 'Trying to close an unopened block');
          return;
        }
        if (!this._inI18nNode && !this._inIcu) {
          if (!this._inI18nBlock) {
            if (isOpening) {
              this._inI18nBlock = true;
              this._blockStartDepth = this._depth;
              this._blockChildren = [];
              this._blockMeaningAndDesc = comment.value.replace(_I18N_COMMENT_PREFIX_REGEXP, '').trim();
              this._openTranslatableSection(comment);
            }
          } else {
            if (isClosing) {
              if (this._depth == this._blockStartDepth) {
                this._closeTranslatableSection(comment, this._blockChildren);
                this._inI18nBlock = false;
                var message = this._addMessage(this._blockChildren, this._blockMeaningAndDesc);
                var nodes = this._translateMessage(comment, message);
                return visitAll(this, nodes);
              } else {
                this._reportError(comment, 'I18N blocks should not cross element boundaries');
                return;
              }
            }
          }
        }
      };
      _Visitor.prototype.visitText = function(text, context) {
        if (this._isInTranslatableSection) {
          this._mayBeAddBlockChildren(text);
        }
        return text;
      };
      _Visitor.prototype.visitElement = function(el, context) {
        var _this = this;
        this._mayBeAddBlockChildren(el);
        this._depth++;
        var wasInI18nNode = this._inI18nNode;
        var wasInImplicitNode = this._inImplicitNode;
        var childNodes = [];
        var translatedChildNodes;
        var i18nAttr = _getI18nAttr(el);
        var i18nMeta = i18nAttr ? i18nAttr.value : '';
        var isImplicit = this._implicitTags.some(function(tag) {
          return el.name === tag;
        }) && !this._inIcu && !this._isInTranslatableSection;
        var isTopLevelImplicit = !wasInImplicitNode && isImplicit;
        this._inImplicitNode = wasInImplicitNode || isImplicit;
        if (!this._isInTranslatableSection && !this._inIcu) {
          if (i18nAttr || isTopLevelImplicit) {
            this._inI18nNode = true;
            var message = this._addMessage(el.children, i18nMeta);
            translatedChildNodes = this._translateMessage(el, message);
          }
          if (this._mode == _VisitorMode.Extract) {
            var isTranslatable = i18nAttr || isTopLevelImplicit;
            if (isTranslatable)
              this._openTranslatableSection(el);
            visitAll(this, el.children);
            if (isTranslatable)
              this._closeTranslatableSection(el, el.children);
          }
        } else {
          if (i18nAttr || isTopLevelImplicit) {
            this._reportError(el, 'Could not mark an element as translatable inside a translatable section');
          }
          if (this._mode == _VisitorMode.Extract) {
            visitAll(this, el.children);
          }
        }
        if (this._mode === _VisitorMode.Merge) {
          var visitNodes = translatedChildNodes || el.children;
          visitNodes.forEach(function(child) {
            var visited = child.visit(_this, context);
            if (visited && !_this._isInTranslatableSection) {
              childNodes = childNodes.concat(visited);
            }
          });
        }
        this._visitAttributesOf(el);
        this._depth--;
        this._inI18nNode = wasInI18nNode;
        this._inImplicitNode = wasInImplicitNode;
        if (this._mode === _VisitorMode.Merge) {
          var translatedAttrs = this._translateAttributes(el);
          return new Element(el.name, translatedAttrs, childNodes, el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
        }
      };
      _Visitor.prototype.visitAttribute = function(attribute, context) {
        throw new Error('unreachable code');
      };
      _Visitor.prototype._init = function(mode, interpolationConfig) {
        this._mode = mode;
        this._inI18nBlock = false;
        this._inI18nNode = false;
        this._depth = 0;
        this._inIcu = false;
        this._msgCountAtSectionStart = void 0;
        this._errors = [];
        this._messages = [];
        this._inImplicitNode = false;
        this._createI18nMessage = createI18nMessageFactory(interpolationConfig);
      };
      _Visitor.prototype._visitAttributesOf = function(el) {
        var _this = this;
        var explicitAttrNameToValue = {};
        var implicitAttrNames = this._implicitAttrs[el.name] || [];
        el.attrs.filter(function(attr) {
          return attr.name.startsWith(_I18N_ATTR_PREFIX);
        }).forEach(function(attr) {
          return explicitAttrNameToValue[attr.name.slice(_I18N_ATTR_PREFIX.length)] = attr.value;
        });
        el.attrs.forEach(function(attr) {
          if (attr.name in explicitAttrNameToValue) {
            _this._addMessage([attr], explicitAttrNameToValue[attr.name]);
          } else if (implicitAttrNames.some(function(name) {
            return attr.name === name;
          })) {
            _this._addMessage([attr]);
          }
        });
      };
      _Visitor.prototype._addMessage = function(ast, meaningAndDesc) {
        if (ast.length == 0 || ast.length == 1 && ast[0] instanceof Attribute$1 && !((ast[0])).value) {
          return;
        }
        var _a = _splitMeaningAndDesc(meaningAndDesc),
            meaning = _a[0],
            description = _a[1];
        var message = this._createI18nMessage(ast, meaning, description);
        this._messages.push(message);
        return message;
      };
      _Visitor.prototype._translateMessage = function(el, message) {
        if (message && this._mode === _VisitorMode.Merge) {
          var nodes = this._translations.get(message);
          if (nodes) {
            return nodes;
          }
          this._reportError(el, "Translation unavailable for message id=\"" + this._translations.digest(message) + "\"");
        }
        return [];
      };
      _Visitor.prototype._translateAttributes = function(el) {
        var _this = this;
        var attributes = el.attrs;
        var i18nAttributeMeanings = {};
        attributes.forEach(function(attr) {
          if (attr.name.startsWith(_I18N_ATTR_PREFIX)) {
            i18nAttributeMeanings[attr.name.slice(_I18N_ATTR_PREFIX.length)] = _splitMeaningAndDesc(attr.value)[0];
          }
        });
        var translatedAttributes = [];
        attributes.forEach(function(attr) {
          if (attr.name === _I18N_ATTR || attr.name.startsWith(_I18N_ATTR_PREFIX)) {
            return;
          }
          if (attr.value && attr.value != '' && i18nAttributeMeanings.hasOwnProperty(attr.name)) {
            var meaning = i18nAttributeMeanings[attr.name];
            var message = _this._createI18nMessage([attr], meaning, '');
            var nodes = _this._translations.get(message);
            if (nodes) {
              if (nodes.length == 0) {
                translatedAttributes.push(new Attribute$1(attr.name, '', attr.sourceSpan));
              } else if (nodes[0] instanceof Text) {
                var value = ((nodes[0])).value;
                translatedAttributes.push(new Attribute$1(attr.name, value, attr.sourceSpan));
              } else {
                _this._reportError(el, "Unexpected translation for attribute \"" + attr.name + "\" (id=\"" + _this._translations.digest(message) + "\")");
              }
            } else {
              _this._reportError(el, "Translation unavailable for attribute \"" + attr.name + "\" (id=\"" + _this._translations.digest(message) + "\")");
            }
          } else {
            translatedAttributes.push(attr);
          }
        });
        return translatedAttributes;
      };
      _Visitor.prototype._mayBeAddBlockChildren = function(node) {
        if (this._inI18nBlock && !this._inIcu && this._depth == this._blockStartDepth) {
          this._blockChildren.push(node);
        }
      };
      _Visitor.prototype._openTranslatableSection = function(node) {
        if (this._isInTranslatableSection) {
          this._reportError(node, 'Unexpected section start');
        } else {
          this._msgCountAtSectionStart = this._messages.length;
        }
      };
      Object.defineProperty(_Visitor.prototype, "_isInTranslatableSection", {
        get: function() {
          return this._msgCountAtSectionStart !== void 0;
        },
        enumerable: true,
        configurable: true
      });
      _Visitor.prototype._closeTranslatableSection = function(node, directChildren) {
        if (!this._isInTranslatableSection) {
          this._reportError(node, 'Unexpected section end');
          return;
        }
        var startIndex = this._msgCountAtSectionStart;
        var significantChildren = directChildren.reduce(function(count, node) {
          return count + (node instanceof Comment ? 0 : 1);
        }, 0);
        if (significantChildren == 1) {
          for (var i = this._messages.length - 1; i >= startIndex; i--) {
            var ast = this._messages[i].nodes;
            if (!(ast.length == 1 && ast[0] instanceof Text$1)) {
              this._messages.splice(i, 1);
              break;
            }
          }
        }
        this._msgCountAtSectionStart = void 0;
      };
      _Visitor.prototype._reportError = function(node, msg) {
        this._errors.push(new I18nError(node.sourceSpan, msg));
      };
      return _Visitor;
    }());
    function _isOpeningComment(n) {
      return n instanceof Comment && n.value && n.value.startsWith('i18n');
    }
    function _isClosingComment(n) {
      return n instanceof Comment && n.value && n.value === '/i18n';
    }
    function _getI18nAttr(p) {
      return p.attrs.find(function(attr) {
        return attr.name === _I18N_ATTR;
      }) || null;
    }
    function _splitMeaningAndDesc(i18n) {
      if (!i18n)
        return ['', ''];
      var pipeIndex = i18n.indexOf('|');
      return pipeIndex == -1 ? ['', i18n] : [i18n.slice(0, pipeIndex), i18n.slice(pipeIndex + 1)];
    }
    var XmlTagDefinition = (function() {
      function XmlTagDefinition() {
        this.closedByParent = false;
        this.contentType = TagContentType.PARSABLE_DATA;
        this.isVoid = false;
        this.ignoreFirstLf = false;
        this.canSelfClose = true;
      }
      XmlTagDefinition.prototype.requireExtraParent = function(currentParent) {
        return false;
      };
      XmlTagDefinition.prototype.isClosedByChild = function(name) {
        return false;
      };
      return XmlTagDefinition;
    }());
    var _TAG_DEFINITION = new XmlTagDefinition();
    function getXmlTagDefinition(tagName) {
      return _TAG_DEFINITION;
    }
    var __extends$9 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var XmlParser = (function(_super) {
      __extends$9(XmlParser, _super);
      function XmlParser() {
        _super.call(this, getXmlTagDefinition);
      }
      XmlParser.prototype.parse = function(source, url, parseExpansionForms) {
        if (parseExpansionForms === void 0) {
          parseExpansionForms = false;
        }
        return _super.prototype.parse.call(this, source, url, parseExpansionForms, null);
      };
      return XmlParser;
    }(Parser$1));
    var __extends$10 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    function digest(message) {
      return sha1(serializeNodes(message.nodes).join('') + ("[" + message.meaning + "]"));
    }
    function decimalDigest(message) {
      var visitor = new _SerializerIgnoreIcuExpVisitor();
      var parts = message.nodes.map(function(a) {
        return a.visit(visitor, null);
      });
      return computeMsgId(parts.join(''), message.meaning);
    }
    var _SerializerVisitor = (function() {
      function _SerializerVisitor() {}
      _SerializerVisitor.prototype.visitText = function(text, context) {
        return text.value;
      };
      _SerializerVisitor.prototype.visitContainer = function(container, context) {
        var _this = this;
        return "[" + container.children.map(function(child) {
          return child.visit(_this);
        }).join(', ') + "]";
      };
      _SerializerVisitor.prototype.visitIcu = function(icu, context) {
        var _this = this;
        var strCases = Object.keys(icu.cases).map(function(k) {
          return (k + " {" + icu.cases[k].visit(_this) + "}");
        });
        return "{" + icu.expression + ", " + icu.type + ", " + strCases.join(', ') + "}";
      };
      _SerializerVisitor.prototype.visitTagPlaceholder = function(ph, context) {
        var _this = this;
        return ph.isVoid ? "<ph tag name=\"" + ph.startName + "\"/>" : "<ph tag name=\"" + ph.startName + "\">" + ph.children.map(function(child) {
          return child.visit(_this);
        }).join(', ') + "</ph name=\"" + ph.closeName + "\">";
      };
      _SerializerVisitor.prototype.visitPlaceholder = function(ph, context) {
        return ph.value ? "<ph name=\"" + ph.name + "\">" + ph.value + "</ph>" : "<ph name=\"" + ph.name + "\"/>";
      };
      _SerializerVisitor.prototype.visitIcuPlaceholder = function(ph, context) {
        return "<ph icu name=\"" + ph.name + "\">" + ph.value.visit(this) + "</ph>";
      };
      return _SerializerVisitor;
    }());
    var serializerVisitor = new _SerializerVisitor();
    function serializeNodes(nodes) {
      return nodes.map(function(a) {
        return a.visit(serializerVisitor, null);
      });
    }
    var _SerializerIgnoreIcuExpVisitor = (function(_super) {
      __extends$10(_SerializerIgnoreIcuExpVisitor, _super);
      function _SerializerIgnoreIcuExpVisitor() {
        _super.apply(this, arguments);
      }
      _SerializerIgnoreIcuExpVisitor.prototype.visitIcu = function(icu, context) {
        var _this = this;
        var strCases = Object.keys(icu.cases).map(function(k) {
          return (k + " {" + icu.cases[k].visit(_this) + "}");
        });
        return "{" + icu.type + ", " + strCases.join(', ') + "}";
      };
      return _SerializerIgnoreIcuExpVisitor;
    }(_SerializerVisitor));
    function sha1(str) {
      var utf8 = utf8Encode(str);
      var words32 = stringToWords32(utf8, Endian.Big);
      var len = utf8.length * 8;
      var w = new Array(80);
      var _a = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0],
          a = _a[0],
          b = _a[1],
          c = _a[2],
          d = _a[3],
          e = _a[4];
      words32[len >> 5] |= 0x80 << (24 - len % 32);
      words32[((len + 64 >> 9) << 4) + 15] = len;
      for (var i = 0; i < words32.length; i += 16) {
        var _b = [a, b, c, d, e],
            h0 = _b[0],
            h1 = _b[1],
            h2 = _b[2],
            h3 = _b[3],
            h4 = _b[4];
        for (var j = 0; j < 80; j++) {
          if (j < 16) {
            w[j] = words32[i + j];
          } else {
            w[j] = rol32(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          }
          var _c = fk(j, b, c, d),
              f = _c[0],
              k = _c[1];
          var temp = [rol32(a, 5), f, e, k, w[j]].reduce(add32);
          _d = [d, c, rol32(b, 30), a, temp], e = _d[0], d = _d[1], c = _d[2], b = _d[3], a = _d[4];
        }
        _e = [add32(a, h0), add32(b, h1), add32(c, h2), add32(d, h3), add32(e, h4)], a = _e[0], b = _e[1], c = _e[2], d = _e[3], e = _e[4];
      }
      return byteStringToHexString(words32ToByteString([a, b, c, d, e]));
      var _d,
          _e;
    }
    function fk(index, b, c, d) {
      if (index < 20) {
        return [(b & c) | (~b & d), 0x5a827999];
      }
      if (index < 40) {
        return [b ^ c ^ d, 0x6ed9eba1];
      }
      if (index < 60) {
        return [(b & c) | (b & d) | (c & d), 0x8f1bbcdc];
      }
      return [b ^ c ^ d, 0xca62c1d6];
    }
    function fingerprint(str) {
      var utf8 = utf8Encode(str);
      var _a = [hash32(utf8, 0), hash32(utf8, 102072)],
          hi = _a[0],
          lo = _a[1];
      if (hi == 0 && (lo == 0 || lo == 1)) {
        hi = hi ^ 0x130f9bef;
        lo = lo ^ -0x6b5f56d8;
      }
      return [hi, lo];
    }
    function computeMsgId(msg, meaning) {
      var _a = fingerprint(msg),
          hi = _a[0],
          lo = _a[1];
      if (meaning) {
        var _b = fingerprint(meaning),
            him = _b[0],
            lom = _b[1];
        _c = add64(rol64([hi, lo], 1), [him, lom]), hi = _c[0], lo = _c[1];
      }
      return byteStringToDecString(words32ToByteString([hi & 0x7fffffff, lo]));
      var _c;
    }
    function hash32(str, c) {
      var _a = [0x9e3779b9, 0x9e3779b9],
          a = _a[0],
          b = _a[1];
      var i;
      var len = str.length;
      for (i = 0; i + 12 <= len; i += 12) {
        a = add32(a, wordAt(str, i, Endian.Little));
        b = add32(b, wordAt(str, i + 4, Endian.Little));
        c = add32(c, wordAt(str, i + 8, Endian.Little));
        _b = mix([a, b, c]), a = _b[0], b = _b[1], c = _b[2];
      }
      a = add32(a, wordAt(str, i, Endian.Little));
      b = add32(b, wordAt(str, i + 4, Endian.Little));
      c = add32(c, len);
      c = add32(c, wordAt(str, i + 8, Endian.Little) << 8);
      return mix([a, b, c])[2];
      var _b;
    }
    function mix(_a) {
      var a = _a[0],
          b = _a[1],
          c = _a[2];
      a = sub32(a, b);
      a = sub32(a, c);
      a ^= c >>> 13;
      b = sub32(b, c);
      b = sub32(b, a);
      b ^= a << 8;
      c = sub32(c, a);
      c = sub32(c, b);
      c ^= b >>> 13;
      a = sub32(a, b);
      a = sub32(a, c);
      a ^= c >>> 12;
      b = sub32(b, c);
      b = sub32(b, a);
      b ^= a << 16;
      c = sub32(c, a);
      c = sub32(c, b);
      c ^= b >>> 5;
      a = sub32(a, b);
      a = sub32(a, c);
      a ^= c >>> 3;
      b = sub32(b, c);
      b = sub32(b, a);
      b ^= a << 10;
      c = sub32(c, a);
      c = sub32(c, b);
      c ^= b >>> 15;
      return [a, b, c];
    }
    var Endian = {};
    Endian.Little = 0;
    Endian.Big = 1;
    Endian[Endian.Little] = "Little";
    Endian[Endian.Big] = "Big";
    function utf8Encode(str) {
      var encoded = '';
      for (var index = 0; index < str.length; index++) {
        var codePoint = decodeSurrogatePairs(str, index);
        if (codePoint <= 0x7f) {
          encoded += String.fromCharCode(codePoint);
        } else if (codePoint <= 0x7ff) {
          encoded += String.fromCharCode(0xc0 | codePoint >>> 6, 0x80 | codePoint & 0x3f);
        } else if (codePoint <= 0xffff) {
          encoded += String.fromCharCode(0xe0 | codePoint >>> 12, 0x80 | codePoint >>> 6 & 0x3f, 0x80 | codePoint & 0x3f);
        } else if (codePoint <= 0x1fffff) {
          encoded += String.fromCharCode(0xf0 | codePoint >>> 18, 0x80 | codePoint >>> 12 & 0x3f, 0x80 | codePoint >>> 6 & 0x3f, 0x80 | codePoint & 0x3f);
        }
      }
      return encoded;
    }
    function decodeSurrogatePairs(str, index) {
      if (index < 0 || index >= str.length) {
        throw new Error("index=" + index + " is out of range in \"" + str + "\"");
      }
      var high = str.charCodeAt(index);
      if (high >= 0xd800 && high <= 0xdfff && str.length > index + 1) {
        var low = byteAt(str, index + 1);
        if (low >= 0xdc00 && low <= 0xdfff) {
          return (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000;
        }
      }
      return high;
    }
    function add32(a, b) {
      return add32to64(a, b)[1];
    }
    function add32to64(a, b) {
      var low = (a & 0xffff) + (b & 0xffff);
      var high = (a >>> 16) + (b >>> 16) + (low >>> 16);
      return [high >>> 16, (high << 16) | (low & 0xffff)];
    }
    function add64(_a, _b) {
      var ah = _a[0],
          al = _a[1];
      var bh = _b[0],
          bl = _b[1];
      var _c = add32to64(al, bl),
          carry = _c[0],
          l = _c[1];
      var h = add32(add32(ah, bh), carry);
      return [h, l];
    }
    function sub32(a, b) {
      var low = (a & 0xffff) - (b & 0xffff);
      var high = (a >> 16) - (b >> 16) + (low >> 16);
      return (high << 16) | (low & 0xffff);
    }
    function rol32(a, count) {
      return (a << count) | (a >>> (32 - count));
    }
    function rol64(_a, count) {
      var hi = _a[0],
          lo = _a[1];
      var h = (hi << count) | (lo >>> (32 - count));
      var l = (lo << count) | (hi >>> (32 - count));
      return [h, l];
    }
    function stringToWords32(str, endian) {
      var words32 = Array((str.length + 3) >>> 2);
      for (var i = 0; i < words32.length; i++) {
        words32[i] = wordAt(str, i * 4, endian);
      }
      return words32;
    }
    function byteAt(str, index) {
      return index >= str.length ? 0 : str.charCodeAt(index) & 0xff;
    }
    function wordAt(str, index, endian) {
      var word = 0;
      if (endian === Endian.Big) {
        for (var i = 0; i < 4; i++) {
          word += byteAt(str, index + i) << (24 - 8 * i);
        }
      } else {
        for (var i = 0; i < 4; i++) {
          word += byteAt(str, index + i) << 8 * i;
        }
      }
      return word;
    }
    function words32ToByteString(words32) {
      return words32.reduce(function(str, word) {
        return str + word32ToByteString(word);
      }, '');
    }
    function word32ToByteString(word) {
      var str = '';
      for (var i = 0; i < 4; i++) {
        str += String.fromCharCode((word >>> 8 * (3 - i)) & 0xff);
      }
      return str;
    }
    function byteStringToHexString(str) {
      var hex = '';
      for (var i = 0; i < str.length; i++) {
        var b = byteAt(str, i);
        hex += (b >>> 4).toString(16) + (b & 0x0f).toString(16);
      }
      return hex.toLowerCase();
    }
    function byteStringToDecString(str) {
      var decimal = '';
      var toThePower = '1';
      for (var i = str.length - 1; i >= 0; i--) {
        decimal = addBigInt(decimal, numberTimesBigInt(byteAt(str, i), toThePower));
        toThePower = numberTimesBigInt(256, toThePower);
      }
      return decimal.split('').reverse().join('');
    }
    function addBigInt(x, y) {
      var sum = '';
      var len = Math.max(x.length, y.length);
      for (var i = 0,
          carry = 0; i < len || carry; i++) {
        var tmpSum = carry + +(x[i] || 0) + +(y[i] || 0);
        if (tmpSum >= 10) {
          carry = 1;
          sum += tmpSum - 10;
        } else {
          carry = 0;
          sum += tmpSum;
        }
      }
      return sum;
    }
    function numberTimesBigInt(num, b) {
      var product = '';
      var bToThePower = b;
      for (; num !== 0; num = num >>> 1) {
        if (num & 1)
          product = addBigInt(product, bToThePower);
        bToThePower = addBigInt(bToThePower, bToThePower);
      }
      return product;
    }
    var Serializer = (function() {
      function Serializer() {}
      Serializer.prototype.write = function(messages) {};
      Serializer.prototype.load = function(content, url) {};
      Serializer.prototype.digest = function(message) {};
      Serializer.prototype.createNameMapper = function(message) {
        return null;
      };
      return Serializer;
    }());
    var __extends$11 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _Visitor$1 = (function() {
      function _Visitor() {}
      _Visitor.prototype.visitTag = function(tag) {
        var _this = this;
        var strAttrs = this._serializeAttributes(tag.attrs);
        if (tag.children.length == 0) {
          return "<" + tag.name + strAttrs + "/>";
        }
        var strChildren = tag.children.map(function(node) {
          return node.visit(_this);
        });
        return "<" + tag.name + strAttrs + ">" + strChildren.join('') + "</" + tag.name + ">";
      };
      _Visitor.prototype.visitText = function(text) {
        return text.value;
      };
      _Visitor.prototype.visitDeclaration = function(decl) {
        return "<?xml" + this._serializeAttributes(decl.attrs) + " ?>";
      };
      _Visitor.prototype._serializeAttributes = function(attrs) {
        var strAttrs = Object.keys(attrs).map(function(name) {
          return (name + "=\"" + attrs[name] + "\"");
        }).join(' ');
        return strAttrs.length > 0 ? ' ' + strAttrs : '';
      };
      _Visitor.prototype.visitDoctype = function(doctype) {
        return "<!DOCTYPE " + doctype.rootTag + " [\n" + doctype.dtd + "\n]>";
      };
      return _Visitor;
    }());
    var _visitor = new _Visitor$1();
    function serialize(nodes) {
      return nodes.map(function(node) {
        return node.visit(_visitor);
      }).join('');
    }
    var Declaration = (function() {
      function Declaration(unescapedAttrs) {
        var _this = this;
        this.attrs = {};
        Object.keys(unescapedAttrs).forEach(function(k) {
          _this.attrs[k] = _escapeXml(unescapedAttrs[k]);
        });
      }
      Declaration.prototype.visit = function(visitor) {
        return visitor.visitDeclaration(this);
      };
      return Declaration;
    }());
    var Doctype = (function() {
      function Doctype(rootTag, dtd) {
        this.rootTag = rootTag;
        this.dtd = dtd;
      }
      ;
      Doctype.prototype.visit = function(visitor) {
        return visitor.visitDoctype(this);
      };
      return Doctype;
    }());
    var Tag = (function() {
      function Tag(name, unescapedAttrs, children) {
        var _this = this;
        if (unescapedAttrs === void 0) {
          unescapedAttrs = {};
        }
        if (children === void 0) {
          children = [];
        }
        this.name = name;
        this.children = children;
        this.attrs = {};
        Object.keys(unescapedAttrs).forEach(function(k) {
          _this.attrs[k] = _escapeXml(unescapedAttrs[k]);
        });
      }
      Tag.prototype.visit = function(visitor) {
        return visitor.visitTag(this);
      };
      return Tag;
    }());
    var Text$2 = (function() {
      function Text(unescapedValue) {
        this.value = _escapeXml(unescapedValue);
      }
      ;
      Text.prototype.visit = function(visitor) {
        return visitor.visitText(this);
      };
      return Text;
    }());
    var CR = (function(_super) {
      __extends$11(CR, _super);
      function CR(ws) {
        if (ws === void 0) {
          ws = 0;
        }
        _super.call(this, "\n" + new Array(ws + 1).join(' '));
      }
      return CR;
    }(Text$2));
    var _ESCAPED_CHARS = [[/&/g, '&amp;'], [/"/g, '&quot;'], [/'/g, '&apos;'], [/</g, '&lt;'], [/>/g, '&gt;']];
    function _escapeXml(text) {
      return _ESCAPED_CHARS.reduce(function(text, entry) {
        return text.replace(entry[0], entry[1]);
      }, text);
    }
    var __extends$8 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _VERSION = '1.2';
    var _XMLNS = 'urn:oasis:names:tc:xliff:document:1.2';
    var _SOURCE_LANG = 'en';
    var _PLACEHOLDER_TAG = 'x';
    var _SOURCE_TAG = 'source';
    var _TARGET_TAG = 'target';
    var _UNIT_TAG = 'trans-unit';
    var Xliff = (function(_super) {
      __extends$8(Xliff, _super);
      function Xliff() {
        _super.apply(this, arguments);
      }
      Xliff.prototype.write = function(messages) {
        var _this = this;
        var visitor = new _WriteVisitor();
        var visited = {};
        var transUnits = [];
        messages.forEach(function(message) {
          var id = _this.digest(message);
          if (visited[id])
            return;
          visited[id] = true;
          var transUnit = new Tag(_UNIT_TAG, {
            id: id,
            datatype: 'html'
          });
          transUnit.children.push(new CR(8), new Tag(_SOURCE_TAG, {}, visitor.serialize(message.nodes)), new CR(8), new Tag(_TARGET_TAG));
          if (message.description) {
            transUnit.children.push(new CR(8), new Tag('note', {
              priority: '1',
              from: 'description'
            }, [new Text$2(message.description)]));
          }
          if (message.meaning) {
            transUnit.children.push(new CR(8), new Tag('note', {
              priority: '1',
              from: 'meaning'
            }, [new Text$2(message.meaning)]));
          }
          transUnit.children.push(new CR(6));
          transUnits.push(new CR(6), transUnit);
        });
        var body = new Tag('body', {}, transUnits.concat([new CR(4)]));
        var file = new Tag('file', {
          'source-language': _SOURCE_LANG,
          datatype: 'plaintext',
          original: 'ng2.template'
        }, [new CR(4), body, new CR(2)]);
        var xliff = new Tag('xliff', {
          version: _VERSION,
          xmlns: _XMLNS
        }, [new CR(2), file, new CR()]);
        return serialize([new Declaration({
          version: '1.0',
          encoding: 'UTF-8'
        }), new CR(), xliff, new CR()]);
      };
      Xliff.prototype.load = function(content, url) {
        var xliffParser = new XliffParser();
        var _a = xliffParser.parse(content, url),
            mlNodesByMsgId = _a.mlNodesByMsgId,
            errors = _a.errors;
        var i18nNodesByMsgId = {};
        var converter = new XmlToI18n();
        Object.keys(mlNodesByMsgId).forEach(function(msgId) {
          var _a = converter.convert(mlNodesByMsgId[msgId]),
              i18nNodes = _a.i18nNodes,
              e = _a.errors;
          errors.push.apply(errors, e);
          i18nNodesByMsgId[msgId] = i18nNodes;
        });
        if (errors.length) {
          throw new Error("xliff parse errors:\n" + errors.join('\n'));
        }
        return i18nNodesByMsgId;
      };
      Xliff.prototype.digest = function(message) {
        return digest(message);
      };
      return Xliff;
    }(Serializer));
    var _WriteVisitor = (function() {
      function _WriteVisitor() {}
      _WriteVisitor.prototype.visitText = function(text, context) {
        return [new Text$2(text.value)];
      };
      _WriteVisitor.prototype.visitContainer = function(container, context) {
        var _this = this;
        var nodes = [];
        container.children.forEach(function(node) {
          return nodes.push.apply(nodes, node.visit(_this));
        });
        return nodes;
      };
      _WriteVisitor.prototype.visitIcu = function(icu, context) {
        if (this._isInIcu) {
          throw new Error('xliff does not support nested ICU messages');
        }
        this._isInIcu = true;
        var nodes = [];
        this._isInIcu = false;
        return nodes;
      };
      _WriteVisitor.prototype.visitTagPlaceholder = function(ph, context) {
        var ctype = getCtypeForTag(ph.tag);
        var startTagPh = new Tag(_PLACEHOLDER_TAG, {
          id: ph.startName,
          ctype: ctype
        });
        if (ph.isVoid) {
          return [startTagPh];
        }
        var closeTagPh = new Tag(_PLACEHOLDER_TAG, {
          id: ph.closeName,
          ctype: ctype
        });
        return [startTagPh].concat(this.serialize(ph.children), [closeTagPh]);
      };
      _WriteVisitor.prototype.visitPlaceholder = function(ph, context) {
        return [new Tag(_PLACEHOLDER_TAG, {id: ph.name})];
      };
      _WriteVisitor.prototype.visitIcuPlaceholder = function(ph, context) {
        return [new Tag(_PLACEHOLDER_TAG, {id: ph.name})];
      };
      _WriteVisitor.prototype.serialize = function(nodes) {
        var _this = this;
        this._isInIcu = false;
        return (_a = []).concat.apply(_a, nodes.map(function(node) {
          return node.visit(_this);
        }));
        var _a;
      };
      return _WriteVisitor;
    }());
    var XliffParser = (function() {
      function XliffParser() {}
      XliffParser.prototype.parse = function(xliff, url) {
        this._unitMlNodes = [];
        this._mlNodesByMsgId = {};
        var xml = new XmlParser().parse(xliff, url, false);
        this._errors = xml.errors;
        visitAll(this, xml.rootNodes, null);
        return {
          mlNodesByMsgId: this._mlNodesByMsgId,
          errors: this._errors
        };
      };
      XliffParser.prototype.visitElement = function(element, context) {
        switch (element.name) {
          case _UNIT_TAG:
            this._unitMlNodes = null;
            var idAttr = element.attrs.find(function(attr) {
              return attr.name === 'id';
            });
            if (!idAttr) {
              this._addError(element, "<" + _UNIT_TAG + "> misses the \"id\" attribute");
            } else {
              var id = idAttr.value;
              if (this._mlNodesByMsgId.hasOwnProperty(id)) {
                this._addError(element, "Duplicated translations for msg " + id);
              } else {
                visitAll(this, element.children, null);
                if (this._unitMlNodes) {
                  this._mlNodesByMsgId[id] = this._unitMlNodes;
                } else {
                  this._addError(element, "Message " + id + " misses a translation");
                }
              }
            }
            break;
          case _SOURCE_TAG:
            break;
          case _TARGET_TAG:
            this._unitMlNodes = element.children;
            break;
          default:
            visitAll(this, element.children, null);
        }
      };
      XliffParser.prototype.visitAttribute = function(attribute, context) {};
      XliffParser.prototype.visitText = function(text, context) {};
      XliffParser.prototype.visitComment = function(comment, context) {};
      XliffParser.prototype.visitExpansion = function(expansion, context) {};
      XliffParser.prototype.visitExpansionCase = function(expansionCase, context) {};
      XliffParser.prototype._addError = function(node, message) {
        this._errors.push(new I18nError(node.sourceSpan, message));
      };
      return XliffParser;
    }());
    var XmlToI18n = (function() {
      function XmlToI18n() {}
      XmlToI18n.prototype.convert = function(nodes) {
        this._errors = [];
        return {
          i18nNodes: visitAll(this, nodes),
          errors: this._errors
        };
      };
      XmlToI18n.prototype.visitText = function(text, context) {
        return new Text$1(text.value, text.sourceSpan);
      };
      XmlToI18n.prototype.visitElement = function(el, context) {
        if (el.name === _PLACEHOLDER_TAG) {
          var nameAttr = el.attrs.find(function(attr) {
            return attr.name === 'id';
          });
          if (nameAttr) {
            return new Placeholder('', nameAttr.value, el.sourceSpan);
          }
          this._addError(el, "<" + _PLACEHOLDER_TAG + "> misses the \"id\" attribute");
        } else {
          this._addError(el, "Unexpected tag");
        }
      };
      XmlToI18n.prototype.visitExpansion = function(icu, context) {};
      XmlToI18n.prototype.visitExpansionCase = function(icuCase, context) {};
      XmlToI18n.prototype.visitComment = function(comment, context) {};
      XmlToI18n.prototype.visitAttribute = function(attribute, context) {};
      XmlToI18n.prototype._addError = function(node, message) {
        this._errors.push(new I18nError(node.sourceSpan, message));
      };
      return XmlToI18n;
    }());
    function getCtypeForTag(tag) {
      switch (tag.toLowerCase()) {
        case 'br':
          return 'lb';
        case 'img':
          return 'image';
        default:
          return "x-" + tag;
      }
    }
    var __extends$12 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _MESSAGES_TAG = 'messagebundle';
    var _MESSAGE_TAG = 'msg';
    var _PLACEHOLDER_TAG$1 = 'ph';
    var _EXEMPLE_TAG = 'ex';
    var _DOCTYPE = "<!ELEMENT messagebundle (msg)*>\n<!ATTLIST messagebundle class CDATA #IMPLIED>\n\n<!ELEMENT msg (#PCDATA|ph|source)*>\n<!ATTLIST msg id CDATA #IMPLIED>\n<!ATTLIST msg seq CDATA #IMPLIED>\n<!ATTLIST msg name CDATA #IMPLIED>\n<!ATTLIST msg desc CDATA #IMPLIED>\n<!ATTLIST msg meaning CDATA #IMPLIED>\n<!ATTLIST msg obsolete (obsolete) #IMPLIED>\n<!ATTLIST msg xml:space (default|preserve) \"default\">\n<!ATTLIST msg is_hidden CDATA #IMPLIED>\n\n<!ELEMENT source (#PCDATA)>\n\n<!ELEMENT ph (#PCDATA|ex)*>\n<!ATTLIST ph name CDATA #REQUIRED>\n\n<!ELEMENT ex (#PCDATA)>";
    var Xmb = (function(_super) {
      __extends$12(Xmb, _super);
      function Xmb() {
        _super.apply(this, arguments);
      }
      Xmb.prototype.write = function(messages) {
        var _this = this;
        var exampleVisitor = new ExampleVisitor();
        var visitor = new _Visitor$2();
        var visited = {};
        var rootNode = new Tag(_MESSAGES_TAG);
        messages.forEach(function(message) {
          var id = _this.digest(message);
          if (visited[id])
            return;
          visited[id] = true;
          var mapper = _this.createNameMapper(message);
          var attrs = {id: id};
          if (message.description) {
            attrs['desc'] = message.description;
          }
          if (message.meaning) {
            attrs['meaning'] = message.meaning;
          }
          rootNode.children.push(new CR(2), new Tag(_MESSAGE_TAG, attrs, visitor.serialize(message.nodes, {mapper: mapper})));
        });
        rootNode.children.push(new CR());
        return serialize([new Declaration({
          version: '1.0',
          encoding: 'UTF-8'
        }), new CR(), new Doctype(_MESSAGES_TAG, _DOCTYPE), new CR(), exampleVisitor.addDefaultExamples(rootNode), new CR()]);
      };
      Xmb.prototype.load = function(content, url) {
        throw new Error('Unsupported');
      };
      Xmb.prototype.digest = function(message) {
        return digest$1(message);
      };
      Xmb.prototype.createNameMapper = function(message) {
        return new XmbPlaceholderMapper(message);
      };
      return Xmb;
    }(Serializer));
    var _Visitor$2 = (function() {
      function _Visitor() {}
      _Visitor.prototype.visitText = function(text, ctx) {
        return [new Text$2(text.value)];
      };
      _Visitor.prototype.visitContainer = function(container, ctx) {
        var _this = this;
        var nodes = [];
        container.children.forEach(function(node) {
          return nodes.push.apply(nodes, node.visit(_this, ctx));
        });
        return nodes;
      };
      _Visitor.prototype.visitIcu = function(icu, ctx) {
        var _this = this;
        var nodes = [new Text$2("{" + icu.expressionPlaceholder + ", " + icu.type + ", ")];
        Object.keys(icu.cases).forEach(function(c) {
          nodes.push.apply(nodes, [new Text$2(c + " {")].concat(icu.cases[c].visit(_this, ctx), [new Text$2("} ")]));
        });
        nodes.push(new Text$2("}"));
        return nodes;
      };
      _Visitor.prototype.visitTagPlaceholder = function(ph, ctx) {
        var startEx = new Tag(_EXEMPLE_TAG, {}, [new Text$2("<" + ph.tag + ">")]);
        var name = ctx.mapper.toPublicName(ph.startName);
        var startTagPh = new Tag(_PLACEHOLDER_TAG$1, {name: name}, [startEx]);
        if (ph.isVoid) {
          return [startTagPh];
        }
        var closeEx = new Tag(_EXEMPLE_TAG, {}, [new Text$2("</" + ph.tag + ">")]);
        name = ctx.mapper.toPublicName(ph.closeName);
        var closeTagPh = new Tag(_PLACEHOLDER_TAG$1, {name: name}, [closeEx]);
        return [startTagPh].concat(this.serialize(ph.children, ctx), [closeTagPh]);
      };
      _Visitor.prototype.visitPlaceholder = function(ph, ctx) {
        var name = ctx.mapper.toPublicName(ph.name);
        return [new Tag(_PLACEHOLDER_TAG$1, {name: name})];
      };
      _Visitor.prototype.visitIcuPlaceholder = function(ph, ctx) {
        var name = ctx.mapper.toPublicName(ph.name);
        return [new Tag(_PLACEHOLDER_TAG$1, {name: name})];
      };
      _Visitor.prototype.serialize = function(nodes, ctx) {
        var _this = this;
        return (_a = []).concat.apply(_a, nodes.map(function(node) {
          return node.visit(_this, ctx);
        }));
        var _a;
      };
      return _Visitor;
    }());
    function digest$1(message) {
      return decimalDigest(message);
    }
    var ExampleVisitor = (function() {
      function ExampleVisitor() {}
      ExampleVisitor.prototype.addDefaultExamples = function(node) {
        node.visit(this);
        return node;
      };
      ExampleVisitor.prototype.visitTag = function(tag) {
        var _this = this;
        if (tag.name === _PLACEHOLDER_TAG$1) {
          if (!tag.children || tag.children.length == 0) {
            var exText = new Text$2(tag.attrs['name'] || '...');
            tag.children = [new Tag(_EXEMPLE_TAG, {}, [exText])];
          }
        } else if (tag.children) {
          tag.children.forEach(function(node) {
            return node.visit(_this);
          });
        }
      };
      ExampleVisitor.prototype.visitText = function(text) {};
      ExampleVisitor.prototype.visitDeclaration = function(decl) {};
      ExampleVisitor.prototype.visitDoctype = function(doctype) {};
      return ExampleVisitor;
    }());
    var XmbPlaceholderMapper = (function() {
      function XmbPlaceholderMapper(message) {
        var _this = this;
        this.internalToXmb = {};
        this.xmbToNextId = {};
        this.xmbToInternal = {};
        message.nodes.forEach(function(node) {
          return node.visit(_this);
        });
      }
      XmbPlaceholderMapper.prototype.toPublicName = function(internalName) {
        return this.internalToXmb.hasOwnProperty(internalName) ? this.internalToXmb[internalName] : null;
      };
      XmbPlaceholderMapper.prototype.toInternalName = function(publicName) {
        return this.xmbToInternal.hasOwnProperty(publicName) ? this.xmbToInternal[publicName] : null;
      };
      XmbPlaceholderMapper.prototype.visitText = function(text, ctx) {
        return null;
      };
      XmbPlaceholderMapper.prototype.visitContainer = function(container, ctx) {
        var _this = this;
        container.children.forEach(function(child) {
          return child.visit(_this);
        });
      };
      XmbPlaceholderMapper.prototype.visitIcu = function(icu, ctx) {
        var _this = this;
        Object.keys(icu.cases).forEach(function(k) {
          icu.cases[k].visit(_this);
        });
      };
      XmbPlaceholderMapper.prototype.visitTagPlaceholder = function(ph, ctx) {
        var _this = this;
        this.addPlaceholder(ph.startName);
        ph.children.forEach(function(child) {
          return child.visit(_this);
        });
        this.addPlaceholder(ph.closeName);
      };
      XmbPlaceholderMapper.prototype.visitPlaceholder = function(ph, ctx) {
        this.addPlaceholder(ph.name);
      };
      XmbPlaceholderMapper.prototype.visitIcuPlaceholder = function(ph, ctx) {
        this.addPlaceholder(ph.name);
      };
      XmbPlaceholderMapper.prototype.addPlaceholder = function(internalName) {
        if (!internalName || this.internalToXmb.hasOwnProperty(internalName)) {
          return;
        }
        var xmbName = internalName.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
        if (this.xmbToInternal.hasOwnProperty(xmbName)) {
          var nextId = this.xmbToNextId[xmbName];
          this.xmbToNextId[xmbName] = nextId + 1;
          xmbName = xmbName + "_" + nextId;
        } else {
          this.xmbToNextId[xmbName] = 1;
        }
        this.internalToXmb[internalName] = xmbName;
        this.xmbToInternal[xmbName] = internalName;
      };
      return XmbPlaceholderMapper;
    }());
    var __extends$13 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _TRANSLATIONS_TAG = 'translationbundle';
    var _TRANSLATION_TAG = 'translation';
    var _PLACEHOLDER_TAG$2 = 'ph';
    var Xtb = (function(_super) {
      __extends$13(Xtb, _super);
      function Xtb() {
        _super.apply(this, arguments);
      }
      Xtb.prototype.write = function(messages) {
        throw new Error('Unsupported');
      };
      Xtb.prototype.load = function(content, url) {
        var xtbParser = new XtbParser();
        var _a = xtbParser.parse(content, url),
            mlNodesByMsgId = _a.mlNodesByMsgId,
            errors = _a.errors;
        var i18nNodesByMsgId = {};
        var converter = new XmlToI18n$1();
        Object.keys(mlNodesByMsgId).forEach(function(msgId) {
          var _a = converter.convert(mlNodesByMsgId[msgId]),
              i18nNodes = _a.i18nNodes,
              e = _a.errors;
          errors.push.apply(errors, e);
          i18nNodesByMsgId[msgId] = i18nNodes;
        });
        if (errors.length) {
          throw new Error("xtb parse errors:\n" + errors.join('\n'));
        }
        return i18nNodesByMsgId;
      };
      Xtb.prototype.digest = function(message) {
        return digest$1(message);
      };
      Xtb.prototype.createNameMapper = function(message) {
        return new XmbPlaceholderMapper(message);
      };
      return Xtb;
    }(Serializer));
    var XtbParser = (function() {
      function XtbParser() {}
      XtbParser.prototype.parse = function(xtb, url) {
        this._bundleDepth = 0;
        this._mlNodesByMsgId = {};
        var xml = new XmlParser().parse(xtb, url, true);
        this._errors = xml.errors;
        visitAll(this, xml.rootNodes);
        return {
          mlNodesByMsgId: this._mlNodesByMsgId,
          errors: this._errors
        };
      };
      XtbParser.prototype.visitElement = function(element, context) {
        switch (element.name) {
          case _TRANSLATIONS_TAG:
            this._bundleDepth++;
            if (this._bundleDepth > 1) {
              this._addError(element, "<" + _TRANSLATIONS_TAG + "> elements can not be nested");
            }
            visitAll(this, element.children, null);
            this._bundleDepth--;
            break;
          case _TRANSLATION_TAG:
            var idAttr = element.attrs.find(function(attr) {
              return attr.name === 'id';
            });
            if (!idAttr) {
              this._addError(element, "<" + _TRANSLATION_TAG + "> misses the \"id\" attribute");
            } else {
              var id = idAttr.value;
              if (this._mlNodesByMsgId.hasOwnProperty(id)) {
                this._addError(element, "Duplicated translations for msg " + id);
              } else {
                this._mlNodesByMsgId[id] = element.children;
              }
            }
            break;
          default:
            this._addError(element, 'Unexpected tag');
        }
      };
      XtbParser.prototype.visitAttribute = function(attribute, context) {};
      XtbParser.prototype.visitText = function(text, context) {};
      XtbParser.prototype.visitComment = function(comment, context) {};
      XtbParser.prototype.visitExpansion = function(expansion, context) {};
      XtbParser.prototype.visitExpansionCase = function(expansionCase, context) {};
      XtbParser.prototype._addError = function(node, message) {
        this._errors.push(new I18nError(node.sourceSpan, message));
      };
      return XtbParser;
    }());
    var XmlToI18n$1 = (function() {
      function XmlToI18n() {}
      XmlToI18n.prototype.convert = function(nodes) {
        this._errors = [];
        return {
          i18nNodes: visitAll(this, nodes),
          errors: this._errors
        };
      };
      XmlToI18n.prototype.visitText = function(text, context) {
        return new Text$1(text.value, text.sourceSpan);
      };
      XmlToI18n.prototype.visitExpansion = function(icu, context) {
        var caseMap = {};
        visitAll(this, icu.cases).forEach(function(c) {
          caseMap[c.value] = new Container(c.nodes, icu.sourceSpan);
        });
        return new Icu(icu.switchValue, icu.type, caseMap, icu.sourceSpan);
      };
      XmlToI18n.prototype.visitExpansionCase = function(icuCase, context) {
        return {
          value: icuCase.value,
          nodes: visitAll(this, icuCase.expression)
        };
      };
      XmlToI18n.prototype.visitElement = function(el, context) {
        if (el.name === _PLACEHOLDER_TAG$2) {
          var nameAttr = el.attrs.find(function(attr) {
            return attr.name === 'name';
          });
          if (nameAttr) {
            return new Placeholder('', nameAttr.value, el.sourceSpan);
          }
          this._addError(el, "<" + _PLACEHOLDER_TAG$2 + "> misses the \"name\" attribute");
        } else {
          this._addError(el, "Unexpected tag");
        }
      };
      XmlToI18n.prototype.visitComment = function(comment, context) {};
      XmlToI18n.prototype.visitAttribute = function(attribute, context) {};
      XmlToI18n.prototype._addError = function(node, message) {
        this._errors.push(new I18nError(node.sourceSpan, message));
      };
      return XmlToI18n;
    }());
    var __extends$14 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate$3 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var HtmlParser = (function(_super) {
      __extends$14(HtmlParser, _super);
      function HtmlParser() {
        _super.call(this, getHtmlTagDefinition);
      }
      HtmlParser.prototype.parse = function(source, url, parseExpansionForms, interpolationConfig) {
        if (parseExpansionForms === void 0) {
          parseExpansionForms = false;
        }
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        return _super.prototype.parse.call(this, source, url, parseExpansionForms, interpolationConfig);
      };
      HtmlParser = __decorate$3([CompilerInjectable(), __metadata$3('design:paramtypes', [])], HtmlParser);
      return HtmlParser;
    }(Parser$1));
    var TranslationBundle = (function() {
      function TranslationBundle(_i18nNodesByMsgId, digest, mapperFactory) {
        if (_i18nNodesByMsgId === void 0) {
          _i18nNodesByMsgId = {};
        }
        this._i18nNodesByMsgId = _i18nNodesByMsgId;
        this.digest = digest;
        this.mapperFactory = mapperFactory;
        this._i18nToHtml = new I18nToHtmlVisitor(_i18nNodesByMsgId, digest, mapperFactory);
      }
      TranslationBundle.load = function(content, url, serializer) {
        var i18nNodesByMsgId = serializer.load(content, url);
        var digestFn = function(m) {
          return serializer.digest(m);
        };
        var mapperFactory = function(m) {
          return serializer.createNameMapper(m);
        };
        return new TranslationBundle(i18nNodesByMsgId, digestFn, mapperFactory);
      };
      TranslationBundle.prototype.get = function(srcMsg) {
        var html = this._i18nToHtml.convert(srcMsg);
        if (html.errors.length) {
          throw new Error(html.errors.join('\n'));
        }
        return html.nodes;
      };
      TranslationBundle.prototype.has = function(srcMsg) {
        return this.digest(srcMsg) in this._i18nNodesByMsgId;
      };
      return TranslationBundle;
    }());
    var I18nToHtmlVisitor = (function() {
      function I18nToHtmlVisitor(_i18nNodesByMsgId, _digest, _mapperFactory) {
        if (_i18nNodesByMsgId === void 0) {
          _i18nNodesByMsgId = {};
        }
        this._i18nNodesByMsgId = _i18nNodesByMsgId;
        this._digest = _digest;
        this._mapperFactory = _mapperFactory;
        this._contextStack = [];
        this._errors = [];
      }
      I18nToHtmlVisitor.prototype.convert = function(srcMsg) {
        this._contextStack.length = 0;
        this._errors.length = 0;
        var text = this._convertToText(srcMsg);
        var url = srcMsg.nodes[0].sourceSpan.start.file.url;
        var html = new HtmlParser().parse(text, url, true);
        return {
          nodes: html.rootNodes,
          errors: this._errors.concat(html.errors)
        };
      };
      I18nToHtmlVisitor.prototype.visitText = function(text, context) {
        return text.value;
      };
      I18nToHtmlVisitor.prototype.visitContainer = function(container, context) {
        var _this = this;
        return container.children.map(function(n) {
          return n.visit(_this);
        }).join('');
      };
      I18nToHtmlVisitor.prototype.visitIcu = function(icu, context) {
        var _this = this;
        var cases = Object.keys(icu.cases).map(function(k) {
          return (k + " {" + icu.cases[k].visit(_this) + "}");
        });
        var exp = this._srcMsg.placeholders.hasOwnProperty(icu.expression) ? this._srcMsg.placeholders[icu.expression] : icu.expression;
        return "{" + exp + ", " + icu.type + ", " + cases.join(' ') + "}";
      };
      I18nToHtmlVisitor.prototype.visitPlaceholder = function(ph, context) {
        var phName = this._mapper(ph.name);
        if (this._srcMsg.placeholders.hasOwnProperty(phName)) {
          return this._srcMsg.placeholders[phName];
        }
        if (this._srcMsg.placeholderToMessage.hasOwnProperty(phName)) {
          return this._convertToText(this._srcMsg.placeholderToMessage[phName]);
        }
        this._addError(ph, "Unknown placeholder");
        return '';
      };
      I18nToHtmlVisitor.prototype.visitTagPlaceholder = function(ph, context) {
        throw 'unreachable code';
      };
      I18nToHtmlVisitor.prototype.visitIcuPlaceholder = function(ph, context) {
        throw 'unreachable code';
      };
      I18nToHtmlVisitor.prototype._convertToText = function(srcMsg) {
        var _this = this;
        var digest = this._digest(srcMsg);
        var mapper = this._mapperFactory ? this._mapperFactory(srcMsg) : null;
        if (this._i18nNodesByMsgId.hasOwnProperty(digest)) {
          this._contextStack.push({
            msg: this._srcMsg,
            mapper: this._mapper
          });
          this._srcMsg = srcMsg;
          this._mapper = function(name) {
            return mapper ? mapper.toInternalName(name) : name;
          };
          var nodes = this._i18nNodesByMsgId[digest];
          var text = nodes.map(function(node) {
            return node.visit(_this);
          }).join('');
          var context = this._contextStack.pop();
          this._srcMsg = context.msg;
          this._mapper = context.mapper;
          return text;
        }
        this._addError(srcMsg.nodes[0], "Missing translation for message " + digest);
        return '';
      };
      I18nToHtmlVisitor.prototype._addError = function(el, msg) {
        this._errors.push(new I18nError(el.sourceSpan, msg));
      };
      return I18nToHtmlVisitor;
    }());
    var I18NHtmlParser = (function() {
      function I18NHtmlParser(_htmlParser, _translations, _translationsFormat) {
        this._htmlParser = _htmlParser;
        this._translations = _translations;
        this._translationsFormat = _translationsFormat;
      }
      I18NHtmlParser.prototype.parse = function(source, url, parseExpansionForms, interpolationConfig) {
        if (parseExpansionForms === void 0) {
          parseExpansionForms = false;
        }
        if (interpolationConfig === void 0) {
          interpolationConfig = DEFAULT_INTERPOLATION_CONFIG;
        }
        var parseResult = this._htmlParser.parse(source, url, parseExpansionForms, interpolationConfig);
        if (!this._translations || this._translations === '') {
          return parseResult;
        }
        if (parseResult.errors.length) {
          return new ParseTreeResult(parseResult.rootNodes, parseResult.errors);
        }
        var serializer = this._createSerializer();
        var translationBundle = TranslationBundle.load(this._translations, url, serializer);
        return mergeTranslations(parseResult.rootNodes, translationBundle, interpolationConfig, [], {});
      };
      I18NHtmlParser.prototype._createSerializer = function() {
        var format = (this._translationsFormat || 'xlf').toLowerCase();
        switch (format) {
          case 'xmb':
            return new Xmb();
          case 'xtb':
            return new Xtb();
          case 'xliff':
          case 'xlf':
          default:
            return new Xliff();
        }
      };
      return I18NHtmlParser;
    }());
    var APP_VIEW_MODULE_URL = assetUrl('core', 'linker/view');
    var VIEW_UTILS_MODULE_URL = assetUrl('core', 'linker/view_utils');
    var CD_MODULE_URL = assetUrl('core', 'change_detection/change_detection');
    var ANIMATION_STYLE_UTIL_ASSET_URL = assetUrl('core', 'animation/animation_style_util');
    var Identifiers = (function() {
      function Identifiers() {}
      Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS = {
        name: 'ANALYZE_FOR_ENTRY_COMPONENTS',
        moduleUrl: assetUrl('core', 'metadata/di'),
        runtime: _angular_core.ANALYZE_FOR_ENTRY_COMPONENTS
      };
      Identifiers.ViewUtils = {
        name: 'ViewUtils',
        moduleUrl: assetUrl('core', 'linker/view_utils'),
        runtime: view_utils.ViewUtils
      };
      Identifiers.AppView = {
        name: 'AppView',
        moduleUrl: APP_VIEW_MODULE_URL,
        runtime: AppView
      };
      Identifiers.DebugAppView = {
        name: 'DebugAppView',
        moduleUrl: APP_VIEW_MODULE_URL,
        runtime: DebugAppView
      };
      Identifiers.ViewContainer = {
        name: 'ViewContainer',
        moduleUrl: assetUrl('core', 'linker/view_container'),
        runtime: ViewContainer
      };
      Identifiers.ElementRef = {
        name: 'ElementRef',
        moduleUrl: assetUrl('core', 'linker/element_ref'),
        runtime: _angular_core.ElementRef
      };
      Identifiers.ViewContainerRef = {
        name: 'ViewContainerRef',
        moduleUrl: assetUrl('core', 'linker/view_container_ref'),
        runtime: _angular_core.ViewContainerRef
      };
      Identifiers.ChangeDetectorRef = {
        name: 'ChangeDetectorRef',
        moduleUrl: assetUrl('core', 'change_detection/change_detector_ref'),
        runtime: _angular_core.ChangeDetectorRef
      };
      Identifiers.RenderComponentType = {
        name: 'RenderComponentType',
        moduleUrl: assetUrl('core', 'render/api'),
        runtime: _angular_core.RenderComponentType
      };
      Identifiers.QueryList = {
        name: 'QueryList',
        moduleUrl: assetUrl('core', 'linker/query_list'),
        runtime: _angular_core.QueryList
      };
      Identifiers.TemplateRef = {
        name: 'TemplateRef',
        moduleUrl: assetUrl('core', 'linker/template_ref'),
        runtime: _angular_core.TemplateRef
      };
      Identifiers.TemplateRef_ = {
        name: 'TemplateRef_',
        moduleUrl: assetUrl('core', 'linker/template_ref'),
        runtime: TemplateRef_
      };
      Identifiers.CodegenComponentFactoryResolver = {
        name: 'CodegenComponentFactoryResolver',
        moduleUrl: assetUrl('core', 'linker/component_factory_resolver'),
        runtime: CodegenComponentFactoryResolver
      };
      Identifiers.ComponentFactoryResolver = {
        name: 'ComponentFactoryResolver',
        moduleUrl: assetUrl('core', 'linker/component_factory_resolver'),
        runtime: _angular_core.ComponentFactoryResolver
      };
      Identifiers.ComponentFactory = {
        name: 'ComponentFactory',
        runtime: _angular_core.ComponentFactory,
        moduleUrl: assetUrl('core', 'linker/component_factory')
      };
      Identifiers.ComponentRef_ = {
        name: 'ComponentRef_',
        runtime: ComponentRef_,
        moduleUrl: assetUrl('core', 'linker/component_factory')
      };
      Identifiers.ComponentRef = {
        name: 'ComponentRef',
        runtime: _angular_core.ComponentRef,
        moduleUrl: assetUrl('core', 'linker/component_factory')
      };
      Identifiers.NgModuleFactory = {
        name: 'NgModuleFactory',
        runtime: _angular_core.NgModuleFactory,
        moduleUrl: assetUrl('core', 'linker/ng_module_factory')
      };
      Identifiers.NgModuleInjector = {
        name: 'NgModuleInjector',
        runtime: NgModuleInjector,
        moduleUrl: assetUrl('core', 'linker/ng_module_factory')
      };
      Identifiers.RegisterModuleFactoryFn = {
        name: 'registerModuleFactory',
        runtime: registerModuleFactory,
        moduleUrl: assetUrl('core', 'linker/ng_module_factory_loader')
      };
      Identifiers.ValueUnwrapper = {
        name: 'ValueUnwrapper',
        moduleUrl: CD_MODULE_URL,
        runtime: ValueUnwrapper
      };
      Identifiers.Injector = {
        name: 'Injector',
        moduleUrl: assetUrl('core', 'di/injector'),
        runtime: _angular_core.Injector
      };
      Identifiers.ViewEncapsulation = {
        name: 'ViewEncapsulation',
        moduleUrl: assetUrl('core', 'metadata/view'),
        runtime: _angular_core.ViewEncapsulation
      };
      Identifiers.ViewType = {
        name: 'ViewType',
        moduleUrl: assetUrl('core', 'linker/view_type'),
        runtime: ViewType
      };
      Identifiers.ChangeDetectionStrategy = {
        name: 'ChangeDetectionStrategy',
        moduleUrl: CD_MODULE_URL,
        runtime: _angular_core.ChangeDetectionStrategy
      };
      Identifiers.StaticNodeDebugInfo = {
        name: 'StaticNodeDebugInfo',
        moduleUrl: assetUrl('core', 'linker/debug_context'),
        runtime: StaticNodeDebugInfo
      };
      Identifiers.DebugContext = {
        name: 'DebugContext',
        moduleUrl: assetUrl('core', 'linker/debug_context'),
        runtime: DebugContext
      };
      Identifiers.Renderer = {
        name: 'Renderer',
        moduleUrl: assetUrl('core', 'render/api'),
        runtime: _angular_core.Renderer
      };
      Identifiers.SimpleChange = {
        name: 'SimpleChange',
        moduleUrl: CD_MODULE_URL,
        runtime: _angular_core.SimpleChange
      };
      Identifiers.UNINITIALIZED = {
        name: 'UNINITIALIZED',
        moduleUrl: CD_MODULE_URL,
        runtime: UNINITIALIZED
      };
      Identifiers.ChangeDetectorStatus = {
        name: 'ChangeDetectorStatus',
        moduleUrl: CD_MODULE_URL,
        runtime: ChangeDetectorStatus
      };
      Identifiers.checkBinding = {
        name: 'checkBinding',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.checkBinding
      };
      Identifiers.devModeEqual = {
        name: 'devModeEqual',
        moduleUrl: CD_MODULE_URL,
        runtime: devModeEqual
      };
      Identifiers.inlineInterpolate = {
        name: 'inlineInterpolate',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.inlineInterpolate
      };
      Identifiers.interpolate = {
        name: 'interpolate',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.interpolate
      };
      Identifiers.castByValue = {
        name: 'castByValue',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.castByValue
      };
      Identifiers.EMPTY_ARRAY = {
        name: 'EMPTY_ARRAY',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.EMPTY_ARRAY
      };
      Identifiers.EMPTY_MAP = {
        name: 'EMPTY_MAP',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.EMPTY_MAP
      };
      Identifiers.createRenderElement = {
        name: 'createRenderElement',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.createRenderElement
      };
      Identifiers.selectOrCreateRenderHostElement = {
        name: 'selectOrCreateRenderHostElement',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.selectOrCreateRenderHostElement
      };
      Identifiers.pureProxies = [null, {
        name: 'pureProxy1',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy1
      }, {
        name: 'pureProxy2',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy2
      }, {
        name: 'pureProxy3',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy3
      }, {
        name: 'pureProxy4',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy4
      }, {
        name: 'pureProxy5',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy5
      }, {
        name: 'pureProxy6',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy6
      }, {
        name: 'pureProxy7',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy7
      }, {
        name: 'pureProxy8',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy8
      }, {
        name: 'pureProxy9',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy9
      }, {
        name: 'pureProxy10',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.pureProxy10
      }];
      Identifiers.SecurityContext = {
        name: 'SecurityContext',
        moduleUrl: assetUrl('core', 'security'),
        runtime: _angular_core.SecurityContext
      };
      Identifiers.AnimationKeyframe = {
        name: 'AnimationKeyframe',
        moduleUrl: assetUrl('core', 'animation/animation_keyframe'),
        runtime: AnimationKeyframe
      };
      Identifiers.AnimationStyles = {
        name: 'AnimationStyles',
        moduleUrl: assetUrl('core', 'animation/animation_styles'),
        runtime: AnimationStyles
      };
      Identifiers.NoOpAnimationPlayer = {
        name: 'NoOpAnimationPlayer',
        moduleUrl: assetUrl('core', 'animation/animation_player'),
        runtime: NoOpAnimationPlayer
      };
      Identifiers.AnimationGroupPlayer = {
        name: 'AnimationGroupPlayer',
        moduleUrl: assetUrl('core', 'animation/animation_group_player'),
        runtime: AnimationGroupPlayer
      };
      Identifiers.AnimationSequencePlayer = {
        name: 'AnimationSequencePlayer',
        moduleUrl: assetUrl('core', 'animation/animation_sequence_player'),
        runtime: AnimationSequencePlayer
      };
      Identifiers.prepareFinalAnimationStyles = {
        name: 'prepareFinalAnimationStyles',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: prepareFinalAnimationStyles
      };
      Identifiers.balanceAnimationKeyframes = {
        name: 'balanceAnimationKeyframes',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: balanceAnimationKeyframes
      };
      Identifiers.clearStyles = {
        name: 'clearStyles',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: clearStyles
      };
      Identifiers.renderStyles = {
        name: 'renderStyles',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: renderStyles
      };
      Identifiers.collectAndResolveStyles = {
        name: 'collectAndResolveStyles',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: collectAndResolveStyles
      };
      Identifiers.LOCALE_ID = {
        name: 'LOCALE_ID',
        moduleUrl: assetUrl('core', 'i18n/tokens'),
        runtime: _angular_core.LOCALE_ID
      };
      Identifiers.TRANSLATIONS_FORMAT = {
        name: 'TRANSLATIONS_FORMAT',
        moduleUrl: assetUrl('core', 'i18n/tokens'),
        runtime: _angular_core.TRANSLATIONS_FORMAT
      };
      Identifiers.setBindingDebugInfo = {
        name: 'setBindingDebugInfo',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.setBindingDebugInfo
      };
      Identifiers.setBindingDebugInfoForChanges = {
        name: 'setBindingDebugInfoForChanges',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.setBindingDebugInfoForChanges
      };
      Identifiers.AnimationTransition = {
        name: 'AnimationTransition',
        moduleUrl: assetUrl('core', 'animation/animation_transition'),
        runtime: AnimationTransition
      };
      Identifiers.InlineArray = {
        name: 'InlineArray',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: null
      };
      Identifiers.inlineArrays = [{
        name: 'InlineArray2',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.InlineArray2
      }, {
        name: 'InlineArray2',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.InlineArray2
      }, {
        name: 'InlineArray4',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.InlineArray4
      }, {
        name: 'InlineArray8',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.InlineArray8
      }, {
        name: 'InlineArray16',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.InlineArray16
      }];
      Identifiers.EMPTY_INLINE_ARRAY = {
        name: 'EMPTY_INLINE_ARRAY',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.EMPTY_INLINE_ARRAY
      };
      Identifiers.InlineArrayDynamic = {
        name: 'InlineArrayDynamic',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.InlineArrayDynamic
      };
      Identifiers.subscribeToRenderElement = {
        name: 'subscribeToRenderElement',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.subscribeToRenderElement
      };
      Identifiers.createRenderComponentType = {
        name: 'createRenderComponentType',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.createRenderComponentType
      };
      Identifiers.noop = {
        name: 'noop',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: view_utils.noop
      };
      return Identifiers;
    }());
    function assetUrl(pkg, path, type) {
      if (path === void 0) {
        path = null;
      }
      if (type === void 0) {
        type = 'src';
      }
      if (path == null) {
        return "@angular/" + pkg + "/index";
      } else {
        return "@angular/" + pkg + "/" + type + "/" + path;
      }
    }
    function resolveIdentifier(identifier) {
      return reflector.resolveIdentifier(identifier.name, identifier.moduleUrl, identifier.runtime);
    }
    function createIdentifier(identifier) {
      var reference = reflector.resolveIdentifier(identifier.name, identifier.moduleUrl, identifier.runtime);
      return {reference: reference};
    }
    function identifierToken(identifier) {
      return {identifier: identifier};
    }
    function createIdentifierToken(identifier) {
      return identifierToken(createIdentifier(identifier));
    }
    function createEnumIdentifier(enumType, name) {
      var resolvedEnum = reflector.resolveEnum(resolveIdentifier(enumType), name);
      return {reference: resolvedEnum};
    }
    var __extends$15 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
    function expandNodes(nodes) {
      var expander = new _Expander();
      return new ExpansionResult(visitAll(expander, nodes), expander.isExpanded, expander.errors);
    }
    var ExpansionResult = (function() {
      function ExpansionResult(nodes, expanded, errors) {
        this.nodes = nodes;
        this.expanded = expanded;
        this.errors = errors;
      }
      return ExpansionResult;
    }());
    var ExpansionError = (function(_super) {
      __extends$15(ExpansionError, _super);
      function ExpansionError(span, errorMsg) {
        _super.call(this, span, errorMsg);
      }
      return ExpansionError;
    }(ParseError));
    var _Expander = (function() {
      function _Expander() {
        this.isExpanded = false;
        this.errors = [];
      }
      _Expander.prototype.visitElement = function(element, context) {
        return new Element(element.name, element.attrs, visitAll(this, element.children), element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
      };
      _Expander.prototype.visitAttribute = function(attribute, context) {
        return attribute;
      };
      _Expander.prototype.visitText = function(text, context) {
        return text;
      };
      _Expander.prototype.visitComment = function(comment, context) {
        return comment;
      };
      _Expander.prototype.visitExpansion = function(icu, context) {
        this.isExpanded = true;
        return icu.type == 'plural' ? _expandPluralForm(icu, this.errors) : _expandDefaultForm(icu, this.errors);
      };
      _Expander.prototype.visitExpansionCase = function(icuCase, context) {
        throw new Error('Should not be reached');
      };
      return _Expander;
    }());
    function _expandPluralForm(ast, errors) {
      var children = ast.cases.map(function(c) {
        if (PLURAL_CASES.indexOf(c.value) == -1 && !c.value.match(/^=\d+$/)) {
          errors.push(new ExpansionError(c.valueSourceSpan, "Plural cases should be \"=<number>\" or one of " + PLURAL_CASES.join(", ")));
        }
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, expansionResult.errors);
        return new Element("template", [new Attribute$1('ngPluralCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
      });
      var switchAttr = new Attribute$1('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan);
      return new Element('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
    }
    function _expandDefaultForm(ast, errors) {
      var children = ast.cases.map(function(c) {
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, expansionResult.errors);
        if (c.value === 'other') {
          return new Element("template", [new Attribute$1('ngSwitchDefault', '', c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
        }
        return new Element("template", [new Attribute$1('ngSwitchCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
      });
      var switchAttr = new Attribute$1('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan);
      return new Element('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
    }
    var __extends$16 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ProviderError = (function(_super) {
      __extends$16(ProviderError, _super);
      function ProviderError(message, span) {
        _super.call(this, span, message);
      }
      return ProviderError;
    }(ParseError));
    var ProviderViewContext = (function() {
      function ProviderViewContext(component, sourceSpan) {
        var _this = this;
        this.component = component;
        this.sourceSpan = sourceSpan;
        this.errors = [];
        this.viewQueries = _getViewQueries(component);
        this.viewProviders = new Map();
        component.viewProviders.forEach(function(provider) {
          if (isBlank(_this.viewProviders.get(tokenReference(provider.token)))) {
            _this.viewProviders.set(tokenReference(provider.token), true);
          }
        });
      }
      return ProviderViewContext;
    }());
    var ProviderElementContext = (function() {
      function ProviderElementContext(viewContext, _parent, _isViewRoot, _directiveAsts, attrs, refs, _sourceSpan) {
        var _this = this;
        this.viewContext = viewContext;
        this._parent = _parent;
        this._isViewRoot = _isViewRoot;
        this._directiveAsts = _directiveAsts;
        this._sourceSpan = _sourceSpan;
        this._transformedProviders = new Map();
        this._seenProviders = new Map();
        this._hasViewContainer = false;
        this._attrs = {};
        attrs.forEach(function(attrAst) {
          return _this._attrs[attrAst.name] = attrAst.value;
        });
        var directivesMeta = _directiveAsts.map(function(directiveAst) {
          return directiveAst.directive;
        });
        this._allProviders = _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, viewContext.errors);
        this._contentQueries = _getContentQueries(directivesMeta);
        var queriedTokens = new Map();
        Array.from(this._allProviders.values()).forEach(function(provider) {
          _this._addQueryReadsTo(provider.token, queriedTokens);
        });
        refs.forEach(function(refAst) {
          _this._addQueryReadsTo({value: refAst.name}, queriedTokens);
        });
        if (isPresent(queriedTokens.get(resolveIdentifier(Identifiers.ViewContainerRef)))) {
          this._hasViewContainer = true;
        }
        Array.from(this._allProviders.values()).forEach(function(provider) {
          var eager = provider.eager || isPresent(queriedTokens.get(tokenReference(provider.token)));
          if (eager) {
            _this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
          }
        });
      }
      ProviderElementContext.prototype.afterElement = function() {
        var _this = this;
        Array.from(this._allProviders.values()).forEach(function(provider) {
          _this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
        });
      };
      Object.defineProperty(ProviderElementContext.prototype, "transformProviders", {
        get: function() {
          return Array.from(this._transformedProviders.values());
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ProviderElementContext.prototype, "transformedDirectiveAsts", {
        get: function() {
          var sortedProviderTypes = this.transformProviders.map(function(provider) {
            return provider.token.identifier;
          });
          var sortedDirectives = this._directiveAsts.slice();
          sortedDirectives.sort(function(dir1, dir2) {
            return sortedProviderTypes.indexOf(dir1.directive.type) - sortedProviderTypes.indexOf(dir2.directive.type);
          });
          return sortedDirectives;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ProviderElementContext.prototype, "transformedHasViewContainer", {
        get: function() {
          return this._hasViewContainer;
        },
        enumerable: true,
        configurable: true
      });
      ProviderElementContext.prototype._addQueryReadsTo = function(token, queryReadTokens) {
        this._getQueriesFor(token).forEach(function(query) {
          var queryReadToken = query.read || token;
          if (isBlank(queryReadTokens.get(tokenReference(queryReadToken)))) {
            queryReadTokens.set(tokenReference(queryReadToken), true);
          }
        });
      };
      ProviderElementContext.prototype._getQueriesFor = function(token) {
        var result = [];
        var currentEl = this;
        var distance = 0;
        var queries;
        while (currentEl !== null) {
          queries = currentEl._contentQueries.get(tokenReference(token));
          if (queries) {
            result.push.apply(result, queries.filter(function(query) {
              return query.descendants || distance <= 1;
            }));
          }
          if (currentEl._directiveAsts.length > 0) {
            distance++;
          }
          currentEl = currentEl._parent;
        }
        queries = this.viewContext.viewQueries.get(tokenReference(token));
        if (queries) {
          result.push.apply(result, queries);
        }
        return result;
      };
      ProviderElementContext.prototype._getOrCreateLocalProvider = function(requestingProviderType, token, eager) {
        var _this = this;
        var resolvedProvider = this._allProviders.get(tokenReference(token));
        if (!resolvedProvider || ((requestingProviderType === ProviderAstType.Directive || requestingProviderType === ProviderAstType.PublicService) && resolvedProvider.providerType === ProviderAstType.PrivateService) || ((requestingProviderType === ProviderAstType.PrivateService || requestingProviderType === ProviderAstType.PublicService) && resolvedProvider.providerType === ProviderAstType.Builtin)) {
          return null;
        }
        var transformedProviderAst = this._transformedProviders.get(tokenReference(token));
        if (transformedProviderAst) {
          return transformedProviderAst;
        }
        if (isPresent(this._seenProviders.get(tokenReference(token)))) {
          this.viewContext.errors.push(new ProviderError("Cannot instantiate cyclic dependency! " + tokenName(token), this._sourceSpan));
          return null;
        }
        this._seenProviders.set(tokenReference(token), true);
        var transformedProviders = resolvedProvider.providers.map(function(provider) {
          var transformedUseValue = provider.useValue;
          var transformedUseExisting = provider.useExisting;
          var transformedDeps;
          if (isPresent(provider.useExisting)) {
            var existingDiDep = _this._getDependency(resolvedProvider.providerType, {token: provider.useExisting}, eager);
            if (isPresent(existingDiDep.token)) {
              transformedUseExisting = existingDiDep.token;
            } else {
              transformedUseExisting = null;
              transformedUseValue = existingDiDep.value;
            }
          } else if (provider.useFactory) {
            var deps = provider.deps || provider.useFactory.diDeps;
            transformedDeps = deps.map(function(dep) {
              return _this._getDependency(resolvedProvider.providerType, dep, eager);
            });
          } else if (provider.useClass) {
            var deps = provider.deps || provider.useClass.diDeps;
            transformedDeps = deps.map(function(dep) {
              return _this._getDependency(resolvedProvider.providerType, dep, eager);
            });
          }
          return _transformProvider(provider, {
            useExisting: transformedUseExisting,
            useValue: transformedUseValue,
            deps: transformedDeps
          });
        });
        transformedProviderAst = _transformProviderAst(resolvedProvider, {
          eager: eager,
          providers: transformedProviders
        });
        this._transformedProviders.set(tokenReference(token), transformedProviderAst);
        return transformedProviderAst;
      };
      ProviderElementContext.prototype._getLocalDependency = function(requestingProviderType, dep, eager) {
        if (eager === void 0) {
          eager = null;
        }
        if (dep.isAttribute) {
          var attrValue = this._attrs[dep.token.value];
          return {
            isValue: true,
            value: attrValue == null ? null : attrValue
          };
        }
        if (isPresent(dep.token)) {
          if ((requestingProviderType === ProviderAstType.Directive || requestingProviderType === ProviderAstType.Component)) {
            if (tokenReference(dep.token) === resolveIdentifier(Identifiers.Renderer) || tokenReference(dep.token) === resolveIdentifier(Identifiers.ElementRef) || tokenReference(dep.token) === resolveIdentifier(Identifiers.ChangeDetectorRef) || tokenReference(dep.token) === resolveIdentifier(Identifiers.TemplateRef)) {
              return dep;
            }
            if (tokenReference(dep.token) === resolveIdentifier(Identifiers.ViewContainerRef)) {
              this._hasViewContainer = true;
            }
          }
          if (tokenReference(dep.token) === resolveIdentifier(Identifiers.Injector)) {
            return dep;
          }
          if (isPresent(this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager))) {
            return dep;
          }
        }
        return null;
      };
      ProviderElementContext.prototype._getDependency = function(requestingProviderType, dep, eager) {
        if (eager === void 0) {
          eager = null;
        }
        var currElement = this;
        var currEager = eager;
        var result = null;
        if (!dep.isSkipSelf) {
          result = this._getLocalDependency(requestingProviderType, dep, eager);
        }
        if (dep.isSelf) {
          if (!result && dep.isOptional) {
            result = {
              isValue: true,
              value: null
            };
          }
        } else {
          while (!result && currElement._parent) {
            var prevElement = currElement;
            currElement = currElement._parent;
            if (prevElement._isViewRoot) {
              currEager = false;
            }
            result = currElement._getLocalDependency(ProviderAstType.PublicService, dep, currEager);
          }
          if (!result) {
            if (!dep.isHost || this.viewContext.component.isHost || this.viewContext.component.type.reference === tokenReference(dep.token) || isPresent(this.viewContext.viewProviders.get(tokenReference(dep.token)))) {
              result = dep;
            } else {
              result = dep.isOptional ? result = {
                isValue: true,
                value: null
              } : null;
            }
          }
        }
        if (!result) {
          this.viewContext.errors.push(new ProviderError("No provider for " + tokenName(dep.token), this._sourceSpan));
        }
        return result;
      };
      return ProviderElementContext;
    }());
    var NgModuleProviderAnalyzer = (function() {
      function NgModuleProviderAnalyzer(ngModule, extraProviders, sourceSpan) {
        var _this = this;
        this._transformedProviders = new Map();
        this._seenProviders = new Map();
        this._errors = [];
        this._allProviders = new Map();
        ngModule.transitiveModule.modules.forEach(function(ngModuleType) {
          var ngModuleProvider = {
            token: {identifier: ngModuleType},
            useClass: ngModuleType
          };
          _resolveProviders([ngModuleProvider], ProviderAstType.PublicService, true, sourceSpan, _this._errors, _this._allProviders);
        });
        _resolveProviders(ngModule.transitiveModule.providers.map(function(entry) {
          return entry.provider;
        }).concat(extraProviders), ProviderAstType.PublicService, false, sourceSpan, this._errors, this._allProviders);
      }
      NgModuleProviderAnalyzer.prototype.parse = function() {
        var _this = this;
        Array.from(this._allProviders.values()).forEach(function(provider) {
          _this._getOrCreateLocalProvider(provider.token, provider.eager);
        });
        if (this._errors.length > 0) {
          var errorString = this._errors.join('\n');
          throw new Error("Provider parse errors:\n" + errorString);
        }
        return Array.from(this._transformedProviders.values());
      };
      NgModuleProviderAnalyzer.prototype._getOrCreateLocalProvider = function(token, eager) {
        var _this = this;
        var resolvedProvider = this._allProviders.get(tokenReference(token));
        if (!resolvedProvider) {
          return null;
        }
        var transformedProviderAst = this._transformedProviders.get(tokenReference(token));
        if (transformedProviderAst) {
          return transformedProviderAst;
        }
        if (isPresent(this._seenProviders.get(tokenReference(token)))) {
          this._errors.push(new ProviderError("Cannot instantiate cyclic dependency! " + tokenName(token), resolvedProvider.sourceSpan));
          return null;
        }
        this._seenProviders.set(tokenReference(token), true);
        var transformedProviders = resolvedProvider.providers.map(function(provider) {
          var transformedUseValue = provider.useValue;
          var transformedUseExisting = provider.useExisting;
          var transformedDeps;
          if (isPresent(provider.useExisting)) {
            var existingDiDep = _this._getDependency({token: provider.useExisting}, eager, resolvedProvider.sourceSpan);
            if (isPresent(existingDiDep.token)) {
              transformedUseExisting = existingDiDep.token;
            } else {
              transformedUseExisting = null;
              transformedUseValue = existingDiDep.value;
            }
          } else if (provider.useFactory) {
            var deps = provider.deps || provider.useFactory.diDeps;
            transformedDeps = deps.map(function(dep) {
              return _this._getDependency(dep, eager, resolvedProvider.sourceSpan);
            });
          } else if (provider.useClass) {
            var deps = provider.deps || provider.useClass.diDeps;
            transformedDeps = deps.map(function(dep) {
              return _this._getDependency(dep, eager, resolvedProvider.sourceSpan);
            });
          }
          return _transformProvider(provider, {
            useExisting: transformedUseExisting,
            useValue: transformedUseValue,
            deps: transformedDeps
          });
        });
        transformedProviderAst = _transformProviderAst(resolvedProvider, {
          eager: eager,
          providers: transformedProviders
        });
        this._transformedProviders.set(tokenReference(token), transformedProviderAst);
        return transformedProviderAst;
      };
      NgModuleProviderAnalyzer.prototype._getDependency = function(dep, eager, requestorSourceSpan) {
        if (eager === void 0) {
          eager = null;
        }
        var foundLocal = false;
        if (!dep.isSkipSelf && isPresent(dep.token)) {
          if (tokenReference(dep.token) === resolveIdentifier(Identifiers.Injector) || tokenReference(dep.token) === resolveIdentifier(Identifiers.ComponentFactoryResolver)) {
            foundLocal = true;
          } else if (isPresent(this._getOrCreateLocalProvider(dep.token, eager))) {
            foundLocal = true;
          }
        }
        var result = dep;
        if (dep.isSelf && !foundLocal) {
          if (dep.isOptional) {
            result = {
              isValue: true,
              value: null
            };
          } else {
            this._errors.push(new ProviderError("No provider for " + tokenName(dep.token), requestorSourceSpan));
          }
        }
        return result;
      };
      return NgModuleProviderAnalyzer;
    }());
    function _transformProvider(provider, _a) {
      var useExisting = _a.useExisting,
          useValue = _a.useValue,
          deps = _a.deps;
      return {
        token: provider.token,
        useClass: provider.useClass,
        useExisting: useExisting,
        useFactory: provider.useFactory,
        useValue: useValue,
        deps: deps,
        multi: provider.multi
      };
    }
    function _transformProviderAst(provider, _a) {
      var eager = _a.eager,
          providers = _a.providers;
      return new ProviderAst(provider.token, provider.multiProvider, provider.eager || eager, providers, provider.providerType, provider.lifecycleHooks, provider.sourceSpan);
    }
    function _resolveProvidersFromDirectives(directives, sourceSpan, targetErrors) {
      var providersByToken = new Map();
      directives.forEach(function(directive) {
        var dirProvider = {
          token: {identifier: directive.type},
          useClass: directive.type
        };
        _resolveProviders([dirProvider], directive.isComponent ? ProviderAstType.Component : ProviderAstType.Directive, true, sourceSpan, targetErrors, providersByToken);
      });
      var directivesWithComponentFirst = directives.filter(function(dir) {
        return dir.isComponent;
      }).concat(directives.filter(function(dir) {
        return !dir.isComponent;
      }));
      directivesWithComponentFirst.forEach(function(directive) {
        _resolveProviders(directive.providers, ProviderAstType.PublicService, false, sourceSpan, targetErrors, providersByToken);
        _resolveProviders(directive.viewProviders, ProviderAstType.PrivateService, false, sourceSpan, targetErrors, providersByToken);
      });
      return providersByToken;
    }
    function _resolveProviders(providers, providerType, eager, sourceSpan, targetErrors, targetProvidersByToken) {
      providers.forEach(function(provider) {
        var resolvedProvider = targetProvidersByToken.get(tokenReference(provider.token));
        if (isPresent(resolvedProvider) && !!resolvedProvider.multiProvider !== !!provider.multi) {
          targetErrors.push(new ProviderError("Mixing multi and non multi provider is not possible for token " + tokenName(resolvedProvider.token), sourceSpan));
        }
        if (!resolvedProvider) {
          var lifecycleHooks = provider.token.identifier && ((provider.token.identifier)).lifecycleHooks ? ((provider.token.identifier)).lifecycleHooks : [];
          resolvedProvider = new ProviderAst(provider.token, provider.multi, eager || lifecycleHooks.length > 0, [provider], providerType, lifecycleHooks, sourceSpan);
          targetProvidersByToken.set(tokenReference(provider.token), resolvedProvider);
        } else {
          if (!provider.multi) {
            resolvedProvider.providers.length = 0;
          }
          resolvedProvider.providers.push(provider);
        }
      });
    }
    function _getViewQueries(component) {
      var viewQueries = new Map();
      if (component.viewQueries) {
        component.viewQueries.forEach(function(query) {
          return _addQueryToTokenMap(viewQueries, query);
        });
      }
      return viewQueries;
    }
    function _getContentQueries(directives) {
      var contentQueries = new Map();
      directives.forEach(function(directive) {
        if (directive.queries) {
          directive.queries.forEach(function(query) {
            return _addQueryToTokenMap(contentQueries, query);
          });
        }
      });
      return contentQueries;
    }
    function _addQueryToTokenMap(map, query) {
      query.selectors.forEach(function(token) {
        var entry = map.get(tokenReference(token));
        if (!entry) {
          entry = [];
          map.set(tokenReference(token), entry);
        }
        entry.push(query);
      });
    }
    var ElementSchemaRegistry = (function() {
      function ElementSchemaRegistry() {}
      ElementSchemaRegistry.prototype.hasProperty = function(tagName, propName, schemaMetas) {};
      ElementSchemaRegistry.prototype.hasElement = function(tagName, schemaMetas) {};
      ElementSchemaRegistry.prototype.securityContext = function(elementName, propName, isAttribute) {};
      ElementSchemaRegistry.prototype.allKnownElementNames = function() {};
      ElementSchemaRegistry.prototype.getMappedPropName = function(propName) {};
      ElementSchemaRegistry.prototype.getDefaultComponentElementName = function() {};
      ElementSchemaRegistry.prototype.validateProperty = function(name) {};
      ElementSchemaRegistry.prototype.validateAttribute = function(name) {};
      ElementSchemaRegistry.prototype.normalizeAnimationStyleProperty = function(propName) {};
      ElementSchemaRegistry.prototype.normalizeAnimationStyleValue = function(camelCaseProp, userProvidedProp, val) {};
      return ElementSchemaRegistry;
    }());
    var StyleWithImports = (function() {
      function StyleWithImports(style, styleUrls) {
        this.style = style;
        this.styleUrls = styleUrls;
      }
      return StyleWithImports;
    }());
    function isStyleUrlResolvable(url) {
      if (url == null || url.length === 0 || url[0] == '/')
        return false;
      var schemeMatch = url.match(URL_WITH_SCHEMA_REGEXP);
      return schemeMatch === null || schemeMatch[1] == 'package' || schemeMatch[1] == 'asset';
    }
    function extractStyleUrls(resolver, baseUrl, cssText) {
      var foundUrls = [];
      var modifiedCssText = cssText.replace(CSS_COMMENT_REGEXP, '').replace(CSS_IMPORT_REGEXP, function() {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          m[_i - 0] = arguments[_i];
        }
        var url = m[1] || m[2];
        if (!isStyleUrlResolvable(url)) {
          return m[0];
        }
        foundUrls.push(resolver.resolve(baseUrl, url));
        return '';
      });
      return new StyleWithImports(modifiedCssText, foundUrls);
    }
    var CSS_IMPORT_REGEXP = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
    var CSS_COMMENT_REGEXP = /\/\*.+?\*\//g;
    var URL_WITH_SCHEMA_REGEXP = /^([^:/?#]+):/;
    var __extends$17 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var PROPERTY_PARTS_SEPARATOR = '.';
    var ATTRIBUTE_PREFIX = 'attr';
    var CLASS_PREFIX = 'class';
    var STYLE_PREFIX = 'style';
    var ANIMATE_PROP_PREFIX = 'animate-';
    var BoundPropertyType = {};
    BoundPropertyType.DEFAULT = 0;
    BoundPropertyType.LITERAL_ATTR = 1;
    BoundPropertyType.ANIMATION = 2;
    BoundPropertyType[BoundPropertyType.DEFAULT] = "DEFAULT";
    BoundPropertyType[BoundPropertyType.LITERAL_ATTR] = "LITERAL_ATTR";
    BoundPropertyType[BoundPropertyType.ANIMATION] = "ANIMATION";
    var BoundProperty = (function() {
      function BoundProperty(name, expression, type, sourceSpan) {
        this.name = name;
        this.expression = expression;
        this.type = type;
        this.sourceSpan = sourceSpan;
      }
      Object.defineProperty(BoundProperty.prototype, "isLiteral", {
        get: function() {
          return this.type === BoundPropertyType.LITERAL_ATTR;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(BoundProperty.prototype, "isAnimation", {
        get: function() {
          return this.type === BoundPropertyType.ANIMATION;
        },
        enumerable: true,
        configurable: true
      });
      return BoundProperty;
    }());
    var BindingParser = (function() {
      function BindingParser(_exprParser, _interpolationConfig, _schemaRegistry, pipes, _targetErrors) {
        var _this = this;
        this._exprParser = _exprParser;
        this._interpolationConfig = _interpolationConfig;
        this._schemaRegistry = _schemaRegistry;
        this._targetErrors = _targetErrors;
        this.pipesByName = new Map();
        pipes.forEach(function(pipe) {
          return _this.pipesByName.set(pipe.name, pipe);
        });
      }
      BindingParser.prototype.createDirectiveHostPropertyAsts = function(dirMeta, sourceSpan) {
        var _this = this;
        if (dirMeta.hostProperties) {
          var boundProps_1 = [];
          Object.keys(dirMeta.hostProperties).forEach(function(propName) {
            var expression = dirMeta.hostProperties[propName];
            if (typeof expression === 'string') {
              _this.parsePropertyBinding(propName, expression, true, sourceSpan, [], boundProps_1);
            } else {
              _this._reportError("Value of the host property binding \"" + propName + "\" needs to be a string representing an expression but got \"" + expression + "\" (" + typeof expression + ")", sourceSpan);
            }
          });
          return boundProps_1.map(function(prop) {
            return _this.createElementPropertyAst(dirMeta.selector, prop);
          });
        }
      };
      BindingParser.prototype.createDirectiveHostEventAsts = function(dirMeta, sourceSpan) {
        var _this = this;
        if (dirMeta.hostListeners) {
          var targetEventAsts_1 = [];
          Object.keys(dirMeta.hostListeners).forEach(function(propName) {
            var expression = dirMeta.hostListeners[propName];
            if (typeof expression === 'string') {
              _this.parseEvent(propName, expression, sourceSpan, [], targetEventAsts_1);
            } else {
              _this._reportError("Value of the host listener \"" + propName + "\" needs to be a string representing an expression but got \"" + expression + "\" (" + typeof expression + ")", sourceSpan);
            }
          });
          return targetEventAsts_1;
        }
      };
      BindingParser.prototype.parseInterpolation = function(value, sourceSpan) {
        var sourceInfo = sourceSpan.start.toString();
        try {
          var ast = this._exprParser.parseInterpolation(value, sourceInfo, this._interpolationConfig);
          if (ast)
            this._reportExpressionParserErrors(ast.errors, sourceSpan);
          this._checkPipes(ast, sourceSpan);
          return ast;
        } catch (e) {
          this._reportError("" + e, sourceSpan);
          return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
      };
      BindingParser.prototype.parseInlineTemplateBinding = function(prefixToken, value, sourceSpan, targetMatchableAttrs, targetProps, targetVars) {
        var bindings = this._parseTemplateBindings(prefixToken, value, sourceSpan);
        for (var i = 0; i < bindings.length; i++) {
          var binding = bindings[i];
          if (binding.keyIsVar) {
            targetVars.push(new VariableAst(binding.key, binding.name, sourceSpan));
          } else if (binding.expression) {
            this._parsePropertyAst(binding.key, binding.expression, sourceSpan, targetMatchableAttrs, targetProps);
          } else {
            targetMatchableAttrs.push([binding.key, '']);
            this.parseLiteralAttr(binding.key, null, sourceSpan, targetMatchableAttrs, targetProps);
          }
        }
      };
      BindingParser.prototype._parseTemplateBindings = function(prefixToken, value, sourceSpan) {
        var _this = this;
        var sourceInfo = sourceSpan.start.toString();
        try {
          var bindingsResult = this._exprParser.parseTemplateBindings(prefixToken, value, sourceInfo);
          this._reportExpressionParserErrors(bindingsResult.errors, sourceSpan);
          bindingsResult.templateBindings.forEach(function(binding) {
            if (binding.expression) {
              _this._checkPipes(binding.expression, sourceSpan);
            }
          });
          bindingsResult.warnings.forEach(function(warning) {
            _this._reportError(warning, sourceSpan, ParseErrorLevel.WARNING);
          });
          return bindingsResult.templateBindings;
        } catch (e) {
          this._reportError("" + e, sourceSpan);
          return [];
        }
      };
      BindingParser.prototype.parseLiteralAttr = function(name, value, sourceSpan, targetMatchableAttrs, targetProps) {
        if (_isAnimationLabel(name)) {
          name = name.substring(1);
          if (value) {
            this._reportError("Assigning animation triggers via @prop=\"exp\" attributes with an expression is invalid." + " Use property bindings (e.g. [@prop]=\"exp\") or use an attribute without a value (e.g. @prop) instead.", sourceSpan, ParseErrorLevel.FATAL);
          }
          this._parseAnimation(name, value, sourceSpan, targetMatchableAttrs, targetProps);
        } else {
          targetProps.push(new BoundProperty(name, this._exprParser.wrapLiteralPrimitive(value, ''), BoundPropertyType.LITERAL_ATTR, sourceSpan));
        }
      };
      BindingParser.prototype.parsePropertyBinding = function(name, expression, isHost, sourceSpan, targetMatchableAttrs, targetProps) {
        var isAnimationProp = false;
        if (name.startsWith(ANIMATE_PROP_PREFIX)) {
          isAnimationProp = true;
          name = name.substring(ANIMATE_PROP_PREFIX.length);
        } else if (_isAnimationLabel(name)) {
          isAnimationProp = true;
          name = name.substring(1);
        }
        if (isAnimationProp) {
          this._parseAnimation(name, expression, sourceSpan, targetMatchableAttrs, targetProps);
        } else {
          this._parsePropertyAst(name, this._parseBinding(expression, isHost, sourceSpan), sourceSpan, targetMatchableAttrs, targetProps);
        }
      };
      BindingParser.prototype.parsePropertyInterpolation = function(name, value, sourceSpan, targetMatchableAttrs, targetProps) {
        var expr = this.parseInterpolation(value, sourceSpan);
        if (expr) {
          this._parsePropertyAst(name, expr, sourceSpan, targetMatchableAttrs, targetProps);
          return true;
        }
        return false;
      };
      BindingParser.prototype._parsePropertyAst = function(name, ast, sourceSpan, targetMatchableAttrs, targetProps) {
        targetMatchableAttrs.push([name, ast.source]);
        targetProps.push(new BoundProperty(name, ast, BoundPropertyType.DEFAULT, sourceSpan));
      };
      BindingParser.prototype._parseAnimation = function(name, expression, sourceSpan, targetMatchableAttrs, targetProps) {
        var ast = this._parseBinding(expression || 'null', false, sourceSpan);
        targetMatchableAttrs.push([name, ast.source]);
        targetProps.push(new BoundProperty(name, ast, BoundPropertyType.ANIMATION, sourceSpan));
      };
      BindingParser.prototype._parseBinding = function(value, isHostBinding, sourceSpan) {
        var sourceInfo = sourceSpan.start.toString();
        try {
          var ast = isHostBinding ? this._exprParser.parseSimpleBinding(value, sourceInfo, this._interpolationConfig) : this._exprParser.parseBinding(value, sourceInfo, this._interpolationConfig);
          if (ast)
            this._reportExpressionParserErrors(ast.errors, sourceSpan);
          this._checkPipes(ast, sourceSpan);
          return ast;
        } catch (e) {
          this._reportError("" + e, sourceSpan);
          return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
      };
      BindingParser.prototype.createElementPropertyAst = function(elementSelector, boundProp) {
        if (boundProp.isAnimation) {
          return new BoundElementPropertyAst(boundProp.name, PropertyBindingType.Animation, _angular_core.SecurityContext.NONE, false, boundProp.expression, null, boundProp.sourceSpan);
        }
        var unit = null;
        var bindingType;
        var boundPropertyName = null;
        var parts = boundProp.name.split(PROPERTY_PARTS_SEPARATOR);
        var securityContexts;
        if (parts.length > 1) {
          if (parts[0] == ATTRIBUTE_PREFIX) {
            boundPropertyName = parts[1];
            this._validatePropertyOrAttributeName(boundPropertyName, boundProp.sourceSpan, true);
            securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, boundPropertyName, true);
            var nsSeparatorIdx = boundPropertyName.indexOf(':');
            if (nsSeparatorIdx > -1) {
              var ns = boundPropertyName.substring(0, nsSeparatorIdx);
              var name_1 = boundPropertyName.substring(nsSeparatorIdx + 1);
              boundPropertyName = mergeNsAndName(ns, name_1);
            }
            bindingType = PropertyBindingType.Attribute;
          } else if (parts[0] == CLASS_PREFIX) {
            boundPropertyName = parts[1];
            bindingType = PropertyBindingType.Class;
            securityContexts = [_angular_core.SecurityContext.NONE];
          } else if (parts[0] == STYLE_PREFIX) {
            unit = parts.length > 2 ? parts[2] : null;
            boundPropertyName = parts[1];
            bindingType = PropertyBindingType.Style;
            securityContexts = [_angular_core.SecurityContext.STYLE];
          }
        }
        if (boundPropertyName === null) {
          boundPropertyName = this._schemaRegistry.getMappedPropName(boundProp.name);
          securityContexts = calcPossibleSecurityContexts(this._schemaRegistry, elementSelector, boundPropertyName, false);
          bindingType = PropertyBindingType.Property;
          this._validatePropertyOrAttributeName(boundPropertyName, boundProp.sourceSpan, false);
        }
        return new BoundElementPropertyAst(boundPropertyName, bindingType, securityContexts.length === 1 ? securityContexts[0] : null, securityContexts.length > 1, boundProp.expression, unit, boundProp.sourceSpan);
      };
      BindingParser.prototype.parseEvent = function(name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
        if (_isAnimationLabel(name)) {
          name = name.substr(1);
          this._parseAnimationEvent(name, expression, sourceSpan, targetEvents);
        } else {
          this._parseEvent(name, expression, sourceSpan, targetMatchableAttrs, targetEvents);
        }
      };
      BindingParser.prototype._parseAnimationEvent = function(name, expression, sourceSpan, targetEvents) {
        var matches = splitAtPeriod(name, [name, '']);
        var eventName = matches[0];
        var phase = matches[1].toLowerCase();
        if (phase) {
          switch (phase) {
            case 'start':
            case 'done':
              var ast = this._parseAction(expression, sourceSpan);
              targetEvents.push(new BoundEventAst(eventName, null, phase, ast, sourceSpan));
              break;
            default:
              this._reportError("The provided animation output phase value \"" + phase + "\" for \"@" + eventName + "\" is not supported (use start or done)", sourceSpan);
              break;
          }
        } else {
          this._reportError("The animation trigger output event (@" + eventName + ") is missing its phase value name (start or done are currently supported)", sourceSpan);
        }
      };
      BindingParser.prototype._parseEvent = function(name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
        var _a = splitAtColon(name, [null, name]),
            target = _a[0],
            eventName = _a[1];
        var ast = this._parseAction(expression, sourceSpan);
        targetMatchableAttrs.push([name, ast.source]);
        targetEvents.push(new BoundEventAst(eventName, target, null, ast, sourceSpan));
      };
      BindingParser.prototype._parseAction = function(value, sourceSpan) {
        var sourceInfo = sourceSpan.start.toString();
        try {
          var ast = this._exprParser.parseAction(value, sourceInfo, this._interpolationConfig);
          if (ast) {
            this._reportExpressionParserErrors(ast.errors, sourceSpan);
          }
          if (!ast || ast.ast instanceof EmptyExpr) {
            this._reportError("Empty expressions are not allowed", sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
          }
          this._checkPipes(ast, sourceSpan);
          return ast;
        } catch (e) {
          this._reportError("" + e, sourceSpan);
          return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
      };
      BindingParser.prototype._reportError = function(message, sourceSpan, level) {
        if (level === void 0) {
          level = ParseErrorLevel.FATAL;
        }
        this._targetErrors.push(new ParseError(sourceSpan, message, level));
      };
      BindingParser.prototype._reportExpressionParserErrors = function(errors, sourceSpan) {
        for (var _i = 0,
            errors_1 = errors; _i < errors_1.length; _i++) {
          var error = errors_1[_i];
          this._reportError(error.message, sourceSpan);
        }
      };
      BindingParser.prototype._checkPipes = function(ast, sourceSpan) {
        var _this = this;
        if (ast) {
          var collector = new PipeCollector();
          ast.visit(collector);
          collector.pipes.forEach(function(ast, pipeName) {
            if (!_this.pipesByName.has(pipeName)) {
              _this._reportError("The pipe '" + pipeName + "' could not be found", new ParseSourceSpan(sourceSpan.start.moveBy(ast.span.start), sourceSpan.start.moveBy(ast.span.end)));
            }
          });
        }
      };
      BindingParser.prototype._validatePropertyOrAttributeName = function(propName, sourceSpan, isAttr) {
        var report = isAttr ? this._schemaRegistry.validateAttribute(propName) : this._schemaRegistry.validateProperty(propName);
        if (report.error) {
          this._reportError(report.msg, sourceSpan, ParseErrorLevel.FATAL);
        }
      };
      return BindingParser;
    }());
    var PipeCollector = (function(_super) {
      __extends$17(PipeCollector, _super);
      function PipeCollector() {
        _super.apply(this, arguments);
        this.pipes = new Map();
      }
      PipeCollector.prototype.visitPipe = function(ast, context) {
        this.pipes.set(ast.name, ast);
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
      };
      return PipeCollector;
    }(RecursiveAstVisitor));
    function _isAnimationLabel(name) {
      return name[0] == '@';
    }
    function calcPossibleSecurityContexts(registry, selector, propName, isAttribute) {
      var ctxs = [];
      CssSelector.parse(selector).forEach(function(selector) {
        var elementNames = selector.element ? [selector.element] : registry.allKnownElementNames();
        var notElementNames = new Set(selector.notSelectors.filter(function(selector) {
          return selector.isElementSelector();
        }).map(function(selector) {
          return selector.element;
        }));
        var possibleElementNames = elementNames.filter(function(elementName) {
          return !notElementNames.has(elementName);
        });
        ctxs.push.apply(ctxs, possibleElementNames.map(function(elementName) {
          return registry.securityContext(elementName, propName, isAttribute);
        }));
      });
      return ctxs.length === 0 ? [_angular_core.SecurityContext.NONE] : Array.from(new Set(ctxs)).sort();
    }
    var NG_CONTENT_SELECT_ATTR = 'select';
    var NG_CONTENT_ELEMENT = 'ng-content';
    var LINK_ELEMENT = 'link';
    var LINK_STYLE_REL_ATTR = 'rel';
    var LINK_STYLE_HREF_ATTR = 'href';
    var LINK_STYLE_REL_VALUE = 'stylesheet';
    var STYLE_ELEMENT = 'style';
    var SCRIPT_ELEMENT = 'script';
    var NG_NON_BINDABLE_ATTR = 'ngNonBindable';
    var NG_PROJECT_AS = 'ngProjectAs';
    function preparseElement(ast) {
      var selectAttr = null;
      var hrefAttr = null;
      var relAttr = null;
      var nonBindable = false;
      var projectAs = null;
      ast.attrs.forEach(function(attr) {
        var lcAttrName = attr.name.toLowerCase();
        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
          selectAttr = attr.value;
        } else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
          hrefAttr = attr.value;
        } else if (lcAttrName == LINK_STYLE_REL_ATTR) {
          relAttr = attr.value;
        } else if (attr.name == NG_NON_BINDABLE_ATTR) {
          nonBindable = true;
        } else if (attr.name == NG_PROJECT_AS) {
          if (attr.value.length > 0) {
            projectAs = attr.value;
          }
        }
      });
      selectAttr = normalizeNgContentSelect(selectAttr);
      var nodeName = ast.name.toLowerCase();
      var type = PreparsedElementType.OTHER;
      if (splitNsName(nodeName)[1] == NG_CONTENT_ELEMENT) {
        type = PreparsedElementType.NG_CONTENT;
      } else if (nodeName == STYLE_ELEMENT) {
        type = PreparsedElementType.STYLE;
      } else if (nodeName == SCRIPT_ELEMENT) {
        type = PreparsedElementType.SCRIPT;
      } else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = PreparsedElementType.STYLESHEET;
      }
      return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
    }
    var PreparsedElementType = {};
    PreparsedElementType.NG_CONTENT = 0;
    PreparsedElementType.STYLE = 1;
    PreparsedElementType.STYLESHEET = 2;
    PreparsedElementType.SCRIPT = 3;
    PreparsedElementType.OTHER = 4;
    PreparsedElementType[PreparsedElementType.NG_CONTENT] = "NG_CONTENT";
    PreparsedElementType[PreparsedElementType.STYLE] = "STYLE";
    PreparsedElementType[PreparsedElementType.STYLESHEET] = "STYLESHEET";
    PreparsedElementType[PreparsedElementType.SCRIPT] = "SCRIPT";
    PreparsedElementType[PreparsedElementType.OTHER] = "OTHER";
    var PreparsedElement = (function() {
      function PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
        this.projectAs = projectAs;
      }
      return PreparsedElement;
    }());
    function normalizeNgContentSelect(selectAttr) {
      if (selectAttr === null || selectAttr.length === 0) {
        return '*';
      }
      return selectAttr;
    }
    var __extends = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(let-)|(ref-|#)|(on-)|(bindon-)|(@))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/;
    var KW_BIND_IDX = 1;
    var KW_LET_IDX = 2;
    var KW_REF_IDX = 3;
    var KW_ON_IDX = 4;
    var KW_BINDON_IDX = 5;
    var KW_AT_IDX = 6;
    var IDENT_KW_IDX = 7;
    var IDENT_BANANA_BOX_IDX = 8;
    var IDENT_PROPERTY_IDX = 9;
    var IDENT_EVENT_IDX = 10;
    var TEMPLATE_ELEMENT = 'template';
    var TEMPLATE_ATTR = 'template';
    var TEMPLATE_ATTR_PREFIX = '*';
    var CLASS_ATTR = 'class';
    var TEXT_CSS_SELECTOR = CssSelector.parse('*')[0];
    var TEMPLATE_TRANSFORMS = new _angular_core.OpaqueToken('TemplateTransforms');
    var TemplateParseError = (function(_super) {
      __extends(TemplateParseError, _super);
      function TemplateParseError(message, span, level) {
        _super.call(this, span, message, level);
      }
      return TemplateParseError;
    }(ParseError));
    var TemplateParseResult = (function() {
      function TemplateParseResult(templateAst, errors) {
        this.templateAst = templateAst;
        this.errors = errors;
      }
      return TemplateParseResult;
    }());
    var TemplateParser = (function() {
      function TemplateParser(_exprParser, _schemaRegistry, _htmlParser, _console, transforms) {
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
        this._htmlParser = _htmlParser;
        this._console = _console;
        this.transforms = transforms;
      }
      TemplateParser.prototype.parse = function(component, template, directives, pipes, schemas, templateUrl) {
        var result = this.tryParse(component, template, directives, pipes, schemas, templateUrl);
        var warnings = result.errors.filter(function(error) {
          return error.level === ParseErrorLevel.WARNING;
        });
        var errors = result.errors.filter(function(error) {
          return error.level === ParseErrorLevel.FATAL;
        });
        if (warnings.length > 0) {
          this._console.warn("Template parse warnings:\n" + warnings.join('\n'));
        }
        if (errors.length > 0) {
          var errorString = errors.join('\n');
          throw new SyntaxError("Template parse errors:\n" + errorString);
        }
        return result.templateAst;
      };
      TemplateParser.prototype.tryParse = function(component, template, directives, pipes, schemas, templateUrl) {
        return this.tryParseHtml(this.expandHtml(this._htmlParser.parse(template, templateUrl, true, this.getInterpolationConfig(component))), component, template, directives, pipes, schemas, templateUrl);
      };
      TemplateParser.prototype.tryParseHtml = function(htmlAstWithErrors, component, template, directives, pipes, schemas, templateUrl) {
        var result;
        var errors = htmlAstWithErrors.errors;
        if (htmlAstWithErrors.rootNodes.length > 0) {
          var uniqDirectives = removeSummaryDuplicates(directives);
          var uniqPipes = removeSummaryDuplicates(pipes);
          var providerViewContext = new ProviderViewContext(component, htmlAstWithErrors.rootNodes[0].sourceSpan);
          var interpolationConfig = void 0;
          if (component.template && component.template.interpolation) {
            interpolationConfig = {
              start: component.template.interpolation[0],
              end: component.template.interpolation[1]
            };
          }
          var bindingParser = new BindingParser(this._exprParser, interpolationConfig, this._schemaRegistry, uniqPipes, errors);
          var parseVisitor = new TemplateParseVisitor(providerViewContext, uniqDirectives, bindingParser, this._schemaRegistry, schemas, errors);
          result = visitAll(parseVisitor, htmlAstWithErrors.rootNodes, EMPTY_ELEMENT_CONTEXT);
          errors.push.apply(errors, providerViewContext.errors);
        } else {
          result = [];
        }
        this._assertNoReferenceDuplicationOnTemplate(result, errors);
        if (errors.length > 0) {
          return new TemplateParseResult(result, errors);
        }
        if (this.transforms) {
          this.transforms.forEach(function(transform) {
            result = templateVisitAll(transform, result);
          });
        }
        return new TemplateParseResult(result, errors);
      };
      TemplateParser.prototype.expandHtml = function(htmlAstWithErrors, forced) {
        if (forced === void 0) {
          forced = false;
        }
        var errors = htmlAstWithErrors.errors;
        if (errors.length == 0 || forced) {
          var expandedHtmlAst = expandNodes(htmlAstWithErrors.rootNodes);
          errors.push.apply(errors, expandedHtmlAst.errors);
          htmlAstWithErrors = new ParseTreeResult(expandedHtmlAst.nodes, errors);
        }
        return htmlAstWithErrors;
      };
      TemplateParser.prototype.getInterpolationConfig = function(component) {
        if (component.template) {
          return InterpolationConfig.fromArray(component.template.interpolation);
        }
      };
      TemplateParser.prototype._assertNoReferenceDuplicationOnTemplate = function(result, errors) {
        var existingReferences = [];
        result.filter(function(element) {
          return !!((element)).references;
        }).forEach(function(element) {
          return ((element)).references.forEach(function(reference) {
            var name = reference.name;
            if (existingReferences.indexOf(name) < 0) {
              existingReferences.push(name);
            } else {
              var error = new TemplateParseError("Reference \"#" + name + "\" is defined several times", reference.sourceSpan, ParseErrorLevel.FATAL);
              errors.push(error);
            }
          });
        });
      };
      TemplateParser.ctorParameters = function() {
        return [{type: Parser}, {type: ElementSchemaRegistry}, {type: I18NHtmlParser}, {type: Console}, {
          type: Array,
          decorators: [{type: _angular_core.Optional}, {
            type: _angular_core.Inject,
            args: [TEMPLATE_TRANSFORMS]
          }]
        }];
      };
      TemplateParser = __decorate([CompilerInjectable(), __metadata('design:paramtypes', [Parser, ElementSchemaRegistry, I18NHtmlParser, Console, Array])], TemplateParser);
      return TemplateParser;
    }());
    var TemplateParseVisitor = (function() {
      function TemplateParseVisitor(providerViewContext, directives, _bindingParser, _schemaRegistry, _schemas, _targetErrors) {
        var _this = this;
        this.providerViewContext = providerViewContext;
        this._bindingParser = _bindingParser;
        this._schemaRegistry = _schemaRegistry;
        this._schemas = _schemas;
        this._targetErrors = _targetErrors;
        this.selectorMatcher = new SelectorMatcher();
        this.directivesIndex = new Map();
        this.ngContentCount = 0;
        directives.forEach(function(directive, index) {
          var selector = CssSelector.parse(directive.selector);
          _this.selectorMatcher.addSelectables(selector, directive);
          _this.directivesIndex.set(directive, index);
        });
      }
      TemplateParseVisitor.prototype.visitExpansion = function(expansion, context) {
        return null;
      };
      TemplateParseVisitor.prototype.visitExpansionCase = function(expansionCase, context) {
        return null;
      };
      TemplateParseVisitor.prototype.visitText = function(text, parent) {
        var ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
        var expr = this._bindingParser.parseInterpolation(text.value, text.sourceSpan);
        if (expr) {
          return new BoundTextAst(expr, ngContentIndex, text.sourceSpan);
        } else {
          return new TextAst(text.value, ngContentIndex, text.sourceSpan);
        }
      };
      TemplateParseVisitor.prototype.visitAttribute = function(attribute, context) {
        return new AttrAst(attribute.name, attribute.value, attribute.sourceSpan);
      };
      TemplateParseVisitor.prototype.visitComment = function(comment, context) {
        return null;
      };
      TemplateParseVisitor.prototype.visitElement = function(element, parent) {
        var _this = this;
        var nodeName = element.name;
        var preparsedElement = preparseElement(element);
        if (preparsedElement.type === PreparsedElementType.SCRIPT || preparsedElement.type === PreparsedElementType.STYLE) {
          return null;
        }
        if (preparsedElement.type === PreparsedElementType.STYLESHEET && isStyleUrlResolvable(preparsedElement.hrefAttr)) {
          return null;
        }
        var matchableAttrs = [];
        var elementOrDirectiveProps = [];
        var elementOrDirectiveRefs = [];
        var elementVars = [];
        var events = [];
        var templateElementOrDirectiveProps = [];
        var templateMatchableAttrs = [];
        var templateElementVars = [];
        var hasInlineTemplates = false;
        var attrs = [];
        var lcElName = splitNsName(nodeName.toLowerCase())[1];
        var isTemplateElement = lcElName == TEMPLATE_ELEMENT;
        element.attrs.forEach(function(attr) {
          var hasBinding = _this._parseAttr(isTemplateElement, attr, matchableAttrs, elementOrDirectiveProps, events, elementOrDirectiveRefs, elementVars);
          var templateBindingsSource;
          var prefixToken;
          var normalizedName = _this._normalizeAttributeName(attr.name);
          if (normalizedName == TEMPLATE_ATTR) {
            templateBindingsSource = attr.value;
          } else if (normalizedName.startsWith(TEMPLATE_ATTR_PREFIX)) {
            templateBindingsSource = attr.value;
            prefixToken = normalizedName.substring(TEMPLATE_ATTR_PREFIX.length) + ':';
          }
          var hasTemplateBinding = isPresent(templateBindingsSource);
          if (hasTemplateBinding) {
            if (hasInlineTemplates) {
              _this._reportError("Can't have multiple template bindings on one element. Use only one attribute named 'template' or prefixed with *", attr.sourceSpan);
            }
            hasInlineTemplates = true;
            _this._bindingParser.parseInlineTemplateBinding(prefixToken, templateBindingsSource, attr.sourceSpan, templateMatchableAttrs, templateElementOrDirectiveProps, templateElementVars);
          }
          if (!hasBinding && !hasTemplateBinding) {
            attrs.push(_this.visitAttribute(attr, null));
            matchableAttrs.push([attr.name, attr.value]);
          }
        });
        var elementCssSelector = createElementCssSelector(nodeName, matchableAttrs);
        var _a = this._parseDirectives(this.selectorMatcher, elementCssSelector),
            directiveMetas = _a.directives,
            matchElement = _a.matchElement;
        var references = [];
        var directiveAsts = this._createDirectiveAsts(isTemplateElement, element.name, directiveMetas, elementOrDirectiveProps, elementOrDirectiveRefs, element.sourceSpan, references);
        var elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, directiveAsts);
        var isViewRoot = parent.isTemplateElement || hasInlineTemplates;
        var providerContext = new ProviderElementContext(this.providerViewContext, parent.providerContext, isViewRoot, directiveAsts, attrs, references, element.sourceSpan);
        var children = visitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children, ElementContext.create(isTemplateElement, directiveAsts, isTemplateElement ? parent.providerContext : providerContext));
        providerContext.afterElement();
        var projectionSelector = isPresent(preparsedElement.projectAs) ? CssSelector.parse(preparsedElement.projectAs)[0] : elementCssSelector;
        var ngContentIndex = parent.findNgContentIndex(projectionSelector);
        var parsedElement;
        if (preparsedElement.type === PreparsedElementType.NG_CONTENT) {
          if (element.children && !element.children.every(_isEmptyTextNode)) {
            this._reportError("<ng-content> element cannot have content.", element.sourceSpan);
          }
          parsedElement = new NgContentAst(this.ngContentCount++, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
        } else if (isTemplateElement) {
          this._assertAllEventsPublishedByDirectives(directiveAsts, events);
          this._assertNoComponentsNorElementBindingsOnTemplate(directiveAsts, elementProps, element.sourceSpan);
          parsedElement = new EmbeddedTemplateAst(attrs, events, references, elementVars, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
        } else {
          this._assertElementExists(matchElement, element);
          this._assertOnlyOneComponent(directiveAsts, element.sourceSpan);
          var ngContentIndex_1 = hasInlineTemplates ? null : parent.findNgContentIndex(projectionSelector);
          parsedElement = new ElementAst(nodeName, attrs, elementProps, events, references, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex_1, element.sourceSpan, element.endSourceSpan);
          this._findComponentDirectives(directiveAsts).forEach(function(componentDirectiveAst) {
            return _this._validateElementAnimationInputOutputs(componentDirectiveAst.hostProperties, componentDirectiveAst.hostEvents, componentDirectiveAst.directive.template);
          });
          var componentTemplate = providerContext.viewContext.component.template;
          this._validateElementAnimationInputOutputs(elementProps, events, componentTemplate.toSummary());
        }
        if (hasInlineTemplates) {
          var templateCssSelector = createElementCssSelector(TEMPLATE_ELEMENT, templateMatchableAttrs);
          var templateDirectiveMetas = this._parseDirectives(this.selectorMatcher, templateCssSelector).directives;
          var templateDirectiveAsts = this._createDirectiveAsts(true, element.name, templateDirectiveMetas, templateElementOrDirectiveProps, [], element.sourceSpan, []);
          var templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateDirectiveAsts);
          this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectiveAsts, templateElementProps, element.sourceSpan);
          var templateProviderContext = new ProviderElementContext(this.providerViewContext, parent.providerContext, parent.isTemplateElement, templateDirectiveAsts, [], [], element.sourceSpan);
          templateProviderContext.afterElement();
          parsedElement = new EmbeddedTemplateAst([], [], [], templateElementVars, templateProviderContext.transformedDirectiveAsts, templateProviderContext.transformProviders, templateProviderContext.transformedHasViewContainer, [parsedElement], ngContentIndex, element.sourceSpan);
        }
        return parsedElement;
      };
      TemplateParseVisitor.prototype._validateElementAnimationInputOutputs = function(inputs, outputs, template) {
        var _this = this;
        var triggerLookup = new Set();
        template.animations.forEach(function(entry) {
          triggerLookup.add(entry);
        });
        var animationInputs = inputs.filter(function(input) {
          return input.isAnimation;
        });
        animationInputs.forEach(function(input) {
          var name = input.name;
          if (!triggerLookup.has(name)) {
            _this._reportError("Couldn't find an animation entry for \"" + name + "\"", input.sourceSpan);
          }
        });
        outputs.forEach(function(output) {
          if (output.isAnimation) {
            var found = animationInputs.find(function(input) {
              return input.name == output.name;
            });
            if (!found) {
              _this._reportError("Unable to listen on (@" + output.name + "." + output.phase + ") because the animation trigger [@" + output.name + "] isn't being used on the same element", output.sourceSpan);
            }
          }
        });
      };
      TemplateParseVisitor.prototype._parseAttr = function(isTemplateElement, attr, targetMatchableAttrs, targetProps, targetEvents, targetRefs, targetVars) {
        var name = this._normalizeAttributeName(attr.name);
        var value = attr.value;
        var srcSpan = attr.sourceSpan;
        var bindParts = name.match(BIND_NAME_REGEXP);
        var hasBinding = false;
        if (bindParts !== null) {
          hasBinding = true;
          if (isPresent(bindParts[KW_BIND_IDX])) {
            this._bindingParser.parsePropertyBinding(bindParts[IDENT_KW_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
          } else if (bindParts[KW_LET_IDX]) {
            if (isTemplateElement) {
              var identifier = bindParts[IDENT_KW_IDX];
              this._parseVariable(identifier, value, srcSpan, targetVars);
            } else {
              this._reportError("\"let-\" is only supported on template elements.", srcSpan);
            }
          } else if (bindParts[KW_REF_IDX]) {
            var identifier = bindParts[IDENT_KW_IDX];
            this._parseReference(identifier, value, srcSpan, targetRefs);
          } else if (bindParts[KW_ON_IDX]) {
            this._bindingParser.parseEvent(bindParts[IDENT_KW_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
          } else if (bindParts[KW_BINDON_IDX]) {
            this._bindingParser.parsePropertyBinding(bindParts[IDENT_KW_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
            this._parseAssignmentEvent(bindParts[IDENT_KW_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
          } else if (bindParts[KW_AT_IDX]) {
            this._bindingParser.parseLiteralAttr(name, value, srcSpan, targetMatchableAttrs, targetProps);
          } else if (bindParts[IDENT_BANANA_BOX_IDX]) {
            this._bindingParser.parsePropertyBinding(bindParts[IDENT_BANANA_BOX_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
            this._parseAssignmentEvent(bindParts[IDENT_BANANA_BOX_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
          } else if (bindParts[IDENT_PROPERTY_IDX]) {
            this._bindingParser.parsePropertyBinding(bindParts[IDENT_PROPERTY_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
          } else if (bindParts[IDENT_EVENT_IDX]) {
            this._bindingParser.parseEvent(bindParts[IDENT_EVENT_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
          }
        } else {
          hasBinding = this._bindingParser.parsePropertyInterpolation(name, value, srcSpan, targetMatchableAttrs, targetProps);
        }
        if (!hasBinding) {
          this._bindingParser.parseLiteralAttr(name, value, srcSpan, targetMatchableAttrs, targetProps);
        }
        return hasBinding;
      };
      TemplateParseVisitor.prototype._normalizeAttributeName = function(attrName) {
        return /^data-/i.test(attrName) ? attrName.substring(5) : attrName;
      };
      TemplateParseVisitor.prototype._parseVariable = function(identifier, value, sourceSpan, targetVars) {
        if (identifier.indexOf('-') > -1) {
          this._reportError("\"-\" is not allowed in variable names", sourceSpan);
        }
        targetVars.push(new VariableAst(identifier, value, sourceSpan));
      };
      TemplateParseVisitor.prototype._parseReference = function(identifier, value, sourceSpan, targetRefs) {
        if (identifier.indexOf('-') > -1) {
          this._reportError("\"-\" is not allowed in reference names", sourceSpan);
        }
        targetRefs.push(new ElementOrDirectiveRef(identifier, value, sourceSpan));
      };
      TemplateParseVisitor.prototype._parseAssignmentEvent = function(name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
        this._bindingParser.parseEvent(name + "Change", expression + "=$event", sourceSpan, targetMatchableAttrs, targetEvents);
      };
      TemplateParseVisitor.prototype._parseDirectives = function(selectorMatcher, elementCssSelector) {
        var _this = this;
        var directives = new Array(this.directivesIndex.size);
        var matchElement = false;
        selectorMatcher.match(elementCssSelector, function(selector, directive) {
          directives[_this.directivesIndex.get(directive)] = directive;
          matchElement = matchElement || selector.hasElementSelector();
        });
        return {
          directives: directives.filter(function(dir) {
            return !!dir;
          }),
          matchElement: matchElement
        };
      };
      TemplateParseVisitor.prototype._createDirectiveAsts = function(isTemplateElement, elementName, directives, props, elementOrDirectiveRefs, elementSourceSpan, targetReferences) {
        var _this = this;
        var matchedReferences = new Set();
        var component = null;
        var directiveAsts = directives.map(function(directive) {
          var sourceSpan = new ParseSourceSpan(elementSourceSpan.start, elementSourceSpan.end, "Directive " + identifierName(directive.type));
          if (directive.isComponent) {
            component = directive;
          }
          var directiveProperties = [];
          var hostProperties = _this._bindingParser.createDirectiveHostPropertyAsts(directive, sourceSpan);
          _this._checkPropertiesInSchema(elementName, hostProperties);
          var hostEvents = _this._bindingParser.createDirectiveHostEventAsts(directive, sourceSpan);
          _this._createDirectivePropertyAsts(directive.inputs, props, directiveProperties);
          elementOrDirectiveRefs.forEach(function(elOrDirRef) {
            if ((elOrDirRef.value.length === 0 && directive.isComponent) || (directive.exportAs == elOrDirRef.value)) {
              targetReferences.push(new ReferenceAst(elOrDirRef.name, identifierToken(directive.type), elOrDirRef.sourceSpan));
              matchedReferences.add(elOrDirRef.name);
            }
          });
          return new DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, sourceSpan);
        });
        elementOrDirectiveRefs.forEach(function(elOrDirRef) {
          if (elOrDirRef.value.length > 0) {
            if (!matchedReferences.has(elOrDirRef.name)) {
              _this._reportError("There is no directive with \"exportAs\" set to \"" + elOrDirRef.value + "\"", elOrDirRef.sourceSpan);
            }
          } else if (!component) {
            var refToken = null;
            if (isTemplateElement) {
              refToken = createIdentifierToken(Identifiers.TemplateRef);
            }
            targetReferences.push(new ReferenceAst(elOrDirRef.name, refToken, elOrDirRef.sourceSpan));
          }
        });
        return directiveAsts;
      };
      TemplateParseVisitor.prototype._createDirectivePropertyAsts = function(directiveProperties, boundProps, targetBoundDirectiveProps) {
        if (directiveProperties) {
          var boundPropsByName_1 = new Map();
          boundProps.forEach(function(boundProp) {
            var prevValue = boundPropsByName_1.get(boundProp.name);
            if (!prevValue || prevValue.isLiteral) {
              boundPropsByName_1.set(boundProp.name, boundProp);
            }
          });
          Object.keys(directiveProperties).forEach(function(dirProp) {
            var elProp = directiveProperties[dirProp];
            var boundProp = boundPropsByName_1.get(elProp);
            if (boundProp) {
              targetBoundDirectiveProps.push(new BoundDirectivePropertyAst(dirProp, boundProp.name, boundProp.expression, boundProp.sourceSpan));
            }
          });
        }
      };
      TemplateParseVisitor.prototype._createElementPropertyAsts = function(elementName, props, directives) {
        var _this = this;
        var boundElementProps = [];
        var boundDirectivePropsIndex = new Map();
        directives.forEach(function(directive) {
          directive.inputs.forEach(function(prop) {
            boundDirectivePropsIndex.set(prop.templateName, prop);
          });
        });
        props.forEach(function(prop) {
          if (!prop.isLiteral && !boundDirectivePropsIndex.get(prop.name)) {
            boundElementProps.push(_this._bindingParser.createElementPropertyAst(elementName, prop));
          }
        });
        this._checkPropertiesInSchema(elementName, boundElementProps);
        return boundElementProps;
      };
      TemplateParseVisitor.prototype._findComponentDirectives = function(directives) {
        return directives.filter(function(directive) {
          return directive.directive.isComponent;
        });
      };
      TemplateParseVisitor.prototype._findComponentDirectiveNames = function(directives) {
        return this._findComponentDirectives(directives).map(function(directive) {
          return identifierName(directive.directive.type);
        });
      };
      TemplateParseVisitor.prototype._assertOnlyOneComponent = function(directives, sourceSpan) {
        var componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 1) {
          this._reportError("More than one component matched on this element.\n" + "Make sure that only one component's selector can match a given element.\n" + ("Conflicting components: " + componentTypeNames.join(',')), sourceSpan);
        }
      };
      TemplateParseVisitor.prototype._assertElementExists = function(matchElement, element) {
        var elName = element.name.replace(/^:xhtml:/, '');
        if (!matchElement && !this._schemaRegistry.hasElement(elName, this._schemas)) {
          var errorMsg = ("'" + elName + "' is not a known element:\n") + ("1. If '" + elName + "' is an Angular component, then verify that it is part of this module.\n") + ("2. If '" + elName + "' is a Web Component then add \"CUSTOM_ELEMENTS_SCHEMA\" to the '@NgModule.schemas' of this component to suppress this message.");
          this._reportError(errorMsg, element.sourceSpan);
        }
      };
      TemplateParseVisitor.prototype._assertNoComponentsNorElementBindingsOnTemplate = function(directives, elementProps, sourceSpan) {
        var _this = this;
        var componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 0) {
          this._reportError("Components on an embedded template: " + componentTypeNames.join(','), sourceSpan);
        }
        elementProps.forEach(function(prop) {
          _this._reportError("Property binding " + prop.name + " not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the \"@NgModule.declarations\".", sourceSpan);
        });
      };
      TemplateParseVisitor.prototype._assertAllEventsPublishedByDirectives = function(directives, events) {
        var _this = this;
        var allDirectiveEvents = new Set();
        directives.forEach(function(directive) {
          Object.keys(directive.directive.outputs).forEach(function(k) {
            var eventName = directive.directive.outputs[k];
            allDirectiveEvents.add(eventName);
          });
        });
        events.forEach(function(event) {
          if (isPresent(event.target) || !allDirectiveEvents.has(event.name)) {
            _this._reportError("Event binding " + event.fullName + " not emitted by any directive on an embedded template. Make sure that the event name is spelled correctly and all directives are listed in the \"@NgModule.declarations\".", event.sourceSpan);
          }
        });
      };
      TemplateParseVisitor.prototype._checkPropertiesInSchema = function(elementName, boundProps) {
        var _this = this;
        boundProps.forEach(function(boundProp) {
          if (boundProp.type === PropertyBindingType.Property && !_this._schemaRegistry.hasProperty(elementName, boundProp.name, _this._schemas)) {
            var errorMsg = "Can't bind to '" + boundProp.name + "' since it isn't a known property of '" + elementName + "'.";
            if (elementName.indexOf('-') > -1) {
              errorMsg += ("\n1. If '" + elementName + "' is an Angular component and it has '" + boundProp.name + "' input, then verify that it is part of this module.") + ("\n2. If '" + elementName + "' is a Web Component then add \"CUSTOM_ELEMENTS_SCHEMA\" to the '@NgModule.schemas' of this component to suppress this message.\n");
            }
            _this._reportError(errorMsg, boundProp.sourceSpan);
          }
        });
      };
      TemplateParseVisitor.prototype._reportError = function(message, sourceSpan, level) {
        if (level === void 0) {
          level = ParseErrorLevel.FATAL;
        }
        this._targetErrors.push(new ParseError(sourceSpan, message, level));
      };
      return TemplateParseVisitor;
    }());
    var NonBindableVisitor = (function() {
      function NonBindableVisitor() {}
      NonBindableVisitor.prototype.visitElement = function(ast, parent) {
        var preparsedElement = preparseElement(ast);
        if (preparsedElement.type === PreparsedElementType.SCRIPT || preparsedElement.type === PreparsedElementType.STYLE || preparsedElement.type === PreparsedElementType.STYLESHEET) {
          return null;
        }
        var attrNameAndValues = ast.attrs.map(function(attr) {
          return [attr.name, attr.value];
        });
        var selector = createElementCssSelector(ast.name, attrNameAndValues);
        var ngContentIndex = parent.findNgContentIndex(selector);
        var children = visitAll(this, ast.children, EMPTY_ELEMENT_CONTEXT);
        return new ElementAst(ast.name, visitAll(this, ast.attrs), [], [], [], [], [], false, children, ngContentIndex, ast.sourceSpan, ast.endSourceSpan);
      };
      NonBindableVisitor.prototype.visitComment = function(comment, context) {
        return null;
      };
      NonBindableVisitor.prototype.visitAttribute = function(attribute, context) {
        return new AttrAst(attribute.name, attribute.value, attribute.sourceSpan);
      };
      NonBindableVisitor.prototype.visitText = function(text, parent) {
        var ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
        return new TextAst(text.value, ngContentIndex, text.sourceSpan);
      };
      NonBindableVisitor.prototype.visitExpansion = function(expansion, context) {
        return expansion;
      };
      NonBindableVisitor.prototype.visitExpansionCase = function(expansionCase, context) {
        return expansionCase;
      };
      return NonBindableVisitor;
    }());
    var ElementOrDirectiveRef = (function() {
      function ElementOrDirectiveRef(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
      }
      return ElementOrDirectiveRef;
    }());
    function splitClasses(classAttrValue) {
      return classAttrValue.trim().split(/\s+/g);
    }
    var ElementContext = (function() {
      function ElementContext(isTemplateElement, _ngContentIndexMatcher, _wildcardNgContentIndex, providerContext) {
        this.isTemplateElement = isTemplateElement;
        this._ngContentIndexMatcher = _ngContentIndexMatcher;
        this._wildcardNgContentIndex = _wildcardNgContentIndex;
        this.providerContext = providerContext;
      }
      ElementContext.create = function(isTemplateElement, directives, providerContext) {
        var matcher = new SelectorMatcher();
        var wildcardNgContentIndex = null;
        var component = directives.find(function(directive) {
          return directive.directive.isComponent;
        });
        if (component) {
          var ngContentSelectors = component.directive.template.ngContentSelectors;
          for (var i = 0; i < ngContentSelectors.length; i++) {
            var selector = ngContentSelectors[i];
            if (selector === '*') {
              wildcardNgContentIndex = i;
            } else {
              matcher.addSelectables(CssSelector.parse(ngContentSelectors[i]), i);
            }
          }
        }
        return new ElementContext(isTemplateElement, matcher, wildcardNgContentIndex, providerContext);
      };
      ElementContext.prototype.findNgContentIndex = function(selector) {
        var ngContentIndices = [];
        this._ngContentIndexMatcher.match(selector, function(selector, ngContentIndex) {
          ngContentIndices.push(ngContentIndex);
        });
        ngContentIndices.sort();
        if (isPresent(this._wildcardNgContentIndex)) {
          ngContentIndices.push(this._wildcardNgContentIndex);
        }
        return ngContentIndices.length > 0 ? ngContentIndices[0] : null;
      };
      return ElementContext;
    }());
    function createElementCssSelector(elementName, attributes) {
      var cssSelector = new CssSelector();
      var elNameNoNs = splitNsName(elementName)[1];
      cssSelector.setElement(elNameNoNs);
      for (var i = 0; i < attributes.length; i++) {
        var attrName = attributes[i][0];
        var attrNameNoNs = splitNsName(attrName)[1];
        var attrValue = attributes[i][1];
        cssSelector.addAttribute(attrNameNoNs, attrValue);
        if (attrName.toLowerCase() == CLASS_ATTR) {
          var classes = splitClasses(attrValue);
          classes.forEach(function(className) {
            return cssSelector.addClassName(className);
          });
        }
      }
      return cssSelector;
    }
    var EMPTY_ELEMENT_CONTEXT = new ElementContext(true, new SelectorMatcher(), null, null);
    var NON_BINDABLE_VISITOR = new NonBindableVisitor();
    function _isEmptyTextNode(node) {
      return node instanceof Text && node.value.trim().length == 0;
    }
    function removeSummaryDuplicates(items) {
      var map = new Map();
      items.forEach(function(item) {
        if (!map.get(item.type.reference)) {
          map.set(item.type.reference, item);
        }
      });
      return Array.from(map.values());
    }
    var CompilerConfig = (function() {
      function CompilerConfig(_a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.renderTypes,
            renderTypes = _c === void 0 ? new DefaultRenderTypes() : _c,
            _d = _b.defaultEncapsulation,
            defaultEncapsulation = _d === void 0 ? _angular_core.ViewEncapsulation.Emulated : _d,
            genDebugInfo = _b.genDebugInfo,
            logBindingUpdate = _b.logBindingUpdate,
            _e = _b.useJit,
            useJit = _e === void 0 ? true : _e;
        this.renderTypes = renderTypes;
        this.defaultEncapsulation = defaultEncapsulation;
        this._genDebugInfo = genDebugInfo;
        this._logBindingUpdate = logBindingUpdate;
        this.useJit = useJit;
      }
      Object.defineProperty(CompilerConfig.prototype, "genDebugInfo", {
        get: function() {
          return this._genDebugInfo === void 0 ? _angular_core.isDevMode() : this._genDebugInfo;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(CompilerConfig.prototype, "logBindingUpdate", {
        get: function() {
          return this._logBindingUpdate === void 0 ? _angular_core.isDevMode() : this._logBindingUpdate;
        },
        enumerable: true,
        configurable: true
      });
      return CompilerConfig;
    }());
    var RenderTypes = (function() {
      function RenderTypes() {}
      RenderTypes.prototype.renderer = function() {};
      RenderTypes.prototype.renderText = function() {};
      RenderTypes.prototype.renderElement = function() {};
      RenderTypes.prototype.renderComment = function() {};
      RenderTypes.prototype.renderNode = function() {};
      RenderTypes.prototype.renderEvent = function() {};
      return RenderTypes;
    }());
    var DefaultRenderTypes = (function() {
      function DefaultRenderTypes() {
        this.renderText = null;
        this.renderElement = null;
        this.renderComment = null;
        this.renderNode = null;
        this.renderEvent = null;
      }
      Object.defineProperty(DefaultRenderTypes.prototype, "renderer", {
        get: function() {
          return createIdentifier(Identifiers.Renderer);
        },
        enumerable: true,
        configurable: true
      });
      ;
      return DefaultRenderTypes;
    }());
    var __extends$19 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AnimationAst = (function() {
      function AnimationAst() {
        this.startTime = 0;
        this.playTime = 0;
      }
      AnimationAst.prototype.visit = function(visitor, context) {};
      return AnimationAst;
    }());
    var AnimationStateAst = (function(_super) {
      __extends$19(AnimationStateAst, _super);
      function AnimationStateAst() {
        _super.apply(this, arguments);
      }
      AnimationStateAst.prototype.visit = function(visitor, context) {};
      return AnimationStateAst;
    }(AnimationAst));
    var AnimationEntryAst = (function(_super) {
      __extends$19(AnimationEntryAst, _super);
      function AnimationEntryAst(name, stateDeclarations, stateTransitions) {
        _super.call(this);
        this.name = name;
        this.stateDeclarations = stateDeclarations;
        this.stateTransitions = stateTransitions;
      }
      AnimationEntryAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationEntry(this, context);
      };
      return AnimationEntryAst;
    }(AnimationAst));
    var AnimationStateDeclarationAst = (function(_super) {
      __extends$19(AnimationStateDeclarationAst, _super);
      function AnimationStateDeclarationAst(stateName, styles) {
        _super.call(this);
        this.stateName = stateName;
        this.styles = styles;
      }
      AnimationStateDeclarationAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationStateDeclaration(this, context);
      };
      return AnimationStateDeclarationAst;
    }(AnimationStateAst));
    var AnimationStateTransitionExpression = (function() {
      function AnimationStateTransitionExpression(fromState, toState) {
        this.fromState = fromState;
        this.toState = toState;
      }
      return AnimationStateTransitionExpression;
    }());
    var AnimationStateTransitionAst = (function(_super) {
      __extends$19(AnimationStateTransitionAst, _super);
      function AnimationStateTransitionAst(stateChanges, animation) {
        _super.call(this);
        this.stateChanges = stateChanges;
        this.animation = animation;
      }
      AnimationStateTransitionAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationStateTransition(this, context);
      };
      return AnimationStateTransitionAst;
    }(AnimationStateAst));
    var AnimationStepAst = (function(_super) {
      __extends$19(AnimationStepAst, _super);
      function AnimationStepAst(startingStyles, keyframes, duration, delay, easing) {
        _super.call(this);
        this.startingStyles = startingStyles;
        this.keyframes = keyframes;
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
      }
      AnimationStepAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationStep(this, context);
      };
      return AnimationStepAst;
    }(AnimationAst));
    var AnimationStylesAst = (function(_super) {
      __extends$19(AnimationStylesAst, _super);
      function AnimationStylesAst(styles) {
        _super.call(this);
        this.styles = styles;
      }
      AnimationStylesAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationStyles(this, context);
      };
      return AnimationStylesAst;
    }(AnimationAst));
    var AnimationKeyframeAst = (function(_super) {
      __extends$19(AnimationKeyframeAst, _super);
      function AnimationKeyframeAst(offset, styles) {
        _super.call(this);
        this.offset = offset;
        this.styles = styles;
      }
      AnimationKeyframeAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationKeyframe(this, context);
      };
      return AnimationKeyframeAst;
    }(AnimationAst));
    var AnimationWithStepsAst = (function(_super) {
      __extends$19(AnimationWithStepsAst, _super);
      function AnimationWithStepsAst(steps) {
        _super.call(this);
        this.steps = steps;
      }
      return AnimationWithStepsAst;
    }(AnimationAst));
    var AnimationGroupAst = (function(_super) {
      __extends$19(AnimationGroupAst, _super);
      function AnimationGroupAst(steps) {
        _super.call(this, steps);
      }
      AnimationGroupAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationGroup(this, context);
      };
      return AnimationGroupAst;
    }(AnimationWithStepsAst));
    var AnimationSequenceAst = (function(_super) {
      __extends$19(AnimationSequenceAst, _super);
      function AnimationSequenceAst(steps) {
        _super.call(this, steps);
      }
      AnimationSequenceAst.prototype.visit = function(visitor, context) {
        return visitor.visitAnimationSequence(this, context);
      };
      return AnimationSequenceAst;
    }(AnimationWithStepsAst));
    var StylesCollectionEntry = (function() {
      function StylesCollectionEntry(time, value) {
        this.time = time;
        this.value = value;
      }
      StylesCollectionEntry.prototype.matches = function(time, value) {
        return time == this.time && value == this.value;
      };
      return StylesCollectionEntry;
    }());
    var StylesCollection = (function() {
      function StylesCollection() {
        this.styles = {};
      }
      StylesCollection.prototype.insertAtTime = function(property, time, value) {
        var tuple = new StylesCollectionEntry(time, value);
        var entries = this.styles[property];
        if (!isPresent(entries)) {
          entries = this.styles[property] = [];
        }
        var insertionIndex = 0;
        for (var i = entries.length - 1; i >= 0; i--) {
          if (entries[i].time <= time) {
            insertionIndex = i + 1;
            break;
          }
        }
        entries.splice(insertionIndex, 0, tuple);
      };
      StylesCollection.prototype.getByIndex = function(property, index) {
        var items = this.styles[property];
        if (isPresent(items)) {
          return index >= items.length ? null : items[index];
        }
        return null;
      };
      StylesCollection.prototype.indexOfAtOrBeforeTime = function(property, time) {
        var entries = this.styles[property];
        if (isPresent(entries)) {
          for (var i = entries.length - 1; i >= 0; i--) {
            if (entries[i].time <= time)
              return i;
          }
        }
        return null;
      };
      return StylesCollection;
    }());
    var __extends$18 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate$4 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var _INITIAL_KEYFRAME = 0;
    var _TERMINAL_KEYFRAME = 1;
    var _ONE_SECOND = 1000;
    var AnimationParseError = (function(_super) {
      __extends$18(AnimationParseError, _super);
      function AnimationParseError(message) {
        _super.call(this, null, message);
      }
      AnimationParseError.prototype.toString = function() {
        return "" + this.msg;
      };
      return AnimationParseError;
    }(ParseError));
    var AnimationEntryParseResult = (function() {
      function AnimationEntryParseResult(ast, errors) {
        this.ast = ast;
        this.errors = errors;
      }
      return AnimationEntryParseResult;
    }());
    var AnimationParser = (function() {
      function AnimationParser(_schema) {
        this._schema = _schema;
      }
      AnimationParser.prototype.parseComponent = function(component) {
        var _this = this;
        var errors = [];
        var componentName = identifierName(component.type);
        var animationTriggerNames = new Set();
        var asts = component.template.animations.map(function(entry) {
          var result = _this.parseEntry(entry);
          var ast = result.ast;
          var triggerName = ast.name;
          if (animationTriggerNames.has(triggerName)) {
            result.errors.push(new AnimationParseError("The animation trigger \"" + triggerName + "\" has already been registered for the " + componentName + " component"));
          } else {
            animationTriggerNames.add(triggerName);
          }
          if (result.errors.length > 0) {
            var errorMessage_1 = "- Unable to parse the animation sequence for \"" + triggerName + "\" on the " + componentName + " component due to the following errors:";
            result.errors.forEach(function(error) {
              errorMessage_1 += '\n-- ' + error.msg;
            });
            errors.push(errorMessage_1);
          }
          return ast;
        });
        if (errors.length > 0) {
          var errorString = errors.join('\n');
          throw new Error("Animation parse errors:\n" + errorString);
        }
        return asts;
      };
      AnimationParser.prototype.parseEntry = function(entry) {
        var _this = this;
        var errors = [];
        var stateStyles = {};
        var transitions = [];
        var stateDeclarationAsts = [];
        entry.definitions.forEach(function(def) {
          if (def instanceof CompileAnimationStateDeclarationMetadata) {
            _parseAnimationDeclarationStates(def, _this._schema, errors).forEach(function(ast) {
              stateDeclarationAsts.push(ast);
              stateStyles[ast.stateName] = ast.styles;
            });
          } else {
            transitions.push((def));
          }
        });
        var stateTransitionAsts = transitions.map(function(transDef) {
          return _parseAnimationStateTransition(transDef, stateStyles, _this._schema, errors);
        });
        var ast = new AnimationEntryAst(entry.name, stateDeclarationAsts, stateTransitionAsts);
        return new AnimationEntryParseResult(ast, errors);
      };
      AnimationParser = __decorate$4([CompilerInjectable(), __metadata$4('design:paramtypes', [ElementSchemaRegistry])], AnimationParser);
      return AnimationParser;
    }());
    function _parseAnimationDeclarationStates(stateMetadata, schema, errors) {
      var normalizedStyles = _normalizeStyleMetadata(stateMetadata.styles, {}, schema, errors, false);
      var defStyles = new AnimationStylesAst(normalizedStyles);
      var states = stateMetadata.stateNameExpr.split(/\s*,\s*/);
      return states.map(function(state) {
        return new AnimationStateDeclarationAst(state, defStyles);
      });
    }
    function _parseAnimationStateTransition(transitionStateMetadata, stateStyles, schema, errors) {
      var styles = new StylesCollection();
      var transitionExprs = [];
      var transitionStates = transitionStateMetadata.stateChangeExpr.split(/\s*,\s*/);
      transitionStates.forEach(function(expr) {
        transitionExprs.push.apply(transitionExprs, _parseAnimationTransitionExpr(expr, errors));
      });
      var entry = _normalizeAnimationEntry(transitionStateMetadata.steps);
      var animation = _normalizeStyleSteps(entry, stateStyles, schema, errors);
      var animationAst = _parseTransitionAnimation(animation, 0, styles, stateStyles, errors);
      if (errors.length == 0) {
        _fillAnimationAstStartingKeyframes(animationAst, styles, errors);
      }
      var stepsAst = (animationAst instanceof AnimationWithStepsAst) ? animationAst : new AnimationSequenceAst([animationAst]);
      return new AnimationStateTransitionAst(transitionExprs, stepsAst);
    }
    function _parseAnimationAlias(alias, errors) {
      switch (alias) {
        case ':enter':
          return 'void => *';
        case ':leave':
          return '* => void';
        default:
          errors.push(new AnimationParseError("the transition alias value \"" + alias + "\" is not supported"));
          return '* => *';
      }
    }
    function _parseAnimationTransitionExpr(eventStr, errors) {
      var expressions = [];
      if (eventStr[0] == ':') {
        eventStr = _parseAnimationAlias(eventStr, errors);
      }
      var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
      if (!isPresent(match) || match.length < 4) {
        errors.push(new AnimationParseError("the provided " + eventStr + " is not of a supported format"));
        return expressions;
      }
      var fromState = match[1];
      var separator = match[2];
      var toState = match[3];
      expressions.push(new AnimationStateTransitionExpression(fromState, toState));
      var isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
      if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(new AnimationStateTransitionExpression(toState, fromState));
      }
      return expressions;
    }
    function _normalizeAnimationEntry(entry) {
      return Array.isArray(entry) ? new CompileAnimationSequenceMetadata(entry) : entry;
    }
    function _normalizeStyleMetadata(entry, stateStyles, schema, errors, permitStateReferences) {
      var offset = entry.offset;
      if (offset > 1 || offset < 0) {
        errors.push(new AnimationParseError("Offset values for animations must be between 0 and 1"));
      }
      var normalizedStyles = [];
      entry.styles.forEach(function(styleEntry) {
        if (typeof styleEntry === 'string') {
          if (permitStateReferences) {
            normalizedStyles.push.apply(normalizedStyles, _resolveStylesFromState((styleEntry), stateStyles, errors));
          } else {
            errors.push(new AnimationParseError("State based animations cannot contain references to other states"));
          }
        } else {
          var stylesObj_1 = (styleEntry);
          var normalizedStylesObj_1 = {};
          Object.keys(stylesObj_1).forEach(function(propName) {
            var normalizedProp = schema.normalizeAnimationStyleProperty(propName);
            var normalizedOutput = schema.normalizeAnimationStyleValue(normalizedProp, propName, stylesObj_1[propName]);
            var normalizationError = normalizedOutput['error'];
            if (normalizationError) {
              errors.push(new AnimationParseError(normalizationError));
            }
            normalizedStylesObj_1[normalizedProp] = normalizedOutput['value'];
          });
          normalizedStyles.push(normalizedStylesObj_1);
        }
      });
      return normalizedStyles;
    }
    function _normalizeStyleSteps(entry, stateStyles, schema, errors) {
      var steps = _normalizeStyleStepEntry(entry, stateStyles, schema, errors);
      return (entry instanceof CompileAnimationGroupMetadata) ? new CompileAnimationGroupMetadata(steps) : new CompileAnimationSequenceMetadata(steps);
    }
    function _mergeAnimationStyles(stylesList, newItem) {
      if (typeof newItem === 'object' && newItem !== null && stylesList.length > 0) {
        var lastIndex = stylesList.length - 1;
        var lastItem = stylesList[lastIndex];
        if (typeof lastItem === 'object' && lastItem !== null) {
          stylesList[lastIndex] = StringMapWrapper.merge((lastItem), (newItem));
          return;
        }
      }
      stylesList.push(newItem);
    }
    function _normalizeStyleStepEntry(entry, stateStyles, schema, errors) {
      var steps;
      if (entry instanceof CompileAnimationWithStepsMetadata) {
        steps = entry.steps;
      } else {
        return [entry];
      }
      var newSteps = [];
      var combinedStyles;
      steps.forEach(function(step) {
        if (step instanceof CompileAnimationStyleMetadata) {
          if (!isPresent(combinedStyles)) {
            combinedStyles = [];
          }
          _normalizeStyleMetadata((step), stateStyles, schema, errors, true).forEach(function(entry) {
            _mergeAnimationStyles(combinedStyles, entry);
          });
        } else {
          if (isPresent(combinedStyles)) {
            newSteps.push(new CompileAnimationStyleMetadata(0, combinedStyles));
            combinedStyles = null;
          }
          if (step instanceof CompileAnimationAnimateMetadata) {
            var animateStyleValue = ((step)).styles;
            if (animateStyleValue instanceof CompileAnimationStyleMetadata) {
              animateStyleValue.styles = _normalizeStyleMetadata(animateStyleValue, stateStyles, schema, errors, true);
            } else if (animateStyleValue instanceof CompileAnimationKeyframesSequenceMetadata) {
              animateStyleValue.steps.forEach(function(step) {
                step.styles = _normalizeStyleMetadata(step, stateStyles, schema, errors, true);
              });
            }
          } else if (step instanceof CompileAnimationWithStepsMetadata) {
            var innerSteps = _normalizeStyleStepEntry(step, stateStyles, schema, errors);
            step = step instanceof CompileAnimationGroupMetadata ? new CompileAnimationGroupMetadata(innerSteps) : new CompileAnimationSequenceMetadata(innerSteps);
          }
          newSteps.push(step);
        }
      });
      if (isPresent(combinedStyles)) {
        newSteps.push(new CompileAnimationStyleMetadata(0, combinedStyles));
      }
      return newSteps;
    }
    function _resolveStylesFromState(stateName, stateStyles, errors) {
      var styles = [];
      if (stateName[0] != ':') {
        errors.push(new AnimationParseError("Animation states via styles must be prefixed with a \":\""));
      } else {
        var normalizedStateName = stateName.substring(1);
        var value = stateStyles[normalizedStateName];
        if (!isPresent(value)) {
          errors.push(new AnimationParseError("Unable to apply styles due to missing a state: \"" + normalizedStateName + "\""));
        } else {
          value.styles.forEach(function(stylesEntry) {
            if (typeof stylesEntry === 'object' && stylesEntry !== null) {
              styles.push((stylesEntry));
            }
          });
        }
      }
      return styles;
    }
    var _AnimationTimings = (function() {
      function _AnimationTimings(duration, delay, easing) {
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
      }
      return _AnimationTimings;
    }());
    function _parseAnimationKeyframes(keyframeSequence, currentTime, collectedStyles, stateStyles, errors) {
      var totalEntries = keyframeSequence.steps.length;
      var totalOffsets = 0;
      keyframeSequence.steps.forEach(function(step) {
        return totalOffsets += (isPresent(step.offset) ? 1 : 0);
      });
      if (totalOffsets > 0 && totalOffsets < totalEntries) {
        errors.push(new AnimationParseError("Not all style() entries contain an offset for the provided keyframe()"));
        totalOffsets = totalEntries;
      }
      var limit = totalEntries - 1;
      var margin = totalOffsets == 0 ? (1 / limit) : 0;
      var rawKeyframes = [];
      var index = 0;
      var doSortKeyframes = false;
      var lastOffset = 0;
      keyframeSequence.steps.forEach(function(styleMetadata) {
        var offset = styleMetadata.offset;
        var keyframeStyles = {};
        styleMetadata.styles.forEach(function(entry) {
          Object.keys(entry).forEach(function(prop) {
            if (prop != 'offset') {
              keyframeStyles[prop] = ((entry))[prop];
            }
          });
        });
        if (isPresent(offset)) {
          doSortKeyframes = doSortKeyframes || (offset < lastOffset);
        } else {
          offset = index == limit ? _TERMINAL_KEYFRAME : (margin * index);
        }
        rawKeyframes.push([offset, keyframeStyles]);
        lastOffset = offset;
        index++;
      });
      if (doSortKeyframes) {
        rawKeyframes.sort(function(a, b) {
          return a[0] <= b[0] ? -1 : 1;
        });
      }
      var firstKeyframe = rawKeyframes[0];
      if (firstKeyframe[0] != _INITIAL_KEYFRAME) {
        rawKeyframes.splice(0, 0, firstKeyframe = [_INITIAL_KEYFRAME, {}]);
      }
      var firstKeyframeStyles = firstKeyframe[1];
      limit = rawKeyframes.length - 1;
      var lastKeyframe = rawKeyframes[limit];
      if (lastKeyframe[0] != _TERMINAL_KEYFRAME) {
        rawKeyframes.push(lastKeyframe = [_TERMINAL_KEYFRAME, {}]);
        limit++;
      }
      var lastKeyframeStyles = lastKeyframe[1];
      for (var i = 1; i <= limit; i++) {
        var entry = rawKeyframes[i];
        var styles = entry[1];
        Object.keys(styles).forEach(function(prop) {
          if (!isPresent(firstKeyframeStyles[prop])) {
            firstKeyframeStyles[prop] = FILL_STYLE_FLAG;
          }
        });
      }
      var _loop_1 = function(i) {
        var entry = rawKeyframes[i];
        var styles = entry[1];
        Object.keys(styles).forEach(function(prop) {
          if (!isPresent(lastKeyframeStyles[prop])) {
            lastKeyframeStyles[prop] = styles[prop];
          }
        });
      };
      for (var i = limit - 1; i >= 0; i--) {
        _loop_1(i);
      }
      return rawKeyframes.map(function(entry) {
        return new AnimationKeyframeAst(entry[0], new AnimationStylesAst([entry[1]]));
      });
    }
    function _parseTransitionAnimation(entry, currentTime, collectedStyles, stateStyles, errors) {
      var ast;
      var playTime = 0;
      var startingTime = currentTime;
      if (entry instanceof CompileAnimationWithStepsMetadata) {
        var maxDuration_1 = 0;
        var steps_1 = [];
        var isGroup_1 = entry instanceof CompileAnimationGroupMetadata;
        var previousStyles_1;
        entry.steps.forEach(function(entry) {
          var time = isGroup_1 ? startingTime : currentTime;
          if (entry instanceof CompileAnimationStyleMetadata) {
            entry.styles.forEach(function(stylesEntry) {
              var map = (stylesEntry);
              Object.keys(map).forEach(function(prop) {
                collectedStyles.insertAtTime(prop, time, map[prop]);
              });
            });
            previousStyles_1 = entry.styles;
            return;
          }
          var innerAst = _parseTransitionAnimation(entry, time, collectedStyles, stateStyles, errors);
          if (isPresent(previousStyles_1)) {
            if (entry instanceof CompileAnimationWithStepsMetadata) {
              var startingStyles = new AnimationStylesAst(previousStyles_1);
              steps_1.push(new AnimationStepAst(startingStyles, [], 0, 0, ''));
            } else {
              var innerStep = (innerAst);
              (_a = innerStep.startingStyles.styles).push.apply(_a, previousStyles_1);
            }
            previousStyles_1 = null;
          }
          var astDuration = innerAst.playTime;
          currentTime += astDuration;
          playTime += astDuration;
          maxDuration_1 = Math.max(astDuration, maxDuration_1);
          steps_1.push(innerAst);
          var _a;
        });
        if (isPresent(previousStyles_1)) {
          var startingStyles = new AnimationStylesAst(previousStyles_1);
          steps_1.push(new AnimationStepAst(startingStyles, [], 0, 0, ''));
        }
        if (isGroup_1) {
          ast = new AnimationGroupAst(steps_1);
          playTime = maxDuration_1;
          currentTime = startingTime + playTime;
        } else {
          ast = new AnimationSequenceAst(steps_1);
        }
      } else if (entry instanceof CompileAnimationAnimateMetadata) {
        var timings = _parseTimeExpression(entry.timings, errors);
        var styles = entry.styles;
        var keyframes = void 0;
        if (styles instanceof CompileAnimationKeyframesSequenceMetadata) {
          keyframes = _parseAnimationKeyframes(styles, currentTime, collectedStyles, stateStyles, errors);
        } else {
          var styleData = (styles);
          var offset = _TERMINAL_KEYFRAME;
          var styleAst = new AnimationStylesAst((styleData.styles));
          var keyframe = new AnimationKeyframeAst(offset, styleAst);
          keyframes = [keyframe];
        }
        ast = new AnimationStepAst(new AnimationStylesAst([]), keyframes, timings.duration, timings.delay, timings.easing);
        playTime = timings.duration + timings.delay;
        currentTime += playTime;
        keyframes.forEach(function(keyframe) {
          return keyframe.styles.styles.forEach(function(entry) {
            return Object.keys(entry).forEach(function(prop) {
              collectedStyles.insertAtTime(prop, currentTime, entry[prop]);
            });
          });
        });
      } else {
        ast = new AnimationStepAst(null, [], 0, 0, '');
      }
      ast.playTime = playTime;
      ast.startTime = startingTime;
      return ast;
    }
    function _fillAnimationAstStartingKeyframes(ast, collectedStyles, errors) {
      if ((ast instanceof AnimationStepAst) && ast.keyframes.length > 0) {
        var keyframes = ast.keyframes;
        if (keyframes.length == 1) {
          var endKeyframe = keyframes[0];
          var startKeyframe = _createStartKeyframeFromEndKeyframe(endKeyframe, ast.startTime, ast.playTime, collectedStyles, errors);
          ast.keyframes = [startKeyframe, endKeyframe];
        }
      } else if (ast instanceof AnimationWithStepsAst) {
        ast.steps.forEach(function(entry) {
          return _fillAnimationAstStartingKeyframes(entry, collectedStyles, errors);
        });
      }
    }
    function _parseTimeExpression(exp, errors) {
      var regex = /^([\.\d]+)(m?s)(?:\s+([\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?/i;
      var duration;
      var delay = 0;
      var easing = null;
      if (typeof exp === 'string') {
        var matches = exp.match(regex);
        if (matches === null) {
          errors.push(new AnimationParseError("The provided timing value \"" + exp + "\" is invalid."));
          return new _AnimationTimings(0, 0, null);
        }
        var durationMatch = parseFloat(matches[1]);
        var durationUnit = matches[2];
        if (durationUnit == 's') {
          durationMatch *= _ONE_SECOND;
        }
        duration = Math.floor(durationMatch);
        var delayMatch = matches[3];
        var delayUnit = matches[4];
        if (isPresent(delayMatch)) {
          var delayVal = parseFloat(delayMatch);
          if (isPresent(delayUnit) && delayUnit == 's') {
            delayVal *= _ONE_SECOND;
          }
          delay = Math.floor(delayVal);
        }
        var easingVal = matches[5];
        if (!isBlank(easingVal)) {
          easing = easingVal;
        }
      } else {
        duration = (exp);
      }
      return new _AnimationTimings(duration, delay, easing);
    }
    function _createStartKeyframeFromEndKeyframe(endKeyframe, startTime, duration, collectedStyles, errors) {
      var values = {};
      var endTime = startTime + duration;
      endKeyframe.styles.styles.forEach(function(styleData) {
        Object.keys(styleData).forEach(function(prop) {
          var val = styleData[prop];
          if (prop == 'offset')
            return;
          var resultIndex = collectedStyles.indexOfAtOrBeforeTime(prop, startTime);
          var resultEntry,
              nextEntry,
              value;
          if (isPresent(resultIndex)) {
            resultEntry = collectedStyles.getByIndex(prop, resultIndex);
            value = resultEntry.value;
            nextEntry = collectedStyles.getByIndex(prop, resultIndex + 1);
          } else {
            value = FILL_STYLE_FLAG;
          }
          if (isPresent(nextEntry) && !nextEntry.matches(endTime, val)) {
            errors.push(new AnimationParseError("The animated CSS property \"" + prop + "\" unexpectedly changes between steps \"" + resultEntry.time + "ms\" and \"" + endTime + "ms\" at \"" + nextEntry.time + "ms\""));
          }
          values[prop] = value;
        });
      });
      return new AnimationKeyframeAst(_INITIAL_KEYFRAME, new AnimationStylesAst([values]));
    }
    var ResourceLoader = (function() {
      function ResourceLoader() {}
      ResourceLoader.prototype.get = function(url) {
        return null;
      };
      return ResourceLoader;
    }());
    var __decorate$6 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$6 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    function createUrlResolverWithoutPackagePrefix() {
      return new UrlResolver();
    }
    function createOfflineCompileUrlResolver() {
      return new UrlResolver('.');
    }
    var DEFAULT_PACKAGE_URL_PROVIDER = {
      provide: _angular_core.PACKAGE_ROOT_URL,
      useValue: '/'
    };
    var UrlResolver = (function() {
      function UrlResolver(_packagePrefix) {
        if (_packagePrefix === void 0) {
          _packagePrefix = null;
        }
        this._packagePrefix = _packagePrefix;
      }
      UrlResolver.prototype.resolve = function(baseUrl, url) {
        var resolvedUrl = url;
        if (isPresent(baseUrl) && baseUrl.length > 0) {
          resolvedUrl = _resolveUrl(baseUrl, resolvedUrl);
        }
        var resolvedParts = _split(resolvedUrl);
        var prefix = this._packagePrefix;
        if (isPresent(prefix) && isPresent(resolvedParts) && resolvedParts[_ComponentIndex.Scheme] == 'package') {
          var path = resolvedParts[_ComponentIndex.Path];
          prefix = prefix.replace(/\/+$/, '');
          path = path.replace(/^\/+/, '');
          return prefix + "/" + path;
        }
        return resolvedUrl;
      };
      UrlResolver.ctorParameters = function() {
        return [{
          type: undefined,
          decorators: [{
            type: _angular_core.Inject,
            args: [_angular_core.PACKAGE_ROOT_URL]
          }]
        }];
      };
      UrlResolver = __decorate$6([CompilerInjectable(), __metadata$6('design:paramtypes', [String])], UrlResolver);
      return UrlResolver;
    }());
    function getUrlScheme(url) {
      var match = _split(url);
      return (match && match[_ComponentIndex.Scheme]) || '';
    }
    function _buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
      var out = [];
      if (isPresent(opt_scheme)) {
        out.push(opt_scheme + ':');
      }
      if (isPresent(opt_domain)) {
        out.push('//');
        if (isPresent(opt_userInfo)) {
          out.push(opt_userInfo + '@');
        }
        out.push(opt_domain);
        if (isPresent(opt_port)) {
          out.push(':' + opt_port);
        }
      }
      if (isPresent(opt_path)) {
        out.push(opt_path);
      }
      if (isPresent(opt_queryData)) {
        out.push('?' + opt_queryData);
      }
      if (isPresent(opt_fragment)) {
        out.push('#' + opt_fragment);
      }
      return out.join('');
    }
    var _splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
    var _ComponentIndex = {};
    _ComponentIndex.Scheme = 1;
    _ComponentIndex.UserInfo = 2;
    _ComponentIndex.Domain = 3;
    _ComponentIndex.Port = 4;
    _ComponentIndex.Path = 5;
    _ComponentIndex.QueryData = 6;
    _ComponentIndex.Fragment = 7;
    _ComponentIndex[_ComponentIndex.Scheme] = "Scheme";
    _ComponentIndex[_ComponentIndex.UserInfo] = "UserInfo";
    _ComponentIndex[_ComponentIndex.Domain] = "Domain";
    _ComponentIndex[_ComponentIndex.Port] = "Port";
    _ComponentIndex[_ComponentIndex.Path] = "Path";
    _ComponentIndex[_ComponentIndex.QueryData] = "QueryData";
    _ComponentIndex[_ComponentIndex.Fragment] = "Fragment";
    function _split(uri) {
      return uri.match(_splitRe);
    }
    function _removeDotSegments(path) {
      if (path == '/')
        return '/';
      var leadingSlash = path[0] == '/' ? '/' : '';
      var trailingSlash = path[path.length - 1] === '/' ? '/' : '';
      var segments = path.split('/');
      var out = [];
      var up = 0;
      for (var pos = 0; pos < segments.length; pos++) {
        var segment = segments[pos];
        switch (segment) {
          case '':
          case '.':
            break;
          case '..':
            if (out.length > 0) {
              out.pop();
            } else {
              up++;
            }
            break;
          default:
            out.push(segment);
        }
      }
      if (leadingSlash == '') {
        while (up-- > 0) {
          out.unshift('..');
        }
        if (out.length === 0)
          out.push('.');
      }
      return leadingSlash + out.join('/') + trailingSlash;
    }
    function _joinAndCanonicalizePath(parts) {
      var path = parts[_ComponentIndex.Path];
      path = isBlank(path) ? '' : _removeDotSegments(path);
      parts[_ComponentIndex.Path] = path;
      return _buildFromEncodedParts(parts[_ComponentIndex.Scheme], parts[_ComponentIndex.UserInfo], parts[_ComponentIndex.Domain], parts[_ComponentIndex.Port], path, parts[_ComponentIndex.QueryData], parts[_ComponentIndex.Fragment]);
    }
    function _resolveUrl(base, url) {
      var parts = _split(encodeURI(url));
      var baseParts = _split(base);
      if (isPresent(parts[_ComponentIndex.Scheme])) {
        return _joinAndCanonicalizePath(parts);
      } else {
        parts[_ComponentIndex.Scheme] = baseParts[_ComponentIndex.Scheme];
      }
      for (var i = _ComponentIndex.Scheme; i <= _ComponentIndex.Port; i++) {
        if (isBlank(parts[i])) {
          parts[i] = baseParts[i];
        }
      }
      if (parts[_ComponentIndex.Path][0] == '/') {
        return _joinAndCanonicalizePath(parts);
      }
      var path = baseParts[_ComponentIndex.Path];
      if (isBlank(path))
        path = '/';
      var index = path.lastIndexOf('/');
      path = path.substring(0, index + 1) + parts[_ComponentIndex.Path];
      parts[_ComponentIndex.Path] = path;
      return _joinAndCanonicalizePath(parts);
    }
    var __decorate$5 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$5 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var DirectiveNormalizer = (function() {
      function DirectiveNormalizer(_resourceLoader, _urlResolver, _htmlParser, _config) {
        this._resourceLoader = _resourceLoader;
        this._urlResolver = _urlResolver;
        this._htmlParser = _htmlParser;
        this._config = _config;
        this._resourceLoaderCache = new Map();
      }
      DirectiveNormalizer.prototype.clearCache = function() {
        this._resourceLoaderCache.clear();
      };
      DirectiveNormalizer.prototype.clearCacheFor = function(normalizedDirective) {
        var _this = this;
        if (!normalizedDirective.isComponent) {
          return;
        }
        this._resourceLoaderCache.delete(normalizedDirective.template.templateUrl);
        normalizedDirective.template.externalStylesheets.forEach(function(stylesheet) {
          _this._resourceLoaderCache.delete(stylesheet.moduleUrl);
        });
      };
      DirectiveNormalizer.prototype._fetch = function(url) {
        var result = this._resourceLoaderCache.get(url);
        if (!result) {
          result = this._resourceLoader.get(url);
          this._resourceLoaderCache.set(url, result);
        }
        return result;
      };
      DirectiveNormalizer.prototype.normalizeTemplate = function(prenormData) {
        var _this = this;
        var normalizedTemplateSync = null;
        var normalizedTemplateAsync;
        if (isPresent(prenormData.template)) {
          normalizedTemplateSync = this.normalizeTemplateSync(prenormData);
          normalizedTemplateAsync = Promise.resolve(normalizedTemplateSync);
        } else if (prenormData.templateUrl) {
          normalizedTemplateAsync = this.normalizeTemplateAsync(prenormData);
        } else {
          throw new SyntaxError("No template specified for component " + stringify(prenormData.componentType));
        }
        if (normalizedTemplateSync && normalizedTemplateSync.styleUrls.length === 0) {
          return new SyncAsyncResult(normalizedTemplateSync);
        } else {
          return new SyncAsyncResult(null, normalizedTemplateAsync.then(function(normalizedTemplate) {
            return _this.normalizeExternalStylesheets(normalizedTemplate);
          }));
        }
      };
      DirectiveNormalizer.prototype.normalizeTemplateSync = function(prenomData) {
        return this.normalizeLoadedTemplate(prenomData, prenomData.template, prenomData.moduleUrl);
      };
      DirectiveNormalizer.prototype.normalizeTemplateAsync = function(prenomData) {
        var _this = this;
        var templateUrl = this._urlResolver.resolve(prenomData.moduleUrl, prenomData.templateUrl);
        return this._fetch(templateUrl).then(function(value) {
          return _this.normalizeLoadedTemplate(prenomData, value, templateUrl);
        });
      };
      DirectiveNormalizer.prototype.normalizeLoadedTemplate = function(prenomData, template, templateAbsUrl) {
        var interpolationConfig = InterpolationConfig.fromArray(prenomData.interpolation);
        var rootNodesAndErrors = this._htmlParser.parse(template, stringify(prenomData.componentType), true, interpolationConfig);
        if (rootNodesAndErrors.errors.length > 0) {
          var errorString = rootNodesAndErrors.errors.join('\n');
          throw new SyntaxError("Template parse errors:\n" + errorString);
        }
        var templateMetadataStyles = this.normalizeStylesheet(new CompileStylesheetMetadata({
          styles: prenomData.styles,
          styleUrls: prenomData.styleUrls,
          moduleUrl: prenomData.moduleUrl
        }));
        var visitor = new TemplatePreparseVisitor();
        visitAll(visitor, rootNodesAndErrors.rootNodes);
        var templateStyles = this.normalizeStylesheet(new CompileStylesheetMetadata({
          styles: visitor.styles,
          styleUrls: visitor.styleUrls,
          moduleUrl: templateAbsUrl
        }));
        var encapsulation = prenomData.encapsulation;
        if (isBlank(encapsulation)) {
          encapsulation = this._config.defaultEncapsulation;
        }
        var styles = templateMetadataStyles.styles.concat(templateStyles.styles);
        var styleUrls = templateMetadataStyles.styleUrls.concat(templateStyles.styleUrls);
        if (encapsulation === _angular_core.ViewEncapsulation.Emulated && styles.length === 0 && styleUrls.length === 0) {
          encapsulation = _angular_core.ViewEncapsulation.None;
        }
        return new CompileTemplateMetadata({
          encapsulation: encapsulation,
          template: template,
          templateUrl: templateAbsUrl,
          styles: styles,
          styleUrls: styleUrls,
          ngContentSelectors: visitor.ngContentSelectors,
          animations: prenomData.animations,
          interpolation: prenomData.interpolation
        });
      };
      DirectiveNormalizer.prototype.normalizeExternalStylesheets = function(templateMeta) {
        return this._loadMissingExternalStylesheets(templateMeta.styleUrls).then(function(externalStylesheets) {
          return new CompileTemplateMetadata({
            encapsulation: templateMeta.encapsulation,
            template: templateMeta.template,
            templateUrl: templateMeta.templateUrl,
            styles: templateMeta.styles,
            styleUrls: templateMeta.styleUrls,
            externalStylesheets: externalStylesheets,
            ngContentSelectors: templateMeta.ngContentSelectors,
            animations: templateMeta.animations,
            interpolation: templateMeta.interpolation
          });
        });
      };
      DirectiveNormalizer.prototype._loadMissingExternalStylesheets = function(styleUrls, loadedStylesheets) {
        var _this = this;
        if (loadedStylesheets === void 0) {
          loadedStylesheets = new Map();
        }
        return Promise.all(styleUrls.filter(function(styleUrl) {
          return !loadedStylesheets.has(styleUrl);
        }).map(function(styleUrl) {
          return _this._fetch(styleUrl).then(function(loadedStyle) {
            var stylesheet = _this.normalizeStylesheet(new CompileStylesheetMetadata({
              styles: [loadedStyle],
              moduleUrl: styleUrl
            }));
            loadedStylesheets.set(styleUrl, stylesheet);
            return _this._loadMissingExternalStylesheets(stylesheet.styleUrls, loadedStylesheets);
          });
        })).then(function(_) {
          return Array.from(loadedStylesheets.values());
        });
      };
      DirectiveNormalizer.prototype.normalizeStylesheet = function(stylesheet) {
        var _this = this;
        var allStyleUrls = stylesheet.styleUrls.filter(isStyleUrlResolvable).map(function(url) {
          return _this._urlResolver.resolve(stylesheet.moduleUrl, url);
        });
        var allStyles = stylesheet.styles.map(function(style) {
          var styleWithImports = extractStyleUrls(_this._urlResolver, stylesheet.moduleUrl, style);
          allStyleUrls.push.apply(allStyleUrls, styleWithImports.styleUrls);
          return styleWithImports.style;
        });
        return new CompileStylesheetMetadata({
          styles: allStyles,
          styleUrls: allStyleUrls,
          moduleUrl: stylesheet.moduleUrl
        });
      };
      DirectiveNormalizer = __decorate$5([CompilerInjectable(), __metadata$5('design:paramtypes', [ResourceLoader, UrlResolver, HtmlParser, CompilerConfig])], DirectiveNormalizer);
      return DirectiveNormalizer;
    }());
    var TemplatePreparseVisitor = (function() {
      function TemplatePreparseVisitor() {
        this.ngContentSelectors = [];
        this.styles = [];
        this.styleUrls = [];
        this.ngNonBindableStackCount = 0;
      }
      TemplatePreparseVisitor.prototype.visitElement = function(ast, context) {
        var preparsedElement = preparseElement(ast);
        switch (preparsedElement.type) {
          case PreparsedElementType.NG_CONTENT:
            if (this.ngNonBindableStackCount === 0) {
              this.ngContentSelectors.push(preparsedElement.selectAttr);
            }
            break;
          case PreparsedElementType.STYLE:
            var textContent_1 = '';
            ast.children.forEach(function(child) {
              if (child instanceof Text) {
                textContent_1 += child.value;
              }
            });
            this.styles.push(textContent_1);
            break;
          case PreparsedElementType.STYLESHEET:
            this.styleUrls.push(preparsedElement.hrefAttr);
            break;
          default:
            break;
        }
        if (preparsedElement.nonBindable) {
          this.ngNonBindableStackCount++;
        }
        visitAll(this, ast.children);
        if (preparsedElement.nonBindable) {
          this.ngNonBindableStackCount--;
        }
        return null;
      };
      TemplatePreparseVisitor.prototype.visitExpansion = function(ast, context) {
        visitAll(this, ast.cases);
      };
      TemplatePreparseVisitor.prototype.visitExpansionCase = function(ast, context) {
        visitAll(this, ast.expression);
      };
      TemplatePreparseVisitor.prototype.visitComment = function(ast, context) {
        return null;
      };
      TemplatePreparseVisitor.prototype.visitAttribute = function(ast, context) {
        return null;
      };
      TemplatePreparseVisitor.prototype.visitText = function(ast, context) {
        return null;
      };
      return TemplatePreparseVisitor;
    }());
    var __decorate$7 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$7 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var DirectiveResolver = (function() {
      function DirectiveResolver(_reflector) {
        if (_reflector === void 0) {
          _reflector = reflector;
        }
        this._reflector = _reflector;
      }
      DirectiveResolver.prototype.isDirective = function(type) {
        var typeMetadata = this._reflector.annotations(_angular_core.resolveForwardRef(type));
        return typeMetadata && typeMetadata.some(isDirectiveMetadata);
      };
      DirectiveResolver.prototype.resolve = function(type, throwIfNotFound) {
        if (throwIfNotFound === void 0) {
          throwIfNotFound = true;
        }
        var typeMetadata = this._reflector.annotations(_angular_core.resolveForwardRef(type));
        if (typeMetadata) {
          var metadata = ListWrapper.findLast(typeMetadata, isDirectiveMetadata);
          if (metadata) {
            var propertyMetadata = this._reflector.propMetadata(type);
            return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
          }
        }
        if (throwIfNotFound) {
          throw new Error("No Directive annotation found on " + stringify(type));
        }
        return null;
      };
      DirectiveResolver.prototype._mergeWithPropertyMetadata = function(dm, propertyMetadata, directiveType) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        Object.keys(propertyMetadata).forEach(function(propName) {
          var input = ListWrapper.findLast(propertyMetadata[propName], function(a) {
            return a instanceof _angular_core.Input;
          });
          if (input) {
            if (input.bindingPropertyName) {
              inputs.push(propName + ": " + input.bindingPropertyName);
            } else {
              inputs.push(propName);
            }
          }
          var output = ListWrapper.findLast(propertyMetadata[propName], function(a) {
            return a instanceof _angular_core.Output;
          });
          if (output) {
            if (output.bindingPropertyName) {
              outputs.push(propName + ": " + output.bindingPropertyName);
            } else {
              outputs.push(propName);
            }
          }
          var hostBindings = propertyMetadata[propName].filter(function(a) {
            return a && a instanceof _angular_core.HostBinding;
          });
          hostBindings.forEach(function(hostBinding) {
            if (hostBinding.hostPropertyName) {
              var startWith = hostBinding.hostPropertyName[0];
              if (startWith === '(') {
                throw new Error("@HostBinding can not bind to events. Use @HostListener instead.");
              } else if (startWith === '[') {
                throw new Error("@HostBinding parameter should be a property name, 'class.<name>', or 'attr.<name>'.");
              }
              host[("[" + hostBinding.hostPropertyName + "]")] = propName;
            } else {
              host[("[" + propName + "]")] = propName;
            }
          });
          var hostListeners = propertyMetadata[propName].filter(function(a) {
            return a && a instanceof _angular_core.HostListener;
          });
          hostListeners.forEach(function(hostListener) {
            var args = hostListener.args || [];
            host[("(" + hostListener.eventName + ")")] = propName + "(" + args.join(',') + ")";
          });
          var query = ListWrapper.findLast(propertyMetadata[propName], function(a) {
            return a instanceof _angular_core.Query;
          });
          if (query) {
            queries[propName] = query;
          }
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
      };
      DirectiveResolver.prototype._extractPublicName = function(def) {
        return splitAtColon(def, [null, def])[1].trim();
      };
      DirectiveResolver.prototype._dedupeBindings = function(bindings) {
        var names = new Set();
        var reversedResult = [];
        for (var i = bindings.length - 1; i >= 0; i--) {
          var binding = bindings[i];
          var name_1 = this._extractPublicName(binding);
          if (!names.has(name_1)) {
            names.add(name_1);
            reversedResult.push(binding);
          }
        }
        return reversedResult.reverse();
      };
      DirectiveResolver.prototype._merge = function(directive, inputs, outputs, host, queries, directiveType) {
        var mergedInputs = this._dedupeBindings(directive.inputs ? directive.inputs.concat(inputs) : inputs);
        var mergedOutputs = this._dedupeBindings(directive.outputs ? directive.outputs.concat(outputs) : outputs);
        var mergedHost = directive.host ? StringMapWrapper.merge(directive.host, host) : host;
        var mergedQueries = directive.queries ? StringMapWrapper.merge(directive.queries, queries) : queries;
        if (directive instanceof _angular_core.Component) {
          return new _angular_core.Component({
            selector: directive.selector,
            inputs: mergedInputs,
            outputs: mergedOutputs,
            host: mergedHost,
            exportAs: directive.exportAs,
            moduleId: directive.moduleId,
            queries: mergedQueries,
            changeDetection: directive.changeDetection,
            providers: directive.providers,
            viewProviders: directive.viewProviders,
            entryComponents: directive.entryComponents,
            template: directive.template,
            templateUrl: directive.templateUrl,
            styles: directive.styles,
            styleUrls: directive.styleUrls,
            encapsulation: directive.encapsulation,
            animations: directive.animations,
            interpolation: directive.interpolation
          });
        } else {
          return new _angular_core.Directive({
            selector: directive.selector,
            inputs: mergedInputs,
            outputs: mergedOutputs,
            host: mergedHost,
            exportAs: directive.exportAs,
            queries: mergedQueries,
            providers: directive.providers
          });
        }
      };
      DirectiveResolver = __decorate$7([CompilerInjectable(), __metadata$7('design:paramtypes', [ReflectorReader])], DirectiveResolver);
      return DirectiveResolver;
    }());
    function isDirectiveMetadata(type) {
      return type instanceof _angular_core.Directive;
    }
    var __extends$20 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TypeModifier = {};
    TypeModifier.Const = 0;
    TypeModifier[TypeModifier.Const] = "Const";
    var Type$1 = (function() {
      function Type(modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        this.modifiers = modifiers;
        if (!modifiers) {
          this.modifiers = [];
        }
      }
      Type.prototype.visitType = function(visitor, context) {};
      Type.prototype.hasModifier = function(modifier) {
        return this.modifiers.indexOf(modifier) !== -1;
      };
      return Type;
    }());
    var BuiltinTypeName = {};
    BuiltinTypeName.Dynamic = 0;
    BuiltinTypeName.Bool = 1;
    BuiltinTypeName.String = 2;
    BuiltinTypeName.Int = 3;
    BuiltinTypeName.Number = 4;
    BuiltinTypeName.Function = 5;
    BuiltinTypeName.Null = 6;
    BuiltinTypeName[BuiltinTypeName.Dynamic] = "Dynamic";
    BuiltinTypeName[BuiltinTypeName.Bool] = "Bool";
    BuiltinTypeName[BuiltinTypeName.String] = "String";
    BuiltinTypeName[BuiltinTypeName.Int] = "Int";
    BuiltinTypeName[BuiltinTypeName.Number] = "Number";
    BuiltinTypeName[BuiltinTypeName.Function] = "Function";
    BuiltinTypeName[BuiltinTypeName.Null] = "Null";
    var BuiltinType = (function(_super) {
      __extends$20(BuiltinType, _super);
      function BuiltinType(name, modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.name = name;
      }
      BuiltinType.prototype.visitType = function(visitor, context) {
        return visitor.visitBuiltintType(this, context);
      };
      return BuiltinType;
    }(Type$1));
    var ExpressionType = (function(_super) {
      __extends$20(ExpressionType, _super);
      function ExpressionType(value, typeParams, modifiers) {
        if (typeParams === void 0) {
          typeParams = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.value = value;
        this.typeParams = typeParams;
      }
      ExpressionType.prototype.visitType = function(visitor, context) {
        return visitor.visitExpressionType(this, context);
      };
      return ExpressionType;
    }(Type$1));
    var ArrayType = (function(_super) {
      __extends$20(ArrayType, _super);
      function ArrayType(of, modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.of = of;
      }
      ArrayType.prototype.visitType = function(visitor, context) {
        return visitor.visitArrayType(this, context);
      };
      return ArrayType;
    }(Type$1));
    var MapType = (function(_super) {
      __extends$20(MapType, _super);
      function MapType(valueType, modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.valueType = valueType;
      }
      MapType.prototype.visitType = function(visitor, context) {
        return visitor.visitMapType(this, context);
      };
      return MapType;
    }(Type$1));
    var DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
    var BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
    var INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
    var NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
    var STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
    var FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
    var NULL_TYPE = new BuiltinType(BuiltinTypeName.Null);
    var BinaryOperator = {};
    BinaryOperator.Equals = 0;
    BinaryOperator.NotEquals = 1;
    BinaryOperator.Identical = 2;
    BinaryOperator.NotIdentical = 3;
    BinaryOperator.Minus = 4;
    BinaryOperator.Plus = 5;
    BinaryOperator.Divide = 6;
    BinaryOperator.Multiply = 7;
    BinaryOperator.Modulo = 8;
    BinaryOperator.And = 9;
    BinaryOperator.Or = 10;
    BinaryOperator.Lower = 11;
    BinaryOperator.LowerEquals = 12;
    BinaryOperator.Bigger = 13;
    BinaryOperator.BiggerEquals = 14;
    BinaryOperator[BinaryOperator.Equals] = "Equals";
    BinaryOperator[BinaryOperator.NotEquals] = "NotEquals";
    BinaryOperator[BinaryOperator.Identical] = "Identical";
    BinaryOperator[BinaryOperator.NotIdentical] = "NotIdentical";
    BinaryOperator[BinaryOperator.Minus] = "Minus";
    BinaryOperator[BinaryOperator.Plus] = "Plus";
    BinaryOperator[BinaryOperator.Divide] = "Divide";
    BinaryOperator[BinaryOperator.Multiply] = "Multiply";
    BinaryOperator[BinaryOperator.Modulo] = "Modulo";
    BinaryOperator[BinaryOperator.And] = "And";
    BinaryOperator[BinaryOperator.Or] = "Or";
    BinaryOperator[BinaryOperator.Lower] = "Lower";
    BinaryOperator[BinaryOperator.LowerEquals] = "LowerEquals";
    BinaryOperator[BinaryOperator.Bigger] = "Bigger";
    BinaryOperator[BinaryOperator.BiggerEquals] = "BiggerEquals";
    var Expression = (function() {
      function Expression(type) {
        this.type = type;
      }
      Expression.prototype.visitExpression = function(visitor, context) {};
      Expression.prototype.prop = function(name) {
        return new ReadPropExpr(this, name);
      };
      Expression.prototype.key = function(index, type) {
        if (type === void 0) {
          type = null;
        }
        return new ReadKeyExpr(this, index, type);
      };
      Expression.prototype.callMethod = function(name, params) {
        return new InvokeMethodExpr(this, name, params);
      };
      Expression.prototype.callFn = function(params) {
        return new InvokeFunctionExpr(this, params);
      };
      Expression.prototype.instantiate = function(params, type) {
        if (type === void 0) {
          type = null;
        }
        return new InstantiateExpr(this, params, type);
      };
      Expression.prototype.conditional = function(trueCase, falseCase) {
        if (falseCase === void 0) {
          falseCase = null;
        }
        return new ConditionalExpr(this, trueCase, falseCase);
      };
      Expression.prototype.equals = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs);
      };
      Expression.prototype.notEquals = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs);
      };
      Expression.prototype.identical = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs);
      };
      Expression.prototype.notIdentical = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs);
      };
      Expression.prototype.minus = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs);
      };
      Expression.prototype.plus = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs);
      };
      Expression.prototype.divide = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs);
      };
      Expression.prototype.multiply = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs);
      };
      Expression.prototype.modulo = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs);
      };
      Expression.prototype.and = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.And, this, rhs);
      };
      Expression.prototype.or = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs);
      };
      Expression.prototype.lower = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs);
      };
      Expression.prototype.lowerEquals = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs);
      };
      Expression.prototype.bigger = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs);
      };
      Expression.prototype.biggerEquals = function(rhs) {
        return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs);
      };
      Expression.prototype.isBlank = function() {
        return this.equals(TYPED_NULL_EXPR);
      };
      Expression.prototype.cast = function(type) {
        return new CastExpr(this, type);
      };
      Expression.prototype.toStmt = function() {
        return new ExpressionStatement(this);
      };
      return Expression;
    }());
    var BuiltinVar = {};
    BuiltinVar.This = 0;
    BuiltinVar.Super = 1;
    BuiltinVar.CatchError = 2;
    BuiltinVar.CatchStack = 3;
    BuiltinVar[BuiltinVar.This] = "This";
    BuiltinVar[BuiltinVar.Super] = "Super";
    BuiltinVar[BuiltinVar.CatchError] = "CatchError";
    BuiltinVar[BuiltinVar.CatchStack] = "CatchStack";
    var ReadVarExpr = (function(_super) {
      __extends$20(ReadVarExpr, _super);
      function ReadVarExpr(name, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        if (typeof name === 'string') {
          this.name = name;
          this.builtin = null;
        } else {
          this.name = null;
          this.builtin = name;
        }
      }
      ReadVarExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitReadVarExpr(this, context);
      };
      ReadVarExpr.prototype.set = function(value) {
        return new WriteVarExpr(this.name, value);
      };
      return ReadVarExpr;
    }(Expression));
    var WriteVarExpr = (function(_super) {
      __extends$20(WriteVarExpr, _super);
      function WriteVarExpr(name, value, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type || value.type);
        this.name = name;
        this.value = value;
      }
      WriteVarExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitWriteVarExpr(this, context);
      };
      WriteVarExpr.prototype.toDeclStmt = function(type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        return new DeclareVarStmt(this.name, this.value, type, modifiers);
      };
      return WriteVarExpr;
    }(Expression));
    var WriteKeyExpr = (function(_super) {
      __extends$20(WriteKeyExpr, _super);
      function WriteKeyExpr(receiver, index, value, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type || value.type);
        this.receiver = receiver;
        this.index = index;
        this.value = value;
      }
      WriteKeyExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitWriteKeyExpr(this, context);
      };
      return WriteKeyExpr;
    }(Expression));
    var WritePropExpr = (function(_super) {
      __extends$20(WritePropExpr, _super);
      function WritePropExpr(receiver, name, value, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type || value.type);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
      }
      WritePropExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitWritePropExpr(this, context);
      };
      return WritePropExpr;
    }(Expression));
    var BuiltinMethod = {};
    BuiltinMethod.ConcatArray = 0;
    BuiltinMethod.SubscribeObservable = 1;
    BuiltinMethod.Bind = 2;
    BuiltinMethod[BuiltinMethod.ConcatArray] = "ConcatArray";
    BuiltinMethod[BuiltinMethod.SubscribeObservable] = "SubscribeObservable";
    BuiltinMethod[BuiltinMethod.Bind] = "Bind";
    var InvokeMethodExpr = (function(_super) {
      __extends$20(InvokeMethodExpr, _super);
      function InvokeMethodExpr(receiver, method, args, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.receiver = receiver;
        this.args = args;
        if (typeof method === 'string') {
          this.name = method;
          this.builtin = null;
        } else {
          this.name = null;
          this.builtin = method;
        }
      }
      InvokeMethodExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitInvokeMethodExpr(this, context);
      };
      return InvokeMethodExpr;
    }(Expression));
    var InvokeFunctionExpr = (function(_super) {
      __extends$20(InvokeFunctionExpr, _super);
      function InvokeFunctionExpr(fn, args, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.fn = fn;
        this.args = args;
      }
      InvokeFunctionExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitInvokeFunctionExpr(this, context);
      };
      return InvokeFunctionExpr;
    }(Expression));
    var InstantiateExpr = (function(_super) {
      __extends$20(InstantiateExpr, _super);
      function InstantiateExpr(classExpr, args, type) {
        _super.call(this, type);
        this.classExpr = classExpr;
        this.args = args;
      }
      InstantiateExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitInstantiateExpr(this, context);
      };
      return InstantiateExpr;
    }(Expression));
    var LiteralExpr = (function(_super) {
      __extends$20(LiteralExpr, _super);
      function LiteralExpr(value, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.value = value;
      }
      LiteralExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitLiteralExpr(this, context);
      };
      return LiteralExpr;
    }(Expression));
    var ExternalExpr = (function(_super) {
      __extends$20(ExternalExpr, _super);
      function ExternalExpr(value, type, typeParams) {
        if (type === void 0) {
          type = null;
        }
        if (typeParams === void 0) {
          typeParams = null;
        }
        _super.call(this, type);
        this.value = value;
        this.typeParams = typeParams;
      }
      ExternalExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitExternalExpr(this, context);
      };
      return ExternalExpr;
    }(Expression));
    var ConditionalExpr = (function(_super) {
      __extends$20(ConditionalExpr, _super);
      function ConditionalExpr(condition, trueCase, falseCase, type) {
        if (falseCase === void 0) {
          falseCase = null;
        }
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type || trueCase.type);
        this.condition = condition;
        this.falseCase = falseCase;
        this.trueCase = trueCase;
      }
      ConditionalExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitConditionalExpr(this, context);
      };
      return ConditionalExpr;
    }(Expression));
    var NotExpr = (function(_super) {
      __extends$20(NotExpr, _super);
      function NotExpr(condition) {
        _super.call(this, BOOL_TYPE);
        this.condition = condition;
      }
      NotExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitNotExpr(this, context);
      };
      return NotExpr;
    }(Expression));
    var CastExpr = (function(_super) {
      __extends$20(CastExpr, _super);
      function CastExpr(value, type) {
        _super.call(this, type);
        this.value = value;
      }
      CastExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitCastExpr(this, context);
      };
      return CastExpr;
    }(Expression));
    var FnParam = (function() {
      function FnParam(name, type) {
        if (type === void 0) {
          type = null;
        }
        this.name = name;
        this.type = type;
      }
      return FnParam;
    }());
    var FunctionExpr = (function(_super) {
      __extends$20(FunctionExpr, _super);
      function FunctionExpr(params, statements, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.params = params;
        this.statements = statements;
      }
      FunctionExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitFunctionExpr(this, context);
      };
      FunctionExpr.prototype.toDeclStmt = function(name, modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers);
      };
      return FunctionExpr;
    }(Expression));
    var BinaryOperatorExpr = (function(_super) {
      __extends$20(BinaryOperatorExpr, _super);
      function BinaryOperatorExpr(operator, lhs, rhs, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type || lhs.type);
        this.operator = operator;
        this.rhs = rhs;
        this.lhs = lhs;
      }
      BinaryOperatorExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitBinaryOperatorExpr(this, context);
      };
      return BinaryOperatorExpr;
    }(Expression));
    var ReadPropExpr = (function(_super) {
      __extends$20(ReadPropExpr, _super);
      function ReadPropExpr(receiver, name, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.receiver = receiver;
        this.name = name;
      }
      ReadPropExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitReadPropExpr(this, context);
      };
      ReadPropExpr.prototype.set = function(value) {
        return new WritePropExpr(this.receiver, this.name, value);
      };
      return ReadPropExpr;
    }(Expression));
    var ReadKeyExpr = (function(_super) {
      __extends$20(ReadKeyExpr, _super);
      function ReadKeyExpr(receiver, index, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.receiver = receiver;
        this.index = index;
      }
      ReadKeyExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitReadKeyExpr(this, context);
      };
      ReadKeyExpr.prototype.set = function(value) {
        return new WriteKeyExpr(this.receiver, this.index, value);
      };
      return ReadKeyExpr;
    }(Expression));
    var LiteralArrayExpr = (function(_super) {
      __extends$20(LiteralArrayExpr, _super);
      function LiteralArrayExpr(entries, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.entries = entries;
      }
      LiteralArrayExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitLiteralArrayExpr(this, context);
      };
      return LiteralArrayExpr;
    }(Expression));
    var LiteralMapEntry = (function() {
      function LiteralMapEntry(key, value, quoted) {
        if (quoted === void 0) {
          quoted = false;
        }
        this.key = key;
        this.value = value;
        this.quoted = quoted;
      }
      return LiteralMapEntry;
    }());
    var LiteralMapExpr = (function(_super) {
      __extends$20(LiteralMapExpr, _super);
      function LiteralMapExpr(entries, type) {
        if (type === void 0) {
          type = null;
        }
        _super.call(this, type);
        this.entries = entries;
        this.valueType = null;
        if (isPresent(type)) {
          this.valueType = type.valueType;
        }
      }
      LiteralMapExpr.prototype.visitExpression = function(visitor, context) {
        return visitor.visitLiteralMapExpr(this, context);
      };
      return LiteralMapExpr;
    }(Expression));
    var THIS_EXPR = new ReadVarExpr(BuiltinVar.This);
    var SUPER_EXPR = new ReadVarExpr(BuiltinVar.Super);
    var CATCH_ERROR_VAR = new ReadVarExpr(BuiltinVar.CatchError);
    var CATCH_STACK_VAR = new ReadVarExpr(BuiltinVar.CatchStack);
    var NULL_EXPR = new LiteralExpr(null, null);
    var TYPED_NULL_EXPR = new LiteralExpr(null, NULL_TYPE);
    var StmtModifier = {};
    StmtModifier.Final = 0;
    StmtModifier.Private = 1;
    StmtModifier[StmtModifier.Final] = "Final";
    StmtModifier[StmtModifier.Private] = "Private";
    var Statement = (function() {
      function Statement(modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        this.modifiers = modifiers;
        if (!modifiers) {
          this.modifiers = [];
        }
      }
      Statement.prototype.visitStatement = function(visitor, context) {};
      Statement.prototype.hasModifier = function(modifier) {
        return this.modifiers.indexOf(modifier) !== -1;
      };
      return Statement;
    }());
    var DeclareVarStmt = (function(_super) {
      __extends$20(DeclareVarStmt, _super);
      function DeclareVarStmt(name, value, type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.name = name;
        this.value = value;
        this.type = type || value.type;
      }
      DeclareVarStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitDeclareVarStmt(this, context);
      };
      return DeclareVarStmt;
    }(Statement));
    var DeclareFunctionStmt = (function(_super) {
      __extends$20(DeclareFunctionStmt, _super);
      function DeclareFunctionStmt(name, params, statements, type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.name = name;
        this.params = params;
        this.statements = statements;
        this.type = type;
      }
      DeclareFunctionStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitDeclareFunctionStmt(this, context);
      };
      return DeclareFunctionStmt;
    }(Statement));
    var ExpressionStatement = (function(_super) {
      __extends$20(ExpressionStatement, _super);
      function ExpressionStatement(expr) {
        _super.call(this);
        this.expr = expr;
      }
      ExpressionStatement.prototype.visitStatement = function(visitor, context) {
        return visitor.visitExpressionStmt(this, context);
      };
      return ExpressionStatement;
    }(Statement));
    var ReturnStatement = (function(_super) {
      __extends$20(ReturnStatement, _super);
      function ReturnStatement(value) {
        _super.call(this);
        this.value = value;
      }
      ReturnStatement.prototype.visitStatement = function(visitor, context) {
        return visitor.visitReturnStmt(this, context);
      };
      return ReturnStatement;
    }(Statement));
    var AbstractClassPart = (function() {
      function AbstractClassPart(type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        this.type = type;
        this.modifiers = modifiers;
        if (!modifiers) {
          this.modifiers = [];
        }
      }
      AbstractClassPart.prototype.hasModifier = function(modifier) {
        return this.modifiers.indexOf(modifier) !== -1;
      };
      return AbstractClassPart;
    }());
    var ClassField = (function(_super) {
      __extends$20(ClassField, _super);
      function ClassField(name, type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, type, modifiers);
        this.name = name;
      }
      return ClassField;
    }(AbstractClassPart));
    var ClassMethod = (function(_super) {
      __extends$20(ClassMethod, _super);
      function ClassMethod(name, params, body, type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, type, modifiers);
        this.name = name;
        this.params = params;
        this.body = body;
      }
      return ClassMethod;
    }(AbstractClassPart));
    var ClassGetter = (function(_super) {
      __extends$20(ClassGetter, _super);
      function ClassGetter(name, body, type, modifiers) {
        if (type === void 0) {
          type = null;
        }
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, type, modifiers);
        this.name = name;
        this.body = body;
      }
      return ClassGetter;
    }(AbstractClassPart));
    var ClassStmt = (function(_super) {
      __extends$20(ClassStmt, _super);
      function ClassStmt(name, parent, fields, getters, constructorMethod, methods, modifiers) {
        if (modifiers === void 0) {
          modifiers = null;
        }
        _super.call(this, modifiers);
        this.name = name;
        this.parent = parent;
        this.fields = fields;
        this.getters = getters;
        this.constructorMethod = constructorMethod;
        this.methods = methods;
      }
      ClassStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitDeclareClassStmt(this, context);
      };
      return ClassStmt;
    }(Statement));
    var IfStmt = (function(_super) {
      __extends$20(IfStmt, _super);
      function IfStmt(condition, trueCase, falseCase) {
        if (falseCase === void 0) {
          falseCase = [];
        }
        _super.call(this);
        this.condition = condition;
        this.trueCase = trueCase;
        this.falseCase = falseCase;
      }
      IfStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitIfStmt(this, context);
      };
      return IfStmt;
    }(Statement));
    var CommentStmt = (function(_super) {
      __extends$20(CommentStmt, _super);
      function CommentStmt(comment) {
        _super.call(this);
        this.comment = comment;
      }
      CommentStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitCommentStmt(this, context);
      };
      return CommentStmt;
    }(Statement));
    var TryCatchStmt = (function(_super) {
      __extends$20(TryCatchStmt, _super);
      function TryCatchStmt(bodyStmts, catchStmts) {
        _super.call(this);
        this.bodyStmts = bodyStmts;
        this.catchStmts = catchStmts;
      }
      TryCatchStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitTryCatchStmt(this, context);
      };
      return TryCatchStmt;
    }(Statement));
    var ThrowStmt = (function(_super) {
      __extends$20(ThrowStmt, _super);
      function ThrowStmt(error) {
        _super.call(this);
        this.error = error;
      }
      ThrowStmt.prototype.visitStatement = function(visitor, context) {
        return visitor.visitThrowStmt(this, context);
      };
      return ThrowStmt;
    }(Statement));
    var ExpressionTransformer = (function() {
      function ExpressionTransformer() {}
      ExpressionTransformer.prototype.visitReadVarExpr = function(ast, context) {
        return ast;
      };
      ExpressionTransformer.prototype.visitWriteVarExpr = function(expr, context) {
        return new WriteVarExpr(expr.name, expr.value.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitWriteKeyExpr = function(expr, context) {
        return new WriteKeyExpr(expr.receiver.visitExpression(this, context), expr.index.visitExpression(this, context), expr.value.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitWritePropExpr = function(expr, context) {
        return new WritePropExpr(expr.receiver.visitExpression(this, context), expr.name, expr.value.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitInvokeMethodExpr = function(ast, context) {
        var method = ast.builtin || ast.name;
        return new InvokeMethodExpr(ast.receiver.visitExpression(this, context), method, this.visitAllExpressions(ast.args, context), ast.type);
      };
      ExpressionTransformer.prototype.visitInvokeFunctionExpr = function(ast, context) {
        return new InvokeFunctionExpr(ast.fn.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
      };
      ExpressionTransformer.prototype.visitInstantiateExpr = function(ast, context) {
        return new InstantiateExpr(ast.classExpr.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
      };
      ExpressionTransformer.prototype.visitLiteralExpr = function(ast, context) {
        return ast;
      };
      ExpressionTransformer.prototype.visitExternalExpr = function(ast, context) {
        return ast;
      };
      ExpressionTransformer.prototype.visitConditionalExpr = function(ast, context) {
        return new ConditionalExpr(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), ast.falseCase.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitNotExpr = function(ast, context) {
        return new NotExpr(ast.condition.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitCastExpr = function(ast, context) {
        return new CastExpr(ast.value.visitExpression(this, context), context);
      };
      ExpressionTransformer.prototype.visitFunctionExpr = function(ast, context) {
        return ast;
      };
      ExpressionTransformer.prototype.visitBinaryOperatorExpr = function(ast, context) {
        return new BinaryOperatorExpr(ast.operator, ast.lhs.visitExpression(this, context), ast.rhs.visitExpression(this, context), ast.type);
      };
      ExpressionTransformer.prototype.visitReadPropExpr = function(ast, context) {
        return new ReadPropExpr(ast.receiver.visitExpression(this, context), ast.name, ast.type);
      };
      ExpressionTransformer.prototype.visitReadKeyExpr = function(ast, context) {
        return new ReadKeyExpr(ast.receiver.visitExpression(this, context), ast.index.visitExpression(this, context), ast.type);
      };
      ExpressionTransformer.prototype.visitLiteralArrayExpr = function(ast, context) {
        return new LiteralArrayExpr(this.visitAllExpressions(ast.entries, context));
      };
      ExpressionTransformer.prototype.visitLiteralMapExpr = function(ast, context) {
        var _this = this;
        var entries = ast.entries.map(function(entry) {
          return new LiteralMapEntry(entry.key, entry.value.visitExpression(_this, context), entry.quoted);
        });
        return new LiteralMapExpr(entries);
      };
      ExpressionTransformer.prototype.visitAllExpressions = function(exprs, context) {
        var _this = this;
        return exprs.map(function(expr) {
          return expr.visitExpression(_this, context);
        });
      };
      ExpressionTransformer.prototype.visitDeclareVarStmt = function(stmt, context) {
        return new DeclareVarStmt(stmt.name, stmt.value.visitExpression(this, context), stmt.type, stmt.modifiers);
      };
      ExpressionTransformer.prototype.visitDeclareFunctionStmt = function(stmt, context) {
        return stmt;
      };
      ExpressionTransformer.prototype.visitExpressionStmt = function(stmt, context) {
        return new ExpressionStatement(stmt.expr.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitReturnStmt = function(stmt, context) {
        return new ReturnStatement(stmt.value.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitDeclareClassStmt = function(stmt, context) {
        return stmt;
      };
      ExpressionTransformer.prototype.visitIfStmt = function(stmt, context) {
        return new IfStmt(stmt.condition.visitExpression(this, context), this.visitAllStatements(stmt.trueCase, context), this.visitAllStatements(stmt.falseCase, context));
      };
      ExpressionTransformer.prototype.visitTryCatchStmt = function(stmt, context) {
        return new TryCatchStmt(this.visitAllStatements(stmt.bodyStmts, context), this.visitAllStatements(stmt.catchStmts, context));
      };
      ExpressionTransformer.prototype.visitThrowStmt = function(stmt, context) {
        return new ThrowStmt(stmt.error.visitExpression(this, context));
      };
      ExpressionTransformer.prototype.visitCommentStmt = function(stmt, context) {
        return stmt;
      };
      ExpressionTransformer.prototype.visitAllStatements = function(stmts, context) {
        var _this = this;
        return stmts.map(function(stmt) {
          return stmt.visitStatement(_this, context);
        });
      };
      return ExpressionTransformer;
    }());
    var RecursiveExpressionVisitor = (function() {
      function RecursiveExpressionVisitor() {}
      RecursiveExpressionVisitor.prototype.visitReadVarExpr = function(ast, context) {
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitWriteVarExpr = function(expr, context) {
        expr.value.visitExpression(this, context);
        return expr;
      };
      RecursiveExpressionVisitor.prototype.visitWriteKeyExpr = function(expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.index.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
      };
      RecursiveExpressionVisitor.prototype.visitWritePropExpr = function(expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
      };
      RecursiveExpressionVisitor.prototype.visitInvokeMethodExpr = function(ast, context) {
        ast.receiver.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitInvokeFunctionExpr = function(ast, context) {
        ast.fn.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitInstantiateExpr = function(ast, context) {
        ast.classExpr.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitLiteralExpr = function(ast, context) {
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitExternalExpr = function(ast, context) {
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitConditionalExpr = function(ast, context) {
        ast.condition.visitExpression(this, context);
        ast.trueCase.visitExpression(this, context);
        ast.falseCase.visitExpression(this, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitNotExpr = function(ast, context) {
        ast.condition.visitExpression(this, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitCastExpr = function(ast, context) {
        ast.value.visitExpression(this, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitFunctionExpr = function(ast, context) {
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitBinaryOperatorExpr = function(ast, context) {
        ast.lhs.visitExpression(this, context);
        ast.rhs.visitExpression(this, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitReadPropExpr = function(ast, context) {
        ast.receiver.visitExpression(this, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitReadKeyExpr = function(ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.index.visitExpression(this, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitLiteralArrayExpr = function(ast, context) {
        this.visitAllExpressions(ast.entries, context);
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitLiteralMapExpr = function(ast, context) {
        var _this = this;
        ast.entries.forEach(function(entry) {
          return entry.value.visitExpression(_this, context);
        });
        return ast;
      };
      RecursiveExpressionVisitor.prototype.visitAllExpressions = function(exprs, context) {
        var _this = this;
        exprs.forEach(function(expr) {
          return expr.visitExpression(_this, context);
        });
      };
      RecursiveExpressionVisitor.prototype.visitDeclareVarStmt = function(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitDeclareFunctionStmt = function(stmt, context) {
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitExpressionStmt = function(stmt, context) {
        stmt.expr.visitExpression(this, context);
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitReturnStmt = function(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitDeclareClassStmt = function(stmt, context) {
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitIfStmt = function(stmt, context) {
        stmt.condition.visitExpression(this, context);
        this.visitAllStatements(stmt.trueCase, context);
        this.visitAllStatements(stmt.falseCase, context);
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitTryCatchStmt = function(stmt, context) {
        this.visitAllStatements(stmt.bodyStmts, context);
        this.visitAllStatements(stmt.catchStmts, context);
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitThrowStmt = function(stmt, context) {
        stmt.error.visitExpression(this, context);
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitCommentStmt = function(stmt, context) {
        return stmt;
      };
      RecursiveExpressionVisitor.prototype.visitAllStatements = function(stmts, context) {
        var _this = this;
        stmts.forEach(function(stmt) {
          return stmt.visitStatement(_this, context);
        });
      };
      return RecursiveExpressionVisitor;
    }());
    function replaceVarInExpression(varName, newValue, expression) {
      var transformer = new _ReplaceVariableTransformer(varName, newValue);
      return expression.visitExpression(transformer, null);
    }
    var _ReplaceVariableTransformer = (function(_super) {
      __extends$20(_ReplaceVariableTransformer, _super);
      function _ReplaceVariableTransformer(_varName, _newValue) {
        _super.call(this);
        this._varName = _varName;
        this._newValue = _newValue;
      }
      _ReplaceVariableTransformer.prototype.visitReadVarExpr = function(ast, context) {
        return ast.name == this._varName ? this._newValue : ast;
      };
      return _ReplaceVariableTransformer;
    }(ExpressionTransformer));
    function findReadVarNames(stmts) {
      var finder = new _VariableFinder();
      finder.visitAllStatements(stmts, null);
      return finder.varNames;
    }
    var _VariableFinder = (function(_super) {
      __extends$20(_VariableFinder, _super);
      function _VariableFinder() {
        _super.apply(this, arguments);
        this.varNames = new Set();
      }
      _VariableFinder.prototype.visitReadVarExpr = function(ast, context) {
        this.varNames.add(ast.name);
        return null;
      };
      return _VariableFinder;
    }(RecursiveExpressionVisitor));
    function variable(name, type) {
      if (type === void 0) {
        type = null;
      }
      return new ReadVarExpr(name, type);
    }
    function importExpr(id, typeParams) {
      if (typeParams === void 0) {
        typeParams = null;
      }
      return new ExternalExpr(id, null, typeParams);
    }
    function importType(id, typeParams, typeModifiers) {
      if (typeParams === void 0) {
        typeParams = null;
      }
      if (typeModifiers === void 0) {
        typeModifiers = null;
      }
      return isPresent(id) ? expressionType(importExpr(id), typeParams, typeModifiers) : null;
    }
    function expressionType(expr, typeParams, typeModifiers) {
      if (typeParams === void 0) {
        typeParams = null;
      }
      if (typeModifiers === void 0) {
        typeModifiers = null;
      }
      return isPresent(expr) ? new ExpressionType(expr, typeParams, typeModifiers) : null;
    }
    function literalArr(values, type) {
      if (type === void 0) {
        type = null;
      }
      return new LiteralArrayExpr(values, type);
    }
    function literalMap(values, type, quoted) {
      if (type === void 0) {
        type = null;
      }
      if (quoted === void 0) {
        quoted = false;
      }
      return new LiteralMapExpr(values.map(function(entry) {
        return new LiteralMapEntry(entry[0], entry[1], quoted);
      }), type);
    }
    function not(expr) {
      return new NotExpr(expr);
    }
    function fn(params, body, type) {
      if (type === void 0) {
        type = null;
      }
      return new FunctionExpr(params, body, type);
    }
    function literal(value, type) {
      if (type === void 0) {
        type = null;
      }
      return new LiteralExpr(value, type);
    }
    var CheckBindingField = (function() {
      function CheckBindingField(expression, bindingId) {
        this.expression = expression;
        this.bindingId = bindingId;
      }
      return CheckBindingField;
    }());
    function createCheckBindingField(builder) {
      var bindingId = "" + builder.fields.length;
      var fieldExpr = createBindFieldExpr(bindingId);
      builder.fields.push(new ClassField(fieldExpr.name, null, [StmtModifier.Private]));
      builder.ctorStmts.push(THIS_EXPR.prop(fieldExpr.name).set(importExpr(createIdentifier(Identifiers.UNINITIALIZED))).toStmt());
      return new CheckBindingField(fieldExpr, bindingId);
    }
    function createCheckBindingStmt(evalResult, fieldExpr, throwOnChangeVar, actions) {
      var condition = importExpr(createIdentifier(Identifiers.checkBinding)).callFn([throwOnChangeVar, fieldExpr, evalResult.currValExpr]);
      if (evalResult.forceUpdate) {
        condition = evalResult.forceUpdate.or(condition);
      }
      return evalResult.stmts.concat([new IfStmt(condition, actions.concat([(THIS_EXPR.prop(fieldExpr.name).set(evalResult.currValExpr).toStmt())]))]);
    }
    function createBindFieldExpr(bindingId) {
      return THIS_EXPR.prop("_expr_" + bindingId);
    }
    function createDiTokenExpression(token) {
      if (isPresent(token.value)) {
        return literal(token.value);
      } else {
        return importExpr(token.identifier);
      }
    }
    function createInlineArray(values) {
      if (values.length === 0) {
        return importExpr(createIdentifier(Identifiers.EMPTY_INLINE_ARRAY));
      }
      var log2 = Math.log(values.length) / Math.log(2);
      var index = Math.ceil(log2);
      var identifierSpec = index < Identifiers.inlineArrays.length ? Identifiers.inlineArrays[index] : Identifiers.InlineArrayDynamic;
      var identifier = createIdentifier(identifierSpec);
      return importExpr(identifier).instantiate([(literal(values.length))].concat(values));
    }
    function createPureProxy(fn, argCount, pureProxyProp, builder) {
      builder.fields.push(new ClassField(pureProxyProp.name, null));
      var pureProxyId = argCount < Identifiers.pureProxies.length ? Identifiers.pureProxies[argCount] : null;
      if (!pureProxyId) {
        throw new Error("Unsupported number of argument for pure functions: " + argCount);
      }
      builder.ctorStmts.push(THIS_EXPR.prop(pureProxyProp.name).set(importExpr(createIdentifier(pureProxyId)).callFn([fn])).toStmt());
    }
    function createEnumExpression(enumType, enumValue) {
      var enumName = Object.keys(enumType.runtime).find(function(propName) {
        return enumType.runtime[propName] === enumValue;
      });
      if (!enumName) {
        throw new Error("Unknown enum value " + enumValue + " in " + enumType.name);
      }
      return importExpr(createEnumIdentifier(enumType, enumName));
    }
    var VAL_UNWRAPPER_VAR = variable("valUnwrapper");
    var EventHandlerVars = (function() {
      function EventHandlerVars() {}
      EventHandlerVars.event = variable('$event');
      return EventHandlerVars;
    }());
    var ConvertPropertyBindingResult = (function() {
      function ConvertPropertyBindingResult(stmts, currValExpr, forceUpdate) {
        this.stmts = stmts;
        this.currValExpr = currValExpr;
        this.forceUpdate = forceUpdate;
      }
      return ConvertPropertyBindingResult;
    }());
    function convertPropertyBinding(builder, nameResolver, implicitReceiver, expression, bindingId) {
      var currValExpr = createCurrValueExpr(bindingId);
      var stmts = [];
      if (!nameResolver) {
        nameResolver = new DefaultNameResolver();
      }
      var visitor = new _AstToIrVisitor(builder, nameResolver, implicitReceiver, VAL_UNWRAPPER_VAR, bindingId, false);
      var outputExpr = expression.visit(visitor, _Mode.Expression);
      if (!outputExpr) {
        return null;
      }
      if (visitor.temporaryCount) {
        for (var i = 0; i < visitor.temporaryCount; i++) {
          stmts.push(temporaryDeclaration(bindingId, i));
        }
      }
      if (visitor.needsValueUnwrapper) {
        var initValueUnwrapperStmt = VAL_UNWRAPPER_VAR.callMethod('reset', []).toStmt();
        stmts.push(initValueUnwrapperStmt);
      }
      stmts.push(currValExpr.set(outputExpr).toDeclStmt(null, [StmtModifier.Final]));
      if (visitor.needsValueUnwrapper) {
        return new ConvertPropertyBindingResult(stmts, currValExpr, VAL_UNWRAPPER_VAR.prop('hasWrappedValue'));
      } else {
        return new ConvertPropertyBindingResult(stmts, currValExpr, null);
      }
    }
    var ConvertActionBindingResult = (function() {
      function ConvertActionBindingResult(stmts, preventDefault) {
        this.stmts = stmts;
        this.preventDefault = preventDefault;
      }
      return ConvertActionBindingResult;
    }());
    function convertActionBinding(builder, nameResolver, implicitReceiver, action, bindingId) {
      if (!nameResolver) {
        nameResolver = new DefaultNameResolver();
      }
      var visitor = new _AstToIrVisitor(builder, nameResolver, implicitReceiver, null, bindingId, true);
      var actionStmts = [];
      flattenStatements(action.visit(visitor, _Mode.Statement), actionStmts);
      prependTemporaryDecls(visitor.temporaryCount, bindingId, actionStmts);
      var lastIndex = actionStmts.length - 1;
      var preventDefaultVar = null;
      if (lastIndex >= 0) {
        var lastStatement = actionStmts[lastIndex];
        var returnExpr = convertStmtIntoExpression(lastStatement);
        if (returnExpr) {
          preventDefaultVar = createPreventDefaultVar(bindingId);
          actionStmts[lastIndex] = preventDefaultVar.set(returnExpr.cast(DYNAMIC_TYPE).notIdentical(literal(false))).toDeclStmt(null, [StmtModifier.Final]);
        }
      }
      return new ConvertActionBindingResult(actionStmts, preventDefaultVar);
    }
    function createSharedBindingVariablesIfNeeded(stmts) {
      var unwrapperStmts = [];
      var readVars = findReadVarNames(stmts);
      if (readVars.has(VAL_UNWRAPPER_VAR.name)) {
        unwrapperStmts.push(VAL_UNWRAPPER_VAR.set(importExpr(createIdentifier(Identifiers.ValueUnwrapper)).instantiate([])).toDeclStmt(null, [StmtModifier.Final]));
      }
      return unwrapperStmts;
    }
    function temporaryName(bindingId, temporaryNumber) {
      return "tmp_" + bindingId + "_" + temporaryNumber;
    }
    function temporaryDeclaration(bindingId, temporaryNumber) {
      return new DeclareVarStmt(temporaryName(bindingId, temporaryNumber), NULL_EXPR);
    }
    function prependTemporaryDecls(temporaryCount, bindingId, statements) {
      for (var i = temporaryCount - 1; i >= 0; i--) {
        statements.unshift(temporaryDeclaration(bindingId, i));
      }
    }
    var _Mode = {};
    _Mode.Statement = 0;
    _Mode.Expression = 1;
    _Mode[_Mode.Statement] = "Statement";
    _Mode[_Mode.Expression] = "Expression";
    function ensureStatementMode(mode, ast) {
      if (mode !== _Mode.Statement) {
        throw new Error("Expected a statement, but saw " + ast);
      }
    }
    function ensureExpressionMode(mode, ast) {
      if (mode !== _Mode.Expression) {
        throw new Error("Expected an expression, but saw " + ast);
      }
    }
    function convertToStatementIfNeeded(mode, expr) {
      if (mode === _Mode.Statement) {
        return expr.toStmt();
      } else {
        return expr;
      }
    }
    var _AstToIrVisitor = (function() {
      function _AstToIrVisitor(_builder, _nameResolver, _implicitReceiver, _valueUnwrapper, bindingId, isAction) {
        this._builder = _builder;
        this._nameResolver = _nameResolver;
        this._implicitReceiver = _implicitReceiver;
        this._valueUnwrapper = _valueUnwrapper;
        this.bindingId = bindingId;
        this.isAction = isAction;
        this._nodeMap = new Map();
        this._resultMap = new Map();
        this._currentTemporary = 0;
        this.needsValueUnwrapper = false;
        this.temporaryCount = 0;
      }
      _AstToIrVisitor.prototype.visitBinary = function(ast, mode) {
        var op;
        switch (ast.operation) {
          case '+':
            op = BinaryOperator.Plus;
            break;
          case '-':
            op = BinaryOperator.Minus;
            break;
          case '*':
            op = BinaryOperator.Multiply;
            break;
          case '/':
            op = BinaryOperator.Divide;
            break;
          case '%':
            op = BinaryOperator.Modulo;
            break;
          case '&&':
            op = BinaryOperator.And;
            break;
          case '||':
            op = BinaryOperator.Or;
            break;
          case '==':
            op = BinaryOperator.Equals;
            break;
          case '!=':
            op = BinaryOperator.NotEquals;
            break;
          case '===':
            op = BinaryOperator.Identical;
            break;
          case '!==':
            op = BinaryOperator.NotIdentical;
            break;
          case '<':
            op = BinaryOperator.Lower;
            break;
          case '>':
            op = BinaryOperator.Bigger;
            break;
          case '<=':
            op = BinaryOperator.LowerEquals;
            break;
          case '>=':
            op = BinaryOperator.BiggerEquals;
            break;
          default:
            throw new Error("Unsupported operation " + ast.operation);
        }
        return convertToStatementIfNeeded(mode, new BinaryOperatorExpr(op, this.visit(ast.left, _Mode.Expression), this.visit(ast.right, _Mode.Expression)));
      };
      _AstToIrVisitor.prototype.visitChain = function(ast, mode) {
        ensureStatementMode(mode, ast);
        return this.visitAll(ast.expressions, mode);
      };
      _AstToIrVisitor.prototype.visitConditional = function(ast, mode) {
        var value = this.visit(ast.condition, _Mode.Expression);
        return convertToStatementIfNeeded(mode, value.conditional(this.visit(ast.trueExp, _Mode.Expression), this.visit(ast.falseExp, _Mode.Expression)));
      };
      _AstToIrVisitor.prototype.visitPipe = function(ast, mode) {
        var input = this.visit(ast.exp, _Mode.Expression);
        var args = this.visitAll(ast.args, _Mode.Expression);
        var value = this._nameResolver.callPipe(ast.name, input, args);
        if (!value) {
          throw new Error("Illegal state: Pipe " + ast.name + " is not allowed here!");
        }
        this.needsValueUnwrapper = true;
        return convertToStatementIfNeeded(mode, this._valueUnwrapper.callMethod('unwrap', [value]));
      };
      _AstToIrVisitor.prototype.visitFunctionCall = function(ast, mode) {
        return convertToStatementIfNeeded(mode, this.visit(ast.target, _Mode.Expression).callFn(this.visitAll(ast.args, _Mode.Expression)));
      };
      _AstToIrVisitor.prototype.visitImplicitReceiver = function(ast, mode) {
        ensureExpressionMode(mode, ast);
        return this._implicitReceiver;
      };
      _AstToIrVisitor.prototype.visitInterpolation = function(ast, mode) {
        ensureExpressionMode(mode, ast);
        var args = [literal(ast.expressions.length)];
        for (var i = 0; i < ast.strings.length - 1; i++) {
          args.push(literal(ast.strings[i]));
          args.push(this.visit(ast.expressions[i], _Mode.Expression));
        }
        args.push(literal(ast.strings[ast.strings.length - 1]));
        return ast.expressions.length <= 9 ? importExpr(createIdentifier(Identifiers.inlineInterpolate)).callFn(args) : importExpr(createIdentifier(Identifiers.interpolate)).callFn([args[0], literalArr(args.slice(1))]);
      };
      _AstToIrVisitor.prototype.visitKeyedRead = function(ast, mode) {
        var leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
          return this.convertSafeAccess(ast, leftMostSafe, mode);
        } else {
          return convertToStatementIfNeeded(mode, this.visit(ast.obj, _Mode.Expression).key(this.visit(ast.key, _Mode.Expression)));
        }
      };
      _AstToIrVisitor.prototype.visitKeyedWrite = function(ast, mode) {
        var obj = this.visit(ast.obj, _Mode.Expression);
        var key = this.visit(ast.key, _Mode.Expression);
        var value = this.visit(ast.value, _Mode.Expression);
        return convertToStatementIfNeeded(mode, obj.key(key).set(value));
      };
      _AstToIrVisitor.prototype.visitLiteralArray = function(ast, mode) {
        var parts = this.visitAll(ast.expressions, mode);
        var literalArr$$ = this.isAction ? literalArr(parts) : createCachedLiteralArray(this._builder, parts);
        return convertToStatementIfNeeded(mode, literalArr$$);
      };
      _AstToIrVisitor.prototype.visitLiteralMap = function(ast, mode) {
        var parts = [];
        for (var i = 0; i < ast.keys.length; i++) {
          parts.push([ast.keys[i], this.visit(ast.values[i], _Mode.Expression)]);
        }
        var literalMap$$ = this.isAction ? literalMap(parts) : createCachedLiteralMap(this._builder, parts);
        return convertToStatementIfNeeded(mode, literalMap$$);
      };
      _AstToIrVisitor.prototype.visitLiteralPrimitive = function(ast, mode) {
        return convertToStatementIfNeeded(mode, literal(ast.value));
      };
      _AstToIrVisitor.prototype._getLocal = function(name) {
        if (this.isAction && name == EventHandlerVars.event.name) {
          return EventHandlerVars.event;
        }
        return this._nameResolver.getLocal(name);
      };
      _AstToIrVisitor.prototype.visitMethodCall = function(ast, mode) {
        var leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
          return this.convertSafeAccess(ast, leftMostSafe, mode);
        } else {
          var args = this.visitAll(ast.args, _Mode.Expression);
          var result = null;
          var receiver = this.visit(ast.receiver, _Mode.Expression);
          if (receiver === this._implicitReceiver) {
            var varExpr = this._getLocal(ast.name);
            if (varExpr) {
              result = varExpr.callFn(args);
            }
          }
          if (isBlank(result)) {
            result = receiver.callMethod(ast.name, args);
          }
          return convertToStatementIfNeeded(mode, result);
        }
      };
      _AstToIrVisitor.prototype.visitPrefixNot = function(ast, mode) {
        return convertToStatementIfNeeded(mode, not(this.visit(ast.expression, _Mode.Expression)));
      };
      _AstToIrVisitor.prototype.visitPropertyRead = function(ast, mode) {
        var leftMostSafe = this.leftMostSafeNode(ast);
        if (leftMostSafe) {
          return this.convertSafeAccess(ast, leftMostSafe, mode);
        } else {
          var result = null;
          var receiver = this.visit(ast.receiver, _Mode.Expression);
          if (receiver === this._implicitReceiver) {
            result = this._getLocal(ast.name);
          }
          if (isBlank(result)) {
            result = receiver.prop(ast.name);
          }
          return convertToStatementIfNeeded(mode, result);
        }
      };
      _AstToIrVisitor.prototype.visitPropertyWrite = function(ast, mode) {
        var receiver = this.visit(ast.receiver, _Mode.Expression);
        if (receiver === this._implicitReceiver) {
          var varExpr = this._getLocal(ast.name);
          if (varExpr) {
            throw new Error('Cannot assign to a reference or variable!');
          }
        }
        return convertToStatementIfNeeded(mode, receiver.prop(ast.name).set(this.visit(ast.value, _Mode.Expression)));
      };
      _AstToIrVisitor.prototype.visitSafePropertyRead = function(ast, mode) {
        return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
      };
      _AstToIrVisitor.prototype.visitSafeMethodCall = function(ast, mode) {
        return this.convertSafeAccess(ast, this.leftMostSafeNode(ast), mode);
      };
      _AstToIrVisitor.prototype.visitAll = function(asts, mode) {
        var _this = this;
        return asts.map(function(ast) {
          return _this.visit(ast, mode);
        });
      };
      _AstToIrVisitor.prototype.visitQuote = function(ast, mode) {
        throw new Error('Quotes are not supported for evaluation!');
      };
      _AstToIrVisitor.prototype.visit = function(ast, mode) {
        var result = this._resultMap.get(ast);
        if (result)
          return result;
        return (this._nodeMap.get(ast) || ast).visit(this, mode);
      };
      _AstToIrVisitor.prototype.convertSafeAccess = function(ast, leftMostSafe, mode) {
        var guardedExpression = this.visit(leftMostSafe.receiver, _Mode.Expression);
        var temporary;
        if (this.needsTemporary(leftMostSafe.receiver)) {
          temporary = this.allocateTemporary();
          guardedExpression = temporary.set(guardedExpression);
          this._resultMap.set(leftMostSafe.receiver, temporary);
        }
        var condition = guardedExpression.isBlank();
        if (leftMostSafe instanceof SafeMethodCall) {
          this._nodeMap.set(leftMostSafe, new MethodCall(leftMostSafe.span, leftMostSafe.receiver, leftMostSafe.name, leftMostSafe.args));
        } else {
          this._nodeMap.set(leftMostSafe, new PropertyRead(leftMostSafe.span, leftMostSafe.receiver, leftMostSafe.name));
        }
        var access = this.visit(ast, _Mode.Expression);
        this._nodeMap.delete(leftMostSafe);
        if (temporary) {
          this.releaseTemporary(temporary);
        }
        return convertToStatementIfNeeded(mode, condition.conditional(literal(null), access));
      };
      _AstToIrVisitor.prototype.leftMostSafeNode = function(ast) {
        var _this = this;
        var visit = function(visitor, ast) {
          return (_this._nodeMap.get(ast) || ast).visit(visitor);
        };
        return ast.visit({
          visitBinary: function(ast) {
            return null;
          },
          visitChain: function(ast) {
            return null;
          },
          visitConditional: function(ast) {
            return null;
          },
          visitFunctionCall: function(ast) {
            return null;
          },
          visitImplicitReceiver: function(ast) {
            return null;
          },
          visitInterpolation: function(ast) {
            return null;
          },
          visitKeyedRead: function(ast) {
            return visit(this, ast.obj);
          },
          visitKeyedWrite: function(ast) {
            return null;
          },
          visitLiteralArray: function(ast) {
            return null;
          },
          visitLiteralMap: function(ast) {
            return null;
          },
          visitLiteralPrimitive: function(ast) {
            return null;
          },
          visitMethodCall: function(ast) {
            return visit(this, ast.receiver);
          },
          visitPipe: function(ast) {
            return null;
          },
          visitPrefixNot: function(ast) {
            return null;
          },
          visitPropertyRead: function(ast) {
            return visit(this, ast.receiver);
          },
          visitPropertyWrite: function(ast) {
            return null;
          },
          visitQuote: function(ast) {
            return null;
          },
          visitSafeMethodCall: function(ast) {
            return visit(this, ast.receiver) || ast;
          },
          visitSafePropertyRead: function(ast) {
            return visit(this, ast.receiver) || ast;
          }
        });
      };
      _AstToIrVisitor.prototype.needsTemporary = function(ast) {
        var _this = this;
        var visit = function(visitor, ast) {
          return ast && (_this._nodeMap.get(ast) || ast).visit(visitor);
        };
        var visitSome = function(visitor, ast) {
          return ast.some(function(ast) {
            return visit(visitor, ast);
          });
        };
        return ast.visit({
          visitBinary: function(ast) {
            return visit(this, ast.left) || visit(this, ast.right);
          },
          visitChain: function(ast) {
            return false;
          },
          visitConditional: function(ast) {
            return visit(this, ast.condition) || visit(this, ast.trueExp) || visit(this, ast.falseExp);
          },
          visitFunctionCall: function(ast) {
            return true;
          },
          visitImplicitReceiver: function(ast) {
            return false;
          },
          visitInterpolation: function(ast) {
            return visitSome(this, ast.expressions);
          },
          visitKeyedRead: function(ast) {
            return false;
          },
          visitKeyedWrite: function(ast) {
            return false;
          },
          visitLiteralArray: function(ast) {
            return true;
          },
          visitLiteralMap: function(ast) {
            return true;
          },
          visitLiteralPrimitive: function(ast) {
            return false;
          },
          visitMethodCall: function(ast) {
            return true;
          },
          visitPipe: function(ast) {
            return true;
          },
          visitPrefixNot: function(ast) {
            return visit(this, ast.expression);
          },
          visitPropertyRead: function(ast) {
            return false;
          },
          visitPropertyWrite: function(ast) {
            return false;
          },
          visitQuote: function(ast) {
            return false;
          },
          visitSafeMethodCall: function(ast) {
            return true;
          },
          visitSafePropertyRead: function(ast) {
            return false;
          }
        });
      };
      _AstToIrVisitor.prototype.allocateTemporary = function() {
        var tempNumber = this._currentTemporary++;
        this.temporaryCount = Math.max(this._currentTemporary, this.temporaryCount);
        return new ReadVarExpr(temporaryName(this.bindingId, tempNumber));
      };
      _AstToIrVisitor.prototype.releaseTemporary = function(temporary) {
        this._currentTemporary--;
        if (temporary.name != temporaryName(this.bindingId, this._currentTemporary)) {
          throw new Error("Temporary " + temporary.name + " released out of order");
        }
      };
      return _AstToIrVisitor;
    }());
    function flattenStatements(arg, output) {
      if (Array.isArray(arg)) {
        ((arg)).forEach(function(entry) {
          return flattenStatements(entry, output);
        });
      } else {
        output.push(arg);
      }
    }
    function createCachedLiteralArray(builder, values) {
      if (values.length === 0) {
        return importExpr(createIdentifier(Identifiers.EMPTY_ARRAY));
      }
      var proxyExpr = THIS_EXPR.prop("_arr_" + builder.fields.length);
      var proxyParams = [];
      var proxyReturnEntries = [];
      for (var i = 0; i < values.length; i++) {
        var paramName = "p" + i;
        proxyParams.push(new FnParam(paramName));
        proxyReturnEntries.push(variable(paramName));
      }
      createPureProxy(fn(proxyParams, [new ReturnStatement(literalArr(proxyReturnEntries))], new ArrayType(DYNAMIC_TYPE)), values.length, proxyExpr, builder);
      return proxyExpr.callFn(values);
    }
    function createCachedLiteralMap(builder, entries) {
      if (entries.length === 0) {
        return importExpr(createIdentifier(Identifiers.EMPTY_MAP));
      }
      var proxyExpr = THIS_EXPR.prop("_map_" + builder.fields.length);
      var proxyParams = [];
      var proxyReturnEntries = [];
      var values = [];
      for (var i = 0; i < entries.length; i++) {
        var paramName = "p" + i;
        proxyParams.push(new FnParam(paramName));
        proxyReturnEntries.push([entries[i][0], variable(paramName)]);
        values.push((entries[i][1]));
      }
      createPureProxy(fn(proxyParams, [new ReturnStatement(literalMap(proxyReturnEntries))], new MapType(DYNAMIC_TYPE)), entries.length, proxyExpr, builder);
      return proxyExpr.callFn(values);
    }
    var DefaultNameResolver = (function() {
      function DefaultNameResolver() {}
      DefaultNameResolver.prototype.callPipe = function(name, input, args) {
        return null;
      };
      DefaultNameResolver.prototype.getLocal = function(name) {
        return null;
      };
      return DefaultNameResolver;
    }());
    function createCurrValueExpr(bindingId) {
      return variable("currVal_" + bindingId);
    }
    function createPreventDefaultVar(bindingId) {
      return variable("pd_" + bindingId);
    }
    function convertStmtIntoExpression(stmt) {
      if (stmt instanceof ExpressionStatement) {
        return stmt.expr;
      } else if (stmt instanceof ReturnStatement) {
        return stmt.value;
      }
      return null;
    }
    function writeToRenderer(view, boundProp, renderElement, renderValue, logBindingUpdate, securityContextExpression) {
      var updateStmts = [];
      var renderer = view.prop('renderer');
      renderValue = sanitizedValue(view, boundProp, renderValue, securityContextExpression);
      switch (boundProp.type) {
        case PropertyBindingType.Property:
          if (logBindingUpdate) {
            updateStmts.push(importExpr(createIdentifier(Identifiers.setBindingDebugInfo)).callFn([renderer, renderElement, literal(boundProp.name), renderValue]).toStmt());
          }
          updateStmts.push(renderer.callMethod('setElementProperty', [renderElement, literal(boundProp.name), renderValue]).toStmt());
          break;
        case PropertyBindingType.Attribute:
          renderValue = renderValue.isBlank().conditional(NULL_EXPR, renderValue.callMethod('toString', []));
          updateStmts.push(renderer.callMethod('setElementAttribute', [renderElement, literal(boundProp.name), renderValue]).toStmt());
          break;
        case PropertyBindingType.Class:
          updateStmts.push(renderer.callMethod('setElementClass', [renderElement, literal(boundProp.name), renderValue]).toStmt());
          break;
        case PropertyBindingType.Style:
          var strValue = renderValue.callMethod('toString', []);
          if (isPresent(boundProp.unit)) {
            strValue = strValue.plus(literal(boundProp.unit));
          }
          renderValue = renderValue.isBlank().conditional(NULL_EXPR, strValue);
          updateStmts.push(renderer.callMethod('setElementStyle', [renderElement, literal(boundProp.name), renderValue]).toStmt());
          break;
        case PropertyBindingType.Animation:
          throw new Error('Illegal state: Should not come here!');
      }
      return updateStmts;
    }
    function sanitizedValue(view, boundProp, renderValue, securityContextExpression) {
      if (boundProp.securityContext === _angular_core.SecurityContext.NONE) {
        return renderValue;
      }
      if (!boundProp.needsRuntimeSecurityContext) {
        securityContextExpression = createEnumExpression(Identifiers.SecurityContext, boundProp.securityContext);
      }
      if (!securityContextExpression) {
        throw new Error("internal error, no SecurityContext given " + boundProp.name);
      }
      var ctx = view.prop('viewUtils').prop('sanitizer');
      var args = [securityContextExpression, renderValue];
      return ctx.callMethod('sanitize', args);
    }
    function triggerAnimation(view, componentView, boundProp, boundOutputs, eventListener, renderElement, renderValue, lastRenderValue) {
      var detachStmts = [];
      var updateStmts = [];
      var animationName = boundProp.name;
      var animationFnExpr = componentView.prop('componentType').prop('animations').key(literal(animationName));
      var emptyStateValue = literal(EMPTY_STATE);
      var unitializedValue = importExpr(createIdentifier(Identifiers.UNINITIALIZED));
      var animationTransitionVar = variable('animationTransition_' + animationName);
      updateStmts.push(animationTransitionVar.set(animationFnExpr.callFn([view, renderElement, lastRenderValue.equals(unitializedValue).conditional(emptyStateValue, lastRenderValue), renderValue.equals(unitializedValue).conditional(emptyStateValue, renderValue)])).toDeclStmt());
      detachStmts.push(animationTransitionVar.set(animationFnExpr.callFn([view, renderElement, lastRenderValue, emptyStateValue])).toDeclStmt());
      var registerStmts = [];
      var animationStartMethodExists = boundOutputs.find(function(event) {
        return event.isAnimation && event.name == animationName && event.phase == 'start';
      });
      if (animationStartMethodExists) {
        registerStmts.push(animationTransitionVar.callMethod('onStart', [eventListener.callMethod(BuiltinMethod.Bind, [view, literal(BoundEventAst.calcFullName(animationName, null, 'start'))])]).toStmt());
      }
      var animationDoneMethodExists = boundOutputs.find(function(event) {
        return event.isAnimation && event.name == animationName && event.phase == 'done';
      });
      if (animationDoneMethodExists) {
        registerStmts.push(animationTransitionVar.callMethod('onDone', [eventListener.callMethod(BuiltinMethod.Bind, [view, literal(BoundEventAst.calcFullName(animationName, null, 'done'))])]).toStmt());
      }
      updateStmts.push.apply(updateStmts, registerStmts);
      detachStmts.push.apply(detachStmts, registerStmts);
      return {
        updateStmts: updateStmts,
        detachStmts: detachStmts
      };
    }
    function createClassStmt(config) {
      var parentArgs = config.parentArgs || [];
      var superCtorStmts = config.parent ? [SUPER_EXPR.callFn(parentArgs).toStmt()] : [];
      var builder = concatClassBuilderParts(Array.isArray(config.builders) ? config.builders : [config.builders]);
      var ctor = new ClassMethod(null, config.ctorParams || [], superCtorStmts.concat(builder.ctorStmts));
      return new ClassStmt(config.name, config.parent, builder.fields, builder.getters, ctor, builder.methods, config.modifiers || []);
    }
    function concatClassBuilderParts(builders) {
      return {
        fields: (_a = []).concat.apply(_a, builders.map(function(builder) {
          return builder.fields || [];
        })),
        methods: (_b = []).concat.apply(_b, builders.map(function(builder) {
          return builder.methods || [];
        })),
        getters: (_c = []).concat.apply(_c, builders.map(function(builder) {
          return builder.getters || [];
        })),
        ctorStmts: (_d = []).concat.apply(_d, builders.map(function(builder) {
          return builder.ctorStmts || [];
        }))
      };
      var _a,
          _b,
          _c,
          _d;
    }
    var __decorate$8 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$8 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var DirectiveWrapperCompileResult = (function() {
      function DirectiveWrapperCompileResult(statements, dirWrapperClassVar) {
        this.statements = statements;
        this.dirWrapperClassVar = dirWrapperClassVar;
      }
      return DirectiveWrapperCompileResult;
    }());
    var CONTEXT_FIELD_NAME = 'context';
    var CHANGES_FIELD_NAME = '_changes';
    var CHANGED_FIELD_NAME = '_changed';
    var EVENT_HANDLER_FIELD_NAME = '_eventHandler';
    var CURR_VALUE_VAR = variable('currValue');
    var THROW_ON_CHANGE_VAR = variable('throwOnChange');
    var FORCE_UPDATE_VAR = variable('forceUpdate');
    var VIEW_VAR = variable('view');
    var COMPONENT_VIEW_VAR = variable('componentView');
    var RENDER_EL_VAR = variable('el');
    var EVENT_NAME_VAR = variable('eventName');
    var RESET_CHANGES_STMT = THIS_EXPR.prop(CHANGES_FIELD_NAME).set(literalMap([])).toStmt();
    var DirectiveWrapperCompiler = (function() {
      function DirectiveWrapperCompiler(compilerConfig, _exprParser, _schemaRegistry, _console) {
        this.compilerConfig = compilerConfig;
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
        this._console = _console;
      }
      DirectiveWrapperCompiler.dirWrapperClassName = function(id) {
        return "Wrapper_" + identifierName(id);
      };
      DirectiveWrapperCompiler.prototype.compile = function(dirMeta) {
        var hostParseResult = parseHostBindings(dirMeta, this._exprParser, this._schemaRegistry);
        reportParseErrors(hostParseResult.errors, this._console);
        var builder = new DirectiveWrapperBuilder(this.compilerConfig, dirMeta);
        Object.keys(dirMeta.inputs).forEach(function(inputFieldName) {
          addCheckInputMethod(inputFieldName, builder);
        });
        addNgDoCheckMethod(builder);
        addCheckHostMethod(hostParseResult.hostProps, hostParseResult.hostListeners, builder);
        addHandleEventMethod(hostParseResult.hostListeners, builder);
        addSubscribeMethod(dirMeta, builder);
        var classStmt = builder.build();
        return new DirectiveWrapperCompileResult([classStmt], classStmt.name);
      };
      DirectiveWrapperCompiler = __decorate$8([CompilerInjectable(), __metadata$8('design:paramtypes', [CompilerConfig, Parser, ElementSchemaRegistry, Console])], DirectiveWrapperCompiler);
      return DirectiveWrapperCompiler;
    }());
    var DirectiveWrapperBuilder = (function() {
      function DirectiveWrapperBuilder(compilerConfig, dirMeta) {
        this.compilerConfig = compilerConfig;
        this.dirMeta = dirMeta;
        this.fields = [];
        this.getters = [];
        this.methods = [];
        this.ctorStmts = [];
        this.detachStmts = [];
        this.destroyStmts = [];
        var dirLifecycleHooks = dirMeta.type.lifecycleHooks;
        this.genChanges = dirLifecycleHooks.indexOf(LifecycleHooks.OnChanges) !== -1 || this.compilerConfig.logBindingUpdate;
        this.ngOnChanges = dirLifecycleHooks.indexOf(LifecycleHooks.OnChanges) !== -1;
        this.ngOnInit = dirLifecycleHooks.indexOf(LifecycleHooks.OnInit) !== -1;
        this.ngDoCheck = dirLifecycleHooks.indexOf(LifecycleHooks.DoCheck) !== -1;
        this.ngOnDestroy = dirLifecycleHooks.indexOf(LifecycleHooks.OnDestroy) !== -1;
        if (this.ngOnDestroy) {
          this.destroyStmts.push(THIS_EXPR.prop(CONTEXT_FIELD_NAME).callMethod('ngOnDestroy', []).toStmt());
        }
      }
      DirectiveWrapperBuilder.prototype.build = function() {
        var dirDepParamNames = [];
        for (var i = 0; i < this.dirMeta.type.diDeps.length; i++) {
          dirDepParamNames.push("p" + i);
        }
        var methods = [new ClassMethod('ngOnDetach', [new FnParam(VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(COMPONENT_VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(RENDER_EL_VAR.name, DYNAMIC_TYPE)], this.detachStmts), new ClassMethod('ngOnDestroy', [], this.destroyStmts)];
        var fields = [new ClassField(EVENT_HANDLER_FIELD_NAME, FUNCTION_TYPE, [StmtModifier.Private]), new ClassField(CONTEXT_FIELD_NAME, importType(this.dirMeta.type)), new ClassField(CHANGED_FIELD_NAME, BOOL_TYPE, [StmtModifier.Private])];
        var ctorStmts = [THIS_EXPR.prop(CHANGED_FIELD_NAME).set(literal(false)).toStmt()];
        if (this.genChanges) {
          fields.push(new ClassField(CHANGES_FIELD_NAME, new MapType(DYNAMIC_TYPE), [StmtModifier.Private]));
          ctorStmts.push(RESET_CHANGES_STMT);
        }
        ctorStmts.push(THIS_EXPR.prop(CONTEXT_FIELD_NAME).set(importExpr(this.dirMeta.type).instantiate(dirDepParamNames.map(function(paramName) {
          return variable(paramName);
        }))).toStmt());
        return createClassStmt({
          name: DirectiveWrapperCompiler.dirWrapperClassName(this.dirMeta.type),
          ctorParams: dirDepParamNames.map(function(paramName) {
            return new FnParam(paramName, DYNAMIC_TYPE);
          }),
          builders: [{
            fields: fields,
            ctorStmts: ctorStmts,
            methods: methods
          }, this]
        });
      };
      return DirectiveWrapperBuilder;
    }());
    function addNgDoCheckMethod(builder) {
      var changedVar = variable('changed');
      var stmts = [changedVar.set(THIS_EXPR.prop(CHANGED_FIELD_NAME)).toDeclStmt(), THIS_EXPR.prop(CHANGED_FIELD_NAME).set(literal(false)).toStmt()];
      var lifecycleStmts = [];
      if (builder.genChanges) {
        var onChangesStmts = [];
        if (builder.ngOnChanges) {
          onChangesStmts.push(THIS_EXPR.prop(CONTEXT_FIELD_NAME).callMethod('ngOnChanges', [THIS_EXPR.prop(CHANGES_FIELD_NAME)]).toStmt());
        }
        if (builder.compilerConfig.logBindingUpdate) {
          onChangesStmts.push(importExpr(createIdentifier(Identifiers.setBindingDebugInfoForChanges)).callFn([VIEW_VAR.prop('renderer'), RENDER_EL_VAR, THIS_EXPR.prop(CHANGES_FIELD_NAME)]).toStmt());
        }
        onChangesStmts.push(RESET_CHANGES_STMT);
        lifecycleStmts.push(new IfStmt(changedVar, onChangesStmts));
      }
      if (builder.ngOnInit) {
        lifecycleStmts.push(new IfStmt(VIEW_VAR.prop('numberOfChecks').identical(new LiteralExpr(0)), [THIS_EXPR.prop(CONTEXT_FIELD_NAME).callMethod('ngOnInit', []).toStmt()]));
      }
      if (builder.ngDoCheck) {
        lifecycleStmts.push(THIS_EXPR.prop(CONTEXT_FIELD_NAME).callMethod('ngDoCheck', []).toStmt());
      }
      if (lifecycleStmts.length > 0) {
        stmts.push(new IfStmt(not(THROW_ON_CHANGE_VAR), lifecycleStmts));
      }
      stmts.push(new ReturnStatement(changedVar));
      builder.methods.push(new ClassMethod('ngDoCheck', [new FnParam(VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(RENDER_EL_VAR.name, DYNAMIC_TYPE), new FnParam(THROW_ON_CHANGE_VAR.name, BOOL_TYPE)], stmts, BOOL_TYPE));
    }
    function addCheckInputMethod(input, builder) {
      var field = createCheckBindingField(builder);
      var onChangeStatements = [THIS_EXPR.prop(CHANGED_FIELD_NAME).set(literal(true)).toStmt(), THIS_EXPR.prop(CONTEXT_FIELD_NAME).prop(input).set(CURR_VALUE_VAR).toStmt()];
      if (builder.genChanges) {
        onChangeStatements.push(THIS_EXPR.prop(CHANGES_FIELD_NAME).key(literal(input)).set(importExpr(createIdentifier(Identifiers.SimpleChange)).instantiate([field.expression, CURR_VALUE_VAR])).toStmt());
      }
      var methodBody = createCheckBindingStmt({
        currValExpr: CURR_VALUE_VAR,
        forceUpdate: FORCE_UPDATE_VAR,
        stmts: []
      }, field.expression, THROW_ON_CHANGE_VAR, onChangeStatements);
      builder.methods.push(new ClassMethod("check_" + input, [new FnParam(CURR_VALUE_VAR.name, DYNAMIC_TYPE), new FnParam(THROW_ON_CHANGE_VAR.name, BOOL_TYPE), new FnParam(FORCE_UPDATE_VAR.name, BOOL_TYPE)], methodBody));
    }
    function addCheckHostMethod(hostProps, hostEvents, builder) {
      var stmts = [];
      var methodParams = [new FnParam(VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(COMPONENT_VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(RENDER_EL_VAR.name, DYNAMIC_TYPE), new FnParam(THROW_ON_CHANGE_VAR.name, BOOL_TYPE)];
      hostProps.forEach(function(hostProp, hostPropIdx) {
        var field = createCheckBindingField(builder);
        var evalResult = convertPropertyBinding(builder, null, THIS_EXPR.prop(CONTEXT_FIELD_NAME), hostProp.value, field.bindingId);
        if (!evalResult) {
          return;
        }
        var securityContextExpr;
        if (hostProp.needsRuntimeSecurityContext) {
          securityContextExpr = variable("secCtx_" + methodParams.length);
          methodParams.push(new FnParam(securityContextExpr.name, importType(createIdentifier(Identifiers.SecurityContext))));
        }
        var checkBindingStmts;
        if (hostProp.isAnimation) {
          var _a = triggerAnimation(VIEW_VAR, COMPONENT_VIEW_VAR, hostProp, hostEvents, THIS_EXPR.prop(EVENT_HANDLER_FIELD_NAME).or(importExpr(createIdentifier(Identifiers.noop))), RENDER_EL_VAR, evalResult.currValExpr, field.expression),
              updateStmts = _a.updateStmts,
              detachStmts = _a.detachStmts;
          checkBindingStmts = updateStmts;
          (_b = builder.detachStmts).push.apply(_b, detachStmts);
        } else {
          checkBindingStmts = writeToRenderer(VIEW_VAR, hostProp, RENDER_EL_VAR, evalResult.currValExpr, builder.compilerConfig.logBindingUpdate, securityContextExpr);
        }
        stmts.push.apply(stmts, createCheckBindingStmt(evalResult, field.expression, THROW_ON_CHANGE_VAR, checkBindingStmts));
        var _b;
      });
      builder.methods.push(new ClassMethod('checkHost', methodParams, stmts));
    }
    function addHandleEventMethod(hostListeners, builder) {
      var resultVar = variable("result");
      var actionStmts = [resultVar.set(literal(true)).toDeclStmt(BOOL_TYPE)];
      hostListeners.forEach(function(hostListener, eventIdx) {
        var evalResult = convertActionBinding(builder, null, THIS_EXPR.prop(CONTEXT_FIELD_NAME), hostListener.handler, "sub_" + eventIdx);
        var trueStmts = evalResult.stmts;
        if (evalResult.preventDefault) {
          trueStmts.push(resultVar.set(evalResult.preventDefault.and(resultVar)).toStmt());
        }
        actionStmts.push(new IfStmt(EVENT_NAME_VAR.equals(literal(hostListener.fullName)), trueStmts));
      });
      actionStmts.push(new ReturnStatement(resultVar));
      builder.methods.push(new ClassMethod('handleEvent', [new FnParam(EVENT_NAME_VAR.name, STRING_TYPE), new FnParam(EventHandlerVars.event.name, DYNAMIC_TYPE)], actionStmts, BOOL_TYPE));
    }
    function addSubscribeMethod(dirMeta, builder) {
      var methodParams = [new FnParam(VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(EVENT_HANDLER_FIELD_NAME, DYNAMIC_TYPE)];
      var stmts = [THIS_EXPR.prop(EVENT_HANDLER_FIELD_NAME).set(variable(EVENT_HANDLER_FIELD_NAME)).toStmt()];
      Object.keys(dirMeta.outputs).forEach(function(emitterPropName, emitterIdx) {
        var eventName = dirMeta.outputs[emitterPropName];
        var paramName = "emit" + emitterIdx;
        methodParams.push(new FnParam(paramName, BOOL_TYPE));
        var subscriptionFieldName = "subscription" + emitterIdx;
        builder.fields.push(new ClassField(subscriptionFieldName, DYNAMIC_TYPE));
        stmts.push(new IfStmt(variable(paramName), [THIS_EXPR.prop(subscriptionFieldName).set(THIS_EXPR.prop(CONTEXT_FIELD_NAME).prop(emitterPropName).callMethod(BuiltinMethod.SubscribeObservable, [variable(EVENT_HANDLER_FIELD_NAME).callMethod(BuiltinMethod.Bind, [VIEW_VAR, literal(eventName)])])).toStmt()]));
        builder.destroyStmts.push(THIS_EXPR.prop(subscriptionFieldName).and(THIS_EXPR.prop(subscriptionFieldName).callMethod('unsubscribe', [])).toStmt());
      });
      builder.methods.push(new ClassMethod('subscribe', methodParams, stmts));
    }
    var ParseResult = (function() {
      function ParseResult(hostProps, hostListeners, errors) {
        this.hostProps = hostProps;
        this.hostListeners = hostListeners;
        this.errors = errors;
      }
      return ParseResult;
    }());
    function parseHostBindings(dirMeta, exprParser, schemaRegistry) {
      var errors = [];
      var parser = new BindingParser(exprParser, DEFAULT_INTERPOLATION_CONFIG, schemaRegistry, [], errors);
      var moduleUrl = identifierModuleUrl(dirMeta.type);
      var sourceFileName = moduleUrl ? "in Directive " + identifierName(dirMeta.type) + " in " + moduleUrl : "in Directive " + identifierName(dirMeta.type);
      var sourceFile = new ParseSourceFile('', sourceFileName);
      var sourceSpan = new ParseSourceSpan(new ParseLocation(sourceFile, null, null, null), new ParseLocation(sourceFile, null, null, null));
      var parsedHostProps = parser.createDirectiveHostPropertyAsts(dirMeta.toSummary(), sourceSpan);
      var parsedHostListeners = parser.createDirectiveHostEventAsts(dirMeta.toSummary(), sourceSpan);
      return new ParseResult(parsedHostProps, parsedHostListeners, errors);
    }
    function reportParseErrors(parseErrors, console) {
      var warnings = parseErrors.filter(function(error) {
        return error.level === ParseErrorLevel.WARNING;
      });
      var errors = parseErrors.filter(function(error) {
        return error.level === ParseErrorLevel.FATAL;
      });
      if (warnings.length > 0) {
        this._console.warn("Directive parse warnings:\n" + warnings.join('\n'));
      }
      if (errors.length > 0) {
        throw new Error("Directive parse errors:\n" + errors.join('\n'));
      }
    }
    var DirectiveWrapperExpressions = (function() {
      function DirectiveWrapperExpressions() {}
      DirectiveWrapperExpressions.create = function(dir, depsExpr) {
        return importExpr(dir).instantiate(depsExpr, importType(dir));
      };
      DirectiveWrapperExpressions.context = function(dirWrapper) {
        return dirWrapper.prop(CONTEXT_FIELD_NAME);
      };
      DirectiveWrapperExpressions.ngDoCheck = function(dirWrapper, view, renderElement, throwOnChange) {
        return dirWrapper.callMethod('ngDoCheck', [view, renderElement, throwOnChange]);
      };
      DirectiveWrapperExpressions.checkHost = function(hostProps, dirWrapper, view, componentView, renderElement, throwOnChange, runtimeSecurityContexts) {
        if (hostProps.length) {
          return [dirWrapper.callMethod('checkHost', [view, componentView, renderElement, throwOnChange].concat(runtimeSecurityContexts)).toStmt()];
        } else {
          return [];
        }
      };
      DirectiveWrapperExpressions.ngOnDetach = function(hostProps, dirWrapper, view, componentView, renderEl) {
        if (hostProps.some(function(prop) {
          return prop.isAnimation;
        })) {
          return [dirWrapper.callMethod('ngOnDetach', [view, componentView, renderEl]).toStmt()];
        } else {
          return [];
        }
      };
      DirectiveWrapperExpressions.ngOnDestroy = function(dir, dirWrapper) {
        if (dir.type.lifecycleHooks.indexOf(LifecycleHooks.OnDestroy) !== -1 || Object.keys(dir.outputs).length > 0) {
          return [dirWrapper.callMethod('ngOnDestroy', []).toStmt()];
        } else {
          return [];
        }
      };
      DirectiveWrapperExpressions.subscribe = function(dirMeta, hostProps, usedEvents, dirWrapper, view, eventListener) {
        var needsSubscribe = false;
        var eventFlags = [];
        Object.keys(dirMeta.outputs).forEach(function(propName) {
          var eventName = dirMeta.outputs[propName];
          var eventUsed = usedEvents.indexOf(eventName) > -1;
          needsSubscribe = needsSubscribe || eventUsed;
          eventFlags.push(literal(eventUsed));
        });
        hostProps.forEach(function(hostProp) {
          if (hostProp.isAnimation && usedEvents.length > 0) {
            needsSubscribe = true;
          }
        });
        if (needsSubscribe) {
          return [dirWrapper.callMethod('subscribe', [view, eventListener].concat(eventFlags)).toStmt()];
        } else {
          return [];
        }
      };
      DirectiveWrapperExpressions.handleEvent = function(hostEvents, dirWrapper, eventName, event) {
        return dirWrapper.callMethod('handleEvent', [eventName, event]);
      };
      return DirectiveWrapperExpressions;
    }());
    function hasLifecycleHook(hook, token) {
      return reflector.hasLifecycleHook(token, getHookName(hook));
    }
    function getHookName(hook) {
      switch (hook) {
        case LifecycleHooks.OnInit:
          return 'ngOnInit';
        case LifecycleHooks.OnDestroy:
          return 'ngOnDestroy';
        case LifecycleHooks.DoCheck:
          return 'ngDoCheck';
        case LifecycleHooks.OnChanges:
          return 'ngOnChanges';
        case LifecycleHooks.AfterContentInit:
          return 'ngAfterContentInit';
        case LifecycleHooks.AfterContentChecked:
          return 'ngAfterContentChecked';
        case LifecycleHooks.AfterViewInit:
          return 'ngAfterViewInit';
        case LifecycleHooks.AfterViewChecked:
          return 'ngAfterViewChecked';
      }
    }
    var __decorate$10 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$10 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    function _isNgModuleMetadata(obj) {
      return obj instanceof _angular_core.NgModule;
    }
    var NgModuleResolver = (function() {
      function NgModuleResolver(_reflector) {
        if (_reflector === void 0) {
          _reflector = reflector;
        }
        this._reflector = _reflector;
      }
      NgModuleResolver.prototype.isNgModule = function(type) {
        return this._reflector.annotations(type).some(_isNgModuleMetadata);
      };
      NgModuleResolver.prototype.resolve = function(type, throwIfNotFound) {
        if (throwIfNotFound === void 0) {
          throwIfNotFound = true;
        }
        var ngModuleMeta = ListWrapper.findLast(this._reflector.annotations(type), _isNgModuleMetadata);
        if (ngModuleMeta) {
          return ngModuleMeta;
        } else {
          if (throwIfNotFound) {
            throw new Error("No NgModule metadata found for '" + stringify(type) + "'.");
          }
          return null;
        }
      };
      NgModuleResolver = __decorate$10([CompilerInjectable(), __metadata$10('design:paramtypes', [ReflectorReader])], NgModuleResolver);
      return NgModuleResolver;
    }());
    var __decorate$11 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$11 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    function _isPipeMetadata(type) {
      return type instanceof _angular_core.Pipe;
    }
    var PipeResolver = (function() {
      function PipeResolver(_reflector) {
        if (_reflector === void 0) {
          _reflector = reflector;
        }
        this._reflector = _reflector;
      }
      PipeResolver.prototype.isPipe = function(type) {
        var typeMetadata = this._reflector.annotations(_angular_core.resolveForwardRef(type));
        return typeMetadata && typeMetadata.some(_isPipeMetadata);
      };
      PipeResolver.prototype.resolve = function(type, throwIfNotFound) {
        if (throwIfNotFound === void 0) {
          throwIfNotFound = true;
        }
        var metas = this._reflector.annotations(_angular_core.resolveForwardRef(type));
        if (metas) {
          var annotation = ListWrapper.findLast(metas, _isPipeMetadata);
          if (annotation) {
            return annotation;
          }
        }
        if (throwIfNotFound) {
          throw new Error("No Pipe decorator found on " + stringify(type));
        }
        return null;
      };
      PipeResolver = __decorate$11([CompilerInjectable(), __metadata$11('design:paramtypes', [ReflectorReader])], PipeResolver);
      return PipeResolver;
    }());
    var __decorate$12 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$12 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var SummaryResolver = (function() {
      function SummaryResolver() {}
      SummaryResolver.prototype.resolveSummary = function(reference) {
        return null;
      };
      ;
      SummaryResolver.prototype.getSymbolsOf = function(filePath) {
        return [];
      };
      SummaryResolver = __decorate$12([CompilerInjectable(), __metadata$12('design:paramtypes', [])], SummaryResolver);
      return SummaryResolver;
    }());
    var __extends$21 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate$9 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$9 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var ERROR_COLLECTOR_TOKEN = new _angular_core.OpaqueToken('ErrorCollector');
    var CompileMetadataResolver = (function() {
      function CompileMetadataResolver(_ngModuleResolver, _directiveResolver, _pipeResolver, _summaryResolver, _schemaRegistry, _directiveNormalizer, _reflector, _errorCollector) {
        if (_reflector === void 0) {
          _reflector = reflector;
        }
        this._ngModuleResolver = _ngModuleResolver;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._summaryResolver = _summaryResolver;
        this._schemaRegistry = _schemaRegistry;
        this._directiveNormalizer = _directiveNormalizer;
        this._reflector = _reflector;
        this._errorCollector = _errorCollector;
        this._directiveCache = new Map();
        this._summaryCache = new Map();
        this._pipeCache = new Map();
        this._ngModuleCache = new Map();
        this._ngModuleOfTypes = new Map();
      }
      CompileMetadataResolver.prototype.clearCacheFor = function(type) {
        var dirMeta = this._directiveCache.get(type);
        this._directiveCache.delete(type);
        this._summaryCache.delete(type);
        this._pipeCache.delete(type);
        this._ngModuleOfTypes.delete(type);
        this._ngModuleCache.clear();
        if (dirMeta) {
          this._directiveNormalizer.clearCacheFor(dirMeta);
        }
      };
      CompileMetadataResolver.prototype.clearCache = function() {
        this._directiveCache.clear();
        this._summaryCache.clear();
        this._pipeCache.clear();
        this._ngModuleCache.clear();
        this._ngModuleOfTypes.clear();
        this._directiveNormalizer.clearCache();
      };
      CompileMetadataResolver.prototype.getAnimationEntryMetadata = function(entry) {
        var _this = this;
        var defs = entry.definitions.map(function(def) {
          return _this._getAnimationStateMetadata(def);
        });
        return new CompileAnimationEntryMetadata(entry.name, defs);
      };
      CompileMetadataResolver.prototype._getAnimationStateMetadata = function(value) {
        if (value instanceof _angular_core.AnimationStateDeclarationMetadata) {
          var styles = this._getAnimationStyleMetadata(value.styles);
          return new CompileAnimationStateDeclarationMetadata(value.stateNameExpr, styles);
        }
        if (value instanceof _angular_core.AnimationStateTransitionMetadata) {
          return new CompileAnimationStateTransitionMetadata(value.stateChangeExpr, this._getAnimationMetadata(value.steps));
        }
        return null;
      };
      CompileMetadataResolver.prototype._getAnimationStyleMetadata = function(value) {
        return new CompileAnimationStyleMetadata(value.offset, value.styles);
      };
      CompileMetadataResolver.prototype._getAnimationMetadata = function(value) {
        var _this = this;
        if (value instanceof _angular_core.AnimationStyleMetadata) {
          return this._getAnimationStyleMetadata(value);
        }
        if (value instanceof _angular_core.AnimationKeyframesSequenceMetadata) {
          return new CompileAnimationKeyframesSequenceMetadata(value.steps.map(function(entry) {
            return _this._getAnimationStyleMetadata(entry);
          }));
        }
        if (value instanceof _angular_core.AnimationAnimateMetadata) {
          var animateData = (this._getAnimationMetadata(value.styles));
          return new CompileAnimationAnimateMetadata(value.timings, animateData);
        }
        if (value instanceof _angular_core.AnimationWithStepsMetadata) {
          var steps = value.steps.map(function(step) {
            return _this._getAnimationMetadata(step);
          });
          if (value instanceof _angular_core.AnimationGroupMetadata) {
            return new CompileAnimationGroupMetadata(steps);
          }
          return new CompileAnimationSequenceMetadata(steps);
        }
        return null;
      };
      CompileMetadataResolver.prototype._loadSummary = function(type, kind) {
        var typeSummary = this._summaryCache.get(type);
        if (!typeSummary) {
          var summary = this._summaryResolver.resolveSummary(type);
          typeSummary = summary ? summary.type : null;
          this._summaryCache.set(type, typeSummary);
        }
        return typeSummary && typeSummary.summaryKind === kind ? typeSummary : null;
      };
      CompileMetadataResolver.prototype._loadDirectiveMetadata = function(directiveType, isSync) {
        var _this = this;
        if (this._directiveCache.has(directiveType)) {
          return;
        }
        directiveType = _angular_core.resolveForwardRef(directiveType);
        var _a = this.getNonNormalizedDirectiveMetadata(directiveType),
            annotation = _a.annotation,
            metadata = _a.metadata;
        var createDirectiveMetadata = function(templateMetadata) {
          var normalizedDirMeta = new CompileDirectiveMetadata({
            type: metadata.type,
            isComponent: metadata.isComponent,
            selector: metadata.selector,
            exportAs: metadata.exportAs,
            changeDetection: metadata.changeDetection,
            inputs: metadata.inputs,
            outputs: metadata.outputs,
            hostListeners: metadata.hostListeners,
            hostProperties: metadata.hostProperties,
            hostAttributes: metadata.hostAttributes,
            providers: metadata.providers,
            viewProviders: metadata.viewProviders,
            queries: metadata.queries,
            viewQueries: metadata.viewQueries,
            entryComponents: metadata.entryComponents,
            template: templateMetadata
          });
          _this._directiveCache.set(directiveType, normalizedDirMeta);
          _this._summaryCache.set(directiveType, normalizedDirMeta.toSummary());
          return normalizedDirMeta;
        };
        if (metadata.isComponent) {
          var templateMeta = this._directiveNormalizer.normalizeTemplate({
            componentType: directiveType,
            moduleUrl: componentModuleUrl(this._reflector, directiveType, annotation),
            encapsulation: metadata.template.encapsulation,
            template: metadata.template.template,
            templateUrl: metadata.template.templateUrl,
            styles: metadata.template.styles,
            styleUrls: metadata.template.styleUrls,
            animations: metadata.template.animations,
            interpolation: metadata.template.interpolation
          });
          if (templateMeta.syncResult) {
            createDirectiveMetadata(templateMeta.syncResult);
            return null;
          } else {
            if (isSync) {
              this._reportError(new ComponentStillLoadingError(directiveType), directiveType);
              return null;
            }
            return templateMeta.asyncResult.then(createDirectiveMetadata);
          }
        } else {
          createDirectiveMetadata(null);
          return null;
        }
      };
      CompileMetadataResolver.prototype.getNonNormalizedDirectiveMetadata = function(directiveType) {
        var _this = this;
        directiveType = _angular_core.resolveForwardRef(directiveType);
        var dirMeta = this._directiveResolver.resolve(directiveType);
        if (!dirMeta) {
          return null;
        }
        var nonNormalizedTemplateMetadata;
        if (dirMeta instanceof _angular_core.Component) {
          assertArrayOfStrings('styles', dirMeta.styles);
          assertArrayOfStrings('styleUrls', dirMeta.styleUrls);
          assertInterpolationSymbols('interpolation', dirMeta.interpolation);
          var animations = dirMeta.animations ? dirMeta.animations.map(function(e) {
            return _this.getAnimationEntryMetadata(e);
          }) : null;
          nonNormalizedTemplateMetadata = new CompileTemplateMetadata({
            encapsulation: dirMeta.encapsulation,
            template: dirMeta.template,
            templateUrl: dirMeta.templateUrl,
            styles: dirMeta.styles,
            styleUrls: dirMeta.styleUrls,
            animations: animations,
            interpolation: dirMeta.interpolation
          });
        }
        var changeDetectionStrategy = null;
        var viewProviders = [];
        var entryComponentMetadata = [];
        var selector = dirMeta.selector;
        if (dirMeta instanceof _angular_core.Component) {
          changeDetectionStrategy = dirMeta.changeDetection;
          if (dirMeta.viewProviders) {
            viewProviders = this._getProvidersMetadata(dirMeta.viewProviders, entryComponentMetadata, "viewProviders for \"" + stringifyType(directiveType) + "\"", [], directiveType);
          }
          if (dirMeta.entryComponents) {
            entryComponentMetadata = flattenAndDedupeArray(dirMeta.entryComponents).map(function(type) {
              return _this._getIdentifierMetadata(type);
            }).concat(entryComponentMetadata);
          }
          if (!selector) {
            selector = this._schemaRegistry.getDefaultComponentElementName();
          }
        } else {
          if (!selector) {
            this._reportError(new SyntaxError("Directive " + stringifyType(directiveType) + " has no selector, please add it!"), directiveType);
            selector = 'error';
          }
        }
        var providers = [];
        if (isPresent(dirMeta.providers)) {
          providers = this._getProvidersMetadata(dirMeta.providers, entryComponentMetadata, "providers for \"" + stringifyType(directiveType) + "\"", [], directiveType);
        }
        var queries = [];
        var viewQueries = [];
        if (isPresent(dirMeta.queries)) {
          queries = this._getQueriesMetadata(dirMeta.queries, false, directiveType);
          viewQueries = this._getQueriesMetadata(dirMeta.queries, true, directiveType);
        }
        var metadata = CompileDirectiveMetadata.create({
          selector: selector,
          exportAs: dirMeta.exportAs,
          isComponent: !!nonNormalizedTemplateMetadata,
          type: this._getTypeMetadata(directiveType),
          template: nonNormalizedTemplateMetadata,
          changeDetection: changeDetectionStrategy,
          inputs: dirMeta.inputs,
          outputs: dirMeta.outputs,
          host: dirMeta.host,
          providers: providers,
          viewProviders: viewProviders,
          queries: queries,
          viewQueries: viewQueries,
          entryComponents: entryComponentMetadata
        });
        return {
          metadata: metadata,
          annotation: dirMeta
        };
      };
      CompileMetadataResolver.prototype.getDirectiveMetadata = function(directiveType) {
        var dirMeta = this._directiveCache.get(directiveType);
        if (!dirMeta) {
          this._reportError(new SyntaxError("Illegal state: getDirectiveMetadata can only be called after loadNgModuleDirectiveAndPipeMetadata for a module that declares it. Directive " + stringifyType(directiveType) + "."), directiveType);
        }
        return dirMeta;
      };
      CompileMetadataResolver.prototype.getDirectiveSummary = function(dirType) {
        var dirSummary = (this._loadSummary(dirType, CompileSummaryKind.Directive));
        if (!dirSummary) {
          this._reportError(new SyntaxError("Illegal state: Could not load the summary for directive " + stringifyType(dirType) + "."), dirType);
        }
        return dirSummary;
      };
      CompileMetadataResolver.prototype.isDirective = function(type) {
        return this._directiveResolver.isDirective(type);
      };
      CompileMetadataResolver.prototype.isPipe = function(type) {
        return this._pipeResolver.isPipe(type);
      };
      CompileMetadataResolver.prototype.getNgModuleSummary = function(moduleType) {
        var moduleSummary = (this._loadSummary(moduleType, CompileSummaryKind.NgModule));
        if (!moduleSummary) {
          var moduleMeta = this.getNgModuleMetadata(moduleType, false);
          moduleSummary = moduleMeta ? moduleMeta.toSummary() : null;
          if (moduleSummary) {
            this._summaryCache.set(moduleType, moduleSummary);
          }
        }
        return moduleSummary;
      };
      CompileMetadataResolver.prototype.loadNgModuleDirectiveAndPipeMetadata = function(moduleType, isSync, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) {
          throwIfNotFound = true;
        }
        var ngModule = this.getNgModuleMetadata(moduleType, throwIfNotFound);
        var loading = [];
        if (ngModule) {
          ngModule.declaredDirectives.forEach(function(id) {
            var promise = _this._loadDirectiveMetadata(id.reference, isSync);
            if (promise) {
              loading.push(promise);
            }
          });
          ngModule.declaredPipes.forEach(function(id) {
            return _this._loadPipeMetadata(id.reference);
          });
        }
        return Promise.all(loading);
      };
      CompileMetadataResolver.prototype.getNgModuleMetadata = function(moduleType, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) {
          throwIfNotFound = true;
        }
        moduleType = _angular_core.resolveForwardRef(moduleType);
        var compileMeta = this._ngModuleCache.get(moduleType);
        if (compileMeta) {
          return compileMeta;
        }
        var meta = this._ngModuleResolver.resolve(moduleType, throwIfNotFound);
        if (!meta) {
          return null;
        }
        var declaredDirectives = [];
        var exportedNonModuleIdentifiers = [];
        var declaredPipes = [];
        var importedModules = [];
        var exportedModules = [];
        var providers = [];
        var entryComponents = [];
        var bootstrapComponents = [];
        var schemas = [];
        if (meta.imports) {
          flattenAndDedupeArray(meta.imports).forEach(function(importedType) {
            var importedModuleType;
            if (isValidType(importedType)) {
              importedModuleType = importedType;
            } else if (importedType && importedType.ngModule) {
              var moduleWithProviders = importedType;
              importedModuleType = moduleWithProviders.ngModule;
              if (moduleWithProviders.providers) {
                providers.push.apply(providers, _this._getProvidersMetadata(moduleWithProviders.providers, entryComponents, "provider for the NgModule '" + stringifyType(importedModuleType) + "'", [], importedType));
              }
            }
            if (importedModuleType) {
              var importedModuleSummary = _this.getNgModuleSummary(importedModuleType);
              if (!importedModuleSummary) {
                _this._reportError(new SyntaxError("Unexpected " + _this._getTypeDescriptor(importedType) + " '" + stringifyType(importedType) + "' imported by the module '" + stringifyType(moduleType) + "'"), moduleType);
                return;
              }
              importedModules.push(importedModuleSummary);
            } else {
              _this._reportError(new SyntaxError("Unexpected value '" + stringifyType(importedType) + "' imported by the module '" + stringifyType(moduleType) + "'"), moduleType);
              return;
            }
          });
        }
        if (meta.exports) {
          flattenAndDedupeArray(meta.exports).forEach(function(exportedType) {
            if (!isValidType(exportedType)) {
              _this._reportError(new SyntaxError("Unexpected value '" + stringifyType(exportedType) + "' exported by the module '" + stringifyType(moduleType) + "'"), moduleType);
              return;
            }
            var exportedModuleSummary = _this.getNgModuleSummary(exportedType);
            if (exportedModuleSummary) {
              exportedModules.push(exportedModuleSummary);
            } else {
              exportedNonModuleIdentifiers.push(_this._getIdentifierMetadata(exportedType));
            }
          });
        }
        var transitiveModule = this._getTransitiveNgModuleMetadata(importedModules, exportedModules);
        if (meta.declarations) {
          flattenAndDedupeArray(meta.declarations).forEach(function(declaredType) {
            if (!isValidType(declaredType)) {
              _this._reportError(new SyntaxError("Unexpected value '" + stringifyType(declaredType) + "' declared by the module '" + stringifyType(moduleType) + "'"), moduleType);
              return;
            }
            var declaredIdentifier = _this._getIdentifierMetadata(declaredType);
            if (_this._directiveResolver.isDirective(declaredType)) {
              transitiveModule.addDirective(declaredIdentifier);
              declaredDirectives.push(declaredIdentifier);
              _this._addTypeToModule(declaredType, moduleType);
            } else if (_this._pipeResolver.isPipe(declaredType)) {
              transitiveModule.addPipe(declaredIdentifier);
              transitiveModule.pipes.push(declaredIdentifier);
              declaredPipes.push(declaredIdentifier);
              _this._addTypeToModule(declaredType, moduleType);
            } else {
              _this._reportError(new SyntaxError("Unexpected " + _this._getTypeDescriptor(declaredType) + " '" + stringifyType(declaredType) + "' declared by the module '" + stringifyType(moduleType) + "'"), moduleType);
              return;
            }
          });
        }
        var exportedDirectives = [];
        var exportedPipes = [];
        exportedNonModuleIdentifiers.forEach(function(exportedId) {
          if (transitiveModule.directivesSet.has(exportedId.reference)) {
            exportedDirectives.push(exportedId);
            transitiveModule.addExportedDirective(exportedId);
          } else if (transitiveModule.pipesSet.has(exportedId.reference)) {
            exportedPipes.push(exportedId);
            transitiveModule.addExportedPipe(exportedId);
          } else {
            _this._reportError(new SyntaxError("Can't export " + _this._getTypeDescriptor(exportedId.reference) + " " + stringifyType(exportedId.reference) + " from " + stringifyType(moduleType) + " as it was neither declared nor imported!"), moduleType);
          }
        });
        if (meta.providers) {
          providers.push.apply(providers, this._getProvidersMetadata(meta.providers, entryComponents, "provider for the NgModule '" + stringifyType(moduleType) + "'", [], moduleType));
        }
        if (meta.entryComponents) {
          entryComponents.push.apply(entryComponents, flattenAndDedupeArray(meta.entryComponents).map(function(type) {
            return _this._getIdentifierMetadata(type);
          }));
        }
        if (meta.bootstrap) {
          flattenAndDedupeArray(meta.bootstrap).forEach(function(type) {
            if (!isValidType(type)) {
              _this._reportError(new SyntaxError("Unexpected value '" + stringifyType(type) + "' used in the bootstrap property of module '" + stringifyType(moduleType) + "'"), moduleType);
              return;
            }
            bootstrapComponents.push(_this._getIdentifierMetadata(type));
          });
        }
        entryComponents.push.apply(entryComponents, bootstrapComponents);
        if (meta.schemas) {
          schemas.push.apply(schemas, flattenAndDedupeArray(meta.schemas));
        }
        compileMeta = new CompileNgModuleMetadata({
          type: this._getTypeMetadata(moduleType),
          providers: providers,
          entryComponents: entryComponents,
          bootstrapComponents: bootstrapComponents,
          schemas: schemas,
          declaredDirectives: declaredDirectives,
          exportedDirectives: exportedDirectives,
          declaredPipes: declaredPipes,
          exportedPipes: exportedPipes,
          importedModules: importedModules,
          exportedModules: exportedModules,
          transitiveModule: transitiveModule,
          id: meta.id
        });
        entryComponents.forEach(function(id) {
          return transitiveModule.addEntryComponent(id);
        });
        providers.forEach(function(provider) {
          return transitiveModule.addProvider(provider, compileMeta.type);
        });
        transitiveModule.addModule(compileMeta.type);
        this._ngModuleCache.set(moduleType, compileMeta);
        return compileMeta;
      };
      CompileMetadataResolver.prototype._getTypeDescriptor = function(type) {
        if (this._directiveResolver.isDirective(type)) {
          return 'directive';
        }
        if (this._pipeResolver.isPipe(type)) {
          return 'pipe';
        }
        if (this._ngModuleResolver.isNgModule(type)) {
          return 'module';
        }
        if (((type)).provide) {
          return 'provider';
        }
        return 'value';
      };
      CompileMetadataResolver.prototype._addTypeToModule = function(type, moduleType) {
        var oldModule = this._ngModuleOfTypes.get(type);
        if (oldModule && oldModule !== moduleType) {
          this._reportError(new SyntaxError(("Type " + stringifyType(type) + " is part of the declarations of 2 modules: " + stringifyType(oldModule) + " and " + stringifyType(moduleType) + "! ") + ("Please consider moving " + stringifyType(type) + " to a higher module that imports " + stringifyType(oldModule) + " and " + stringifyType(moduleType) + ". ") + ("You can also create a new NgModule that exports and includes " + stringifyType(type) + " then import that NgModule in " + stringifyType(oldModule) + " and " + stringifyType(moduleType) + ".")), moduleType);
        }
        this._ngModuleOfTypes.set(type, moduleType);
      };
      CompileMetadataResolver.prototype._getTransitiveNgModuleMetadata = function(importedModules, exportedModules) {
        var result = new TransitiveCompileNgModuleMetadata();
        var modulesByToken = new Map();
        importedModules.concat(exportedModules).forEach(function(modSummary) {
          modSummary.modules.forEach(function(mod) {
            return result.addModule(mod);
          });
          modSummary.entryComponents.forEach(function(comp) {
            return result.addEntryComponent(comp);
          });
          var addedTokens = new Set();
          modSummary.providers.forEach(function(entry) {
            var tokenRef = tokenReference(entry.provider.token);
            var prevModules = modulesByToken.get(tokenRef);
            if (!prevModules) {
              prevModules = new Set();
              modulesByToken.set(tokenRef, prevModules);
            }
            var moduleRef = entry.module.reference;
            if (addedTokens.has(tokenRef) || !prevModules.has(moduleRef)) {
              prevModules.add(moduleRef);
              addedTokens.add(tokenRef);
              result.addProvider(entry.provider, entry.module);
            }
          });
        });
        exportedModules.forEach(function(modSummary) {
          modSummary.exportedDirectives.forEach(function(id) {
            return result.addExportedDirective(id);
          });
          modSummary.exportedPipes.forEach(function(id) {
            return result.addExportedPipe(id);
          });
        });
        importedModules.forEach(function(modSummary) {
          modSummary.exportedDirectives.forEach(function(id) {
            return result.addDirective(id);
          });
          modSummary.exportedPipes.forEach(function(id) {
            return result.addPipe(id);
          });
        });
        return result;
      };
      CompileMetadataResolver.prototype._getIdentifierMetadata = function(type) {
        type = _angular_core.resolveForwardRef(type);
        return {reference: type};
      };
      CompileMetadataResolver.prototype.isInjectable = function(type) {
        var annotations = this._reflector.annotations(type);
        return annotations.some(function(ann) {
          return ann.constructor === _angular_core.Injectable;
        });
      };
      CompileMetadataResolver.prototype.getInjectableSummary = function(type) {
        return {
          summaryKind: CompileSummaryKind.Injectable,
          type: this._getTypeMetadata(type)
        };
      };
      CompileMetadataResolver.prototype._getInjectableMetadata = function(type, dependencies) {
        if (dependencies === void 0) {
          dependencies = null;
        }
        var typeSummary = this._loadSummary(type, CompileSummaryKind.Injectable);
        if (typeSummary) {
          return typeSummary.type;
        }
        return this._getTypeMetadata(type, dependencies);
      };
      CompileMetadataResolver.prototype._getTypeMetadata = function(type, dependencies) {
        if (dependencies === void 0) {
          dependencies = null;
        }
        var identifier = this._getIdentifierMetadata(type);
        return {
          reference: identifier.reference,
          diDeps: this._getDependenciesMetadata(identifier.reference, dependencies),
          lifecycleHooks: LIFECYCLE_HOOKS_VALUES.filter(function(hook) {
            return hasLifecycleHook(hook, identifier.reference);
          })
        };
      };
      CompileMetadataResolver.prototype._getFactoryMetadata = function(factory, dependencies) {
        if (dependencies === void 0) {
          dependencies = null;
        }
        factory = _angular_core.resolveForwardRef(factory);
        return {
          reference: factory,
          diDeps: this._getDependenciesMetadata(factory, dependencies)
        };
      };
      CompileMetadataResolver.prototype.getPipeMetadata = function(pipeType) {
        var pipeMeta = this._pipeCache.get(pipeType);
        if (!pipeMeta) {
          this._reportError(new SyntaxError("Illegal state: getPipeMetadata can only be called after loadNgModuleDirectiveAndPipeMetadata for a module that declares it. Pipe " + stringifyType(pipeType) + "."), pipeType);
        }
        return pipeMeta;
      };
      CompileMetadataResolver.prototype.getPipeSummary = function(pipeType) {
        var pipeSummary = (this._loadSummary(pipeType, CompileSummaryKind.Pipe));
        if (!pipeSummary) {
          this._reportError(new SyntaxError("Illegal state: Could not load the summary for pipe " + stringifyType(pipeType) + "."), pipeType);
        }
        return pipeSummary;
      };
      CompileMetadataResolver.prototype.getOrLoadPipeMetadata = function(pipeType) {
        var pipeMeta = this._pipeCache.get(pipeType);
        if (!pipeMeta) {
          pipeMeta = this._loadPipeMetadata(pipeType);
        }
        return pipeMeta;
      };
      CompileMetadataResolver.prototype._loadPipeMetadata = function(pipeType) {
        pipeType = _angular_core.resolveForwardRef(pipeType);
        var pipeAnnotation = this._pipeResolver.resolve(pipeType);
        var pipeMeta = new CompilePipeMetadata({
          type: this._getTypeMetadata(pipeType),
          name: pipeAnnotation.name,
          pure: pipeAnnotation.pure
        });
        this._pipeCache.set(pipeType, pipeMeta);
        this._summaryCache.set(pipeType, pipeMeta.toSummary());
        return pipeMeta;
      };
      CompileMetadataResolver.prototype._getDependenciesMetadata = function(typeOrFunc, dependencies) {
        var _this = this;
        var hasUnknownDeps = false;
        var params = dependencies || this._reflector.parameters(typeOrFunc) || [];
        var dependenciesMetadata = params.map(function(param) {
          var isAttribute = false;
          var isHost = false;
          var isSelf = false;
          var isSkipSelf = false;
          var isOptional = false;
          var token = null;
          if (Array.isArray(param)) {
            param.forEach(function(paramEntry) {
              if (paramEntry instanceof _angular_core.Host) {
                isHost = true;
              } else if (paramEntry instanceof _angular_core.Self) {
                isSelf = true;
              } else if (paramEntry instanceof _angular_core.SkipSelf) {
                isSkipSelf = true;
              } else if (paramEntry instanceof _angular_core.Optional) {
                isOptional = true;
              } else if (paramEntry instanceof _angular_core.Attribute) {
                isAttribute = true;
                token = paramEntry.attributeName;
              } else if (paramEntry instanceof _angular_core.Inject) {
                token = paramEntry.token;
              } else if (isValidType(paramEntry) && isBlank(token)) {
                token = paramEntry;
              }
            });
          } else {
            token = param;
          }
          if (isBlank(token)) {
            hasUnknownDeps = true;
            return null;
          }
          return {
            isAttribute: isAttribute,
            isHost: isHost,
            isSelf: isSelf,
            isSkipSelf: isSkipSelf,
            isOptional: isOptional,
            token: _this._getTokenMetadata(token)
          };
        });
        if (hasUnknownDeps) {
          var depsTokens = dependenciesMetadata.map(function(dep) {
            return dep ? stringifyType(dep.token) : '?';
          }).join(', ');
          this._reportError(new SyntaxError("Can't resolve all parameters for " + stringifyType(typeOrFunc) + ": (" + depsTokens + ")."), typeOrFunc);
        }
        return dependenciesMetadata;
      };
      CompileMetadataResolver.prototype._getTokenMetadata = function(token) {
        token = _angular_core.resolveForwardRef(token);
        var compileToken;
        if (typeof token === 'string') {
          compileToken = {value: token};
        } else {
          compileToken = {identifier: {reference: token}};
        }
        return compileToken;
      };
      CompileMetadataResolver.prototype._getProvidersMetadata = function(providers, targetEntryComponents, debugInfo, compileProviders, type) {
        var _this = this;
        if (compileProviders === void 0) {
          compileProviders = [];
        }
        providers.forEach(function(provider, providerIdx) {
          if (Array.isArray(provider)) {
            _this._getProvidersMetadata(provider, targetEntryComponents, debugInfo, compileProviders);
          } else {
            provider = _angular_core.resolveForwardRef(provider);
            var providerMeta = void 0;
            if (provider && typeof provider == 'object' && provider.hasOwnProperty('provide')) {
              providerMeta = new ProviderMeta(provider.provide, provider);
            } else if (isValidType(provider)) {
              providerMeta = new ProviderMeta(provider, {useClass: provider});
            } else {
              var providersInfo = ((providers.reduce(function(soFar, seenProvider, seenProviderIdx) {
                if (seenProviderIdx < providerIdx) {
                  soFar.push("" + stringifyType(seenProvider));
                } else if (seenProviderIdx == providerIdx) {
                  soFar.push("?" + stringifyType(seenProvider) + "?");
                } else if (seenProviderIdx == providerIdx + 1) {
                  soFar.push('...');
                }
                return soFar;
              }, []))).join(', ');
              _this._reportError(new SyntaxError("Invalid " + (debugInfo ? debugInfo : 'provider') + " - only instances of Provider and Type are allowed, got: [" + providersInfo + "]"), type);
            }
            if (providerMeta.token === resolveIdentifier(Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS)) {
              targetEntryComponents.push.apply(targetEntryComponents, _this._getEntryComponentsFromProvider(providerMeta, type));
            } else {
              compileProviders.push(_this.getProviderMetadata(providerMeta));
            }
          }
        });
        return compileProviders;
      };
      CompileMetadataResolver.prototype._getEntryComponentsFromProvider = function(provider, type) {
        var _this = this;
        var components = [];
        var collectedIdentifiers = [];
        if (provider.useFactory || provider.useExisting || provider.useClass) {
          this._reportError(new SyntaxError("The ANALYZE_FOR_ENTRY_COMPONENTS token only supports useValue!"), type);
          return [];
        }
        if (!provider.multi) {
          this._reportError(new SyntaxError("The ANALYZE_FOR_ENTRY_COMPONENTS token only supports 'multi = true'!"), type);
          return [];
        }
        extractIdentifiers(provider.useValue, collectedIdentifiers);
        collectedIdentifiers.forEach(function(identifier) {
          if (_this._directiveResolver.isDirective(identifier.reference) || _this._loadSummary(identifier.reference, CompileSummaryKind.Directive)) {
            components.push(identifier);
          }
        });
        return components;
      };
      CompileMetadataResolver.prototype.getProviderMetadata = function(provider) {
        var compileDeps;
        var compileTypeMetadata = null;
        var compileFactoryMetadata = null;
        var token = this._getTokenMetadata(provider.token);
        if (provider.useClass) {
          compileTypeMetadata = this._getInjectableMetadata(provider.useClass, provider.dependencies);
          compileDeps = compileTypeMetadata.diDeps;
          if (provider.token === provider.useClass) {
            token = {identifier: compileTypeMetadata};
          }
        } else if (provider.useFactory) {
          compileFactoryMetadata = this._getFactoryMetadata(provider.useFactory, provider.dependencies);
          compileDeps = compileFactoryMetadata.diDeps;
        }
        return {
          token: token,
          useClass: compileTypeMetadata,
          useValue: provider.useValue,
          useFactory: compileFactoryMetadata,
          useExisting: provider.useExisting ? this._getTokenMetadata(provider.useExisting) : null,
          deps: compileDeps,
          multi: provider.multi
        };
      };
      CompileMetadataResolver.prototype._getQueriesMetadata = function(queries, isViewQuery, directiveType) {
        var _this = this;
        var res = [];
        Object.keys(queries).forEach(function(propertyName) {
          var query = queries[propertyName];
          if (query.isViewQuery === isViewQuery) {
            res.push(_this._getQueryMetadata(query, propertyName, directiveType));
          }
        });
        return res;
      };
      CompileMetadataResolver.prototype._queryVarBindings = function(selector) {
        return selector.split(/\s*,\s*/);
      };
      CompileMetadataResolver.prototype._getQueryMetadata = function(q, propertyName, typeOrFunc) {
        var _this = this;
        var selectors;
        if (typeof q.selector === 'string') {
          selectors = this._queryVarBindings(q.selector).map(function(varName) {
            return _this._getTokenMetadata(varName);
          });
        } else {
          if (!q.selector) {
            this._reportError(new SyntaxError("Can't construct a query for the property \"" + propertyName + "\" of \"" + stringifyType(typeOrFunc) + "\" since the query selector wasn't defined."), typeOrFunc);
          }
          selectors = [this._getTokenMetadata(q.selector)];
        }
        return {
          selectors: selectors,
          first: q.first,
          descendants: q.descendants,
          propertyName: propertyName,
          read: q.read ? this._getTokenMetadata(q.read) : null
        };
      };
      CompileMetadataResolver.prototype._reportError = function(error, type, otherType) {
        if (this._errorCollector) {
          this._errorCollector(error, type);
          if (otherType) {
            this._errorCollector(error, otherType);
          }
        } else {
          throw error;
        }
      };
      CompileMetadataResolver.ctorParameters = function() {
        return [{type: NgModuleResolver}, {type: DirectiveResolver}, {type: PipeResolver}, {type: SummaryResolver}, {type: ElementSchemaRegistry}, {type: DirectiveNormalizer}, {type: ReflectorReader}, {
          type: undefined,
          decorators: [{type: _angular_core.Optional}, {
            type: _angular_core.Inject,
            args: [ERROR_COLLECTOR_TOKEN]
          }]
        }];
      };
      CompileMetadataResolver = __decorate$9([CompilerInjectable(), __metadata$9('design:paramtypes', [NgModuleResolver, DirectiveResolver, PipeResolver, SummaryResolver, ElementSchemaRegistry, DirectiveNormalizer, ReflectorReader, Function])], CompileMetadataResolver);
      return CompileMetadataResolver;
    }());
    function flattenArray(tree, out) {
      if (out === void 0) {
        out = [];
      }
      if (tree) {
        for (var i = 0; i < tree.length; i++) {
          var item = _angular_core.resolveForwardRef(tree[i]);
          if (Array.isArray(item)) {
            flattenArray(item, out);
          } else {
            out.push(item);
          }
        }
      }
      return out;
    }
    function dedupeArray(array) {
      if (array) {
        return Array.from(new Set(array));
      }
      return [];
    }
    function flattenAndDedupeArray(tree) {
      return dedupeArray(flattenArray(tree));
    }
    function isValidType(value) {
      return (value instanceof StaticSymbol) || (value instanceof _angular_core.Type);
    }
    function componentModuleUrl(reflector, type, cmpMetadata) {
      if (type instanceof StaticSymbol) {
        return type.filePath;
      }
      var moduleId = cmpMetadata.moduleId;
      if (typeof moduleId === 'string') {
        var scheme = getUrlScheme(moduleId);
        return scheme ? moduleId : "package:" + moduleId + MODULE_SUFFIX;
      } else if (moduleId !== null && moduleId !== void 0) {
        throw new SyntaxError(("moduleId should be a string in \"" + stringifyType(type) + "\". See https://goo.gl/wIDDiL for more information.\n") + "If you're using Webpack you should inline the template and the styles, see https://goo.gl/X2J8zc.");
      }
      return reflector.importUri(type);
    }
    function extractIdentifiers(value, targetIdentifiers) {
      visitValue(value, new _CompileValueConverter(), targetIdentifiers);
    }
    var _CompileValueConverter = (function(_super) {
      __extends$21(_CompileValueConverter, _super);
      function _CompileValueConverter() {
        _super.apply(this, arguments);
      }
      _CompileValueConverter.prototype.visitOther = function(value, targetIdentifiers) {
        targetIdentifiers.push({reference: value});
      };
      return _CompileValueConverter;
    }(ValueTransformer));
    function stringifyType(type) {
      if (type instanceof StaticSymbol) {
        return type.name + " in " + type.filePath;
      } else {
        return stringify(type);
      }
    }
    var QUOTED_KEYS = '$quoted$';
    function convertValueToOutputAst(value, type) {
      if (type === void 0) {
        type = null;
      }
      return visitValue(value, new _ValueOutputAstTransformer(), type);
    }
    var _ValueOutputAstTransformer = (function() {
      function _ValueOutputAstTransformer() {}
      _ValueOutputAstTransformer.prototype.visitArray = function(arr, type) {
        var _this = this;
        return literalArr(arr.map(function(value) {
          return visitValue(value, _this, null);
        }), type);
      };
      _ValueOutputAstTransformer.prototype.visitStringMap = function(map, type) {
        var _this = this;
        var entries = [];
        var quotedSet = new Set(map && map[QUOTED_KEYS]);
        Object.keys(map).forEach(function(key) {
          entries.push(new LiteralMapEntry(key, visitValue(map[key], _this, null), quotedSet.has(key)));
        });
        return new LiteralMapExpr(entries, type);
      };
      _ValueOutputAstTransformer.prototype.visitPrimitive = function(value, type) {
        return literal(value, type);
      };
      _ValueOutputAstTransformer.prototype.visitOther = function(value, type) {
        if (value instanceof Expression) {
          return value;
        } else {
          return importExpr({reference: value});
        }
      };
      return _ValueOutputAstTransformer;
    }());
    var __decorate$13 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$13 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var ComponentFactoryDependency = (function() {
      function ComponentFactoryDependency(comp, placeholder) {
        this.comp = comp;
        this.placeholder = placeholder;
      }
      return ComponentFactoryDependency;
    }());
    var NgModuleCompileResult = (function() {
      function NgModuleCompileResult(statements, ngModuleFactoryVar, dependencies) {
        this.statements = statements;
        this.ngModuleFactoryVar = ngModuleFactoryVar;
        this.dependencies = dependencies;
      }
      return NgModuleCompileResult;
    }());
    var NgModuleCompiler = (function() {
      function NgModuleCompiler() {}
      NgModuleCompiler.prototype.compile = function(ngModuleMeta, extraProviders) {
        var moduleUrl = identifierModuleUrl(ngModuleMeta.type);
        var sourceFileName = isPresent(moduleUrl) ? "in NgModule " + identifierName(ngModuleMeta.type) + " in " + moduleUrl : "in NgModule " + identifierName(ngModuleMeta.type);
        var sourceFile = new ParseSourceFile('', sourceFileName);
        var sourceSpan = new ParseSourceSpan(new ParseLocation(sourceFile, null, null, null), new ParseLocation(sourceFile, null, null, null));
        var deps = [];
        var bootstrapComponentFactories = [];
        var entryComponentFactories = ngModuleMeta.transitiveModule.entryComponents.map(function(entryComponent) {
          var id = {reference: null};
          if (ngModuleMeta.bootstrapComponents.some(function(id) {
            return id.reference === entryComponent.reference;
          })) {
            bootstrapComponentFactories.push(id);
          }
          deps.push(new ComponentFactoryDependency(entryComponent, id));
          return id;
        });
        var builder = new _InjectorBuilder(ngModuleMeta, entryComponentFactories, bootstrapComponentFactories, sourceSpan);
        var providerParser = new NgModuleProviderAnalyzer(ngModuleMeta, extraProviders, sourceSpan);
        providerParser.parse().forEach(function(provider) {
          return builder.addProvider(provider);
        });
        var injectorClass = builder.build();
        var ngModuleFactoryVar = identifierName(ngModuleMeta.type) + "NgFactory";
        var ngModuleFactoryStmt = variable(ngModuleFactoryVar).set(importExpr(createIdentifier(Identifiers.NgModuleFactory)).instantiate([variable(injectorClass.name), importExpr(ngModuleMeta.type)], importType(createIdentifier(Identifiers.NgModuleFactory), [importType(ngModuleMeta.type)], [TypeModifier.Const]))).toDeclStmt(null, [StmtModifier.Final]);
        var stmts = [injectorClass, ngModuleFactoryStmt];
        if (ngModuleMeta.id) {
          var registerFactoryStmt = importExpr(createIdentifier(Identifiers.RegisterModuleFactoryFn)).callFn([literal(ngModuleMeta.id), variable(ngModuleFactoryVar)]).toStmt();
          stmts.push(registerFactoryStmt);
        }
        return new NgModuleCompileResult(stmts, ngModuleFactoryVar, deps);
      };
      NgModuleCompiler = __decorate$13([CompilerInjectable(), __metadata$13('design:paramtypes', [])], NgModuleCompiler);
      return NgModuleCompiler;
    }());
    var _InjectorBuilder = (function() {
      function _InjectorBuilder(_ngModuleMeta, _entryComponentFactories, _bootstrapComponentFactories, _sourceSpan) {
        this._ngModuleMeta = _ngModuleMeta;
        this._entryComponentFactories = _entryComponentFactories;
        this._bootstrapComponentFactories = _bootstrapComponentFactories;
        this._sourceSpan = _sourceSpan;
        this.fields = [];
        this.getters = [];
        this.methods = [];
        this.ctorStmts = [];
        this._tokens = [];
        this._instances = new Map();
        this._createStmts = [];
        this._destroyStmts = [];
      }
      _InjectorBuilder.prototype.addProvider = function(resolvedProvider) {
        var _this = this;
        var providerValueExpressions = resolvedProvider.providers.map(function(provider) {
          return _this._getProviderValue(provider);
        });
        var propName = "_" + tokenName(resolvedProvider.token) + "_" + this._instances.size;
        var instance = this._createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager);
        if (resolvedProvider.lifecycleHooks.indexOf(LifecycleHooks.OnDestroy) !== -1) {
          this._destroyStmts.push(instance.callMethod('ngOnDestroy', []).toStmt());
        }
        this._tokens.push(resolvedProvider.token);
        this._instances.set(tokenReference(resolvedProvider.token), instance);
      };
      _InjectorBuilder.prototype.build = function() {
        var _this = this;
        var getMethodStmts = this._tokens.map(function(token) {
          var providerExpr = _this._instances.get(tokenReference(token));
          return new IfStmt(InjectMethodVars.token.identical(createDiTokenExpression(token)), [new ReturnStatement(providerExpr)]);
        });
        var methods = [new ClassMethod('createInternal', [], this._createStmts.concat(new ReturnStatement(this._instances.get(this._ngModuleMeta.type.reference))), importType(this._ngModuleMeta.type)), new ClassMethod('getInternal', [new FnParam(InjectMethodVars.token.name, DYNAMIC_TYPE), new FnParam(InjectMethodVars.notFoundResult.name, DYNAMIC_TYPE)], getMethodStmts.concat([new ReturnStatement(InjectMethodVars.notFoundResult)]), DYNAMIC_TYPE), new ClassMethod('destroyInternal', [], this._destroyStmts)];
        var parentArgs = [variable(InjectorProps.parent.name), literalArr(this._entryComponentFactories.map(function(componentFactory) {
          return importExpr(componentFactory);
        })), literalArr(this._bootstrapComponentFactories.map(function(componentFactory) {
          return importExpr(componentFactory);
        }))];
        var injClassName = identifierName(this._ngModuleMeta.type) + "Injector";
        return createClassStmt({
          name: injClassName,
          ctorParams: [new FnParam(InjectorProps.parent.name, importType(createIdentifier(Identifiers.Injector)))],
          parent: importExpr(createIdentifier(Identifiers.NgModuleInjector), [importType(this._ngModuleMeta.type)]),
          parentArgs: parentArgs,
          builders: [{methods: methods}, this]
        });
      };
      _InjectorBuilder.prototype._getProviderValue = function(provider) {
        var _this = this;
        var result;
        if (isPresent(provider.useExisting)) {
          result = this._getDependency({token: provider.useExisting});
        } else if (isPresent(provider.useFactory)) {
          var deps = provider.deps || provider.useFactory.diDeps;
          var depsExpr = deps.map(function(dep) {
            return _this._getDependency(dep);
          });
          result = importExpr(provider.useFactory).callFn(depsExpr);
        } else if (isPresent(provider.useClass)) {
          var deps = provider.deps || provider.useClass.diDeps;
          var depsExpr = deps.map(function(dep) {
            return _this._getDependency(dep);
          });
          result = importExpr(provider.useClass).instantiate(depsExpr, importType(provider.useClass));
        } else {
          result = convertValueToOutputAst(provider.useValue);
        }
        return result;
      };
      _InjectorBuilder.prototype._createProviderProperty = function(propName, provider, providerValueExpressions, isMulti, isEager) {
        var resolvedProviderValueExpr;
        var type;
        if (isMulti) {
          resolvedProviderValueExpr = literalArr(providerValueExpressions);
          type = new ArrayType(DYNAMIC_TYPE);
        } else {
          resolvedProviderValueExpr = providerValueExpressions[0];
          type = providerValueExpressions[0].type;
        }
        if (!type) {
          type = DYNAMIC_TYPE;
        }
        if (isEager) {
          this.fields.push(new ClassField(propName, type));
          this._createStmts.push(THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
        } else {
          var internalField = "_" + propName;
          this.fields.push(new ClassField(internalField, type));
          var getterStmts = [new IfStmt(THIS_EXPR.prop(internalField).isBlank(), [THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]), new ReturnStatement(THIS_EXPR.prop(internalField))];
          this.getters.push(new ClassGetter(propName, getterStmts, type));
        }
        return THIS_EXPR.prop(propName);
      };
      _InjectorBuilder.prototype._getDependency = function(dep) {
        var result = null;
        if (dep.isValue) {
          result = literal(dep.value);
        }
        if (!dep.isSkipSelf) {
          if (dep.token && (tokenReference(dep.token) === resolveIdentifier(Identifiers.Injector) || tokenReference(dep.token) === resolveIdentifier(Identifiers.ComponentFactoryResolver))) {
            result = THIS_EXPR;
          }
          if (!result) {
            result = this._instances.get(tokenReference(dep.token));
          }
        }
        if (!result) {
          var args = [createDiTokenExpression(dep.token)];
          if (dep.isOptional) {
            args.push(NULL_EXPR);
          }
          result = InjectorProps.parent.callMethod('get', args);
        }
        return result;
      };
      return _InjectorBuilder;
    }());
    var InjectorProps = (function() {
      function InjectorProps() {}
      InjectorProps.parent = THIS_EXPR.prop('parent');
      return InjectorProps;
    }());
    var InjectMethodVars = (function() {
      function InjectMethodVars() {}
      InjectMethodVars.token = variable('token');
      InjectMethodVars.notFoundResult = variable('notFoundResult');
      return InjectMethodVars;
    }());
    var _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
    var _LEGAL_IDENTIFIER_RE = /^[$A-Z_][0-9A-Z_$]*$/i;
    var CATCH_ERROR_VAR$1 = variable('error');
    var CATCH_STACK_VAR$1 = variable('stack');
    var _EmittedLine = (function() {
      function _EmittedLine(indent) {
        this.indent = indent;
        this.parts = [];
      }
      return _EmittedLine;
    }());
    var EmitterVisitorContext = (function() {
      function EmitterVisitorContext(_exportedVars, _indent) {
        this._exportedVars = _exportedVars;
        this._indent = _indent;
        this._classes = [];
        this._lines = [new _EmittedLine(_indent)];
      }
      EmitterVisitorContext.createRoot = function(exportedVars) {
        return new EmitterVisitorContext(exportedVars, 0);
      };
      Object.defineProperty(EmitterVisitorContext.prototype, "_currentLine", {
        get: function() {
          return this._lines[this._lines.length - 1];
        },
        enumerable: true,
        configurable: true
      });
      EmitterVisitorContext.prototype.isExportedVar = function(varName) {
        return this._exportedVars.indexOf(varName) !== -1;
      };
      EmitterVisitorContext.prototype.println = function(lastPart) {
        if (lastPart === void 0) {
          lastPart = '';
        }
        this.print(lastPart, true);
      };
      EmitterVisitorContext.prototype.lineIsEmpty = function() {
        return this._currentLine.parts.length === 0;
      };
      EmitterVisitorContext.prototype.print = function(part, newLine) {
        if (newLine === void 0) {
          newLine = false;
        }
        if (part.length > 0) {
          this._currentLine.parts.push(part);
        }
        if (newLine) {
          this._lines.push(new _EmittedLine(this._indent));
        }
      };
      EmitterVisitorContext.prototype.removeEmptyLastLine = function() {
        if (this.lineIsEmpty()) {
          this._lines.pop();
        }
      };
      EmitterVisitorContext.prototype.incIndent = function() {
        this._indent++;
        this._currentLine.indent = this._indent;
      };
      EmitterVisitorContext.prototype.decIndent = function() {
        this._indent--;
        this._currentLine.indent = this._indent;
      };
      EmitterVisitorContext.prototype.pushClass = function(clazz) {
        this._classes.push(clazz);
      };
      EmitterVisitorContext.prototype.popClass = function() {
        return this._classes.pop();
      };
      Object.defineProperty(EmitterVisitorContext.prototype, "currentClass", {
        get: function() {
          return this._classes.length > 0 ? this._classes[this._classes.length - 1] : null;
        },
        enumerable: true,
        configurable: true
      });
      EmitterVisitorContext.prototype.toSource = function() {
        var lines = this._lines;
        if (lines[lines.length - 1].parts.length === 0) {
          lines = lines.slice(0, lines.length - 1);
        }
        return lines.map(function(line) {
          if (line.parts.length > 0) {
            return _createIndent(line.indent) + line.parts.join('');
          } else {
            return '';
          }
        }).join('\n');
      };
      return EmitterVisitorContext;
    }());
    var AbstractEmitterVisitor = (function() {
      function AbstractEmitterVisitor(_escapeDollarInStrings) {
        this._escapeDollarInStrings = _escapeDollarInStrings;
      }
      AbstractEmitterVisitor.prototype.visitExpressionStmt = function(stmt, ctx) {
        stmt.expr.visitExpression(this, ctx);
        ctx.println(';');
        return null;
      };
      AbstractEmitterVisitor.prototype.visitReturnStmt = function(stmt, ctx) {
        ctx.print("return ");
        stmt.value.visitExpression(this, ctx);
        ctx.println(';');
        return null;
      };
      AbstractEmitterVisitor.prototype.visitCastExpr = function(ast, context) {};
      AbstractEmitterVisitor.prototype.visitDeclareClassStmt = function(stmt, ctx) {};
      AbstractEmitterVisitor.prototype.visitIfStmt = function(stmt, ctx) {
        ctx.print("if (");
        stmt.condition.visitExpression(this, ctx);
        ctx.print(") {");
        var hasElseCase = isPresent(stmt.falseCase) && stmt.falseCase.length > 0;
        if (stmt.trueCase.length <= 1 && !hasElseCase) {
          ctx.print(" ");
          this.visitAllStatements(stmt.trueCase, ctx);
          ctx.removeEmptyLastLine();
          ctx.print(" ");
        } else {
          ctx.println();
          ctx.incIndent();
          this.visitAllStatements(stmt.trueCase, ctx);
          ctx.decIndent();
          if (hasElseCase) {
            ctx.println("} else {");
            ctx.incIndent();
            this.visitAllStatements(stmt.falseCase, ctx);
            ctx.decIndent();
          }
        }
        ctx.println("}");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitTryCatchStmt = function(stmt, ctx) {};
      AbstractEmitterVisitor.prototype.visitThrowStmt = function(stmt, ctx) {
        ctx.print("throw ");
        stmt.error.visitExpression(this, ctx);
        ctx.println(";");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitCommentStmt = function(stmt, ctx) {
        var lines = stmt.comment.split('\n');
        lines.forEach(function(line) {
          ctx.println("// " + line);
        });
        return null;
      };
      AbstractEmitterVisitor.prototype.visitDeclareVarStmt = function(stmt, ctx) {};
      AbstractEmitterVisitor.prototype.visitWriteVarExpr = function(expr, ctx) {
        var lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
          ctx.print('(');
        }
        ctx.print(expr.name + " = ");
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
          ctx.print(')');
        }
        return null;
      };
      AbstractEmitterVisitor.prototype.visitWriteKeyExpr = function(expr, ctx) {
        var lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
          ctx.print('(');
        }
        expr.receiver.visitExpression(this, ctx);
        ctx.print("[");
        expr.index.visitExpression(this, ctx);
        ctx.print("] = ");
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
          ctx.print(')');
        }
        return null;
      };
      AbstractEmitterVisitor.prototype.visitWritePropExpr = function(expr, ctx) {
        var lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
          ctx.print('(');
        }
        expr.receiver.visitExpression(this, ctx);
        ctx.print("." + expr.name + " = ");
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
          ctx.print(')');
        }
        return null;
      };
      AbstractEmitterVisitor.prototype.visitInvokeMethodExpr = function(expr, ctx) {
        expr.receiver.visitExpression(this, ctx);
        var name = expr.name;
        if (isPresent(expr.builtin)) {
          name = this.getBuiltinMethodName(expr.builtin);
          if (isBlank(name)) {
            return null;
          }
        }
        ctx.print("." + name + "(");
        this.visitAllExpressions(expr.args, ctx, ",");
        ctx.print(")");
        return null;
      };
      AbstractEmitterVisitor.prototype.getBuiltinMethodName = function(method) {};
      AbstractEmitterVisitor.prototype.visitInvokeFunctionExpr = function(expr, ctx) {
        expr.fn.visitExpression(this, ctx);
        ctx.print("(");
        this.visitAllExpressions(expr.args, ctx, ',');
        ctx.print(")");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitReadVarExpr = function(ast, ctx) {
        var varName = ast.name;
        if (isPresent(ast.builtin)) {
          switch (ast.builtin) {
            case BuiltinVar.Super:
              varName = 'super';
              break;
            case BuiltinVar.This:
              varName = 'this';
              break;
            case BuiltinVar.CatchError:
              varName = CATCH_ERROR_VAR$1.name;
              break;
            case BuiltinVar.CatchStack:
              varName = CATCH_STACK_VAR$1.name;
              break;
            default:
              throw new Error("Unknown builtin variable " + ast.builtin);
          }
        }
        ctx.print(varName);
        return null;
      };
      AbstractEmitterVisitor.prototype.visitInstantiateExpr = function(ast, ctx) {
        ctx.print("new ");
        ast.classExpr.visitExpression(this, ctx);
        ctx.print("(");
        this.visitAllExpressions(ast.args, ctx, ',');
        ctx.print(")");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitLiteralExpr = function(ast, ctx) {
        var value = ast.value;
        if (typeof value === 'string') {
          ctx.print(escapeIdentifier(value, this._escapeDollarInStrings));
        } else {
          ctx.print("" + value);
        }
        return null;
      };
      AbstractEmitterVisitor.prototype.visitExternalExpr = function(ast, ctx) {};
      AbstractEmitterVisitor.prototype.visitConditionalExpr = function(ast, ctx) {
        ctx.print("(");
        ast.condition.visitExpression(this, ctx);
        ctx.print('? ');
        ast.trueCase.visitExpression(this, ctx);
        ctx.print(': ');
        ast.falseCase.visitExpression(this, ctx);
        ctx.print(")");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitNotExpr = function(ast, ctx) {
        ctx.print('!');
        ast.condition.visitExpression(this, ctx);
        return null;
      };
      AbstractEmitterVisitor.prototype.visitFunctionExpr = function(ast, ctx) {};
      AbstractEmitterVisitor.prototype.visitDeclareFunctionStmt = function(stmt, context) {};
      AbstractEmitterVisitor.prototype.visitBinaryOperatorExpr = function(ast, ctx) {
        var opStr;
        switch (ast.operator) {
          case BinaryOperator.Equals:
            opStr = '==';
            break;
          case BinaryOperator.Identical:
            opStr = '===';
            break;
          case BinaryOperator.NotEquals:
            opStr = '!=';
            break;
          case BinaryOperator.NotIdentical:
            opStr = '!==';
            break;
          case BinaryOperator.And:
            opStr = '&&';
            break;
          case BinaryOperator.Or:
            opStr = '||';
            break;
          case BinaryOperator.Plus:
            opStr = '+';
            break;
          case BinaryOperator.Minus:
            opStr = '-';
            break;
          case BinaryOperator.Divide:
            opStr = '/';
            break;
          case BinaryOperator.Multiply:
            opStr = '*';
            break;
          case BinaryOperator.Modulo:
            opStr = '%';
            break;
          case BinaryOperator.Lower:
            opStr = '<';
            break;
          case BinaryOperator.LowerEquals:
            opStr = '<=';
            break;
          case BinaryOperator.Bigger:
            opStr = '>';
            break;
          case BinaryOperator.BiggerEquals:
            opStr = '>=';
            break;
          default:
            throw new Error("Unknown operator " + ast.operator);
        }
        ctx.print("(");
        ast.lhs.visitExpression(this, ctx);
        ctx.print(" " + opStr + " ");
        ast.rhs.visitExpression(this, ctx);
        ctx.print(")");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitReadPropExpr = function(ast, ctx) {
        ast.receiver.visitExpression(this, ctx);
        ctx.print(".");
        ctx.print(ast.name);
        return null;
      };
      AbstractEmitterVisitor.prototype.visitReadKeyExpr = function(ast, ctx) {
        ast.receiver.visitExpression(this, ctx);
        ctx.print("[");
        ast.index.visitExpression(this, ctx);
        ctx.print("]");
        return null;
      };
      AbstractEmitterVisitor.prototype.visitLiteralArrayExpr = function(ast, ctx) {
        var useNewLine = ast.entries.length > 1;
        ctx.print("[", useNewLine);
        ctx.incIndent();
        this.visitAllExpressions(ast.entries, ctx, ',', useNewLine);
        ctx.decIndent();
        ctx.print("]", useNewLine);
        return null;
      };
      AbstractEmitterVisitor.prototype.visitLiteralMapExpr = function(ast, ctx) {
        var _this = this;
        var useNewLine = ast.entries.length > 1;
        ctx.print("{", useNewLine);
        ctx.incIndent();
        this.visitAllObjects(function(entry) {
          ctx.print(escapeIdentifier(entry.key, _this._escapeDollarInStrings, entry.quoted) + ": ");
          entry.value.visitExpression(_this, ctx);
        }, ast.entries, ctx, ',', useNewLine);
        ctx.decIndent();
        ctx.print("}", useNewLine);
        return null;
      };
      AbstractEmitterVisitor.prototype.visitAllExpressions = function(expressions, ctx, separator, newLine) {
        var _this = this;
        if (newLine === void 0) {
          newLine = false;
        }
        this.visitAllObjects(function(expr) {
          return expr.visitExpression(_this, ctx);
        }, expressions, ctx, separator, newLine);
      };
      AbstractEmitterVisitor.prototype.visitAllObjects = function(handler, expressions, ctx, separator, newLine) {
        if (newLine === void 0) {
          newLine = false;
        }
        for (var i = 0; i < expressions.length; i++) {
          if (i > 0) {
            ctx.print(separator, newLine);
          }
          handler(expressions[i]);
        }
        if (newLine) {
          ctx.println();
        }
      };
      AbstractEmitterVisitor.prototype.visitAllStatements = function(statements, ctx) {
        var _this = this;
        statements.forEach(function(stmt) {
          return stmt.visitStatement(_this, ctx);
        });
      };
      return AbstractEmitterVisitor;
    }());
    function escapeIdentifier(input, escapeDollar, alwaysQuote) {
      if (alwaysQuote === void 0) {
        alwaysQuote = true;
      }
      if (isBlank(input)) {
        return null;
      }
      var body = input.replace(_SINGLE_QUOTE_ESCAPE_STRING_RE, function() {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          match[_i - 0] = arguments[_i];
        }
        if (match[0] == '$') {
          return escapeDollar ? '\\$' : '$';
        } else if (match[0] == '\n') {
          return '\\n';
        } else if (match[0] == '\r') {
          return '\\r';
        } else {
          return "\\" + match[0];
        }
      });
      var requiresQuotes = alwaysQuote || !_LEGAL_IDENTIFIER_RE.test(body);
      return requiresQuotes ? "'" + body + "'" : body;
    }
    function _createIndent(count) {
      var res = '';
      for (var i = 0; i < count; i++) {
        res += '  ';
      }
      return res;
    }
    var __extends$22 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _debugModuleUrl = '/debug/lib';
    function debugOutputAstAsTypeScript(ast) {
      var converter = new _TsEmitterVisitor(_debugModuleUrl);
      var ctx = EmitterVisitorContext.createRoot([]);
      var asts = Array.isArray(ast) ? ast : [ast];
      asts.forEach(function(ast) {
        if (ast instanceof Statement) {
          ast.visitStatement(converter, ctx);
        } else if (ast instanceof Expression) {
          ast.visitExpression(converter, ctx);
        } else if (ast instanceof Type$1) {
          ast.visitType(converter, ctx);
        } else {
          throw new Error("Don't know how to print debug info for " + ast);
        }
      });
      return ctx.toSource();
    }
    var TypeScriptEmitter = (function() {
      function TypeScriptEmitter(_importGenerator) {
        this._importGenerator = _importGenerator;
      }
      TypeScriptEmitter.prototype.emitStatements = function(moduleUrl, stmts, exportedVars) {
        var _this = this;
        var converter = new _TsEmitterVisitor(moduleUrl);
        var ctx = EmitterVisitorContext.createRoot(exportedVars);
        converter.visitAllStatements(stmts, ctx);
        var srcParts = [];
        converter.importsWithPrefixes.forEach(function(prefix, importedModuleUrl) {
          srcParts.push("imp" + ("ort * as " + prefix + " from '" + _this._importGenerator.fileNameToModuleName(importedModuleUrl, moduleUrl) + "';"));
        });
        srcParts.push(ctx.toSource());
        return srcParts.join('\n');
      };
      return TypeScriptEmitter;
    }());
    var _TsEmitterVisitor = (function(_super) {
      __extends$22(_TsEmitterVisitor, _super);
      function _TsEmitterVisitor(_moduleUrl) {
        _super.call(this, false);
        this._moduleUrl = _moduleUrl;
        this.importsWithPrefixes = new Map();
      }
      _TsEmitterVisitor.prototype.visitType = function(t, ctx, defaultType) {
        if (defaultType === void 0) {
          defaultType = 'any';
        }
        if (isPresent(t)) {
          t.visitType(this, ctx);
        } else {
          ctx.print(defaultType);
        }
      };
      _TsEmitterVisitor.prototype.visitLiteralExpr = function(ast, ctx) {
        var value = ast.value;
        if (isBlank(value) && ast.type != NULL_TYPE) {
          ctx.print("(" + value + " as any)");
          return null;
        }
        return _super.prototype.visitLiteralExpr.call(this, ast, ctx);
      };
      _TsEmitterVisitor.prototype.visitLiteralArrayExpr = function(ast, ctx) {
        if (ast.entries.length === 0) {
          ctx.print('(');
        }
        var result = _super.prototype.visitLiteralArrayExpr.call(this, ast, ctx);
        if (ast.entries.length === 0) {
          ctx.print(' as any[])');
        }
        return result;
      };
      _TsEmitterVisitor.prototype.visitExternalExpr = function(ast, ctx) {
        this._visitIdentifier(ast.value, ast.typeParams, ctx);
        return null;
      };
      _TsEmitterVisitor.prototype.visitDeclareVarStmt = function(stmt, ctx) {
        if (ctx.isExportedVar(stmt.name)) {
          ctx.print("export ");
        }
        if (stmt.hasModifier(StmtModifier.Final)) {
          ctx.print("const");
        } else {
          ctx.print("var");
        }
        ctx.print(" " + stmt.name + ":");
        this.visitType(stmt.type, ctx);
        ctx.print(" = ");
        stmt.value.visitExpression(this, ctx);
        ctx.println(";");
        return null;
      };
      _TsEmitterVisitor.prototype.visitCastExpr = function(ast, ctx) {
        ctx.print("(<");
        ast.type.visitType(this, ctx);
        ctx.print(">");
        ast.value.visitExpression(this, ctx);
        ctx.print(")");
        return null;
      };
      _TsEmitterVisitor.prototype.visitDeclareClassStmt = function(stmt, ctx) {
        var _this = this;
        ctx.pushClass(stmt);
        if (ctx.isExportedVar(stmt.name)) {
          ctx.print("export ");
        }
        ctx.print("class " + stmt.name);
        if (isPresent(stmt.parent)) {
          ctx.print(" extends ");
          stmt.parent.visitExpression(this, ctx);
        }
        ctx.println(" {");
        ctx.incIndent();
        stmt.fields.forEach(function(field) {
          return _this._visitClassField(field, ctx);
        });
        if (isPresent(stmt.constructorMethod)) {
          this._visitClassConstructor(stmt, ctx);
        }
        stmt.getters.forEach(function(getter) {
          return _this._visitClassGetter(getter, ctx);
        });
        stmt.methods.forEach(function(method) {
          return _this._visitClassMethod(method, ctx);
        });
        ctx.decIndent();
        ctx.println("}");
        ctx.popClass();
        return null;
      };
      _TsEmitterVisitor.prototype._visitClassField = function(field, ctx) {
        if (field.hasModifier(StmtModifier.Private)) {
          ctx.print("/*private*/ ");
        }
        ctx.print(field.name);
        ctx.print(':');
        this.visitType(field.type, ctx);
        ctx.println(";");
      };
      _TsEmitterVisitor.prototype._visitClassGetter = function(getter, ctx) {
        if (getter.hasModifier(StmtModifier.Private)) {
          ctx.print("private ");
        }
        ctx.print("get " + getter.name + "()");
        ctx.print(':');
        this.visitType(getter.type, ctx);
        ctx.println(" {");
        ctx.incIndent();
        this.visitAllStatements(getter.body, ctx);
        ctx.decIndent();
        ctx.println("}");
      };
      _TsEmitterVisitor.prototype._visitClassConstructor = function(stmt, ctx) {
        ctx.print("constructor(");
        this._visitParams(stmt.constructorMethod.params, ctx);
        ctx.println(") {");
        ctx.incIndent();
        this.visitAllStatements(stmt.constructorMethod.body, ctx);
        ctx.decIndent();
        ctx.println("}");
      };
      _TsEmitterVisitor.prototype._visitClassMethod = function(method, ctx) {
        if (method.hasModifier(StmtModifier.Private)) {
          ctx.print("private ");
        }
        ctx.print(method.name + "(");
        this._visitParams(method.params, ctx);
        ctx.print("):");
        this.visitType(method.type, ctx, 'void');
        ctx.println(" {");
        ctx.incIndent();
        this.visitAllStatements(method.body, ctx);
        ctx.decIndent();
        ctx.println("}");
      };
      _TsEmitterVisitor.prototype.visitFunctionExpr = function(ast, ctx) {
        ctx.print("(");
        this._visitParams(ast.params, ctx);
        ctx.print("):");
        this.visitType(ast.type, ctx, 'void');
        ctx.println(" => {");
        ctx.incIndent();
        this.visitAllStatements(ast.statements, ctx);
        ctx.decIndent();
        ctx.print("}");
        return null;
      };
      _TsEmitterVisitor.prototype.visitDeclareFunctionStmt = function(stmt, ctx) {
        if (ctx.isExportedVar(stmt.name)) {
          ctx.print("export ");
        }
        ctx.print("function " + stmt.name + "(");
        this._visitParams(stmt.params, ctx);
        ctx.print("):");
        this.visitType(stmt.type, ctx, 'void');
        ctx.println(" {");
        ctx.incIndent();
        this.visitAllStatements(stmt.statements, ctx);
        ctx.decIndent();
        ctx.println("}");
        return null;
      };
      _TsEmitterVisitor.prototype.visitTryCatchStmt = function(stmt, ctx) {
        ctx.println("try {");
        ctx.incIndent();
        this.visitAllStatements(stmt.bodyStmts, ctx);
        ctx.decIndent();
        ctx.println("} catch (" + CATCH_ERROR_VAR$1.name + ") {");
        ctx.incIndent();
        var catchStmts = [(CATCH_STACK_VAR$1.set(CATCH_ERROR_VAR$1.prop('stack')).toDeclStmt(null, [StmtModifier.Final]))].concat(stmt.catchStmts);
        this.visitAllStatements(catchStmts, ctx);
        ctx.decIndent();
        ctx.println("}");
        return null;
      };
      _TsEmitterVisitor.prototype.visitBuiltintType = function(type, ctx) {
        var typeStr;
        switch (type.name) {
          case BuiltinTypeName.Bool:
            typeStr = 'boolean';
            break;
          case BuiltinTypeName.Dynamic:
            typeStr = 'any';
            break;
          case BuiltinTypeName.Function:
            typeStr = 'Function';
            break;
          case BuiltinTypeName.Number:
            typeStr = 'number';
            break;
          case BuiltinTypeName.Int:
            typeStr = 'number';
            break;
          case BuiltinTypeName.String:
            typeStr = 'string';
            break;
          default:
            throw new Error("Unsupported builtin type " + type.name);
        }
        ctx.print(typeStr);
        return null;
      };
      _TsEmitterVisitor.prototype.visitExpressionType = function(ast, ctx) {
        var _this = this;
        ast.value.visitExpression(this, ctx);
        if (isPresent(ast.typeParams) && ast.typeParams.length > 0) {
          ctx.print("<");
          this.visitAllObjects(function(type) {
            return type.visitType(_this, ctx);
          }, ast.typeParams, ctx, ',');
          ctx.print(">");
        }
        return null;
      };
      _TsEmitterVisitor.prototype.visitArrayType = function(type, ctx) {
        this.visitType(type.of, ctx);
        ctx.print("[]");
        return null;
      };
      _TsEmitterVisitor.prototype.visitMapType = function(type, ctx) {
        ctx.print("{[key: string]:");
        this.visitType(type.valueType, ctx);
        ctx.print("}");
        return null;
      };
      _TsEmitterVisitor.prototype.getBuiltinMethodName = function(method) {
        var name;
        switch (method) {
          case BuiltinMethod.ConcatArray:
            name = 'concat';
            break;
          case BuiltinMethod.SubscribeObservable:
            name = 'subscribe';
            break;
          case BuiltinMethod.Bind:
            name = 'bind';
            break;
          default:
            throw new Error("Unknown builtin method: " + method);
        }
        return name;
      };
      _TsEmitterVisitor.prototype._visitParams = function(params, ctx) {
        var _this = this;
        this.visitAllObjects(function(param) {
          ctx.print(param.name);
          ctx.print(':');
          _this.visitType(param.type, ctx);
        }, params, ctx, ',');
      };
      _TsEmitterVisitor.prototype._visitIdentifier = function(value, typeParams, ctx) {
        var _this = this;
        var name = identifierName(value);
        var moduleUrl = identifierModuleUrl(value);
        if (isBlank(name)) {
          throw new Error("Internal error: unknown identifier " + value);
        }
        if (isPresent(moduleUrl) && moduleUrl != this._moduleUrl) {
          var prefix = this.importsWithPrefixes.get(moduleUrl);
          if (isBlank(prefix)) {
            prefix = "import" + this.importsWithPrefixes.size;
            this.importsWithPrefixes.set(moduleUrl, prefix);
          }
          ctx.print(prefix + ".");
        }
        if (value.reference && value.reference.members && value.reference.members.length) {
          ctx.print(value.reference.name);
          ctx.print('.');
          ctx.print(value.reference.members.join('.'));
        } else {
          ctx.print(name);
        }
        if (isPresent(typeParams) && typeParams.length > 0) {
          ctx.print("<");
          this.visitAllObjects(function(type) {
            return type.visitType(_this, ctx);
          }, typeParams, ctx, ',');
          ctx.print(">");
        }
      };
      return _TsEmitterVisitor;
    }(AbstractEmitterVisitor));
    var SECURITY_SCHEMA = {};
    function registerContext(ctx, specs) {
      for (var _i = 0,
          specs_1 = specs; _i < specs_1.length; _i++) {
        var spec = specs_1[_i];
        SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
      }
    }
    registerContext(_angular_core.SecurityContext.HTML, ['iframe|srcdoc', '*|innerHTML', '*|outerHTML']);
    registerContext(_angular_core.SecurityContext.STYLE, ['*|style']);
    registerContext(_angular_core.SecurityContext.URL, ['*|formAction', 'area|href', 'area|ping', 'audio|src', 'a|href', 'a|ping', 'blockquote|cite', 'body|background', 'del|cite', 'form|action', 'img|src', 'img|srcset', 'input|src', 'ins|cite', 'q|cite', 'source|src', 'source|srcset', 'track|src', 'video|poster', 'video|src']);
    registerContext(_angular_core.SecurityContext.RESOURCE_URL, ['applet|code', 'applet|codebase', 'base|href', 'embed|src', 'frame|src', 'head|profile', 'html|manifest', 'iframe|src', 'link|href', 'media|src', 'object|codebase', 'object|data', 'script|src']);
    var __extends$23 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate$14 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$14 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var BOOLEAN = 'boolean';
    var NUMBER = 'number';
    var STRING = 'string';
    var OBJECT = 'object';
    var SCHEMA = ['[Element]|textContent,%classList,className,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*copy,*cut,*paste,*search,*selectstart,*webkitfullscreenchange,*webkitfullscreenerror,*wheel,outerHTML,#scrollLeft,#scrollTop', '[HTMLElement]^[Element]|accessKey,contentEditable,dir,!draggable,!hidden,innerText,lang,*abort,*beforecopy,*beforecut,*beforepaste,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*message,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*paste,*pause,*play,*playing,*progress,*ratechange,*reset,*resize,*scroll,*search,*seeked,*seeking,*select,*selectstart,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored,*webkitfullscreenchange,*webkitfullscreenerror,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate', 'abbr,address,article,aside,b,bdi,bdo,cite,code,dd,dfn,dt,em,figcaption,figure,footer,header,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,contentEditable,dir,!draggable,!hidden,innerText,lang,*abort,*beforecopy,*beforecut,*beforepaste,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*message,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*paste,*pause,*play,*playing,*progress,*ratechange,*reset,*resize,*scroll,*search,*seeked,*seeking,*select,*selectstart,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored,*webkitfullscreenchange,*webkitfullscreenerror,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate', 'media^[HTMLElement]|!autoplay,!controls,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,#playbackRate,preload,src,%srcObject,#volume', ':svg:^[HTMLElement]|*abort,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*cuechange,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*pause,*play,*playing,*progress,*ratechange,*reset,*resize,*scroll,*seeked,*seeking,*select,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,%style,#tabIndex', ':svg:graphics^:svg:|', ':svg:animation^:svg:|*begin,*end,*repeat', ':svg:geometry^:svg:|', ':svg:componentTransferFunction^:svg:|', ':svg:gradient^:svg:|', ':svg:textContent^:svg:graphics|', ':svg:textPositioning^:svg:textContent|', 'a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,rev,search,shape,target,text,type,username', 'area^[HTMLElement]|alt,coords,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,search,shape,target,username', 'audio^media|', 'br^[HTMLElement]|clear', 'base^[HTMLElement]|href,target', 'body^[HTMLElement]|aLink,background,bgColor,link,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink', 'button^[HTMLElement]|!autofocus,!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value', 'canvas^[HTMLElement]|#height,#width', 'content^[HTMLElement]|select', 'dl^[HTMLElement]|!compact', 'datalist^[HTMLElement]|', 'details^[HTMLElement]|!open', 'dialog^[HTMLElement]|!open,returnValue', 'dir^[HTMLElement]|!compact', 'div^[HTMLElement]|align', 'embed^[HTMLElement]|align,height,name,src,type,width', 'fieldset^[HTMLElement]|!disabled,name', 'font^[HTMLElement]|color,face,size', 'form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target', 'frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src', 'frameset^[HTMLElement]|cols,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows', 'hr^[HTMLElement]|align,color,!noShade,size,width', 'head^[HTMLElement]|', 'h1,h2,h3,h4,h5,h6^[HTMLElement]|align', 'html^[HTMLElement]|version', 'iframe^[HTMLElement]|align,!allowFullscreen,frameBorder,height,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width', 'img^[HTMLElement]|align,alt,border,%crossOrigin,#height,#hspace,!isMap,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width', 'input^[HTMLElement]|accept,align,alt,autocapitalize,autocomplete,!autofocus,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width', 'keygen^[HTMLElement]|!autofocus,challenge,!disabled,keytype,name', 'li^[HTMLElement]|type,#value', 'label^[HTMLElement]|htmlFor', 'legend^[HTMLElement]|align', 'link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,integrity,media,rel,%relList,rev,%sizes,target,type', 'map^[HTMLElement]|name', 'marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width', 'menu^[HTMLElement]|!compact', 'meta^[HTMLElement]|content,httpEquiv,name,scheme', 'meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value', 'ins,del^[HTMLElement]|cite,dateTime', 'ol^[HTMLElement]|!compact,!reversed,#start,type', 'object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width', 'optgroup^[HTMLElement]|!disabled,label', 'option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value', 'output^[HTMLElement]|defaultValue,%htmlFor,name,value', 'p^[HTMLElement]|align', 'param^[HTMLElement]|name,type,value,valueType', 'picture^[HTMLElement]|', 'pre^[HTMLElement]|#width', 'progress^[HTMLElement]|#max,#value', 'q,blockquote,cite^[HTMLElement]|', 'script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,src,text,type', 'select^[HTMLElement]|!autofocus,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value', 'shadow^[HTMLElement]|', 'source^[HTMLElement]|media,sizes,src,srcset,type', 'span^[HTMLElement]|', 'style^[HTMLElement]|!disabled,media,type', 'caption^[HTMLElement]|align', 'th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width', 'col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width', 'table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width', 'tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign', 'tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign', 'template^[HTMLElement]|', 'textarea^[HTMLElement]|autocapitalize,!autofocus,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap', 'title^[HTMLElement]|text', 'track^[HTMLElement]|!default,kind,label,src,srclang', 'ul^[HTMLElement]|!compact,type', 'unknown^[HTMLElement]|', 'video^media|#height,poster,#width', ':svg:a^:svg:graphics|', ':svg:animate^:svg:animation|', ':svg:animateMotion^:svg:animation|', ':svg:animateTransform^:svg:animation|', ':svg:circle^:svg:geometry|', ':svg:clipPath^:svg:graphics|', ':svg:cursor^:svg:|', ':svg:defs^:svg:graphics|', ':svg:desc^:svg:|', ':svg:discard^:svg:|', ':svg:ellipse^:svg:geometry|', ':svg:feBlend^:svg:|', ':svg:feColorMatrix^:svg:|', ':svg:feComponentTransfer^:svg:|', ':svg:feComposite^:svg:|', ':svg:feConvolveMatrix^:svg:|', ':svg:feDiffuseLighting^:svg:|', ':svg:feDisplacementMap^:svg:|', ':svg:feDistantLight^:svg:|', ':svg:feDropShadow^:svg:|', ':svg:feFlood^:svg:|', ':svg:feFuncA^:svg:componentTransferFunction|', ':svg:feFuncB^:svg:componentTransferFunction|', ':svg:feFuncG^:svg:componentTransferFunction|', ':svg:feFuncR^:svg:componentTransferFunction|', ':svg:feGaussianBlur^:svg:|', ':svg:feImage^:svg:|', ':svg:feMerge^:svg:|', ':svg:feMergeNode^:svg:|', ':svg:feMorphology^:svg:|', ':svg:feOffset^:svg:|', ':svg:fePointLight^:svg:|', ':svg:feSpecularLighting^:svg:|', ':svg:feSpotLight^:svg:|', ':svg:feTile^:svg:|', ':svg:feTurbulence^:svg:|', ':svg:filter^:svg:|', ':svg:foreignObject^:svg:graphics|', ':svg:g^:svg:graphics|', ':svg:image^:svg:graphics|', ':svg:line^:svg:geometry|', ':svg:linearGradient^:svg:gradient|', ':svg:mpath^:svg:|', ':svg:marker^:svg:|', ':svg:mask^:svg:|', ':svg:metadata^:svg:|', ':svg:path^:svg:geometry|', ':svg:pattern^:svg:|', ':svg:polygon^:svg:geometry|', ':svg:polyline^:svg:geometry|', ':svg:radialGradient^:svg:gradient|', ':svg:rect^:svg:geometry|', ':svg:svg^:svg:graphics|#currentScale,#zoomAndPan', ':svg:script^:svg:|type', ':svg:set^:svg:animation|', ':svg:stop^:svg:|', ':svg:style^:svg:|!disabled,media,title,type', ':svg:switch^:svg:graphics|', ':svg:symbol^:svg:|', ':svg:tspan^:svg:textPositioning|', ':svg:text^:svg:textPositioning|', ':svg:textPath^:svg:textContent|', ':svg:title^:svg:|', ':svg:use^:svg:graphics|', ':svg:view^:svg:|#zoomAndPan', 'data^[HTMLElement]|value', 'menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default', 'summary^[HTMLElement]|', 'time^[HTMLElement]|dateTime'];
    var _ATTR_TO_PROP = {
      'class': 'className',
      'for': 'htmlFor',
      'formaction': 'formAction',
      'innerHtml': 'innerHTML',
      'readonly': 'readOnly',
      'tabindex': 'tabIndex'
    };
    var DomElementSchemaRegistry = (function(_super) {
      __extends$23(DomElementSchemaRegistry, _super);
      function DomElementSchemaRegistry() {
        var _this = this;
        _super.call(this);
        this._schema = {};
        SCHEMA.forEach(function(encodedType) {
          var type = {};
          var _a = encodedType.split('|'),
              strType = _a[0],
              strProperties = _a[1];
          var properties = strProperties.split(',');
          var _b = strType.split('^'),
              typeNames = _b[0],
              superName = _b[1];
          typeNames.split(',').forEach(function(tag) {
            return _this._schema[tag.toLowerCase()] = type;
          });
          var superType = superName && _this._schema[superName.toLowerCase()];
          if (superType) {
            Object.keys(superType).forEach(function(prop) {
              type[prop] = superType[prop];
            });
          }
          properties.forEach(function(property) {
            if (property.length > 0) {
              switch (property[0]) {
                case '*':
                  break;
                case '!':
                  type[property.substring(1)] = BOOLEAN;
                  break;
                case '#':
                  type[property.substring(1)] = NUMBER;
                  break;
                case '%':
                  type[property.substring(1)] = OBJECT;
                  break;
                default:
                  type[property] = STRING;
              }
            }
          });
        });
      }
      DomElementSchemaRegistry.prototype.hasProperty = function(tagName, propName, schemaMetas) {
        if (schemaMetas.some(function(schema) {
          return schema.name === _angular_core.NO_ERRORS_SCHEMA.name;
        })) {
          return true;
        }
        if (tagName.indexOf('-') > -1) {
          if (tagName === 'ng-container' || tagName === 'ng-content') {
            return false;
          }
          if (schemaMetas.some(function(schema) {
            return schema.name === _angular_core.CUSTOM_ELEMENTS_SCHEMA.name;
          })) {
            return true;
          }
        }
        var elementProperties = this._schema[tagName.toLowerCase()] || this._schema['unknown'];
        return !!elementProperties[propName];
      };
      DomElementSchemaRegistry.prototype.hasElement = function(tagName, schemaMetas) {
        if (schemaMetas.some(function(schema) {
          return schema.name === _angular_core.NO_ERRORS_SCHEMA.name;
        })) {
          return true;
        }
        if (tagName.indexOf('-') > -1) {
          if (tagName === 'ng-container' || tagName === 'ng-content') {
            return true;
          }
          if (schemaMetas.some(function(schema) {
            return schema.name === _angular_core.CUSTOM_ELEMENTS_SCHEMA.name;
          })) {
            return true;
          }
        }
        return !!this._schema[tagName.toLowerCase()];
      };
      DomElementSchemaRegistry.prototype.securityContext = function(tagName, propName, isAttribute) {
        if (isAttribute) {
          propName = this.getMappedPropName(propName);
        }
        tagName = tagName.toLowerCase();
        propName = propName.toLowerCase();
        var ctx = SECURITY_SCHEMA[tagName + '|' + propName];
        if (ctx) {
          return ctx;
        }
        ctx = SECURITY_SCHEMA['*|' + propName];
        return ctx ? ctx : _angular_core.SecurityContext.NONE;
      };
      DomElementSchemaRegistry.prototype.getMappedPropName = function(propName) {
        return _ATTR_TO_PROP[propName] || propName;
      };
      DomElementSchemaRegistry.prototype.getDefaultComponentElementName = function() {
        return 'ng-component';
      };
      DomElementSchemaRegistry.prototype.validateProperty = function(name) {
        if (name.toLowerCase().startsWith('on')) {
          var msg = ("Binding to event property '" + name + "' is disallowed for security reasons, ") + ("please use (" + name.slice(2) + ")=...") + ("\nIf '" + name + "' is a directive input, make sure the directive is imported by the") + " current module.";
          return {
            error: true,
            msg: msg
          };
        } else {
          return {error: false};
        }
      };
      DomElementSchemaRegistry.prototype.validateAttribute = function(name) {
        if (name.toLowerCase().startsWith('on')) {
          var msg = ("Binding to event attribute '" + name + "' is disallowed for security reasons, ") + ("please use (" + name.slice(2) + ")=...");
          return {
            error: true,
            msg: msg
          };
        } else {
          return {error: false};
        }
      };
      DomElementSchemaRegistry.prototype.allKnownElementNames = function() {
        return Object.keys(this._schema);
      };
      DomElementSchemaRegistry.prototype.normalizeAnimationStyleProperty = function(propName) {
        return dashCaseToCamelCase(propName);
      };
      DomElementSchemaRegistry.prototype.normalizeAnimationStyleValue = function(camelCaseProp, userProvidedProp, val) {
        var unit = '';
        var strVal = val.toString().trim();
        var errorMsg = null;
        if (_isPixelDimensionStyle(camelCaseProp) && val !== 0 && val !== '0') {
          if (typeof val === 'number') {
            unit = 'px';
          } else {
            var valAndSuffixMatch = val.match(/^[+-]?[\d\.]+([a-z]*)$/);
            if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
              errorMsg = "Please provide a CSS unit value for " + userProvidedProp + ":" + val;
            }
          }
        }
        return {
          error: errorMsg,
          value: strVal + unit
        };
      };
      DomElementSchemaRegistry = __decorate$14([CompilerInjectable(), __metadata$14('design:paramtypes', [])], DomElementSchemaRegistry);
      return DomElementSchemaRegistry;
    }(ElementSchemaRegistry));
    function _isPixelDimensionStyle(prop) {
      switch (prop) {
        case 'width':
        case 'height':
        case 'minWidth':
        case 'minHeight':
        case 'maxWidth':
        case 'maxHeight':
        case 'left':
        case 'top':
        case 'bottom':
        case 'right':
        case 'fontSize':
        case 'outlineWidth':
        case 'outlineOffset':
        case 'paddingTop':
        case 'paddingLeft':
        case 'paddingBottom':
        case 'paddingRight':
        case 'marginTop':
        case 'marginLeft':
        case 'marginBottom':
        case 'marginRight':
        case 'borderRadius':
        case 'borderWidth':
        case 'borderTopWidth':
        case 'borderLeftWidth':
        case 'borderRightWidth':
        case 'borderBottomWidth':
        case 'textIndent':
          return true;
        default:
          return false;
      }
    }
    var ShadowCss = (function() {
      function ShadowCss() {
        this.strictStyling = true;
      }
      ShadowCss.prototype.shimCssText = function(cssText, selector, hostSelector) {
        if (hostSelector === void 0) {
          hostSelector = '';
        }
        var sourceMappingUrl = extractSourceMappingUrl(cssText);
        cssText = stripComments(cssText);
        cssText = this._insertDirectives(cssText);
        return this._scopeCssText(cssText, selector, hostSelector) + sourceMappingUrl;
      };
      ShadowCss.prototype._insertDirectives = function(cssText) {
        cssText = this._insertPolyfillDirectivesInCssText(cssText);
        return this._insertPolyfillRulesInCssText(cssText);
      };
      ShadowCss.prototype._insertPolyfillDirectivesInCssText = function(cssText) {
        return cssText.replace(_cssContentNextSelectorRe, function() {
          var m = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            m[_i - 0] = arguments[_i];
          }
          return m[2] + '{';
        });
      };
      ShadowCss.prototype._insertPolyfillRulesInCssText = function(cssText) {
        return cssText.replace(_cssContentRuleRe, function() {
          var m = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            m[_i - 0] = arguments[_i];
          }
          var rule = m[0].replace(m[1], '').replace(m[2], '');
          return m[4] + rule;
        });
      };
      ShadowCss.prototype._scopeCssText = function(cssText, scopeSelector, hostSelector) {
        var unscopedRules = this._extractUnscopedRulesFromCssText(cssText);
        cssText = this._insertPolyfillHostInCssText(cssText);
        cssText = this._convertColonHost(cssText);
        cssText = this._convertColonHostContext(cssText);
        cssText = this._convertShadowDOMSelectors(cssText);
        if (scopeSelector) {
          cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
        }
        cssText = cssText + '\n' + unscopedRules;
        return cssText.trim();
      };
      ShadowCss.prototype._extractUnscopedRulesFromCssText = function(cssText) {
        var r = '';
        var m;
        _cssContentUnscopedRuleRe.lastIndex = 0;
        while ((m = _cssContentUnscopedRuleRe.exec(cssText)) !== null) {
          var rule = m[0].replace(m[2], '').replace(m[1], m[4]);
          r += rule + '\n\n';
        }
        return r;
      };
      ShadowCss.prototype._convertColonHost = function(cssText) {
        return this._convertColonRule(cssText, _cssColonHostRe, this._colonHostPartReplacer);
      };
      ShadowCss.prototype._convertColonHostContext = function(cssText) {
        return this._convertColonRule(cssText, _cssColonHostContextRe, this._colonHostContextPartReplacer);
      };
      ShadowCss.prototype._convertColonRule = function(cssText, regExp, partReplacer) {
        return cssText.replace(regExp, function() {
          var m = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            m[_i - 0] = arguments[_i];
          }
          if (m[2]) {
            var parts = m[2].split(',');
            var r = [];
            for (var i = 0; i < parts.length; i++) {
              var p = parts[i].trim();
              if (!p)
                break;
              r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
            }
            return r.join(',');
          } else {
            return _polyfillHostNoCombinator + m[3];
          }
        });
      };
      ShadowCss.prototype._colonHostContextPartReplacer = function(host, part, suffix) {
        if (part.indexOf(_polyfillHost) > -1) {
          return this._colonHostPartReplacer(host, part, suffix);
        } else {
          return host + part + suffix + ', ' + part + ' ' + host + suffix;
        }
      };
      ShadowCss.prototype._colonHostPartReplacer = function(host, part, suffix) {
        return host + part.replace(_polyfillHost, '') + suffix;
      };
      ShadowCss.prototype._convertShadowDOMSelectors = function(cssText) {
        return _shadowDOMSelectorsRe.reduce(function(result, pattern) {
          return result.replace(pattern, ' ');
        }, cssText);
      };
      ShadowCss.prototype._scopeSelectors = function(cssText, scopeSelector, hostSelector) {
        var _this = this;
        return processRules(cssText, function(rule) {
          var selector = rule.selector;
          var content = rule.content;
          if (rule.selector[0] != '@') {
            selector = _this._scopeSelector(rule.selector, scopeSelector, hostSelector, _this.strictStyling);
          } else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') || rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
            content = _this._scopeSelectors(rule.content, scopeSelector, hostSelector);
          }
          return new CssRule(selector, content);
        });
      };
      ShadowCss.prototype._scopeSelector = function(selector, scopeSelector, hostSelector, strict) {
        var _this = this;
        return selector.split(',').map(function(part) {
          return part.trim().split(_shadowDeepSelectors);
        }).map(function(deepParts) {
          var shallowPart = deepParts[0],
              otherParts = deepParts.slice(1);
          var applyScope = function(shallowPart) {
            if (_this._selectorNeedsScoping(shallowPart, scopeSelector)) {
              return strict ? _this._applyStrictSelectorScope(shallowPart, scopeSelector, hostSelector) : _this._applySelectorScope(shallowPart, scopeSelector, hostSelector);
            } else {
              return shallowPart;
            }
          };
          return [applyScope(shallowPart)].concat(otherParts).join(' ');
        }).join(', ');
      };
      ShadowCss.prototype._selectorNeedsScoping = function(selector, scopeSelector) {
        var re = this._makeScopeMatcher(scopeSelector);
        return !re.test(selector);
      };
      ShadowCss.prototype._makeScopeMatcher = function(scopeSelector) {
        var lre = /\[/g;
        var rre = /\]/g;
        scopeSelector = scopeSelector.replace(lre, '\\[').replace(rre, '\\]');
        return new RegExp('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
      };
      ShadowCss.prototype._applySelectorScope = function(selector, scopeSelector, hostSelector) {
        return this._applySimpleSelectorScope(selector, scopeSelector, hostSelector);
      };
      ShadowCss.prototype._applySimpleSelectorScope = function(selector, scopeSelector, hostSelector) {
        _polyfillHostRe.lastIndex = 0;
        if (_polyfillHostRe.test(selector)) {
          var replaceBy_1 = this.strictStyling ? "[" + hostSelector + "]" : scopeSelector;
          return selector.replace(_polyfillHostNoCombinatorRe, function(hnc, selector) {
            return selector.replace(/([^:]*)(:*)(.*)/, function(_, before, colon, after) {
              return before + replaceBy_1 + colon + after;
            });
          }).replace(_polyfillHostRe, replaceBy_1 + ' ');
        }
        return scopeSelector + ' ' + selector;
      };
      ShadowCss.prototype._applyStrictSelectorScope = function(selector, scopeSelector, hostSelector) {
        var _this = this;
        var isRe = /\[is=([^\]]*)\]/g;
        scopeSelector = scopeSelector.replace(isRe, function(_) {
          var parts = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            parts[_i - 1] = arguments[_i];
          }
          return parts[0];
        });
        var attrName = '[' + scopeSelector + ']';
        var _scopeSelectorPart = function(p) {
          var scopedP = p.trim();
          if (!scopedP) {
            return '';
          }
          if (p.indexOf(_polyfillHostNoCombinator) > -1) {
            scopedP = _this._applySimpleSelectorScope(p, scopeSelector, hostSelector);
          } else {
            var t = p.replace(_polyfillHostRe, '');
            if (t.length > 0) {
              var matches = t.match(/([^:]*)(:*)(.*)/);
              if (matches) {
                scopedP = matches[1] + attrName + matches[2] + matches[3];
              }
            }
          }
          return scopedP;
        };
        var safeContent = new SafeSelector(selector);
        selector = safeContent.content();
        var scopedSelector = '';
        var startIndex = 0;
        var res;
        var sep = /( |>|\+|~(?!=))\s*/g;
        var scopeAfter = selector.indexOf(_polyfillHostNoCombinator);
        while ((res = sep.exec(selector)) !== null) {
          var separator = res[1];
          var part = selector.slice(startIndex, res.index).trim();
          var scopedPart = startIndex >= scopeAfter ? _scopeSelectorPart(part) : part;
          scopedSelector += scopedPart + " " + separator + " ";
          startIndex = sep.lastIndex;
        }
        scopedSelector += _scopeSelectorPart(selector.substring(startIndex));
        return safeContent.restore(scopedSelector);
      };
      ShadowCss.prototype._insertPolyfillHostInCssText = function(selector) {
        return selector.replace(_colonHostContextRe, _polyfillHostContext).replace(_colonHostRe, _polyfillHost);
      };
      return ShadowCss;
    }());
    var SafeSelector = (function() {
      function SafeSelector(selector) {
        var _this = this;
        this.placeholders = [];
        this.index = 0;
        selector = selector.replace(/(\[[^\]]*\])/g, function(_, keep) {
          var replaceBy = "__ph-" + _this.index + "__";
          _this.placeholders.push(keep);
          _this.index++;
          return replaceBy;
        });
        this._content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, function(_, pseudo, exp) {
          var replaceBy = "__ph-" + _this.index + "__";
          _this.placeholders.push(exp);
          _this.index++;
          return pseudo + replaceBy;
        });
      }
      ;
      SafeSelector.prototype.restore = function(content) {
        var _this = this;
        return content.replace(/__ph-(\d+)__/g, function(ph, index) {
          return _this.placeholders[+index];
        });
      };
      SafeSelector.prototype.content = function() {
        return this._content;
      };
      return SafeSelector;
    }());
    var _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?(['"])(.*?)\1[;\s]*}([^{]*?){/gim;
    var _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
    var _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*(['"])(.*?)\3)[;\s]*[^}]*}/gim;
    var _polyfillHost = '-shadowcsshost';
    var _polyfillHostContext = '-shadowcsscontext';
    var _parenSuffix = ')(?:\\((' + '(?:\\([^)(]*\\)|[^)(]*)+?' + ')\\))?([^,{]*)';
    var _cssColonHostRe = new RegExp('(' + _polyfillHost + _parenSuffix, 'gim');
    var _cssColonHostContextRe = new RegExp('(' + _polyfillHostContext + _parenSuffix, 'gim');
    var _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
    var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
    var _shadowDOMSelectorsRe = [/::shadow/g, /::content/g, /\/shadow-deep\//g, /\/shadow\//g];
    var _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)/g;
    var _selectorReSuffix = '([>\\s~+\[.,{:][\\s\\S]*)?$';
    var _polyfillHostRe = /-shadowcsshost/gim;
    var _colonHostRe = /:host/gim;
    var _colonHostContextRe = /:host-context/gim;
    var _commentRe = /\/\*\s*[\s\S]*?\*\//g;
    function stripComments(input) {
      return input.replace(_commentRe, '');
    }
    var _sourceMappingUrlRe = /\/\*\s*#\s*sourceMappingURL=[\s\S]+?\*\//;
    function extractSourceMappingUrl(input) {
      var matcher = input.match(_sourceMappingUrlRe);
      return matcher ? matcher[0] : '';
    }
    var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
    var _curlyRe = /([{}])/g;
    var OPEN_CURLY = '{';
    var CLOSE_CURLY = '}';
    var BLOCK_PLACEHOLDER = '%BLOCK%';
    var CssRule = (function() {
      function CssRule(selector, content) {
        this.selector = selector;
        this.content = content;
      }
      return CssRule;
    }());
    function processRules(input, ruleCallback) {
      var inputWithEscapedBlocks = escapeBlocks(input);
      var nextBlockIndex = 0;
      return inputWithEscapedBlocks.escapedString.replace(_ruleRe, function() {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          m[_i - 0] = arguments[_i];
        }
        var selector = m[2];
        var content = '';
        var suffix = m[4];
        var contentPrefix = '';
        if (suffix && suffix.startsWith('{' + BLOCK_PLACEHOLDER)) {
          content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
          suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
          contentPrefix = '{';
        }
        var rule = ruleCallback(new CssRule(selector, content));
        return "" + m[1] + rule.selector + m[3] + contentPrefix + rule.content + suffix;
      });
    }
    var StringWithEscapedBlocks = (function() {
      function StringWithEscapedBlocks(escapedString, blocks) {
        this.escapedString = escapedString;
        this.blocks = blocks;
      }
      return StringWithEscapedBlocks;
    }());
    function escapeBlocks(input) {
      var inputParts = input.split(_curlyRe);
      var resultParts = [];
      var escapedBlocks = [];
      var bracketCount = 0;
      var currentBlockParts = [];
      for (var partIndex = 0; partIndex < inputParts.length; partIndex++) {
        var part = inputParts[partIndex];
        if (part == CLOSE_CURLY) {
          bracketCount--;
        }
        if (bracketCount > 0) {
          currentBlockParts.push(part);
        } else {
          if (currentBlockParts.length > 0) {
            escapedBlocks.push(currentBlockParts.join(''));
            resultParts.push(BLOCK_PLACEHOLDER);
            currentBlockParts = [];
          }
          resultParts.push(part);
        }
        if (part == OPEN_CURLY) {
          bracketCount++;
        }
      }
      if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(''));
        resultParts.push(BLOCK_PLACEHOLDER);
      }
      return new StringWithEscapedBlocks(resultParts.join(''), escapedBlocks);
    }
    var __decorate$15 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$15 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var COMPONENT_VARIABLE = '%COMP%';
    var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    var StylesCompileDependency = (function() {
      function StylesCompileDependency(name, moduleUrl, isShimmed, valuePlaceholder) {
        this.name = name;
        this.moduleUrl = moduleUrl;
        this.isShimmed = isShimmed;
        this.valuePlaceholder = valuePlaceholder;
      }
      return StylesCompileDependency;
    }());
    var StylesCompileResult = (function() {
      function StylesCompileResult(componentStylesheet, externalStylesheets) {
        this.componentStylesheet = componentStylesheet;
        this.externalStylesheets = externalStylesheets;
      }
      return StylesCompileResult;
    }());
    var CompiledStylesheet = (function() {
      function CompiledStylesheet(statements, stylesVar, dependencies, isShimmed, meta) {
        this.statements = statements;
        this.stylesVar = stylesVar;
        this.dependencies = dependencies;
        this.isShimmed = isShimmed;
        this.meta = meta;
      }
      return CompiledStylesheet;
    }());
    var StyleCompiler = (function() {
      function StyleCompiler(_urlResolver) {
        this._urlResolver = _urlResolver;
        this._shadowCss = new ShadowCss();
      }
      StyleCompiler.prototype.compileComponent = function(comp) {
        var _this = this;
        var externalStylesheets = [];
        var componentStylesheet = this._compileStyles(comp, new CompileStylesheetMetadata({
          styles: comp.template.styles,
          styleUrls: comp.template.styleUrls,
          moduleUrl: identifierModuleUrl(comp.type)
        }), true);
        comp.template.externalStylesheets.forEach(function(stylesheetMeta) {
          var compiledStylesheet = _this._compileStyles(comp, stylesheetMeta, false);
          externalStylesheets.push(compiledStylesheet);
        });
        return new StylesCompileResult(componentStylesheet, externalStylesheets);
      };
      StyleCompiler.prototype._compileStyles = function(comp, stylesheet, isComponentStylesheet) {
        var _this = this;
        var shim = comp.template.encapsulation === _angular_core.ViewEncapsulation.Emulated;
        var styleExpressions = stylesheet.styles.map(function(plainStyle) {
          return literal(_this._shimIfNeeded(plainStyle, shim));
        });
        var dependencies = [];
        for (var i = 0; i < stylesheet.styleUrls.length; i++) {
          var identifier = {reference: null};
          dependencies.push(new StylesCompileDependency(getStylesVarName(null), stylesheet.styleUrls[i], shim, identifier));
          styleExpressions.push(new ExternalExpr(identifier));
        }
        var stylesVar = getStylesVarName(isComponentStylesheet ? comp : null);
        var stmt = variable(stylesVar).set(literalArr(styleExpressions, new ArrayType(DYNAMIC_TYPE, [TypeModifier.Const]))).toDeclStmt(null, [StmtModifier.Final]);
        return new CompiledStylesheet([stmt], stylesVar, dependencies, shim, stylesheet);
      };
      StyleCompiler.prototype._shimIfNeeded = function(style, shim) {
        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
      };
      StyleCompiler = __decorate$15([CompilerInjectable(), __metadata$15('design:paramtypes', [UrlResolver])], StyleCompiler);
      return StyleCompiler;
    }());
    function getStylesVarName(component) {
      var result = "styles";
      if (component) {
        result += "_" + identifierName(component.type);
      }
      return result;
    }
    var _DebugState = (function() {
      function _DebugState(nodeIndex, sourceAst) {
        this.nodeIndex = nodeIndex;
        this.sourceAst = sourceAst;
      }
      return _DebugState;
    }());
    var NULL_DEBUG_STATE = new _DebugState(null, null);
    var CompileMethod = (function() {
      function CompileMethod(_view) {
        this._view = _view;
        this._newState = NULL_DEBUG_STATE;
        this._currState = NULL_DEBUG_STATE;
        this._bodyStatements = [];
        this._debugEnabled = this._view.genConfig.genDebugInfo;
      }
      CompileMethod.prototype._updateDebugContextIfNeeded = function() {
        if (this._newState.nodeIndex !== this._currState.nodeIndex || this._newState.sourceAst !== this._currState.sourceAst) {
          var expr = this._updateDebugContext(this._newState);
          if (expr) {
            this._bodyStatements.push(expr.toStmt());
          }
        }
      };
      CompileMethod.prototype._updateDebugContext = function(newState) {
        this._currState = this._newState = newState;
        if (this._debugEnabled) {
          var sourceLocation = newState.sourceAst ? newState.sourceAst.sourceSpan.start : null;
          return THIS_EXPR.callMethod('debug', [literal(newState.nodeIndex), sourceLocation ? literal(sourceLocation.line) : NULL_EXPR, sourceLocation ? literal(sourceLocation.col) : NULL_EXPR]);
        } else {
          return null;
        }
      };
      CompileMethod.prototype.resetDebugInfoExpr = function(nodeIndex, templateAst) {
        var res = this._updateDebugContext(new _DebugState(nodeIndex, templateAst));
        return res || NULL_EXPR;
      };
      CompileMethod.prototype.resetDebugInfo = function(nodeIndex, templateAst) {
        this._newState = new _DebugState(nodeIndex, templateAst);
      };
      CompileMethod.prototype.push = function() {
        var stmts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          stmts[_i - 0] = arguments[_i];
        }
        this.addStmts(stmts);
      };
      CompileMethod.prototype.addStmt = function(stmt) {
        this._updateDebugContextIfNeeded();
        this._bodyStatements.push(stmt);
      };
      CompileMethod.prototype.addStmts = function(stmts) {
        this._updateDebugContextIfNeeded();
        (_a = this._bodyStatements).push.apply(_a, stmts);
        var _a;
      };
      CompileMethod.prototype.finish = function() {
        return this._bodyStatements;
      };
      CompileMethod.prototype.isEmpty = function() {
        return this._bodyStatements.length === 0;
      };
      return CompileMethod;
    }());
    var __extends$25 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    function getPropertyInView(property, callingView, definedView) {
      if (callingView === definedView) {
        return property;
      } else {
        var viewProp = THIS_EXPR;
        var currView = callingView;
        while (currView !== definedView && currView.declarationElement.view) {
          currView = currView.declarationElement.view;
          viewProp = viewProp.prop('parentView');
        }
        if (currView !== definedView) {
          throw new Error("Internal error: Could not calculate a property in a parent view: " + property);
        }
        return property.visitExpression(new _ReplaceViewTransformer(viewProp, definedView), null);
      }
    }
    var _ReplaceViewTransformer = (function(_super) {
      __extends$25(_ReplaceViewTransformer, _super);
      function _ReplaceViewTransformer(_viewExpr, _view) {
        _super.call(this);
        this._viewExpr = _viewExpr;
        this._view = _view;
      }
      _ReplaceViewTransformer.prototype._isThis = function(expr) {
        return expr instanceof ReadVarExpr && expr.builtin === BuiltinVar.This;
      };
      _ReplaceViewTransformer.prototype.visitReadVarExpr = function(ast, context) {
        return this._isThis(ast) ? this._viewExpr : ast;
      };
      _ReplaceViewTransformer.prototype.visitReadPropExpr = function(ast, context) {
        if (this._isThis(ast.receiver)) {
          if (this._view.fields.some(function(field) {
            return field.name == ast.name;
          }) || this._view.getters.some(function(field) {
            return field.name == ast.name;
          })) {
            return this._viewExpr.cast(this._view.classType).prop(ast.name);
          }
        }
        return _super.prototype.visitReadPropExpr.call(this, ast, context);
      };
      return _ReplaceViewTransformer;
    }(ExpressionTransformer));
    function injectFromViewParentInjector(view, token, optional) {
      var viewExpr;
      if (view.viewType === ViewType.HOST) {
        viewExpr = THIS_EXPR;
      } else {
        viewExpr = THIS_EXPR.prop('parentView');
      }
      var args = [createDiTokenExpression(token), THIS_EXPR.prop('parentIndex')];
      if (optional) {
        args.push(NULL_EXPR);
      }
      return viewExpr.callMethod('injectorGet', args);
    }
    function getViewClassName(component, embeddedTemplateIndex) {
      return "View_" + identifierName(component.type) + embeddedTemplateIndex;
    }
    function getHandleEventMethodName(elementIndex) {
      return "handleEvent_" + elementIndex;
    }
    var ViewQueryValues = (function() {
      function ViewQueryValues(view, values) {
        this.view = view;
        this.values = values;
      }
      return ViewQueryValues;
    }());
    var CompileQuery = (function() {
      function CompileQuery(meta, queryList, ownerDirectiveExpression, view) {
        this.meta = meta;
        this.queryList = queryList;
        this.ownerDirectiveExpression = ownerDirectiveExpression;
        this.view = view;
        this._values = new ViewQueryValues(view, []);
      }
      CompileQuery.prototype.addValue = function(value, view) {
        var currentView = view;
        var elPath = [];
        while (currentView && currentView !== this.view) {
          var parentEl = currentView.declarationElement;
          elPath.unshift(parentEl);
          currentView = parentEl.view;
        }
        var queryListForDirtyExpr = getPropertyInView(this.queryList, view, this.view);
        var viewValues = this._values;
        elPath.forEach(function(el) {
          var last = viewValues.values.length > 0 ? viewValues.values[viewValues.values.length - 1] : null;
          if (last instanceof ViewQueryValues && last.view === el.embeddedView) {
            viewValues = last;
          } else {
            var newViewValues = new ViewQueryValues(el.embeddedView, []);
            viewValues.values.push(newViewValues);
            viewValues = newViewValues;
          }
        });
        viewValues.values.push(value);
        if (elPath.length > 0) {
          view.dirtyParentQueriesMethod.addStmt(queryListForDirtyExpr.callMethod('setDirty', []).toStmt());
        }
      };
      CompileQuery.prototype._isStatic = function() {
        return !this._values.values.some(function(value) {
          return value instanceof ViewQueryValues;
        });
      };
      CompileQuery.prototype.generateStatements = function(targetStaticMethod, targetDynamicMethod) {
        var values = createQueryValues(this._values);
        var updateStmts = [this.queryList.callMethod('reset', [literalArr(values)]).toStmt()];
        if (this.ownerDirectiveExpression) {
          var valueExpr = this.meta.first ? this.queryList.prop('first') : this.queryList;
          updateStmts.push(this.ownerDirectiveExpression.prop(this.meta.propertyName).set(valueExpr).toStmt());
        }
        if (!this.meta.first) {
          updateStmts.push(this.queryList.callMethod('notifyOnChanges', []).toStmt());
        }
        if (this.meta.first && this._isStatic()) {
          targetStaticMethod.addStmts(updateStmts);
        } else {
          targetDynamicMethod.addStmt(new IfStmt(this.queryList.prop('dirty'), updateStmts));
        }
      };
      return CompileQuery;
    }());
    function createQueryValues(viewValues) {
      return ListWrapper.flatten(viewValues.values.map(function(entry) {
        if (entry instanceof ViewQueryValues) {
          return mapNestedViews(entry.view.declarationElement.viewContainer, entry.view, createQueryValues(entry));
        } else {
          return (entry);
        }
      }));
    }
    function mapNestedViews(viewContainer, view, expressions) {
      var adjustedExpressions = expressions.map(function(expr) {
        return replaceVarInExpression(THIS_EXPR.name, variable('nestedView'), expr);
      });
      return viewContainer.callMethod('mapNestedViews', [variable(view.className), fn([new FnParam('nestedView', view.classType)], [new ReturnStatement(literalArr(adjustedExpressions))], DYNAMIC_TYPE)]);
    }
    function createQueryList(propertyName, compileView) {
      compileView.fields.push(new ClassField(propertyName, importType(createIdentifier(Identifiers.QueryList), [DYNAMIC_TYPE])));
      var expr = THIS_EXPR.prop(propertyName);
      compileView.createMethod.addStmt(THIS_EXPR.prop(propertyName).set(importExpr(createIdentifier(Identifiers.QueryList), [DYNAMIC_TYPE]).instantiate([])).toStmt());
      return expr;
    }
    function addQueryToTokenMap(map, query) {
      query.meta.selectors.forEach(function(selector) {
        var entry = map.get(tokenReference(selector));
        if (!entry) {
          entry = [];
          map.set(tokenReference(selector), entry);
        }
        entry.push(query);
      });
    }
    var ViewTypeEnum = (function() {
      function ViewTypeEnum() {}
      ViewTypeEnum.fromValue = function(value) {
        return createEnumExpression(Identifiers.ViewType, value);
      };
      return ViewTypeEnum;
    }());
    var ViewEncapsulationEnum = (function() {
      function ViewEncapsulationEnum() {}
      ViewEncapsulationEnum.fromValue = function(value) {
        return createEnumExpression(Identifiers.ViewEncapsulation, value);
      };
      return ViewEncapsulationEnum;
    }());
    var ChangeDetectorStatusEnum = (function() {
      function ChangeDetectorStatusEnum() {}
      ChangeDetectorStatusEnum.fromValue = function(value) {
        return createEnumExpression(Identifiers.ChangeDetectorStatus, value);
      };
      return ChangeDetectorStatusEnum;
    }());
    var ViewConstructorVars = (function() {
      function ViewConstructorVars() {}
      ViewConstructorVars.viewUtils = variable('viewUtils');
      ViewConstructorVars.parentView = variable('parentView');
      ViewConstructorVars.parentIndex = variable('parentIndex');
      ViewConstructorVars.parentElement = variable('parentElement');
      return ViewConstructorVars;
    }());
    var ViewProperties = (function() {
      function ViewProperties() {}
      ViewProperties.renderer = THIS_EXPR.prop('renderer');
      ViewProperties.viewUtils = THIS_EXPR.prop('viewUtils');
      return ViewProperties;
    }());
    var InjectMethodVars$1 = (function() {
      function InjectMethodVars() {}
      InjectMethodVars.token = variable('token');
      InjectMethodVars.requestNodeIndex = variable('requestNodeIndex');
      InjectMethodVars.notFoundResult = variable('notFoundResult');
      return InjectMethodVars;
    }());
    var DetectChangesVars = (function() {
      function DetectChangesVars() {}
      DetectChangesVars.throwOnChange = variable("throwOnChange");
      DetectChangesVars.changes = variable("changes");
      DetectChangesVars.changed = variable("changed");
      return DetectChangesVars;
    }());
    var ViewClassDependency = (function() {
      function ViewClassDependency(comp, name, placeholder) {
        this.comp = comp;
        this.name = name;
        this.placeholder = placeholder;
      }
      return ViewClassDependency;
    }());
    var ComponentFactoryDependency$1 = (function() {
      function ComponentFactoryDependency(comp, placeholder) {
        this.comp = comp;
        this.placeholder = placeholder;
      }
      return ComponentFactoryDependency;
    }());
    var DirectiveWrapperDependency = (function() {
      function DirectiveWrapperDependency(dir, name, placeholder) {
        this.dir = dir;
        this.name = name;
        this.placeholder = placeholder;
      }
      return DirectiveWrapperDependency;
    }());
    var __extends$24 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var CompileNode = (function() {
      function CompileNode(parent, view, nodeIndex, renderNode, sourceAst) {
        this.parent = parent;
        this.view = view;
        this.nodeIndex = nodeIndex;
        this.renderNode = renderNode;
        this.sourceAst = sourceAst;
      }
      CompileNode.prototype.isNull = function() {
        return !this.renderNode;
      };
      CompileNode.prototype.isRootElement = function() {
        return this.view != this.parent.view;
      };
      return CompileNode;
    }());
    var CompileElement = (function(_super) {
      __extends$24(CompileElement, _super);
      function CompileElement(parent, view, nodeIndex, renderNode, sourceAst, component, _directives, _resolvedProvidersArray, hasViewContainer, hasEmbeddedView, references) {
        var _this = this;
        _super.call(this, parent, view, nodeIndex, renderNode, sourceAst);
        this.component = component;
        this._directives = _directives;
        this._resolvedProvidersArray = _resolvedProvidersArray;
        this.hasViewContainer = hasViewContainer;
        this.hasEmbeddedView = hasEmbeddedView;
        this.compViewExpr = null;
        this.instances = new Map();
        this.directiveWrapperInstance = new Map();
        this._queryCount = 0;
        this._queries = new Map();
        this.contentNodesByNgContentIndex = null;
        this.referenceTokens = {};
        references.forEach(function(ref) {
          return _this.referenceTokens[ref.name] = ref.value;
        });
        this.elementRef = importExpr(createIdentifier(Identifiers.ElementRef)).instantiate([this.renderNode]);
        this.instances.set(resolveIdentifier(Identifiers.ElementRef), this.elementRef);
        this.instances.set(resolveIdentifier(Identifiers.Injector), THIS_EXPR.callMethod('injector', [literal(this.nodeIndex)]));
        this.instances.set(resolveIdentifier(Identifiers.Renderer), THIS_EXPR.prop('renderer'));
        if (this.hasViewContainer || this.hasEmbeddedView) {
          this._createViewContainer();
        }
        if (this.component) {
          this._createComponentFactoryResolver();
        }
      }
      CompileElement.createNull = function() {
        return new CompileElement(null, null, null, null, null, null, [], [], false, false, []);
      };
      CompileElement.prototype._createViewContainer = function() {
        var fieldName = "_vc_" + this.nodeIndex;
        var parentNodeIndex = this.isRootElement() ? null : this.parent.nodeIndex;
        this.view.fields.push(new ClassField(fieldName, importType(createIdentifier(Identifiers.ViewContainer)), [StmtModifier.Private]));
        var statement = THIS_EXPR.prop(fieldName).set(importExpr(createIdentifier(Identifiers.ViewContainer)).instantiate([literal(this.nodeIndex), literal(parentNodeIndex), THIS_EXPR, this.renderNode])).toStmt();
        this.view.createMethod.addStmt(statement);
        this.viewContainer = THIS_EXPR.prop(fieldName);
        this.instances.set(resolveIdentifier(Identifiers.ViewContainer), this.viewContainer);
        this.view.viewContainers.push(this.viewContainer);
      };
      CompileElement.prototype._createComponentFactoryResolver = function() {
        var _this = this;
        var entryComponents = this.component.entryComponents.map(function(entryComponent) {
          var id = {reference: null};
          _this.view.targetDependencies.push(new ComponentFactoryDependency$1(entryComponent, id));
          return id;
        });
        if (!entryComponents || entryComponents.length === 0) {
          return;
        }
        var createComponentFactoryResolverExpr = importExpr(createIdentifier(Identifiers.CodegenComponentFactoryResolver)).instantiate([literalArr(entryComponents.map(function(entryComponent) {
          return importExpr(entryComponent);
        })), injectFromViewParentInjector(this.view, createIdentifierToken(Identifiers.ComponentFactoryResolver), false)]);
        var provider = {
          token: createIdentifierToken(Identifiers.ComponentFactoryResolver),
          useValue: createComponentFactoryResolverExpr
        };
        this._resolvedProvidersArray.unshift(new ProviderAst(provider.token, false, true, [provider], ProviderAstType.PrivateService, [], this.sourceAst.sourceSpan));
      };
      CompileElement.prototype.setComponentView = function(compViewExpr) {
        this.compViewExpr = compViewExpr;
        this.contentNodesByNgContentIndex = new Array(this.component.template.ngContentSelectors.length);
        for (var i = 0; i < this.contentNodesByNgContentIndex.length; i++) {
          this.contentNodesByNgContentIndex[i] = [];
        }
      };
      CompileElement.prototype.setEmbeddedView = function(embeddedView) {
        this.embeddedView = embeddedView;
        if (isPresent(embeddedView)) {
          var createTemplateRefExpr = importExpr(createIdentifier(Identifiers.TemplateRef_)).instantiate([THIS_EXPR, literal(this.nodeIndex), this.renderNode]);
          var provider = {
            token: createIdentifierToken(Identifiers.TemplateRef),
            useValue: createTemplateRefExpr
          };
          this._resolvedProvidersArray.unshift(new ProviderAst(provider.token, false, true, [provider], ProviderAstType.Builtin, [], this.sourceAst.sourceSpan));
        }
      };
      CompileElement.prototype.beforeChildren = function() {
        var _this = this;
        if (this.hasViewContainer) {
          this.instances.set(resolveIdentifier(Identifiers.ViewContainerRef), this.viewContainer.prop('vcRef'));
        }
        this._resolvedProviders = new Map();
        this._resolvedProvidersArray.forEach(function(provider) {
          return _this._resolvedProviders.set(tokenReference(provider.token), provider);
        });
        Array.from(this._resolvedProviders.values()).forEach(function(resolvedProvider) {
          var isDirectiveWrapper = resolvedProvider.providerType === ProviderAstType.Component || resolvedProvider.providerType === ProviderAstType.Directive;
          var providerValueExpressions = resolvedProvider.providers.map(function(provider) {
            if (provider.useExisting) {
              return _this._getDependency(resolvedProvider.providerType, {token: provider.useExisting});
            } else if (provider.useFactory) {
              var deps = provider.deps || provider.useFactory.diDeps;
              var depsExpr = deps.map(function(dep) {
                return _this._getDependency(resolvedProvider.providerType, dep);
              });
              return importExpr(provider.useFactory).callFn(depsExpr);
            } else if (provider.useClass) {
              var deps = provider.deps || provider.useClass.diDeps;
              var depsExpr = deps.map(function(dep) {
                return _this._getDependency(resolvedProvider.providerType, dep);
              });
              if (isDirectiveWrapper) {
                var directiveWrapperIdentifier = {reference: null};
                _this.view.targetDependencies.push(new DirectiveWrapperDependency(provider.useClass, DirectiveWrapperCompiler.dirWrapperClassName(provider.useClass), directiveWrapperIdentifier));
                return DirectiveWrapperExpressions.create(directiveWrapperIdentifier, depsExpr);
              } else {
                return importExpr(provider.useClass).instantiate(depsExpr, importType(provider.useClass));
              }
            } else {
              return convertValueToOutputAst(provider.useValue);
            }
          });
          var propName = "_" + tokenName(resolvedProvider.token) + "_" + _this.nodeIndex + "_" + _this.instances.size;
          var instance = createProviderProperty(propName, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager, _this);
          if (isDirectiveWrapper) {
            _this.directiveWrapperInstance.set(tokenReference(resolvedProvider.token), instance);
            _this.instances.set(tokenReference(resolvedProvider.token), DirectiveWrapperExpressions.context(instance));
          } else {
            _this.instances.set(tokenReference(resolvedProvider.token), instance);
          }
        });
        var _loop_1 = function(i) {
          var directive = this_1._directives[i];
          var directiveInstance = this_1.instances.get(tokenReference(identifierToken(directive.type)));
          directive.queries.forEach(function(queryMeta) {
            _this._addQuery(queryMeta, directiveInstance);
          });
        };
        var this_1 = this;
        for (var i = 0; i < this._directives.length; i++) {
          _loop_1(i);
        }
        Object.keys(this.referenceTokens).forEach(function(varName) {
          var token = _this.referenceTokens[varName];
          var varValue;
          if (token) {
            varValue = _this.instances.get(tokenReference(token));
          } else {
            varValue = _this.renderNode;
          }
          _this.view.locals.set(varName, varValue);
        });
      };
      CompileElement.prototype.afterChildren = function(childNodeCount) {
        var _this = this;
        Array.from(this._resolvedProviders.values()).forEach(function(resolvedProvider) {
          var providerExpr = _this.instances.get(tokenReference(resolvedProvider.token));
          var providerChildNodeCount = resolvedProvider.providerType === ProviderAstType.PrivateService ? 0 : childNodeCount;
          _this.view.injectorGetMethod.addStmt(createInjectInternalCondition(_this.nodeIndex, providerChildNodeCount, resolvedProvider, providerExpr));
        });
      };
      CompileElement.prototype.finish = function() {
        var _this = this;
        Array.from(this._queries.values()).forEach(function(queries) {
          return queries.forEach(function(q) {
            return q.generateStatements(_this.view.createMethod, _this.view.updateContentQueriesMethod);
          });
        });
      };
      CompileElement.prototype.addContentNode = function(ngContentIndex, nodeExpr) {
        this.contentNodesByNgContentIndex[ngContentIndex].push(nodeExpr);
      };
      CompileElement.prototype.getComponent = function() {
        return isPresent(this.component) ? this.instances.get(tokenReference(identifierToken(this.component.type))) : null;
      };
      CompileElement.prototype.getProviderTokens = function() {
        return Array.from(this._resolvedProviders.values()).map(function(provider) {
          return provider.token;
        });
      };
      CompileElement.prototype.getQueriesFor = function(token) {
        var result = [];
        var currentEl = this;
        var distance = 0;
        var queries;
        while (!currentEl.isNull()) {
          queries = currentEl._queries.get(tokenReference(token));
          if (isPresent(queries)) {
            result.push.apply(result, queries.filter(function(query) {
              return query.meta.descendants || distance <= 1;
            }));
          }
          if (currentEl._directives.length > 0) {
            distance++;
          }
          currentEl = currentEl.parent;
        }
        queries = this.view.componentView.viewQueries.get(tokenReference(token));
        if (isPresent(queries)) {
          result.push.apply(result, queries);
        }
        return result;
      };
      CompileElement.prototype._addQuery = function(queryMeta, directiveInstance) {
        var propName = "_query_" + tokenName(queryMeta.selectors[0]) + "_" + this.nodeIndex + "_" + this._queryCount++;
        var queryList = createQueryList(propName, this.view);
        var query = new CompileQuery(queryMeta, queryList, directiveInstance, this.view);
        addQueryToTokenMap(this._queries, query);
        return query;
      };
      CompileElement.prototype._getLocalDependency = function(requestingProviderType, dep) {
        var result = null;
        if (isPresent(dep.token)) {
          if (!result) {
            if (tokenReference(dep.token) === resolveIdentifier(Identifiers.ChangeDetectorRef)) {
              if (requestingProviderType === ProviderAstType.Component) {
                return this.compViewExpr.prop('ref');
              } else {
                return getPropertyInView(THIS_EXPR.prop('ref'), this.view, this.view.componentView);
              }
            }
          }
          if (!result) {
            var resolvedProvider = this._resolvedProviders.get(tokenReference(dep.token));
            if (resolvedProvider && (requestingProviderType === ProviderAstType.Directive || requestingProviderType === ProviderAstType.PublicService) && resolvedProvider.providerType === ProviderAstType.PrivateService) {
              return null;
            }
            result = this.instances.get(tokenReference(dep.token));
          }
        }
        return result;
      };
      CompileElement.prototype._getDependency = function(requestingProviderType, dep) {
        var currElement = this;
        var result = null;
        if (dep.isValue) {
          result = literal(dep.value);
        }
        if (!result && !dep.isSkipSelf) {
          result = this._getLocalDependency(requestingProviderType, dep);
        }
        while (!result && !currElement.parent.isNull()) {
          currElement = currElement.parent;
          result = currElement._getLocalDependency(ProviderAstType.PublicService, {token: dep.token});
        }
        if (!result) {
          result = injectFromViewParentInjector(this.view, dep.token, dep.isOptional);
        }
        if (!result) {
          result = NULL_EXPR;
        }
        return getPropertyInView(result, this.view, currElement.view);
      };
      return CompileElement;
    }(CompileNode));
    function createInjectInternalCondition(nodeIndex, childNodeCount, provider, providerExpr) {
      var indexCondition;
      if (childNodeCount > 0) {
        indexCondition = literal(nodeIndex).lowerEquals(InjectMethodVars$1.requestNodeIndex).and(InjectMethodVars$1.requestNodeIndex.lowerEquals(literal(nodeIndex + childNodeCount)));
      } else {
        indexCondition = literal(nodeIndex).identical(InjectMethodVars$1.requestNodeIndex);
      }
      return new IfStmt(InjectMethodVars$1.token.identical(createDiTokenExpression(provider.token)).and(indexCondition), [new ReturnStatement(providerExpr)]);
    }
    function createProviderProperty(propName, providerValueExpressions, isMulti, isEager, compileElement) {
      var view = compileElement.view;
      var resolvedProviderValueExpr;
      var type;
      if (isMulti) {
        resolvedProviderValueExpr = literalArr(providerValueExpressions);
        type = new ArrayType(DYNAMIC_TYPE);
      } else {
        resolvedProviderValueExpr = providerValueExpressions[0];
        type = providerValueExpressions[0].type;
      }
      if (!type) {
        type = DYNAMIC_TYPE;
      }
      if (isEager) {
        view.fields.push(new ClassField(propName, type));
        view.createMethod.addStmt(THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
      } else {
        var internalField = "_" + propName;
        view.fields.push(new ClassField(internalField, type));
        var getter = new CompileMethod(view);
        getter.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
        getter.addStmt(new IfStmt(THIS_EXPR.prop(internalField).isBlank(), [THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]));
        getter.addStmt(new ReturnStatement(THIS_EXPR.prop(internalField)));
        view.getters.push(new ClassGetter(propName, getter.finish(), type));
      }
      return THIS_EXPR.prop(propName);
    }
    var CompilePipe = (function() {
      function CompilePipe(view, meta) {
        var _this = this;
        this.view = view;
        this.meta = meta;
        this._purePipeProxyCount = 0;
        this.instance = THIS_EXPR.prop("_pipe_" + meta.name + "_" + view.pipeCount++);
        var deps = this.meta.type.diDeps.map(function(diDep) {
          if (tokenReference(diDep.token) === resolveIdentifier(Identifiers.ChangeDetectorRef)) {
            return getPropertyInView(THIS_EXPR.prop('ref'), _this.view, _this.view.componentView);
          }
          return injectFromViewParentInjector(view, diDep.token, false);
        });
        this.view.fields.push(new ClassField(this.instance.name, importType(this.meta.type)));
        this.view.createMethod.resetDebugInfo(null, null);
        this.view.createMethod.addStmt(THIS_EXPR.prop(this.instance.name).set(importExpr(this.meta.type).instantiate(deps)).toStmt());
      }
      CompilePipe.call = function(view, name, args) {
        var compView = view.componentView;
        var meta = _findPipeMeta(compView, name);
        var pipe;
        if (meta.pure) {
          pipe = compView.purePipes.get(name);
          if (!pipe) {
            pipe = new CompilePipe(compView, meta);
            compView.purePipes.set(name, pipe);
            compView.pipes.push(pipe);
          }
        } else {
          pipe = new CompilePipe(view, meta);
          view.pipes.push(pipe);
        }
        return pipe._call(view, args);
      };
      Object.defineProperty(CompilePipe.prototype, "pure", {
        get: function() {
          return this.meta.pure;
        },
        enumerable: true,
        configurable: true
      });
      CompilePipe.prototype._call = function(callingView, args) {
        if (this.meta.pure) {
          var purePipeProxyInstance = THIS_EXPR.prop(this.instance.name + "_" + this._purePipeProxyCount++);
          var pipeInstanceSeenFromPureProxy = getPropertyInView(this.instance, callingView, this.view);
          createPureProxy(pipeInstanceSeenFromPureProxy.prop('transform').callMethod(BuiltinMethod.Bind, [pipeInstanceSeenFromPureProxy]), args.length, purePipeProxyInstance, {
            fields: callingView.fields,
            ctorStmts: callingView.createMethod
          });
          return importExpr(createIdentifier(Identifiers.castByValue)).callFn([purePipeProxyInstance, pipeInstanceSeenFromPureProxy.prop('transform')]).callFn(args);
        } else {
          return getPropertyInView(this.instance, callingView, this.view).callMethod('transform', args);
        }
      };
      return CompilePipe;
    }());
    function _findPipeMeta(view, name) {
      var pipeMeta = null;
      for (var i = view.pipeMetas.length - 1; i >= 0; i--) {
        var localPipeMeta = view.pipeMetas[i];
        if (localPipeMeta.name == name) {
          pipeMeta = localPipeMeta;
          break;
        }
      }
      if (!pipeMeta) {
        throw new Error("Illegal state: Could not find pipe " + name + " although the parser should have detected this error!");
      }
      return pipeMeta;
    }
    var CompileViewRootNodeType = {};
    CompileViewRootNodeType.Node = 0;
    CompileViewRootNodeType.ViewContainer = 1;
    CompileViewRootNodeType.NgContent = 2;
    CompileViewRootNodeType[CompileViewRootNodeType.Node] = "Node";
    CompileViewRootNodeType[CompileViewRootNodeType.ViewContainer] = "ViewContainer";
    CompileViewRootNodeType[CompileViewRootNodeType.NgContent] = "NgContent";
    var CompileViewRootNode = (function() {
      function CompileViewRootNode(type, expr, ngContentIndex) {
        this.type = type;
        this.expr = expr;
        this.ngContentIndex = ngContentIndex;
      }
      return CompileViewRootNode;
    }());
    var CompileView = (function() {
      function CompileView(component, genConfig, pipeMetas, styles, animations, viewIndex, declarationElement, templateVariableBindings, targetDependencies) {
        var _this = this;
        this.component = component;
        this.genConfig = genConfig;
        this.pipeMetas = pipeMetas;
        this.styles = styles;
        this.animations = animations;
        this.viewIndex = viewIndex;
        this.declarationElement = declarationElement;
        this.templateVariableBindings = templateVariableBindings;
        this.targetDependencies = targetDependencies;
        this.viewChildren = [];
        this.nodes = [];
        this.rootNodes = [];
        this.lastRenderNode = NULL_EXPR;
        this.viewContainers = [];
        this.methods = [];
        this.ctorStmts = [];
        this.fields = [];
        this.getters = [];
        this.disposables = [];
        this.purePipes = new Map();
        this.pipes = [];
        this.locals = new Map();
        this.literalArrayCount = 0;
        this.literalMapCount = 0;
        this.pipeCount = 0;
        this.createMethod = new CompileMethod(this);
        this.animationBindingsMethod = new CompileMethod(this);
        this.injectorGetMethod = new CompileMethod(this);
        this.updateContentQueriesMethod = new CompileMethod(this);
        this.dirtyParentQueriesMethod = new CompileMethod(this);
        this.updateViewQueriesMethod = new CompileMethod(this);
        this.detectChangesInInputsMethod = new CompileMethod(this);
        this.detectChangesRenderPropertiesMethod = new CompileMethod(this);
        this.afterContentLifecycleCallbacksMethod = new CompileMethod(this);
        this.afterViewLifecycleCallbacksMethod = new CompileMethod(this);
        this.destroyMethod = new CompileMethod(this);
        this.detachMethod = new CompileMethod(this);
        this.viewType = getViewType(component, viewIndex);
        this.className = getViewClassName(component, viewIndex);
        this.classType = expressionType(variable(this.className));
        this.classExpr = variable(this.className);
        if (this.viewType === ViewType.COMPONENT || this.viewType === ViewType.HOST) {
          this.componentView = this;
        } else {
          this.componentView = this.declarationElement.view.componentView;
        }
        this.componentContext = getPropertyInView(THIS_EXPR.prop('context'), this, this.componentView);
        var viewQueries = new Map();
        if (this.viewType === ViewType.COMPONENT) {
          var directiveInstance_1 = THIS_EXPR.prop('context');
          this.component.viewQueries.forEach(function(queryMeta, queryIndex) {
            var propName = "_viewQuery_" + tokenName(queryMeta.selectors[0]) + "_" + queryIndex;
            var queryList = createQueryList(propName, _this);
            var query = new CompileQuery(queryMeta, queryList, directiveInstance_1, _this);
            addQueryToTokenMap(viewQueries, query);
          });
        }
        this.viewQueries = viewQueries;
        templateVariableBindings.forEach(function(entry) {
          _this.locals.set(entry[1], THIS_EXPR.prop('context').prop(entry[0]));
        });
        if (!this.declarationElement.isNull()) {
          this.declarationElement.setEmbeddedView(this);
        }
      }
      CompileView.prototype.callPipe = function(name, input, args) {
        return CompilePipe.call(this, name, [input].concat(args));
      };
      CompileView.prototype.getLocal = function(name) {
        if (name == EventHandlerVars.event.name) {
          return EventHandlerVars.event;
        }
        var currView = this;
        var result = currView.locals.get(name);
        while (!result && isPresent(currView.declarationElement.view)) {
          currView = currView.declarationElement.view;
          result = currView.locals.get(name);
        }
        if (isPresent(result)) {
          return getPropertyInView(result, this, currView);
        } else {
          return null;
        }
      };
      CompileView.prototype.finish = function() {
        var _this = this;
        Array.from(this.viewQueries.values()).forEach(function(queries) {
          return queries.forEach(function(q) {
            return q.generateStatements(_this.createMethod, _this.updateViewQueriesMethod);
          });
        });
      };
      return CompileView;
    }());
    function getViewType(component, embeddedTemplateIndex) {
      if (embeddedTemplateIndex > 0) {
        return ViewType.EMBEDDED;
      }
      if (component.isHost) {
        return ViewType.HOST;
      }
      return ViewType.COMPONENT;
    }
    function bindOutputs(boundEvents, directives, compileElement, bindToRenderer) {
      var usedEvents = collectEvents(boundEvents, directives);
      if (!usedEvents.size) {
        return false;
      }
      if (bindToRenderer) {
        subscribeToRenderEvents(usedEvents, compileElement);
      }
      subscribeToDirectiveEvents(usedEvents, directives, compileElement);
      generateHandleEventMethod(boundEvents, directives, compileElement);
      return true;
    }
    function collectEvents(boundEvents, directives) {
      var usedEvents = new Map();
      boundEvents.forEach(function(event) {
        usedEvents.set(event.fullName, event);
      });
      directives.forEach(function(dirAst) {
        dirAst.hostEvents.forEach(function(event) {
          usedEvents.set(event.fullName, event);
        });
      });
      return usedEvents;
    }
    function subscribeToRenderEvents(usedEvents, compileElement) {
      var eventAndTargetExprs = [];
      usedEvents.forEach(function(event) {
        if (!event.phase) {
          eventAndTargetExprs.push(literal(event.name), literal(event.target));
        }
      });
      if (eventAndTargetExprs.length) {
        var disposableVar = variable("disposable_" + compileElement.view.disposables.length);
        compileElement.view.disposables.push(disposableVar);
        compileElement.view.createMethod.addStmt(disposableVar.set(importExpr(createIdentifier(Identifiers.subscribeToRenderElement)).callFn([THIS_EXPR, compileElement.renderNode, createInlineArray(eventAndTargetExprs), handleEventExpr(compileElement)])).toDeclStmt(FUNCTION_TYPE, [StmtModifier.Private]));
      }
    }
    function subscribeToDirectiveEvents(usedEvents, directives, compileElement) {
      var usedEventNames = Array.from(usedEvents.keys());
      directives.forEach(function(dirAst) {
        var dirWrapper = compileElement.directiveWrapperInstance.get(dirAst.directive.type.reference);
        compileElement.view.createMethod.addStmts(DirectiveWrapperExpressions.subscribe(dirAst.directive, dirAst.hostProperties, usedEventNames, dirWrapper, THIS_EXPR, handleEventExpr(compileElement)));
      });
    }
    function generateHandleEventMethod(boundEvents, directives, compileElement) {
      var hasComponentHostListener = directives.some(function(dirAst) {
        return dirAst.hostEvents.some(function(event) {
          return dirAst.directive.isComponent;
        });
      });
      var markPathToRootStart = hasComponentHostListener ? compileElement.compViewExpr : THIS_EXPR;
      var handleEventStmts = new CompileMethod(compileElement.view);
      handleEventStmts.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
      handleEventStmts.push(markPathToRootStart.callMethod('markPathToRootAsCheckOnce', []).toStmt());
      var eventNameVar = variable('eventName');
      var resultVar = variable('result');
      handleEventStmts.push(resultVar.set(literal(true)).toDeclStmt(BOOL_TYPE));
      directives.forEach(function(dirAst, dirIdx) {
        var dirWrapper = compileElement.directiveWrapperInstance.get(dirAst.directive.type.reference);
        if (dirAst.hostEvents.length > 0) {
          handleEventStmts.push(resultVar.set(DirectiveWrapperExpressions.handleEvent(dirAst.hostEvents, dirWrapper, eventNameVar, EventHandlerVars.event).and(resultVar)).toStmt());
        }
      });
      boundEvents.forEach(function(renderEvent, renderEventIdx) {
        var evalResult = convertActionBinding(compileElement.view, compileElement.view, compileElement.view.componentContext, renderEvent.handler, "sub_" + renderEventIdx);
        var trueStmts = evalResult.stmts;
        if (evalResult.preventDefault) {
          trueStmts.push(resultVar.set(evalResult.preventDefault.and(resultVar)).toStmt());
        }
        handleEventStmts.push(new IfStmt(eventNameVar.equals(literal(renderEvent.fullName)), trueStmts));
      });
      handleEventStmts.push(new ReturnStatement(resultVar));
      compileElement.view.methods.push(new ClassMethod(getHandleEventMethodName(compileElement.nodeIndex), [new FnParam(eventNameVar.name, STRING_TYPE), new FnParam(EventHandlerVars.event.name, DYNAMIC_TYPE)], handleEventStmts.finish(), BOOL_TYPE));
    }
    function handleEventExpr(compileElement) {
      var handleEventMethodName = getHandleEventMethodName(compileElement.nodeIndex);
      return THIS_EXPR.callMethod('eventHandler', [THIS_EXPR.prop(handleEventMethodName)]);
    }
    var STATE_IS_NEVER_CHECKED = THIS_EXPR.prop('numberOfChecks').identical(new LiteralExpr(0));
    var NOT_THROW_ON_CHANGES = not(DetectChangesVars.throwOnChange);
    function bindDirectiveAfterContentLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
      var view = compileElement.view;
      var lifecycleHooks = directiveMeta.type.lifecycleHooks;
      var afterContentLifecycleCallbacksMethod = view.afterContentLifecycleCallbacksMethod;
      afterContentLifecycleCallbacksMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
      if (lifecycleHooks.indexOf(LifecycleHooks.AfterContentInit) !== -1) {
        afterContentLifecycleCallbacksMethod.addStmt(new IfStmt(STATE_IS_NEVER_CHECKED, [directiveInstance.callMethod('ngAfterContentInit', []).toStmt()]));
      }
      if (lifecycleHooks.indexOf(LifecycleHooks.AfterContentChecked) !== -1) {
        afterContentLifecycleCallbacksMethod.addStmt(directiveInstance.callMethod('ngAfterContentChecked', []).toStmt());
      }
    }
    function bindDirectiveAfterViewLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
      var view = compileElement.view;
      var lifecycleHooks = directiveMeta.type.lifecycleHooks;
      var afterViewLifecycleCallbacksMethod = view.afterViewLifecycleCallbacksMethod;
      afterViewLifecycleCallbacksMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
      if (lifecycleHooks.indexOf(LifecycleHooks.AfterViewInit) !== -1) {
        afterViewLifecycleCallbacksMethod.addStmt(new IfStmt(STATE_IS_NEVER_CHECKED, [directiveInstance.callMethod('ngAfterViewInit', []).toStmt()]));
      }
      if (lifecycleHooks.indexOf(LifecycleHooks.AfterViewChecked) !== -1) {
        afterViewLifecycleCallbacksMethod.addStmt(directiveInstance.callMethod('ngAfterViewChecked', []).toStmt());
      }
    }
    function bindDirectiveWrapperLifecycleCallbacks(dir, directiveWrapperIntance, compileElement) {
      compileElement.view.destroyMethod.addStmts(DirectiveWrapperExpressions.ngOnDestroy(dir.directive, directiveWrapperIntance));
      compileElement.view.detachMethod.addStmts(DirectiveWrapperExpressions.ngOnDetach(dir.hostProperties, directiveWrapperIntance, THIS_EXPR, compileElement.compViewExpr || THIS_EXPR, compileElement.renderNode));
    }
    function bindInjectableDestroyLifecycleCallbacks(provider, providerInstance, compileElement) {
      var onDestroyMethod = compileElement.view.destroyMethod;
      onDestroyMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
      if (provider.providerType !== ProviderAstType.Directive && provider.providerType !== ProviderAstType.Component && provider.lifecycleHooks.indexOf(LifecycleHooks.OnDestroy) !== -1) {
        onDestroyMethod.addStmt(providerInstance.callMethod('ngOnDestroy', []).toStmt());
      }
    }
    function bindPipeDestroyLifecycleCallbacks(pipeMeta, pipeInstance, view) {
      var onDestroyMethod = view.destroyMethod;
      if (pipeMeta.type.lifecycleHooks.indexOf(LifecycleHooks.OnDestroy) !== -1) {
        onDestroyMethod.addStmt(pipeInstance.callMethod('ngOnDestroy', []).toStmt());
      }
    }
    function bindRenderText(boundText, compileNode, view) {
      var valueField = createCheckBindingField(view);
      var evalResult = convertPropertyBinding(view, view, view.componentContext, boundText.value, valueField.bindingId);
      if (!evalResult) {
        return null;
      }
      view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileNode.nodeIndex, boundText);
      view.detectChangesRenderPropertiesMethod.addStmts(createCheckBindingStmt(evalResult, valueField.expression, DetectChangesVars.throwOnChange, [THIS_EXPR.prop('renderer').callMethod('setText', [compileNode.renderNode, evalResult.currValExpr]).toStmt()]));
    }
    function bindRenderInputs(boundProps, boundOutputs, hasEvents, compileElement) {
      var view = compileElement.view;
      var renderNode = compileElement.renderNode;
      boundProps.forEach(function(boundProp) {
        var bindingField = createCheckBindingField(view);
        view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileElement.nodeIndex, boundProp);
        var evalResult = convertPropertyBinding(view, view, compileElement.view.componentContext, boundProp.value, bindingField.bindingId);
        if (!evalResult) {
          return;
        }
        var checkBindingStmts = [];
        var compileMethod = view.detectChangesRenderPropertiesMethod;
        switch (boundProp.type) {
          case PropertyBindingType.Property:
          case PropertyBindingType.Attribute:
          case PropertyBindingType.Class:
          case PropertyBindingType.Style:
            checkBindingStmts.push.apply(checkBindingStmts, writeToRenderer(THIS_EXPR, boundProp, renderNode, evalResult.currValExpr, view.genConfig.logBindingUpdate));
            break;
          case PropertyBindingType.Animation:
            compileMethod = view.animationBindingsMethod;
            var _a = triggerAnimation(THIS_EXPR, THIS_EXPR, boundProp, boundOutputs, (hasEvents ? THIS_EXPR.prop(getHandleEventMethodName(compileElement.nodeIndex)) : importExpr(createIdentifier(Identifiers.noop))).callMethod(BuiltinMethod.Bind, [THIS_EXPR]), compileElement.renderNode, evalResult.currValExpr, bindingField.expression),
                updateStmts = _a.updateStmts,
                detachStmts = _a.detachStmts;
            checkBindingStmts.push.apply(checkBindingStmts, updateStmts);
            view.detachMethod.addStmts(detachStmts);
            break;
        }
        compileMethod.addStmts(createCheckBindingStmt(evalResult, bindingField.expression, DetectChangesVars.throwOnChange, checkBindingStmts));
      });
    }
    function bindDirectiveHostProps(directiveAst, directiveWrapperInstance, compileElement, elementName, schemaRegistry) {
      var runtimeSecurityCtxExprs = directiveAst.hostProperties.filter(function(boundProp) {
        return boundProp.needsRuntimeSecurityContext;
      }).map(function(boundProp) {
        var ctx;
        switch (boundProp.type) {
          case PropertyBindingType.Property:
            ctx = schemaRegistry.securityContext(elementName, boundProp.name, false);
            break;
          case PropertyBindingType.Attribute:
            ctx = schemaRegistry.securityContext(elementName, boundProp.name, true);
            break;
          default:
            throw new Error("Illegal state: Only property / attribute bindings can have an unknown security context! Binding " + boundProp.name);
        }
        return createEnumExpression(Identifiers.SecurityContext, ctx);
      });
      compileElement.view.detectChangesRenderPropertiesMethod.addStmts(DirectiveWrapperExpressions.checkHost(directiveAst.hostProperties, directiveWrapperInstance, THIS_EXPR, compileElement.compViewExpr || THIS_EXPR, compileElement.renderNode, DetectChangesVars.throwOnChange, runtimeSecurityCtxExprs));
    }
    function bindDirectiveInputs(directiveAst, directiveWrapperInstance, dirIndex, compileElement) {
      var view = compileElement.view;
      var detectChangesInInputsMethod = view.detectChangesInInputsMethod;
      detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
      directiveAst.inputs.forEach(function(input, inputIdx) {
        var bindingId = compileElement.nodeIndex + "_" + dirIndex + "_" + inputIdx;
        detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, input);
        var evalResult = convertPropertyBinding(view, view, view.componentContext, input.value, bindingId);
        if (!evalResult) {
          return;
        }
        detectChangesInInputsMethod.addStmts(evalResult.stmts);
        detectChangesInInputsMethod.addStmt(directiveWrapperInstance.callMethod("check_" + input.directiveName, [evalResult.currValExpr, DetectChangesVars.throwOnChange, evalResult.forceUpdate || literal(false)]).toStmt());
      });
      var isOnPushComp = directiveAst.directive.isComponent && !isDefaultChangeDetectionStrategy(directiveAst.directive.changeDetection);
      var directiveDetectChangesExpr = DirectiveWrapperExpressions.ngDoCheck(directiveWrapperInstance, THIS_EXPR, compileElement.renderNode, DetectChangesVars.throwOnChange);
      var directiveDetectChangesStmt = isOnPushComp ? new IfStmt(directiveDetectChangesExpr, [compileElement.compViewExpr.callMethod('markAsCheckOnce', []).toStmt()]) : directiveDetectChangesExpr.toStmt();
      detectChangesInInputsMethod.addStmt(directiveDetectChangesStmt);
    }
    function bindQueryValues(ce) {
      var queriesWithReads = [];
      ce.getProviderTokens().forEach(function(token) {
        var queriesForProvider = ce.getQueriesFor(token);
        queriesWithReads.push.apply(queriesWithReads, queriesForProvider.map(function(query) {
          return new _QueryWithRead(query, token);
        }));
      });
      Object.keys(ce.referenceTokens).forEach(function(varName) {
        var varToken = {value: varName};
        queriesWithReads.push.apply(queriesWithReads, ce.getQueriesFor(varToken).map(function(query) {
          return new _QueryWithRead(query, varToken);
        }));
      });
      queriesWithReads.forEach(function(queryWithRead) {
        var value;
        if (queryWithRead.read.identifier) {
          value = ce.instances.get(tokenReference(queryWithRead.read));
        } else {
          var token = ce.referenceTokens[queryWithRead.read.value];
          if (token) {
            value = ce.instances.get(tokenReference(token));
          } else {
            value = ce.elementRef;
          }
        }
        if (value) {
          queryWithRead.query.addValue(value, ce.view);
        }
      });
    }
    var _QueryWithRead = (function() {
      function _QueryWithRead(query, match) {
        this.query = query;
        this.read = query.meta.read || match;
      }
      return _QueryWithRead;
    }());
    function bindView(view, parsedTemplate, schemaRegistry) {
      var visitor = new ViewBinderVisitor(view, schemaRegistry);
      templateVisitAll(visitor, parsedTemplate);
      view.pipes.forEach(function(pipe) {
        bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view);
      });
    }
    var ViewBinderVisitor = (function() {
      function ViewBinderVisitor(view, _schemaRegistry) {
        this.view = view;
        this._schemaRegistry = _schemaRegistry;
        this._nodeIndex = 0;
      }
      ViewBinderVisitor.prototype.visitBoundText = function(ast, parent) {
        var node = this.view.nodes[this._nodeIndex++];
        bindRenderText(ast, node, this.view);
        return null;
      };
      ViewBinderVisitor.prototype.visitText = function(ast, parent) {
        this._nodeIndex++;
        return null;
      };
      ViewBinderVisitor.prototype.visitNgContent = function(ast, parent) {
        return null;
      };
      ViewBinderVisitor.prototype.visitElement = function(ast, parent) {
        var _this = this;
        var compileElement = (this.view.nodes[this._nodeIndex++]);
        bindQueryValues(compileElement);
        var hasEvents = bindOutputs(ast.outputs, ast.directives, compileElement, true);
        bindRenderInputs(ast.inputs, ast.outputs, hasEvents, compileElement);
        ast.directives.forEach(function(directiveAst, dirIndex) {
          var directiveWrapperInstance = compileElement.directiveWrapperInstance.get(directiveAst.directive.type.reference);
          bindDirectiveInputs(directiveAst, directiveWrapperInstance, dirIndex, compileElement);
          bindDirectiveHostProps(directiveAst, directiveWrapperInstance, compileElement, ast.name, _this._schemaRegistry);
        });
        templateVisitAll(this, ast.children, compileElement);
        ast.directives.forEach(function(directiveAst) {
          var directiveInstance = compileElement.instances.get(directiveAst.directive.type.reference);
          var directiveWrapperInstance = compileElement.directiveWrapperInstance.get(directiveAst.directive.type.reference);
          bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
          bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
          bindDirectiveWrapperLifecycleCallbacks(directiveAst, directiveWrapperInstance, compileElement);
        });
        ast.providers.forEach(function(providerAst) {
          var providerInstance = compileElement.instances.get(tokenReference(providerAst.token));
          bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        return null;
      };
      ViewBinderVisitor.prototype.visitEmbeddedTemplate = function(ast, parent) {
        var compileElement = (this.view.nodes[this._nodeIndex++]);
        bindQueryValues(compileElement);
        bindOutputs(ast.outputs, ast.directives, compileElement, false);
        ast.directives.forEach(function(directiveAst, dirIndex) {
          var directiveInstance = compileElement.instances.get(directiveAst.directive.type.reference);
          var directiveWrapperInstance = compileElement.directiveWrapperInstance.get(directiveAst.directive.type.reference);
          bindDirectiveInputs(directiveAst, directiveWrapperInstance, dirIndex, compileElement);
          bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
          bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
          bindDirectiveWrapperLifecycleCallbacks(directiveAst, directiveWrapperInstance, compileElement);
        });
        ast.providers.forEach(function(providerAst) {
          var providerInstance = compileElement.instances.get(tokenReference(providerAst.token));
          bindInjectableDestroyLifecycleCallbacks(providerAst, providerInstance, compileElement);
        });
        bindView(compileElement.embeddedView, ast.children, this._schemaRegistry);
        return null;
      };
      ViewBinderVisitor.prototype.visitAttr = function(ast, ctx) {
        return null;
      };
      ViewBinderVisitor.prototype.visitDirective = function(ast, ctx) {
        return null;
      };
      ViewBinderVisitor.prototype.visitEvent = function(ast, eventTargetAndNames) {
        return null;
      };
      ViewBinderVisitor.prototype.visitReference = function(ast, ctx) {
        return null;
      };
      ViewBinderVisitor.prototype.visitVariable = function(ast, ctx) {
        return null;
      };
      ViewBinderVisitor.prototype.visitDirectiveProperty = function(ast, context) {
        return null;
      };
      ViewBinderVisitor.prototype.visitElementProperty = function(ast, context) {
        return null;
      };
      return ViewBinderVisitor;
    }());
    var IMPLICIT_TEMPLATE_VAR = '\$implicit';
    var CLASS_ATTR$1 = 'class';
    var STYLE_ATTR = 'style';
    var NG_CONTAINER_TAG = 'ng-container';
    var parentRenderNodeVar = variable('parentRenderNode');
    var rootSelectorVar = variable('rootSelector');
    function buildView(view, template, targetDependencies) {
      var builderVisitor = new ViewBuilderVisitor(view, targetDependencies);
      var parentEl = view.declarationElement.isNull() ? view.declarationElement : view.declarationElement.parent;
      templateVisitAll(builderVisitor, template, parentEl);
      if (view.viewType === ViewType.EMBEDDED || view.viewType === ViewType.HOST) {
        view.lastRenderNode = builderVisitor.getOrCreateLastRenderNode();
      }
      return builderVisitor.nestedViewCount;
    }
    function finishView(view, targetStatements) {
      view.nodes.forEach(function(node) {
        if (node instanceof CompileElement) {
          node.finish();
          if (node.hasEmbeddedView) {
            finishView(node.embeddedView, targetStatements);
          }
        }
      });
      view.finish();
      createViewTopLevelStmts(view, targetStatements);
    }
    var ViewBuilderVisitor = (function() {
      function ViewBuilderVisitor(view, targetDependencies) {
        this.view = view;
        this.targetDependencies = targetDependencies;
        this.nestedViewCount = 0;
      }
      ViewBuilderVisitor.prototype._isRootNode = function(parent) {
        return parent.view !== this.view;
      };
      ViewBuilderVisitor.prototype._addRootNodeAndProject = function(node) {
        var projectedNode = _getOuterContainerOrSelf(node);
        var parent = projectedNode.parent;
        var ngContentIndex = ((projectedNode.sourceAst)).ngContentIndex;
        var viewContainer = (node instanceof CompileElement && node.hasViewContainer) ? node.viewContainer : null;
        if (this._isRootNode(parent)) {
          if (this.view.viewType !== ViewType.COMPONENT) {
            this.view.rootNodes.push(new CompileViewRootNode(viewContainer ? CompileViewRootNodeType.ViewContainer : CompileViewRootNodeType.Node, viewContainer || node.renderNode));
          }
        } else if (isPresent(parent.component) && isPresent(ngContentIndex)) {
          parent.addContentNode(ngContentIndex, new CompileViewRootNode(viewContainer ? CompileViewRootNodeType.ViewContainer : CompileViewRootNodeType.Node, viewContainer || node.renderNode));
        }
      };
      ViewBuilderVisitor.prototype._getParentRenderNode = function(parent) {
        parent = _getOuterContainerParentOrSelf(parent);
        if (this._isRootNode(parent)) {
          if (this.view.viewType === ViewType.COMPONENT) {
            return parentRenderNodeVar;
          } else {
            return NULL_EXPR;
          }
        } else {
          return isPresent(parent.component) && parent.component.template.encapsulation !== _angular_core.ViewEncapsulation.Native ? NULL_EXPR : parent.renderNode;
        }
      };
      ViewBuilderVisitor.prototype.getOrCreateLastRenderNode = function() {
        var view = this.view;
        if (view.rootNodes.length === 0 || view.rootNodes[view.rootNodes.length - 1].type !== CompileViewRootNodeType.Node) {
          var fieldName = "_el_" + view.nodes.length;
          view.fields.push(new ClassField(fieldName, importType(view.genConfig.renderTypes.renderElement)));
          view.createMethod.addStmt(THIS_EXPR.prop(fieldName).set(ViewProperties.renderer.callMethod('createTemplateAnchor', [NULL_EXPR, NULL_EXPR])).toStmt());
          view.rootNodes.push(new CompileViewRootNode(CompileViewRootNodeType.Node, THIS_EXPR.prop(fieldName)));
        }
        return view.rootNodes[view.rootNodes.length - 1].expr;
      };
      ViewBuilderVisitor.prototype.visitBoundText = function(ast, parent) {
        return this._visitText(ast, '', parent);
      };
      ViewBuilderVisitor.prototype.visitText = function(ast, parent) {
        return this._visitText(ast, ast.value, parent);
      };
      ViewBuilderVisitor.prototype._visitText = function(ast, value, parent) {
        var fieldName = "_text_" + this.view.nodes.length;
        this.view.fields.push(new ClassField(fieldName, importType(this.view.genConfig.renderTypes.renderText)));
        var renderNode = THIS_EXPR.prop(fieldName);
        var compileNode = new CompileNode(parent, this.view, this.view.nodes.length, renderNode, ast);
        var createRenderNode = THIS_EXPR.prop(fieldName).set(ViewProperties.renderer.callMethod('createText', [this._getParentRenderNode(parent), literal(value), this.view.createMethod.resetDebugInfoExpr(this.view.nodes.length, ast)])).toStmt();
        this.view.nodes.push(compileNode);
        this.view.createMethod.addStmt(createRenderNode);
        this._addRootNodeAndProject(compileNode);
        return renderNode;
      };
      ViewBuilderVisitor.prototype.visitNgContent = function(ast, parent) {
        this.view.createMethod.resetDebugInfo(null, ast);
        var parentRenderNode = this._getParentRenderNode(parent);
        if (parentRenderNode !== NULL_EXPR) {
          this.view.createMethod.addStmt(THIS_EXPR.callMethod('projectNodes', [parentRenderNode, literal(ast.index)]).toStmt());
        } else if (this._isRootNode(parent)) {
          if (this.view.viewType !== ViewType.COMPONENT) {
            this.view.rootNodes.push(new CompileViewRootNode(CompileViewRootNodeType.NgContent, null, ast.index));
          }
        } else {
          if (isPresent(parent.component) && isPresent(ast.ngContentIndex)) {
            parent.addContentNode(ast.ngContentIndex, new CompileViewRootNode(CompileViewRootNodeType.NgContent, null, ast.index));
          }
        }
        return null;
      };
      ViewBuilderVisitor.prototype.visitElement = function(ast, parent) {
        var nodeIndex = this.view.nodes.length;
        var createRenderNodeExpr;
        var debugContextExpr = this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast);
        var directives = ast.directives.map(function(directiveAst) {
          return directiveAst.directive;
        });
        var component = directives.find(function(directive) {
          return directive.isComponent;
        });
        if (ast.name === NG_CONTAINER_TAG) {
          createRenderNodeExpr = ViewProperties.renderer.callMethod('createTemplateAnchor', [this._getParentRenderNode(parent), debugContextExpr]);
        } else {
          var htmlAttrs = _readHtmlAttrs(ast.attrs);
          var attrNameAndValues = createInlineArray(_mergeHtmlAndDirectiveAttrs(htmlAttrs, directives).map(function(v) {
            return literal(v);
          }));
          if (nodeIndex === 0 && this.view.viewType === ViewType.HOST) {
            createRenderNodeExpr = importExpr(createIdentifier(Identifiers.selectOrCreateRenderHostElement)).callFn([ViewProperties.renderer, literal(ast.name), attrNameAndValues, rootSelectorVar, debugContextExpr]);
          } else {
            createRenderNodeExpr = importExpr(createIdentifier(Identifiers.createRenderElement)).callFn([ViewProperties.renderer, this._getParentRenderNode(parent), literal(ast.name), attrNameAndValues, debugContextExpr]);
          }
        }
        var fieldName = "_el_" + nodeIndex;
        this.view.fields.push(new ClassField(fieldName, importType(this.view.genConfig.renderTypes.renderElement)));
        this.view.createMethod.addStmt(THIS_EXPR.prop(fieldName).set(createRenderNodeExpr).toStmt());
        var renderNode = THIS_EXPR.prop(fieldName);
        var compileElement = new CompileElement(parent, this.view, nodeIndex, renderNode, ast, component, directives, ast.providers, ast.hasViewContainer, false, ast.references);
        this.view.nodes.push(compileElement);
        var compViewExpr = null;
        if (isPresent(component)) {
          var nestedComponentIdentifier = {reference: null};
          this.targetDependencies.push(new ViewClassDependency(component.type, getViewClassName(component, 0), nestedComponentIdentifier));
          compViewExpr = THIS_EXPR.prop("compView_" + nodeIndex);
          this.view.fields.push(new ClassField(compViewExpr.name, importType(createIdentifier(Identifiers.AppView), [importType(component.type)])));
          this.view.viewChildren.push(compViewExpr);
          compileElement.setComponentView(compViewExpr);
          this.view.createMethod.addStmt(compViewExpr.set(importExpr(nestedComponentIdentifier).instantiate([ViewProperties.viewUtils, THIS_EXPR, literal(nodeIndex), renderNode])).toStmt());
        }
        compileElement.beforeChildren();
        this._addRootNodeAndProject(compileElement);
        templateVisitAll(this, ast.children, compileElement);
        compileElement.afterChildren(this.view.nodes.length - nodeIndex - 1);
        if (isPresent(compViewExpr)) {
          this.view.createMethod.addStmt(compViewExpr.callMethod('create', [compileElement.getComponent()]).toStmt());
        }
        return null;
      };
      ViewBuilderVisitor.prototype.visitEmbeddedTemplate = function(ast, parent) {
        var nodeIndex = this.view.nodes.length;
        var fieldName = "_anchor_" + nodeIndex;
        this.view.fields.push(new ClassField(fieldName, importType(this.view.genConfig.renderTypes.renderComment)));
        this.view.createMethod.addStmt(THIS_EXPR.prop(fieldName).set(ViewProperties.renderer.callMethod('createTemplateAnchor', [this._getParentRenderNode(parent), this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast)])).toStmt());
        var renderNode = THIS_EXPR.prop(fieldName);
        var templateVariableBindings = ast.variables.map(function(varAst) {
          return [varAst.value.length > 0 ? varAst.value : IMPLICIT_TEMPLATE_VAR, varAst.name];
        });
        var directives = ast.directives.map(function(directiveAst) {
          return directiveAst.directive;
        });
        var compileElement = new CompileElement(parent, this.view, nodeIndex, renderNode, ast, null, directives, ast.providers, ast.hasViewContainer, true, ast.references);
        this.view.nodes.push(compileElement);
        this.nestedViewCount++;
        var embeddedView = new CompileView(this.view.component, this.view.genConfig, this.view.pipeMetas, NULL_EXPR, this.view.animations, this.view.viewIndex + this.nestedViewCount, compileElement, templateVariableBindings, this.targetDependencies);
        this.nestedViewCount += buildView(embeddedView, ast.children, this.targetDependencies);
        compileElement.beforeChildren();
        this._addRootNodeAndProject(compileElement);
        compileElement.afterChildren(0);
        return null;
      };
      ViewBuilderVisitor.prototype.visitAttr = function(ast, ctx) {
        return null;
      };
      ViewBuilderVisitor.prototype.visitDirective = function(ast, ctx) {
        return null;
      };
      ViewBuilderVisitor.prototype.visitEvent = function(ast, eventTargetAndNames) {
        return null;
      };
      ViewBuilderVisitor.prototype.visitReference = function(ast, ctx) {
        return null;
      };
      ViewBuilderVisitor.prototype.visitVariable = function(ast, ctx) {
        return null;
      };
      ViewBuilderVisitor.prototype.visitDirectiveProperty = function(ast, context) {
        return null;
      };
      ViewBuilderVisitor.prototype.visitElementProperty = function(ast, context) {
        return null;
      };
      return ViewBuilderVisitor;
    }());
    function _getOuterContainerOrSelf(node) {
      var view = node.view;
      while (_isNgContainer(node.parent, view)) {
        node = node.parent;
      }
      return node;
    }
    function _getOuterContainerParentOrSelf(el) {
      var view = el.view;
      while (_isNgContainer(el, view)) {
        el = el.parent;
      }
      return el;
    }
    function _isNgContainer(node, view) {
      return !node.isNull() && ((node.sourceAst)).name === NG_CONTAINER_TAG && node.view === view;
    }
    function _mergeHtmlAndDirectiveAttrs(declaredHtmlAttrs, directives) {
      var mapResult = {};
      Object.keys(declaredHtmlAttrs).forEach(function(key) {
        mapResult[key] = declaredHtmlAttrs[key];
      });
      directives.forEach(function(directiveMeta) {
        Object.keys(directiveMeta.hostAttributes).forEach(function(name) {
          var value = directiveMeta.hostAttributes[name];
          var prevValue = mapResult[name];
          mapResult[name] = isPresent(prevValue) ? mergeAttributeValue(name, prevValue, value) : value;
        });
      });
      var arrResult = [];
      Object.keys(mapResult).sort().forEach(function(attrName) {
        arrResult.push(attrName, mapResult[attrName]);
      });
      return arrResult;
    }
    function _readHtmlAttrs(attrs) {
      var htmlAttrs = {};
      attrs.forEach(function(ast) {
        htmlAttrs[ast.name] = ast.value;
      });
      return htmlAttrs;
    }
    function mergeAttributeValue(attrName, attrValue1, attrValue2) {
      if (attrName == CLASS_ATTR$1 || attrName == STYLE_ATTR) {
        return attrValue1 + " " + attrValue2;
      } else {
        return attrValue2;
      }
    }
    function createViewTopLevelStmts(view, targetStatements) {
      var nodeDebugInfosVar = NULL_EXPR;
      if (view.genConfig.genDebugInfo) {
        nodeDebugInfosVar = variable("nodeDebugInfos_" + identifierName(view.component.type) + view.viewIndex);
        targetStatements.push(((nodeDebugInfosVar)).set(literalArr(view.nodes.map(createStaticNodeDebugInfo), new ArrayType(importType(createIdentifier(Identifiers.StaticNodeDebugInfo)), [TypeModifier.Const]))).toDeclStmt(null, [StmtModifier.Final]));
      }
      var renderCompTypeVar = variable("renderType_" + identifierName(view.component.type));
      if (view.viewIndex === 0) {
        var templateUrlInfo = void 0;
        if (view.component.template.templateUrl == identifierModuleUrl(view.component.type)) {
          templateUrlInfo = identifierModuleUrl(view.component.type) + " class " + identifierName(view.component.type) + " - inline template";
        } else {
          templateUrlInfo = view.component.template.templateUrl;
        }
        targetStatements.push(renderCompTypeVar.set(importExpr(createIdentifier(Identifiers.createRenderComponentType)).callFn([view.genConfig.genDebugInfo ? literal(templateUrlInfo) : literal(''), literal(view.component.template.ngContentSelectors.length), ViewEncapsulationEnum.fromValue(view.component.template.encapsulation), view.styles, literalMap(view.animations.map(function(entry) {
          return [entry.name, entry.fnExp];
        }), null, true)])).toDeclStmt(importType(createIdentifier(Identifiers.RenderComponentType))));
      }
      var viewClass = createViewClass(view, renderCompTypeVar, nodeDebugInfosVar);
      targetStatements.push(viewClass);
    }
    function createStaticNodeDebugInfo(node) {
      var compileElement = node instanceof CompileElement ? node : null;
      var providerTokens = [];
      var componentToken = NULL_EXPR;
      var varTokenEntries = [];
      if (isPresent(compileElement)) {
        providerTokens = compileElement.getProviderTokens().map(function(token) {
          return createDiTokenExpression(token);
        });
        if (isPresent(compileElement.component)) {
          componentToken = createDiTokenExpression(identifierToken(compileElement.component.type));
        }
        Object.keys(compileElement.referenceTokens).forEach(function(varName) {
          var token = compileElement.referenceTokens[varName];
          varTokenEntries.push([varName, isPresent(token) ? createDiTokenExpression(token) : NULL_EXPR]);
        });
      }
      return importExpr(createIdentifier(Identifiers.StaticNodeDebugInfo)).instantiate([literalArr(providerTokens, new ArrayType(DYNAMIC_TYPE, [TypeModifier.Const])), componentToken, literalMap(varTokenEntries, new MapType(DYNAMIC_TYPE, [TypeModifier.Const]))], importType(createIdentifier(Identifiers.StaticNodeDebugInfo), null, [TypeModifier.Const]));
    }
    function createViewClass(view, renderCompTypeVar, nodeDebugInfosVar) {
      var viewConstructorArgs = [new FnParam(ViewConstructorVars.viewUtils.name, importType(createIdentifier(Identifiers.ViewUtils))), new FnParam(ViewConstructorVars.parentView.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(ViewConstructorVars.parentIndex.name, NUMBER_TYPE), new FnParam(ViewConstructorVars.parentElement.name, DYNAMIC_TYPE)];
      var superConstructorArgs = [variable(view.className), renderCompTypeVar, ViewTypeEnum.fromValue(view.viewType), ViewConstructorVars.viewUtils, ViewConstructorVars.parentView, ViewConstructorVars.parentIndex, ViewConstructorVars.parentElement, ChangeDetectorStatusEnum.fromValue(getChangeDetectionMode(view))];
      if (view.genConfig.genDebugInfo) {
        superConstructorArgs.push(nodeDebugInfosVar);
      }
      if (view.viewType === ViewType.EMBEDDED) {
        viewConstructorArgs.push(new FnParam('declaredViewContainer', importType(createIdentifier(Identifiers.ViewContainer))));
        superConstructorArgs.push(variable('declaredViewContainer'));
      }
      var viewMethods = [new ClassMethod('createInternal', [new FnParam(rootSelectorVar.name, STRING_TYPE)], generateCreateMethod(view), importType(createIdentifier(Identifiers.ComponentRef), [DYNAMIC_TYPE])), new ClassMethod('injectorGetInternal', [new FnParam(InjectMethodVars$1.token.name, DYNAMIC_TYPE), new FnParam(InjectMethodVars$1.requestNodeIndex.name, NUMBER_TYPE), new FnParam(InjectMethodVars$1.notFoundResult.name, DYNAMIC_TYPE)], addReturnValuefNotEmpty(view.injectorGetMethod.finish(), InjectMethodVars$1.notFoundResult), DYNAMIC_TYPE), new ClassMethod('detectChangesInternal', [new FnParam(DetectChangesVars.throwOnChange.name, BOOL_TYPE)], generateDetectChangesMethod(view)), new ClassMethod('dirtyParentQueriesInternal', [], view.dirtyParentQueriesMethod.finish()), new ClassMethod('destroyInternal', [], generateDestroyMethod(view)), new ClassMethod('detachInternal', [], view.detachMethod.finish()), generateVisitRootNodesMethod(view), generateVisitProjectableNodesMethod(view), generateCreateEmbeddedViewsMethod(view)].filter(function(method) {
        return method.body.length > 0;
      });
      var superClass = view.genConfig.genDebugInfo ? Identifiers.DebugAppView : Identifiers.AppView;
      var viewClass = createClassStmt({
        name: view.className,
        parent: importExpr(createIdentifier(superClass), [getContextType(view)]),
        parentArgs: superConstructorArgs,
        ctorParams: viewConstructorArgs,
        builders: [{methods: viewMethods}, view]
      });
      return viewClass;
    }
    function generateDestroyMethod(view) {
      var stmts = [];
      view.viewContainers.forEach(function(viewContainer) {
        stmts.push(viewContainer.callMethod('destroyNestedViews', []).toStmt());
      });
      view.viewChildren.forEach(function(viewChild) {
        stmts.push(viewChild.callMethod('destroy', []).toStmt());
      });
      stmts.push.apply(stmts, view.destroyMethod.finish());
      return stmts;
    }
    function generateCreateMethod(view) {
      var parentRenderNodeExpr = NULL_EXPR;
      var parentRenderNodeStmts = [];
      if (view.viewType === ViewType.COMPONENT) {
        parentRenderNodeExpr = ViewProperties.renderer.callMethod('createViewRoot', [THIS_EXPR.prop('parentElement')]);
        parentRenderNodeStmts = [parentRenderNodeVar.set(parentRenderNodeExpr).toDeclStmt(importType(view.genConfig.renderTypes.renderNode), [StmtModifier.Final])];
      }
      var resultExpr;
      if (view.viewType === ViewType.HOST) {
        var hostEl = (view.nodes[0]);
        resultExpr = importExpr(createIdentifier(Identifiers.ComponentRef_), [DYNAMIC_TYPE]).instantiate([literal(hostEl.nodeIndex), THIS_EXPR, hostEl.renderNode, hostEl.getComponent()]);
      } else {
        resultExpr = NULL_EXPR;
      }
      var allNodesExpr = ViewProperties.renderer.cast(DYNAMIC_TYPE).prop('directRenderer').conditional(NULL_EXPR, literalArr(view.nodes.map(function(node) {
        return node.renderNode;
      })));
      return parentRenderNodeStmts.concat(view.createMethod.finish(), [THIS_EXPR.callMethod('init', [view.lastRenderNode, allNodesExpr, view.disposables.length ? literalArr(view.disposables) : NULL_EXPR]).toStmt(), new ReturnStatement(resultExpr)]);
    }
    function generateDetectChangesMethod(view) {
      var stmts = [];
      if (view.animationBindingsMethod.isEmpty() && view.detectChangesInInputsMethod.isEmpty() && view.updateContentQueriesMethod.isEmpty() && view.afterContentLifecycleCallbacksMethod.isEmpty() && view.detectChangesRenderPropertiesMethod.isEmpty() && view.updateViewQueriesMethod.isEmpty() && view.afterViewLifecycleCallbacksMethod.isEmpty() && view.viewContainers.length === 0 && view.viewChildren.length === 0) {
        return stmts;
      }
      stmts.push.apply(stmts, view.animationBindingsMethod.finish());
      stmts.push.apply(stmts, view.detectChangesInInputsMethod.finish());
      view.viewContainers.forEach(function(viewContainer) {
        stmts.push(viewContainer.callMethod('detectChangesInNestedViews', [DetectChangesVars.throwOnChange]).toStmt());
      });
      var afterContentStmts = view.updateContentQueriesMethod.finish().concat(view.afterContentLifecycleCallbacksMethod.finish());
      if (afterContentStmts.length > 0) {
        stmts.push(new IfStmt(not(DetectChangesVars.throwOnChange), afterContentStmts));
      }
      stmts.push.apply(stmts, view.detectChangesRenderPropertiesMethod.finish());
      view.viewChildren.forEach(function(viewChild) {
        stmts.push(viewChild.callMethod('internalDetectChanges', [DetectChangesVars.throwOnChange]).toStmt());
      });
      var afterViewStmts = view.updateViewQueriesMethod.finish().concat(view.afterViewLifecycleCallbacksMethod.finish());
      if (afterViewStmts.length > 0) {
        stmts.push(new IfStmt(not(DetectChangesVars.throwOnChange), afterViewStmts));
      }
      var varStmts = [];
      var readVars = findReadVarNames(stmts);
      if (readVars.has(DetectChangesVars.changed.name)) {
        varStmts.push(DetectChangesVars.changed.set(literal(true)).toDeclStmt(BOOL_TYPE));
      }
      if (readVars.has(DetectChangesVars.changes.name)) {
        varStmts.push(DetectChangesVars.changes.set(NULL_EXPR).toDeclStmt(new MapType(importType(createIdentifier(Identifiers.SimpleChange)))));
      }
      varStmts.push.apply(varStmts, createSharedBindingVariablesIfNeeded(stmts));
      return varStmts.concat(stmts);
    }
    function addReturnValuefNotEmpty(statements, value) {
      if (statements.length > 0) {
        return statements.concat([new ReturnStatement(value)]);
      } else {
        return statements;
      }
    }
    function getContextType(view) {
      if (view.viewType === ViewType.COMPONENT) {
        return importType(view.component.type);
      }
      return DYNAMIC_TYPE;
    }
    function getChangeDetectionMode(view) {
      var mode;
      if (view.viewType === ViewType.COMPONENT) {
        mode = isDefaultChangeDetectionStrategy(view.component.changeDetection) ? ChangeDetectorStatus.CheckAlways : ChangeDetectorStatus.CheckOnce;
      } else {
        mode = ChangeDetectorStatus.CheckAlways;
      }
      return mode;
    }
    function generateVisitRootNodesMethod(view) {
      var cbVar = variable('cb');
      var ctxVar = variable('ctx');
      var stmts = generateVisitNodesStmts(view.rootNodes, cbVar, ctxVar);
      return new ClassMethod('visitRootNodesInternal', [new FnParam(cbVar.name, DYNAMIC_TYPE), new FnParam(ctxVar.name, DYNAMIC_TYPE)], stmts);
    }
    function generateVisitProjectableNodesMethod(view) {
      var nodeIndexVar = variable('nodeIndex');
      var ngContentIndexVar = variable('ngContentIndex');
      var cbVar = variable('cb');
      var ctxVar = variable('ctx');
      var stmts = [];
      view.nodes.forEach(function(node) {
        if (node instanceof CompileElement && node.component) {
          node.contentNodesByNgContentIndex.forEach(function(projectedNodes, ngContentIndex) {
            stmts.push(new IfStmt(nodeIndexVar.equals(literal(node.nodeIndex)).and(ngContentIndexVar.equals(literal(ngContentIndex))), generateVisitNodesStmts(projectedNodes, cbVar, ctxVar)));
          });
        }
      });
      return new ClassMethod('visitProjectableNodesInternal', [new FnParam(nodeIndexVar.name, NUMBER_TYPE), new FnParam(ngContentIndexVar.name, NUMBER_TYPE), new FnParam(cbVar.name, DYNAMIC_TYPE), new FnParam(ctxVar.name, DYNAMIC_TYPE)], stmts);
    }
    function generateVisitNodesStmts(nodes, cb, ctx) {
      var stmts = [];
      nodes.forEach(function(node) {
        switch (node.type) {
          case CompileViewRootNodeType.Node:
            stmts.push(cb.callFn([node.expr, ctx]).toStmt());
            break;
          case CompileViewRootNodeType.ViewContainer:
            stmts.push(cb.callFn([node.expr.prop('nativeElement'), ctx]).toStmt());
            stmts.push(node.expr.callMethod('visitNestedViewRootNodes', [cb, ctx]).toStmt());
            break;
          case CompileViewRootNodeType.NgContent:
            stmts.push(THIS_EXPR.callMethod('visitProjectedNodes', [literal(node.ngContentIndex), cb, ctx]).toStmt());
            break;
        }
      });
      return stmts;
    }
    function generateCreateEmbeddedViewsMethod(view) {
      var nodeIndexVar = variable('nodeIndex');
      var stmts = [];
      view.nodes.forEach(function(node) {
        if (node instanceof CompileElement) {
          if (node.embeddedView) {
            stmts.push(new IfStmt(nodeIndexVar.equals(literal(node.nodeIndex)), [new ReturnStatement(node.embeddedView.classExpr.instantiate([ViewProperties.viewUtils, THIS_EXPR, literal(node.nodeIndex), node.renderNode, node.viewContainer]))]));
          }
        }
      });
      if (stmts.length > 0) {
        stmts.push(new ReturnStatement(NULL_EXPR));
      }
      return new ClassMethod('createEmbeddedViewInternal', [new FnParam(nodeIndexVar.name, NUMBER_TYPE)], stmts, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE]));
    }
    var __decorate$16 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$16 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var ViewCompileResult = (function() {
      function ViewCompileResult(statements, viewClassVar, dependencies) {
        this.statements = statements;
        this.viewClassVar = viewClassVar;
        this.dependencies = dependencies;
      }
      return ViewCompileResult;
    }());
    var ViewCompiler = (function() {
      function ViewCompiler(_genConfig, _schemaRegistry) {
        this._genConfig = _genConfig;
        this._schemaRegistry = _schemaRegistry;
      }
      ViewCompiler.prototype.compileComponent = function(component, template, styles, pipes, compiledAnimations) {
        var dependencies = [];
        var view = new CompileView(component, this._genConfig, pipes, styles, compiledAnimations, 0, CompileElement.createNull(), [], dependencies);
        var statements = [];
        buildView(view, template, dependencies);
        bindView(view, template, this._schemaRegistry);
        finishView(view, statements);
        return new ViewCompileResult(statements, view.classExpr.name, dependencies);
      };
      ViewCompiler = __decorate$16([CompilerInjectable(), __metadata$16('design:paramtypes', [CompilerConfig, ElementSchemaRegistry])], ViewCompiler);
      return ViewCompiler;
    }());
    var AnimationEntryCompileResult = (function() {
      function AnimationEntryCompileResult(name, statements, fnExp) {
        this.name = name;
        this.statements = statements;
        this.fnExp = fnExp;
      }
      return AnimationEntryCompileResult;
    }());
    var AnimationCompiler = (function() {
      function AnimationCompiler() {}
      AnimationCompiler.prototype.compile = function(factoryNamePrefix, parsedAnimations) {
        return parsedAnimations.map(function(entry) {
          var factoryName = factoryNamePrefix + "_" + entry.name;
          var visitor = new _AnimationBuilder(entry.name, factoryName);
          return visitor.build(entry);
        });
      };
      return AnimationCompiler;
    }());
    var _ANIMATION_FACTORY_ELEMENT_VAR = variable('element');
    var _ANIMATION_DEFAULT_STATE_VAR = variable('defaultStateStyles');
    var _ANIMATION_FACTORY_VIEW_VAR = variable('view');
    var _ANIMATION_FACTORY_VIEW_CONTEXT = _ANIMATION_FACTORY_VIEW_VAR.prop('animationContext');
    var _ANIMATION_FACTORY_RENDERER_VAR = _ANIMATION_FACTORY_VIEW_VAR.prop('renderer');
    var _ANIMATION_CURRENT_STATE_VAR = variable('currentState');
    var _ANIMATION_NEXT_STATE_VAR = variable('nextState');
    var _ANIMATION_PLAYER_VAR = variable('player');
    var _ANIMATION_TIME_VAR = variable('totalTime');
    var _ANIMATION_START_STATE_STYLES_VAR = variable('startStateStyles');
    var _ANIMATION_END_STATE_STYLES_VAR = variable('endStateStyles');
    var _ANIMATION_COLLECTED_STYLES = variable('collectedStyles');
    var _PREVIOUS_ANIMATION_PLAYERS = variable('previousPlayers');
    var _EMPTY_MAP = literalMap([]);
    var _EMPTY_ARRAY = literalArr([]);
    var _AnimationBuilder = (function() {
      function _AnimationBuilder(animationName, factoryName) {
        this.animationName = animationName;
        this._fnVarName = factoryName + '_factory';
        this._statesMapVarName = factoryName + '_states';
        this._statesMapVar = variable(this._statesMapVarName);
      }
      _AnimationBuilder.prototype.visitAnimationStyles = function(ast, context) {
        var stylesArr = [];
        if (context.isExpectingFirstStyleStep) {
          stylesArr.push(_ANIMATION_START_STATE_STYLES_VAR);
          context.isExpectingFirstStyleStep = false;
        }
        ast.styles.forEach(function(entry) {
          var entries = Object.keys(entry).map(function(key) {
            return [key, literal(entry[key])];
          });
          stylesArr.push(literalMap(entries, null, true));
        });
        return importExpr(createIdentifier(Identifiers.AnimationStyles)).instantiate([importExpr(createIdentifier(Identifiers.collectAndResolveStyles)).callFn([_ANIMATION_COLLECTED_STYLES, literalArr(stylesArr)])]);
      };
      _AnimationBuilder.prototype.visitAnimationKeyframe = function(ast, context) {
        return importExpr(createIdentifier(Identifiers.AnimationKeyframe)).instantiate([literal(ast.offset), ast.styles.visit(this, context)]);
      };
      _AnimationBuilder.prototype.visitAnimationStep = function(ast, context) {
        var _this = this;
        if (context.endStateAnimateStep === ast) {
          return this._visitEndStateAnimation(ast, context);
        }
        var startingStylesExpr = ast.startingStyles.visit(this, context);
        var keyframeExpressions = ast.keyframes.map(function(keyframeEntry) {
          return keyframeEntry.visit(_this, context);
        });
        return this._callAnimateMethod(ast, startingStylesExpr, literalArr(keyframeExpressions), context);
      };
      _AnimationBuilder.prototype._visitEndStateAnimation = function(ast, context) {
        var _this = this;
        var startingStylesExpr = ast.startingStyles.visit(this, context);
        var keyframeExpressions = ast.keyframes.map(function(keyframe) {
          return keyframe.visit(_this, context);
        });
        var keyframesExpr = importExpr(createIdentifier(Identifiers.balanceAnimationKeyframes)).callFn([_ANIMATION_COLLECTED_STYLES, _ANIMATION_END_STATE_STYLES_VAR, literalArr(keyframeExpressions)]);
        return this._callAnimateMethod(ast, startingStylesExpr, keyframesExpr, context);
      };
      _AnimationBuilder.prototype._callAnimateMethod = function(ast, startingStylesExpr, keyframesExpr, context) {
        var previousStylesValue = _EMPTY_ARRAY;
        if (context.isExpectingFirstAnimateStep) {
          previousStylesValue = _PREVIOUS_ANIMATION_PLAYERS;
          context.isExpectingFirstAnimateStep = false;
        }
        context.totalTransitionTime += ast.duration + ast.delay;
        return _ANIMATION_FACTORY_RENDERER_VAR.callMethod('animate', [_ANIMATION_FACTORY_ELEMENT_VAR, startingStylesExpr, keyframesExpr, literal(ast.duration), literal(ast.delay), literal(ast.easing), previousStylesValue]);
      };
      _AnimationBuilder.prototype.visitAnimationSequence = function(ast, context) {
        var _this = this;
        var playerExprs = ast.steps.map(function(step) {
          return step.visit(_this, context);
        });
        return importExpr(createIdentifier(Identifiers.AnimationSequencePlayer)).instantiate([literalArr(playerExprs)]);
      };
      _AnimationBuilder.prototype.visitAnimationGroup = function(ast, context) {
        var _this = this;
        var playerExprs = ast.steps.map(function(step) {
          return step.visit(_this, context);
        });
        return importExpr(createIdentifier(Identifiers.AnimationGroupPlayer)).instantiate([literalArr(playerExprs)]);
      };
      _AnimationBuilder.prototype.visitAnimationStateDeclaration = function(ast, context) {
        var flatStyles = {};
        _getStylesArray(ast).forEach(function(entry) {
          Object.keys(entry).forEach(function(key) {
            flatStyles[key] = entry[key];
          });
        });
        context.stateMap.registerState(ast.stateName, flatStyles);
      };
      _AnimationBuilder.prototype.visitAnimationStateTransition = function(ast, context) {
        var steps = ast.animation.steps;
        var lastStep = steps[steps.length - 1];
        if (_isEndStateAnimateStep(lastStep)) {
          context.endStateAnimateStep = (lastStep);
        }
        context.totalTransitionTime = 0;
        context.isExpectingFirstStyleStep = true;
        context.isExpectingFirstAnimateStep = true;
        var stateChangePreconditions = [];
        ast.stateChanges.forEach(function(stateChange) {
          stateChangePreconditions.push(_compareToAnimationStateExpr(_ANIMATION_CURRENT_STATE_VAR, stateChange.fromState).and(_compareToAnimationStateExpr(_ANIMATION_NEXT_STATE_VAR, stateChange.toState)));
          if (stateChange.fromState != ANY_STATE) {
            context.stateMap.registerState(stateChange.fromState);
          }
          if (stateChange.toState != ANY_STATE) {
            context.stateMap.registerState(stateChange.toState);
          }
        });
        var animationPlayerExpr = ast.animation.visit(this, context);
        var reducedStateChangesPrecondition = stateChangePreconditions.reduce(function(a, b) {
          return a.or(b);
        });
        var precondition = _ANIMATION_PLAYER_VAR.equals(NULL_EXPR).and(reducedStateChangesPrecondition);
        var animationStmt = _ANIMATION_PLAYER_VAR.set(animationPlayerExpr).toStmt();
        var totalTimeStmt = _ANIMATION_TIME_VAR.set(literal(context.totalTransitionTime)).toStmt();
        return new IfStmt(precondition, [animationStmt, totalTimeStmt]);
      };
      _AnimationBuilder.prototype.visitAnimationEntry = function(ast, context) {
        var _this = this;
        ast.stateDeclarations.forEach(function(def) {
          return def.visit(_this, context);
        });
        context.stateMap.registerState(DEFAULT_STATE, {});
        var statements = [];
        statements.push(_PREVIOUS_ANIMATION_PLAYERS.set(_ANIMATION_FACTORY_VIEW_CONTEXT.callMethod('getAnimationPlayers', [_ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_NEXT_STATE_VAR.equals(literal(EMPTY_STATE)).conditional(NULL_EXPR, literal(this.animationName))])).toDeclStmt());
        statements.push(_ANIMATION_COLLECTED_STYLES.set(_EMPTY_MAP).toDeclStmt());
        statements.push(_ANIMATION_PLAYER_VAR.set(NULL_EXPR).toDeclStmt());
        statements.push(_ANIMATION_TIME_VAR.set(literal(0)).toDeclStmt());
        statements.push(_ANIMATION_DEFAULT_STATE_VAR.set(this._statesMapVar.key(literal(DEFAULT_STATE))).toDeclStmt());
        statements.push(_ANIMATION_START_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_CURRENT_STATE_VAR)).toDeclStmt());
        statements.push(new IfStmt(_ANIMATION_START_STATE_STYLES_VAR.equals(NULL_EXPR), [_ANIMATION_START_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
        statements.push(_ANIMATION_END_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_NEXT_STATE_VAR)).toDeclStmt());
        statements.push(new IfStmt(_ANIMATION_END_STATE_STYLES_VAR.equals(NULL_EXPR), [_ANIMATION_END_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
        var RENDER_STYLES_FN = importExpr(createIdentifier(Identifiers.renderStyles));
        ast.stateTransitions.forEach(function(transAst) {
          return statements.push(transAst.visit(_this, context));
        });
        statements.push(new IfStmt(_ANIMATION_PLAYER_VAR.equals(NULL_EXPR), [_ANIMATION_PLAYER_VAR.set(importExpr(createIdentifier(Identifiers.NoOpAnimationPlayer)).instantiate([])).toStmt()]));
        statements.push(_ANIMATION_PLAYER_VAR.callMethod('onDone', [fn([], [_ANIMATION_PLAYER_VAR.callMethod('destroy', []).toStmt(), RENDER_STYLES_FN.callFn([_ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR, importExpr(createIdentifier(Identifiers.prepareFinalAnimationStyles)).callFn([_ANIMATION_START_STATE_STYLES_VAR, _ANIMATION_END_STATE_STYLES_VAR])]).toStmt()])]).toStmt());
        statements.push(importExpr(createIdentifier(Identifiers.AnimationSequencePlayer)).instantiate([_PREVIOUS_ANIMATION_PLAYERS]).callMethod('destroy', []).toStmt());
        statements.push(RENDER_STYLES_FN.callFn([_ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR, importExpr(createIdentifier(Identifiers.clearStyles)).callFn([_ANIMATION_START_STATE_STYLES_VAR])]).toStmt());
        statements.push(_ANIMATION_FACTORY_VIEW_CONTEXT.callMethod('queueAnimation', [_ANIMATION_FACTORY_ELEMENT_VAR, literal(this.animationName), _ANIMATION_PLAYER_VAR]).toStmt());
        statements.push(new ReturnStatement(importExpr(createIdentifier(Identifiers.AnimationTransition)).instantiate([_ANIMATION_PLAYER_VAR, _ANIMATION_CURRENT_STATE_VAR, _ANIMATION_NEXT_STATE_VAR, _ANIMATION_TIME_VAR])));
        return fn([new FnParam(_ANIMATION_FACTORY_VIEW_VAR.name, importType(createIdentifier(Identifiers.AppView), [DYNAMIC_TYPE])), new FnParam(_ANIMATION_FACTORY_ELEMENT_VAR.name, DYNAMIC_TYPE), new FnParam(_ANIMATION_CURRENT_STATE_VAR.name, DYNAMIC_TYPE), new FnParam(_ANIMATION_NEXT_STATE_VAR.name, DYNAMIC_TYPE)], statements, importType(createIdentifier(Identifiers.AnimationTransition)));
      };
      _AnimationBuilder.prototype.build = function(ast) {
        var context = new _AnimationBuilderContext();
        var fnStatement = ast.visit(this, context).toDeclStmt(this._fnVarName);
        var fnVariable = variable(this._fnVarName);
        var lookupMap = [];
        Object.keys(context.stateMap.states).forEach(function(stateName) {
          var value = context.stateMap.states[stateName];
          var variableValue = _EMPTY_MAP;
          if (isPresent(value)) {
            var styleMap_1 = [];
            Object.keys(value).forEach(function(key) {
              styleMap_1.push([key, literal(value[key])]);
            });
            variableValue = literalMap(styleMap_1, null, true);
          }
          lookupMap.push([stateName, variableValue]);
        });
        var compiledStatesMapStmt = this._statesMapVar.set(literalMap(lookupMap, null, true)).toDeclStmt();
        var statements = [compiledStatesMapStmt, fnStatement];
        return new AnimationEntryCompileResult(this.animationName, statements, fnVariable);
      };
      return _AnimationBuilder;
    }());
    var _AnimationBuilderContext = (function() {
      function _AnimationBuilderContext() {
        this.stateMap = new _AnimationBuilderStateMap();
        this.endStateAnimateStep = null;
        this.isExpectingFirstStyleStep = false;
        this.isExpectingFirstAnimateStep = false;
        this.totalTransitionTime = 0;
      }
      return _AnimationBuilderContext;
    }());
    var _AnimationBuilderStateMap = (function() {
      function _AnimationBuilderStateMap() {
        this._states = {};
      }
      Object.defineProperty(_AnimationBuilderStateMap.prototype, "states", {
        get: function() {
          return this._states;
        },
        enumerable: true,
        configurable: true
      });
      _AnimationBuilderStateMap.prototype.registerState = function(name, value) {
        if (value === void 0) {
          value = null;
        }
        var existingEntry = this._states[name];
        if (!existingEntry) {
          this._states[name] = value;
        }
      };
      return _AnimationBuilderStateMap;
    }());
    function _compareToAnimationStateExpr(value, animationState) {
      var emptyStateLiteral = literal(EMPTY_STATE);
      switch (animationState) {
        case EMPTY_STATE:
          return value.equals(emptyStateLiteral);
        case ANY_STATE:
          return literal(true);
        default:
          return value.equals(literal(animationState));
      }
    }
    function _isEndStateAnimateStep(step) {
      if (step instanceof AnimationStepAst && step.duration > 0 && step.keyframes.length == 2) {
        var styles1 = _getStylesArray(step.keyframes[0])[0];
        var styles2 = _getStylesArray(step.keyframes[1])[0];
        return Object.keys(styles1).length === 0 && Object.keys(styles2).length === 0;
      }
      return false;
    }
    function _getStylesArray(obj) {
      return obj.styles.styles;
    }
    var GeneratedFile = (function() {
      function GeneratedFile(srcFileUrl, genFileUrl, source) {
        this.srcFileUrl = srcFileUrl;
        this.genFileUrl = genFileUrl;
        this.source = source;
      }
      return GeneratedFile;
    }());
    var __extends$26 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var STRIP_SRC_FILE_SUFFIXES = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
    function serializeSummaries(host, summaryResolver, symbolResolver, symbols, types) {
      var serializer = new Serializer$1(host);
      symbols.forEach(function(resolvedSymbol) {
        return serializer.addOrMergeSummary({
          symbol: resolvedSymbol.symbol,
          metadata: resolvedSymbol.metadata
        });
      });
      for (var processedIndex = 0; processedIndex < serializer.symbols.length; processedIndex++) {
        var symbol = serializer.symbols[processedIndex];
        if (!host.isSourceFile(symbol.filePath)) {
          var summary = summaryResolver.resolveSummary(symbol);
          if (!summary) {
            var resolvedSymbol = symbolResolver.resolveSymbol(symbol);
            if (resolvedSymbol) {
              summary = {
                symbol: resolvedSymbol.symbol,
                metadata: resolvedSymbol.metadata
              };
            }
          }
          if (summary) {
            serializer.addOrMergeSummary(summary);
          }
        }
      }
      types.forEach(function(typeSummary) {
        serializer.addOrMergeSummary({
          symbol: typeSummary.type.reference,
          metadata: {__symbolic: 'class'},
          type: typeSummary
        });
        if (typeSummary.summaryKind === CompileSummaryKind.NgModule) {
          var ngModuleSummary = (typeSummary);
          ngModuleSummary.exportedDirectives.concat(ngModuleSummary.exportedPipes).forEach(function(id) {
            var symbol = id.reference;
            if (!host.isSourceFile(symbol.filePath)) {
              serializer.addOrMergeSummary(summaryResolver.resolveSummary(symbol));
            }
          });
        }
      });
      return serializer.serialize();
    }
    function deserializeSummaries(symbolCache, json) {
      var deserializer = new Deserializer(symbolCache);
      return deserializer.deserialize(json);
    }
    function summaryFileName(fileName) {
      var fileNameWithoutSuffix = fileName.replace(STRIP_SRC_FILE_SUFFIXES, '');
      return fileNameWithoutSuffix + ".ngsummary.json";
    }
    var Serializer$1 = (function(_super) {
      __extends$26(Serializer, _super);
      function Serializer(host) {
        _super.call(this);
        this.host = host;
        this.symbols = [];
        this.indexBySymbol = new Map();
        this.processedSummaryBySymbol = new Map();
        this.processedSummaries = [];
      }
      Serializer.prototype.addOrMergeSummary = function(summary) {
        var symbolMeta = summary.metadata;
        if (symbolMeta && symbolMeta.__symbolic === 'class') {
          symbolMeta = {
            __symbolic: 'class',
            statics: symbolMeta.statics
          };
        }
        var processedSummary = this.processedSummaryBySymbol.get(summary.symbol);
        if (!processedSummary) {
          processedSummary = this.processValue({symbol: summary.symbol});
          this.processedSummaries.push(processedSummary);
          this.processedSummaryBySymbol.set(summary.symbol, processedSummary);
        }
        if (processedSummary.metadata == null && symbolMeta != null) {
          processedSummary.metadata = this.processValue(symbolMeta);
        }
        if (processedSummary.type == null && summary.type != null) {
          processedSummary.type = this.processValue(summary.type);
        }
      };
      Serializer.prototype.serialize = function() {
        var _this = this;
        return JSON.stringify({
          summaries: this.processedSummaries,
          symbols: this.symbols.map(function(symbol, index) {
            return {
              __symbol: index,
              name: symbol.name,
              filePath: _this.host.getOutputFileName(symbol.filePath)
            };
          })
        });
      };
      Serializer.prototype.processValue = function(value) {
        return visitValue(value, this, null);
      };
      Serializer.prototype.visitOther = function(value, context) {
        if (value instanceof StaticSymbol) {
          var index = this.indexBySymbol.get(value);
          if (index == null) {
            index = this.indexBySymbol.size;
            this.indexBySymbol.set(value, index);
            this.symbols.push(value);
          }
          return {__symbol: index};
        }
      };
      return Serializer;
    }(ValueTransformer));
    var Deserializer = (function(_super) {
      __extends$26(Deserializer, _super);
      function Deserializer(symbolCache) {
        _super.call(this);
        this.symbolCache = symbolCache;
      }
      Deserializer.prototype.deserialize = function(json) {
        var _this = this;
        var data = JSON.parse(json);
        this.symbols = data.symbols.map(function(serializedSymbol) {
          return _this.symbolCache.get(serializedSymbol.filePath, serializedSymbol.name);
        });
        return visitValue(data.summaries, this, null);
      };
      Deserializer.prototype.visitStringMap = function(map, context) {
        if ('__symbol' in map) {
          return this.symbols[map['__symbol']];
        } else {
          return _super.prototype.visitStringMap.call(this, map, context);
        }
      };
      return Deserializer;
    }(ValueTransformer));
    var AotCompiler = (function() {
      function AotCompiler(_host, _metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _dirWrapperCompiler, _ngModuleCompiler, _outputEmitter, _summaryResolver, _localeId, _translationFormat, _animationParser, _symbolResolver) {
        this._host = _host;
        this._metadataResolver = _metadataResolver;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._dirWrapperCompiler = _dirWrapperCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._outputEmitter = _outputEmitter;
        this._summaryResolver = _summaryResolver;
        this._localeId = _localeId;
        this._translationFormat = _translationFormat;
        this._animationParser = _animationParser;
        this._symbolResolver = _symbolResolver;
        this._animationCompiler = new AnimationCompiler();
      }
      AotCompiler.prototype.clearCache = function() {
        this._metadataResolver.clearCache();
      };
      AotCompiler.prototype.compileAll = function(rootFiles) {
        var _this = this;
        var programSymbols = extractProgramSymbols(this._symbolResolver, rootFiles, this._host);
        var _a = analyzeAndValidateNgModules(programSymbols, this._host, this._metadataResolver),
            ngModuleByPipeOrDirective = _a.ngModuleByPipeOrDirective,
            files = _a.files,
            ngModules = _a.ngModules;
        return Promise.all(ngModules.map(function(ngModule) {
          return _this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false);
        })).then(function() {
          var sourceModules = files.map(function(file) {
            return _this._compileSrcFile(file.srcUrl, ngModuleByPipeOrDirective, file.directives, file.pipes, file.ngModules, file.injectables);
          });
          return ListWrapper.flatten(sourceModules);
        });
      };
      AotCompiler.prototype._compileSrcFile = function(srcFileUrl, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables) {
        var _this = this;
        var fileSuffix = _splitTypescriptSuffix(srcFileUrl)[1];
        var statements = [];
        var exportedVars = [];
        var generatedFiles = [];
        generatedFiles.push(this._createSummary(srcFileUrl, directives, pipes, ngModules, injectables));
        exportedVars.push.apply(exportedVars, ngModules.map(function(ngModuleType) {
          return _this._compileModule(ngModuleType, statements);
        }));
        exportedVars.push.apply(exportedVars, directives.map(function(directiveType) {
          return _this._compileDirectiveWrapper(directiveType, statements);
        }));
        directives.forEach(function(dirType) {
          var compMeta = _this._metadataResolver.getDirectiveMetadata((dirType));
          if (!compMeta.isComponent) {
            return Promise.resolve(null);
          }
          var ngModule = ngModuleByPipeOrDirective.get(dirType);
          if (!ngModule) {
            throw new Error("Internal Error: cannot determine the module for component " + identifierName(compMeta.type) + "!");
          }
          _assertComponent(compMeta);
          var stylesCompileResults = _this._styleCompiler.compileComponent(compMeta);
          stylesCompileResults.externalStylesheets.forEach(function(compiledStyleSheet) {
            generatedFiles.push(_this._codgenStyles(srcFileUrl, compiledStyleSheet, fileSuffix));
          });
          exportedVars.push(_this._compileComponentFactory(compMeta, ngModule, fileSuffix, statements), _this._compileComponent(compMeta, ngModule, ngModule.transitiveModule.directives, stylesCompileResults.componentStylesheet, fileSuffix, statements));
        });
        if (statements.length > 0) {
          var srcModule = this._codegenSourceModule(srcFileUrl, _ngfactoryModuleUrl(srcFileUrl), statements, exportedVars);
          generatedFiles.unshift(srcModule);
        }
        return generatedFiles;
      };
      AotCompiler.prototype._createSummary = function(srcFileUrl, directives, pipes, ngModules, injectables) {
        var _this = this;
        var symbolSummaries = this._symbolResolver.getSymbolsOf(srcFileUrl).map(function(symbol) {
          return _this._symbolResolver.resolveSymbol(symbol);
        });
        var typeSummaries = ngModules.map(function(ref) {
          return _this._metadataResolver.getNgModuleSummary(ref);
        }).concat(directives.map(function(ref) {
          return _this._metadataResolver.getDirectiveSummary(ref);
        }), pipes.map(function(ref) {
          return _this._metadataResolver.getPipeSummary(ref);
        }), injectables.map(function(ref) {
          return _this._metadataResolver.getInjectableSummary(ref);
        }));
        var json = serializeSummaries(this._host, this._summaryResolver, this._symbolResolver, symbolSummaries, typeSummaries);
        return new GeneratedFile(srcFileUrl, summaryFileName(srcFileUrl), json);
      };
      AotCompiler.prototype._compileModule = function(ngModuleType, targetStatements) {
        var _this = this;
        var ngModule = this._metadataResolver.getNgModuleMetadata(ngModuleType);
        var providers = [];
        if (this._localeId) {
          providers.push({
            token: createIdentifierToken(Identifiers.LOCALE_ID),
            useValue: this._localeId
          });
        }
        if (this._translationFormat) {
          providers.push({
            token: createIdentifierToken(Identifiers.TRANSLATIONS_FORMAT),
            useValue: this._translationFormat
          });
        }
        var appCompileResult = this._ngModuleCompiler.compile(ngModule, providers);
        appCompileResult.dependencies.forEach(function(dep) {
          dep.placeholder.reference = _this._symbolResolver.getStaticSymbol(_ngfactoryModuleUrl(identifierModuleUrl(dep.comp)), _componentFactoryName(dep.comp));
        });
        targetStatements.push.apply(targetStatements, appCompileResult.statements);
        return appCompileResult.ngModuleFactoryVar;
      };
      AotCompiler.prototype._compileDirectiveWrapper = function(directiveType, targetStatements) {
        var dirMeta = this._metadataResolver.getDirectiveMetadata(directiveType);
        var dirCompileResult = this._dirWrapperCompiler.compile(dirMeta);
        targetStatements.push.apply(targetStatements, dirCompileResult.statements);
        return dirCompileResult.dirWrapperClassVar;
      };
      AotCompiler.prototype._compileComponentFactory = function(compMeta, ngModule, fileSuffix, targetStatements) {
        var hostMeta = createHostComponentMeta(this._symbolResolver.getStaticSymbol(identifierModuleUrl(compMeta.type), identifierName(compMeta.type) + "_Host"), compMeta);
        var hostViewFactoryVar = this._compileComponent(hostMeta, ngModule, [compMeta.type], null, fileSuffix, targetStatements);
        var compFactoryVar = _componentFactoryName(compMeta.type);
        targetStatements.push(variable(compFactoryVar).set(importExpr(createIdentifier(Identifiers.ComponentFactory), [importType(compMeta.type)]).instantiate([literal(compMeta.selector), variable(hostViewFactoryVar), importExpr(compMeta.type)], importType(createIdentifier(Identifiers.ComponentFactory), [importType(compMeta.type)], [TypeModifier.Const]))).toDeclStmt(null, [StmtModifier.Final]));
        return compFactoryVar;
      };
      AotCompiler.prototype._compileComponent = function(compMeta, ngModule, directiveIdentifiers, componentStyles, fileSuffix, targetStatements) {
        var _this = this;
        var parsedAnimations = this._animationParser.parseComponent(compMeta);
        var directives = directiveIdentifiers.map(function(dir) {
          return _this._metadataResolver.getDirectiveSummary(dir.reference);
        });
        var pipes = ngModule.transitiveModule.pipes.map(function(pipe) {
          return _this._metadataResolver.getPipeSummary(pipe.reference);
        });
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, ngModule.schemas, identifierName(compMeta.type));
        var stylesExpr = componentStyles ? variable(componentStyles.stylesVar) : literalArr([]);
        var compiledAnimations = this._animationCompiler.compile(identifierName(compMeta.type), parsedAnimations);
        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, stylesExpr, pipes, compiledAnimations);
        if (componentStyles) {
          targetStatements.push.apply(targetStatements, _resolveStyleStatements(this._symbolResolver, componentStyles, fileSuffix));
        }
        compiledAnimations.forEach(function(entry) {
          return targetStatements.push.apply(targetStatements, entry.statements);
        });
        targetStatements.push.apply(targetStatements, _resolveViewStatements(this._symbolResolver, viewResult));
        return viewResult.viewClassVar;
      };
      AotCompiler.prototype._codgenStyles = function(fileUrl, stylesCompileResult, fileSuffix) {
        _resolveStyleStatements(this._symbolResolver, stylesCompileResult, fileSuffix);
        return this._codegenSourceModule(fileUrl, _stylesModuleUrl(stylesCompileResult.meta.moduleUrl, stylesCompileResult.isShimmed, fileSuffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
      };
      AotCompiler.prototype._codegenSourceModule = function(srcFileUrl, genFileUrl, statements, exportedVars) {
        return new GeneratedFile(srcFileUrl, genFileUrl, this._outputEmitter.emitStatements(genFileUrl, statements, exportedVars));
      };
      return AotCompiler;
    }());
    function _resolveViewStatements(reflector, compileResult) {
      compileResult.dependencies.forEach(function(dep) {
        if (dep instanceof ViewClassDependency) {
          var vfd = (dep);
          vfd.placeholder.reference = reflector.getStaticSymbol(_ngfactoryModuleUrl(identifierModuleUrl(vfd.comp)), dep.name);
        } else if (dep instanceof ComponentFactoryDependency$1) {
          var cfd = (dep);
          cfd.placeholder.reference = reflector.getStaticSymbol(_ngfactoryModuleUrl(identifierModuleUrl(cfd.comp)), _componentFactoryName(cfd.comp));
        } else if (dep instanceof DirectiveWrapperDependency) {
          var dwd = (dep);
          dwd.placeholder.reference = reflector.getStaticSymbol(_ngfactoryModuleUrl(identifierModuleUrl(dwd.dir)), dwd.name);
        }
      });
      return compileResult.statements;
    }
    function _resolveStyleStatements(reflector, compileResult, fileSuffix) {
      compileResult.dependencies.forEach(function(dep) {
        dep.valuePlaceholder.reference = reflector.getStaticSymbol(_stylesModuleUrl(dep.moduleUrl, dep.isShimmed, fileSuffix), dep.name);
      });
      return compileResult.statements;
    }
    function _ngfactoryModuleUrl(dirUrl) {
      var urlWithSuffix = _splitTypescriptSuffix(dirUrl);
      return urlWithSuffix[0] + ".ngfactory" + urlWithSuffix[1];
    }
    function _componentFactoryName(comp) {
      return identifierName(comp) + "NgFactory";
    }
    function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
      return "" + stylesheetUrl + (shim ? '.shim' : '') + ".ngstyle" + suffix;
    }
    function _assertComponent(meta) {
      if (!meta.isComponent) {
        throw new Error("Could not compile '" + identifierName(meta.type) + "' because it is not a component.");
      }
    }
    function _splitTypescriptSuffix(path) {
      if (path.endsWith('.d.ts')) {
        return [path.slice(0, -5), '.ts'];
      }
      var lastDot = path.lastIndexOf('.');
      if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
      }
      return [path, ''];
    }
    function analyzeNgModules(programStaticSymbols, host, metadataResolver) {
      var _a = _createNgModules(programStaticSymbols, host, metadataResolver),
          ngModules = _a.ngModules,
          symbolsMissingModule = _a.symbolsMissingModule;
      return _analyzeNgModules(programStaticSymbols, ngModules, symbolsMissingModule, metadataResolver);
    }
    function analyzeAndValidateNgModules(programStaticSymbols, host, metadataResolver) {
      var result = analyzeNgModules(programStaticSymbols, host, metadataResolver);
      if (result.symbolsMissingModule && result.symbolsMissingModule.length) {
        var messages = result.symbolsMissingModule.map(function(s) {
          return ("Cannot determine the module for class " + s.name + " in " + s.filePath + "!");
        });
        throw new Error(messages.join('\n'));
      }
      return result;
    }
    function _analyzeNgModules(programSymbols, ngModuleMetas, symbolsMissingModule, metadataResolver) {
      var moduleMetasByRef = new Map();
      ngModuleMetas.forEach(function(ngModule) {
        return moduleMetasByRef.set(ngModule.type.reference, ngModule);
      });
      var ngModuleByPipeOrDirective = new Map();
      var ngModulesByFile = new Map();
      var ngDirectivesByFile = new Map();
      var ngPipesByFile = new Map();
      var ngInjectablesByFile = new Map();
      var filePaths = new Set();
      programSymbols.forEach(function(symbol) {
        var filePath = symbol.filePath;
        filePaths.add(filePath);
        if (metadataResolver.isInjectable(symbol)) {
          ngInjectablesByFile.set(filePath, (ngInjectablesByFile.get(filePath) || []).concat(symbol));
        }
      });
      ngModuleMetas.forEach(function(ngModuleMeta) {
        var srcFileUrl = ngModuleMeta.type.reference.filePath;
        filePaths.add(srcFileUrl);
        ngModulesByFile.set(srcFileUrl, (ngModulesByFile.get(srcFileUrl) || []).concat(ngModuleMeta.type.reference));
        ngModuleMeta.declaredDirectives.forEach(function(dirIdentifier) {
          var fileUrl = dirIdentifier.reference.filePath;
          filePaths.add(fileUrl);
          ngDirectivesByFile.set(fileUrl, (ngDirectivesByFile.get(fileUrl) || []).concat(dirIdentifier.reference));
          ngModuleByPipeOrDirective.set(dirIdentifier.reference, ngModuleMeta);
        });
        ngModuleMeta.declaredPipes.forEach(function(pipeIdentifier) {
          var fileUrl = pipeIdentifier.reference.filePath;
          filePaths.add(fileUrl);
          ngPipesByFile.set(fileUrl, (ngPipesByFile.get(fileUrl) || []).concat(pipeIdentifier.reference));
          ngModuleByPipeOrDirective.set(pipeIdentifier.reference, ngModuleMeta);
        });
      });
      var files = [];
      filePaths.forEach(function(srcUrl) {
        var directives = ngDirectivesByFile.get(srcUrl) || [];
        var pipes = ngPipesByFile.get(srcUrl) || [];
        var ngModules = ngModulesByFile.get(srcUrl) || [];
        var injectables = ngInjectablesByFile.get(srcUrl) || [];
        files.push({
          srcUrl: srcUrl,
          directives: directives,
          pipes: pipes,
          ngModules: ngModules,
          injectables: injectables
        });
      });
      return {
        ngModuleByPipeOrDirective: ngModuleByPipeOrDirective,
        files: files,
        ngModules: ngModuleMetas,
        symbolsMissingModule: symbolsMissingModule
      };
    }
    function extractProgramSymbols(staticSymbolResolver, files, host) {
      var staticSymbols = [];
      files.filter(function(fileName) {
        return host.isSourceFile(fileName);
      }).forEach(function(sourceFile) {
        staticSymbolResolver.getSymbolsOf(sourceFile).forEach(function(symbol) {
          var resolvedSymbol = staticSymbolResolver.resolveSymbol(symbol);
          var symbolMeta = resolvedSymbol.metadata;
          if (symbolMeta) {
            if (symbolMeta.__symbolic != 'error') {
              staticSymbols.push(resolvedSymbol.symbol);
            }
          }
        });
      });
      return staticSymbols;
    }
    function _createNgModules(programStaticSymbols, host, metadataResolver) {
      var ngModules = new Map();
      var programPipesAndDirectives = [];
      var ngModulePipesAndDirective = new Set();
      var addNgModule = function(staticSymbol) {
        if (ngModules.has(staticSymbol) || !host.isSourceFile(staticSymbol.filePath)) {
          return false;
        }
        var ngModule = metadataResolver.getNgModuleMetadata(staticSymbol, false);
        if (ngModule) {
          ngModules.set(ngModule.type.reference, ngModule);
          ngModule.declaredDirectives.forEach(function(dir) {
            return ngModulePipesAndDirective.add(dir.reference);
          });
          ngModule.declaredPipes.forEach(function(pipe) {
            return ngModulePipesAndDirective.add(pipe.reference);
          });
          ngModule.transitiveModule.modules.forEach(function(modMeta) {
            return addNgModule(modMeta.reference);
          });
        }
        return !!ngModule;
      };
      programStaticSymbols.forEach(function(staticSymbol) {
        if (!addNgModule(staticSymbol) && (metadataResolver.isDirective(staticSymbol) || metadataResolver.isPipe(staticSymbol))) {
          programPipesAndDirectives.push(staticSymbol);
        }
      });
      var symbolsMissingModule = programPipesAndDirectives.filter(function(s) {
        return !ngModulePipesAndDirective.has(s);
      });
      return {
        ngModules: Array.from(ngModules.values()),
        symbolsMissingModule: symbolsMissingModule
      };
    }
    var StaticAndDynamicReflectionCapabilities = (function() {
      function StaticAndDynamicReflectionCapabilities(staticDelegate) {
        this.staticDelegate = staticDelegate;
        this.dynamicDelegate = new ReflectionCapabilities();
      }
      StaticAndDynamicReflectionCapabilities.install = function(staticDelegate) {
        reflector.updateCapabilities(new StaticAndDynamicReflectionCapabilities(staticDelegate));
      };
      StaticAndDynamicReflectionCapabilities.prototype.isReflectionEnabled = function() {
        return true;
      };
      StaticAndDynamicReflectionCapabilities.prototype.factory = function(type) {
        return this.dynamicDelegate.factory(type);
      };
      StaticAndDynamicReflectionCapabilities.prototype.hasLifecycleHook = function(type, lcProperty) {
        return isStaticType(type) ? this.staticDelegate.hasLifecycleHook(type, lcProperty) : this.dynamicDelegate.hasLifecycleHook(type, lcProperty);
      };
      StaticAndDynamicReflectionCapabilities.prototype.parameters = function(type) {
        return isStaticType(type) ? this.staticDelegate.parameters(type) : this.dynamicDelegate.parameters(type);
      };
      StaticAndDynamicReflectionCapabilities.prototype.annotations = function(type) {
        return isStaticType(type) ? this.staticDelegate.annotations(type) : this.dynamicDelegate.annotations(type);
      };
      StaticAndDynamicReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
        return isStaticType(typeOrFunc) ? this.staticDelegate.propMetadata(typeOrFunc) : this.dynamicDelegate.propMetadata(typeOrFunc);
      };
      StaticAndDynamicReflectionCapabilities.prototype.getter = function(name) {
        return this.dynamicDelegate.getter(name);
      };
      StaticAndDynamicReflectionCapabilities.prototype.setter = function(name) {
        return this.dynamicDelegate.setter(name);
      };
      StaticAndDynamicReflectionCapabilities.prototype.method = function(name) {
        return this.dynamicDelegate.method(name);
      };
      StaticAndDynamicReflectionCapabilities.prototype.importUri = function(type) {
        return this.staticDelegate.importUri(type);
      };
      StaticAndDynamicReflectionCapabilities.prototype.resolveIdentifier = function(name, moduleUrl, runtime) {
        return this.staticDelegate.resolveIdentifier(name, moduleUrl);
      };
      StaticAndDynamicReflectionCapabilities.prototype.resolveEnum = function(enumIdentifier, name) {
        if (isStaticType(enumIdentifier)) {
          return this.staticDelegate.resolveEnum(enumIdentifier, name);
        } else {
          return null;
        }
      };
      return StaticAndDynamicReflectionCapabilities;
    }());
    function isStaticType(type) {
      return typeof type === 'object' && type.name && type.filePath;
    }
    var __extends$27 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ANGULAR_IMPORT_LOCATIONS = {
      coreDecorators: '@angular/core/src/metadata',
      diDecorators: '@angular/core/src/di/metadata',
      diMetadata: '@angular/core/src/di/metadata',
      diOpaqueToken: '@angular/core/src/di/opaque_token',
      animationMetadata: '@angular/core/src/animation/metadata',
      provider: '@angular/core/src/di/provider'
    };
    var HIDDEN_KEY = /^\$.*\$$/;
    var StaticReflector = (function() {
      function StaticReflector(symbolResolver, knownMetadataClasses, knownMetadataFunctions, errorRecorder) {
        var _this = this;
        if (knownMetadataClasses === void 0) {
          knownMetadataClasses = [];
        }
        if (knownMetadataFunctions === void 0) {
          knownMetadataFunctions = [];
        }
        this.symbolResolver = symbolResolver;
        this.errorRecorder = errorRecorder;
        this.annotationCache = new Map();
        this.propertyCache = new Map();
        this.parameterCache = new Map();
        this.methodCache = new Map();
        this.conversionMap = new Map();
        this.initializeConversionMap();
        knownMetadataClasses.forEach(function(kc) {
          return _this._registerDecoratorOrConstructor(_this.getStaticSymbol(kc.filePath, kc.name), kc.ctor);
        });
        knownMetadataFunctions.forEach(function(kf) {
          return _this._registerFunction(_this.getStaticSymbol(kf.filePath, kf.name), kf.fn);
        });
      }
      StaticReflector.prototype.importUri = function(typeOrFunc) {
        var staticSymbol = this.findSymbolDeclaration(typeOrFunc);
        return staticSymbol ? staticSymbol.filePath : null;
      };
      StaticReflector.prototype.resolveIdentifier = function(name, moduleUrl) {
        return this.findDeclaration(moduleUrl, name);
      };
      StaticReflector.prototype.findDeclaration = function(moduleUrl, name, containingFile) {
        return this.findSymbolDeclaration(this.symbolResolver.getSymbolByModule(moduleUrl, name, containingFile));
      };
      StaticReflector.prototype.findSymbolDeclaration = function(symbol) {
        var resolvedSymbol = this.symbolResolver.resolveSymbol(symbol);
        if (resolvedSymbol && resolvedSymbol.metadata instanceof StaticSymbol) {
          return this.findSymbolDeclaration(resolvedSymbol.metadata);
        } else {
          return symbol;
        }
      };
      StaticReflector.prototype.resolveEnum = function(enumIdentifier, name) {
        var staticSymbol = enumIdentifier;
        return this.getStaticSymbol(staticSymbol.filePath, staticSymbol.name, [name]);
      };
      StaticReflector.prototype.annotations = function(type) {
        var annotations = this.annotationCache.get(type);
        if (!annotations) {
          annotations = [];
          var classMetadata = this.getTypeMetadata(type);
          if (classMetadata['extends']) {
            var parentAnnotations = this.annotations(this.simplify(type, classMetadata['extends']));
            annotations.push.apply(annotations, parentAnnotations);
          }
          if (classMetadata['decorators']) {
            var ownAnnotations = this.simplify(type, classMetadata['decorators']);
            annotations.push.apply(annotations, ownAnnotations);
          }
          this.annotationCache.set(type, annotations.filter(function(ann) {
            return !!ann;
          }));
        }
        return annotations;
      };
      StaticReflector.prototype.propMetadata = function(type) {
        var _this = this;
        var propMetadata = this.propertyCache.get(type);
        if (!propMetadata) {
          var classMetadata = this.getTypeMetadata(type);
          propMetadata = {};
          if (classMetadata['extends']) {
            var parentPropMetadata_1 = this.propMetadata(this.simplify(type, classMetadata['extends']));
            Object.keys(parentPropMetadata_1).forEach(function(parentProp) {
              propMetadata[parentProp] = parentPropMetadata_1[parentProp];
            });
          }
          var members_1 = classMetadata['members'] || {};
          Object.keys(members_1).forEach(function(propName) {
            var propData = members_1[propName];
            var prop = ((propData)).find(function(a) {
              return a['__symbolic'] == 'property' || a['__symbolic'] == 'method';
            });
            var decorators = [];
            if (propMetadata[propName]) {
              decorators.push.apply(decorators, propMetadata[propName]);
            }
            propMetadata[propName] = decorators;
            if (prop && prop['decorators']) {
              decorators.push.apply(decorators, _this.simplify(type, prop['decorators']));
            }
          });
          this.propertyCache.set(type, propMetadata);
        }
        return propMetadata;
      };
      StaticReflector.prototype.parameters = function(type) {
        if (!(type instanceof StaticSymbol)) {
          this.reportError(new Error("parameters received " + JSON.stringify(type) + " which is not a StaticSymbol"), type);
          return [];
        }
        try {
          var parameters_1 = this.parameterCache.get(type);
          if (!parameters_1) {
            var classMetadata = this.getTypeMetadata(type);
            var members = classMetadata ? classMetadata['members'] : null;
            var ctorData = members ? members['__ctor__'] : null;
            if (ctorData) {
              var ctor = ((ctorData)).find(function(a) {
                return a['__symbolic'] == 'constructor';
              });
              var parameterTypes = (this.simplify(type, ctor['parameters'] || []));
              var parameterDecorators_1 = (this.simplify(type, ctor['parameterDecorators'] || []));
              parameters_1 = [];
              parameterTypes.forEach(function(paramType, index) {
                var nestedResult = [];
                if (paramType) {
                  nestedResult.push(paramType);
                }
                var decorators = parameterDecorators_1 ? parameterDecorators_1[index] : null;
                if (decorators) {
                  nestedResult.push.apply(nestedResult, decorators);
                }
                parameters_1.push(nestedResult);
              });
            } else if (classMetadata['extends']) {
              parameters_1 = this.parameters(this.simplify(type, classMetadata['extends']));
            }
            if (!parameters_1) {
              parameters_1 = [];
            }
            this.parameterCache.set(type, parameters_1);
          }
          return parameters_1;
        } catch (e) {
          console.error("Failed on type " + JSON.stringify(type) + " with error " + e);
          throw e;
        }
      };
      StaticReflector.prototype._methodNames = function(type) {
        var methodNames = this.methodCache.get(type);
        if (!methodNames) {
          var classMetadata = this.getTypeMetadata(type);
          methodNames = {};
          if (classMetadata['extends']) {
            var parentMethodNames_1 = this._methodNames(this.simplify(type, classMetadata['extends']));
            Object.keys(parentMethodNames_1).forEach(function(parentProp) {
              methodNames[parentProp] = parentMethodNames_1[parentProp];
            });
          }
          var members_2 = classMetadata['members'] || {};
          Object.keys(members_2).forEach(function(propName) {
            var propData = members_2[propName];
            var isMethod = ((propData)).some(function(a) {
              return a['__symbolic'] == 'method';
            });
            methodNames[propName] = methodNames[propName] || isMethod;
          });
          this.methodCache.set(type, methodNames);
        }
        return methodNames;
      };
      StaticReflector.prototype.hasLifecycleHook = function(type, lcProperty) {
        if (!(type instanceof StaticSymbol)) {
          this.reportError(new Error("hasLifecycleHook received " + JSON.stringify(type) + " which is not a StaticSymbol"), type);
        }
        try {
          return !!this._methodNames(type)[lcProperty];
        } catch (e) {
          console.error("Failed on type " + JSON.stringify(type) + " with error " + e);
          throw e;
        }
      };
      StaticReflector.prototype._registerDecoratorOrConstructor = function(type, ctor) {
        this.conversionMap.set(type, function(context, args) {
          return new (ctor.bind.apply(ctor, [void 0].concat(args)))();
        });
      };
      StaticReflector.prototype._registerFunction = function(type, fn) {
        this.conversionMap.set(type, function(context, args) {
          return fn.apply(undefined, args);
        });
      };
      StaticReflector.prototype.initializeConversionMap = function() {
        var coreDecorators = ANGULAR_IMPORT_LOCATIONS.coreDecorators,
            diDecorators = ANGULAR_IMPORT_LOCATIONS.diDecorators,
            diMetadata = ANGULAR_IMPORT_LOCATIONS.diMetadata,
            diOpaqueToken = ANGULAR_IMPORT_LOCATIONS.diOpaqueToken,
            animationMetadata = ANGULAR_IMPORT_LOCATIONS.animationMetadata,
            provider = ANGULAR_IMPORT_LOCATIONS.provider;
        this.opaqueToken = this.findDeclaration(diOpaqueToken, 'OpaqueToken');
        this._registerDecoratorOrConstructor(this.findDeclaration(diDecorators, 'Host'), _angular_core.Host);
        this._registerDecoratorOrConstructor(this.findDeclaration(diDecorators, 'Injectable'), _angular_core.Injectable);
        this._registerDecoratorOrConstructor(this.findDeclaration(diDecorators, 'Self'), _angular_core.Self);
        this._registerDecoratorOrConstructor(this.findDeclaration(diDecorators, 'SkipSelf'), _angular_core.SkipSelf);
        this._registerDecoratorOrConstructor(this.findDeclaration(diDecorators, 'Inject'), _angular_core.Inject);
        this._registerDecoratorOrConstructor(this.findDeclaration(diDecorators, 'Optional'), _angular_core.Optional);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'Attribute'), _angular_core.Attribute);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'ContentChild'), _angular_core.ContentChild);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'ContentChildren'), _angular_core.ContentChildren);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'ViewChild'), _angular_core.ViewChild);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'ViewChildren'), _angular_core.ViewChildren);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'Input'), _angular_core.Input);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'Output'), _angular_core.Output);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'Pipe'), _angular_core.Pipe);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'HostBinding'), _angular_core.HostBinding);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'HostListener'), _angular_core.HostListener);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'Directive'), _angular_core.Directive);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'Component'), _angular_core.Component);
        this._registerDecoratorOrConstructor(this.findDeclaration(coreDecorators, 'NgModule'), _angular_core.NgModule);
        this._registerDecoratorOrConstructor(this.findDeclaration(diMetadata, 'Host'), _angular_core.Host);
        this._registerDecoratorOrConstructor(this.findDeclaration(diMetadata, 'Self'), _angular_core.Self);
        this._registerDecoratorOrConstructor(this.findDeclaration(diMetadata, 'SkipSelf'), _angular_core.SkipSelf);
        this._registerDecoratorOrConstructor(this.findDeclaration(diMetadata, 'Optional'), _angular_core.Optional);
        this._registerFunction(this.findDeclaration(animationMetadata, 'trigger'), _angular_core.trigger);
        this._registerFunction(this.findDeclaration(animationMetadata, 'state'), _angular_core.state);
        this._registerFunction(this.findDeclaration(animationMetadata, 'transition'), _angular_core.transition);
        this._registerFunction(this.findDeclaration(animationMetadata, 'style'), _angular_core.style);
        this._registerFunction(this.findDeclaration(animationMetadata, 'animate'), _angular_core.animate);
        this._registerFunction(this.findDeclaration(animationMetadata, 'keyframes'), _angular_core.keyframes);
        this._registerFunction(this.findDeclaration(animationMetadata, 'sequence'), _angular_core.sequence);
        this._registerFunction(this.findDeclaration(animationMetadata, 'group'), _angular_core.group);
      };
      StaticReflector.prototype.getStaticSymbol = function(declarationFile, name, members) {
        return this.symbolResolver.getStaticSymbol(declarationFile, name, members);
      };
      StaticReflector.prototype.reportError = function(error, context, path) {
        if (this.errorRecorder) {
          this.errorRecorder(error, (context && context.filePath) || path);
        } else {
          throw error;
        }
      };
      StaticReflector.prototype.simplify = function(context, value) {
        var _this = this;
        var self = this;
        var scope = BindingScope.empty;
        var calling = new Map();
        function simplifyInContext(context, value, depth) {
          function resolveReferenceValue(staticSymbol) {
            var resolvedSymbol = self.symbolResolver.resolveSymbol(staticSymbol);
            return resolvedSymbol ? resolvedSymbol.metadata : null;
          }
          function simplifyCall(functionSymbol, targetFunction, args) {
            if (targetFunction && targetFunction['__symbolic'] == 'function') {
              if (calling.get(functionSymbol)) {
                throw new Error('Recursion not supported');
              }
              calling.set(functionSymbol, true);
              try {
                var value_1 = targetFunction['value'];
                if (value_1 && (depth != 0 || value_1.__symbolic != 'error')) {
                  var parameters = targetFunction['parameters'];
                  var defaults = targetFunction.defaults;
                  args = args.map(function(arg) {
                    return simplifyInContext(context, arg, depth + 1);
                  });
                  if (defaults && defaults.length > args.length) {
                    args.push.apply(args, defaults.slice(args.length).map(function(value) {
                      return simplify(value);
                    }));
                  }
                  var functionScope = BindingScope.build();
                  for (var i = 0; i < parameters.length; i++) {
                    functionScope.define(parameters[i], args[i]);
                  }
                  var oldScope = scope;
                  var result_1;
                  try {
                    scope = functionScope.done();
                    result_1 = simplifyInContext(functionSymbol, value_1, depth + 1);
                  } finally {
                    scope = oldScope;
                  }
                  return result_1;
                }
              } finally {
                calling.delete(functionSymbol);
              }
            }
            if (depth === 0) {
              return {__symbolic: 'ignore'};
            }
            return simplify({
              __symbolic: 'error',
              message: 'Function call not supported',
              context: functionSymbol
            });
          }
          function simplify(expression) {
            if (isPrimitive$1(expression)) {
              return expression;
            }
            if (expression instanceof Array) {
              var result_2 = [];
              for (var _i = 0,
                  _a = ((expression)); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item && item.__symbolic === 'spread') {
                  var spreadArray = simplify(item.expression);
                  if (Array.isArray(spreadArray)) {
                    for (var _b = 0,
                        spreadArray_1 = spreadArray; _b < spreadArray_1.length; _b++) {
                      var spreadItem = spreadArray_1[_b];
                      result_2.push(spreadItem);
                    }
                    continue;
                  }
                }
                var value_2 = simplify(item);
                if (shouldIgnore(value_2)) {
                  continue;
                }
                result_2.push(value_2);
              }
              return result_2;
            }
            if (expression instanceof StaticSymbol) {
              if (expression === self.opaqueToken || self.conversionMap.has(expression)) {
                return expression;
              } else {
                var staticSymbol = expression;
                var declarationValue = resolveReferenceValue(staticSymbol);
                if (declarationValue) {
                  return simplifyInContext(staticSymbol, declarationValue, depth + 1);
                } else {
                  return staticSymbol;
                }
              }
            }
            if (expression) {
              if (expression['__symbolic']) {
                var staticSymbol = void 0;
                switch (expression['__symbolic']) {
                  case 'binop':
                    var left = simplify(expression['left']);
                    if (shouldIgnore(left))
                      return left;
                    var right = simplify(expression['right']);
                    if (shouldIgnore(right))
                      return right;
                    switch (expression['operator']) {
                      case '&&':
                        return left && right;
                      case '||':
                        return left || right;
                      case '|':
                        return left | right;
                      case '^':
                        return left ^ right;
                      case '&':
                        return left & right;
                      case '==':
                        return left == right;
                      case '!=':
                        return left != right;
                      case '===':
                        return left === right;
                      case '!==':
                        return left !== right;
                      case '<':
                        return left < right;
                      case '>':
                        return left > right;
                      case '<=':
                        return left <= right;
                      case '>=':
                        return left >= right;
                      case '<<':
                        return left << right;
                      case '>>':
                        return left >> right;
                      case '+':
                        return left + right;
                      case '-':
                        return left - right;
                      case '*':
                        return left * right;
                      case '/':
                        return left / right;
                      case '%':
                        return left % right;
                    }
                    return null;
                  case 'if':
                    var condition = simplify(expression['condition']);
                    return condition ? simplify(expression['thenExpression']) : simplify(expression['elseExpression']);
                  case 'pre':
                    var operand = simplify(expression['operand']);
                    if (shouldIgnore(operand))
                      return operand;
                    switch (expression['operator']) {
                      case '+':
                        return operand;
                      case '-':
                        return -operand;
                      case '!':
                        return !operand;
                      case '~':
                        return ~operand;
                    }
                    return null;
                  case 'index':
                    var indexTarget = simplify(expression['expression']);
                    var index = simplify(expression['index']);
                    if (indexTarget && isPrimitive$1(index))
                      return indexTarget[index];
                    return null;
                  case 'select':
                    var member = expression['member'];
                    var selectContext = context;
                    var selectTarget = simplify(expression['expression']);
                    if (selectTarget instanceof StaticSymbol) {
                      var members = selectTarget.members.concat(member);
                      selectContext = self.getStaticSymbol(selectTarget.filePath, selectTarget.name, members);
                      var declarationValue = resolveReferenceValue(selectContext);
                      if (declarationValue) {
                        return simplifyInContext(selectContext, declarationValue, depth + 1);
                      } else {
                        return selectContext;
                      }
                    }
                    if (selectTarget && isPrimitive$1(member))
                      return simplifyInContext(selectContext, selectTarget[member], depth + 1);
                    return null;
                  case 'reference':
                    var name_1 = expression['name'];
                    var localValue = scope.resolve(name_1);
                    if (localValue != BindingScope.missing) {
                      return localValue;
                    }
                    break;
                  case 'class':
                    return context;
                  case 'function':
                    return context;
                  case 'new':
                  case 'call':
                    staticSymbol = simplifyInContext(context, expression['expression'], depth + 1);
                    if (staticSymbol instanceof StaticSymbol) {
                      if (staticSymbol === self.opaqueToken) {
                        return context;
                      }
                      var argExpressions = expression['arguments'] || [];
                      var converter = self.conversionMap.get(staticSymbol);
                      if (converter) {
                        var args = argExpressions.map(function(arg) {
                          return simplifyInContext(context, arg, depth + 1);
                        });
                        return converter(context, args);
                      } else {
                        var targetFunction = resolveReferenceValue(staticSymbol);
                        return simplifyCall(staticSymbol, targetFunction, argExpressions);
                      }
                    }
                    break;
                  case 'error':
                    var message = produceErrorMessage(expression);
                    if (expression['line']) {
                      message = message + " (position " + (expression['line'] + 1) + ":" + (expression['character'] + 1) + " in the original .ts file)";
                      throw positionalError(message, context.filePath, expression['line'], expression['character']);
                    }
                    throw new Error(message);
                }
                return null;
              }
              return mapStringMap(expression, function(value, name) {
                return simplify(value);
              });
            }
            return null;
          }
          try {
            return simplify(value);
          } catch (e) {
            var members = context.members.length ? "." + context.members.join('.') : '';
            var message = e.message + ", resolving symbol " + context.name + members + " in " + context.filePath;
            if (e.fileName) {
              throw positionalError(message, e.fileName, e.line, e.column);
            }
            throw new SyntaxError(message);
          }
        }
        var recordedSimplifyInContext = function(context, value, depth) {
          try {
            return simplifyInContext(context, value, depth);
          } catch (e) {
            _this.reportError(e, context);
          }
        };
        var result = this.errorRecorder ? recordedSimplifyInContext(context, value, 0) : simplifyInContext(context, value, 0);
        if (shouldIgnore(result)) {
          return undefined;
        }
        return result;
      };
      StaticReflector.prototype.getTypeMetadata = function(type) {
        var resolvedSymbol = this.symbolResolver.resolveSymbol(type);
        return resolvedSymbol && resolvedSymbol.metadata ? resolvedSymbol.metadata : {__symbolic: 'class'};
      };
      return StaticReflector;
    }());
    function expandedMessage(error) {
      switch (error.message) {
        case 'Reference to non-exported class':
          if (error.context && error.context.className) {
            return "Reference to a non-exported class " + error.context.className + ". Consider exporting the class";
          }
          break;
        case 'Variable not initialized':
          return 'Only initialized variables and constants can be referenced because the value of this variable is needed by the template compiler';
        case 'Destructuring not supported':
          return 'Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring';
        case 'Could not resolve type':
          if (error.context && error.context.typeName) {
            return "Could not resolve type " + error.context.typeName;
          }
          break;
        case 'Function call not supported':
          var prefix = error.context && error.context.name ? "Calling function '" + error.context.name + "', f" : 'F';
          return prefix + 'unction calls are not supported. Consider replacing the function or lambda with a reference to an exported function';
        case 'Reference to a local symbol':
          if (error.context && error.context.name) {
            return "Reference to a local (non-exported) symbol '" + error.context.name + "'. Consider exporting the symbol";
          }
          break;
      }
      return error.message;
    }
    function produceErrorMessage(error) {
      return "Error encountered resolving symbol values statically. " + expandedMessage(error);
    }
    function mapStringMap(input, transform) {
      if (!input)
        return {};
      var result = {};
      Object.keys(input).forEach(function(key) {
        var value = transform(input[key], key);
        if (!shouldIgnore(value)) {
          if (HIDDEN_KEY.test(key)) {
            Object.defineProperty(result, key, {
              enumerable: false,
              configurable: true,
              value: value
            });
          } else {
            result[key] = value;
          }
        }
      });
      return result;
    }
    function isPrimitive$1(o) {
      return o === null || (typeof o !== 'function' && typeof o !== 'object');
    }
    var BindingScope = (function() {
      function BindingScope() {}
      BindingScope.prototype.resolve = function(name) {};
      BindingScope.build = function() {
        var current = new Map();
        return {
          define: function(name, value) {
            current.set(name, value);
            return this;
          },
          done: function() {
            return current.size > 0 ? new PopulatedScope(current) : BindingScope.empty;
          }
        };
      };
      BindingScope.missing = {};
      BindingScope.empty = {resolve: function(name) {
          return BindingScope.missing;
        }};
      return BindingScope;
    }());
    var PopulatedScope = (function(_super) {
      __extends$27(PopulatedScope, _super);
      function PopulatedScope(bindings) {
        _super.call(this);
        this.bindings = bindings;
      }
      PopulatedScope.prototype.resolve = function(name) {
        return this.bindings.has(name) ? this.bindings.get(name) : BindingScope.missing;
      };
      return PopulatedScope;
    }(BindingScope));
    function shouldIgnore(value) {
      return value && value.__symbolic == 'ignore';
    }
    function positionalError(message, fileName, line, column) {
      var result = new Error(message);
      ((result)).fileName = fileName;
      ((result)).line = line;
      ((result)).column = column;
      return result;
    }
    var __extends$28 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ResolvedStaticSymbol = (function() {
      function ResolvedStaticSymbol(symbol, metadata) {
        this.symbol = symbol;
        this.metadata = metadata;
      }
      return ResolvedStaticSymbol;
    }());
    var SUPPORTED_SCHEMA_VERSION = 3;
    var StaticSymbolResolver = (function() {
      function StaticSymbolResolver(host, staticSymbolCache, summaryResolver, errorRecorder) {
        this.host = host;
        this.staticSymbolCache = staticSymbolCache;
        this.summaryResolver = summaryResolver;
        this.errorRecorder = errorRecorder;
        this.metadataCache = new Map();
        this.resolvedSymbols = new Map();
        this.resolvedFilePaths = new Set();
      }
      StaticSymbolResolver.prototype.resolveSymbol = function(staticSymbol) {
        if (staticSymbol.members.length > 0) {
          return this._resolveSymbolMembers(staticSymbol);
        }
        var result = this._resolveSymbolFromSummary(staticSymbol);
        if (!result) {
          this._createSymbolsOf(staticSymbol.filePath);
          result = this.resolvedSymbols.get(staticSymbol);
        }
        return result;
      };
      StaticSymbolResolver.prototype._resolveSymbolMembers = function(staticSymbol) {
        var members = staticSymbol.members;
        var baseResolvedSymbol = this.resolveSymbol(this.getStaticSymbol(staticSymbol.filePath, staticSymbol.name));
        if (!baseResolvedSymbol) {
          return null;
        }
        var baseMetadata = baseResolvedSymbol.metadata;
        if (baseMetadata instanceof StaticSymbol) {
          return new ResolvedStaticSymbol(staticSymbol, this.getStaticSymbol(baseMetadata.filePath, baseMetadata.name, members));
        } else if (baseMetadata && baseMetadata.__symbolic === 'class') {
          if (baseMetadata.statics && members.length === 1) {
            return new ResolvedStaticSymbol(staticSymbol, baseMetadata.statics[members[0]]);
          }
        } else {
          var value = baseMetadata;
          for (var i = 0; i < members.length && value; i++) {
            value = value[members[i]];
          }
          return new ResolvedStaticSymbol(staticSymbol, value);
        }
        return null;
      };
      StaticSymbolResolver.prototype._resolveSymbolFromSummary = function(staticSymbol) {
        var summary = this.summaryResolver.resolveSummary(staticSymbol);
        return summary ? new ResolvedStaticSymbol(staticSymbol, summary.metadata) : null;
      };
      StaticSymbolResolver.prototype.getStaticSymbol = function(declarationFile, name, members) {
        return this.staticSymbolCache.get(declarationFile, name, members);
      };
      StaticSymbolResolver.prototype.getSymbolsOf = function(filePath) {
        var symbols = new Set(this.summaryResolver.getSymbolsOf(filePath));
        this._createSymbolsOf(filePath);
        this.resolvedSymbols.forEach(function(resolvedSymbol) {
          if (resolvedSymbol.symbol.filePath === filePath) {
            symbols.add(resolvedSymbol.symbol);
          }
        });
        return Array.from(symbols);
      };
      StaticSymbolResolver.prototype._createSymbolsOf = function(filePath) {
        var _this = this;
        if (this.resolvedFilePaths.has(filePath)) {
          return;
        }
        this.resolvedFilePaths.add(filePath);
        var resolvedSymbols = [];
        var metadata = this.getModuleMetadata(filePath);
        if (metadata['metadata']) {
          Object.keys(metadata['metadata']).forEach(function(symbolName) {
            var symbolMeta = metadata['metadata'][symbolName];
            resolvedSymbols.push(_this.createResolvedSymbol(_this.getStaticSymbol(filePath, symbolName), symbolMeta));
          });
        }
        if (metadata['exports']) {
          var _loop_1 = function(moduleExport) {
            if (moduleExport.export) {
              moduleExport.export.forEach(function(exportSymbol) {
                var symbolName;
                if (typeof exportSymbol === 'string') {
                  symbolName = exportSymbol;
                } else {
                  symbolName = exportSymbol.as;
                }
                var symName = symbolName;
                if (typeof exportSymbol !== 'string') {
                  symName = exportSymbol.name;
                }
                var resolvedModule = _this.resolveModule(moduleExport.from, filePath);
                if (resolvedModule) {
                  var targetSymbol = _this.getStaticSymbol(resolvedModule, symName);
                  var sourceSymbol = _this.getStaticSymbol(filePath, symbolName);
                  resolvedSymbols.push(new ResolvedStaticSymbol(sourceSymbol, targetSymbol));
                }
              });
            } else {
              var resolvedModule = this_1.resolveModule(moduleExport.from, filePath);
              if (resolvedModule) {
                var nestedExports = this_1.getSymbolsOf(resolvedModule);
                nestedExports.forEach(function(targetSymbol) {
                  var sourceSymbol = _this.getStaticSymbol(filePath, targetSymbol.name);
                  resolvedSymbols.push(new ResolvedStaticSymbol(sourceSymbol, targetSymbol));
                });
              }
            }
          };
          var this_1 = this;
          for (var _i = 0,
              _a = metadata['exports']; _i < _a.length; _i++) {
            var moduleExport = _a[_i];
            _loop_1(moduleExport);
          }
        }
        resolvedSymbols.forEach(function(resolvedSymbol) {
          return _this.resolvedSymbols.set(resolvedSymbol.symbol, resolvedSymbol);
        });
      };
      StaticSymbolResolver.prototype.createResolvedSymbol = function(sourceSymbol, metadata) {
        var self = this;
        var ReferenceTransformer = (function(_super) {
          __extends$28(ReferenceTransformer, _super);
          function ReferenceTransformer() {
            _super.apply(this, arguments);
          }
          ReferenceTransformer.prototype.visitStringMap = function(map, functionParams) {
            var symbolic = map['__symbolic'];
            if (symbolic === 'function') {
              var oldLen = functionParams.length;
              functionParams.push.apply(functionParams, (map['parameters'] || []));
              var result = _super.prototype.visitStringMap.call(this, map, functionParams);
              functionParams.length = oldLen;
              return result;
            } else if (symbolic === 'reference') {
              var module_1 = map['module'];
              var name_1 = map['name'];
              if (!name_1) {
                return null;
              }
              var filePath = void 0;
              if (module_1) {
                filePath = self.resolveModule(module_1, sourceSymbol.filePath);
                if (!filePath) {
                  return {
                    __symbolic: 'error',
                    message: "Could not resolve " + module_1 + " relative to " + sourceSymbol.filePath + "."
                  };
                }
              } else {
                var isFunctionParam = functionParams.indexOf(name_1) >= 0;
                if (!isFunctionParam) {
                  filePath = sourceSymbol.filePath;
                }
              }
              if (filePath) {
                return self.getStaticSymbol(filePath, name_1);
              } else {
                return {
                  __symbolic: 'reference',
                  name: name_1
                };
              }
            } else {
              return _super.prototype.visitStringMap.call(this, map, functionParams);
            }
          };
          return ReferenceTransformer;
        }(ValueTransformer));
        var transformedMeta = visitValue(metadata, new ReferenceTransformer(), []);
        return new ResolvedStaticSymbol(sourceSymbol, transformedMeta);
      };
      StaticSymbolResolver.prototype.reportError = function(error, context, path) {
        if (this.errorRecorder) {
          this.errorRecorder(error, (context && context.filePath) || path);
        } else {
          throw error;
        }
      };
      StaticSymbolResolver.prototype.getModuleMetadata = function(module) {
        var moduleMetadata = this.metadataCache.get(module);
        if (!moduleMetadata) {
          var moduleMetadatas = this.host.getMetadataFor(module);
          if (moduleMetadatas) {
            var maxVersion_1 = -1;
            moduleMetadatas.forEach(function(md) {
              if (md['version'] > maxVersion_1) {
                maxVersion_1 = md['version'];
                moduleMetadata = md;
              }
            });
          }
          if (!moduleMetadata) {
            moduleMetadata = {
              __symbolic: 'module',
              version: SUPPORTED_SCHEMA_VERSION,
              module: module,
              metadata: {}
            };
          }
          if (moduleMetadata['version'] != SUPPORTED_SCHEMA_VERSION) {
            var errorMessage = moduleMetadata['version'] == 2 ? "Unsupported metadata version " + moduleMetadata['version'] + " for module " + module + ". This module should be compiled with a newer version of ngc" : "Metadata version mismatch for module " + module + ", found version " + moduleMetadata['version'] + ", expected " + SUPPORTED_SCHEMA_VERSION;
            this.reportError(new Error(errorMessage), null);
          }
          this.metadataCache.set(module, moduleMetadata);
        }
        return moduleMetadata;
      };
      StaticSymbolResolver.prototype.getSymbolByModule = function(module, symbolName, containingFile) {
        var filePath = this.resolveModule(module, containingFile);
        if (!filePath) {
          this.reportError(new Error("Could not resolve module " + module + (containingFile ? " relative to $ {\n            containingFile\n          } " : '')), null);
          return this.getStaticSymbol("ERROR:" + module, symbolName);
        }
        return this.getStaticSymbol(filePath, symbolName);
      };
      StaticSymbolResolver.prototype.resolveModule = function(module, containingFile) {
        try {
          return this.host.moduleNameToFileName(module, containingFile);
        } catch (e) {
          console.error("Could not resolve module '" + module + "' relative to file " + containingFile);
          this.reportError(new e, null, containingFile);
        }
      };
      return StaticSymbolResolver;
    }());
    var AotSummaryResolver = (function() {
      function AotSummaryResolver(host, staticSymbolCache) {
        this.host = host;
        this.staticSymbolCache = staticSymbolCache;
        this.summaryCache = new Map();
        this.loadedFilePaths = new Set();
      }
      AotSummaryResolver.prototype._assertNoMembers = function(symbol) {
        if (symbol.members.length) {
          throw new Error("Internal state: StaticSymbols in summaries can't have members! " + JSON.stringify(symbol));
        }
      };
      AotSummaryResolver.prototype.resolveSummary = function(staticSymbol) {
        this._assertNoMembers(staticSymbol);
        var summary = this.summaryCache.get(staticSymbol);
        if (!summary) {
          this._loadSummaryFile(staticSymbol.filePath);
          summary = this.summaryCache.get(staticSymbol);
        }
        return summary;
      };
      AotSummaryResolver.prototype.getSymbolsOf = function(filePath) {
        this._loadSummaryFile(filePath);
        return Array.from(this.summaryCache.keys()).filter(function(symbol) {
          return symbol.filePath === filePath;
        });
      };
      AotSummaryResolver.prototype._loadSummaryFile = function(filePath) {
        var _this = this;
        if (this.loadedFilePaths.has(filePath)) {
          return;
        }
        this.loadedFilePaths.add(filePath);
        if (!this.host.isSourceFile(filePath)) {
          var summaryFilePath = summaryFileName(filePath);
          var json = void 0;
          try {
            json = this.host.loadSummary(summaryFilePath);
          } catch (e) {
            console.error("Error loading summary file " + summaryFilePath);
            throw e;
          }
          if (json) {
            var readSummaries = deserializeSummaries(this.staticSymbolCache, json);
            readSummaries.forEach(function(summary) {
              _this.summaryCache.set(summary.symbol, summary);
            });
          }
        }
      };
      return AotSummaryResolver;
    }());
    function createAotCompiler(compilerHost, options) {
      var translations = options.translations || '';
      var urlResolver = createOfflineCompileUrlResolver();
      var symbolCache = new StaticSymbolCache();
      var summaryResolver = new AotSummaryResolver(compilerHost, symbolCache);
      var symbolResolver = new StaticSymbolResolver(compilerHost, symbolCache, summaryResolver);
      var staticReflector = new StaticReflector(symbolResolver);
      StaticAndDynamicReflectionCapabilities.install(staticReflector);
      var htmlParser = new I18NHtmlParser(new HtmlParser(), translations, options.i18nFormat);
      var config = new CompilerConfig({
        genDebugInfo: options.debug === true,
        defaultEncapsulation: _angular_core.ViewEncapsulation.Emulated,
        logBindingUpdate: false,
        useJit: false
      });
      var normalizer = new DirectiveNormalizer({get: function(url) {
          return compilerHost.loadResource(url);
        }}, urlResolver, htmlParser, config);
      var expressionParser = new Parser(new Lexer());
      var elementSchemaRegistry = new DomElementSchemaRegistry();
      var console = new Console();
      var tmplParser = new TemplateParser(expressionParser, elementSchemaRegistry, htmlParser, console, []);
      var resolver = new CompileMetadataResolver(new NgModuleResolver(staticReflector), new DirectiveResolver(staticReflector), new PipeResolver(staticReflector), summaryResolver, elementSchemaRegistry, normalizer, staticReflector);
      var compiler = new AotCompiler(compilerHost, resolver, tmplParser, new StyleCompiler(urlResolver), new ViewCompiler(config, elementSchemaRegistry), new DirectiveWrapperCompiler(config, expressionParser, elementSchemaRegistry, console), new NgModuleCompiler(), new TypeScriptEmitter(compilerHost), summaryResolver, options.locale, options.i18nFormat, new AnimationParser(elementSchemaRegistry), symbolResolver);
      return {
        compiler: compiler,
        reflector: staticReflector
      };
    }
    function interpretStatements(statements, resultVar) {
      var stmtsWithReturn = statements.concat([new ReturnStatement(variable(resultVar))]);
      var ctx = new _ExecutionContext(null, null, null, new Map());
      var visitor = new StatementInterpreter();
      var result = visitor.visitAllStatements(stmtsWithReturn, ctx);
      return isPresent(result) ? result.value : null;
    }
    function _executeFunctionStatements(varNames, varValues, statements, ctx, visitor) {
      var childCtx = ctx.createChildWihtLocalVars();
      for (var i = 0; i < varNames.length; i++) {
        childCtx.vars.set(varNames[i], varValues[i]);
      }
      var result = visitor.visitAllStatements(statements, childCtx);
      return isPresent(result) ? result.value : null;
    }
    var _ExecutionContext = (function() {
      function _ExecutionContext(parent, instance, className, vars) {
        this.parent = parent;
        this.instance = instance;
        this.className = className;
        this.vars = vars;
      }
      _ExecutionContext.prototype.createChildWihtLocalVars = function() {
        return new _ExecutionContext(this, this.instance, this.className, new Map());
      };
      return _ExecutionContext;
    }());
    var ReturnValue = (function() {
      function ReturnValue(value) {
        this.value = value;
      }
      return ReturnValue;
    }());
    function createDynamicClass(_classStmt, _ctx, _visitor) {
      var propertyDescriptors = {};
      _classStmt.getters.forEach(function(getter) {
        propertyDescriptors[getter.name] = {
          configurable: false,
          get: function() {
            var instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
            return _executeFunctionStatements([], [], getter.body, instanceCtx, _visitor);
          }
        };
      });
      _classStmt.methods.forEach(function(method) {
        var paramNames = method.params.map(function(param) {
          return param.name;
        });
        propertyDescriptors[method.name] = {
          writable: false,
          configurable: false,
          value: function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i - 0] = arguments[_i];
            }
            var instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
            return _executeFunctionStatements(paramNames, args, method.body, instanceCtx, _visitor);
          }
        };
      });
      var ctorParamNames = _classStmt.constructorMethod.params.map(function(param) {
        return param.name;
      });
      var ctor = function() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        var instanceCtx = new _ExecutionContext(_ctx, this, _classStmt.name, _ctx.vars);
        _classStmt.fields.forEach(function(field) {
          _this[field.name] = undefined;
        });
        _executeFunctionStatements(ctorParamNames, args, _classStmt.constructorMethod.body, instanceCtx, _visitor);
      };
      var superClass = _classStmt.parent ? _classStmt.parent.visitExpression(_visitor, _ctx) : Object;
      ctor.prototype = Object.create(superClass.prototype, propertyDescriptors);
      return ctor;
    }
    var StatementInterpreter = (function() {
      function StatementInterpreter() {}
      StatementInterpreter.prototype.debugAst = function(ast) {
        return debugOutputAstAsTypeScript(ast);
      };
      StatementInterpreter.prototype.visitDeclareVarStmt = function(stmt, ctx) {
        ctx.vars.set(stmt.name, stmt.value.visitExpression(this, ctx));
        return null;
      };
      StatementInterpreter.prototype.visitWriteVarExpr = function(expr, ctx) {
        var value = expr.value.visitExpression(this, ctx);
        var currCtx = ctx;
        while (currCtx != null) {
          if (currCtx.vars.has(expr.name)) {
            currCtx.vars.set(expr.name, value);
            return value;
          }
          currCtx = currCtx.parent;
        }
        throw new Error("Not declared variable " + expr.name);
      };
      StatementInterpreter.prototype.visitReadVarExpr = function(ast, ctx) {
        var varName = ast.name;
        if (isPresent(ast.builtin)) {
          switch (ast.builtin) {
            case BuiltinVar.Super:
              return ctx.instance.__proto__;
            case BuiltinVar.This:
              return ctx.instance;
            case BuiltinVar.CatchError:
              varName = CATCH_ERROR_VAR$2;
              break;
            case BuiltinVar.CatchStack:
              varName = CATCH_STACK_VAR$2;
              break;
            default:
              throw new Error("Unknown builtin variable " + ast.builtin);
          }
        }
        var currCtx = ctx;
        while (currCtx != null) {
          if (currCtx.vars.has(varName)) {
            return currCtx.vars.get(varName);
          }
          currCtx = currCtx.parent;
        }
        throw new Error("Not declared variable " + varName);
      };
      StatementInterpreter.prototype.visitWriteKeyExpr = function(expr, ctx) {
        var receiver = expr.receiver.visitExpression(this, ctx);
        var index = expr.index.visitExpression(this, ctx);
        var value = expr.value.visitExpression(this, ctx);
        receiver[index] = value;
        return value;
      };
      StatementInterpreter.prototype.visitWritePropExpr = function(expr, ctx) {
        var receiver = expr.receiver.visitExpression(this, ctx);
        var value = expr.value.visitExpression(this, ctx);
        receiver[expr.name] = value;
        return value;
      };
      StatementInterpreter.prototype.visitInvokeMethodExpr = function(expr, ctx) {
        var receiver = expr.receiver.visitExpression(this, ctx);
        var args = this.visitAllExpressions(expr.args, ctx);
        var result;
        if (isPresent(expr.builtin)) {
          switch (expr.builtin) {
            case BuiltinMethod.ConcatArray:
              result = receiver.concat.apply(receiver, args);
              break;
            case BuiltinMethod.SubscribeObservable:
              result = receiver.subscribe({next: args[0]});
              break;
            case BuiltinMethod.Bind:
              result = receiver.bind.apply(receiver, args);
              break;
            default:
              throw new Error("Unknown builtin method " + expr.builtin);
          }
        } else {
          result = receiver[expr.name].apply(receiver, args);
        }
        return result;
      };
      StatementInterpreter.prototype.visitInvokeFunctionExpr = function(stmt, ctx) {
        var args = this.visitAllExpressions(stmt.args, ctx);
        var fnExpr = stmt.fn;
        if (fnExpr instanceof ReadVarExpr && fnExpr.builtin === BuiltinVar.Super) {
          ctx.instance.constructor.prototype.constructor.apply(ctx.instance, args);
          return null;
        } else {
          var fn = stmt.fn.visitExpression(this, ctx);
          return fn.apply(null, args);
        }
      };
      StatementInterpreter.prototype.visitReturnStmt = function(stmt, ctx) {
        return new ReturnValue(stmt.value.visitExpression(this, ctx));
      };
      StatementInterpreter.prototype.visitDeclareClassStmt = function(stmt, ctx) {
        var clazz = createDynamicClass(stmt, ctx, this);
        ctx.vars.set(stmt.name, clazz);
        return null;
      };
      StatementInterpreter.prototype.visitExpressionStmt = function(stmt, ctx) {
        return stmt.expr.visitExpression(this, ctx);
      };
      StatementInterpreter.prototype.visitIfStmt = function(stmt, ctx) {
        var condition = stmt.condition.visitExpression(this, ctx);
        if (condition) {
          return this.visitAllStatements(stmt.trueCase, ctx);
        } else if (isPresent(stmt.falseCase)) {
          return this.visitAllStatements(stmt.falseCase, ctx);
        }
        return null;
      };
      StatementInterpreter.prototype.visitTryCatchStmt = function(stmt, ctx) {
        try {
          return this.visitAllStatements(stmt.bodyStmts, ctx);
        } catch (e) {
          var childCtx = ctx.createChildWihtLocalVars();
          childCtx.vars.set(CATCH_ERROR_VAR$2, e);
          childCtx.vars.set(CATCH_STACK_VAR$2, e.stack);
          return this.visitAllStatements(stmt.catchStmts, childCtx);
        }
      };
      StatementInterpreter.prototype.visitThrowStmt = function(stmt, ctx) {
        throw stmt.error.visitExpression(this, ctx);
      };
      StatementInterpreter.prototype.visitCommentStmt = function(stmt, context) {
        return null;
      };
      StatementInterpreter.prototype.visitInstantiateExpr = function(ast, ctx) {
        var args = this.visitAllExpressions(ast.args, ctx);
        var clazz = ast.classExpr.visitExpression(this, ctx);
        return new (clazz.bind.apply(clazz, [void 0].concat(args)))();
      };
      StatementInterpreter.prototype.visitLiteralExpr = function(ast, ctx) {
        return ast.value;
      };
      StatementInterpreter.prototype.visitExternalExpr = function(ast, ctx) {
        return ast.value.reference;
      };
      StatementInterpreter.prototype.visitConditionalExpr = function(ast, ctx) {
        if (ast.condition.visitExpression(this, ctx)) {
          return ast.trueCase.visitExpression(this, ctx);
        } else if (isPresent(ast.falseCase)) {
          return ast.falseCase.visitExpression(this, ctx);
        }
        return null;
      };
      StatementInterpreter.prototype.visitNotExpr = function(ast, ctx) {
        return !ast.condition.visitExpression(this, ctx);
      };
      StatementInterpreter.prototype.visitCastExpr = function(ast, ctx) {
        return ast.value.visitExpression(this, ctx);
      };
      StatementInterpreter.prototype.visitFunctionExpr = function(ast, ctx) {
        var paramNames = ast.params.map(function(param) {
          return param.name;
        });
        return _declareFn(paramNames, ast.statements, ctx, this);
      };
      StatementInterpreter.prototype.visitDeclareFunctionStmt = function(stmt, ctx) {
        var paramNames = stmt.params.map(function(param) {
          return param.name;
        });
        ctx.vars.set(stmt.name, _declareFn(paramNames, stmt.statements, ctx, this));
        return null;
      };
      StatementInterpreter.prototype.visitBinaryOperatorExpr = function(ast, ctx) {
        var _this = this;
        var lhs = function() {
          return ast.lhs.visitExpression(_this, ctx);
        };
        var rhs = function() {
          return ast.rhs.visitExpression(_this, ctx);
        };
        switch (ast.operator) {
          case BinaryOperator.Equals:
            return lhs() == rhs();
          case BinaryOperator.Identical:
            return lhs() === rhs();
          case BinaryOperator.NotEquals:
            return lhs() != rhs();
          case BinaryOperator.NotIdentical:
            return lhs() !== rhs();
          case BinaryOperator.And:
            return lhs() && rhs();
          case BinaryOperator.Or:
            return lhs() || rhs();
          case BinaryOperator.Plus:
            return lhs() + rhs();
          case BinaryOperator.Minus:
            return lhs() - rhs();
          case BinaryOperator.Divide:
            return lhs() / rhs();
          case BinaryOperator.Multiply:
            return lhs() * rhs();
          case BinaryOperator.Modulo:
            return lhs() % rhs();
          case BinaryOperator.Lower:
            return lhs() < rhs();
          case BinaryOperator.LowerEquals:
            return lhs() <= rhs();
          case BinaryOperator.Bigger:
            return lhs() > rhs();
          case BinaryOperator.BiggerEquals:
            return lhs() >= rhs();
          default:
            throw new Error("Unknown operator " + ast.operator);
        }
      };
      StatementInterpreter.prototype.visitReadPropExpr = function(ast, ctx) {
        var result;
        var receiver = ast.receiver.visitExpression(this, ctx);
        result = receiver[ast.name];
        return result;
      };
      StatementInterpreter.prototype.visitReadKeyExpr = function(ast, ctx) {
        var receiver = ast.receiver.visitExpression(this, ctx);
        var prop = ast.index.visitExpression(this, ctx);
        return receiver[prop];
      };
      StatementInterpreter.prototype.visitLiteralArrayExpr = function(ast, ctx) {
        return this.visitAllExpressions(ast.entries, ctx);
      };
      StatementInterpreter.prototype.visitLiteralMapExpr = function(ast, ctx) {
        var _this = this;
        var result = {};
        ast.entries.forEach(function(entry) {
          return ((result))[entry.key] = entry.value.visitExpression(_this, ctx);
        });
        return result;
      };
      StatementInterpreter.prototype.visitAllExpressions = function(expressions, ctx) {
        var _this = this;
        return expressions.map(function(expr) {
          return expr.visitExpression(_this, ctx);
        });
      };
      StatementInterpreter.prototype.visitAllStatements = function(statements, ctx) {
        for (var i = 0; i < statements.length; i++) {
          var stmt = statements[i];
          var val = stmt.visitStatement(this, ctx);
          if (val instanceof ReturnValue) {
            return val;
          }
        }
        return null;
      };
      return StatementInterpreter;
    }());
    function _declareFn(varNames, statements, ctx, visitor) {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        return _executeFunctionStatements(varNames, args, statements, ctx, visitor);
      };
    }
    var CATCH_ERROR_VAR$2 = 'error';
    var CATCH_STACK_VAR$2 = 'stack';
    var __extends$30 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractJsEmitterVisitor = (function(_super) {
      __extends$30(AbstractJsEmitterVisitor, _super);
      function AbstractJsEmitterVisitor() {
        _super.call(this, false);
      }
      AbstractJsEmitterVisitor.prototype.visitDeclareClassStmt = function(stmt, ctx) {
        var _this = this;
        ctx.pushClass(stmt);
        this._visitClassConstructor(stmt, ctx);
        if (isPresent(stmt.parent)) {
          ctx.print(stmt.name + ".prototype = Object.create(");
          stmt.parent.visitExpression(this, ctx);
          ctx.println(".prototype);");
        }
        stmt.getters.forEach(function(getter) {
          return _this._visitClassGetter(stmt, getter, ctx);
        });
        stmt.methods.forEach(function(method) {
          return _this._visitClassMethod(stmt, method, ctx);
        });
        ctx.popClass();
        return null;
      };
      AbstractJsEmitterVisitor.prototype._visitClassConstructor = function(stmt, ctx) {
        ctx.print("function " + stmt.name + "(");
        if (isPresent(stmt.constructorMethod)) {
          this._visitParams(stmt.constructorMethod.params, ctx);
        }
        ctx.println(") {");
        ctx.incIndent();
        if (isPresent(stmt.constructorMethod)) {
          if (stmt.constructorMethod.body.length > 0) {
            ctx.println("var self = this;");
            this.visitAllStatements(stmt.constructorMethod.body, ctx);
          }
        }
        ctx.decIndent();
        ctx.println("}");
      };
      AbstractJsEmitterVisitor.prototype._visitClassGetter = function(stmt, getter, ctx) {
        ctx.println("Object.defineProperty(" + stmt.name + ".prototype, '" + getter.name + "', { get: function() {");
        ctx.incIndent();
        if (getter.body.length > 0) {
          ctx.println("var self = this;");
          this.visitAllStatements(getter.body, ctx);
        }
        ctx.decIndent();
        ctx.println("}});");
      };
      AbstractJsEmitterVisitor.prototype._visitClassMethod = function(stmt, method, ctx) {
        ctx.print(stmt.name + ".prototype." + method.name + " = function(");
        this._visitParams(method.params, ctx);
        ctx.println(") {");
        ctx.incIndent();
        if (method.body.length > 0) {
          ctx.println("var self = this;");
          this.visitAllStatements(method.body, ctx);
        }
        ctx.decIndent();
        ctx.println("};");
      };
      AbstractJsEmitterVisitor.prototype.visitReadVarExpr = function(ast, ctx) {
        if (ast.builtin === BuiltinVar.This) {
          ctx.print('self');
        } else if (ast.builtin === BuiltinVar.Super) {
          throw new Error("'super' needs to be handled at a parent ast node, not at the variable level!");
        } else {
          _super.prototype.visitReadVarExpr.call(this, ast, ctx);
        }
        return null;
      };
      AbstractJsEmitterVisitor.prototype.visitDeclareVarStmt = function(stmt, ctx) {
        ctx.print("var " + stmt.name + " = ");
        stmt.value.visitExpression(this, ctx);
        ctx.println(";");
        return null;
      };
      AbstractJsEmitterVisitor.prototype.visitCastExpr = function(ast, ctx) {
        ast.value.visitExpression(this, ctx);
        return null;
      };
      AbstractJsEmitterVisitor.prototype.visitInvokeFunctionExpr = function(expr, ctx) {
        var fnExpr = expr.fn;
        if (fnExpr instanceof ReadVarExpr && fnExpr.builtin === BuiltinVar.Super) {
          ctx.currentClass.parent.visitExpression(this, ctx);
          ctx.print(".call(this");
          if (expr.args.length > 0) {
            ctx.print(", ");
            this.visitAllExpressions(expr.args, ctx, ',');
          }
          ctx.print(")");
        } else {
          _super.prototype.visitInvokeFunctionExpr.call(this, expr, ctx);
        }
        return null;
      };
      AbstractJsEmitterVisitor.prototype.visitFunctionExpr = function(ast, ctx) {
        ctx.print("function(");
        this._visitParams(ast.params, ctx);
        ctx.println(") {");
        ctx.incIndent();
        this.visitAllStatements(ast.statements, ctx);
        ctx.decIndent();
        ctx.print("}");
        return null;
      };
      AbstractJsEmitterVisitor.prototype.visitDeclareFunctionStmt = function(stmt, ctx) {
        ctx.print("function " + stmt.name + "(");
        this._visitParams(stmt.params, ctx);
        ctx.println(") {");
        ctx.incIndent();
        this.visitAllStatements(stmt.statements, ctx);
        ctx.decIndent();
        ctx.println("}");
        return null;
      };
      AbstractJsEmitterVisitor.prototype.visitTryCatchStmt = function(stmt, ctx) {
        ctx.println("try {");
        ctx.incIndent();
        this.visitAllStatements(stmt.bodyStmts, ctx);
        ctx.decIndent();
        ctx.println("} catch (" + CATCH_ERROR_VAR$1.name + ") {");
        ctx.incIndent();
        var catchStmts = [(CATCH_STACK_VAR$1.set(CATCH_ERROR_VAR$1.prop('stack')).toDeclStmt(null, [StmtModifier.Final]))].concat(stmt.catchStmts);
        this.visitAllStatements(catchStmts, ctx);
        ctx.decIndent();
        ctx.println("}");
        return null;
      };
      AbstractJsEmitterVisitor.prototype._visitParams = function(params, ctx) {
        this.visitAllObjects(function(param) {
          return ctx.print(param.name);
        }, params, ctx, ',');
      };
      AbstractJsEmitterVisitor.prototype.getBuiltinMethodName = function(method) {
        var name;
        switch (method) {
          case BuiltinMethod.ConcatArray:
            name = 'concat';
            break;
          case BuiltinMethod.SubscribeObservable:
            name = 'subscribe';
            break;
          case BuiltinMethod.Bind:
            name = 'bind';
            break;
          default:
            throw new Error("Unknown builtin method: " + method);
        }
        return name;
      };
      return AbstractJsEmitterVisitor;
    }(AbstractEmitterVisitor));
    var __extends$29 = (this && this.__extends) || function(d, b) {
      for (var p in b)
        if (b.hasOwnProperty(p))
          d[p] = b[p];
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    function evalExpression(sourceUrl, expr, declarations, vars) {
      var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
      var fnArgNames = [];
      var fnArgValues = [];
      for (var argName in vars) {
        fnArgNames.push(argName);
        fnArgValues.push(vars[argName]);
      }
      return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
    }
    function jitStatements(sourceUrl, statements, resultVar) {
      var converter = new JitEmitterVisitor();
      var ctx = EmitterVisitorContext.createRoot([resultVar]);
      converter.visitAllStatements(statements, ctx);
      return evalExpression(sourceUrl, resultVar, ctx.toSource(), converter.getArgs());
    }
    var JitEmitterVisitor = (function(_super) {
      __extends$29(JitEmitterVisitor, _super);
      function JitEmitterVisitor() {
        _super.apply(this, arguments);
        this._evalArgNames = [];
        this._evalArgValues = [];
      }
      JitEmitterVisitor.prototype.getArgs = function() {
        var result = {};
        for (var i = 0; i < this._evalArgNames.length; i++) {
          result[this._evalArgNames[i]] = this._evalArgValues[i];
        }
        return result;
      };
      JitEmitterVisitor.prototype.visitExternalExpr = function(ast, ctx) {
        var value = ast.value.reference;
        var id = this._evalArgValues.indexOf(value);
        if (id === -1) {
          id = this._evalArgValues.length;
          this._evalArgValues.push(value);
          var name_1 = identifierName(ast.value) || 'val';
          this._evalArgNames.push("jit_" + name_1 + id);
        }
        ctx.print(this._evalArgNames[id]);
        return null;
      };
      return JitEmitterVisitor;
    }(AbstractJsEmitterVisitor));
    var __decorate$17 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$17 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var JitCompiler = (function() {
      function JitCompiler(_injector, _metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _directiveWrapperCompiler, _compilerConfig, _animationParser) {
        this._injector = _injector;
        this._metadataResolver = _metadataResolver;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._directiveWrapperCompiler = _directiveWrapperCompiler;
        this._compilerConfig = _compilerConfig;
        this._animationParser = _animationParser;
        this._compiledTemplateCache = new Map();
        this._compiledHostTemplateCache = new Map();
        this._compiledDirectiveWrapperCache = new Map();
        this._compiledNgModuleCache = new Map();
        this._animationCompiler = new AnimationCompiler();
      }
      Object.defineProperty(JitCompiler.prototype, "injector", {
        get: function() {
          return this._injector;
        },
        enumerable: true,
        configurable: true
      });
      JitCompiler.prototype.compileModuleSync = function(moduleType) {
        return this._compileModuleAndComponents(moduleType, true).syncResult;
      };
      JitCompiler.prototype.compileModuleAsync = function(moduleType) {
        return this._compileModuleAndComponents(moduleType, false).asyncResult;
      };
      JitCompiler.prototype.compileModuleAndAllComponentsSync = function(moduleType) {
        return this._compileModuleAndAllComponents(moduleType, true).syncResult;
      };
      JitCompiler.prototype.compileModuleAndAllComponentsAsync = function(moduleType) {
        return this._compileModuleAndAllComponents(moduleType, false).asyncResult;
      };
      JitCompiler.prototype.getNgContentSelectors = function(component) {
        var template = this._compiledTemplateCache.get(component);
        if (!template) {
          throw new Error("The component " + stringify(component) + " is not yet compiled!");
        }
        return template.compMeta.template.ngContentSelectors;
      };
      JitCompiler.prototype._compileModuleAndComponents = function(moduleType, isSync) {
        var _this = this;
        var loadingPromise = this._loadModules(moduleType, isSync);
        var createResult = function() {
          _this._compileComponents(moduleType, null);
          return _this._compileModule(moduleType);
        };
        if (isSync) {
          return new SyncAsyncResult(createResult());
        } else {
          return new SyncAsyncResult(null, loadingPromise.then(createResult));
        }
      };
      JitCompiler.prototype._compileModuleAndAllComponents = function(moduleType, isSync) {
        var _this = this;
        var loadingPromise = this._loadModules(moduleType, isSync);
        var createResult = function() {
          var componentFactories = [];
          _this._compileComponents(moduleType, componentFactories);
          return new _angular_core.ModuleWithComponentFactories(_this._compileModule(moduleType), componentFactories);
        };
        if (isSync) {
          return new SyncAsyncResult(createResult());
        } else {
          return new SyncAsyncResult(null, loadingPromise.then(createResult));
        }
      };
      JitCompiler.prototype._loadModules = function(mainModule, isSync) {
        var _this = this;
        var loadingPromises = [];
        var ngModule = this._metadataResolver.getNgModuleMetadata(mainModule);
        ngModule.transitiveModule.modules.forEach(function(localModuleMeta) {
          loadingPromises.push(_this._metadataResolver.loadNgModuleDirectiveAndPipeMetadata(localModuleMeta.reference, isSync));
        });
        return Promise.all(loadingPromises);
      };
      JitCompiler.prototype._compileModule = function(moduleType) {
        var _this = this;
        var ngModuleFactory = this._compiledNgModuleCache.get(moduleType);
        if (!ngModuleFactory) {
          var moduleMeta_1 = this._metadataResolver.getNgModuleMetadata(moduleType);
          var extraProviders = [this._metadataResolver.getProviderMetadata(new ProviderMeta(_angular_core.Compiler, {useFactory: function() {
              return new ModuleBoundCompiler(_this, moduleMeta_1.type.reference);
            }}))];
          var compileResult = this._ngModuleCompiler.compile(moduleMeta_1, extraProviders);
          compileResult.dependencies.forEach(function(dep) {
            dep.placeholder.reference = _this._assertComponentKnown(dep.comp.reference, true).proxyComponentFactory;
          });
          if (!this._compilerConfig.useJit) {
            ngModuleFactory = interpretStatements(compileResult.statements, compileResult.ngModuleFactoryVar);
          } else {
            ngModuleFactory = jitStatements("/" + identifierName(moduleMeta_1.type) + "/module.ngfactory.js", compileResult.statements, compileResult.ngModuleFactoryVar);
          }
          this._compiledNgModuleCache.set(moduleMeta_1.type.reference, ngModuleFactory);
        }
        return ngModuleFactory;
      };
      JitCompiler.prototype._compileComponents = function(mainModule, allComponentFactories) {
        var _this = this;
        var ngModule = this._metadataResolver.getNgModuleMetadata(mainModule);
        var moduleByDirective = new Map();
        var templates = new Set();
        ngModule.transitiveModule.modules.forEach(function(localModuleSummary) {
          var localModuleMeta = _this._metadataResolver.getNgModuleMetadata(localModuleSummary.reference);
          localModuleMeta.declaredDirectives.forEach(function(dirIdentifier) {
            moduleByDirective.set(dirIdentifier.reference, localModuleMeta);
            var dirMeta = _this._metadataResolver.getDirectiveMetadata(dirIdentifier.reference);
            _this._compileDirectiveWrapper(dirMeta, localModuleMeta);
            if (dirMeta.isComponent) {
              templates.add(_this._createCompiledTemplate(dirMeta, localModuleMeta));
              if (allComponentFactories) {
                var template = _this._createCompiledHostTemplate(dirMeta.type.reference, localModuleMeta);
                templates.add(template);
                allComponentFactories.push(template.proxyComponentFactory);
              }
            }
          });
        });
        ngModule.transitiveModule.modules.forEach(function(localModuleSummary) {
          var localModuleMeta = _this._metadataResolver.getNgModuleMetadata(localModuleSummary.reference);
          localModuleMeta.declaredDirectives.forEach(function(dirIdentifier) {
            var dirMeta = _this._metadataResolver.getDirectiveMetadata(dirIdentifier.reference);
            if (dirMeta.isComponent) {
              dirMeta.entryComponents.forEach(function(entryComponentType) {
                var moduleMeta = moduleByDirective.get(entryComponentType.reference);
                templates.add(_this._createCompiledHostTemplate(entryComponentType.reference, moduleMeta));
              });
            }
          });
          localModuleMeta.entryComponents.forEach(function(entryComponentType) {
            var moduleMeta = moduleByDirective.get(entryComponentType.reference);
            templates.add(_this._createCompiledHostTemplate(entryComponentType.reference, moduleMeta));
          });
        });
        templates.forEach(function(template) {
          return _this._compileTemplate(template);
        });
      };
      JitCompiler.prototype.clearCacheFor = function(type) {
        this._compiledNgModuleCache.delete(type);
        this._metadataResolver.clearCacheFor(type);
        this._compiledHostTemplateCache.delete(type);
        var compiledTemplate = this._compiledTemplateCache.get(type);
        if (compiledTemplate) {
          this._compiledTemplateCache.delete(type);
        }
      };
      JitCompiler.prototype.clearCache = function() {
        this._metadataResolver.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledHostTemplateCache.clear();
        this._compiledNgModuleCache.clear();
      };
      JitCompiler.prototype._createCompiledHostTemplate = function(compType, ngModule) {
        if (!ngModule) {
          throw new Error("Component " + stringify(compType) + " is not part of any NgModule or the module has not been imported into your module.");
        }
        var compiledTemplate = this._compiledHostTemplateCache.get(compType);
        if (!compiledTemplate) {
          var compMeta = this._metadataResolver.getDirectiveMetadata(compType);
          assertComponent(compMeta);
          var HostClass = function HostClass() {};
          ((HostClass)).overriddenName = identifierName(compMeta.type) + "_Host";
          var hostMeta = createHostComponentMeta(HostClass, compMeta);
          compiledTemplate = new CompiledTemplate(true, compMeta.selector, compMeta.type, hostMeta, ngModule, [compMeta.type]);
          this._compiledHostTemplateCache.set(compType, compiledTemplate);
        }
        return compiledTemplate;
      };
      JitCompiler.prototype._createCompiledTemplate = function(compMeta, ngModule) {
        var compiledTemplate = this._compiledTemplateCache.get(compMeta.type.reference);
        if (!compiledTemplate) {
          assertComponent(compMeta);
          compiledTemplate = new CompiledTemplate(false, compMeta.selector, compMeta.type, compMeta, ngModule, ngModule.transitiveModule.directives);
          this._compiledTemplateCache.set(compMeta.type.reference, compiledTemplate);
        }
        return compiledTemplate;
      };
      JitCompiler.prototype._assertComponentKnown = function(compType, isHost) {
        var compiledTemplate = isHost ? this._compiledHostTemplateCache.get(compType) : this._compiledTemplateCache.get(compType);
        if (!compiledTemplate) {
          throw new Error("Illegal state: Compiled view for component " + stringify(compType) + " (host: " + isHost + ") does not exist!");
        }
        return compiledTemplate;
      };
      JitCompiler.prototype._assertDirectiveWrapper = function(dirType) {
        var dirWrapper = this._compiledDirectiveWrapperCache.get(dirType);
        if (!dirWrapper) {
          throw new Error("Illegal state: Directive wrapper for " + stringify(dirType) + " has not been compiled!");
        }
        return dirWrapper;
      };
      JitCompiler.prototype._compileDirectiveWrapper = function(dirMeta, moduleMeta) {
        var compileResult = this._directiveWrapperCompiler.compile(dirMeta);
        var statements = compileResult.statements;
        var directiveWrapperClass;
        if (!this._compilerConfig.useJit) {
          directiveWrapperClass = interpretStatements(statements, compileResult.dirWrapperClassVar);
        } else {
          directiveWrapperClass = jitStatements("/" + identifierName(moduleMeta.type) + "/" + identifierName(dirMeta.type) + "/wrapper.ngfactory.js", statements, compileResult.dirWrapperClassVar);
        }
        this._compiledDirectiveWrapperCache.set(dirMeta.type.reference, directiveWrapperClass);
      };
      JitCompiler.prototype._compileTemplate = function(template) {
        var _this = this;
        if (template.isCompiled) {
          return;
        }
        var compMeta = template.compMeta;
        var externalStylesheetsByModuleUrl = new Map();
        var stylesCompileResult = this._styleCompiler.compileComponent(compMeta);
        stylesCompileResult.externalStylesheets.forEach(function(r) {
          externalStylesheetsByModuleUrl.set(r.meta.moduleUrl, r);
        });
        this._resolveStylesCompileResult(stylesCompileResult.componentStylesheet, externalStylesheetsByModuleUrl);
        var parsedAnimations = this._animationParser.parseComponent(compMeta);
        var directives = template.directives.map(function(dir) {
          return _this._metadataResolver.getDirectiveSummary(dir.reference);
        });
        var pipes = template.ngModule.transitiveModule.pipes.map(function(pipe) {
          return _this._metadataResolver.getPipeSummary(pipe.reference);
        });
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, template.ngModule.schemas, identifierName(compMeta.type));
        var compiledAnimations = this._animationCompiler.compile(identifierName(compMeta.type), parsedAnimations);
        var compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, variable(stylesCompileResult.componentStylesheet.stylesVar), pipes, compiledAnimations);
        compileResult.dependencies.forEach(function(dep) {
          var depTemplate;
          if (dep instanceof ViewClassDependency) {
            var vfd = (dep);
            depTemplate = _this._assertComponentKnown(vfd.comp.reference, false);
            vfd.placeholder.reference = depTemplate.proxyViewClass;
          } else if (dep instanceof ComponentFactoryDependency$1) {
            var cfd = (dep);
            depTemplate = _this._assertComponentKnown(cfd.comp.reference, true);
            cfd.placeholder.reference = depTemplate.proxyComponentFactory;
          } else if (dep instanceof DirectiveWrapperDependency) {
            var dwd = (dep);
            dwd.placeholder.reference = _this._assertDirectiveWrapper(dwd.dir.reference);
          }
        });
        var statements = (_a = stylesCompileResult.componentStylesheet.statements).concat.apply(_a, compiledAnimations.map(function(ca) {
          return ca.statements;
        })).concat(compileResult.statements);
        var viewClass;
        if (!this._compilerConfig.useJit) {
          viewClass = interpretStatements(statements, compileResult.viewClassVar);
        } else {
          viewClass = jitStatements("/" + identifierName(template.ngModule.type) + "/" + identifierName(template.compType) + "/" + (template.isHost ? 'host' : 'component') + ".ngfactory.js", statements, compileResult.viewClassVar);
        }
        template.compiled(viewClass);
        var _a;
      };
      JitCompiler.prototype._resolveStylesCompileResult = function(result, externalStylesheetsByModuleUrl) {
        var _this = this;
        result.dependencies.forEach(function(dep, i) {
          var nestedCompileResult = externalStylesheetsByModuleUrl.get(dep.moduleUrl);
          var nestedStylesArr = _this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
          dep.valuePlaceholder.reference = nestedStylesArr;
        });
      };
      JitCompiler.prototype._resolveAndEvalStylesCompileResult = function(result, externalStylesheetsByModuleUrl) {
        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
        if (!this._compilerConfig.useJit) {
          return interpretStatements(result.statements, result.stylesVar);
        } else {
          return jitStatements("/" + result.meta.moduleUrl + ".ngstyle.js", result.statements, result.stylesVar);
        }
      };
      JitCompiler = __decorate$17([CompilerInjectable(), __metadata$17('design:paramtypes', [_angular_core.Injector, CompileMetadataResolver, TemplateParser, StyleCompiler, ViewCompiler, NgModuleCompiler, DirectiveWrapperCompiler, CompilerConfig, AnimationParser])], JitCompiler);
      return JitCompiler;
    }());
    var CompiledTemplate = (function() {
      function CompiledTemplate(isHost, selector, compType, compMeta, ngModule, directives) {
        this.isHost = isHost;
        this.compType = compType;
        this.compMeta = compMeta;
        this.ngModule = ngModule;
        this.directives = directives;
        this._viewClass = null;
        this.isCompiled = false;
        var self = this;
        this.proxyViewClass = function() {
          if (!self._viewClass) {
            throw new Error("Illegal state: CompiledTemplate for " + stringify(self.compType) + " is not compiled yet!");
          }
          return self._viewClass.apply(this, arguments);
        };
        this.proxyComponentFactory = isHost ? new _angular_core.ComponentFactory(selector, this.proxyViewClass, compType.reference) : null;
      }
      CompiledTemplate.prototype.compiled = function(viewClass) {
        this._viewClass = viewClass;
        this.proxyViewClass.prototype = viewClass.prototype;
        this.isCompiled = true;
      };
      return CompiledTemplate;
    }());
    function assertComponent(meta) {
      if (!meta.isComponent) {
        throw new Error("Could not compile '" + identifierName(meta.type) + "' because it is not a component.");
      }
    }
    var ModuleBoundCompiler = (function() {
      function ModuleBoundCompiler(_delegate, _ngModule) {
        this._delegate = _delegate;
        this._ngModule = _ngModule;
      }
      Object.defineProperty(ModuleBoundCompiler.prototype, "_injector", {
        get: function() {
          return this._delegate.injector;
        },
        enumerable: true,
        configurable: true
      });
      ModuleBoundCompiler.prototype.compileModuleSync = function(moduleType) {
        return this._delegate.compileModuleSync(moduleType);
      };
      ModuleBoundCompiler.prototype.compileModuleAsync = function(moduleType) {
        return this._delegate.compileModuleAsync(moduleType);
      };
      ModuleBoundCompiler.prototype.compileModuleAndAllComponentsSync = function(moduleType) {
        return this._delegate.compileModuleAndAllComponentsSync(moduleType);
      };
      ModuleBoundCompiler.prototype.compileModuleAndAllComponentsAsync = function(moduleType) {
        return this._delegate.compileModuleAndAllComponentsAsync(moduleType);
      };
      ModuleBoundCompiler.prototype.getNgContentSelectors = function(component) {
        return this._delegate.getNgContentSelectors(component);
      };
      ModuleBoundCompiler.prototype.clearCache = function() {
        this._delegate.clearCache();
      };
      ModuleBoundCompiler.prototype.clearCacheFor = function(type) {
        this._delegate.clearCacheFor(type);
      };
      return ModuleBoundCompiler;
    }());
    var MessageBundle = (function() {
      function MessageBundle(_htmlParser, _implicitTags, _implicitAttrs) {
        this._htmlParser = _htmlParser;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
        this._messages = [];
      }
      MessageBundle.prototype.updateFromTemplate = function(html, url, interpolationConfig) {
        var htmlParserResult = this._htmlParser.parse(html, url, true, interpolationConfig);
        if (htmlParserResult.errors.length) {
          return htmlParserResult.errors;
        }
        var i18nParserResult = extractMessages(htmlParserResult.rootNodes, interpolationConfig, this._implicitTags, this._implicitAttrs);
        if (i18nParserResult.errors.length) {
          return i18nParserResult.errors;
        }
        (_a = this._messages).push.apply(_a, i18nParserResult.messages);
        var _a;
      };
      MessageBundle.prototype.getMessages = function() {
        return this._messages;
      };
      MessageBundle.prototype.write = function(serializer) {
        return serializer.write(this._messages);
      };
      return MessageBundle;
    }());
    var Extractor = (function() {
      function Extractor(host, staticSymbolResolver, messageBundle, metadataResolver) {
        this.host = host;
        this.staticSymbolResolver = staticSymbolResolver;
        this.messageBundle = messageBundle;
        this.metadataResolver = metadataResolver;
      }
      Extractor.prototype.extract = function(rootFiles) {
        var _this = this;
        var programSymbols = extractProgramSymbols(this.staticSymbolResolver, rootFiles, this.host);
        var _a = analyzeAndValidateNgModules(programSymbols, this.host, this.metadataResolver),
            files = _a.files,
            ngModules = _a.ngModules;
        return Promise.all(ngModules.map(function(ngModule) {
          return _this.metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false);
        })).then(function() {
          var errors = [];
          files.forEach(function(file) {
            var compMetas = [];
            file.directives.forEach(function(directiveType) {
              var dirMeta = _this.metadataResolver.getDirectiveMetadata(directiveType);
              if (dirMeta && dirMeta.isComponent) {
                compMetas.push(dirMeta);
              }
            });
            compMetas.forEach(function(compMeta) {
              var html = compMeta.template.template;
              var interpolationConfig = InterpolationConfig.fromArray(compMeta.template.interpolation);
              errors.push.apply(errors, _this.messageBundle.updateFromTemplate(html, file.srcUrl, interpolationConfig));
            });
          });
          if (errors.length) {
            throw new Error(errors.map(function(e) {
              return e.toString();
            }).join('\n'));
          }
          return _this.messageBundle;
        });
      };
      Extractor.create = function(host) {
        var htmlParser = new I18NHtmlParser(new HtmlParser());
        var urlResolver = createOfflineCompileUrlResolver();
        var symbolCache = new StaticSymbolCache();
        var summaryResolver = new AotSummaryResolver(host, symbolCache);
        var staticSymbolResolver = new StaticSymbolResolver(host, symbolCache, summaryResolver);
        var staticReflector = new StaticReflector(staticSymbolResolver);
        StaticAndDynamicReflectionCapabilities.install(staticReflector);
        var config = new CompilerConfig({
          genDebugInfo: false,
          defaultEncapsulation: _angular_core.ViewEncapsulation.Emulated,
          logBindingUpdate: false,
          useJit: false
        });
        var normalizer = new DirectiveNormalizer({get: function(url) {
            return host.loadResource(url);
          }}, urlResolver, htmlParser, config);
        var elementSchemaRegistry = new DomElementSchemaRegistry();
        var resolver = new CompileMetadataResolver(new NgModuleResolver(staticReflector), new DirectiveResolver(staticReflector), new PipeResolver(staticReflector), summaryResolver, elementSchemaRegistry, normalizer, staticReflector);
        var messageBundle = new MessageBundle(htmlParser, [], {});
        var extractor = new Extractor(host, staticSymbolResolver, messageBundle, resolver);
        return {
          extractor: extractor,
          staticReflector: staticReflector
        };
      };
      return Extractor;
    }());
    var __decorate$18 = (this && this.__decorate) || function(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$18 = (this && this.__metadata) || function(k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
    };
    var _NO_RESOURCE_LOADER = {get: function(url) {
        throw new Error("No ResourceLoader implementation has been provided. Can't read the url \"" + url + "\"");
      }};
    var baseHtmlParser = new _angular_core.OpaqueToken('HtmlParser');
    var COMPILER_PROVIDERS = [{
      provide: Reflector,
      useValue: reflector
    }, {
      provide: ReflectorReader,
      useExisting: Reflector
    }, {
      provide: ResourceLoader,
      useValue: _NO_RESOURCE_LOADER
    }, SummaryResolver, Console, Lexer, Parser, {
      provide: baseHtmlParser,
      useClass: HtmlParser
    }, {
      provide: I18NHtmlParser,
      useFactory: function(parser, translations, format) {
        return new I18NHtmlParser(parser, translations, format);
      },
      deps: [baseHtmlParser, [new _angular_core.Optional(), new _angular_core.Inject(_angular_core.TRANSLATIONS)], [new _angular_core.Optional(), new _angular_core.Inject(_angular_core.TRANSLATIONS_FORMAT)]]
    }, {
      provide: HtmlParser,
      useExisting: I18NHtmlParser
    }, TemplateParser, DirectiveNormalizer, CompileMetadataResolver, DEFAULT_PACKAGE_URL_PROVIDER, StyleCompiler, ViewCompiler, NgModuleCompiler, DirectiveWrapperCompiler, {
      provide: CompilerConfig,
      useValue: new CompilerConfig()
    }, JitCompiler, {
      provide: _angular_core.Compiler,
      useExisting: JitCompiler
    }, DomElementSchemaRegistry, {
      provide: ElementSchemaRegistry,
      useExisting: DomElementSchemaRegistry
    }, UrlResolver, DirectiveResolver, PipeResolver, NgModuleResolver, AnimationParser];
    var JitCompilerFactory = (function() {
      function JitCompilerFactory(defaultOptions) {
        this._defaultOptions = [{
          useDebug: _angular_core.isDevMode(),
          useJit: true,
          defaultEncapsulation: _angular_core.ViewEncapsulation.Emulated
        }].concat(defaultOptions);
      }
      JitCompilerFactory.prototype.createCompiler = function(options) {
        if (options === void 0) {
          options = [];
        }
        var mergedOptions = _mergeOptions(this._defaultOptions.concat(options));
        var injector = _angular_core.ReflectiveInjector.resolveAndCreate([COMPILER_PROVIDERS, {
          provide: CompilerConfig,
          useFactory: function() {
            return new CompilerConfig({
              genDebugInfo: mergedOptions.useDebug,
              useJit: mergedOptions.useJit,
              defaultEncapsulation: mergedOptions.defaultEncapsulation,
              logBindingUpdate: mergedOptions.useDebug
            });
          },
          deps: []
        }, mergedOptions.providers]);
        return injector.get(_angular_core.Compiler);
      };
      JitCompilerFactory.ctorParameters = function() {
        return [{
          type: Array,
          decorators: [{
            type: _angular_core.Inject,
            args: [_angular_core.COMPILER_OPTIONS]
          }]
        }];
      };
      JitCompilerFactory = __decorate$18([CompilerInjectable(), __metadata$18('design:paramtypes', [Array])], JitCompilerFactory);
      return JitCompilerFactory;
    }());
    function _initReflector() {
      reflector.reflectionCapabilities = new ReflectionCapabilities();
    }
    var platformCoreDynamic = _angular_core.createPlatformFactory(_angular_core.platformCore, 'coreDynamic', [{
      provide: _angular_core.COMPILER_OPTIONS,
      useValue: {},
      multi: true
    }, {
      provide: _angular_core.CompilerFactory,
      useClass: JitCompilerFactory
    }, {
      provide: _angular_core.PLATFORM_INITIALIZER,
      useValue: _initReflector,
      multi: true
    }]);
    function _mergeOptions(optionsArr) {
      return {
        useDebug: _lastDefined(optionsArr.map(function(options) {
          return options.useDebug;
        })),
        useJit: _lastDefined(optionsArr.map(function(options) {
          return options.useJit;
        })),
        defaultEncapsulation: _lastDefined(optionsArr.map(function(options) {
          return options.defaultEncapsulation;
        })),
        providers: _mergeArrays(optionsArr.map(function(options) {
          return options.providers;
        }))
      };
    }
    function _lastDefined(args) {
      for (var i = args.length - 1; i >= 0; i--) {
        if (args[i] !== undefined) {
          return args[i];
        }
      }
      return undefined;
    }
    function _mergeArrays(parts) {
      var result = [];
      parts.forEach(function(part) {
        return part && result.push.apply(result, part);
      });
      return result;
    }
    var ImportResolver = (function() {
      function ImportResolver() {}
      ImportResolver.prototype.fileNameToModuleName = function(importedFilePath, containingFilePath) {};
      return ImportResolver;
    }());
    exports.VERSION = VERSION;
    exports.TextAst = TextAst;
    exports.BoundTextAst = BoundTextAst;
    exports.AttrAst = AttrAst;
    exports.BoundElementPropertyAst = BoundElementPropertyAst;
    exports.BoundEventAst = BoundEventAst;
    exports.ReferenceAst = ReferenceAst;
    exports.VariableAst = VariableAst;
    exports.ElementAst = ElementAst;
    exports.EmbeddedTemplateAst = EmbeddedTemplateAst;
    exports.BoundDirectivePropertyAst = BoundDirectivePropertyAst;
    exports.DirectiveAst = DirectiveAst;
    exports.ProviderAst = ProviderAst;
    exports.ProviderAstType = ProviderAstType;
    exports.NgContentAst = NgContentAst;
    exports.PropertyBindingType = PropertyBindingType;
    exports.templateVisitAll = templateVisitAll;
    exports.TEMPLATE_TRANSFORMS = TEMPLATE_TRANSFORMS;
    exports.CompilerConfig = CompilerConfig;
    exports.RenderTypes = RenderTypes;
    exports.CompileAnimationEntryMetadata = CompileAnimationEntryMetadata;
    exports.CompileAnimationStateMetadata = CompileAnimationStateMetadata;
    exports.CompileAnimationStateDeclarationMetadata = CompileAnimationStateDeclarationMetadata;
    exports.CompileAnimationStateTransitionMetadata = CompileAnimationStateTransitionMetadata;
    exports.CompileAnimationMetadata = CompileAnimationMetadata;
    exports.CompileAnimationKeyframesSequenceMetadata = CompileAnimationKeyframesSequenceMetadata;
    exports.CompileAnimationStyleMetadata = CompileAnimationStyleMetadata;
    exports.CompileAnimationAnimateMetadata = CompileAnimationAnimateMetadata;
    exports.CompileAnimationWithStepsMetadata = CompileAnimationWithStepsMetadata;
    exports.CompileAnimationSequenceMetadata = CompileAnimationSequenceMetadata;
    exports.CompileAnimationGroupMetadata = CompileAnimationGroupMetadata;
    exports.identifierName = identifierName;
    exports.identifierModuleUrl = identifierModuleUrl;
    exports.CompileSummaryKind = CompileSummaryKind;
    exports.tokenName = tokenName;
    exports.tokenReference = tokenReference;
    exports.CompileStylesheetMetadata = CompileStylesheetMetadata;
    exports.CompileTemplateMetadata = CompileTemplateMetadata;
    exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
    exports.createHostComponentMeta = createHostComponentMeta;
    exports.CompilePipeMetadata = CompilePipeMetadata;
    exports.CompileNgModuleMetadata = CompileNgModuleMetadata;
    exports.TransitiveCompileNgModuleMetadata = TransitiveCompileNgModuleMetadata;
    exports.ProviderMeta = ProviderMeta;
    exports.createAotCompiler = createAotCompiler;
    exports.AotCompiler = AotCompiler;
    exports.analyzeNgModules = analyzeNgModules;
    exports.analyzeAndValidateNgModules = analyzeAndValidateNgModules;
    exports.extractProgramSymbols = extractProgramSymbols;
    exports.StaticReflector = StaticReflector;
    exports.StaticAndDynamicReflectionCapabilities = StaticAndDynamicReflectionCapabilities;
    exports.StaticSymbol = StaticSymbol;
    exports.StaticSymbolCache = StaticSymbolCache;
    exports.ResolvedStaticSymbol = ResolvedStaticSymbol;
    exports.StaticSymbolResolver = StaticSymbolResolver;
    exports.AotSummaryResolver = AotSummaryResolver;
    exports.SummaryResolver = SummaryResolver;
    exports.JitCompiler = JitCompiler;
    exports.COMPILER_PROVIDERS = COMPILER_PROVIDERS;
    exports.JitCompilerFactory = JitCompilerFactory;
    exports.platformCoreDynamic = platformCoreDynamic;
    exports.createUrlResolverWithoutPackagePrefix = createUrlResolverWithoutPackagePrefix;
    exports.createOfflineCompileUrlResolver = createOfflineCompileUrlResolver;
    exports.DEFAULT_PACKAGE_URL_PROVIDER = DEFAULT_PACKAGE_URL_PROVIDER;
    exports.UrlResolver = UrlResolver;
    exports.getUrlScheme = getUrlScheme;
    exports.ResourceLoader = ResourceLoader;
    exports.DirectiveResolver = DirectiveResolver;
    exports.PipeResolver = PipeResolver;
    exports.NgModuleResolver = NgModuleResolver;
    exports.DEFAULT_INTERPOLATION_CONFIG = DEFAULT_INTERPOLATION_CONFIG;
    exports.InterpolationConfig = InterpolationConfig;
    exports.ElementSchemaRegistry = ElementSchemaRegistry;
    exports.Extractor = Extractor;
    exports.I18NHtmlParser = I18NHtmlParser;
    exports.MessageBundle = MessageBundle;
    exports.Serializer = Serializer;
    exports.Xliff = Xliff;
    exports.Xmb = Xmb;
    exports.Xtb = Xtb;
    exports.DirectiveNormalizer = DirectiveNormalizer;
    exports.TokenType = TokenType;
    exports.Lexer = Lexer;
    exports.Token = Token;
    exports.EOF = EOF;
    exports.isIdentifier = isIdentifier;
    exports.isQuote = isQuote;
    exports.SplitInterpolation = SplitInterpolation;
    exports.TemplateBindingParseResult = TemplateBindingParseResult;
    exports.Parser = Parser;
    exports._ParseAST = _ParseAST;
    exports.ERROR_COLLECTOR_TOKEN = ERROR_COLLECTOR_TOKEN;
    exports.CompileMetadataResolver = CompileMetadataResolver;
    exports.componentModuleUrl = componentModuleUrl;
    exports.ParseTreeResult = ParseTreeResult;
    exports.TreeError = TreeError;
    exports.HtmlParser = HtmlParser;
    exports.NgModuleCompiler = NgModuleCompiler;
    exports.DirectiveWrapperCompiler = DirectiveWrapperCompiler;
    exports.ImportResolver = ImportResolver;
    exports.debugOutputAstAsTypeScript = debugOutputAstAsTypeScript;
    exports.TypeScriptEmitter = TypeScriptEmitter;
    exports.ParseLocation = ParseLocation;
    exports.ParseSourceFile = ParseSourceFile;
    exports.ParseSourceSpan = ParseSourceSpan;
    exports.ParseErrorLevel = ParseErrorLevel;
    exports.ParseError = ParseError;
    exports.DomElementSchemaRegistry = DomElementSchemaRegistry;
    exports.CssSelector = CssSelector;
    exports.SelectorMatcher = SelectorMatcher;
    exports.SelectorListContext = SelectorListContext;
    exports.SelectorContext = SelectorContext;
    exports.StylesCompileDependency = StylesCompileDependency;
    exports.StylesCompileResult = StylesCompileResult;
    exports.CompiledStylesheet = CompiledStylesheet;
    exports.StyleCompiler = StyleCompiler;
    exports.TemplateParseError = TemplateParseError;
    exports.TemplateParseResult = TemplateParseResult;
    exports.TemplateParser = TemplateParser;
    exports.splitClasses = splitClasses;
    exports.createElementCssSelector = createElementCssSelector;
    exports.removeSummaryDuplicates = removeSummaryDuplicates;
    exports.ViewCompiler = ViewCompiler;
    exports.AnimationParser = AnimationParser;
    exports.SyntaxError = SyntaxError;
  }));
})(require('process'));
