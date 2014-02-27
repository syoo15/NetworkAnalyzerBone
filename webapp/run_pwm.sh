#!/bin/bash

echo 100000 > /sys/devices/ocp.?/pwm_test_P8_13*/period
echo 50000 > /sys/devices/ocp.?/pwm_test_P8_13*/duty
exit 0


