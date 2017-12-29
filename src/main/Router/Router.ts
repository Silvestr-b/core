import { Route, Callback } from './Route'



class Router<T extends object> {
   public route: Route<T>;
   private listeners: Callback<T, any, any>[] = [];

   set<R extends keyof T>(name: R, payload: T[R]) {
      this.route = new Route<T>(name, payload);
      this.emitChange();
      return this
   }

   addListener(listener: Callback<T, any, any>) {
      this.listeners.push(listener)
      return this
   }

   setListeners(listeners: {[P in keyof T]: (route: T[P]) => void}) {
  
   }

   emitChange() {
      this.listeners.forEach(cb => cb(this.route))
   }

}


export { Router }