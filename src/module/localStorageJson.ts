import superjson from "superjson";

/**
 * @param key The key you want to retrieve the value of.
 * @returns T | null The parsed superjson object or null if it doesn't exist.
 */
function getObject<T>(key: string): T | null {
  const serializedObjectOrNull: string | null = localStorage.getItem(key);
  return serializedObjectOrNull !== null
      ? superjson.parse<T>(serializedObjectOrNull)
      : null;
}

/**
 * @param key The key you want to retrieve the value of.
 * @param object The object you want to stringify and save.
 */
function setObject<T>(key: string, object: T): void {
  localStorage.setItem(key, superjson.stringify(object));
}

/**
 * @param key The key of the entry you want to update.
 * @param handleUpdate A function which determines what the updated object should look like based
 *                     on the previousObject.
 * @throws Error if the given key does not exist.
 */
function updateObject<T>(key: string, handleUpdate: (previousObject: T) => T): void {
  const objectOrNull = getObject<T>(key);

  if (objectOrNull === null) {
    throw new Error(`${key} does not exist in localStorage`);
  } else {
    setObject(key, handleUpdate(objectOrNull));
  }
}

/**
 * @param key The key of the entry you want to create/update.
 * @param valueIfMissing The value to set if the key does not exist.
 * @param handleUpdate A function which determines what the updated object should look like based
 *                     on the previousObject. This function will only be called if the key
 *                     already exists.
 */
function upsertObject<T>(key: string, valueIfMissing: T, handleUpdate: (previousObject: T) => T): void {
  const objectOrNull = getObject<T>(key);

  if (objectOrNull === null) {
    setObject(key, valueIfMissing);
  } else {
    setObject(key, handleUpdate(objectOrNull));
  }
}

export default {getObject, setObject, updateObject, upsertObject};
