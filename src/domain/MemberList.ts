import { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    const exists = this.#items.some(
      (member) => member.documentId === _documentId,
    );
    const newList: Member[] = [];

    if (exists) {
      while (this.#items.length > 0) {
        const m = this.#items.pop();
        if (m && m.documentId !== _documentId) {
          newList.push(m);
        } else if (m && m.documentId === _documentId) {
          m.monthlyFee = _fee;
          newList.push(m);
        }
      }
      this.#items = newList;
    } else {
      throw new Error("El socio no existe");
    }
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    let total = 0;

    for (const m of this.#items) {
      if (m.discount > 0) {
        const discountApplied = m.monthlyFee * (m.discount / 100);
        total = total + m.monthlyFee - discountApplied;
      } else {
        total = total + m.monthlyFee;
      }
    }

    return total;
  }
}
