module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "codespace.berlin";
                args[0].description = "Hompage des codespace.berlin-Teams. Wir sind Ihr Partner für professionelle Software";
                args[0].keywords = "codespace, berlin, software, web, design, ux, ui, Konzeption, Entwicklung";
                args[0].url = "https://codespace.berlin";
                args[0].logo = '/Logo.png';
                args[0].image = '/Banner.jpg';
                args[0].team = "Sönke Tenckhoff, Maximilian Gäble";

                args[0].phone = "+49 (0) 176 55737492";
                args[0].mail = "team@codespace.berlin";
                args[0].street = "Irenenstraße 15";
                args[0].city = "Berlin";
                args[0].plz = "10317";
                return args;
            });
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/variables.sass"
                `
            }
        }
    }
};