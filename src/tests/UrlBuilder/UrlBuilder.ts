import { expect } from 'chai'
import * as sinon from 'sinon'
import { UrlBuilder } from '../main'


describe('UrlBuilder', () => {

   it('When directories and query params are not declared, should build url like "/"', () => {
      const url = new UrlBuilder().build()

      expect(url).to.be.equal('/')
   })

   it('When one directory is declared, should build url like "/{directoryName}"', () => {
      const url = new UrlBuilder().directory('first').build()

      expect(url).to.be.equal('/first')
   })

   it('When several directories are declared, should build url like "/{directoryName1}/{directoryName2}/{directoryName3}"', () => {
      const url = new UrlBuilder().directory('first').directory('second').directory('third').build()

      expect(url).to.be.equal('/first/second/third')
   })

   it('When directory name is empty string, should not add that directory', () => {
      const url = new UrlBuilder().directory('first').directory('').directory('third').build()

      expect(url).to.be.equal('/first/third')
   })

   it('When only query param is declared, should build url like "/?{parametrName}={parametrValue}"', () => {
      const url = new UrlBuilder().parametr('a', 'b').build()

      expect(url).to.be.equal('/?a=b')
   })

   it('When several query params are declared, should build url like "/?{parametrName1}={parametrValue1}&{parametrName2}={parametrValue2}"', () => {
      const url = new UrlBuilder().parametr('a', 'b').build()

      expect(url).to.be.equal('/?a=b')
   })

   it('When directory and query parametr are declared, should build url like "/{directoryName}?{parametrName}={parametrValue}"', () => {
      const url = new UrlBuilder().directory('first').parametr('a', 'b').build()

      expect(url).to.be.equal('/first?a=b')
   })

   it('When query param value is null, undefined or empty string, should not add that param', () => {
      const urlWithNull = new UrlBuilder().directory('first').parametr('a', '1').parametr('b', null).parametr('c', '3').build();
      const urlWithUndefined = new UrlBuilder().directory('first').parametr('a', '1').parametr('b', undefined).parametr('c', '3').build();
      const urlWithEmptyString = new UrlBuilder().directory('first').parametr('a', '1').parametr('b', '').parametr('c', '3').build();

      expect(urlWithNull).to.be.equal('/first?a=1&c=3')
      expect(urlWithUndefined).to.be.equal('/first?a=1&c=3')
      expect(urlWithEmptyString).to.be.equal('/first?a=1&c=3')
   })

   it('When callback is setted, should be called with result after build', () => {
      const spy = sinon.spy();
      const url = new UrlBuilder().setCallback(spy).directory('first').build()

      expect(spy.calledWith('/first')).to.be.true
   })

})