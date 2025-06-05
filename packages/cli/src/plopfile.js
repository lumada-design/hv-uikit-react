const createDefault = {
  actions: [
    {
      type: "add",
      path: "{{path}}/public/locales/en/{{lowerCase name}}.json",
      templateFile: "plop-templates/locale.json.hbs",
    },
    {
      type: "add",
      path: "{{path}}/src/pages/{{name}}/index.tsx",
      templateFile: "plop-templates/component.tsx.hbs",
    },
  ],
};

const createRoute = {
  actions: [
    {
      type: "append",
      path: "{{path}}/src/routes.tsx",
      pattern: "// APP ROUTES",
      template: `{ path: "{{kebabCase name}}", lazy: () => import("./pages/{{name}}") },`,
    },
  ],
};

const createReadMe = {
  actions: [
    {
      type: "add",
      path: "{{path}}/README.md",
      templateFile: "plop-templates/README.md.hbs",
    },
  ],
};

const createAppShellIndexHtml = {
  actions: [
    {
      type: "add",
      path: "{{path}}/index.html",
      templateFile: "plop-templates/app-shell/index.html.hbs",
      force: true,
    },
  ],
};

const createAppShellConfig = {
  actions: [
    {
      type: "add",
      path: "{{path}}/app-shell.config.ts",
      templateFile: "plop-templates/app-shell/app-shell.config.ts.hbs",
    },
  ],
};

const createAppShellViteConfig = {
  actions: [
    {
      type: "add",
      path: "{{path}}/vite.config.ts",
      templateFile: "plop-templates/app-shell/vite.config.ts.hbs",
    },
  ],
};

export default (plop) => {
  plop.setHelper("precurly", (t) => `${t}`);
  plop.setGenerator("createDefault", createDefault);
  plop.setGenerator("createRoute", createRoute);
  plop.setGenerator("createReadMe", createReadMe);
  plop.setGenerator("createAppShellIndexHtml", createAppShellIndexHtml);
  plop.setGenerator("createAppShellConfig", createAppShellConfig);
  plop.setGenerator("createAppShellViteConfig", createAppShellViteConfig);
};
