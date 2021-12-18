import 'whatwg-fetch';
import { server } from './mocks/server';

process.env = { REACT_APP_URL: 'http://localhost:4000/graphql', ...process.env };

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());