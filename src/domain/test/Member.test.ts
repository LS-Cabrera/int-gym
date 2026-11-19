import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import type { Plan } from "../Member.ts";

describe("Member", () => {
  let member: Member;

  beforeEach(() => {
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("store name", () => {
    expect(member.name).toBe("Ana Pérez");
  });

  test("store document id", () => {
    expect(member.documentId).toBe("12345678");
  });

  test("store plan", () => {
    expect(member.plan).toBe("full");
  });

  test("store monthly fee", () => {
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject an empty name", () => {
    expect(() => (member.name = "   ")).toThrow();
  });

  test("reject a document id with letters", () => {
    expect(() => (member.documentId = "12a45")).toThrow();
  });

  test("reject a monthly fee of zero", () => {
    expect(() => (member.monthlyFee = 0)).toThrow();
  });

  test("reject an invalid plan", () => {
    expect(() => (member.plan = "gold" as Plan)).toThrow();
  });

  test("reject a monthly fee that is not a number", () => {
    expect(() => (member.monthlyFee = Number.NaN)).toThrow();
  });

  test("show the member as text", () => {
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500",
    );
  });

  test("store discount", () => {
    member.discount = 20;
    expect(member.discount).toBe(20);
  });

  test("throw error when discount is < 0", () => {
    expect(() => (member.discount = -10)).toThrow(
      "El descuento debe estar entre 0 y 100",
    );
  });

  test("throw error when discount is > 100", () => {
    expect(() => (member.discount = 101)).toThrow(
      "El descuento debe estar entre 0 y 100",
    );
  });

  test("to string shows discount", () => {
    member.discount = 25;

    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500 - Descuento: 25%",
    );
  });
});
