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
xcode: dev buildnumbers platforms/ios
	ionic cordova build ios --prod
	open -a XCode platforms/ios/QSurve.xcodeproj

# Build and launch in Android studio
android-studio: dev buildnumbers platforms/android
	ionic cordova build android --prod
	open -a "Android Studio" platforms/android

# Start from scratch - useful before release
clean:
	rm -rf node_modules
	rm -rf platforms
	rm -rf plugins
	rm -rf www

# Shortcut to clean and rebuild
rebuild: clean dev

.PHONY: dev clean rebuild xcode android-studio
