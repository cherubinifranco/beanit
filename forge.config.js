module.exports = {
  packagerConfig: {
    icon: "icon",
    asar: true,
    build: {
      appId: "mas.tools.manager",
      win: {
        target: ["nsis"],
      },
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "MAS.Tools.Manager",
        setupIcon: "icon.ico",
        skipUpdateIcon: true,
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
