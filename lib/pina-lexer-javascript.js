'use strict';

PinaLexer.javascript = ((() => {

    let _keywords = {
        'abstract': 'KEYWORD-abstract',
        'arguments': 'KEYWORD-arguments',
        'boolean': 'KEYWORD-boolean',
        'break': 'KEYWORD-break',
        'byte': 'KEYWORD-byte',
        'case': 'KEYWORD-case',
        'catch': 'KEYWORD-catch',
        'char': 'KEYWORD-char',
        'class': 'KEYWORD-class',
        'const': 'KEYWORD-const',
        'continue': 'KEYWORD-continue',
        'debugger': 'KEYWORD-debugger',
        'default': 'KEYWORD-default',
        'delete': 'KEYWORD-delete',
        'do': 'KEYWORD-do',
        'double': 'KEYWORD-double',
        'else': 'KEYWORD-else',
        'enum': 'KEYWORD-enum',
        'eval': 'KEYWORD-eval',
        'export': 'KEYWORD-export',
        'extends': 'KEYWORD-extends',
        'false': 'KEYWORD-false',
        'final': 'KEYWORD-final',
        'finally': 'KEYWORD-finally',
        'float': 'KEYWORD-float',
        'for': 'KEYWORD-for',
        'function': 'KEYWORD-function',
        'goto': 'KEYWORD-goto',
        'if': 'KEYWORD-if',
        'implements': 'KEYWORD-implements',
        'import': 'KEYWORD-import',
        'in': 'KEYWORD-in',
        'instanceof': 'KEYWORD-instanceof',
        'int': 'KEYWORD-int',
        'interface': 'KEYWORD-interface',
        'let': 'KEYWORD-let',
        'long': 'KEYWORD-long',
        'native': 'KEYWORD-native',
        'new': 'KEYWORD-new',
        'null': 'KEYWORD-null',
        'package': 'KEYWORD-package',
        'private': 'KEYWORD-private',
        'protected': 'KEYWORD-protected',
        'public': 'KEYWORD-public',
        'return': 'KEYWORD-return',
        'short': 'KEYWORD-short',
        'static': 'KEYWORD-static',
        'super': 'KEYWORD-super',
        'switch': 'KEYWORD-switch',
        'synchronized': 'KEYWORD-synchronized',
        'this': 'KEYWORD-this',
        'throw': 'KEYWORD-throw',
        'throws': 'KEYWORD-throws',
        'transient': 'KEYWORD-transient',
        'true': 'KEYWORD-true',
        'try': 'KEYWORD-try',
        'typeof': 'KEYWORD-typeof',
        'var': 'KEYWORD-var',
        'void': 'KEYWORD-void',
        'volatile': 'KEYWORD-volatile',
        'while': 'KEYWORD-while',
        'with': 'KEYWORD-with',
        'yield': 'KEYWORD-yield',
        'alert': 'KEYWORD-alert',
        'all': 'KEYWORD-all',
        'anchor': 'KEYWORD-anchor',
        'anchors': 'KEYWORD-anchors',
        'area': 'KEYWORD-area',
        'assign': 'KEYWORD-assign',
        'blur': 'KEYWORD-blur',
        'button': 'KEYWORD-button',
        'checkbox': 'KEYWORD-checkbox',
        'clearInterval': 'KEYWORD-clearInterval',
        'clearTimeout': 'KEYWORD-clearTimeout',
        'clientInformation': 'KEYWORD-clientInformation',
        'close': 'KEYWORD-close',
        'closed': 'KEYWORD-closed',
        'confirm': 'KEYWORD-confirm',
        'constructor': 'KEYWORD-constructor',
        'crypto': 'KEYWORD-crypto',
        'decodeURI': 'KEYWORD-decodeURI',
        'decodeURIComponent': 'KEYWORD-decodeURIComponent',
        'defaultStatus': 'KEYWORD-defaultStatus',
        'document': 'KEYWORD-document',
        'element': 'KEYWORD-element',
        'elements': 'KEYWORD-elements',
        'embed': 'KEYWORD-embed',
        'embeds': 'KEYWORD-embeds',
        'encodeURI': 'KEYWORD-encodeURI',
        'encodeURIComponent': 'KEYWORD-encodeURIComponent',
        'escape': 'KEYWORD-escape',
        'event': 'KEYWORD-event',
        'fileUpload': 'KEYWORD-fileUpload',
        'focus': 'KEYWORD-focus',
        'form': 'KEYWORD-form',
        'forms': 'KEYWORD-forms',
        'frame': 'KEYWORD-frame',
        'innerHeight': 'KEYWORD-innerHeight',
        'innerWidth': 'KEYWORD-innerWidth',
        'layer': 'KEYWORD-layer',
        'layers': 'KEYWORD-layers',
        'link': 'KEYWORD-link',
        'location': 'KEYWORD-location',
        'mimeTypes': 'KEYWORD-mimeTypes',
        'navigate': 'KEYWORD-navigate',
        'navigator': 'KEYWORD-navigator',
        'frames': 'KEYWORD-frames',
        'frameRate': 'KEYWORD-frameRate',
        'hidden': 'KEYWORD-hidden',
        'history': 'KEYWORD-history',
        'image': 'KEYWORD-image',
        'images': 'KEYWORD-images',
        'offscreenBuffering': 'KEYWORD-offscreenBuffering',
        'open': 'KEYWORD-open',
        'opener': 'KEYWORD-opener',
        'option': 'KEYWORD-option',
        'outerHeight': 'KEYWORD-outerHeight',
        'outerWidth': 'KEYWORD-outerWidth',
        'packages': 'KEYWORD-packages',
        'pageXOffset': 'KEYWORD-pageXOffset',
        'pageYOffset': 'KEYWORD-pageYOffset',
        'parent': 'KEYWORD-parent',
        'parseFloat': 'KEYWORD-parseFloat',
        'parseInt': 'KEYWORD-parseInt',
        'password': 'KEYWORD-password',
        'pkcs11': 'KEYWORD-pkcs11',
        'plugin': 'KEYWORD-plugin',
        'prompt': 'KEYWORD-prompt',
        'propertyIsEnum': 'KEYWORD-propertyIsEnum',
        'radio': 'KEYWORD-radio',
        'reset': 'KEYWORD-reset',
        'screenX': 'KEYWORD-screenX',
        'screenY': 'KEYWORD-screenY',
        'scroll': 'KEYWORD-scroll',
        'secure': 'KEYWORD-secure',
        'select': 'KEYWORD-select',
        'self': 'KEYWORD-self',
        'setInterval': 'KEYWORD-setInterval',
        'setTimeout': 'KEYWORD-setTimeout',
        'status': 'KEYWORD-status',
        'submit': 'KEYWORD-submit',
        'taint': 'KEYWORD-taint',
        'text': 'KEYWORD-text',
        'textarea': 'KEYWORD-textarea',
        'top': 'KEYWORD-top',
        'unescape': 'KEYWORD-unescape',
        'untaint': 'KEYWORD-untaint',
        'window': 'KEYWORD-window',
    };

    let _objects = {
        'Array': 'OBJECT-Array',
        'Date': 'OBJECT-Date',
        'eval': 'OBJECT-eval',
        'hasOwnProperty': 'OBJECT-hasOwnProperty',
        'Infinity': 'OBJECT-Infinity',
        'isFinite': 'OBJECT-isFinite',
        'isNaN': 'OBJECT-isNaN',
        'isPrototypeOf': 'OBJECT-isPrototypeOf',
        'length': 'OBJECT-length',
        'Math': 'OBJECT-Math',
        'NaN': 'OBJECT-NaN',
        'name': 'OBJECT-name',
        'Number': 'OBJECT-Number',
        'Object': 'OBJECT-Object',
        'prototype': 'OBJECT-prototype',
        'String': 'OBJECT-String',
        'toString': 'OBJECT-toString',
        'undefined': 'OBJECT-undefined',
        'valueOf': 'OBJECT-valueOf',
    };

    let _source;
    let _sourceLen;

    let isKeyword = (char) => {
        return _keywords[char] !== undefined ? _keywords[char] : false;
    };

    let isObject = (char) => {
        return _objects[char] !== undefined ? _objects[char] : false;
    };

    class LexKeyword extends PinaLexer.core.LexerState {

        token() {

            let c = this.getCurrentChar();

            if (!this.isAlphaNumeric(c)) {
                return false;
            }

            let _endPos = this.getCursorPos() + 1;

            while (_endPos < _sourceLen && this.isAlphaNumeric(_source.charAt(_endPos))) {
                _endPos++;
            }

            let keyword = _source.substring(this.getCursorPos(), _endPos);

            if (!isKeyword(keyword)) {
                return false;
            }

            let token = {
                tokenType: _keywords[keyword],
                value: keyword,
                position: this.getCursorPos(),
                line: this.getLine()
            };

            this.setCursorPos(_endPos);

            return token;
        }
    }

    class LexObject extends PinaLexer.core.LexerState {

        token() {

            let c = this.getCurrentChar();

            if (!this.isAlphaNumeric(c)) {
                return false;
            }

            let _endPos = this.getCursorPos() + 1;

            while (_endPos < _sourceLen && this.isAlphaNumeric(_source.charAt(_endPos))) {
                _endPos++;
            }

            let keyword = _source.substring(this.getCursorPos(), _endPos);

            if (!isObject(keyword)) {
                return false;
            }

            let token = {
                tokenType: _objects[keyword],
                value: keyword,
                position: this.getCursorPos(),
                line: this.getLine()
            };

            this.setCursorPos(_endPos);

            return token;
        }
    }

    class Lexer {
        constructor(source) {

            _source = source;
            _sourceLen = source.length;

            this.lexerState = new PinaLexer.core.LexerState();
            this.lexComment = new PinaLexer.core.LexComment();
            this.lexNumber = new PinaLexer.core.LexNumber();
            this.lexIdentifier = new PinaLexer.core.LexIdentifier();
            this.lexString = new PinaLexer.core.LexString();
            this.lexOperator = new PinaLexer.core.LexOperator();
            this.lexKeyword = new LexKeyword();
            this.lexObject = new LexObject();


            this.lexerState.setSource(source);

            this.lexerState
                .setNext(this.lexKeyword)
                .setNext(this.lexObject)
                .setNext(this.lexComment)
                .setNext(this.lexOperator)
                .setNext(this.lexNumber)
                .setNext(this.lexIdentifier)
                .setNext(this.lexString);
        }

        nextToken() {
            return this.lexerState.nextToken();
        }
    }

    return {
        Lexer
    };

})());
