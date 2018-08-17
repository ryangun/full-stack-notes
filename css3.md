# Css3

## background-origin

设置图片从哪里开始显示

- border-box 从边框左上角显示
- padding-box 从内边距的位置显示
- content-box 从从内容的位置显示

## background-clip

设置图片在哪里显示

- border-box 在边框区域显示
- padding-box 在内边距区域显示
- content-box 在内容区域看是

## background-size

设置图片显示的比例大小

- contain 按照比例缩放完整显示，可能不铺满
- cover 按照比例缩放铺满屏幕，可能显示不完整

## 选择图片作为边框效果

- background-image-source: url('border.png') 边框图片源
- background-image-slice: 20 切割图片
- background-image-repeat: repeat(平铺)、stretch(拉伸)、round(以不重叠的方式平铺)

## 渐变

### 线性渐变

background-image: linear-gradient(角度, 初始颜色, 结束颜色)