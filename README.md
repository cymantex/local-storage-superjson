# Local Storage superjson
This package includes some CRUD utilities for saving [superjson](https://github.com/blitz-js/superjson) serializable objects into LocalStorage in a type safe manner.

## Exposed functions
```typescript
// localStorageJson.ts
function getObject<T>(key: string): T | null
function setObject<T>(key: string, object: T): void
function updateObject<T>(key: string, handleUpdate: (previousObject: T) => T): void
function upsertObject<T>(key: string, valueIfMissing: T, handleUpdate: (previousObject: T) => T): void
```

## Sample usage
```typescript
import localStorageJson from "local-storage-superjson";
// or import {getObject, setObject, ...} from "local-storage-superjson";

type Score = {points: number, accuracy: string}

// Stores the given object into localStorage with help of superjson.stringify.
localStorageJson.setObject<Score[]>("scores", [{
  points: 85,
  accuracy: "65%"
}]);

// You can then read this object with getObject
const scores = localStorageJson.getObject<Score[]>("scores");
// [{
//   points: 85,
//   accuracy: "65%"
// }]

// You can also update an existing object with updateObject.
// This will however throw an Error if the key does not exist.
const scoreToAdd = {
  points: 50,
  accuracy: "100%"
};
localStorageJson.updateObject<Score[]>("scores", previousScores => [
  ...previousScores,
  scoreToAdd
]);

// upsertObject can be used instead if you're not sure if the key exists or not.
// If the given key is not in localStorage it will set the given valueIfMissing.
localStorageJson.upsertObject<Score[]>("easy-scores", /*valueIfMissing:*/ [scoreToAdd], previousUsers => [
  ...previousUsers,
  scoreToAdd
]);

// When the key already exists the handleUpdate function will be called to
// provide a new object based on the previousObject.
localStorageJson.upsertObject<Score[]>("easy-scores", [scoreToAdd], /*handleUpdate:*/ previousUsers => [
  ...previousUsers,
  scoreToAdd
]);
// [{
//   points: 50,
//   accuracy: "100%"
// }, {
//   points: 50,
//   accuracy: "100%"
// }]
```
