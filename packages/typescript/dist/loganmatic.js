"use strict";
var piValue = "3.1415926535897932384626433832795";
var Calculator = (function () {
    function Calculator() {
        this.EulerNumber = this.createEulerNumber();
        this.Pi = parseFloat(piValue);
    }
    Calculator.prototype.createEulerNumber = function (n) {
        if (n === void 0) { n = 9999; }
        var sumStart = 0;
        var emptyValue = 0;
        for (var k = sumStart; k < n + 1; k++) {
            var series = Math.pow(1, k) / this.factorial(k);
            emptyValue += series;
        }
        return emptyValue;
    };
    Calculator.prototype.newtonMethod = function (valueA, valueB, valueC, valueD, checkedYes) {
        var derivedValueA = valueA * 3;
        var derivedValueB = valueB * 2;
        var derivedValueC = valueC * 1;
        var delta = Math.pow(derivedValueB, 2) - 4 * derivedValueA * derivedValueC;
        var answer1 = (-derivedValueB + Math.pow(delta, (1 / 2))) / (2 * derivedValueA);
        var answer2 = (-derivedValueB - Math.pow(delta, (1 / 2))) / (2 * derivedValueA);
        var criticalPoint1 = answer1 * 1000;
        var criticalPoint2 = answer2 * 1000;
        if (answer1 < 0 && answer2 < 0) {
            criticalPoint1 = criticalPoint2 * -1;
        }
        else if (answer1 > 0 && answer2 > 0) {
            criticalPoint1 = criticalPoint2 * -1;
        }
        function generateCriticalPointInterval(min, max) {
            return Math.random() * (max - min + 1) + min;
        }
        var criticalPoint3;
        if (answer1 > answer2) {
            if (Number(answer1) - Number(answer2) > 1) {
                criticalPoint3 = generateCriticalPointInterval(Math.ceil(Number(answer2) + 0.2), Number(answer1));
            }
            else {
                criticalPoint3 = generateCriticalPointInterval(Number(answer2) + 0.2, Number(answer1));
            }
        }
        else {
            if (Number(answer2) - Number(answer1) > 1) {
                criticalPoint3 = generateCriticalPointInterval(Math.ceil(Number(answer1) + 0.2), Number(answer2));
            }
            else {
                criticalPoint3 = generateCriticalPointInterval(Number(answer1) + 0.2, Number(answer2));
            }
        }
        if (delta < 0) {
            criticalPoint1 = -10000;
            criticalPoint2 = 9000;
        }
        var firstRootCritical = [];
        var iterations = 100000;
        for (var index = 0; index < iterations; index++) {
            criticalPoint1 =
                criticalPoint1 -
                    (Number(valueA) * Math.pow(criticalPoint1, 3) +
                        Number(valueB) * Math.pow(criticalPoint1, 2) +
                        Number(valueC) * criticalPoint1 +
                        Number(valueD)) /
                        (Number(derivedValueA) * Math.pow(criticalPoint1, 2) +
                            Number(derivedValueB) * criticalPoint1 +
                            Number(derivedValueC));
            var functionValue1 = (Number(valueA) * Math.pow(criticalPoint1, 3) +
                Number(valueB) * Math.pow(criticalPoint1, 2) +
                Number(valueC) * criticalPoint1 +
                Number(valueD)).toFixed(10);
            criticalPoint2 =
                criticalPoint2 -
                    (Number(valueA) * Math.pow(criticalPoint2, 3) +
                        Number(valueB) * Math.pow(criticalPoint2, 2) +
                        Number(valueC) * criticalPoint2 +
                        Number(valueD)) /
                        (Number(derivedValueA) * Math.pow(criticalPoint2, 2) +
                            Number(derivedValueB) * criticalPoint2 +
                            Number(derivedValueC));
            var functionValue2 = (Number(valueA) * Math.pow(criticalPoint2, 3) +
                Number(valueB) * Math.pow(criticalPoint2, 2) +
                Number(valueC) * criticalPoint2 +
                Number(valueD)).toFixed(10);
            criticalPoint3 =
                criticalPoint3 -
                    (Number(valueA) * Math.pow(criticalPoint3, 3) +
                        Number(valueB) * Math.pow(criticalPoint3, 2) +
                        Number(valueC) * criticalPoint3 +
                        Number(valueD)) /
                        (Number(derivedValueA) * Math.pow(criticalPoint3, 2) +
                            Number(derivedValueB) * criticalPoint3 +
                            Number(derivedValueC));
            if (parseFloat(functionValue1) === 0.0 &&
                parseFloat(functionValue2) === 0.0) {
                firstRootCritical.push(criticalPoint1, criticalPoint2, criticalPoint3);
                break;
            }
        }
        if (firstRootCritical[0].toFixed(7) == firstRootCritical[1].toFixed(7)) {
            if (checkedYes) {
                return {
                    value: [firstRootCritical[0]],
                    msg: "It has only 1 real root in X = ".concat(firstRootCritical[0].toFixed(4)),
                };
            }
            else {
                return {
                    value: [firstRootCritical[0]],
                    msg: "It has only 1 real root in X = ".concat(firstRootCritical[0]),
                };
            }
        }
        else if (firstRootCritical[0].toFixed(4) == firstRootCritical[2].toFixed(4)) {
            this.newtonMethod(valueA, valueB, valueC, valueD, checkedYes);
        }
        else if (firstRootCritical[1].toFixed(4) == firstRootCritical[2].toFixed(4)) {
            this.newtonMethod(valueA, valueB, valueC, valueD, checkedYes);
        }
        else {
            if (checkedYes) {
                return {
                    value: [
                        firstRootCritical[0],
                        firstRootCritical[1],
                        firstRootCritical[2],
                    ],
                    msg: "X1 \u2245 ".concat(firstRootCritical[0].toFixed(4), ", X2 \u2245 ").concat(firstRootCritical[1].toFixed(4), ", X3 \u2245 ").concat(firstRootCritical[2].toFixed(4)),
                };
            }
            else {
                return {
                    value: [
                        firstRootCritical[0],
                        firstRootCritical[1],
                        firstRootCritical[2],
                    ],
                    msg: "X1 \u2245 ".concat(firstRootCritical[0], ", X2 \u2245 ").concat(firstRootCritical[1], ", X3 \u2245 ").concat(firstRootCritical[2]),
                };
            }
        }
        return {
            value: [firstRootCritical[0]],
            msg: "X1 = ".concat(firstRootCritical[0]),
        };
    };
    Calculator.prototype.ruffiniDevice = function (valueA, valueB, valueC, valueD, raizes, checkedYes) {
        var first = valueA * raizes[0];
        var secondCoefficient = Number(first) + Number(valueB);
        var second = secondCoefficient * raizes[0];
        var thirdCoefficient = Number(second) + Number(valueC);
        var third = thirdCoefficient * raizes[0];
        var fourthCoefficient = Number(third) + Number(valueD);
        if (fourthCoefficient == 0) {
            var delta = Math.pow(secondCoefficient, 2) - 4 * valueA * thirdCoefficient;
            if (delta < 0) {
                return {
                    value: [0],
                    msg: "It has only 1 real root in X = ".concat(raizes[0]),
                };
            }
            else {
                var answer1 = (-secondCoefficient + Math.pow(delta, (1 / 2))) / (2 * valueA);
                var answer2 = (-secondCoefficient - Math.pow(delta, (1 / 2))) / (2 * valueA);
                if (delta === 0) {
                    if (answer1 == raizes[0]) {
                        return {
                            value: [0],
                            msg: "The value of X1 = 0 | X1 = X2 = X3",
                        };
                    }
                    else {
                        if (checkedYes) {
                            return {
                                value: [0, answer1],
                                msg: "The value of X1 = 0 and X2 is equal to: ".concat(answer1.toFixed(2), " | X2 = X3"),
                            };
                        }
                        else {
                            return {
                                value: [0, answer1],
                                msg: "The value of X1 = 0 and X2 is equal to: ".concat(answer1, " | X2 = X3"),
                            };
                        }
                    }
                }
                else {
                    if (answer1 == raizes[0]) {
                        if (checkedYes) {
                            return {
                                value: [raizes[0], answer2],
                                msg: "The value of X1 = ".concat(raizes[0], " and X2 = ").concat(answer2.toFixed(2), " | X1 = X3"),
                            };
                        }
                        else {
                            return {
                                value: [raizes[0], answer2],
                                msg: "The value of X1 = ".concat(raizes[0], " and X2 = ").concat(answer2, " | X1 = X3"),
                            };
                        }
                    }
                    else if (answer2 == raizes[0]) {
                        if (checkedYes) {
                            return {
                                value: [raizes[0], answer1],
                                msg: "The value of X1 = ".concat(raizes[0], " and X2 it's the same as: ").concat(answer1.toFixed(2), " | X1 = X3"),
                            };
                        }
                        else {
                            return {
                                value: [raizes[0], answer1],
                                msg: "The value of X1 = ".concat(raizes[0], " and X2 it's the same as: ").concat(answer1, " | X1 = X3"),
                            };
                        }
                    }
                    else {
                        if (checkedYes) {
                            return {
                                value: [raizes[0], answer1, answer2],
                                msg: "The value of X1 = ".concat(raizes[0], ", X2 it's the same as: ").concat(answer1.toFixed(2), " and The value of X3 it's the same as: ").concat(answer2.toFixed(2)),
                            };
                        }
                        else {
                            return {
                                value: [raizes[0], answer1, answer2],
                                msg: "The value of X1 = ".concat(raizes[0], ", X2 it's the same as: ").concat(answer1, " and The value of X3 it's the same as: ").concat(answer2),
                            };
                        }
                    }
                }
            }
        }
        else if (fourthCoefficient != 0) {
            return this.newtonMethod(valueA, valueB, valueC, valueD, checkedYes);
        }
        else {
            return {
                value: null,
                msg: "Vish, I don't know what happened HEHEHE",
            };
        }
    };
    Calculator.prototype.absoluteValue = function (number) {
        if (number < 0) {
            return -number;
        }
        else {
            return number;
        }
    };
    Calculator.prototype.factorial = function (valueToCalculate) {
        if (valueToCalculate === 0) {
            return 1;
        }
        var result = 1;
        for (var i = 1; i <= valueToCalculate; i++) {
            result *= i;
        }
        return result;
    };
    Calculator.prototype.squareRoot = function (valueToCalculate) {
        return Math.pow(valueToCalculate, (1 / 2));
    };
    Calculator.prototype.cubicRoot = function (valueToCalculate) {
        var convertToPositive = this.absoluteValue(valueToCalculate);
        var result = Math.pow(convertToPositive, (1 / 3));
        if (valueToCalculate < 0) {
            return result * -1;
        }
        else {
            return result;
        }
    };
    Calculator.prototype.factor = function (valueToCalculate) {
        if (typeof valueToCalculate !== "number") {
            return console.log("This is not an integer");
        }
        var factoredNumbers = [];
        for (var y = 2; y < valueToCalculate; y++) {
            while (valueToCalculate % y === 0) {
                valueToCalculate /= y;
                factoredNumbers.push(y);
            }
        }
        if (factoredNumbers.length === 0) {
            factoredNumbers.push(valueToCalculate);
        }
        return factoredNumbers;
    };
    Calculator.prototype.sine = function (valueToCalculate) {
        var n;
        if (this.absoluteValue(valueToCalculate) > 5 &&
            this.absoluteValue(valueToCalculate) <= 30) {
            n = 100;
        }
        else if (this.absoluteValue(valueToCalculate) > 30) {
            n = 40;
        }
        else {
            n = 200;
        }
        var startSum = 0;
        var emptyValue = 0;
        for (var k = startSum; k < n + 1; k++) {
            var series = (Math.pow((-1), k) * Math.pow(valueToCalculate, (2 * k + 1))) /
                this.factorial(2 * k + 1);
            emptyValue += series;
        }
        if (this.absoluteValue(emptyValue) < 0.00000001) {
            return 0;
        }
        else {
            return emptyValue;
        }
    };
    Calculator.prototype.cosine = function (valueToCalculate) {
        var n;
        if (this.absoluteValue(valueToCalculate) > 5 &&
            this.absoluteValue(valueToCalculate) <= 30) {
            n = 100;
        }
        else if (this.absoluteValue(valueToCalculate) > 30) {
            n = 40;
        }
        else {
            n = 200;
        }
        var startSum = 0;
        var emptyValue = 0;
        for (var k = startSum; k < n + 1; k++) {
            var series = (Math.pow((-1), k) * Math.pow(valueToCalculate, (2 * k))) / this.factorial(2 * k);
            emptyValue += series;
        }
        if (this.absoluteValue(emptyValue) < 0.00000001) {
            return 0;
        }
        else {
            return emptyValue;
        }
    };
    Calculator.prototype.mdc = function () { };
    Calculator.prototype.mmc = function () { };
    Calculator.prototype.randomNumberBetween = function (min, max) {
        var timestamp = Date.now();
        return min + (timestamp % (max - min + 1));
    };
    Calculator.prototype.linearEquation = function (a, b) {
        var numberA = Number(a);
        var numberB = Number(b);
        if (numberA === 0) {
            return {
                value: null,
                msg: "The value of 'a' cannot be 0",
            };
        }
        var root = -numberB / numberA;
        return {
            value: root,
            msg: "The value of x is the same as: ".concat(root),
        };
    };
    Calculator.prototype.quadraticEquation = function (a, b, c) {
        var numberA = Number(a);
        var numberB = Number(b);
        var numberC = Number(c);
        if (Math.pow(numberB, 2) - 4 * numberA * numberC < 0)
            return {
                value: null,
                msg: "The equation does not have real roots",
            };
        if (numberA === 0 && numberB === 0) {
            return {
                value: null,
                msg: "The values of 'a' and 'b' cannot be 0 at the same time",
            };
        }
        else {
            var root1 = (-numberB + this.squareRoot(Math.pow(b, 2) - 4 * numberA * numberC)) /
                (2 * numberA);
            var root2 = (-numberB - this.squareRoot(Math.pow(b, 2) - 4 * numberA * numberC)) /
                (2 * numberA);
            if (root1 === root2) {
                return {
                    value: [root1],
                    msg: "It has only 1 real root in X = ".concat(root1),
                };
            }
            else {
                return {
                    value: [root1, root2],
                    msg: "The value of X1 = ".concat(root1, " and X2 = ").concat(root2),
                };
            }
        }
    };
    Calculator.prototype.cubicEquation = function (a, b, c, d, approximate) {
        if (a === void 0) { a = 0; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 0; }
        if (approximate === void 0) { approximate = false; }
        var checkedYes = approximate;
        var valueA = Number(a);
        var valueB = Number(b);
        var valueC = Number(c);
        var valueD = Number(d);
        if (valueD == 0) {
            var x1 = 0;
            var delta = Math.pow(valueB, 2) - 4 * valueA * valueC;
            if (delta < 0) {
                return {
                    value: [0],
                    msg: "It has only 1 real root in X = 0",
                };
            }
            else {
                var answer1 = (-valueB + Math.pow(delta, (1 / 2))) / (2 * valueA);
                var answer2 = (-valueB - Math.pow(delta, (1 / 2))) / (2 * valueA);
                if (delta === 0) {
                    if (answer1 == x1) {
                        return {
                            value: [0],
                            msg: "The value of X1 = 0 | X1 = X2 = X3",
                        };
                    }
                    else {
                        if (checkedYes) {
                            return {
                                value: [0, answer1],
                                msg: "The value of X1 = 0 and X2 is equal to: ".concat(answer1.toFixed(2), " | X2 = X3"),
                            };
                        }
                        else {
                            return {
                                value: [0, answer1],
                                msg: "The value of X1 = 0 and X2 is equal to: ".concat(answer1, " | X2 = X3"),
                            };
                        }
                    }
                }
                else {
                    if (answer1 == x1) {
                        if (checkedYes) {
                            return {
                                value: [0, answer2],
                                msg: "The value of X1 = 0 and X2 = ".concat(answer2.toFixed(2), " | X1 = X3"),
                            };
                        }
                        else {
                            return {
                                value: [0, answer2],
                                msg: "The value of X1 = 0 and X2 = ".concat(answer2, " | X1 = X3"),
                            };
                        }
                    }
                    else if (answer2 == x1) {
                        if (checkedYes) {
                            return {
                                value: [0, answer1],
                                msg: "The value of X1 = 0 and X2 = ".concat(answer1.toFixed(2), " | X1 = X3"),
                            };
                        }
                        else {
                            return {
                                value: [0, answer1],
                                msg: "The value of X1 = 0 and X2 is equal to: ".concat(answer1, " | X1 = X3"),
                            };
                        }
                    }
                    else {
                        if (checkedYes) {
                            return {
                                value: [0, answer1, answer2],
                                msg: "The value of X1 = 0, X2 it's the same as: ".concat(answer1.toFixed(2), " and The value of X3 it's the same as: ").concat(answer2.toFixed(2)),
                            };
                        }
                        else {
                            return {
                                value: [0, answer1, answer2],
                                msg: "The value of X1 = 0, X2 it's the same as: ".concat(answer1, " and The value of X3 it's the same as: ").concat(answer2),
                            };
                        }
                    }
                }
            }
        }
        else {
            var possibleRoots = [];
            if (valueD > 0) {
                for (var index = 1; index < Number(valueD) + 1; index++) {
                    var isInteger = valueD % index;
                    if (isInteger == 0) {
                        possibleRoots.push(index);
                        possibleRoots.push(-index);
                    }
                }
            }
            else {
                for (var index = -1; index > Number(valueD) - 1; index--) {
                    var isInteger = valueD % index;
                    if (isInteger == 0) {
                        possibleRoots.push(index);
                        possibleRoots.push(-index);
                    }
                }
            }
            var raizes_1 = [];
            possibleRoots.forEach(function (test) {
                var primeiraRaiz = Number(valueA) * Math.pow(test, 3) +
                    Number(valueB) * Math.pow(test, 2) +
                    Number(valueC) * test +
                    Number(valueD);
                if (primeiraRaiz == 0) {
                    raizes_1.push(test);
                }
            });
            if (raizes_1.length === 0) {
                return this.newtonMethod(valueA, valueB, valueC, valueD, checkedYes);
            }
            return this.ruffiniDevice(valueA, valueB, valueC, valueD, raizes_1, checkedYes);
        }
    };
    return Calculator;
}());
module.exports = new Calculator();
