//多级联动菜单
//适用于pad端和无线端
//by 剑平（明河）
var $ = require('node').all;
var Base = require('base');
var Menu = require('menu');
var LinkageMenu = Base.extend({
    initializer:function(){
        var self = this;
        var $target = self.get('$target');
        var data = self.get('data');
        if(!$target.length || !data.length) return false;
        var menu = new Menu({
            render: $target,
            prefixCls: self.get('prefixCls')
        });
        self.set('menu',menu);
    },
    //渲染数据
    render: function(){
        var self = this;
        var data = self.get('data');
        var menu = self.get('menu');
        self._addItems(menu,data);
        menu.render();
        self._menuShow(menu);
        self._addLevelSign(menu,1);
        menu.on("click", function(ev) {
            var target = ev.target;
            var data = target.get('itemData');
            if(!data || !data.children) return false;
            self.selected(target);
            self.renderSub(target,data.children);
            self.fire('click',{menu:target});
        });
        self.fire('render');
    },
    //渲染子菜单
    renderSub: function(menu,data){
        var self = this;
        var isRender = menu.get('isRenderSubMenu');
        var subMenu =  menu.get('menu');
        if(!isRender){
            subMenu.set('autoHideOnMouseLeave',false);
            //获取父菜单
            var parentMenu = menu.get('parent');
            var level = parentMenu.get('level');
            self._addLevelSign(subMenu,level+1);
            self._addItems(subMenu,data);
            menu.set('isRenderSubMenu',true);
        }
        self._menuShow(subMenu);
        return subMenu;
    },
    //渲染菜单项
    renderItem: function(itemData,menu){
        var self = this;
        var itemFilter = self.get('itemFilter');
        var html = itemFilter.call(self,itemData,menu);
        var item = new Menu.SubMenu({
            content: html,
            prefixCls: self.get('prefixCls')
        });
        item.set('itemData',itemData);
        return item;
    },
    //向菜单添加菜单项
    _addItems: function(menu,data){
        var self = this;
        S.each(data,function(itemData){
            var item = self.renderItem(itemData,menu);
            menu.addChild(item);
        });
        return menu;
    },
    //给菜单增加等级标
    _addLevelSign: function(menu,num){
        menu.set('level',num);
        var $srcNode = menu.$el;
        $srcNode.addClass('lm-level-'+num);
        return num;
    },
    selected: function(item){
        var menu = item.get('parent');
        var items = menu.get('children');
        S.each(items,function(i){
            i.set('selected',false);
        });
        item.set('selected',true);
        return item;
    },
    _menuShow: function(menu){
        var self = this;
        var prefixCls = self.get('prefixCls');
        menu.show();
        menu.$el.addClass(prefixCls+'show');
    }
},{
    ATTRS:{
        //目标元素
        $target:{
            value:'',
            getter:function(v){
                return $(v);
            }
        },
        //菜单数据
        data:{
            value:[]
        },
        itemFilter:{
            value:''
        },
        //菜单实例
        menu:{value:''},
        //生成dom的class前缀
        prefixCls:{value:'lm-'}
    }
});

module.exports = LinkageMenu;



