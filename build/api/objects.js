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
  creatObjects: () => creatObjects
});
module.exports = __toCommonJS(objects_exports);
class creatObjects {
  /**
   * ioBroker Objects
   *
   * @param iob ioBroker.Adapter
   */
  constructor(iob) {
    this.iob = iob;
    this.adapter = this.iob;
  }
  adapter;
  async createRaw(id, name) {
    let common;
    common = {
      name,
      desc: "Create by Adapter",
      icon: "img/mower.png"
    };
    await this.createDataPoint(`${this.adapter.namespace}.${id}`, common, "device", null, null, null);
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
    await this.createDataPoint(`${this.adapter.namespace}.${id}.mower`, common, "channel", null, null, null);
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
      `${this.adapter.namespace}.${id}.mower_map_info`,
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
      `${this.adapter.namespace}.${id}.mower_head_map_info`,
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
      `${this.adapter.namespace}.${id}.mower_backup_map_info`,
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
      `${this.adapter.namespace}.${id}.mower_work_record`,
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
    await this.createDataPoint(`${this.adapter.namespace}.${id}.mower.update`, common, "state", null, null, null);
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
      `${this.adapter.namespace}.${id}.mower.update_all`,
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
      `${this.adapter.namespace}.${id}.mower.update_raw`,
      common,
      "state",
      null,
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
    await this.createDataPoint(`${this.adapter.namespace}.${id}.mower_raw`, common, "channel", null, null, null);
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
      `${this.adapter.namespace}.${id}.mower_raw_info`,
      common,
      "channel",
      null,
      null,
      null
    );
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
    await this.createDataPoint(`${this.adapter.namespace}.auth`, common, "channel", null, null, null);
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
    await this.createDataPoint(`${this.adapter.namespace}.rateLimit`, common, "channel", null, null, null);
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
    await this.createDataPoint(`${this.adapter.namespace}.auth.session`, common, "state", null, null, null);
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
    await this.createDataPoint(`${this.adapter.namespace}.rateLimit.restart`, common, "state", null, null, null);
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
      const obj = await this.adapter.getObjectAsync(ident);
      if (!obj) {
        await this.adapter.setObjectNotExistsAsync(ident, {
          type: types,
          common,
          ...nativvalue
        }).catch((error) => {
          this.adapter.log.warn(`createDataPoint: ${error}`);
        });
      } else {
        let ischange = false;
        if (extend) {
          let countStates = 0;
          if (obj.common && common && common.states == null && obj.common.states != null) {
            countStates = 1;
          }
          this.adapter.log.debug(`countStates: ${countStates}`);
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
            this.adapter.log.debug(`INFORMATION - Extend common: ${this.adapter.namespace}.${ident}`);
            await this.adapter.extendObject(ident, {
              type: types,
              common,
              ...nativvalue
            });
          }
          if (value != null) {
            await this.adapter.setState(ident, value, true);
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
          this.adapter.log.debug(`INFORMATION - Change common: ${this.adapter.namespace}.${ident}`);
          delete obj.common;
          obj.common = common;
          obj.type = types;
          await this.adapter.setObject(ident, obj);
        }
      }
      if (value != null) {
        await this.adapter.setState(ident, value, true);
      }
    } catch (error) {
      if (typeof error === "string") {
        this.adapter.log.error(`createDataPoint: ${error}`);
      } else if (error instanceof Error) {
        this.adapter.log.error(`createDataPoint: ${error.name}: ${error.message}`);
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  creatObjects
});
//# sourceMappingURL=objects.js.map
