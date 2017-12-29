// import { BrowserHistory } from '../BrowserHistory'
// import { UrlMapper } from '../UrlMapper'
// import { Payload } from './Payload'


// class UrlWatcher {
//    private cases: { [pattern: string]: (payload: Payload) => void } = {};

//    constructor(
//       private history: BrowserHistory,
//       private mapper: UrlMapper,
//       private queryParamsExtractor
//    ) {
//       history.addListener(this.onUrlChanged);
//    }

//    add(pattern: string, callback: (payload: Payload) => void) {
//       this.cases[pattern] = callback;
//       this.mapper.add(pattern);
//    }

//    private onUrlChanged = (url: string) => {
//       const mappingResults = this.mapper.map(url);
//       const queryParams = this.queryParamsExtractor.extract(url);

//       mappingResults.forEach(mappingResult => {
//          const mappedCallback = this.cases[mappingResult.pattern];
//          const payload = new Payload(mappingResult.values, queryParams, url);

//          mappedCallback(payload);
//       });
//    }

// }


// export { UrlWatcher }