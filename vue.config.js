module.exports = {
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             prependData: `
    //                 @import "@/global-styles/designs-ystem.scss";
    //             `
    //         }
    //     }
    // }
    devServer: {
        proxy: 'http://umbrel.local/api/',
    }
}