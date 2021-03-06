#!/usr/bin/env node

import CheddarScope from '../interpreter/core/env/scope';

import colors from 'colors';

import HelperCaret from '../helpers/caret';

import cheddar from '../interpreter/exec';
import tokenizer from '../tokenizer/tok';

import stdlib from '../stdlib/stdlib';

let execcheddar = function(input, args) {
    let GLOBAL_SCOPE = new CheddarScope(null);
    GLOBAL_SCOPE.Scope = new Map(stdlib);

    let Tokenizer = new tokenizer(input, 0);
    let Result = Tokenizer.exec();

    if (!(Result instanceof tokenizer)) {
        console.error("Syntax Error: " + Result);
        // Draw error pointer
        console.error(HelperCaret(input, Tokenizer.Index, true));
        return "";
    }


    let Executor = new cheddar(Result, GLOBAL_SCOPE);
    let Output = Executor.exec(args);

    if (typeof Output === "string") {
        console.error("Runtime Error: " + Output);
    }

    return Output;
};

execcheddar.stdlib = require('../stdlib/api');
module.exports = execcheddar;