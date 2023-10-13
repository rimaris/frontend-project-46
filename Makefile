lint:
	npx eslint
install:
	npm ci
link:
	npm link
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8