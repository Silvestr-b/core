

class BrowserHistory {
   private location = window.location;
   private history = window.history;
   private listeners: ((url: string) => void)[] = [];
   private previosUrl = '';
   private nextUrl = '';

   constructor(){
      window.onpopstate = this.onpopstate
   }

   addListener(cb: (url: string) => void){
      this.listeners.push(cb)
   }

   removeListener(callback: (url: string) => void){
      this.listeners = this.listeners.filter(listener => listener !== callback)
   }

   setUrl(url: string){
      this.push(url)
   }

   private push(url: string, state: object = {}){
      this.history.pushState(state, '', url)
      this.onpopstate()
   }

   private onpopstate = () => {
      this.previosUrl = this.nextUrl;
      this.nextUrl = this.getUrl();

      if(this.nextUrl !== this.previosUrl){
         this.applyListeners(this.nextUrl)
      }
   }

   private applyListeners(url: string){
      this.listeners.forEach(callback => {
         callback(url)
      })
   }

   private getUrl(){
      return this.location.pathname + this.location.search
   }
}


export { BrowserHistory }