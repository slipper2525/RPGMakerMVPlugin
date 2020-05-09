//=============================================================================
// SL_WeaponSkillId.js 2020/4/11
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Slipper
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/04/11 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/slipper_ika
// [GitHub] : https://github.com/slipper2525
//=============================================================================
/*:
 * @plugindesc 武器の通常攻撃時のスキルＩＤを変更できます
 * @author Slipper 
 * @help 通常の武器攻撃がスキルID1となっているところをお好みのスキルIDに変更できます。
 * スキルID変更することで計算式や魔法攻撃など設定できます。
 * <skillId:〇>を武器のメモ欄に追加することでスキルID〇番目のスキルが発動します。
 * 
 */

(function() {
//=============================================================================
// 共通設定
//=============================================================================
	
	/* 通常攻撃変更 */
	var _Game_BattlerBase = Game_BattlerBase;
	Game_BattlerBase.prototype.attackSkillId = function() {
		var attackId = 1;
		if(this.isActor()){
			var weaponId = this.getWeaponId();
			attackId = this.getWeaponAttackId(weaponId);
		}
		return attackId;
	};
	
	/* 武器ＩＤ取得 */
	Game_BattlerBase.prototype.getWeaponId = function(){
		var weaponId = 0;
		if(this.isActor() && this._equips){
			weaponId = this._equips[0]._itemId;
		}
		return weaponId;
	}
	
	/* スキルＩＤ取得 */
	Game_BattlerBase.prototype.getWeaponAttackId = function(weaponId){
		var attackId = 1;
		if($dataWeapons[weaponId]){
			if($dataWeapons[weaponId].meta['skillId']){
				var getSkillId = Number($dataWeapons[weaponId].meta['skillId']);
				if($dataSkills[getSkillId]){
				attackId = getSkillId;
				}
			}
		}
		return attackId;
	}

	
	
	
})();
