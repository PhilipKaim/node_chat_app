const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let message = generateMessage('philip', 'testing');

        expect(message.from).toBe('philip');
        expect(message.text).toBe('testing');
        expect(typeof message.createdAt).toBe('number');
    });
});