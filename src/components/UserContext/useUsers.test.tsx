import { renderHook, act } from "@testing-library/react-hooks";
import { useUsers, UsersProvider } from "./UserContextProvider";

const wrapper = ({ children }) => <UsersProvider>{children}</UsersProvider>;

describe("useUsers", () => {
  it("add user", () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper,
    });

    expect(result.current.currentUser).toBe("");

    act(() => {
      result.current.addUser("tester", "password");
    });

    expect(result.current.currentUser).toBe("tester");
    expect(result.current.users).toContain("tester");
  });

  it("login and logout", () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper,
    });
    act(() => {
      result.current.addUser("tester", "password");
      result.current.logOut();
    });
    expect(result.current.currentUser).toBe("");
    expect(result.current.users).toContain("tester");

    act(() => {
      result.current.authUser("tester", "password");
    });
    expect(result.current.currentUser).toBe("tester");
  });
});
