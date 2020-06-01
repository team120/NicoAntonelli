/* import { User } from "../../src/entities/user/user.model";
import { getUsersLogicFactory } from "../../src/services/users/user.logic";

describe("Get all users", () => {
  it("should return some mocked users", () => {
    const userMock = { name: "x", id: 1 };
    const getQuery = jest.fn().mockReturnValue(
      new Promise<User[]>((resolve) => resolve([userMock, userMock])),
    );

    getUsersLogicFactory(getQuery)().then((users) => {
      expect(users).toHaveLength(2);
      expect(users[0]).not.toHaveProperty("password");
    });
  });
});
 */
