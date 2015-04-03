JS_FILES=$(shell find js/)

build: build.js node_modules $(JS_FILES)
	rm -rf build
	mkdir build
	./node_modules/.bin/babel js \
		--experimental \
		--modules amd \
		--out-dir build
	./node_modules/.bin/r.js -o build.js

node_modules: package.json
	npm install

.PHONY: clean
clean:
	rm -rf build node_modules

.PHONY: serve
serve: build
	python -m SimpleHTTPServer 8080

.PHONY: watch
watch: node_modules
	./node_modules/.bin/watchman $(shell pwd) "make"
