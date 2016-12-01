'use strict';

let assert = require("chai").assert;
// let expect = require("chai").expect;
let should = require("chai").should();

describe("Tests for 'var x = 2;' ", function(){

    let pinaLexer = require("../index");
    let tokens = [];
    let lexer = new pinaLexer("var x = 2;");
    let token;
    while(token = lexer.nextToken()) {
        tokens.push(token);
    }

    it("Should be able to require pinaLexer as function", function () {

        assert(pinaLexer);
        assert(typeof(pinaLexer), "function");
    });

    it("case 1: should have 5 tokens", function () {
        tokens.should.have.length(5);
    });

    it("case 2: first token key should be 'IDENTIFIER'", function () {
        tokens[0].tokenType.should.equal('IDENTIFIER');
    });

    it("case 3: second token value should be 'x'", function () {
        tokens[1].value.should.equal('x');
    });

    it("case 4: third token key should be 'EQUALS' and value '='", function () {
        tokens[2].tokenType.should.equal('EQUALS') && tokens[2].value.should.equal('=');
    });

    it("case 5: fourth token key should be 'NUMBER'", function () {
        tokens[3].tokenType.should.equal('NUMBER');
    });

    it("case 6: last token key should be 'SEMI'", function () {
        tokens[4].tokenType.should.equal('SEMI');
    });

});

