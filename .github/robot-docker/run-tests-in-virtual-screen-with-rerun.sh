#!/bin/sh

HOME=${ROBOT_WORK_DIR}

runRobot () {
    xvfb-run \
        --server-args="-screen 0 ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_COLOUR_DEPTH} -ac" \
        robot \
        --outputDir $ROBOT_REPORTS_DIR \
        $1 \
        $ROBOT_TESTS_DIR
    return $?
}

runPabot () {
    xvfb-run \
        --server-args="-screen 0 ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_COLOUR_DEPTH} -ac" \
        pabot \
        --processes $ROBOT_THREADS \
        ${PABOT_OPTIONS} \
        --outputDir $ROBOT_REPORTS_DIR \
        $1 \
        $ROBOT_TESTS_DIR
    return $?
}

runRebot () {
    rebot \
        --outputdir $ROBOT_REPORTS_DIR \
        --output output.xml \
        --xunit xunit.xml \
        $1 $2 $3
    return $?
}

FIRST_RUN=0

if [ $ROBOT_THREADS -eq 1 ] 
then 
    echo "Executing First Run with Robot"
    runRobot "${ROBOT_OPTIONS} --output firstRun.xml --report NONE --log NONE"
    FIRST_RUN=$?
else
    echo "Executing First Run with Pabot"
    runPabot "${ROBOT_OPTIONS} --output firstRun.xml --report NONE --log NONE"
    FIRST_RUN=$?
fi

if [ $FIRST_RUN -eq 0 ]
then
    echo "First run successful, getting results"
    runRebot "$ROBOT_REPORTS_DIR/firstRun.xml"
else 
    echo "First run failed, retrying"
    runRobot "--rerunfailed ${ROBOT_REPORTS_DIR}/firstRun.xml ${ROBOT_OPTIONS} --output secondRun.xml --report NONE --log NONE --loglevel TRACE"
    runRebot "--merge $ROBOT_REPORTS_DIR/firstRun.xml $ROBOT_REPORTS_DIR/secondRun.xml"
fi