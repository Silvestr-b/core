

class MappingResult {
   constructor(
      public pattern: string,
      public values: { [valueName: string]: string }
   ){}
}


export { MappingResult }