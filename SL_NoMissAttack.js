//=============================================================================
// SL_NoMissAttack.js 2020/4/25
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Slipper
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2020/04/25 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/slipper_ika
// [GitHub] : https://github.com/slipper2525
//=============================================================================
/*:
 * @plugindesc 基本命中率を100%にします
 * @author Slipper 
 * @help スキルID：1(通常攻撃)の命中率に依存します。
 * デフォルト設定で100%となります。
 * 回避率が設定されている敵に対しては回避設定が反映されます
 */

(function() {
	var _Game_Action = Game_Action;
	Game_Action.prototype.itemHit = function(target) {
		return this.item().successRate * 0.01;
	};
          
})();