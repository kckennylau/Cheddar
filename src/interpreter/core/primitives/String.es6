import CheddarClass from '../env/class';
import CheddarVariable from '../env/var';

import NIL from '../consts/nil';

import BehaviorOperator from './op/string';
import BehaviorCast from './cast/string';

function InitalizeSubstring(source) {
    if (!source)
        return new NIL;
    var str = new CheddarString(null, null);
    str.init(source);
    return str;
}

export default class CheddarString extends CheddarClass {
    static Name = "String";

    init(string) {
        this.value = string.toString();
        return true;
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    Cast = BehaviorCast;

    accessor(target) {
        return this.Scope.get(target) || (
            Number.isInteger(+target) ?
            new CheddarVariable(InitalizeSubstring(this.value[target])) :
            null
        );
    }
}

CheddarString.Scope = require('../../../stdlib/primitive/String/static');
CheddarString.prototype.Scope = require('../../../stdlib/primitive/String/lib');