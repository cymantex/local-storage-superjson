import {LocalStorageMock} from "./LocalStorageMock";
import localStorageJson from "../module/localStorageJson";

beforeEach(() => {
  global.localStorage = new LocalStorageMock();
});

const key = "key";
const missingKey = "missingKey";
type User = {firstName: string}

describe("setObject", () => {
  it("sets array", () => {
    const users = [{firstName: "foo"}, {firstName: "bar"}];
    localStorageJson.setObject<User[]>(key, users);
    expect(localStorageJson.getObject<User[]>(key)).toEqual(users);
  });

  it("sets map", () => {
    const map = new Map<string, string>([["foo", "bar"]]);
    localStorageJson.setObject(key, map);
    expect(localStorageJson.getObject(key)).toEqual(map);
  });
});

describe("getObject", () => {
  it("Returns null if key does not exist", () => {
    expect(localStorageJson.getObject<User[]>(missingKey)).toBeNull();
  });
});

describe("updateObject", () => {
  it("Throws if key does not exist", () => {
    expect(() => localStorageJson.updateObject<User[]>(missingKey, () => {
      throw new Error("updateExisting function should not be called");
    })).toThrow(Error);
  });

  it("Updates existing object", () => {
    const userToAdd = {firstName: "foo"};
    const addUser = (previousUsers: User[]) => [
      ...previousUsers,
      userToAdd
    ];

    localStorageJson.setObject<User[]>(key, [userToAdd]);
    localStorageJson.updateObject<User[]>(key, addUser);

    expect(localStorageJson.getObject(key)).toEqual([userToAdd, userToAdd]);
  });
});


describe("upsertObject", () => {
  it("Uses defaultValue if key does not exist", () => {
    localStorageJson.upsertObject<User[]>(missingKey, [], () => {
      throw new Error("updateExisting function should not be called");
    });

    expect(localStorageJson.getObject(missingKey)).toEqual([]);
  });

  it("Updates existing object", () => {
    const userToAdd = {firstName: "foo"};
    const addUser = (previousUsers: User[]) => [
      ...previousUsers,
      userToAdd
    ];

    localStorageJson.upsertObject<User[]>(key, [userToAdd], addUser);
    localStorageJson.upsertObject<User[]>(key, [], addUser);

    expect(localStorageJson.getObject(key)).toEqual([userToAdd, userToAdd]);
  });
});
