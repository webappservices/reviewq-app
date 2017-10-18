# Makefile for Mobile app development
default: dev

# Local ionic development
dev: node_modules www

# Ionic/Angular/Node setup
node_modules: package.json
	yarn

# www dir is required by cordova
www:
	mkdir www

# Cordova ios prep
platforms/ios:
	ionic cordova platform add ios

# Cordova android prep
platforms/android:
	ionic cordova platform add android

# Build and launch in xcode
xcode: dev platforms/ios
	ionic cordova build ios --prod
	open -a XCode platforms/ios/ReviewQ.xcodeproj

# Build for android
android: dev platforms/android
	ionic cordova build android --prod

# Build and launch in Android studio
android-studio: android
	open -a "Android Studio" platforms/android

# Build and launch on android device
android-device: android
	adb install -r platforms/android/build/outputs/apk/android-debug.apk

# Start from scratch - useful before release
clean:
	rm -rf node_modules
	rm -rf platforms
	rm -rf plugins
	rm -rf www

# Shortcut to clean and rebuild
rebuild: clean dev

.PHONY: dev clean rebuild xcode android android-studio android-device
