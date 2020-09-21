const app = require('../src/app');

describe('App', () => {
	it('POST / ', () => {
		return supertest(app).get('/').expect(201);
	});
	it('GET /studentcheck ', () => {
		return supertest(app).get('/studentcheck/123458/Weasly').expect(200);
	});
	it('GET /staffcheck ', () => {
		return supertest(app).get('/staffcheck/Apollonia').expect(200);
	});
	it('POST /hold ', () => {
		return supertest(app).get('/').expect(201);
	});
	it('GET /pdf ', () => {
		return supertest(app).get('/pdf/5').expect(200);
	});
	it('GET /conformationpage ', () => {
		return supertest(app).get('/conformationpage/7').expect(201);
	});
	it('PATCH /conformationpage ', () => {
		return supertest(app).get('//5').expect(200);
	});
});
