import os

path_dir = os.path.abspath(__file__).split(os.sep + "automation" + os.sep + "robot" + os.sep)[0]
pa11y_path = os.path.normpath(path_dir + "/automation/robot/node_modules/pa11y/bin/pa11y.js")

# pa11y options based on https://github.com/pa11y/pa11y
PA11Y_CONSOLE = ["node", pa11y_path,
                 "--ignore", "region",
                 "--runner", "htmlcs",
                 "--runner", "axe",
                 "--standard", "WCAG2AA",
                 "--ignore", "region",
                 "--root-element", "div[id=root]"]

PA11Y_JSON = PA11Y_CONSOLE + ["--reporter", "json"]
