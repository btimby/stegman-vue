import { mount } from "@vue/test-utils";
import Write from "@/components/Write.vue";
import { describe, it, expect } from "vitest";

describe("Write.vue", () => {

  it("puts v-model value in correct place", () => {

    const message = "Hello Aaron!";
    const wrapper = mount(Write, {
      props: { modelValue: message },
    });

    expect(
      wrapper.get('textarea[name=cover]').element.value
    ).toBe(message);
  });
});