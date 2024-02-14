class LogicError extends Error {

  constructor(msg: string) {

    super(`[Логическая ошибка]: ${msg}`);

  }

}


export { LogicError };
