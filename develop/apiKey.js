function apiKey(){
   this._serviceKey={};
};

apiKey.prototype.getKey = function(service){
    return this._serviceKey[service];
};

module.exports=apiKey;