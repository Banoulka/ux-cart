export default class ResultLogger {
    setResults(results) {
        this.results = results;
    }

    sendApi(endpoint) {
        const data = {
            timeSeconds: this.results.timeSeconds,
            modeSelected: this.results.modeSelected,
            errors: this.results.errors,
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err));
    }

    downloadText() {
        let element = document.createElement('a');
        const text =
            `UX CART RESULTS ===============
                > Time in seconds: ${this.results.timeSeconds}\n
                > Selected Payment Mode: ${this.results.modeSelected}\n
                > Errors Made: ${this.results.errors};
            `;
        element.setAttribute('href',  'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'results.txt');

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
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