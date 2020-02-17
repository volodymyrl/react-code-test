import React from "react";
import { shallow } from "enzyme";
import UserItem from "./index";

const user = {
  id: 11,
  email: "george.edwards@reqres.in",
  first_name: "George",
  last_name: "Edwards",
  avatar: "avatar"
};

const setup = () => shallow(<UserItem user={user} />);

describe("UserItem", () => {
  it("should represent link ", () => {
    const wrapper = setup();
    const item = wrapper.find(".item");

    expect(item.text()).toBe(`${user.first_name} ${user.last_name}`);
    expect(item.prop("href")).toBe(`mailto:${user.email}`);
  });

  it("should represent avatar", () => {
    const wrapper = setup();
    const avatar = wrapper.find(".avatar");

    expect(avatar.prop("src")).toBe(user.avatar);
    expect(avatar.prop("alt")).toBe("avatar");
  });
});
