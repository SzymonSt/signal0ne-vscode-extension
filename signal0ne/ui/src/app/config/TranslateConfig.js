"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateConfig = void 0;
const core_1 = require("@ngx-translate/core");
const http_1 = require("@angular/common/http");
const ApplicationConfig_1 = require("app/config/ApplicationConfig");
const rxjs_1 = require("rxjs");
// newer, webpack approach (compiled-in direct import (webpackMode: 'eager') or lazy import (webpackMode: 'lazy') + cache busting during production build by webpack)
const WebpackTranslateLoaderFactory = () => {
    class WebpackTranslateLoader {
        getTranslation(lang) {
            return (0, rxjs_1.from)(import(
            /* webpackChunkName: "[request]" */
            /* webpackMode: "eager" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            `../../assets/locale/${lang}.json`));
        }
    }
    return new WebpackTranslateLoader();
};
exports.TranslateConfig = {
    loader: {
        provide: core_1.TranslateLoader,
        useFactory: WebpackTranslateLoaderFactory,
        deps: [http_1.HttpClient]
    },
    defaultLanguage: ApplicationConfig_1.ApplicationConfig.defaultLanguage
};
//# sourceMappingURL=TranslateConfig.js.map