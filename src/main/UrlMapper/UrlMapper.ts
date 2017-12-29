import { MappingResult } from './MappingResult'
import { MappingCase } from './MappingCase'


class UrlMapper {
   private firstCase: MappingCase;
   private lastCase: MappingCase;

   map(url: string) {
      return this.firstCase.match(url);
   }

   addCase(pattern: string, settings: { passNext: boolean }) {
      const newCase = new MappingCase(pattern, settings);

      if (!this.firstCase) {
         this.firstCase = newCase;
      }

      if (this.lastCase) {
         this.lastCase.setNext(newCase);
      }

      this.lastCase = newCase;

      return this
   }

}


export { UrlMapper }