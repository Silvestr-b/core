

class UrlBuilder {
   private directoryDelimetr: string = '/';
   private parametrsDelimetr: string = '?';
   private parametrNameDelimetr: string = '&';
   private parametrValueDelimetr: string = '=';
   private directories: string[] = [];
   private parameters: { name: string, value: string }[] = [];
   private callback?: (url: string) => any

   setCallback(callback: (url: string) => any) {
      this.callback = callback;
      return this
   }

   directory(directoryName: string) {
      if (directoryName.length > 0) {
         this.directories.push(directoryName);
      }
      return this
   }

   parametr(name: string, value?: string | null) {
      if (value) {
         this.parameters.push({ name: name, value: value })
      }
      return this
   }

   build() {
      const url = this.createUrl()

      if (this.callback) {
         this.callback(url)
      }

      return url
   }

   private createUrl() {
      let directories = '';
      let parameters = '';

      for (let i = 0; i < this.directories.length; i++) {
         directories += this.directoryDelimetr + this.directories[i]
      }

      for (let i = 0; i < this.parameters.length; i++) {
         parameters += this.parametrNameDelimetr + this.parameters[i].name + this.parametrValueDelimetr + this.parameters[i].value
      }

      if (directories.length === 0) {
         directories = this.directoryDelimetr
      }

      if (parameters.length > 0) {
         parameters = this.parametrsDelimetr + parameters.slice(1)
      }

      return directories + parameters
   }
}


export { UrlBuilder }