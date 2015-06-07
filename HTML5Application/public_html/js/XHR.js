function Obtenerxhr(){
	var req = false;
	if(window.XMLHttpRequest){
		req = new XMLHttpRequest;
	}else{
		if(ActiveXObject){
			 var version = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp",
                        "Microsoft.XMLHttp"];
                        for(var i = 0; i < version.length; i++){
                        	try{
                        		req = new ActiveXObject(version[i]);
                        		return req;
                        	} catch(e){

                        	}
                        }
		}
	}
	return req;
}