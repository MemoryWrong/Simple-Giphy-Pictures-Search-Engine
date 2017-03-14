import {API_END_POINT} from './constants';
import fetch from "isomorphic-fetch";

class Http {
    constructor() {

    }

    /**GET http request*/
    getListData(queryPhrase, page) {
        page = page == undefined ? 0 : page;
        var url = `${API_END_POINT}?` + `q=` + `${queryPhrase}` + `&offset=` + `${page}` + `&api_key=dc6zaTOxFJmzC`;
        console.log(url)
        var result = fetch(url);
        console.log(result)
        return result.then((response) => {
            return response.json()
        }).then((json) => {
                console.log(json)
                if (json && json != undefined) {
                    return json;
                }
            }
        ).catch(function (ex) {
            console.log('failed', ex)
        })
    }


    static getInstance() {
        if (!this.instance) {
            this.instance = new Http();
        }
        return this.instance;
    }
}
var http = Http.getInstance();
export default http;