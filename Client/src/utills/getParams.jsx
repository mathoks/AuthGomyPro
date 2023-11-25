// export const getParams = (name, url = window.location.href)=>{
//     name = name.replace(/[\\[\]]/g, '\\$&')
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),results = regex.exec(url)
//     if(!results) return null
//     if (!results[2]) return  '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '))
// }

export const getParams = (name, url = window.location.href) => {
    name = name.replace(/[\\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) {
        return null;
    }

    const paramValue = results[2] || '';
    return decodeURIComponent(paramValue.replace(/\+/g, ' '));
};
