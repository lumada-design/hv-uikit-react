import json
import sys
import os
import filecmp

def RemoveAttributesAndIndent(file):
    with open(file+"Delete") as data_file:
        data = json.load(data_file)

    if len(data) > 0:
        print("Pa11y errors found:")
    for element in data:
        delete = []
        print(" Code: " + element['code'])
        print(" Message: " + element['message'])
        print(" Context: " + element['context'] + "\n")
        for key in element.keys():
            if str(key) != 'code':
                delete.append(key)
        for i in delete:
            del element[i]

    with open(file+"2", 'w') as data_file2:
        json.dump(data, data_file2, sort_keys=True, indent=4)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        RemoveAttributesAndIndent(sys.argv[1])