import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1000,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1000);
  });

  test("total discounted", () => {
    const member2 = new Member({
      name: "Juan Pérez",
      documentId: "87654321",
      plan: "premium",
      monthlyFee: 500,
    });

    member.discount = 10;
    list.add(member);

    member2.discount = 0;
    list.add(member2);

    expect(list.totalDiscounted()).toBe(1400);
  });

  test("update non existent member fee", () => {
    expect(() => list.updateFee("", 100)).toThrow("El socio no existe");
  });

  test("update existent member fee", () => {
    list.add(member);
    expect(member.monthlyFee).toBe(1000);

    list.updateFee("12345678", 500);
    expect(member.monthlyFee).toBe(500);
  });

  test("update existent member fee with another member already on the list", () => {
    const member2 = new Member({
      name: "Juan Pérez",
      documentId: "87654321",
      plan: "premium",
      monthlyFee: 500,
    });

    list.add(member2);
    list.add(member);
    expect(member.monthlyFee).toBe(1000);

    list.updateFee("12345678", 500);
    expect(member.monthlyFee).toBe(500);
  });
});
