import json
import sys
import os
import filecmp


def RemoveAttributesAndIndent(file):
    outData = set()
    with open(file+"Delete") as data_file:
        data = json.load(data_file)

    if len(data) > 0:
        print("Pa11y errors found:")
    for element in data:
        print(" Code: " + element['code'])
        print(" Message: " + element['message'])
        print(" Context: " + element['context'] + "\n")
        outData.add(element["code"])

    with open(file+"2", 'w') as data_file2:
        json.dump(list(outData), data_file2, sort_keys=True,
                  separators=(',', ': '), indent=2)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        RemoveAttributesAndIndent(sys.argv[1])
