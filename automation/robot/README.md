# @hv/uikit-react-automation-robot

The robot framework scripts

## Windows 10 setup/configuration

 * Install and Configure all requirement applications/libraries in order to be able tests UIKIT components in Internet Explorer 11 and Microsoft Edge

    | Software                          | Instruction                                                                     | Description                           |
    | --------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
    | Install git                       | https://git-scm.com/download/win                                                | download and full install             |
    | Clone hv-uikit repository         | git clone https://github.com/pentaho/hv-uikit-React                             | on /c/GIT                             |
    | Install Java                      | https://www.java.com/en/download/                                               | download and full install             |
    | Install Python                    | https://www.python.org/downloads/release/python-374/                            | download and full install             |
    | Install Robot Framework libraries | Open CMD as Admin                                                               |                                       |
    |                                   | `pip install PyYAML`                                                            | for YAML files support                |
    |                                   | `pip install robotframework`                                                    | framework for all related libraries   |
    |                                   | `pip install robotframework-seleniumlibrary`                                    | Selenium Library                      |
    | Install Firefox Browser           | https://www.mozilla.org/en-US/firefox/download/thanks/                          |                                       |
    | Disable Firefox updates           | https://support.mozilla.org/en-US/questions/1265295                             |                                       |
    | Install Chrome Browser            | https://www.google.com/chrome/                                                  |                                       |
    | Disable Chrome updates            | http://www.pcerror-fix.com/steps-disable-enable-automatic-updates-google-chrome |                                       |
    | Disable Windows updates           | https://www.cleverfiles.com/howto/disable-update-windows-10.html                |                                       |
    | Install IE Webdriver              | https://www.seleniumhq.org/download/                                            | Download IEDriverServer_x64_3.14.0    |
    |                                   | copy 'IEDriverServer.exe' file to ../Python37/Scripts                           |                                       |
    | Install Edge WebDriver            | https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/           |                                       |
    | Install firefox webdriver         | https://github.com/mozilla/geckodriver/releases/tag/v0.24.0                     |                                       |
    |                                   | copy 'geckodriver.exe' file to ../Python37/Scripts                              |                                       |
    | Install chrome webdriver          | https://sites.google.com/a/chromium.org/chromedriver/downloads                  |                                       |
    |                                   | copy 'chromedriver.exe' file to ../Python37/Scripts                             |                                       |
    | Install nodejs                    | https://nodejs.org/en/download/                                                 |                                       |
    | Install Pa11y                     | https://github.com/pa11y/pa11y                                                  |                                       |
    | Install Pa11y with npm            | `npm install -g pa11y`                                                          | Install Pa11y with npm                |
    | install Imagemagick 6             | https://legacy.imagemagick.org/script/download.php                              | ImageMagick-6.9.10-62-Q16-x64-dll.exe |
    |                                   | check setup install options: (add system path, install FFmpeg)                  |                                       |

  * Software Version Matrix      

    | Software                       | Version                 | Usage             |
    | ------------------------------ | ----------------------- | ----------------- |
    | Windows 10 Enterprise          | 1607 OS Build 14393.447 |                   |
    | Firefox                        | 68.0.2 (64-bit)         |                   |
    | Chrome                         | 76.0.3809.132 (64-bit)  |                   |
    | Microsoft Edge                 | 44.18362.329.0          |                   |
    | Internet Explorer              | 11.295.18362.0          |                   |
    | git                            | 2.23.0.windows.1        | jenkins           |
    | java                           | 1.8.0_221               | jenkins           |
    | Python                         | 3.7.4                   | robotframework    |
    | pip                            | 19.2.2                  | robotframework    |
    | geckodriver                    | 0.24.0                  | Firefox WebDriver |
    | chromedriver                   | 76.0.3809.126           | Chrome WebDriver  |
    | IEDriverServer                 | 3.14.0.0 (64-bit)       | IE11 WebDriver    |
    | MicrosoftWebDriver             | 10.0.12393.0            | Edge WebDriver    |
    | nodejs                         | v10.16.3                | Pa11y             |
    | Pa11y                          | 5.2.0                   | npm               |
    | npm                            | 6.9.0                   | nodejs            |


 * pip Packages Matrix

    | Package                         | Version | Usage                                     |
    | ------------------------------- | ------- | ----------------------------------------- |
    | pip                             | 19.2.3  |                                           |
    | PyYAML                          | 5.1.2   |                                           |
    | robotframework                  | 3.1.2   |                                           |
    | robotframework-selenium2library | 3.0.0   | robotframework-seleniumlibrary dependency |
    | robotframework-seleniumlibrary  | 3.3.1   | robotframework-seleniumlibrary dependency |
    | selenium                        | 3.141.0 | robotframework-seleniumlibrary dependency |
    | setuptools                      | 40.8.0  |                                           |
    | urllib3                         | 1.25.3  | robotframework-seleniumlibrary dependency |
