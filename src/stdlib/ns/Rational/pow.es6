// Rational extension written by LegionMammal978

import of from './helpers/of';
import pow from './helpers/pow';

export default function(cheddar, CheddarRational) {
    return new cheddar.func(
        [
            ["lhs", {}],
            ["rhs", {
                Optional: true
            }]
        ],
        function(scope, input) {
            let lhs, rhs;
            if (input("self") instanceof CheddarRational)
                [lhs, rhs] = [input("self"), input("lhs")];
            else if (input("rhs").constructor.Name === "nil")
                return "Rational.pow expects 2 arguments";
            else
                [lhs, rhs] = [of(input("lhs"), cheddar, CheddarRational),
                    input("rhs")];
            rhs = of(rhs, cheddar, CheddarRational);
            return pow(lhs.num, lhs.den, rhs.num, rhs.den, cheddar,
                CheddarRational);
        }
    );
}
