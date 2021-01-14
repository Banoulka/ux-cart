
export default class ResultLogger {
    setResults(results) {
        this.results = results;
    }

    consoleLogResults() {
        console.log('RESULTS TOOLKIT');
        console.log('================');
        console.log('Time in seconds: ' + this.results.timeSeconds);
        console.log('Selected Payment Mode: ' + this.results.modeSelected);
        console.log('Errors made: ' + this.results.errors);
        console.log('================');
    }

    setLocalStorage() {
        window.localStorage.setItem('UX-cart-results', JSON.stringify(this.results));
    }

}