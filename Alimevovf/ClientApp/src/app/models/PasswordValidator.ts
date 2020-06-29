import { AbstractControl, ValidatorFn } from "@angular/forms"

export class PasswordValidator {

  static readonly regexAlphaMin: RegExp = /[a-z]/g
  static readonly regexAlphaMaj: RegExp = /[A-Z]/g
  static readonly regexNum: RegExp = /[0-9]/g
  static readonly regexFinal: RegExp = /^[0-9a-zA-Z]*$/

  static readonly passwordMinLength: number = 8
  static readonly passwordMaxLength: number = 12

  static testLevelPassword(password:string) {
    let force: number = 0
    if (PasswordValidator.regexAlphaMin.test(password)) {
      force++
    }
    if (PasswordValidator.regexAlphaMaj.test(password)) {
      force++
    }
    if (PasswordValidator.regexNum.test(password)) {
      force++
    }
    return force
  }
  static isValidPassword(password: string) {
    if (password
      && password.length >= PasswordValidator.passwordMinLength
      && password.length <= PasswordValidator.passwordMaxLength
      && PasswordValidator.regexFinal.test(password)) {
      return true
    }
    return false
  }
  static getFormValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return !PasswordValidator.isValidPassword(control.value) ? { 'passwordInvalid': { value: control.value } } : null
    }
  }
}
