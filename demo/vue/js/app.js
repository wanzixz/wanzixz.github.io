//存取localStorage中的数据
var store = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    fetch(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}

/*var list = [
{
    title: '吃饭打豆豆',
    isChecked:false //状态为false的时候，表示任务未完成
}, {
    title: '吃饭打豆豆',
    isChecked:true //为true的时候，表示任务完成
}
];*/

var list = store.fetch('miao-new-class');
//过滤的时候有三种情况 all finished unfinished
var filter = {
    all: function(list) {
        return list
    },
    finished: function(list) {
        return list.filter(function(item) {
            return item.isChecked;
        })
    },
    unfinished: function(list) {
        return list.filter(function(item) {
            return !item.isChecked;
        })
    }
}

var vm = new Vue({
    el: ".main",
    data: {
        list: list,
        todo: '',
        edtorTodos: '', //记录是否为编辑状态
        beforTitle: '', //记录编辑之前的数据
        visibility: 'all' //通过这个属性值的变化对数据进行筛选
    },
    watch: {
        /*list:function(){ //监控list这个属性，当这个属性对应的值发生变化就执行函数
        	store.save('miao-new-class',this.list);
        }*/
        list: { //深度监控
            handler: function() {
                store.save('miao-new-class', this.list);
            },
            deep: true
        }
    },
    computed: {
        noChecked() {
            return this.list.filter(function(item) {
                return !item.isChecked
            }).length
        },
        filteredList: function() {
            //如果找到了过滤函数，就返回过滤后的数据，如果没有找到，就返回所有的数据
            return filter[this.visibility](list) ? filter[this.visibility](list) : list;
        },
        selectItem:function(){
        	return this.visibility ? this.visibility : 'all';
        	//console.log(this.visibility);
        }
    },
    methods: {
        //事件处理行数中的this指向的是，当前这个根实例
        addTodo(ev) { //添加任务
            this.list.push({
                title: this.todo,
                isChecked: false,
                edtorTodos: '' //记录是否为编辑状态
            });
        },
        deleteTodo(todo) { //删除任务
            var index = this.list.indexOf(todo);
            this.list.splice(index, 1);
        },
        edtorTodo(todo) { //编辑任务
            //在编辑任务之前先记录一下，input里面的数据，方便取消任务的时候保存数据
            this.beforTitle = todo.title;
            this.edtorTodos = todo;
        },
        edtorTodoed() { //编辑任务成功
            this.edtorTodos = '';
        },
        cancelTodo(todo) { //取消编辑
            //把之前保存的数据赋值给它
            todo.title = this.beforTitle;
            //取消完成之后隐藏输入框
            this.edtorTodos = '';
        }

    },
    directives: {
        focus: {
            update(el, binding) {
                //console.log(el,binding)
                if (binding.value) {
                    el.focus();
                }
            }
        }
    }

});

function watchHashChange() {
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
    //console.log(vm)
}

window.addEventListener('hashchange', watchHashChange)
