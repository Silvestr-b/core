import * as pathToRegexp from 'path-to-regexp'
import { MappingResult } from './MappingResult'


class MappingCase {
   private regexp: RegExp;
   private keys = <pathToRegexp.Key[]>[];
   private nextCase: MappingCase;

   constructor(
      public pattern: string,
      private settings: { passNext: boolean }
   ) {
      this.regexp = pathToRegexp(pattern, this.keys);
   }

   setNext(nextCase: MappingCase) {
      this.nextCase = nextCase;
      return this
   }

   match(url: string, results: MappingResult[] = []) {
      const matchingResults = this.regexp.exec(url);

      if (matchingResults) {
         const parsedResults = this.parseResults(matchingResults);
         const mappingResult = new MappingResult(this.pattern, parsedResults);
         results.push(mappingResult)

         if (this.settings.passNext && this.nextCase) {
            this.nextCase.match(url, results)
         }
      }

      if (!matchingResults && this.nextCase) {
         this.nextCase.match(url, results)
      }

      return results
   }

   private parseResults(matchingResults: RegExpExecArray) {
      const values = <{ [key: string]: string }>{};

      for (let i = 0; i < this.keys.length; i++) {
         values[this.keys[i].name] = matchingResults[i + 1];
      }

      return values
   }
}


export { MappingCase }