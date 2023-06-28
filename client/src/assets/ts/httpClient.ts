
import { IHttpData } from "src/interfaces/IHttpData";
export function httpClient<DataType>(method:string,url:string,data:IHttpData[],loading:(data:DataType,loaded:number)=>void|undefined):Promise<string> {
  return new Promise((resolve)=> {
    const http = new XMLHttpRequest();
    const formData = new FormData();
    data.forEach(d => {
      console.log(d.value)
      formData.append(d.name,d.value);
    })
    http.open(method,url,true);
    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        resolve(http.responseText);
      }
    }
    http.addEventListener("progress",({loaded,total})=> {
      let _loaded:any = ((100/total)*loaded).toFixed(0)
      if(_loaded == 100) {
        loading(JSON.parse(http.responseText) as DataType,_loaded);
      }else{
        loading(JSON.parse('[]'),_loaded)
      }
    })
    http.addEventListener("load",({loaded,total})=> {
      if(loading)loading(JSON.parse(http.responseText) as DataType,loaded/total*100);
    })
    http.send(formData);
  })

}
