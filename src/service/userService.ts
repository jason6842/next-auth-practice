type User = {
    name: string,
    email: string,
    password: string,
}

const users = [
    { name: "Test User", email: "test@example.com", password: "test123" }
];

export function getUsers() {
    return users;
}

export function getUser(email: string) {
    users.find((user) => user.email === email);
}

export function addUser(user: User) {
    users.push(user);
}