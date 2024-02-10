import { LogicError } from "../common-errors";
import { Nullable } from "../common-types";


class Stack<T> {

  private size: number;
  private head: Nullable<StackNode<T>>;
  private tail: Nullable<StackNode<T>>;

  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }


  public push(value: T) {
    const node = new StackNode(value);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;

    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size++;
  }


  public pop(): T {

    if (this.isEmpty())
      throw new EmptyStackError();

    const deleted = this.tail!;

    this.tail = this.tail!.prev;

    if (this.tail === null)
      this.head = null;
    else
      this.tail.next = null;

    this.size--;

    return deleted.value;
  }


  public peek(): T {
    if (this.isEmpty())
      throw new EmptyStackError();

    return this.tail!.value;
  }


  public isEmpty() {
    return this.head === null && this.tail === null;
  }

}



class StackNode<Type> {

  value: Type;
  next: Nullable<StackNode<Type>>;
  prev: Nullable<StackNode<Type>>;

  constructor(value: Type) {
    this.value = value
    this.next = null
    this.prev = null
  }
}


class EmptyStackError extends LogicError {
  constructor() {
    super("стек пуст");
  }
}


export { Stack, EmptyStackError };
