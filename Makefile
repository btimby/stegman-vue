.PHONY: build clean

node_modules: package-lock.json
	npm ci

build: node_modules
	npm run build

clean:
	rm -rf dist node_modules/
