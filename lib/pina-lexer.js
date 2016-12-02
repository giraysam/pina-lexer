'use strict';

let PinaLexer = {};

PinaLexer.core = ((() => {
    let _source;
    let _sourceLen;
    let _cursorPos;
    let _line;

    let _operators = {
        '+':  'PLUS',
        '-':  'MINUS',
        '*':  'MULTIPLY',
        '.':  'PERIOD',
        '\\': 'BACKSLASH',
        ':':  'COLON',
        '%':  'PERCENT',
        '|':  'PIPE',
        '!':  'EXCLAMATION',
        '?':  'QUESTION',
        '#':  'POUND',
        '&':  'AMPERSAND',
        ';':  'SEMI',
        ',':  'COMMA',
        '(':  'L_PAREN',
        ')':  'R_PAREN',
        '<':  'L_ANG',
        '>':  'R_ANG',
        '{':  'L_BRACE',
        '}':  'R_BRACE',
        '[':  'L_BRACKET',
        ']':  'R_BRACKET',
        '=':  'EQUALS'
    };

    class LexerState {
        constructor() {
            this.next = null;
        }

        setNext(state) {
            this.next = state;
            return state;
        }

        nextToken() {

            this.skipWhiteSpace();

            if (_cursorPos >= _sourceLen) {
                return false;
            }
            else {

                let result = this.token();

                if (result == false) {
                    if (this.next != null) {
                        return this.next.nextToken();
                    }
                }

                return result;
            }
        }

        token() {
            return false;
        }

        skipWhiteSpace() {
            while (_cursorPos < _sourceLen) {
                let currentChar = this.getCurrentChar();

                if (currentChar == ' ' || currentChar == '\t' ||
                    currentChar == '\r' || currentChar == '\n') {

                    if (currentChar == '\n') {
                        _line++;
                    }
                    _cursorPos++;
                }
                else {
                    break;
                }
            }
        }

        getCurrentChar() {
            return _source.charAt(_cursorPos);
        }

        getLine() {
            return _line;
        }

        getCursorPos() {
            return _cursorPos;
        }

        setCursorPos(newValue) {
            _cursorPos = newValue;
        }

        isAlphaNumeric (char) {
            return (char >= 'a' && char <= 'z') ||
                (char >= 'A' && char <= 'Z') ||
                (char >= '0' && char <= '9') ||
                char == '_' || char == '-' || char == '$';
        }

        isNumber(char) {
            return ((char >= 0 && char <= 9) || char == ".");
        }

        isOperator(char) {
            return _operators[char] !== undefined ? _operators[char] : false;
        };

        isQuote(char) {
            return char == '"' || char == "'" || char == "`";
        };

        isNewLine(char) {
            return char == '\n' || char == "\r";
        };
    }


    LexerState.prototype.setSource = (source) => {
        _source = source;
        _sourceLen = _source.length;
        _cursorPos = 0;
        _line = 1;
    };

    class LexIdentifier extends LexerState {

        token() {

            let c = this.getCurrentChar();

            if (!this.isAlphaNumeric(c)) {
                return false;
            }

            let _endPos = _cursorPos + 1;

            while (_endPos < _sourceLen && this.isAlphaNumeric(_source.charAt(_endPos))) {
                _endPos++;
            }

            let token = {
                tokenType: 'IDENTIFIER',
                value: _source.substring(_cursorPos, _endPos),
                position: _cursorPos,
                line: _line
            };

            _cursorPos = _endPos;

            return token;
        }
    }

    class LexNumber extends LexerState {

        token() {

            let c = this.getCurrentChar();

            if (!this.isNumber(c)) {
                return false;
            }

            let _endPos = _cursorPos + 1;

            while (_endPos < _sourceLen && this.isNumber(_source.charAt(_endPos))) {
                _endPos++;
            }

            let token = {
                tokenType: 'NUMBER',
                value: _source.substring(_cursorPos, _endPos),
                position: _cursorPos,
                line: _line
            };

            _cursorPos = _endPos;

            return token;
        }
    }

    class LexString extends LexerState {

        token() {

            let c = this.getCurrentChar();

            if (!this.isQuote(c)) {
                return false;
            }

            let _endQuote;

            if (this.getCurrentChar() == '"' ||
                this.getCurrentChar() == "'" ||
                this.getCurrentChar() == "`") {

                _endQuote = _source.indexOf(this.getCurrentChar(), _cursorPos + 1);

                if (_endQuote !== -1) {
                    _cursorPos++;
                }
                else {
                    return false;
                }
            }

            let token = {
                tokenType: 'STRING',
                value: _source.substring(_cursorPos, _endQuote),
                position: _cursorPos,
                line: _line
            };

            _cursorPos = _endQuote + 1;

            return token;
        }
    }

    class LexComment extends LexerState {

        token() {

            let c = this.getCurrentChar();

            if (c == "/") {

                if (_source.charAt(_cursorPos + 1) != "/") {

                    if (_source.charAt(_cursorPos + 1) == "*") {
                        let _endPos = _source.indexOf("*/", _cursorPos);

                        if (_endPos === -1) {
                            return false;
                        }

                        _endPos += 2;

                        let token = {
                            tokenType: 'COMMENT-MULTILINE',
                            value: _source.substring(_cursorPos, _endPos),
                            position: _cursorPos,
                            line: _line
                        };

                        _cursorPos = _endPos;

                        return token;
                    }
                    else {

                        _cursorPos++;

                        return {
                            tokenType: 'DEVIDE',
                            value: _source.substring(_cursorPos - 1, _cursorPos),
                            position: _cursorPos,
                            line: _line
                        };
                    }
                }
            }
            else {
                return false;
            }

            let _endPos = _cursorPos + 2;

            while (_endPos < _sourceLen && !this.isNewLine(_source.charAt(_endPos))) {
                _endPos++;
            }

            let token = {
                tokenType: 'COMMENT',
                value: _source.substring(_cursorPos, _endPos),
                position: _cursorPos,
                line: _line
            };

            _cursorPos = _endPos;

            return token;
        }
    }

    class LexOperator extends LexerState {

        token() {

            let c = this.getCurrentChar();

            if (!this.isOperator(c)) {
                return false;
            }

            let token = {
                tokenType: _operators[c],
                value: c,
                position: _cursorPos,
                line: _line
            };

            _cursorPos++;

            return token;
        }
    }

    return {
        LexerState,
        LexComment,
        LexNumber,
        LexIdentifier,
        LexString,
        LexOperator
    };

})());

PinaLexer.default = ((() => {

    class Lexer {
        constructor(source) {
            this.lexerState = new PinaLexer.core.LexerState();
            this.lexComment = new PinaLexer.core.LexComment();
            this.lexNumber = new PinaLexer.core.LexNumber();
            this.lexIdentifier = new PinaLexer.core.LexIdentifier();
            this.lexString = new PinaLexer.core.LexString();
            this.lexOperator = new PinaLexer.core.LexOperator();

            this.lexerState.setSource(source);

            this.lexerState
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

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && typeof module.exports) {
        module.exports = PinaLexer;
    }
}
