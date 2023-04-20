//import "./Snackbar.css"
export function sendSnackbar(msg:string){
    if (!document.getElementById("snackbarStyle") || !document.getElementById("snackbar")){
        let snackbarStyle:HTMLStyleElement = document.createElement("style");
        snackbarStyle.id = "snackbarStyle";
        snackbarStyle.innerText = "#snackbar{visibility:hidden;min-width:250px;margin-left:-125px;background-color:#333;color:#fff;text-align:center;border-radius:2px;padding:16px;position:fixed;z-index:1;left:50%;bottom:30px}#snackbar.show{visibility:visible;-webkit-animation:fadein .5s,fadeout .5s 2.5s;animation:fadein .5s,fadeout .5s 2.5s}@-webkit-keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@keyframes fadein{from{bottom:0;opacity:0}to{bottom:30px;opacity:1}}@-webkit-keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:0;opacity:0}}@keyframes fadeout{from{bottom:30px;opacity:1}to{bottom:0;opacity:0}}";
        document.head.append(snackbarStyle);
        let snackbar:HTMLDivElement = document.createElement("div");
        snackbar.id="snackbar";
        document.body.append(snackbar);
    }
    // @ts-ignore TS2741
    let snackbar:HTMLDivElement = document.getElementById("snackbar");
    snackbar.innerText = msg;
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}
