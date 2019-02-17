export class Expression {

  private rhs: Expression | number;
  private operation: Operation;

  constructor(private lhs: number = 0) {}

  set value(value: number) {
    if (this.operation) {
      if (this.rhs instanceof Expression) {
        this.rhs.rhs = value;
      } else {
        this.rhs = value;
      }
    } else {
      this.lhs = value;
    }
  }

  set operator(key: string) {
    const op = Operators[key];
    if (!op) {
      return;
    }

    if (!this.operation || !this.rhs) {
      this.operation = op;
    } else if (op.precedence <= this.operation.precedence) {
      this.lhs = this.valueOf();
      this.operation = op;
      delete this.rhs;
    } else {
      this.rhs = new Expression(this.rhs.valueOf());
      this.rhs.operation = op;
    }
  }

  valueOf(): number {
    return this.operation.method(this.lhs, this.rhs.valueOf());
  }

  isEmpty(): boolean {
    if (this.operation) {
      if (this.rhs === undefined) {
        return true;
      }

      if (this.rhs instanceof Expression) {
        return this.rhs.isEmpty();
      }
    }

    return false;
  }

  negate() {
    if (this.rhs === undefined) {
      this.lhs = -this.lhs;
      return;
    }

    if (this.rhs instanceof Expression) {
      this.rhs.negate();
      return;
    }

    this.rhs = -this.rhs;
  }

  percent() {
    if (this.rhs === undefined) {
      this.lhs = this.lhs * 0.01;
      return;
    }

    if (this.rhs instanceof Expression) {
      this.rhs.percent();
      return;
    }

    this.rhs = this.rhs * 0.01;
  }

  toString(): string {
    if (this.rhs !== undefined) {
      if (this.rhs instanceof Expression) {
        if (this.rhs.rhs !== undefined) {
          return this.rhs.rhs.toString();
        } else {
          return this.rhs.lhs.toString();
        }
      } else {
        return this.rhs.toString();
      }
    } else {
      return this.lhs.toString();
    }
  }

  apply(): Expression {
    if (this.operation) {
      return new Expression(this.valueOf());
    }

    return this;
  }
}

interface Operation {
  precedence: number;
  method: (lhs: number, rhs: number) => number;
}

const Operators: { [key: string]: Operation } = {
  '*': {precedence: 2, method: (a, b) => a * b},
  '/': {precedence: 2, method: (a, b) => a / b},
  '+': {precedence: 1, method: (a, b) => a + b},
  '-': {precedence: 1, method: (a, b) => a - b}
};
