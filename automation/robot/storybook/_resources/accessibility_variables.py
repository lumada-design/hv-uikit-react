import os

path_dir = os.path.abspath(__file__).split("robot")[0]
pa11y_path = os.path.normpath(path_dir + "robot/node_modules/pa11y/bin/pa11y.js")

# pa11y options based on https://github.com/pa11y/pa11y
PA11Y_CONSOLE = ["node", pa11y_path,\
                       "--runner", "htmlcs",\
                       "--runner", "axe",\
                       "--standard", "WCAG2AA",\
                       "--root-element", "div[class|='Component-content']"]

PA11Y_JSON = PA11Y_CONSOLE + ["--reporter","json"]