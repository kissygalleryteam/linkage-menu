## 综述

LinkageMenu是多级联动菜单，适用于pad端和手机端。

充分利用kissy的官方menu超强的可扩展性，同时考虑性能，子菜单只有点击的时候才会去加载。

LinkageMenu暂时不支持点击菜单项再去加载数据。

测试中，请勿使用。

## 初始化组件
		
    S.use('kg/linkage-menu/1.0.0/index,io,kg/linkage-menu/1.0.0/index.css', function (S, LinkageMenu,io) {
        io.getJSON('./test.json').then(function(result){
            var data = result[0].data;
            var linkageMenu = new LinkageMenu({
                $target:'body',
                data: data,
                itemFilter: function(itemData,menu){
                    var itemHtml = '<span>'+itemData.currentName+'</span>';
                    if(menu){
                        var level = menu.get('level');
                        //第三级菜单项内容改成链接跳转
                        if(level === 3){
                            itemHtml = '<a href="'+itemData.href+'">'+itemData.currentName+'</a>';
                        }
                    }
                    return itemHtml;
                }
            });
            linkageMenu.render();
        });
    })

## itemFilter

可以使用itemFilter配置菜单项渲染内容，所以LinkageMenu不依赖于特定的数据结构。

    itemFilter: function(itemData,menu){
        var itemHtml = '<span>'+itemData.currentName+'</span>';
        if(menu){
            var level = menu.get('level');
            //第三级菜单项内容改成链接跳转
            if(level === 3){
                itemHtml = '<a href="'+itemData.href+'">'+itemData.currentName+'</a>';
            }
        }
        return itemHtml;
    }

* itemData 为菜单项数据
* menu 为菜单项要注入到得菜单

itemFilter 需要有返回值，为html片段。

有时我们希望不同的层级显示的菜单项内容不一样，比如demo中第三级的菜单项显示链接：

    var level = menu.get('level');
    //第三级菜单项内容改成链接跳转
    if(level === 3){
        itemHtml = '<a href="'+itemData.href+'">'+itemData.currentName+'</a>';
    }
    
可以通过menu.get('level')判断菜单所属的层级。    

### 属性说明

属性名 | 类型|只读|默认值|说明
------------ | -------------| -------------| -------------| -------------
$target | Nodelist|N|''| 菜单渲染的目标元素
data | Array|Y|[]| 菜单数据
itemFilter | Function|Y|''| 控制菜单项显示的内容
menu | Object|Y|''| 菜单实例，请看[Menu](http://docs.kissyui.com/1.4/docs/html/api/menu/Menu.html)
prefixCls | String|Y|'lm-'| 菜单和菜单项样式前缀