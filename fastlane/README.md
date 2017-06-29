fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

## Choose your installation method:

<table width="100%" >
<tr>
<th width="33%"><a href="http://brew.sh">Homebrew</a></td>
<th width="33%">Installer Script</td>
<th width="33%">Rubygems</td>
</tr>
<tr>
<td width="33%" align="center">macOS</td>
<td width="33%" align="center">macOS</td>
<td width="33%" align="center">macOS or Linux with Ruby 2.0.0 or above</td>
</tr>
<tr>
<td width="33%"><code>brew cask install fastlane</code></td>
<td width="33%"><a href="https://download.fastlane.tools">Download the zip file</a>. Then double click on the <code>install</code> script (or run it in a terminal window).</td>
<td width="33%"><code>sudo gem install fastlane -NV</code></td>
</tr>
</table>

# Available Actions
### deploy
```
fastlane deploy
```
Deploy changes to iOS and Android [Staging]
### promote
```
fastlane promote
```
Promote iOS and Android [Staging -> Release]

----

## iOS
### ios deploy
```
fastlane ios deploy
```
Deploy changes to iOS [Staging]
### ios promote
```
fastlane ios promote
```
Promote iOS [Staging -> Release]
### ios beta
```
fastlane ios beta
```
Submit a new Beta Build to Apple TestFlight
### ios release
```
fastlane ios release
```
Build and deploy a new version to the App Store

----

## Android
### android deploy
```
fastlane android deploy
```
Deploy changes to Android [Staging]
### android promote
```
fastlane android promote
```
Promote Android [Staging -> Release]
### android test
```
fastlane android test
```

### android alpha
```
fastlane android alpha
```
Build and upload APK to the Play Store (alpha)

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
