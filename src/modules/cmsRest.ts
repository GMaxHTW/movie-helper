import apiClient from "@/modules/restClient";
import restClient, {basePath, bearer}  from "@/modules/restClient";

export interface cmsSetting {
    search?: Array<cmsSearch>,
    limit? : number,
    offset? : number,
    select? : Array<string>
}

export interface cmsSearch {
    data: param,
    negative?: boolean
}

export interface param {
    name : string,
    value : string
}

class pageCMS {

    imgStyles : any;

    ready: boolean = false;

    init() : Promise<boolean>{
        this.imgStyles = {};

        return new Promise((resolve, reject) => {
            if(this.ready) resolve(true)

            const styleURL = 'https://code.5ga.de:443/cms/imgstyle.json';
            fetch(styleURL)
            .then((res: any) => {
                if(res.ok) return res.json();
            })
            .then((data:any) => {
                this.imgStyles = data;
                this.ready = true;
                resolve(true);
            })
            .catch((err: any) => {
                console.log('Fehler',err);
                reject(false);
            })
        });
    }

    request(call : string, collection: boolean = false, settings : cmsSetting): Promise<any> {
        return new Promise(function(resolve, reject){

            let params : Array<param> = [];
            params.push({name: "populate", value: "3"});
            params.push({name: "lang", value: "de"});
            params.push({name: "sort[_o]", value: "1"});

            if(!settings.limit) settings.limit = 0;
            else params.push({name: "limit", value: settings.limit.toString()});

            if(!settings.offset) settings.offset = 0;
            else params.push({name: "skip", value: settings.offset.toString()});

            if(!settings.select) settings.select = [];
            else{
                for(var n in settings.select){
                    params.push({name:"fields["+settings.select[n]+"]", value: "1"});
                }
            }

            if(!settings.search) settings.search = [];
            else{
                for(var n in settings.search){
                    const searchElm: cmsSearch = settings.search[n];
                    const filterParam: param = searchElm.data;
                    let query = 'filter';
                    if(!searchElm.negative && settings.search.length > 1) query += '[$and][]';
                    query += '['+filterParam.name+']';
                    if(searchElm.negative) query += '[$not]';

                    params.push({name:query, value:filterParam.value});
                }
            }

            let data = [];
            for(var n in params){
                data.push( params[n].name + "=" + encodeURI(params[n].value) );
            }

            const baseURL = (collection) ? 'collections' : 'singletons';
            apiClient.post("/"+baseURL+"/get/"+call, data.join('&'))
            .then((res:any) => {
                // check if everything is allright
                resolve(res.data);
            }).catch((err: any) => {
                reject(err);
            })
        });

    }

    image(imgData: any, imgFormat = 'default'){

        if(!(imgData.path)){
            console.log("Image Path or Image missing");
            return "";
        }

        if(!this.imgStyles) {
            console.log("Styles not defined");
            return imgData.path;
        }

        const imgPath = (imgData.path.substring(0,1) === "/") ? imgData.path.substring(1) : imgData.path;

        const property = [
            {name: "token", value: bearer },
            {name: "src", value: imgPath },
            {name: "o", value: true },
            {name: "q", value: 85 }
        ];

        const selStyle = (!this.imgStyles[imgFormat]) ? this.imgStyles.default : this.imgStyles[imgFormat];

        for(let n in selStyle){
            property.push(
                {name: (n).toString(), value: (selStyle[n]).toString()} as param
            )
        }

        const query_arr: Array<string> = [];
        for(let key in property){
            query_arr.push(property[key].name + '=' + encodeURI(property[key].value));
        }

        const imgAPI = '/api/cockpit/image?'+query_arr.join('&');
        return basePath + imgAPI;
    }

    getArray(objData: any[]): Array<any>{
        let clean_array = [];

        if(objData.length > 0) {
            for (let ind in objData) {
                clean_array.push(objData[ind].value);
            }
        }

        return clean_array;
    }

    getAsset(assData: any){
        const fullPath = (typeof (assData) === "string") ? assData : assData.path;
        let path = (fullPath.substring(0, 1) === '/') ? fullPath.substring(1) : fullPath;

        const searchTerm = 'storage/uploads/';
        const isInStorage = path.search(searchTerm);

        if(isInStorage !== -1)  path = path.substring(isInStorage+searchTerm.length);

        return basePath+'/'+searchTerm+path;
    }
}

export default new pageCMS();