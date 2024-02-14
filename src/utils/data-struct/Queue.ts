import { LogicError } from "../common-errors";
import { Nullable } from "../common-types";

class Queue<T> {

  private size: number;
  private head: Nullable<QueueNode<T>>;
  private tail: Nullable<QueueNode<T>>;

  constructor() {

    this.size = 0;
    this.head = null;
    this.tail = null;

  }


  public enqueue(value: T) {

    const node = new QueueNode(value);

    if (this.isEmpty()) {

      this.head = node;
      this.tail = node;

    } else {

      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;

    }

    this.size += 1;

  }


  public dequeue(): T {

    if (this.isEmpty())
      throw new EmptyQueueError();

    const deleted = this.head!;

    this.head = this.head!.next;

    if (this.head === null)
      this.tail = null;
    else
      this.head.prev = null;

    deleted.next = null;
    deleted.prev = null;

    this.size -= 1;

    return deleted.value;

  }


  public peek(): T {

    if (this.isEmpty())
      throw new EmptyQueueError();

    return this.head!.value;

  }


  public isEmpty() {

    return this.head === null && this.tail === null;

  }

}


class QueueNode<Type> {

  value: Type;
  next: Nullable<QueueNode<Type>>;
  prev: Nullable<QueueNode<Type>>;

  constructor(value: Type) {

    this.value = value;
    this.next = null;
    this.prev = null;

  }

}


class EmptyQueueError extends LogicError {

  constructor() {

    super("очередь пуста");

  }

}


export { Queue, EmptyQueueError };
