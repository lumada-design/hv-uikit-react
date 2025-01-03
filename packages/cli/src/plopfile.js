const createDefault = {
  actions: [
    {
      type: "add",
      path: "{{path}}/public/locales/en/{{lowerCase name}}.json",
      templateFile: "plop-templates/locale.json.hbs",
    },
    {
      type: "add",
      path: "{{path}}/src/pages/{{name}}/{{name}}.tsx",
      templateFile: "plop-templates/component.tsx.hbs",
    },
  ],
};

const createRoute = {
  actions: [
    {
      type: "add",
      path: "{{path}}/src/lib/routes.tsx",
      templateFile: "plop-templates/routes.tsx.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{path}}/src/lib/routes.tsx",
      pattern: "/* INJECT_IMPORTS */",
      template: `const {{name}} = lazy(() => import("../pages/{{name}}"));`,
    },
    {
      type: "append",
      path: "{{path}}/src/lib/routes.tsx",
      pattern: "{/* INJECT_ROUTES */}",
      template: `    <Route path="/{{kebabCase name}}" element={<{{precurly name}} />} />`,
    },
  ],
};

const createNavigation = {
  actions: [
    {
      type: "add",
      path: "{{path}}/src/lib/navigation.ts",
      templateFile: "plop-templates/navigation.ts.hbs",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "{{path}}/src/lib/navigation.ts",
      pattern: "/* INJECT_NAVIGATION */",
      template: `  { id: "{{lowerCase name}}", label: "{{name}}", path: "/{{kebabCase name}}" },`,
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
  plop.setGenerator("createNavigation", createNavigation);
  plop.setGenerator("createReadMe", createReadMe);
  plop.setGenerator("createAppShellIndexHtml", createAppShellIndexHtml);
  plop.setGenerator("createAppShellConfig", createAppShellConfig);
  plop.setGenerator("createAppShellViteConfig", createAppShellViteConfig);
};
