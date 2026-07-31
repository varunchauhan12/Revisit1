export function redirectSystemPath({path,initial} : {path : string , initial : boolean}) {
try {
    if( path.includes("directUrl= ")){
        return "/handle-share";

    }
    return path;

}catch {
    return "/";
}
}