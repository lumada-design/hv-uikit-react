import json
import sys
import os
import filecmp


def extractCodes(inputFile, outputFile):
    """ Extract to an outputFile only the json elements that include 'code' string
    - inputFile: string for location of json data
    - outputFile: string for output json file
    """
    outData = set()
    with open(inputFile) as data_file:
        data = json.load(data_file)

    for element in data:
        outData.add(element["code"])

    with open(outputFile, 'w') as data_output:
        json.dump(list(outData), data_output, sort_keys=True,
                  separators=(',', ': '), indent=4)


def filesShouldBeEqual(file1, file2):
    """ Fails if files don't are equal """
    text1 = open(file1).readlines()
    text2 = open(file2).readlines()
    assert (text1 == text2), "*ERROR* files are different: "
