REPORTER = spec

test: 
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--ui tdd \
		--bail \
		--reporter $(REPORTER)

test-cov: lib-cov
	@NCORE_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

build:
	node ./src/build.js

start:
	supervisor ./index.js

ncore:
	./node_modules/.bin/ncore -o ./src/static/bundle.js ./src/modules

.PHONY: test test-cov