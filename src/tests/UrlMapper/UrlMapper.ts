import { expect } from 'chai'
import * as sinon from 'sinon'
import { UrlMapper } from '../../main/UrlMapper'


describe('UrlMapper', () => {

   describe('.match', () => {

      it('When passed not matched url, should return empty array', () => {
         const result = new UrlMapper()
            .addCase('/foo/:bar', { passNext: false })
            .addCase('/foo/bar/baz', { passNext: false })
            .map('/baz');

         expect(result.length).to.be.equal(0);
      })

      it('When passed matched url, should return array of MappingResult that contain mached values by name at values field', () => {
         const result = new UrlMapper()
            .addCase('/foo/:bar', { passNext: false })
            .map('/foo/value')

         expect(result.length).to.be.equal(1);
         expect(result[0].values.bar).to.be.equal('value');
      })

      it('When declared many cases and passed matched url, should return array of matched case MappingResult', () => {
         const result = new UrlMapper()
            .addCase('/foo/:bar/:baz', { passNext: false })
            .addCase('/foo/:bar', { passNext: false })
            .addCase('/foo', { passNext: false })
            .map('/foo/value')

         expect(result.length).to.be.equal(1);
         expect(result[0].values.bar).to.be.equal('value');
      })

      it('When passed matched url, should return array of MappingResult that contain mached pattern at pattern field', () => {
         const result = new UrlMapper()
            .addCase('/foo/:bar/:baz', { passNext: false })
            .addCase('/foo/:bar', { passNext: false })
            .addCase('/foo', { passNext: false })
            .map('/foo/value')

         expect(result.length).to.be.equal(1);
         expect(result[0].pattern).to.be.equal('/foo/:bar');
      })

   })

   describe('.passToNext', () => {

      it('When passNext is declared in settings, should return array of current and next cases results', () => {
         const result = new UrlMapper()
            .addCase('/:foo1/:bar1', { passNext: true })
            .addCase('/:foo2/:bar2', { passNext: false })
            .map('/value1/value2');

         expect(result.length).to.be.equal(2);
         expect(result[0].pattern).to.be.equal('/:foo1/:bar1');
         expect(result[0].values.foo1).to.be.equal('value1');
         expect(result[0].values.bar1).to.be.equal('value2');
         expect(result[1].pattern).to.be.equal('/:foo2/:bar2');
         expect(result[1].values.foo2).to.be.equal('value1');
         expect(result[1].values.bar2).to.be.equal('value2');
      })

      it('When passNext is declared in settings but next case is not setted, should return array of first result', () => {
         const result = new UrlMapper()
            .addCase('/:foo/:bar', { passNext: true })
            .map('/value1/value2')

         expect(result.length).to.be.equal(1);
         expect(result[0].values.foo).to.be.equal('value1');
         expect(result[0].values.bar).to.be.equal('value2');
      })

   })

})