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
  // devServer: {
  //     proxy: 'http://umbrel.local/',
  // }
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template =
        process.env.VUE_APP_SERVER === "testnet"
          ? "./public/index-testnet.html"
          : "./public/index.html";
      return args;
    });
  }
};
