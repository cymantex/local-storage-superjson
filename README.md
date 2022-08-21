# Local Storage superjson
This package includes some CRUD utilities for saving [superjson](https://github.com/blitz-js/superjson) serializable objects into LocalStorage in a type safe manner.

## Exposed functions
```typescript
// localStorageJson.ts
function getObject<T>(key: string): T | null
function setObject<T>(key: string, object: T): void
function updateObject<T>(key: string, handleUpdate: (previousObject: T) => T): void
function upsertObject<T>(key: string, valueIfMissing: T, update: (previousObject: T) => T): void

export default {getObject, getObjectOrDefault, setObject, upsertObject};
```

## Sample usage
```typescript
import localStorageJson from "local-storage-superjson";

type User = {username: string, email: string}

// Stores the given user into localStorage with help of superjson.stringify.
localStorageJson.setObject<User[]>("users", [{
  username: "user1",
  email: "user1@email.com"
}]);

// You can then read these users with getObject which uses superjson.parse under the hood.
const users = localStorageJson.getObject<User[]>("users");
console.log(users);
// [{
//   username: "user1",
//   email: "user1@email.com"
// }]

// You can also update an existing object with updateObject. It will however throw an Error if the key does not exist.
const userToAdd = {
  username: "user2",
  email: "user2@email.com"
}
localStorageJson.updateObject<User[]>("users", (previousUsers) => [
  ...previousUsers,
  userToAdd
]);

// upsertObject can be used instead if you're not sure if the localStorage key exists or not
localStorageJson.upsertObject<User[]>("admin-users", userToAdd /*valueIfMissing*/, () => {});

// When the key already exists the handleUpdate function will be called.
localStorageJson.upsertObject<User[]>("admin-users", userToAdd, (previousUsers) => [
  ...previousUsers,
  userToAdd
]);
// [{
//   username: "user2",
//   email: "user2@email.com"
// }, {
//   username: "user2",
//   email: "user2@email.com"
// }]
```
