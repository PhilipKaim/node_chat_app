const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'philip',
            room: 'room a'
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let user = users.removeUser('1');

        expect(user).toBe('Mike');
    });

    it('should not remove a user', () => {
        let user = users.removeUser('144');

        expect(user).toBe(undefined);
    });

    it('should find a user', () => {
        let user = users.getUser('1');

        expect(user).toBe('Mike');
    });

    it('should not find a user', () => {
        let user = users.getUser('144');

        expect(user).toBe(undefined);
    });

    it('should return names for node course', () => {
        let usersList = users.getUserList('Node Course');

        expect(usersList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        let usersList = users.getUserList('React Course');

        expect(usersList).toEqual(['Jen']);
    });
});