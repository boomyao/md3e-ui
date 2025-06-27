## v0.0.2

- feat: clockhand 旋转动画应遵循更小角度原则来确定正逆时针旋转。

## v0.0.1

- fix: 在 Horizontal布局时，ampm 没换行显示，导致压缩右侧 clock 布局问题。
 - 问题在于 timeinput 和 ampm 共用同一个 flex 布局，导致 ampm 在 Horizontal 布局时没有换行。
 - 解决办法是 timeinput 独立一个 flex 布局。
- fix: 选中 hour 后选择 clock 时，表盘又会变成选择分钟状态。
- fix: 表盘指针选中角度不准确。
 - 问题在于clocknumbers 的角度错误，现在正中顶部的时间是 9 点，正确的应该是 12 点。