.PHONY: build run clean

node_modules: package-lock.json
	npm ci

build: node_modules
	npm run build

run: node_modules
	npm run dev

clean:
	rm -rf dist/ node_modules/
