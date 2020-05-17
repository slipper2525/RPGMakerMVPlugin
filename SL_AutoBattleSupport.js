//=============================================================================
// SL_AutoBattleSupport.js 2020/5/16
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Slipper
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/05/16 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/slipper_ika
// [GitHub] : https://github.com/slipper2525
//=============================================================================
/*:
 * @plugindesc 自動戦闘時に２重にスキルを参照するのを止めます
 * @author Slipper 
 * @help プラグインをＯＮするのみで動作します。パラメータの設定などは不要です。
 */

(function() {
	var _Game_Action = Game_Action;
	Game_Action.prototype.evalDamageFormula = function(target) {
		try {
			var item = this.item();
			var a = this.subject();
			var b = target;
			var v = $gameVariables._data;
			var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
			var skillFormula = this.getSkillFormula(item.damage.formula);
			var value = Math.max(eval(skillFormula), 0) * sign;
			if (isNaN(value)) value = 0;
			return value;
		} catch (e) {
			return 0;
		}
	};

	Game_Action.prototype.evaluateWithTarget = function(target) {
		if (this.isHpEffect()) {
			this.subject().autobattle = true;
			var value = this.makeDamageValue(target, false);
			if (this.isForOpponent()) {
				return value / Math.max(target.hp, 1);
			} else {
				var recovery = Math.min(-value, target.mhp - target.hp);
				return recovery / target.mhp;
			}
		}
	};
	
	Game_Action.prototype.getSkillFormula = function(formula) {
		if(this.subject().autobattle){
			var msg = this.deleteEndSemicolon(formula);
			var pos = msg.lastIndexOf(";");
			delete this.subject().autobattle;
			return msg.slice(pos+1);
		}else{
			return formula;
		}
	};
	
	Game_Action.prototype.deleteEndSemicolon = function(msg) {
		var msgEnd = msg.slice(-1);
		if(msgEnd === ";"){
			return msg.slice(0,-1);
		}else{
			return msg;
		}
	};
          
})();