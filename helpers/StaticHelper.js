export default class StaticHelper {
  static getUrlParams(param) {
    let url = new URL(window.location);
    let params = url.searchParams.get(param);

    return params;
  }
}
