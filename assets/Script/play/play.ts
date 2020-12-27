// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Play extends cc.Component {
  // 主角跳跃高度
  @property
  jumpHeight = 200;
  // 主角跳跃持续时间
  @property
  jumpDuration = 0.3;
  // 最大移动速度
  @property
  maxMoveSpeed = 400;
  // 加速度
  @property
  accel = 400;

  nowJumpHeight = 0;
  initHeight = 0;
  /** 向左 */
  accLeft = false;
  /** 向右 */
  accRight = false;
  /** 当前速度 */
  xSpeed = 0;

  runJumpAction() {
    // 不断重复
    return cc.tween().repeatForever(this.jumpAction());
  }

  jumpAction() {
    // 跳跃上升
    const jumpUp = cc
      .tween()
      .by(this.jumpDuration, { y: this.jumpHeight }, { easing: "sineOut" });
    // 下落
    const jumpDown = cc
      .tween()
      .to(this.jumpDuration, { y: this.initHeight }, { easing: "sineIn" });

    // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
    const tween = cc.tween().sequence(jumpUp, jumpDown);
    return tween;
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        this.accRight = false;
        // cc.tween(this.node)
        //   .by(this.jumpDuration, { x: -100 }, { easing: "sineOut" })
        //   .start();

        break;
      case cc.macro.KEY.d:
        this.accLeft = false;
        this.accRight = true;
      // cc.tween(this.node)
      //   .by(this.jumpDuration, { x: 100 }, { easing: "sineOut" })
      //   .start();
      case cc.macro.KEY.s:
        this.xSpeed = 0;
        //   this.accLeft = false;
        //   this.accRight = false;

        break;
      case 32:
        console.log(this.node.y);
        cc.tween(this.node)
          .then(this.jumpAction())
          .call(() => {
            // this.nowJumpHeight = 0;
          })
          .start();
        break;
    }
  }
  onKeyUp(event) {
    //     // unset a flag when key released
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;
      case cc.macro.KEY.d:
        this.accRight = false;
        break;

      default:
        break;
    }
  }

  update(dt) {
    // 根据当前加速度方向每帧更新速度
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    }
    if (this.accRight) {
      this.xSpeed += this.accel * dt;
    }

    // 限制主角的速度不能超过最大值
    if (Math.abs(this.xSpeed) >= this.maxMoveSpeed) {
      this.xSpeed = this.accLeft
        ? -this.maxMoveSpeed
        : this.accRight
        ? this.maxMoveSpeed
        : 0;
    }

    // 根据当前速度更新主角的位置
    this.node.x += this.xSpeed * dt;
    if (this.node.x > 450) {
      this.node.x = 450;
    } else if (this.node.x < -450) {
      this.node.x = -450;
    }
  }

  onLoad() {
    this.initHeight = this.node.y;
    const jumpAction = this.runJumpAction();
    // cc.tween(this.node).then(jumpAction).start();
    // console.log("cc.SystemEvent.EventType", cc.SystemEvent.EventType);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {
    // this.runJumpAction();
  }

  onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
}
