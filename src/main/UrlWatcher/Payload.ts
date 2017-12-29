

class Payload {
   constructor(
      public params: { [paramName: string]: string },
      public query: { [queryParamName: string]: string },
      public url: string
   ) { }
}

export { Payload }