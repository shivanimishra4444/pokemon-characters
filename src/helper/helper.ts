export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getParamsFromURI = (uri) => {
    // Get everything after the `?`
    const [, paramString] = uri.split('?');
    // Return parameters
    return new URLSearchParams(paramString);
};