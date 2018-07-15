var app = angular.module('calc', []);
app.controller('myCtrl', function ($scope) {
    // Result displayed in screen
    $scope.output = "0";

    // check whether it is a new number
    $scope.acceptNumber = true;

    // operation choosed by user
    $scope.ChosenOperation = null;

    // First Number added
    $scope.temp_num = null;

    // The second value added after selecting operator
    $scope.pendingValue = null;

    // last Operation execiuted
    $scope.lastOperation = null;


    // OPERATIONS 
    var Add = "adding";
    var Sub = "subtracting";
    var Multi = "multiply";
    var Division = "divided";
    var Power = "power";
    var Sqrt = "sqrt";

    // show output on screen
    $scope.updateOutput = function (btn) {
        if ($scope.acceptNumber) {
            $scope.output = 0;
        }
        if ($scope.output == "0" || $scope.acceptNumber) {
            $scope.output = btn;
            $scope.acceptNumber = false;
        } else {
            $scope.output += String(btn);
        }
        $scope.pendingValue = toNumber($scope.output);
    };

    // Operation : Addition
    $scope.add = function () {
        if ($scope.pendingValue) {
            if ($scope.temp_num && $scope.ChosenOperation == Add) {
                $scope.temp_num += $scope.pendingValue;
            } else {
                $scope.temp_num = $scope.pendingValue;
            }
        }
        setOutput(String($scope.temp_num));
        $scope.ChosenOperation = Add;
        $scope.acceptNumber = true;
        $scope.pendingValue = null;
    };

    // Operation: Subtraction
    $scope.subtract = function () {
        if ($scope.pendingValue) {
            if ($scope.temp_num && $scope.ChosenOperation == Sub) {
                $scope.temp_num -= $scope.pendingValue;
            } else {
                $scope.temp_num = $scope.pendingValue;
            }
        }
        setOutput(String($scope.temp_num));
        $scope.ChosenOperation = Sub;
        $scope.acceptNumber = true;
        $scope.pendingValue = null;
    };

    // Operation : Multiplication
    $scope.times = function () {
        if ($scope.pendingValue) {
            if ($scope.temp_num && $scope.ChosenOperation == Multi) {
                $scope.temp_num *= $scope.pendingValue;
            } else {
                $scope.temp_num = $scope.pendingValue;
            }
        }
        setOutput(String($scope.temp_num));
        $scope.ChosenOperation = Multi;
        $scope.acceptNumber = true;
        $scope.pendingValue = null;
    };

    // Operation : Division
    $scope.divided = function () {
        if ($scope.pendingValue) {
            if ($scope.temp_num && $scope.ChosenOperation == Division) {
                $scope.temp_num /= $scope.pendingValue;
            } else {
                $scope.temp_num = $scope.pendingValue;
            }
        }
        setOutput(String($scope.temp_num));
        $scope.ChosenOperation = Division;
        $scope.acceptNumber = true;
        $scope.pendingValue = null;
    };

    // Operation : Power of x
    $scope.power = function () {
        if ($scope.pendingValue) {
            if ($scope.temp_num && $scope.ChosenOperation == Sqrt) {
                $scope.temp_num = Math.pow($scope.temp_num, $scope.pendingValue);
            } else {
                $scope.temp_num = $scope.pendingValue;
            }
        }
        setOutput(String($scope.temp_num));
        $scope.ChosenOperation = Power;
        $scope.acceptNumber = true;
        $scope.pendingValue = null;
    };

    // Operation : Square Root
    $scope.sqrt = function () {
        if ($scope.pendingValue) {
            if ($scope.temp_num && $scope.ChosenOperation == Sqrt) {
                $scope.temp_num = Math.sqrt($scope.temp_num);
            } else {
                $scope.temp_num = $scope.pendingValue;
            }
        }
        setOutput(String($scope.temp_num));
        $scope.ChosenOperation = Sqrt;
        $scope.acceptNumber = true;
        $scope.pendingValue = null;
    };


    // Operation : Equal function
    $scope.equal = function () {
        if (!$scope.acceptNumber) {
            $scope.pendingValue = toNumber($scope.output);
            $scope.lastValue = $scope.pendingValue;
        }
        if ($scope.ChosenOperation == Add) {
            $scope.temp_num += $scope.pendingValue;
            $scope.lastOperation = Add;
        } else if ($scope.ChosenOperation == Sub) {
            $scope.temp_num -= $scope.pendingValue;
            $scope.lastOperation = Sub;
        } else if ($scope.ChosenOperation == Multi) {
            $scope.temp_num *= $scope.pendingValue;
            $scope.lastOperation = Multi;
        } else if ($scope.ChosenOperation == Division) {
            $scope.temp_num /= $scope.pendingValue;
            $scope.lastOperation = Division;
        } else if ($scope.ChosenOperation == Power) {
            $scope.temp_num = Math.pow($scope.temp_num, $scope.pendingValue);
            $scope.lastOperation = Power;
        } else if ($scope.ChosenOperation == Sqrt) {
            $scope.temp_num = Math.sqrt($scope.temp_num);
            $scope.lastOperation = Power;
        } else {
            /* Case : keep pressing equal without choosing operation
            Keep adding / subtracting / multiplying or dividing the value with last known value */
            if ($scope.lastOperation) {
                if ($scope.lastOperation == Add) {
                    if ($scope.temp_num) {
                        $scope.temp_num += $scope.lastValue;
                    } else {
                        $scope.temp_num = 0;
                    }
                } else if ($scope.lastOperation == Sub) {
                    if ($scope.temp_num) {
                        $scope.temp_num -= $scope.lastValue;
                    } else {
                        $scope.temp_num = 0;
                    }
                } else if ($scope.lastOperation == Multi) {
                    if ($scope.temp_num) {
                        $scope.temp_num *= $scope.lastValue;
                    } else {
                        $scope.temp_num = 0;
                    }
                } else if ($scope.lastOperation == Divison) {
                    if ($scope.temp_num) {
                        $scope.temp_num /= $scope.lastValue;
                    } else {
                        $scope.temp_num = 0;
                    }
                }
            } else {
                $scope.temp_num = 0;
            }
        }

        setOutput($scope.temp_num);
        $scope.ChosenOperation = null;
        $scope.pendingValue = null;
    };

    // Operation : Clear all memory, restart cycle
    $scope.clear = function () {
        $scope.temp_num = null;
        $scope.pendingValue = null;
        $scope.ChosenOperation = null;
        $scope.lastOperation
        setOutput("0");
    };

    // Helper Function : Set output value
    setOutput = function (outputString) {
        $scope.output = outputString;
        $scope.acceptNumber = true;
    };

    // Helper Function : String to Numerics
    toNumber = function (numberString) {
        var result = 0;
        if (numberString) {
            result = numberString * 1;
        }
        return result;
    };
});
