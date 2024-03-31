package io.loganmatic;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Main {
    public static final double Pi = 3.14159265358979323846;
    private static final int COEFFICIENT_A = 1;
    private static final int COEFFICIENT_B = -4;
    private static final int COEFFICIENT_C = -3;
    private static final int COEFFICIENT_D = 2;

    private static final CubicEquationResult result = cubicEquation(COEFFICIENT_A, COEFFICIENT_B, COEFFICIENT_C, COEFFICIENT_D);
    public static void main(String[] args) {
        System.out.println(result.valueX1);
        System.out.println(result.valueX2);
        System.out.println(result.valueX3);
        System.out.println(result.msg + "\n");
        System.out.println("Looks like it work... (: ");
        System.out.println("Euler number: " + createEulerNumber());
        System.out.println("Random number between 1 and 10: " + randomNumberBetween(1, 10));
        System.out.println("Factorial of 3: " + factorial(3));
        System.out.println("Discriminant of the quadratic equation: " + quadraticEquationDiscriminant(1, -4, -3));
        System.out.println("Linear equation: " + linearEquation(1, 2).valueX);
        System.out.println("Quadratic equation: " + quadraticEquation(1, -4, -6).msg);
        System.out.println("Pi number: " + Pi);
    }
    protected static double createEulerNumber() {
        double eulerNumber = 0.0;
        final int n = 9999; // number of iterations
        // Iterates over the numbers from 0 to 9 to calculate the Euler number
        for (int i = 0; i < n; i++) {
            // Calculates the Euler number using the formula: 1 / i!
            eulerNumber += 1.0 / factorial(i);
        }

        // Returns the Euler number
        return eulerNumber;
    }

    /*  35701 exaggerated method to see the number with MANY decimal places, more than 35 thousand
    Just curiosity

    If your computer is very good, you can increase the loop quantity, the larger it is, the more accurate it is.
    *     protected static BigDecimal createEulerNumber() {
        BigDecimal eulerNumber = BigDecimal.ZERO;
        BigDecimal factorial = BigDecimal.ONE;

        for (int i = 0; i < 9999; i++) {
            eulerNumber = eulerNumber.add(BigDecimal.ONE.divide(factorial, MathContext.DECIMAL128));
            factorial = factorial.multiply(BigDecimal.valueOf(i + 1));
        }

        return eulerNumber;
    }
    * */

    public static int randomNumberBetween(int min, int max) {
        Random random = new Random();
        return random.nextInt(max - min + 1) + min;
    }

    private static int generateCriticalPointInterval(int min, int max) {
        return randomNumberBetween(min, max);
    }

    public static int factorial(int valueToCalculate) {
        // If the value is negative, the factorial is not defined
        if (valueToCalculate < 0) {
            throw new IllegalArgumentException("The value must be greater than or equal to zero");
        }

        // If the value is zero, the factorial is 1
        if (valueToCalculate == 0) {
            return 1;
        }

        float result = 1f;
        // Iterates over the numbers less than or equal to the value to calculate the factorial
        for (int i = 1; i <= valueToCalculate; i++) {
            result *= i;
        }

        // Returns the result of the factorial
        return (int) result;
    }

    public static double quadraticEquationDiscriminant (double valueA, double valueB, double valueC) {
        return Math.pow(valueB, 2) - 4 * valueA * valueC;
    }

    public static LinearEquationResult linearEquation(double valueA, double valueB) {
        if(valueA == 0) {
            throw new IllegalArgumentException("The number A must be different from zero");
        }

        final double result = valueB / valueA;

        return new LinearEquationResult(result, "The result of the linear equation is: " + result);
    }

    public static QuadraticEquationResult quadraticEquation(double valueA, double valueB, double valueC) {
        if(valueA == 0 && valueB == 0) {
            throw new IllegalArgumentException("The number A and B cannot be zero at the same time");
        }

        final double delta = quadraticEquationDiscriminant(valueA, valueB, valueC);

        if(delta < 0) {
            throw new IllegalArgumentException("The delta is negative, so the equation has no real roots");
        }

        final double x1 = (-valueB + Math.sqrt(delta)) / (2 * valueA);
        final double x2 = (-valueB - Math.sqrt(delta)) / (2 * valueA);

        if(delta == 0) {
            return new QuadraticEquationResult(x1, x2, "The result of the quadratic equation is: " + x1);
        }

        return new QuadraticEquationResult(x1, x2, "The results of the quadratic equation are: " + x1 + " and " + x2);
    }

    public static List<Integer> generatePossibleRoots(double valueD) {
        List<Integer> possibleRoots = new ArrayList<>();
        if (valueD > 0) {
            for (int index = 1; index < valueD + 1; index++) {
                double isInteger = valueD % index;
                if (isInteger == 0) {
                    possibleRoots.add(index);
                    possibleRoots.add(-index);
                }
            }
        } else {
            for (int index = -1; index > valueD - 1; index--) {
                double isInteger = valueD % index;
                if (isInteger == 0) {
                    possibleRoots.add(index);
                    possibleRoots.add(-index);
                }
            }
        }
        return possibleRoots;
    }

    public static CubicEquationResult cubicEquation (double valueA, double valueB, double valueC, double valueD) {
        if(valueD == 0) {
            final double x1 = 0;

            final double delta = quadraticEquationDiscriminant(valueA, valueB, valueC);

            final QuadraticEquationResult quadraticResult = quadraticEquation(valueA, valueB, valueC);

            if (delta < 0) {
                return new CubicEquationResult(x1,x1,x1, "It has only 1 real root in x = 0");
            } else {
                double answer1 = quadraticResult.valueX1;
                double answer2 = quadraticResult.valueX2;

                if (answer1 == answer2) {
                    return new CubicEquationResult(x1, answer1, answer2, "It has two real roots x1 = 0 and x2 = " + answer1);
                } else {
                    return new CubicEquationResult(x1, answer1, answer2, String.format("x1 = %f and x2 = %f and x3 = %f", x1, answer1, answer2));
                }
            }
        } else {
            List<Integer> possibleRoots = generatePossibleRoots(valueD);

            List<Integer> roots = new ArrayList<>();

            for (Integer test : possibleRoots) {
                double firstRoot = valueA * Math.pow(test, 3) + valueB * Math.pow(test, 2) + valueC * test + valueD;
                if (firstRoot == 0) {
                    roots.add(test);
                }
            }

            if (roots.isEmpty()) {
                return newtonMethodForCubicEquation(valueA, valueB, valueC, valueD);
            }
            return brioRuffiniForCubicEquation(valueA, valueB, valueC, valueD, roots);
        }
    }

    public static CubicEquationResult newtonMethodForCubicEquation(double valueA, double valueB, double valueC, double valueD) {
        double derivedValueA = valueA * 3;
        double derivedValueB = valueB * 2;
        double derivedValueC = valueC * 1;

        double delta = quadraticEquationDiscriminant(derivedValueA, derivedValueB, derivedValueC);

        QuadraticEquationResult quadraticResult = quadraticEquation(derivedValueA, derivedValueB, derivedValueC);

        double answer1 = quadraticResult.valueX1;
        double answer2 = quadraticResult.valueX2;

        double criticalPoint1 = answer1 * 1000;
        double criticalPoint2 = answer2 * 2000;
        double criticalPoint3;

        if((answer1 < 0 && answer2 < 0) || (answer1 > 0 && answer2 > 0)) {
            criticalPoint1 = criticalPoint2 * -1;
        }

        if (answer1 > answer2) {
            if (answer1 - answer2 > 1) {
                criticalPoint3 = generateCriticalPointInterval((int) Math.ceil(answer2 + 0.2), (int) answer1);
            } else {
                criticalPoint3 = generateCriticalPointInterval((int) (answer2 + 0.2), (int) answer1);
            }
        } else {
            if (answer2 - answer1 > 1) {
                criticalPoint3 = generateCriticalPointInterval((int) Math.ceil(answer1 + 0.2), (int) answer2);
            } else {
                criticalPoint3 = generateCriticalPointInterval((int) (answer1 + 0.2), (int) answer2);
            }
        }

        if (delta < 0) {
            criticalPoint1 = -10000;
            criticalPoint2 = 9000;
        }

        List<Double> firstRootCritical = new ArrayList<>();

        final int iterations = 100000; // number of iterations for the Newton method to find the roots of the cubic equation

        for (int index = 0; index < iterations; index++) {
            criticalPoint1 =
                    criticalPoint1 -
                            (valueA * Math.pow(criticalPoint1, 3) +
                                    valueB * Math.pow(criticalPoint1, 2) +
                                    valueC * criticalPoint1 +
                                    valueD) /
                                    (derivedValueA * Math.pow(criticalPoint1, 2) +
                                            derivedValueB * criticalPoint1 +
                                            derivedValueC);

            double functionValue1 =
                    (valueA * Math.pow(criticalPoint1, 3) +
                            valueB * Math.pow(criticalPoint1, 2) +
                            valueC * criticalPoint1 +
                            valueD);

            criticalPoint2 =
                    criticalPoint2 -
                            (valueA * Math.pow(criticalPoint2, 3) +
                                    valueB * Math.pow(criticalPoint2, 2) +
                                    valueC * criticalPoint2 +
                                    valueD) /
                                    (derivedValueA * Math.pow(criticalPoint2, 2) +
                                            derivedValueB * criticalPoint2 +
                                            derivedValueC);

            double functionValue2 =
                    (valueA * Math.pow(criticalPoint2, 3) +
                            valueB * Math.pow(criticalPoint2, 2) +
                            valueC * criticalPoint2 +
                            valueD);

            criticalPoint3 =
                    criticalPoint3 -
                            (valueA * Math.pow(criticalPoint3, 3) +
                                    valueB * Math.pow(criticalPoint3, 2) +
                                    valueC * criticalPoint3 +
                                    valueD) /
                                    (derivedValueA * Math.pow(criticalPoint3, 2) +
                                            derivedValueB * criticalPoint3 +
                                            derivedValueC);

            if (Math.abs(functionValue1) < 1e-10 && Math.abs(functionValue2) < 1e-10) {
                firstRootCritical.add(criticalPoint1);
                firstRootCritical.add(criticalPoint2);
                firstRootCritical.add(criticalPoint3);
                break;
            }
        }

        if (Math.abs(firstRootCritical.getFirst() - firstRootCritical.get(1)) < 1e-7) {
            return new CubicEquationResult(firstRootCritical.getFirst(), firstRootCritical.getFirst(), firstRootCritical.getFirst(), String.format("It has only 1 real root in X = %f", firstRootCritical.getFirst()));
        } else if (Math.abs(firstRootCritical.getFirst() - firstRootCritical.get(2)) < 1e-4) {
            return newtonMethodForCubicEquation(valueA, valueB, valueC, valueD);
        } else if (Math.abs(firstRootCritical.get(1) - firstRootCritical.get(2)) < 1e-4) {
            return newtonMethodForCubicEquation(valueA, valueB, valueC, valueD);
        } else {
            return new CubicEquationResult(firstRootCritical.getFirst(), firstRootCritical.get(1), firstRootCritical.get(2), String.format("X1 ≅ %f, X2 ≅ %f, X3 ≅ %f", firstRootCritical.getFirst(), firstRootCritical.get(1), firstRootCritical.get(2)));
        }
    }

    public static CubicEquationResult brioRuffiniForCubicEquation(double valueA, double valueB, double valueC, double valueD, List<Integer> roots) {
        double gotFirstRoot = roots.getFirst();

        double first = valueA * gotFirstRoot;

        double secondCoefficient = first + valueB;

        double second = secondCoefficient * gotFirstRoot;

        double thirdCoefficient = second + valueC;

        double third = thirdCoefficient * gotFirstRoot;

        double fourthCoefficient = third + valueD;

        if (fourthCoefficient == 0.0) {
            double delta = quadraticEquationDiscriminant(valueA, secondCoefficient, thirdCoefficient);

            if(delta < 0) {
                return new CubicEquationResult(gotFirstRoot,gotFirstRoot,gotFirstRoot,"X = "+ gotFirstRoot);
            } else {
                QuadraticEquationResult quadraticResult = quadraticEquation(valueA, secondCoefficient, thirdCoefficient);

                double answer1 = quadraticResult.valueX1;
                double answer2 = quadraticResult.valueX2;

                if (delta == 0) {
                    if (answer1 == gotFirstRoot) {
                        return new CubicEquationResult(0,0,0, "X = 0");
                    } else {
                        return new CubicEquationResult(0, answer1, answer1, "X1 = 0 and X2 = " + answer1);
                    }
                } else {
                    if(answer1 == gotFirstRoot) {
                        return new CubicEquationResult(gotFirstRoot, answer2, answer2, "X1 = " + gotFirstRoot + " and X2 = " + answer2);
                    } else if (answer2 == gotFirstRoot) {
                        return new CubicEquationResult(gotFirstRoot, answer1, answer1, "X1 = " + gotFirstRoot + " and X2 = " + answer1);
                    } else {
                        return new CubicEquationResult(gotFirstRoot, answer1, answer2, "X1 = " + gotFirstRoot + " and X2 = " + answer1 + " and X3 = " + answer2);
                    }
                }
            }
        } else {
            return newtonMethodForCubicEquation(valueA, valueB, valueC, valueD);
        }
    }
}

