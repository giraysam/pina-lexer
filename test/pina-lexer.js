'use strict';

let assert = require("chai").assert;
let expect = require("chai").expect;
let should = require("chai").should();

describe("Tests for 'var x = 2;' ", function(){

    let pinaLexer = require("../index");
    let tokens = [];
    let lexer = new pinaLexer.default.Lexer("var x = 2;");
    let token;
    while(token = lexer.nextToken()) {
        tokens.push(token);
    }

    it("Should be able to require pinaLexer as function", function () {

        assert(pinaLexer.default.Lexer);
        assert(typeof(pinaLexer.default.Lexer), "function");
    });

    it("case 1: should have 5 tokens", function () {
        tokens.should.have.length(5);
    });

    it("case 2: first token type should be 'IDENTIFIER'", function () {
        tokens[0].tokenType.should.equal('IDENTIFIER');
    });

    it("case 3: second token value should be 'x'", function () {
        tokens[1].value.should.equal('x');
    });

    it("case 4: third token type should be 'EQUALS' and value '='", function () {
        tokens[2].tokenType.should.equal('EQUALS') && tokens[2].value.should.equal('=');
    });

    it("case 5: fourth token type should be 'NUMBER'", function () {
        tokens[3].tokenType.should.equal('NUMBER');
    });

    it("case 6: last token type should be 'SEMI'", function () {
        tokens[4].tokenType.should.equal('SEMI');
    });

});

describe("Tests for '5 - 2 = 3' ", function() {

    let pinaLexer = require("../index");
    let tokens = [];
    let lexer = new pinaLexer.default.Lexer("5 - 2 = 3");
    let token;
    while(token = lexer.nextToken()) {
        tokens.push(token);
    }

    it("case 1: should have 5 tokens", function () {
        tokens.should.have.length(5);
    });

    it("case 2: first token type should be 'NUMBER'", function () {
        tokens[0].tokenType.should.equal('NUMBER');
    });

    it("case 3: second token type should be 'MINUS'", function () {
        tokens[1].tokenType.should.equal('MINUS');
    });

    it("case 4: third token type should be 'NUMBER' and value '2'", function () {
        tokens[2].tokenType.should.equal('NUMBER') && expect(parseInt(tokens[2].value)).to.equal(2);
    });

    it("case 5: fourth token type should be 'EQUALS'", function () {
        tokens[3].tokenType.should.equal('EQUALS');
    });

    it("case 6: last token value should be '3'", function () {
        tokens[4].value.should.equal('3');
    });

});

describe("Tests comment ", function() {

    let pinaLexer = require("../index");
    let tokens = [];
    let lexer = new pinaLexer.default.Lexer("// this is a comment");
    let token;
    while(token = lexer.nextToken()) {
        tokens.push(token);
    }

    it("case 1: should have 1 tokens", function () {
        tokens.should.have.length(1);
    });

    it("case 2: first token type should be 'COMMENT'", function () {
        tokens[0].tokenType.should.equal('COMMENT');
    });

    it("case 3: first token value should be '// this is a comment'", function () {
        tokens[0].value.should.equal('// this is a comment');
    });

});

