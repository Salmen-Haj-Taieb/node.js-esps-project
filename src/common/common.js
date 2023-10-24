const calcule=(a,b,res)=>res(a+b)
const soustraction=(a,b,res)=>res(a-b)

function normalizePort(val){
    var port = parseInt(val, 10)
    if(port>0){
        return port
    }else{
        return false
    }
}

exports.normalizePort=normalizePort
exports.calculeFct = calcule
exports.soustractionFct=soustraction