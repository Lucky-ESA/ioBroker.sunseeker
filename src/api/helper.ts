const US_URI = "https://wirefree-specific-us.sk-robot.com/api";
const US_HOST = "wirefree-specific-us.sk-robot.com";
const EU_URI = "https://wirefree-specific.sk-robot.com/api";
const EU_HOST = "wirefree-specific.sk-robot.com";
const OLD_URL = "https://server.sk-robot.com/api";
const OLD_HOST = "server.sk-robot.com";
const CMDURL_X = "/iot_mower/wireless/device/";
const CMDURL_V = "/app_wirelessv1_mower/wirelessv1/device/";
const MQTT_EU_OLD = "app.mqttv1-eu.sk-robot.com";
const MQTT_EU_NEW = "wfsmqtt-specific.sk-robot.com";
const MQTT_US_OLD = "app.mqttv1-us.sk-robot.com";
const MQTT_US_NEW = "wfsmqtt-specific-us.sk-robot.com";
const V = ["V1", "V18", "V3"];
const X = ["X3", "X4", "X5", "X7", "X9", "S3", "S4", "S5"];
const LANG = ["da", "de", "fr", "fi", "pl", "en"];
const public_key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0f7mbMVc/YIYQbR8Ty3u
7yx0cKX6Gt7JkVQrWynI7xM6/yVPMC1I7nXdjMlVPpc06UXoc5ClQNsTbQ4vumFg
2RZPQwAOc7yL1Y8t1W0b9jMTztu32ZzlobfzIVkIO1R7x1I+pkyp6QDm/MnvWyeu
CM77gS2bDv47H9COQn/gy/fy9uecyWCY3u+dXQhujLPrSJ2FFs6SwD0t5QEJjdrC
ftkKQFsflm+i5RQZBMNGT3LdAMnPK4avG642Afum0SzmNrEZrIo7pr2w0fvokbWB
SOOeEdGAx7UVI1kHssOohqW37yJzzFMIlahZSEJ0A3Dm6yrtgobp2mQlCisqsVW4
XwIDAQAB
-----END PUBLIC KEY-----`;
const appId = "0123456789abcdef";
export {
    appId,
    CMDURL_V,
    CMDURL_X,
    EU_HOST,
    EU_URI,
    LANG,
    MQTT_EU_NEW,
    MQTT_EU_OLD,
    MQTT_US_NEW,
    MQTT_US_OLD,
    OLD_HOST,
    OLD_URL,
    public_key,
    US_HOST,
    US_URI,
    V,
    X,
};
