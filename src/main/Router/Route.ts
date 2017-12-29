

export type Callback<T,N extends keyof T,R> = ((payload: T[N]) => R)
export type Result<R> = R | object | void 


class Route<T> {
   constructor(
      public name: keyof T,
      public payload: T[keyof T]
   ){
      this.is = this.is.bind(this)
   }

   is<N extends keyof T,R>(routeName: N, ifCallback: Callback<T,N,R>): R;
   is<N extends keyof T,R extends any>(routeName: N, ifCallback: R): R;
   
   is<N extends keyof T,IFR,ELSER>(routeName: N, ifCallback: Callback<T,N,IFR>, elseCallback?: Callback<T,N,ELSER>): IFR | ELSER;
   is<N extends keyof T,IFR,ELSER extends any>(routeName: N, ifCallback: Callback<T,N,IFR>, elseCallback?: ELSER): IFR | ELSER;
   is<N extends keyof T,IFR extends any,ELSER>(routeName: N, ifCallback: IFR, elseCallback?: Callback<T,N,ELSER>): IFR | ELSER;
   is<N extends keyof T,IFR extends any,ELSER extends any>(routeName: N, ifCallback: IFR, elseCallback?: ELSER): IFR | ELSER;

   is<N extends keyof T,R>(routeName: N, ifCallback: Callback<T,N,R>, elseCallback?: Callback<T,N,R>): Result<R> {

      if(this.name === routeName){
         if(typeof ifCallback === 'function'){
            return ifCallback(this.payload)
         } else {
            return ifCallback
         }
      } else {
         if(typeof elseCallback === 'function'){
            return elseCallback(this.payload)
         } else {
            return elseCallback
         }
      }
     
   }

}


export { Route }



// type Partial<T> = {
//    [P in keyof T]?: T[P];
// };

// type Callback<T,N extends keyof T,R> = ((payload: T[N]) => R) | object
// type PatternCondition<T,N extends keyof T> = Partial<T[N]>
// type FunctionCondition<T,N extends keyof T> = (payload: T[N]) => boolean

// type RouteWithoutCondition<T> = <N extends keyof T,R>(a: N, b: Callback<T,N,R> | object) => Result<R>
// type RouteWithPatternCondition<T> = <N extends keyof T,R>(a: N, b: PatternCondition<T,N>, c: Callback<T,N,R> | object) => Result<R>
// type RouteWithFunctionCondition<T> = <N extends keyof T,R>(a: N, b: FunctionCondition<T,N>, c: Callback<T,N,R> | object) => Result<R>


// class Route<T> {
//    public Route: RouteWithoutCondition<T> | RouteWithPatternCondition<T> | RouteWithFunctionCondition<T>

//    constructor(
//       public name: keyof T,
//       public payload: T[keyof T]
//    ){
//       this.Route = this._Route.bind(this)
//    }

//    _Route(a, b, c) {
//       const routeName = a;
//       const condition = c? b : undefined;
//       const callback = c? c : b;

//       if(this.name !== routeName){
//          return
//       }
//       if(!condition){
//          return this.withoutCondition(routeName, callback)
//       }
//       if(typeof condition === 'object'){
//          return this.withPatternCondition(routeName, condition, callback)
//       }
//       if(typeof condition === 'function'){
//          return this.withFunctionCondition(routeName, condition, callback)
//       }
//    }
   
//    private withoutCondition(routeName, cb) {
//       return this.execute(routeName, cb)
//    }

//    private withPatternCondition(routeName, pattern, cb) {     
//       for(let prop in pattern){
//          if(pattern[prop] !== this.payload[prop]){
//             return
//          }
//       }

//       return this.execute(routeName, cb)
//    }

//    private withFunctionCondition(routeName, matchingFn, cb) {
//       if(matchingFn(this.payload)){
//          return this.execute(routeName, cb)
//       }
//    }

//    private execute(routeName, cb){
//       if(typeof cb === 'function'){
//          return cb(this.payload)
//       } else {
//          return cb
//       } 
//    }
// }


// export { Route }