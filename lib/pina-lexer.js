'use strict';

const PinaLexer = ((() => {
    let _streamText;
    let _streamLen;
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

    class Lexer {
        constructor(streamText) {
            _streamText = streamText;
            _streamLen = streamText.length;
            _cursorPos = 0;
            _line = 1;
        }

        static getCurrentChar() {
            return _streamText.charAt(_cursorPos);
        };

        static skipWhiteSpace() {
            while (_cursorPos < _streamLen) {
                let currentChar = Lexer.getCurrentChar();

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

        static isAlphaNumeric (char) {
            return (char >= 'a' && char <= 'z') ||
                (char >= 'A' && char <= 'Z') ||
                (char >= '0' && char <= '9');
        }

        static isNumber (char) {
            return ((char >0 && char <=9) || char == ".");
        }

        static isOperator(char) {
            return _operators[char] !== undefined ? _operators[char] : false;
        };

        static isQuote(char) {
            return char == '"' || char == "'";
        };

        static lexIdentifier() {
            let _endPos = _cursorPos + 1;

            while (_endPos < _streamLen &&
            Lexer.isAlphaNumeric(_streamText.charAt(_endPos))) {
                _endPos++;
            }

            let token = {
                tokenType: 'IDENTIFIER',
                value: _streamText.substring(_cursorPos, _endPos),
                column: _cursorPos,
                line: _line
            };

            _cursorPos = _endPos;

            return token;
        }

        static lexNumber() {
            let _endPos = _cursorPos + 1;

            while (_endPos < _streamLen &&
            Lexer.isNumber(_streamText.charAt(_endPos))) {
                _endPos++;
            }

            let token = {
                tokenType: 'NUMBER',
                value: _streamText.substring(_cursorPos, _endPos),
                column: _cursorPos,
                line: _line
            };

            _cursorPos = _endPos;

            return token;
        }

        static lexString() {
            let _endQuote = _streamText.indexOf('"', _cursorPos + 1);

            if (_endQuote !== -1) {
                _cursorPos++;
            }
            else {
                _endQuote = _streamText.indexOf("'", _cursorPos + 1);
                if (_endQuote !== -1) {
                    _cursorPos++;
                }
                else {
                    return false;
                }
            }

            let token = {
                tokenType: 'STRING',
                value: _streamText.substring(_cursorPos, _endQuote),
                column: _cursorPos,
                line: _line
            };

            _cursorPos = _endQuote + 1;

            return token;
        }
    }

    Lexer.prototype.nextToken = () => {
        Lexer.skipWhiteSpace();

        if (_cursorPos >= _streamLen) {
            return false;
        }

        let currentChar = Lexer.getCurrentChar();

        if (Lexer.isNumber(currentChar)) {
            return Lexer.lexNumber();
        }
        else if (Lexer.isAlphaNumeric(currentChar)) {
            return Lexer.lexIdentifier();
        }
        else if (Lexer.isQuote(currentChar)) {
            return Lexer.lexString();
        }
        else if (Lexer.isOperator(currentChar)) {

            let token = {
                tokenType: _operators[currentChar],
                value: currentChar,
                column: _cursorPos,
                line: _line
            };

            _cursorPos++;

            return token;
        }
        else {
            _cursorPos++;
        }

        return false;
    };

    return Lexer;
})());

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && typeof module.exports) {
        exports = module.exports = PinaLexer;
    }
}