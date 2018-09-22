const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const str = 1234;

        expect(isRealString(str)).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        const str = '       ';

        expect(isRealString(str)).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        const str = 'this should pass';

        expect(isRealString(str)).toBeTruthy();
    });
});