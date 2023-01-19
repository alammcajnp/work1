import {Config} from "./config";

export const baseUrl = Config.API_URL

export class Urls {
  /* End User Urls */
  static signup = baseUrl + '/user/create'
  static updateProfile = baseUrl + '/user/update'
  static login = baseUrl + '/user/login'
  static forgetPassword = baseUrl + '/user/forget-password'
  static resetPassword = baseUrl + '/user/reset-password'
  static refreshToken = baseUrl + '/user/refresh-token'
  static allGames = baseUrl + '/game/games' 
  static addGame = baseUrl + '/game/create' 
  static getGameById = baseUrl + '/game/game' 
  static updateGame = baseUrl + '/game/update' 
  static deleteGame = baseUrl + '/game/delete' 
  static addLevel = baseUrl + '/level/create' 
  static getAllLevels = baseUrl + '/level/levels' 
  static deleteLevel = baseUrl + '/level/delete' 
  static getLevelById = baseUrl + '/level/level' 
  static updateLevel = baseUrl + '/level/update'
  static fetchGames = baseUrl + '/game/games_with_levels'

  /* Admin Urls */
  static adminLogin = baseUrl + '/admin/login'
  static AllUser = baseUrl + '/admin/AllUser'
  static AdminChangePassword = baseUrl + '/admin/AdminChangePassword'
}