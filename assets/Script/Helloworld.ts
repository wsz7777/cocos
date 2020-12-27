const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.Node)
  cocos: cc.Node = null;

  @property
  text: string = "hello";

  // Player 节点，用于获取主角弹跳的高度，和控制主角行动开关
  @property({ type: cc.Node })
  play: cc.Node = null;

  start() {
    console.log("this=====", this);
    console.log("this.node=====", this.node);
    // console.log("this.label=====", this.label);
    // init logic
    this.label.string = this.text;

    // 直接在节点树上自己找
    // const a = this.node.children.filter((item) => item.name === "cocos")[0];
    // a.on(cc.Node.EventType.TOUCH_START, (event: any) => {

    // 通过cc提供的绑定方式来获取节点 然后再绑定
    // this.cocos.on(cc.Node.EventType.TOUCH_START, (event: any) => {
    //   console.log(
    //     "🚀 ~ file: Helloworld.ts ~ line 20 ~ Helloworld ~ this.cocos.node.on ~ event",
    //     event
    //   );
    // });

    // // cc框架提供自有组件的绑定事件
    // this.label.node.on(cc.Node.EventType.TOUCH_START, (event: any) => {
    //   console.log("这里是label");
    // });

    // const a = this.node.getComponent("Helloworld");
    // console.log(
    //   "🚀 ~ file: Helloworld.ts ~ line 36 ~ Helloworld ~ //play.on ~ play",
    //   a,
    //   this.play
    // );

    const p = this.play.getComponent("play");
    console.log(
      "🚀 ~ file: Helloworld.ts ~ line 49 ~ Helloworld ~ //a.on ~ p",
      this.play,
      p
    );
  }
}
