/* 邮箱 */
export const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

/* 手机 */
export const phoneReg = /^1[34578]\d{9}$/;

/* 身份证 */
export const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

/* 银行卡 */
export const bankCardReg = /^[1-9]\d{13,19}$/;

/* URL */
export const urlReg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/* IP地址 */
export const ipReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;

/* 端口号 */
export const portReg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

/* 域名 */
export const domainReg = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

/* 短身份证 */
export const shortIdCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

/* 弱密码 */
export const weakPasswordReg = /^[a-zA-Z0-9]{6,12}$/;

/* 强密码 */
export const strongPasswordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*? ])(?=.{8,})/;

/* 双字节字符 */
export const doubleByteReg = /[^\x00-\xff]/;

/* 特殊字符 */
export const specialReg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
