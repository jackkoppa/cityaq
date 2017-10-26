export class ApiHelper {
    static buildQueryString(request: { [key: string]: any }): string {
        let queryString = []
        for (var prop in request) queryString.push(encodeURIComponent(prop) + '=' + encodeURIComponent(request[prop]))
        return queryString.join('&')
    }
}