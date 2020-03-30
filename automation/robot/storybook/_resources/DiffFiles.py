import json
import sys
import os
import difflib
import filecmp


def DiffFiles(file):
    text1 = open(file).readlines()
    text2 = open(file+"2").readlines()

    if text1 != text2:
        print("WCAG2AA error files are different")
        for line in difflib.unified_diff(text1, text2):
            print(line)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        DiffFiles(sys.argv[1])
