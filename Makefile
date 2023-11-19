.PHONY: build demo clean

node_modules: package-lock.json
	npm ci

build: node_modules
	npm run build
	${MAKE} -C demo build

demo:
	${MAKE} -C demo run

clean:
	rm -rf dist node_modules/
	${MAKE} -C demo clean
