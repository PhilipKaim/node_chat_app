const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let message = generateMessage('philip', 'testing');

        expect(message.from).toBe('philip');
        expect(message.text).toBe('testing');
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should correct location object', () => {
        let message = generateLocationMessage('philip', 1, 2);

        expect(message.from).toBe('philip');
        expect(message.url).toBe('https://www.google.com/maps?q=1,2');
        expect(typeof message.createdAt).toBe('number');
    });
});