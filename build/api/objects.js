"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var objects_exports = {};
__export(objects_exports, {
  createObjects: () => createObjects
});
module.exports = __toCommonJS(objects_exports);
class createObjects {
  iob;
  /**
   * ioBroker Objects
   *
   * @param iob ioBroker.Adapter
   */
  constructor(iob) {
    this.iob = iob;
  }
  async createMowerObject(message) {
    let common;
    if (message.deviceSn == null || message.data == null) {
      this.iob.log.error(`Missing message data!!!`);
      return;
    }
    const sn = message.deviceSn;
    const data = message.data;
    if (data.camera_temp != null) {
      common = {
        type: "number",
        role: "value",
        name: {
          en: "Camera Temperature",
          de: "Kameratemperatur",
          ru: "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043A\u0430\u043C\u0435\u0440\u044B",
          pt: "Temperatura da c\xE2mera",
          nl: "Cameratemperatuur",
          fr: "Temp\xE9rature de la cam\xE9ra",
          it: "Temperatura della fotocamera",
          es: "Temperatura de la c\xE1mara",
          pl: "Temperatura kamery",
          uk: "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043A\u0430\u043C\u0435\u0440\u0438",
          "zh-cn": "\u76F8\u673A\u6E29\u5EA6"
        },
        desc: "Create by Adapter",
        read: true,
        write: false,
        def: 0,
        unit: "\xB0C"
      };
      await this.createDataPoint(
        `${this.iob.namespace}.${sn}.mower.camera_temp`,
        common,
        "state",
        data.camera_temp,
        null,
        null
      );
    }
    if (data.soc_temp != null) {
      common = {
        type: "number",
        role: "value",
        name: {
          en: "Motor Temperature",
          de: "Motortemperatur",
          ru: "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F",
          pt: "Temperatura do motor",
          nl: "Motortemperatuur",
          fr: "Temp\xE9rature du moteur",
          it: "Temperatura del motore",
          es: "Temperatura del motor",
          pl: "Temperatura silnika",
          uk: "\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u0434\u0432\u0438\u0433\u0443\u043D\u0430",
          "zh-cn": "\u7535\u673A\u6E29\u5EA6"
        },
        desc: "Create by Adapter",
        read: true,
        write: false,
        def: 0,
        unit: "\xB0C"
      };
      await this.createDataPoint(
        `${this.iob.namespace}.${sn}.mower.soc_temp`,
        common,
        "state",
        data.soc_temp,
        null,
        null
      );
    }
    if (data.wifi_sig != null) {
      common = {
        type: "number",
        role: "value",
        name: {
          en: "WIFI",
          de: "W-LAN",
          ru: "WI-FI",
          pt: "WI-FI",
          nl: "WIFI",
          fr: "Wi-Fi",
          it: "WIFI",
          es: "WIFI",
          pl: "Wi-Fi",
          uk: "Wi-Fi",
          "zh-cn": "\u65E0\u7EBF\u4E0A\u7F51"
        },
        desc: "Create by Adapter",
        read: true,
        write: false,
        def: 0,
        unit: "dBm"
      };
      await this.createDataPoint(
        `${this.iob.namespace}.${sn}.mower.wifi_sig`,
        common,
        "state",
        data.wifi_sig,
        null,
        null
      );
    }
    if (data.net_4g_sig != null) {
      common = {
        type: "number",
        role: "value",
        name: {
          en: "Network 4G Signature",
          de: "Netzwerk 4G-Signatur",
          ru: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u0441\u0435\u0442\u0438 4G",
          pt: "Assinatura de rede 4G",
          nl: "Netwerk 4G-signatuur",
          fr: "Signature du r\xE9seau 4G",
          it: "Firma di rete 4G",
          es: "Firma de red 4G",
          pl: "Sygnatura sieci 4G",
          uk: "\u041C\u0435\u0440\u0435\u0436\u0430 4G \u041F\u0456\u0434\u043F\u0438\u0441",
          "zh-cn": "\u7F51\u7EDC 4G \u7279\u5F81"
        },
        desc: "Create by Adapter",
        read: true,
        write: false,
        def: 0,
        unit: "dBm"
      };
      await this.createDataPoint(
        `${this.iob.namespace}.${sn}.mower.net_4g_sig`,
        common,
        "state",
        data.net_4g_sig,
        null,
        null
      );
    }
    if (data.robot_pos != null) {
      common = {
        type: "number",
        role: "value",
        name: {
          en: "Robot position angle",
          de: "Roboterpositionswinkel",
          ru: "\u0423\u0433\u043E\u043B \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0440\u043E\u0431\u043E\u0442\u0430",
          pt: "\xE2ngulo de posi\xE7\xE3o do rob\xF4",
          nl: "Robotpositiehoek",
          fr: "angle de position du robot",
          it: "angolo di posizione del robot",
          es: "\xC1ngulo de posici\xF3n del robot",
          pl: "K\u0105t po\u0142o\u017Cenia robota",
          uk: "\u041A\u0443\u0442 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043D\u044F \u0440\u043E\u0431\u043E\u0442\u0430",
          "zh-cn": "\u673A\u5668\u4EBA\u4F4D\u7F6E\u89D2"
        },
        desc: "Create by Adapter",
        read: true,
        write: false,
        def: 0
      };
      await this.createDataPoint(
        `${this.iob.namespace}.${sn}.mower.robot_pos_angle`,
        common,
        "state",
        data.robot_pos,
        null,
        null
      );
      await this.createDataPoint(
        `${this.iob.namespace}.${sn}.mower.net_4g_sig`,
        common,
        "state",
        data.net_4g_sig,
        null,
        null
      );
    }
  }
  async createMowerObjects(id, model) {
    let common;
    common = {
      type: "number",
      role: "value",
      name: {
        en: "Mower Status",
        de: "M\xE4herstatus",
        ru: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Status do cortador de grama",
        nl: "Maaierstatus",
        fr: "\xC9tat de la tondeuse",
        it: "Stato del tosaerba",
        es: "Estado de la cortadora de c\xE9sped",
        pl: "Status kosiarki",
        uk: "\u0421\u0442\u0430\u043D \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u72B6\u6001"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: 0,
      states: {
        0: `${model == "X" ? "unknown" : "standby"}`,
        1: `${model == "X" ? "idle" : "mowing"}`,
        2: `${model == "X" ? "working" : "going home"}`,
        3: `${model == "X" ? "pause" : "charging"}`,
        4: "unknown",
        5: "unknown",
        6: "error",
        7: `${model == "X" ? "return" : "mowing border"}`,
        8: "pause",
        9: "charging",
        10: "charging full",
        11: "unknown",
        12: "unknown",
        13: "offline",
        14: "continue cutting",
        15: "location",
        16: "firmware update",
        17: "stuck",
        18: "stop",
        19: "unknown",
        20: "enter pin"
      }
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower.status`, common, "state", null, null, null);
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mowing start",
        de: "M\xE4hen starten",
        ru: "\u041D\u0430\u0447\u0430\u043B\u043E \u043A\u043E\u0448\u0435\u043D\u0438\u044F",
        pt: "In\xEDcio da poda",
        nl: "Maaien begint",
        fr: "D\xE9but de la tonte",
        it: "Inizio falciatura",
        es: "Inicio del corte de c\xE9sped",
        pl: "Rozpocz\u0119cie koszenia",
        uk: "\u041F\u043E\u0447\u0430\u0442\u043E\u043A \u0441\u043A\u043E\u0448\u0443\u0432\u0430\u043D\u043D\u044F",
        "zh-cn": "\u5272\u8349\u5F00\u59CB"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower.start`, common, "state", null, null, null);
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mowing stop",
        de: "M\xE4hstopp",
        ru: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043A\u043E\u0448\u0435\u043D\u0438\u044F",
        pt: "Parada de corte de grama",
        nl: "Maaistop",
        fr: "Arr\xEAt de la tonte",
        it: "Arresto falciatura",
        es: "Parada de corte",
        pl: "Zatrzymanie koszenia",
        uk: "\u0417\u0443\u043F\u0438\u043D\u043A\u0430 \u0441\u043A\u043E\u0448\u0443\u0432\u0430\u043D\u043D\u044F",
        "zh-cn": "\u5272\u8349\u673A\u505C\u6B62"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower.stop`, common, "state", null, null, null);
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mowing pause",
        de: "M\xE4hpause",
        ru: "\u041F\u0430\u0443\u0437\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u043A\u043E\u0448\u0435\u043D\u0438\u044F",
        pt: "Pausa para cortar a grama",
        nl: "Maaipauze",
        fr: "Pause tonte",
        it: "Pausa di falciatura",
        es: "Pausa para cortar el c\xE9sped",
        pl: "Przerwa w koszeniu",
        uk: "\u041F\u0430\u0443\u0437\u0430 \u043F\u0456\u0434 \u0447\u0430\u0441 \u0441\u043A\u043E\u0448\u0443\u0432\u0430\u043D\u043D\u044F",
        "zh-cn": "\u5272\u8349\u6682\u505C"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower.pause`, common, "state", null, null, null);
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Start find charger",
        de: "Ladestation suchen",
        ru: "\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u043E\u0438\u0441\u043A \u0437\u0430\u0440\u044F\u0434\u043D\u043E\u0433\u043E \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Comece a procurar o carregador",
        nl: "Begin met het zoeken naar een oplader.",
        fr: "Trouver un chargeur",
        it: "Inizia a cercare il caricabatterie",
        es: "Comience a buscar el cargador",
        pl: "Rozpocznij wyszukiwanie \u0142adowarki",
        uk: "\u041F\u043E\u0447\u0430\u0442\u043E\u043A \u043F\u043E\u0448\u0443\u043A\u0443 \u0437\u0430\u0440\u044F\u0434\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u5F00\u59CB\u5BFB\u627E\u5145\u7535\u5668"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower.pause`, common, "state", null, null, null);
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mower Status",
        de: "M\xE4herstatus",
        ru: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Status do cortador de grama",
        nl: "Maaierstatus",
        fr: "\xC9tat de la tondeuse",
        it: "Stato del tosaerba",
        es: "Estado de la cortadora de c\xE9sped",
        pl: "Status kosiarki",
        uk: "\u0421\u0442\u0430\u043D \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u72B6\u6001"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower.start`, common, "state", null, null, null);
  }
  async createRaw(id, name, model) {
    let common;
    common = {
      name,
      desc: "Create by Adapter",
      icon: "img/mower.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}`, common, "device", null, null, null);
    common = {
      name: {
        en: "Mower",
        de: "M\xE4her",
        ru: "\u0413\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0430",
        pt: "Cortador de grama",
        nl: "Maaier",
        fr: "Tondeuse",
        it: "Tosaerba",
        es: "Cortac\xE9sped",
        pl: "Kosiarka",
        uk: "\u041A\u043E\u0441\u0430\u0440\u043A\u0430",
        "zh-cn": "\u5272\u8349\u673A"
      },
      desc: "Create by Adapter",
      icon: "img/mower.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower`, common, "channel", null, null, null);
    common = {
      name: {
        en: "Mower",
        de: "M\xE4her",
        ru: "\u0413\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0430",
        pt: "Cortador de grama",
        nl: "Maaier",
        fr: "Tondeuse",
        it: "Tosaerba",
        es: "Cortac\xE9sped",
        pl: "Kosiarka",
        uk: "\u041A\u043E\u0441\u0430\u0440\u043A\u0430",
        "zh-cn": "\u5272\u8349\u673A"
      },
      desc: "Create by Adapter",
      icon: "img/mower.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower_testing`, common, "channel", null, null, null);
    common = {
      name: {
        en: "Mower all raw data",
        de: "M\xE4her \u2013 alle Rohdaten",
        ru: "\u0412\u0441\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Cortador de grama, todos os dados brutos",
        nl: "Maai alle onbewerkte gegevens",
        fr: "Tondeuse toutes les donn\xE9es brutes",
        it: "Taglia tutti i dati grezzi",
        es: "Cortac\xE9sped todos los datos brutos",
        pl: "Kosi wszystkie surowe dane",
        uk: "\u0412\u0441\u0456 \u043D\u0435\u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0456 \u0434\u0430\u043D\u0456 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u6240\u6709\u539F\u59CB\u6570\u636E"
      },
      desc: "Create by Adapter",
      icon: "img/raw.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower_all_raw`, common, "channel", null, null, null);
    if (model == "V") {
      common = {
        name: {
          en: "Mower scheduler",
          de: "M\xE4hplaner",
          ru: "\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0449\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
          pt: "Agendador de cortador de grama",
          nl: "Maaierplanner",
          fr: "programmateur de tondeuse",
          it: "Programmatore di taglio",
          es: "Programador de cortac\xE9sped",
          pl: "Harmonogram kosiarki",
          uk: "\u041F\u043B\u0430\u043D\u0443\u0432\u0430\u043B\u044C\u043D\u0438\u043A \u043A\u043E\u0441\u0430\u0440\u043E\u043A",
          "zh-cn": "\u5272\u8349\u673A\u8C03\u5EA6\u5668"
        },
        desc: "Create by Adapter",
        icon: "img/schedule.png"
      };
      await this.createDataPoint(
        `${this.iob.namespace}.${id}.mower_all_raw.mower_schedule`,
        common,
        "channel",
        null,
        null,
        null
      );
    }
    common = {
      name: {
        en: "Mower map info",
        de: "Informationen zur M\xE4herkarte",
        ru: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043A\u0430\u0440\u0442\u0435 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Informa\xE7\xF5es do mapa do cortador de grama",
        nl: "Informatie over de maaierkaart",
        fr: "Informations sur la carte de la tondeuse",
        it: "Informazioni sulla mappa del tosaerba",
        es: "Informaci\xF3n del mapa de cortac\xE9spedes",
        pl: "Informacje o mapie kosiarki",
        uk: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u043A\u0430\u0440\u0442\u0443 \u043A\u043E\u0441\u0430\u0440\u043E\u043A",
        "zh-cn": "\u5272\u8349\u673A\u5730\u56FE\u4FE1\u606F"
      },
      desc: "Create by Adapter",
      icon: "img/map.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_map_info`,
      common,
      "channel",
      null,
      null,
      null
    );
    common = {
      name: {
        en: "Mower head map info",
        de: "Informationen zur M\xE4hkopfkarte",
        ru: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043A\u0430\u0440\u0442\u0435 \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0440\u0435\u0436\u0443\u0449\u0438\u0445 \u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Informa\xE7\xF5es do mapa da cabe\xE7a de corte",
        nl: "Informatie over de maaikopkaart",
        fr: "Informations sur la carte de la t\xEAte de coupe",
        it: "Informazioni sulla mappa della testina di taglio",
        es: "Informaci\xF3n del mapa del cabezal de corte",
        pl: "Informacje o mapie g\u0142owicy kosiarki",
        uk: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u043A\u0430\u0440\u0442\u0443 \u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u5934\u5730\u56FE\u4FE1\u606F"
      },
      desc: "Create by Adapter",
      icon: "img/map.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_head_map_info`,
      common,
      "channel",
      null,
      null,
      null
    );
    common = {
      name: {
        en: "Mower map backup",
        de: "M\xE4herkartensicherung",
        ru: "\u0440\u0435\u0437\u0435\u0440\u0432\u043D\u0430\u044F \u043A\u043E\u043F\u0438\u044F \u043A\u0430\u0440\u0442\u044B \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Backup do mapa do cortador de grama",
        nl: "Back-up van de maaikaart",
        fr: "Sauvegarde de la carte de la tondeuse",
        it: "backup della mappa del tosaerba",
        es: "Copia de seguridad del mapa de la cortadora de c\xE9sped",
        pl: "Kopia zapasowa mapy kosiarki",
        uk: "\u0420\u0435\u0437\u0435\u0440\u0432\u043D\u0435 \u043A\u043E\u043F\u0456\u044E\u0432\u0430\u043D\u043D\u044F \u043A\u0430\u0440\u0442\u0438 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u5730\u56FE\u5907\u4EFD"
      },
      desc: "Create by Adapter",
      icon: "img/map.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_backup_map_info`,
      common,
      "channel",
      null,
      null,
      null
    );
    common = {
      name: {
        en: "Device work record",
        de: "Ger\xE4te-Arbeitsprotokoll",
        ru: "\u0417\u0430\u043F\u0438\u0441\u044C \u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Registro de funcionamento do dispositivo",
        nl: "Apparaat werkregistratie",
        fr: "Enregistrement du fonctionnement de l'appareil",
        it: "registro delle attivit\xE0 del dispositivo",
        es: "Registro de funcionamiento del dispositivo",
        pl: "Rejestr pracy urz\u0105dzenia",
        uk: "\u0416\u0443\u0440\u043D\u0430\u043B \u0440\u043E\u0431\u043E\u0442\u0438 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u8BBE\u5907\u5DE5\u4F5C\u8BB0\u5F55"
      },
      desc: "Create by Adapter",
      icon: "img/work.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_work_record`,
      common,
      "channel",
      null,
      null,
      null
    );
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mower update",
        de: "M\xE4her-Update",
        ru: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Atualiza\xE7\xE3o do cortador de grama",
        nl: "Update over de grasmaaier",
        fr: "Mise \xE0 jour de la tondeuse",
        it: "Aggiornamento del tosaerba",
        es: "Actualizaci\xF3n de la cortadora de c\xE9sped",
        pl: "Aktualizacja kosiarki",
        uk: "\u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u66F4\u65B0"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_testing.update`,
      common,
      "state",
      null,
      null,
      null
    );
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "All device properties",
        de: "Alle Ger\xE4teeigenschaften",
        ru: "\u0412\u0441\u0435 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430",
        pt: "Todas as propriedades do dispositivo",
        nl: "Alle apparaateigenschappen",
        fr: "Toutes les propri\xE9t\xE9s de l'appareil",
        it: "Tutte le propriet\xE0 del dispositivo",
        es: "Todas las propiedades del dispositivo",
        pl: "Wszystkie w\u0142a\u015Bciwo\u015Bci urz\u0105dzenia",
        uk: "\u0423\u0441\u0456 \u0432\u043B\u0430\u0441\u0442\u0438\u0432\u043E\u0441\u0442\u0456 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u044E",
        "zh-cn": "\u6240\u6709\u8BBE\u5907\u5C5E\u6027"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_testing.all_properties`,
      common,
      "state",
      null,
      null,
      null
    );
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Get Region ID",
        de: "Regions-ID abrufen",
        ru: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0440\u0435\u0433\u0438\u043E\u043D\u0430",
        pt: "Obter ID da regi\xE3o",
        nl: "Regio-ID ophalen",
        fr: "Obtenir l'identifiant de r\xE9gion",
        it: "Ottieni l'ID della regione",
        es: "Obtener ID de regi\xF3n",
        pl: "Uzyskaj identyfikator regionu",
        uk: "\u041E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0456\u0434\u0435\u043D\u0442\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440 \u0440\u0435\u0433\u0456\u043E\u043D\u0443",
        "zh-cn": "\u83B7\u53D6\u533A\u57DF ID"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_testing.getRegionId`,
      common,
      "state",
      null,
      null,
      null
    );
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mower update all data",
        de: "M\xE4her aktualisiert alle Daten",
        ru: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Atualiza\xE7\xE3o de todos os dados do cortador de grama",
        nl: "Alle gegevens van de grasmaaier bijwerken",
        fr: "Mise \xE0 jour de toutes les donn\xE9es de la tondeuse",
        it: "Aggiornamento del tosaerba: tutti i dati",
        es: "Actualizar todos los datos de la cortadora de c\xE9sped",
        pl: "Kosiarka aktualizuje wszystkie dane",
        uk: "\u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432\u0441\u0456\u0445 \u0434\u0430\u043D\u0438\u0445 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u66F4\u65B0\u6240\u6709\u6570\u636E"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_testing.update_all`,
      common,
      "state",
      null,
      null,
      null
    );
    common = {
      type: "boolean",
      role: "button",
      name: {
        en: "Mower raw data update",
        de: "Aktualisierung der Rohdaten des M\xE4hers",
        ru: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Atualiza\xE7\xE3o de dados brutos do cortador de grama",
        nl: "Update van de ruwe gegevens van de maaier",
        fr: "Mise \xE0 jour des donn\xE9es brutes de la tondeuse",
        it: "Aggiornamento dei dati grezzi del tosaerba",
        es: "Actualizaci\xF3n de datos brutos de la cortadora de c\xE9sped",
        pl: "Aktualizacja surowych danych kosiarki",
        uk: "\u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043D\u0435\u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0438\u0445 \u0434\u0430\u043D\u0438\u0445 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u539F\u59CB\u6570\u636E\u66F4\u65B0"
      },
      desc: "Create by Adapter",
      read: false,
      write: true
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_testing.update_raw`,
      common,
      "state",
      null,
      null,
      null
    );
    common = {
      type: "string",
      role: "state",
      name: {
        en: "Get Request",
        de: "Anfrage abrufen",
        ru: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441",
        pt: "Solicita\xE7\xE3o de recebimento",
        nl: "Verzoek ophalen",
        fr: "Demande de r\xE9cup\xE9ration",
        it: "Ottieni richiesta",
        es: "Obtener solicitud",
        pl: "Pobierz \u017C\u0105danie",
        uk: "\u041E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0437\u0430\u043F\u0438\u0442",
        "zh-cn": "\u83B7\u53D6\u8BF7\u6C42"
      },
      desc: "Create by Adapter",
      read: true,
      write: true,
      def: ""
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_testing.getOwnRequest`,
      common,
      "state",
      "",
      null,
      null
    );
    common = {
      name: {
        en: "Mower raw data",
        de: "Rohdaten des M\xE4hers",
        ru: "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Dados brutos do cortador de grama",
        nl: "Ruwe gegevens van de maaier",
        fr: "donn\xE9es brutes de la tondeuse",
        it: "Dati grezzi del tosaerba",
        es: "Datos brutos de la segadora",
        pl: "Surowe dane kosiarki",
        uk: "\u041D\u0435\u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0456 \u0434\u0430\u043D\u0456 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u539F\u59CB\u6570\u636E"
      },
      desc: "Create by Adapter",
      icon: "img/raw.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_raw`,
      common,
      "channel",
      null,
      null,
      null
    );
    common = {
      name: {
        en: "Mower info raw data",
        de: "Rohdaten zu Rasenm\xE4herinformationen",
        ru: "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0435",
        pt: "Dados brutos de informa\xE7\xF5es do cortador de grama",
        nl: "Grasmaaierinfo ruwe data",
        fr: "donn\xE9es brutes des informations sur la tondeuse",
        it: "Dati grezzi relativi alle informazioni sul tosaerba",
        es: "Datos brutos de informaci\xF3n de la cortadora de c\xE9sped",
        pl: "Surowe dane dotycz\u0105ce kosiarki",
        uk: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u043A\u043E\u0441\u0430\u0440\u043A\u0443, \u043D\u0435\u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0456 \u0434\u0430\u043D\u0456",
        "zh-cn": "\u5272\u8349\u673A\u4FE1\u606F\u539F\u59CB\u6570\u636E"
      },
      desc: "Create by Adapter",
      icon: "img/raw.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_raw_info`,
      common,
      "channel",
      null,
      null,
      null
    );
    common = {
      name: {
        en: "Mower properties",
        de: "Eigenschaften des Rasenm\xE4hers",
        ru: "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u0430 \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0438",
        pt: "Propriedades do cortador de grama",
        nl: "Eigenschappen van de maaier",
        fr: "Propri\xE9t\xE9s de la tondeuse",
        it: "Propriet\xE0 del tosaerba",
        es: "Propiedades de cortac\xE9sped",
        pl: "W\u0142a\u015Bciwo\u015Bci kosiarki",
        uk: "\u0412\u043B\u0430\u0441\u0442\u0438\u0432\u043E\u0441\u0442\u0456 \u043A\u043E\u0441\u0430\u0440\u043A\u0438",
        "zh-cn": "\u5272\u8349\u673A\u7279\u6027"
      },
      desc: "Create by Adapter",
      icon: "img/properties.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.${id}.mower_properties`, common, "channel", null, null, null);
    common = {
      name: {
        en: "Mower info raw data",
        de: "Rohdaten zu Rasenm\xE4herinformationen",
        ru: "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0433\u0430\u0437\u043E\u043D\u043E\u043A\u043E\u0441\u0438\u043B\u043A\u0435",
        pt: "Dados brutos de informa\xE7\xF5es do cortador de grama",
        nl: "Grasmaaierinfo ruwe data",
        fr: "donn\xE9es brutes des informations sur la tondeuse",
        it: "Dati grezzi relativi alle informazioni sul tosaerba",
        es: "Datos brutos de informaci\xF3n de la cortadora de c\xE9sped",
        pl: "Surowe dane dotycz\u0105ce kosiarki",
        uk: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u043A\u043E\u0441\u0430\u0440\u043A\u0443, \u043D\u0435\u043E\u0431\u0440\u043E\u0431\u043B\u0435\u043D\u0456 \u0434\u0430\u043D\u0456",
        "zh-cn": "\u5272\u8349\u673A\u4FE1\u606F\u539F\u59CB\u6570\u636E"
      },
      desc: "Create by Adapter",
      icon: "img/raw.png"
    };
    await this.createDataPoint(
      `${this.iob.namespace}.${id}.mower_all_raw.mower_raw_info_sn`,
      common,
      "channel",
      null,
      null,
      null
    );
  }
  async createMqtt() {
    let common;
    common = {
      name: {
        en: "MQTT Connection",
        de: "MQTT-Verbindung",
        ru: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 MQTT",
        pt: "Conex\xE3o MQTT",
        nl: "MQTT-verbinding",
        fr: "Connexion MQTT",
        it: "Connessione MQTT",
        es: "Conexi\xF3n MQTT",
        pl: "Po\u0142\u0105czenie MQTT",
        uk: "\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F MQTT",
        "zh-cn": "MQTT \u8FDE\u63A5"
      },
      desc: "Create by Adapter",
      icon: "img/mqtt.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt`, common, "channel", null, null, null);
    common = {
      type: "boolean",
      role: "switch",
      name: {
        en: "MQTT status for V devices",
        de: "MQTT-Status f\xFCr V-Ger\xE4te",
        ru: "\u0421\u0442\u0430\u0442\u0443\u0441 MQTT \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 V",
        pt: "Status MQTT para dispositivos V",
        nl: "MQTT-status voor V-apparaten",
        fr: "\xC9tat MQTT pour les appareils V",
        it: "Stato MQTT per i dispositivi V",
        es: "Estado MQTT para dispositivos V",
        pl: "Status MQTT dla urz\u0105dze\u0144 V",
        uk: "\u0421\u0442\u0430\u043D MQTT \u0434\u043B\u044F V-\u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432",
        "zh-cn": "V \u8BBE\u5907\u7684 MQTT \u72B6\u6001"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: false
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt.v_connection`, common, "state", false, null, null);
    common = {
      type: "string",
      role: "json",
      name: {
        en: "MQTT access data for V devices",
        de: "MQTT-Zugriffsdaten f\xFCr V-Ger\xE4te",
        ru: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 MQTT \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 V",
        pt: "Dados de acesso MQTT para dispositivos V",
        nl: "MQTT-toegangsgegevens voor V-apparaten",
        fr: "Donn\xE9es d'acc\xE8s MQTT pour les appareils V",
        it: "Dati di accesso MQTT per dispositivi V",
        es: "Datos de acceso MQTT para dispositivos V",
        pl: "Dane dost\u0119powe MQTT dla urz\u0105dze\u0144 V",
        uk: "\u0414\u0430\u043D\u0456 \u0434\u043E\u0441\u0442\u0443\u043F\u0443 MQTT \u0434\u043B\u044F \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432 V",
        "zh-cn": "V \u8BBE\u5907\u7684 MQTT \u8BBF\u95EE\u6570\u636E"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: JSON.stringify({})
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt.v_access_data`, common, "state", null, null, null);
    common = {
      type: "number",
      role: "value.time",
      name: {
        en: "Last updated for V devices",
        de: "Zuletzt aktualisiert f\xFCr V-Ger\xE4te",
        ru: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 V.",
        pt: "\xDAltima atualiza\xE7\xE3o para dispositivos V",
        nl: "Laatst bijgewerkt voor V-apparaten",
        fr: "Derni\xE8re mise \xE0 jour pour les appareils V",
        it: "Ultimo aggiornamento per dispositivi V",
        es: "\xDAltima actualizaci\xF3n para dispositivos V",
        pl: "Ostatnia aktualizacja dla urz\u0105dze\u0144 V",
        uk: "\u041E\u0441\u0442\u0430\u043D\u043D\u0454 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0434\u043B\u044F \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432 V",
        "zh-cn": "\u6700\u540E\u66F4\u65B0\u4E8E V \u8BBE\u5907"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: 0
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt.v_last_update`, common, "state", 0, null, null);
    common = {
      type: "boolean",
      role: "switch",
      name: {
        en: "MQTT status for X devices",
        de: "MQTT-Status f\xFCr X Ger\xE4te",
        ru: "\u0421\u0442\u0430\u0442\u0443\u0441 MQTT \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 X",
        pt: "Status MQTT para dispositivos X",
        nl: "MQTT-status voor X-apparaten",
        fr: "\xC9tat MQTT pour les appareils X",
        it: "Stato MQTT per i dispositivi X",
        es: "Estado MQTT para dispositivos X",
        pl: "Status MQTT dla urz\u0105dze\u0144 X",
        uk: "\u0421\u0442\u0430\u043D MQTT \u0434\u043B\u044F \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432 X",
        "zh-cn": "X \u8BBE\u5907\u7684 MQTT \u72B6\u6001"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: false
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt.x_connection`, common, "state", false, null, null);
    common = {
      type: "string",
      role: "json",
      name: {
        en: "MQTT access data for X devices",
        de: "MQTT-Zugriffsdaten f\xFCr X Ger\xE4te",
        ru: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0434\u0430\u043D\u043D\u044B\u043C MQTT \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 X",
        pt: "Dados de acesso MQTT para dispositivos X",
        nl: "MQTT-toegangsgegevens voor X-apparaten",
        fr: "Donn\xE9es d'acc\xE8s MQTT pour les appareils X",
        it: "Dati di accesso MQTT per dispositivi X",
        es: "Datos de acceso MQTT para dispositivos X",
        pl: "Dane dost\u0119powe MQTT dla urz\u0105dze\u0144 X",
        uk: "\u0414\u0430\u043D\u0456 \u0434\u043E\u0441\u0442\u0443\u043F\u0443 MQTT \u0434\u043B\u044F \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432 X",
        "zh-cn": "X \u8BBE\u5907\u7684 MQTT \u8BBF\u95EE\u6570\u636E"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: JSON.stringify({})
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt.x_access_data`, common, "state", null, null, null);
    common = {
      type: "number",
      role: "value.time",
      name: {
        en: "Last updated for X devices",
        de: "Zuletzt aktualisiert f\xFCr X-Ger\xE4te",
        ru: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 X",
        pt: "\xDAltima atualiza\xE7\xE3o para dispositivos X",
        nl: "Laatst bijgewerkt voor X-apparaten",
        fr: "Derni\xE8re mise \xE0 jour pour les appareils X",
        it: "Ultimo aggiornamento per dispositivi X",
        es: "\xDAltima actualizaci\xF3n para dispositivos X",
        pl: "Ostatnia aktualizacja dla urz\u0105dze\u0144 X",
        uk: "\u041E\u0441\u0442\u0430\u043D\u043D\u0454 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0434\u043B\u044F \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457\u0432 X",
        "zh-cn": "\u6700\u540E\u66F4\u65B0\u4E8E X \u8BBE\u5907"
      },
      desc: "Create by Adapter",
      read: true,
      write: false,
      def: 0
    };
    await this.createDataPoint(`${this.iob.namespace}.mqtt.x_last_update`, common, "state", 0, null, null);
  }
  async createAuth() {
    let common;
    common = {
      name: {
        en: "Auth Information",
        de: "Authentifizierungsinformationen",
        ru: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438",
        pt: "Informa\xE7\xF5es de autoriza\xE7\xE3o",
        nl: "Autorisatie-informatie",
        fr: "Informations d'autorisation",
        it: "Informazioni di autorizzazione",
        es: "Informaci\xF3n de autorizaci\xF3n",
        pl: "Informacje o uwierzytelnianiu",
        uk: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u0457",
        "zh-cn": "\u6388\u6743\u4FE1\u606F"
      },
      desc: "Create by Adapter",
      icon: "img/auth.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.auth`, common, "channel", null, null, null);
    common = {
      name: {
        en: "Rate Limit",
        de: "Ratenbegrenzung",
        ru: "\u041B\u0438\u043C\u0438\u0442 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438",
        pt: "Limite de taxa",
        nl: "Snelheidslimiet",
        fr: "Limite de d\xE9bit",
        it: "Limite di tariffa",
        es: "L\xEDmite de tasa",
        pl: "Limit szybko\u015Bci",
        uk: "\u041B\u0456\u043C\u0456\u0442 \u0448\u0432\u0438\u0434\u043A\u043E\u0441\u0442\u0456",
        "zh-cn": "\u901F\u7387\u9650\u5236"
      },
      desc: "Create by Adapter",
      icon: "img/rate.png"
    };
    await this.createDataPoint(`${this.iob.namespace}.rateLimit`, common, "channel", null, null, null);
    common = {
      type: "string",
      role: "json",
      name: {
        en: "Session",
        de: "Sitzung",
        ru: "\u0421\u0435\u0441\u0441\u0438\u044F",
        pt: "Sess\xE3o",
        nl: "Sessie",
        fr: "Session",
        it: "Sessione",
        es: "Sesi\xF3n",
        pl: "Sesja",
        uk: "\u0421\u0435\u0441\u0456\u044F",
        "zh-cn": "\u4F1A\u8BAE"
      },
      desc: "Create by Adapter",
      read: true,
      write: true,
      def: JSON.stringify({})
    };
    await this.createDataPoint(`${this.iob.namespace}.auth.session`, common, "state", null, null, null);
    common = {
      type: "string",
      role: "json",
      name: {
        en: "Restart Limit",
        de: "Neustartlimit",
        ru: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430",
        pt: "Limite de reinicializa\xE7\xE3o",
        nl: "Herstartlimiet",
        fr: "Limite de red\xE9marrage",
        it: "Limite di riavvio",
        es: "L\xEDmite de reinicio",
        pl: "Limit ponownego uruchomienia",
        uk: "\u041B\u0456\u043C\u0456\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0443",
        "zh-cn": "\u91CD\u542F\u9650\u5236"
      },
      desc: "Create by Adapter",
      read: true,
      write: true,
      def: JSON.stringify({
        restartCount: 0,
        restartLast: 0,
        restartTime: "",
        day: ""
      })
    };
    await this.createDataPoint(`${this.iob.namespace}.rateLimit.restart`, common, "state", null, null, null);
  }
  /**
   * @param ident Object
   * @param common Common States
   * @param types Object Type
   * @param value Set Value
   * @param extend Use extend or setObject
   * @param native Object Nativ
   */
  async createDataPoint(ident, common, types, value, extend, native) {
    try {
      const nativvalue = !native ? { native: {} } : { native };
      const obj = await this.iob.getObjectAsync(ident);
      if (!obj) {
        await this.iob.setObjectNotExistsAsync(ident, {
          type: types,
          common,
          ...nativvalue
        }).catch((error) => {
          this.iob.log.warn(`createDataPoint: ${error}`);
        });
      } else {
        let ischange = false;
        if (extend) {
          let countStates = 0;
          if (obj.common && common && common.states == null && obj.common.states != null) {
            countStates = 1;
          }
          this.iob.log.debug(`countStates: ${countStates}`);
          if (Object.keys(common).length > Object.keys(obj.common || {}).length - countStates) {
            ischange = true;
          } else {
            for (const key in common) {
              if (JSON.stringify(obj.common[key]) !== JSON.stringify(common[key])) {
                ischange = true;
                break;
              }
            }
          }
          if (JSON.stringify(obj.type) !== JSON.stringify(types)) {
            ischange = true;
          }
          if (ischange) {
            this.iob.log.debug(`INFORMATION - Extend common: ${this.iob.namespace}.${ident}`);
            await this.iob.extendObject(ident, {
              type: types,
              common,
              ...nativvalue
            });
          }
          if (value != null) {
            await this.iob.setState(ident, value, true);
          }
          return;
        }
        if (Object.keys(common).length > Object.keys(obj.common).length) {
          ischange = true;
        } else {
          for (const key in common) {
            if (obj.common[key] == null) {
              ischange = true;
              break;
            } else if (JSON.stringify(obj.common[key]) != JSON.stringify(common[key])) {
              ischange = true;
              break;
            }
          }
        }
        if (JSON.stringify(obj.type) != JSON.stringify(types)) {
          ischange = true;
        }
        if (native) {
          if (Object.keys(obj.native).length == Object.keys(nativvalue.native).length) {
            for (const key in obj.native) {
              if (nativvalue.native[key] == null) {
                ischange = true;
                delete obj.native;
                obj.native = native;
                break;
              } else if (JSON.stringify(obj.native[key]) != JSON.stringify(nativvalue.native[key])) {
                ischange = true;
                obj.native[key] = nativvalue.native[key];
                break;
              }
            }
          } else {
            ischange = true;
          }
        }
        if (ischange) {
          this.iob.log.debug(`INFORMATION - Change common: ${this.iob.namespace}.${ident}`);
          delete obj.common;
          obj.common = common;
          obj.type = types;
          await this.iob.setObject(ident, obj);
        }
      }
      if (value != null) {
        await this.iob.setState(ident, value, true);
      }
    } catch (error) {
      if (typeof error === "string") {
        this.iob.log.error(`createDataPoint: ${error}`);
      } else if (error instanceof Error) {
        this.iob.log.error(`createDataPoint: ${error.name}: ${error.message}`);
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createObjects
});
//# sourceMappingURL=objects.js.map
