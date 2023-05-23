import {IHttpData} from "src/app/interfaces/IHttpData";
export function httpClient(method:string,url:string,data:IHttpData[],loading:(data:any,loaded:any)=>void|undefined):Promise<string> {
  return new Promise((resolve)=> {
    const http = new XMLHttpRequest();
    const formData = new FormData();
    data.forEach(d => {
      formData.append(d.name,d.value);
    })
    http.open(method,url,true);
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        resolve(http.responseText);
      }
    }
    http.addEventListener("load",({loaded,total})=> {
      if(loading)loading(http.responseText,loaded/total*100);
    })
    http.send(formData);
  })

}
