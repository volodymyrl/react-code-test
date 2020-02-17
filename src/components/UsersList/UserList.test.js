import React from "react";
import { shallow } from "enzyme";
import UserList from "./index";

const initialState = {
  users: [],
  isNoResults: false,
  isError: false,
  isLoading: false,
  isLoading: false,
  isAllLoaded: false
};

const user = { id: 1 };

const setup = props => shallow(<UserList {...props} />);

describe("UserList", () => {
  it("should empty state", () => {
    const wrapper = setup(initialState);

    expect(wrapper.find("UserItem")).toHaveLength(0);
    expect(wrapper.find(".loading")).toHaveLength(0);
    expect(wrapper.find(".message")).toHaveLength(0);
    expect(wrapper.find(".errorMsg")).toHaveLength(0);
  });

  it("should represent loading state", () => {
    const wrapper = setup({ ...initialState, isLoading: true });

    expect(wrapper.find("UserItem")).toHaveLength(0);
    expect(wrapper.find(".loading")).toHaveLength(1);
    expect(wrapper.find(".message")).toHaveLength(0);
    expect(wrapper.find(".errorMsg")).toHaveLength(0);
  });

  it("should represent loaded users state", () => {
    const wrapper = setup({ ...initialState, users: [user] });

    expect(wrapper.find("UserItem")).toHaveLength(1);
    expect(wrapper.find(".loading")).toHaveLength(0);
    expect(wrapper.find(".message")).toHaveLength(0);
    expect(wrapper.find(".errorMsg")).toHaveLength(0);
  });

  it("should represent error users", () => {
    const wrapper = setup({ ...initialState, users: [user], isError: true });
    const error = wrapper.find(".errorMsg");

    expect(wrapper.find("UserItem")).toHaveLength(1);
    expect(wrapper.find(".loading")).toHaveLength(0);
    expect(wrapper.find(".message")).toHaveLength(0);
    expect(error).toHaveLength(1);
    expect(error.text()).toBe("Something went wrong, please contact support team");
  });

  it("should represent all user loaded state", () => {
    const wrapper = setup({ ...initialState, users: [user], isAllLoaded: true });
    const message = wrapper.find(".message");

    expect(wrapper.find("UserItem")).toHaveLength(1);
    expect(wrapper.find(".loading")).toHaveLength(0);
    expect(wrapper.find(".errorMsg")).toHaveLength(0);
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("All users have been loaded");
  });

  it("should represent not user for loading state", () => {
    const wrapper = setup({ ...initialState, isNoResults: true });
    const message = wrapper.find(".message");

    expect(wrapper.find("UserItem")).toHaveLength(0);
    expect(wrapper.find(".loading")).toHaveLength(0);
    expect(wrapper.find(".errorMsg")).toHaveLength(0);
    expect(message).toHaveLength(1);
    expect(message.text()).toBe("No user for loading");
  });
});
