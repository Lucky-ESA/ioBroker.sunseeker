import type { CommonStates, Objects } from "../types/objects";

export class creatObjects implements Objects {
    private adapter: ioBroker.Adapter;
    /**
     * ioBroker Objects
     *
     * @param iob ioBroker.Adapter
     */
    constructor(private readonly iob: ioBroker.Adapter) {
        this.adapter = this.iob;
    }
    public async createRaw(id: string, name: string, model: string): Promise<any> {
        let common: CommonStates;
        common = {
            name: name,
            desc: "Create by Adapter",
            icon: "img/mower.png",
        };
        await this.createDataPoint(`${this.adapter.namespace}.${id}`, common, "device", null, null, null);
        common = {
            name: {
                en: "Mower",
                de: "Mäher",
                ru: "Газонокосилка",
                pt: "Cortador de grama",
                nl: "Maaier",
                fr: "Tondeuse",
                it: "Tosaerba",
                es: "Cortacésped",
                pl: "Kosiarka",
                uk: "Косарка",
                "zh-cn": "割草机",
            },
            desc: "Create by Adapter",
            icon: "img/mower.png",
        };
        await this.createDataPoint(`${this.adapter.namespace}.${id}.mower`, common, "channel", null, null, null);
        common = {
            name: {
                en: "Mower all raw data",
                de: "Mäher – alle Rohdaten",
                ru: "Все исходные данные газонокосилки",
                pt: "Cortador de grama, todos os dados brutos",
                nl: "Maai alle onbewerkte gegevens",
                fr: "Tondeuse toutes les données brutes",
                it: "Taglia tutti i dati grezzi",
                es: "Cortacésped todos los datos brutos",
                pl: "Kosi wszystkie surowe dane",
                uk: "Всі необроблені дані косарки",
                "zh-cn": "割草机所有原始数据",
            },
            desc: "Create by Adapter",
            icon: "img/raw.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw`,
            common,
            "channel",
            null,
            null,
            null,
        );
        if (model == "V") {
            common = {
                name: {
                    en: "Mower scheduler",
                    de: "Mähplaner",
                    ru: "Планировщик работы газонокосилки",
                    pt: "Agendador de cortador de grama",
                    nl: "Maaierplanner",
                    fr: "programmateur de tondeuse",
                    it: "Programmatore di taglio",
                    es: "Programador de cortacésped",
                    pl: "Harmonogram kosiarki",
                    uk: "Планувальник косарок",
                    "zh-cn": "割草机调度器",
                },
                desc: "Create by Adapter",
                icon: "img/schedule.png",
            };
            await this.createDataPoint(
                `${this.adapter.namespace}.${id}.mower_all_raw.mower_schedule`,
                common,
                "channel",
                null,
                null,
                null,
            );
        }
        common = {
            name: {
                en: "Mower map info",
                de: "Informationen zur Mäherkarte",
                ru: "Информация о карте газонокосилки",
                pt: "Informações do mapa do cortador de grama",
                nl: "Informatie over de maaierkaart",
                fr: "Informations sur la carte de la tondeuse",
                it: "Informazioni sulla mappa del tosaerba",
                es: "Información del mapa de cortacéspedes",
                pl: "Informacje o mapie kosiarki",
                uk: "Інформація про карту косарок",
                "zh-cn": "割草机地图信息",
            },
            desc: "Create by Adapter",
            icon: "img/map.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw.mower_map_info`,
            common,
            "channel",
            null,
            null,
            null,
        );
        common = {
            name: {
                en: "Mower head map info",
                de: "Informationen zur Mähkopfkarte",
                ru: "Информация о карте расположения режущих головок косилки",
                pt: "Informações do mapa da cabeça de corte",
                nl: "Informatie over de maaikopkaart",
                fr: "Informations sur la carte de la tête de coupe",
                it: "Informazioni sulla mappa della testina di taglio",
                es: "Información del mapa del cabezal de corte",
                pl: "Informacje o mapie głowicy kosiarki",
                uk: "Інформація про карту головки косарки",
                "zh-cn": "割草机头地图信息",
            },
            desc: "Create by Adapter",
            icon: "img/map.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw.mower_head_map_info`,
            common,
            "channel",
            null,
            null,
            null,
        );
        common = {
            name: {
                en: "Mower map backup",
                de: "Mäherkartensicherung",
                ru: "резервная копия карты газонокосилки",
                pt: "Backup do mapa do cortador de grama",
                nl: "Back-up van de maaikaart",
                fr: "Sauvegarde de la carte de la tondeuse",
                it: "backup della mappa del tosaerba",
                es: "Copia de seguridad del mapa de la cortadora de césped",
                pl: "Kopia zapasowa mapy kosiarki",
                uk: "Резервне копіювання карти косарки",
                "zh-cn": "割草机地图备份",
            },
            desc: "Create by Adapter",
            icon: "img/map.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw.mower_backup_map_info`,
            common,
            "channel",
            null,
            null,
            null,
        );
        common = {
            name: {
                en: "Device work record",
                de: "Geräte-Arbeitsprotokoll",
                ru: "Запись о работе устройства",
                pt: "Registro de funcionamento do dispositivo",
                nl: "Apparaat werkregistratie",
                fr: "Enregistrement du fonctionnement de l'appareil",
                it: "registro delle attività del dispositivo",
                es: "Registro de funcionamiento del dispositivo",
                pl: "Rejestr pracy urządzenia",
                uk: "Журнал роботи пристрою",
                "zh-cn": "设备工作记录",
            },
            desc: "Create by Adapter",
            icon: "img/work.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw.mower_work_record`,
            common,
            "channel",
            null,
            null,
            null,
        );
        common = {
            type: "boolean",
            role: "button",
            name: {
                en: "Mower update",
                de: "Mäher-Update",
                ru: "Обновление газонокосилки",
                pt: "Atualização do cortador de grama",
                nl: "Update over de grasmaaier",
                fr: "Mise à jour de la tondeuse",
                it: "Aggiornamento del tosaerba",
                es: "Actualización de la cortadora de césped",
                pl: "Aktualizacja kosiarki",
                uk: "Оновлення косарки",
                "zh-cn": "割草机更新",
            },
            desc: "Create by Adapter",
            read: false,
            write: true,
        };
        await this.createDataPoint(`${this.adapter.namespace}.${id}.mower.update`, common, "state", null, null, null);
        common = {
            type: "boolean",
            role: "button",
            name: {
                en: "All device properties",
                de: "Alle Geräteeigenschaften",
                ru: "Все свойства устройства",
                pt: "Todas as propriedades do dispositivo",
                nl: "Alle apparaateigenschappen",
                fr: "Toutes les propriétés de l'appareil",
                it: "Tutte le proprietà del dispositivo",
                es: "Todas las propiedades del dispositivo",
                pl: "Wszystkie właściwości urządzenia",
                uk: "Усі властивості пристрою",
                "zh-cn": "所有设备属性",
            },
            desc: "Create by Adapter",
            read: false,
            write: true,
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower.all_properties`,
            common,
            "state",
            null,
            null,
            null,
        );
        common = {
            type: "boolean",
            role: "button",
            name: {
                en: "Get Region ID",
                de: "Regions-ID abrufen",
                ru: "Получить идентификатор региона",
                pt: "Obter ID da região",
                nl: "Regio-ID ophalen",
                fr: "Obtenir l'identifiant de région",
                it: "Ottieni l'ID della regione",
                es: "Obtener ID de región",
                pl: "Uzyskaj identyfikator regionu",
                uk: "Отримати ідентифікатор регіону",
                "zh-cn": "获取区域 ID",
            },
            desc: "Create by Adapter",
            read: false,
            write: true,
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower.getRegionId`,
            common,
            "state",
            null,
            null,
            null,
        );
        common = {
            type: "boolean",
            role: "button",
            name: {
                en: "Mower update all data",
                de: "Mäher aktualisiert alle Daten",
                ru: "Обновление данных газонокосилки",
                pt: "Atualização de todos os dados do cortador de grama",
                nl: "Alle gegevens van de grasmaaier bijwerken",
                fr: "Mise à jour de toutes les données de la tondeuse",
                it: "Aggiornamento del tosaerba: tutti i dati",
                es: "Actualizar todos los datos de la cortadora de césped",
                pl: "Kosiarka aktualizuje wszystkie dane",
                uk: "Оновлення всіх даних косарки",
                "zh-cn": "割草机更新所有数据",
            },
            desc: "Create by Adapter",
            read: false,
            write: true,
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower.update_all`,
            common,
            "state",
            null,
            null,
            null,
        );
        common = {
            type: "boolean",
            role: "button",
            name: {
                en: "Mower raw data update",
                de: "Aktualisierung der Rohdaten des Mähers",
                ru: "Обновление исходных данных газонокосилки",
                pt: "Atualização de dados brutos do cortador de grama",
                nl: "Update van de ruwe gegevens van de maaier",
                fr: "Mise à jour des données brutes de la tondeuse",
                it: "Aggiornamento dei dati grezzi del tosaerba",
                es: "Actualización de datos brutos de la cortadora de césped",
                pl: "Aktualizacja surowych danych kosiarki",
                uk: "Оновлення необроблених даних косарки",
                "zh-cn": "割草机原始数据更新",
            },
            desc: "Create by Adapter",
            read: false,
            write: true,
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower.update_raw`,
            common,
            "state",
            null,
            null,
            null,
        );
        common = {
            name: {
                en: "Mower raw data",
                de: "Rohdaten des Mähers",
                ru: "Исходные данные газонокосилки",
                pt: "Dados brutos do cortador de grama",
                nl: "Ruwe gegevens van de maaier",
                fr: "données brutes de la tondeuse",
                it: "Dati grezzi del tosaerba",
                es: "Datos brutos de la segadora",
                pl: "Surowe dane kosiarki",
                uk: "Необроблені дані косарки",
                "zh-cn": "割草机原始数据",
            },
            desc: "Create by Adapter",
            icon: "img/raw.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw.mower_raw`,
            common,
            "channel",
            null,
            null,
            null,
        );
        common = {
            name: {
                en: "Mower info raw data",
                de: "Rohdaten zu Rasenmäherinformationen",
                ru: "Исходные данные о газонокосилке",
                pt: "Dados brutos de informações do cortador de grama",
                nl: "Grasmaaierinfo ruwe data",
                fr: "données brutes des informations sur la tondeuse",
                it: "Dati grezzi relativi alle informazioni sul tosaerba",
                es: "Datos brutos de información de la cortadora de césped",
                pl: "Surowe dane dotyczące kosiarki",
                uk: "Інформація про косарку, необроблені дані",
                "zh-cn": "割草机信息原始数据",
            },
            desc: "Create by Adapter",
            icon: "img/raw.png",
        };
        await this.createDataPoint(
            `${this.adapter.namespace}.${id}.mower_all_raw.mower_raw_info`,
            common,
            "channel",
            null,
            null,
            null,
        );
    }
    public async createMqtt(): Promise<any> {
        let common: CommonStates;
        common = {
            name: {
                en: "MQTT Connection",
                de: "MQTT-Verbindung",
                ru: "Подключение MQTT",
                pt: "Conexão MQTT",
                nl: "MQTT-verbinding",
                fr: "Connexion MQTT",
                it: "Connessione MQTT",
                es: "Conexión MQTT",
                pl: "Połączenie MQTT",
                uk: "Підключення MQTT",
                "zh-cn": "MQTT 连接",
            },
            desc: "Create by Adapter",
            icon: "img/mqtt.png",
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt`, common, "channel", null, null, null);
        common = {
            type: "boolean",
            role: "switch",
            name: {
                en: "MQTT status for V devices",
                de: "MQTT-Status für V-Geräte",
                ru: "Статус MQTT для устройств V",
                pt: "Status MQTT para dispositivos V",
                nl: "MQTT-status voor V-apparaten",
                fr: "État MQTT pour les appareils V",
                it: "Stato MQTT per i dispositivi V",
                es: "Estado MQTT para dispositivos V",
                pl: "Status MQTT dla urządzeń V",
                uk: "Стан MQTT для V-пристроїв",
                "zh-cn": "V 设备的 MQTT 状态",
            },
            desc: "Create by Adapter",
            read: true,
            write: false,
            def: false,
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt.v_connection`, common, "state", false, null, null);
        common = {
            type: "string",
            role: "json",
            name: {
                en: "MQTT access data for V devices",
                de: "MQTT-Zugriffsdaten für V-Geräte",
                ru: "Данные доступа MQTT для устройств V",
                pt: "Dados de acesso MQTT para dispositivos V",
                nl: "MQTT-toegangsgegevens voor V-apparaten",
                fr: "Données d'accès MQTT pour les appareils V",
                it: "Dati di accesso MQTT per dispositivi V",
                es: "Datos de acceso MQTT para dispositivos V",
                pl: "Dane dostępowe MQTT dla urządzeń V",
                uk: "Дані доступу MQTT для пристроїв V",
                "zh-cn": "V 设备的 MQTT 访问数据",
            },
            desc: "Create by Adapter",
            read: true,
            write: false,
            def: JSON.stringify({}),
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt.v_access_data`, common, "state", false, null, null);
        common = {
            type: "number",
            role: "value.time",
            name: {
                en: "Last updated for V devices",
                de: "Zuletzt aktualisiert für V-Geräte",
                ru: "Последнее обновление для устройств V.",
                pt: "Última atualização para dispositivos V",
                nl: "Laatst bijgewerkt voor V-apparaten",
                fr: "Dernière mise à jour pour les appareils V",
                it: "Ultimo aggiornamento per dispositivi V",
                es: "Última actualización para dispositivos V",
                pl: "Ostatnia aktualizacja dla urządzeń V",
                uk: "Останнє оновлення для пристроїв V",
                "zh-cn": "最后更新于 V 设备",
            },
            desc: "Create by Adapter",
            read: true,
            write: false,
            def: 0,
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt.v_last_update`, common, "state", 0, null, null);
        common = {
            type: "boolean",
            role: "switch",
            name: {
                en: "MQTT status for X devices",
                de: "MQTT-Status für X Geräte",
                ru: "Статус MQTT для устройств X",
                pt: "Status MQTT para dispositivos X",
                nl: "MQTT-status voor X-apparaten",
                fr: "État MQTT pour les appareils X",
                it: "Stato MQTT per i dispositivi X",
                es: "Estado MQTT para dispositivos X",
                pl: "Status MQTT dla urządzeń X",
                uk: "Стан MQTT для пристроїв X",
                "zh-cn": "X 设备的 MQTT 状态",
            },
            desc: "Create by Adapter",
            read: true,
            write: false,
            def: false,
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt.x_connection`, common, "state", false, null, null);
        common = {
            type: "string",
            role: "json",
            name: {
                en: "MQTT access data for X devices",
                de: "MQTT-Zugriffsdaten für X Geräte",
                ru: "Доступ к данным MQTT для устройств X",
                pt: "Dados de acesso MQTT para dispositivos X",
                nl: "MQTT-toegangsgegevens voor X-apparaten",
                fr: "Données d'accès MQTT pour les appareils X",
                it: "Dati di accesso MQTT per dispositivi X",
                es: "Datos de acceso MQTT para dispositivos X",
                pl: "Dane dostępowe MQTT dla urządzeń X",
                uk: "Дані доступу MQTT для пристроїв X",
                "zh-cn": "X 设备的 MQTT 访问数据",
            },
            desc: "Create by Adapter",
            read: true,
            write: false,
            def: JSON.stringify({}),
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt.x_access_data`, common, "state", false, null, null);
        common = {
            type: "number",
            role: "value.time",
            name: {
                en: "Last updated for X devices",
                de: "Zuletzt aktualisiert für X-Geräte",
                ru: "Последнее обновление для устройств X",
                pt: "Última atualização para dispositivos X",
                nl: "Laatst bijgewerkt voor X-apparaten",
                fr: "Dernière mise à jour pour les appareils X",
                it: "Ultimo aggiornamento per dispositivi X",
                es: "Última actualización para dispositivos X",
                pl: "Ostatnia aktualizacja dla urządzeń X",
                uk: "Останнє оновлення для пристроїв X",
                "zh-cn": "最后更新于 X 设备",
            },
            desc: "Create by Adapter",
            read: true,
            write: false,
            def: 0,
        };
        await this.createDataPoint(`${this.adapter.namespace}.mqtt.x_last_update`, common, "state", 0, null, null);
    }
    public async createAuth(): Promise<any> {
        let common: CommonStates;
        common = {
            name: {
                en: "Auth Information",
                de: "Authentifizierungsinformationen",
                ru: "Информация об аутентификации",
                pt: "Informações de autorização",
                nl: "Autorisatie-informatie",
                fr: "Informations d'autorisation",
                it: "Informazioni di autorizzazione",
                es: "Información de autorización",
                pl: "Informacje o uwierzytelnianiu",
                uk: "Інформація для авторизації",
                "zh-cn": "授权信息",
            },
            desc: "Create by Adapter",
            icon: "img/auth.png",
        };
        await this.createDataPoint(`${this.adapter.namespace}.auth`, common, "channel", null, null, null);
        common = {
            name: {
                en: "Rate Limit",
                de: "Ratenbegrenzung",
                ru: "Лимит скорости",
                pt: "Limite de taxa",
                nl: "Snelheidslimiet",
                fr: "Limite de débit",
                it: "Limite di tariffa",
                es: "Límite de tasa",
                pl: "Limit szybkości",
                uk: "Ліміт швидкості",
                "zh-cn": "速率限制",
            },
            desc: "Create by Adapter",
            icon: "img/rate.png",
        };
        await this.createDataPoint(`${this.adapter.namespace}.rateLimit`, common, "channel", null, null, null);
        common = {
            type: "string",
            role: "json",
            name: {
                en: "Session",
                de: "Sitzung",
                ru: "Сессия",
                pt: "Sessão",
                nl: "Sessie",
                fr: "Session",
                it: "Sessione",
                es: "Sesión",
                pl: "Sesja",
                uk: "Сесія",
                "zh-cn": "会议",
            },
            desc: "Create by Adapter",
            read: true,
            write: true,
            def: JSON.stringify({}),
        };
        await this.createDataPoint(`${this.adapter.namespace}.auth.session`, common, "state", null, null, null);
        common = {
            type: "string",
            role: "json",
            name: {
                en: "Restart Limit",
                de: "Neustartlimit",
                ru: "Ограничение перезапуска",
                pt: "Limite de reinicialização",
                nl: "Herstartlimiet",
                fr: "Limite de redémarrage",
                it: "Limite di riavvio",
                es: "Límite de reinicio",
                pl: "Limit ponownego uruchomienia",
                uk: "Ліміт перезапуску",
                "zh-cn": "重启限制",
            },
            desc: "Create by Adapter",
            read: true,
            write: true,
            def: JSON.stringify({
                restartCount: 0,
                restartLast: 0,
                restartTime: "",
                day: "",
            }),
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
    private async createDataPoint(
        ident: string,
        common: any,
        types: "state" | "folder" | "channel" | "device",
        value: string | number | boolean | null | undefined,
        extend: boolean | null | undefined,
        native: any,
    ): Promise<void> {
        try {
            const nativvalue = !native ? { native: {} } : { native: native };
            const obj: any = await this.adapter.getObjectAsync(ident);
            if (!obj) {
                await this.adapter
                    .setObjectNotExistsAsync(ident, {
                        type: types,
                        common: common,
                        ...nativvalue,
                    })
                    .catch(error => {
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
                            common: common,
                            ...nativvalue,
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
        } catch (error: unknown) {
            if (typeof error === "string") {
                this.adapter.log.error(`createDataPoint: ${error}`);
            } else if (error instanceof Error) {
                this.adapter.log.error(`createDataPoint: ${error.name}: ${error.message}`);
            }
        }
    }
}
