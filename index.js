const { Client, Intents, Collection } = require("discord.js");
const { token } = require("./config.json");
require("dotenv").config();
const { join } = require("path");
const { setInterval } = require("timers");

const client = new Client({ intents: 32767 });

// Slashcommand Handler

client.commands = new Collection();
client.languages = require("i18n");

client.languages.configure({
  locales: ["en", "es", "po"],
  directory: join(__dirname, "locales"),
  defaultLocale: "es",
  retryInDefaultLocale: true,
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("WARN" + msg);
  },

  logError: function (msg) {
    console.log("WARN" + msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false,
  },
});

setInterval(() => {
  updateStatus();
}, 30000);

async function updateStatus() {
  const guildNum = await client.guilds.cache.size;

  await client.user.setActivity(`${guildNum} servidores`, { type: "PLAYING" });
}

require("./handlers/commands.js")(client);
require("./handlers/events.js")(client);

client.login(token);
